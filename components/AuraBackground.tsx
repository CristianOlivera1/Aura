"use client";

import { useEffect, useRef, useState } from "react";
import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { resolveBlendMode, scaleBlurFull, type Layer } from "@/lib/gradients";

interface Stack {
  layers: Layer[];
  grain: boolean;
}

function renderStack(stack: Stack, fading = false, light = false) {
  return (
    <div
      className={`absolute inset-0 ${fading ? "transition-opacity duration-700 ease-out" : ""}`}
      style={{
        backgroundColor: "var(--color-bg)",
        isolation: "isolate",
      }}
    >
      {stack.layers.map((layer, i) => {
        const b = scaleBlurFull(layer.blur);
        /* Cap the fullscreen blur radius on mobile: beyond ~120px a gradient
           looks identical, but the GPU cost keeps climbing. */
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

  /* Crossfade between gradient states: keep the previous stack rendered on top
     while it fades out (each stack is isolated + opaque, so the fade is a clean
     alpha crossfade with no blend-mode artifacts between stacks). */
  const [prevStack, setPrevStack] = useState<Stack | null>(null);
  const [prevOpacity, setPrevOpacity] = useState(1);
  const lastLayers = useRef<Layer[]>(effectiveLayers);
  const lastGrain = useRef(effectiveGrain);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      lastLayers.current = effectiveLayers;
      lastGrain.current = effectiveGrain;
      return;
    }
    if (lastLayers.current === effectiveLayers && lastGrain.current === effectiveGrain) return;

    // Mobile GPUs struggle with two full-screen blurred stacks crossfading at
    // once — swap instantly there and keep the crossfade on desktop only.
    if (window.matchMedia("(max-width: 767px)").matches) {
      lastLayers.current = effectiveLayers;
      lastGrain.current = effectiveGrain;
      return;
    }

    setPrevStack({ layers: lastLayers.current, grain: lastGrain.current });
    lastLayers.current = effectiveLayers;
    lastGrain.current = effectiveGrain;
    setPrevOpacity(1);

    const raf = requestAnimationFrame(() => setPrevOpacity(0));
    const timer = setTimeout(() => setPrevStack(null), 750);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [effectiveLayers, effectiveGrain]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Fading-out previous stack (on top) */}
      {prevStack && (
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{
            opacity: prevOpacity,
            zIndex: 2,
          }}
        >
          {renderStack(prevStack, false, !isDark)}
        </div>
      )}

      {/* Current stack */}
      <div className="absolute inset-0">
        {renderStack({ layers: effectiveLayers, grain: effectiveGrain }, false, !isDark)}
      </div>
    </div>
  );
}
