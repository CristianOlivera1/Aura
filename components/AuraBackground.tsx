"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { resolveBlendMode, scaleBlurFull, type Layer } from "@/lib/gradients";

interface Stack {
  layers: Layer[];
  grain: boolean;
}

/*
 * The full-screen background is rasterized ONCE per gradient into a low-res
 * PNG and displayed as a single image layer. That turns N blurred
 * blend-mode layers (the expensive part on mobile GPUs) into one texture.
 * A soft, blurred gradient upscaled from 0.5x is visually identical to the
 * live CSS stack, but costs almost nothing to composite while navigating.
 */
const RASTER_SCALE = 0.5;
const CAPTURE_DELAY = 90;
const FADE_MS = 400;

function stackSignature(stack: Stack, light: boolean): string {
  return `${light}|${stack.grain}|${JSON.stringify(
    stack.layers.map((l) => [
      l.background,
      l.backgroundSize ?? "",
      l.blendMode,
      l.blur,
      l.opacity ?? 1,
    ]),
  )}`;
}

function renderStack(stack: Stack, light: boolean) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "var(--color-bg)",
        isolation: "isolate",
      }}
    >
      {stack.layers.map((layer, i) => {
        const b = scaleBlurFull(layer.blur);
        const blurM = Math.min(b.mobile, 120);
        const blurActive = blurM > 0;
        return (
          <div
            key={i}
            className={`absolute inset-0 ${blurActive ? "aura-blur" : ""}`}
            style={{
              ...(blurActive
                ? ({ "--blur-m": `${blurM}px`, "--blur-d": `${b.desktop}px` } as React.CSSProperties)
                : {}),
              backgroundImage: layer.background,
              backgroundSize: layer.backgroundSize ?? "cover",
              mixBlendMode: resolveBlendMode(
                layer.blendMode,
                light,
              ) as React.CSSProperties["mixBlendMode"],
              opacity: layer.opacity ?? 1,
            }}
          />
        );
      })}
      {stack.grain && <GrainOverlay className="absolute inset-0" />}
    </div>
  );
}

export function AuraBackground() {
  const { effectiveLayers, effectiveGrain, isDark } = useGradients();
  const light = !isDark;

  const stack = useMemo<Stack>(
    () => ({ layers: effectiveLayers, grain: effectiveGrain }),
    [effectiveLayers, effectiveGrain],
  );
  const signature = useMemo(() => stackSignature(stack, light), [stack, light]);

  const [current, setCurrent] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [curOpacity, setCurOpacity] = useState(1);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  const cacheRef = useRef(new Map<string, string>());
  const captureNodeRef = useRef<HTMLDivElement>(null);
  const curImgRef = useRef<string | null>(null);
  const pendingSigRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  /* Keep the capture node sized to the actual viewport (client-only, so it
     hydrates without a mismatch). */
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setViewport({ w: window.innerWidth, h: window.innerHeight }),
    );
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Promote a freshly captured (or cached) data URL, crossfading from the
     previous image. */
  const commitImage = useCallback((dataUrl: string) => {
    const old = curImgRef.current;
    curImgRef.current = dataUrl;
    setCurrent(dataUrl);
    if (old && old !== dataUrl) {
      setPrevious(old);
      setCurOpacity(0);
      requestAnimationFrame(() => setCurOpacity(1));
      if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = window.setTimeout(() => setPrevious(null), FADE_MS);
    }
  }, []);

  /* Rasterize the current stack into a low-res data URL. */
  const runCapture = useCallback(
    async (sig: string) => {
      const node = captureNodeRef.current;
      if (!node) return;
      try {
        const dataUrl = await toPng(node, {
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: RASTER_SCALE,
          style: {
            position: "absolute",
            left: "0",
            top: "0",
            right: "auto",
            bottom: "auto",
            margin: "0",
          },
        });
        cacheRef.current.set(sig, dataUrl);
        if (cacheRef.current.size > 30) {
          const oldest = cacheRef.current.keys().next().value;
          if (oldest !== undefined) cacheRef.current.delete(oldest);
        }
        commitImage(dataUrl);
      } catch {
        // Rasterization failed — keep whatever is currently displayed.
      }
    },
    [commitImage],
  );

  /* When the gradient changes, use the cache or schedule a capture. The
     debounce collapses rapid navigation into a single capture of the latest
     gradient. */
  useEffect(() => {
    const cached = cacheRef.current.get(signature);
    if (cached) {
      commitImage(cached);
      return;
    }

    pendingSigRef.current = signature;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      const sig = pendingSigRef.current;
      if (!sig) return;
      pendingSigRef.current = null;
      void runCapture(sig);
    }, CAPTURE_DELAY);
  }, [signature, runCapture, commitImage]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
    },
    [],
  );

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Raw CSS stack, only until the first raster is ready */}
      {!current && <div className="absolute inset-0">{renderStack(stack, light)}</div>}

      {/* Rasterized image layers (previous fades out under the new one) */}
      {current && (
        <>
          {previous && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${previous})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${current})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: curOpacity,
              transition: `opacity ${FADE_MS}ms ease`,
            }}
          />
        </>
      )}

      {/* Off-screen source node for html-to-image */}
      <div
        ref={captureNodeRef}
        style={{
          position: "fixed",
          top: 0,
          left: -10000,
          width: viewport.w || "100vw",
          height: viewport.h || "100vh",
          pointerEvents: "none",
        }}
      >
        {renderStack(stack, light)}
      </div>
    </div>
  );
}