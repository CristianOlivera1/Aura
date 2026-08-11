"use client";

import { useState, useCallback, useMemo, useRef, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import { toPng, toSvg } from "html-to-image";
import { useGradients } from "@/components/GradientProvider";
import { CodeBlock } from "@/components/customizer/CodeBlock";
import { GrainOverlay } from "@/components/GrainOverlay";
import { EXPORT_FORMATS, exportGradient, type ExportFormat } from "@/lib/exportFormats";
import { generateAIPrompt } from "@/lib/generateAIPrompt";

const FORMAT_LANGS: Record<ExportFormat, "css" | "html" | "tsx" | "javascript"> = {
  css: "css",
  tailwind: "html",
  variables: "css",
  cssinjs: "tsx",
};

const EXPORT_W = 1600;
const EXPORT_H = 900;

/** Scale blur for fullscreen/download — raw values are for card thumbnails */
function scaleBlur(blur: number): number {
  return blur > 0 ? 90 : 0;
}

/** True if the PNG data URL has actual painted pixels (not fully transparent) */
function hasVisiblePixels(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = EXPORT_W;
        c.height = EXPORT_H;
        const ctx = c.getContext("2d");
        if (!ctx) return resolve(false);
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, EXPORT_W, EXPORT_H).data;
        let visible = 0;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] > 0) visible++;
          if (visible > 200) break;
        }
        resolve(visible > 200);
      } catch {
        resolve(false);
      }
    };
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
}

export function ExportPanel() {
  const { active, effectiveLayers, effectiveGrain, showToast } = useGradients();
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const fmtRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const exportRef = useRef<HTMLDivElement>(null);

  /* Roving-tabindex keyboard nav for the format tabs */
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>, index: number) => {
      let next = -1;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (index + 1) % EXPORT_FORMATS.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (index - 1 + EXPORT_FORMATS.length) % EXPORT_FORMATS.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = EXPORT_FORMATS.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      setFormat(EXPORT_FORMATS[next].id);
      fmtRefs.current[next]?.focus();
    },
    [],
  );

  const handleCopy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(label);
        showToast(`Copied ${label}`);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        showToast("Failed to copy", "error");
      }
    },
    [showToast],
  );

  /* Render the gradient (base + layers + grain) offscreen and download it.
     The snapshot node lives at 0,0 inside an off-screen wrapper — html-to-image
     clones the node with its computed styles, so a `left: -10000px` on the node
     itself would push the content off-canvas and produce a blank image. */
  const handleDownload = useCallback(
    async (format: "png" | "svg") => {
      const node = exportRef.current;
      if (!node || !active) return;
      setDownloading(true);
      try {
        const opts = {
          width: EXPORT_W,
          height: EXPORT_H,
          pixelRatio: 1,
          cacheBust: true,
          style: {
            position: "absolute" as const,
            left: "0",
            top: "0",
            right: "auto",
            bottom: "auto",
            margin: "0",
          },
        };
        const url =
          format === "png" ? await toPng(node, opts) : await toSvg(node, opts);
        if (format === "png" && !(await hasVisiblePixels(url))) {
          throw new Error("blank image");
        }
        const link = document.createElement("a");
        link.download = `${active.id}.${format}`;
        link.href = url;
        link.click();
        showToast(`Downloaded ${active.name} as ${format.toUpperCase()}`);
      } catch {
        showToast("Download failed", "error");
      } finally {
        setDownloading(false);
      }
    },
    [active, showToast],
  );

  const code = useMemo(
    () => (active ? exportGradient(format, active, effectiveLayers) : ""),
    [active, format, effectiveLayers],
  );

  const aiPrompt = useMemo(
    () => (active ? generateAIPrompt(active, effectiveLayers) : ""),
    [active, effectiveLayers],
  );

  if (!active) return null;

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
        Export
      </span>

      {/* Format tabs */}
      <div
        role="tablist"
        aria-label="Export format"
        onKeyDown={(e) => {
          const idx = EXPORT_FORMATS.findIndex((f) => f.id === format);
          if (idx !== -1) handleTabKeyDown(e, idx);
        }}
        className="flex flex-wrap gap-1"
      >
        {EXPORT_FORMATS.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              fmtRefs.current[i] = el;
            }}
            role="tab"
            id={`fmt-${f.id}`}
            aria-selected={format === f.id}
            aria-controls="export-code-panel"
            tabIndex={format === f.id ? 0 : -1}
            onClick={() => setFormat(f.id)}
            className={`flex items-center gap-1 px-2 py-1 text-[12px] rounded transition-all ${
              format === f.id
                ? "bg-white/15 text-white border border-white/20"
                : "text-white/50 hover:text-white/80 border border-transparent"
            }`}
          >
            <Icon icon={f.icon} width={11} height={11} />
            {f.label}
          </button>
        ))}
      </div>

      {/* Syntax-highlighted code preview */}
      <div
        role="tabpanel"
        id="export-code-panel"
        aria-labelledby={`fmt-${format}`}
        className="relative flex flex-1 min-h-0 bg-black/40 border border-white/10 squircle-element overflow-hidden"
      >
        <CodeBlock code={code} language={FORMAT_LANGS[format]} />
        <button
          onClick={() => handleCopy(code, format.toUpperCase())}
          className="absolute top-2 right-4 flex items-center gap-1 bg-white/90 hover:bg-white/20 text-black hover:text-white text-[12px] px-2 py-1 rounded transition-all"
        >
          <Icon
            icon={copied === format.toUpperCase() ? "lucide:check" : "lucide:clipboard-copy"}
            width={11}
            height={11}
          />
          {copied === format.toUpperCase() ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* AI Prompt button */}
      <button
        onClick={() => handleCopy(aiPrompt, "AI Prompt")}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 hover:from-violet-600 hover:to-fuchsia-600 text-white text-xs font-medium py-2.5 px-4 squircle-element transition-all shadow-[0_2px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
      >
        <Icon
          icon={copied === "AI Prompt" ? "lucide:check" : "lucide:sparkles"}
          width={14}
          height={14}
        />
        {copied === "AI Prompt" ? "Prompt Copied!" : "Copy AI Prompt"}
      </button>

      {/* Download as image */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleDownload("png")}
          disabled={downloading}
          className="flex flex-1 items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-medium py-2.5 px-4 squircle-element transition-all border border-white/10 disabled:opacity-50"
        >
          <Icon
            icon={downloading ? "lucide:loader-circle" : "lucide:image-down"}
            width={14}
            height={14}
            className={downloading ? "animate-spin" : ""}
          />
          Download PNG
        </button>
        <button
          onClick={() => handleDownload("svg")}
          disabled={downloading}
          className="flex flex-1 items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-medium py-2.5 px-4 squircle-element transition-all border border-white/10 disabled:opacity-50"
        >
          <Icon icon="lucide:file-down" width={14} height={14} />
          Download SVG
        </button>
      </div>

      {/* Hidden export stage — off-screen wrapper, snapshot node at 0,0 */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", left: -9999, top: 0, pointerEvents: "none", zIndex: -1 }}
      >
        <div
          ref={exportRef}
          style={{
            width: EXPORT_W,
            height: EXPORT_H,
            position: "relative",
            backgroundColor: "var(--color-bg)",
          }}
        >
          {effectiveLayers.map((layer, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: layer.background,
                backgroundSize: layer.backgroundSize ?? "cover",
                mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
                filter: layer.blur > 0 ? `blur(${scaleBlur(layer.blur)}px)` : undefined,
                opacity: layer.opacity ?? 1,
              }}
            />
          ))}
          {effectiveGrain && <GrainOverlay className="absolute inset-0" />}
        </div>
      </div>
    </div>
  );
}
