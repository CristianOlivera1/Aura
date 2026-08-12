"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { toPng, toSvg } from "html-to-image";
import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { DraggableNode } from "@/components/customizer/DraggableNode";
import { LayerPanel } from "@/components/customizer/LayerPanel";
import { ExportPanel } from "@/components/customizer/ExportPanel";
import {
  extractPosition,
  replacePosition,
  extractDominantColor,
} from "@/hooks/useGradientParser";
import { exportGradient, type ExportFormat } from "@/lib/exportFormats";
import { generateAIPrompt } from "@/lib/generateAIPrompt";
import type { Layer } from "@/lib/gradients";
import { resolveBlendMode, scaleBlurFull } from "@/lib/gradients";

const EXPORT_W = 1600;
const EXPORT_H = 900;

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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Customizer() {
  const {
    active,
    fullscreen,
    toggleFullscreen,
    goNext,
    goPrev,
    random,
    effectiveLayers,
    effectiveGrain,
    isDark,
    toggleTheme,
    favorites,
    toggleFavorite,
    custom,
    dispatchCustom,
    showToast,
  } = useGradients();

  const modalRef = useRef<HTMLDivElement>(null);
  const canUndo = custom.history.length > 0;
  const canRedo = custom.redo.length > 0;

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!fullscreen) return;
      if (e.key === "Escape") toggleFullscreen();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "r" || e.key === "R") random();
      if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        dispatchCustom({ type: e.shiftKey ? "REDO" : "UNDO" });
      }
    },
    [fullscreen, toggleFullscreen, goNext, goPrev, random, dispatchCustom],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Focus trap: keep Tab navigation inside the dialog, restore focus on close ── */
  useEffect(() => {
    if (!fullscreen) return;
    const modal = modalRef.current;
    if (!modal) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      );

    (focusables()[0] ?? modal).focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (current === first || !modal.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else if (current === last || !modal.contains(current)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trap);
    return () => {
      window.removeEventListener("keydown", trap);
      previouslyFocused?.focus();
    };
  }, [fullscreen]);

  /* ── Node data (only for positioned gradients) ── */
  const nodes = useMemo(
    () =>
      effectiveLayers.map((layer, i) => ({
        index: i,
        position: extractPosition(layer.background),
        color: extractDominantColor(layer.background),
      })),
    [effectiveLayers],
  );

  /* ── Handlers ── */
  const handleNodeMove = useCallback(
    (layerIndex: number, x: number, y: number) => {
      const layer = effectiveLayers[layerIndex];
      if (!layer) return;
      const newBg = replacePosition(layer.background, x, y);
      dispatchCustom({
        type: "UPDATE_LAYER",
        index: layerIndex,
        layer: { ...layer, background: newBg },
      });
    },
    [effectiveLayers, dispatchCustom],
  );

  const handleUpdateLayer = useCallback(
    (index: number, layer: Layer) => {
      dispatchCustom({ type: "UPDATE_LAYER", index, layer });
    },
    [dispatchCustom],
  );

  const handleRemoveLayer = useCallback(
    (index: number) => {
      dispatchCustom({ type: "REMOVE_LAYER", index });
    },
    [dispatchCustom],
  );

  const handleAddLayer = useCallback(() => {
    const rx = Math.round(20 + Math.random() * 60);
    const ry = Math.round(20 + Math.random() * 60);
    const newLayer: Layer = {
      background: `radial-gradient(circle at ${rx}% ${ry}%, rgba(139,92,246,0.5) 0%, transparent 50%)`,
      blendMode: "screen",
      blur: 50,
      opacity: 1,
    };
    dispatchCustom({ type: "ADD_LAYER", layer: newLayer });
  }, [dispatchCustom]);

  const handleReorder = useCallback(
    (from: number, to: number) => {
      dispatchCustom({ type: "REORDER", from, to });
    },
    [dispatchCustom],
  );

  const handleReset = useCallback(() => {
    if (!active) return;
    dispatchCustom({
      type: "RESET",
      layers: active.layers,
      grain: active.grain ?? false,
    });
  }, [active, dispatchCustom]);

  const handleGrainToggle = useCallback(() => {
    dispatchCustom({ type: "SET_GRAIN", grain: !effectiveGrain });
  }, [effectiveGrain, dispatchCustom]);

  /* ── Export actions ── */
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const code = useMemo(
    () => (active ? exportGradient(format, active, effectiveLayers, !isDark) : ""),
    [active, format, effectiveLayers, isDark],
  );

  const aiPrompt = useMemo(
    () => (active ? generateAIPrompt(active, effectiveLayers, effectiveGrain, !isDark) : ""),
    [active, effectiveLayers, effectiveGrain, isDark],
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
    async (dlFormat: "png" | "svg") => {
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
          dlFormat === "png" ? await toPng(node, opts) : await toSvg(node, opts);
        if (dlFormat === "png" && !(await hasVisiblePixels(url))) {
          throw new Error("blank image");
        }
        const link = document.createElement("a");
        link.download = `${active.id}.${dlFormat}`;
        link.href = url;
        link.click();
        showToast(`Downloaded ${active.name} as ${dlFormat.toUpperCase()}`);
      } catch {
        showToast("Download failed", "error");
      } finally {
        setDownloading(false);
      }
    },
    [active, showToast],
  );

  if (!fullscreen || !active) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Gradient customizer"
      className="fixed inset-0 z-[100] flex"
      style={{
        animation: "fullscreen-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {/* ══ Left: Live Preview ══ */}
      <div className="relative flex-1 overflow-hidden bg-[var(--color-bg)]" data-customizer-preview>
        {/* Dynamic layers */}
        {effectiveLayers.map((layer, i) => {
          const b = scaleBlurFull(layer.blur);
          const blurActive = b.mobile > 0;
          return (
            <div
              key={i}
              className={`absolute inset-0 ${blurActive ? "aura-blur" : ""}`}
              style={{
                ...(blurActive
                  ? ({ "--blur-m": `${b.mobile}px`, "--blur-d": `${b.desktop}px` } as React.CSSProperties)
                  : {}),
                backgroundImage: layer.background,
                backgroundSize: layer.backgroundSize ?? "cover",
                mixBlendMode: resolveBlendMode(
                  layer.blendMode,
                  !isDark,
                ) as React.CSSProperties["mixBlendMode"],
                opacity: layer.opacity ?? 1,
              }}
            />
          );
        })}

        {/* Grain overlay */}
        {effectiveGrain && <GrainOverlay className="absolute inset-0" />}

        {/* Draggable nodes */}
        {nodes.map(
          (node) =>
            node.position && (
              <DraggableNode
                key={node.index}
                x={node.position.x}
                y={node.position.y}
                color={node.color}
                label={`Layer ${node.index + 1}`}
                onMove={(x, y) => handleNodeMove(node.index, x, y)}
              />
            ),
        )}

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-sm border border-white/15 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all rounded-full"
        >
          <Icon icon="lucide:chevron-left" width={18} height={18} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-sm border border-white/15 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all rounded-full"
        >
          <Icon icon="lucide:chevron-right" width={18} height={18} />
        </button>

        {/* Favorite toggle */}
        <button
          onClick={() => toggleFavorite(active.id)}
          title={favorites.includes(active.id) ? "Remove from favorites" : "Save as favorite"}
          aria-label={favorites.includes(active.id) ? "Remove from favorites" : "Save as favorite"}
          aria-pressed={favorites.includes(active.id)}
          className={`absolute top-4 right-4 z-30 bg-black/30 backdrop-blur-sm border w-10 h-10 flex items-center justify-center rounded-full transition-all ${
            favorites.includes(active.id)
              ? "text-rose-400 fill-current border-white/30"
              : "text-white/70 hover:text-white hover:border-white/30 border-white/15"
          }`}
        >
          <Icon icon="mdi:heart" width={18} height={18} />
        </button>

        {/* Gradient name overlay */}
        <div className="absolute bottom-6 left-6 z-20">
          <h2 className="text-xl font-semibold text-white">{active.name}</h2>
          <p className="text-xs text-white/50 mt-0.5">
            {active.category} · {active.desc}
          </p>
        </div>
      </div>

      {/* ══ Right: Control Panel ══ */}
      {/* Aplicando los tonos oscuros de la imagen: #0a0a0a para el panel general y bordes sutiles white/5 */}
      <div className="w-[420px] bg-[#0a0a0a] border-l border-white/5 flex flex-col overflow-hidden">
        {/* Panel header - Fondo ligeramente contrastado */}
        <div className="flex items-center justify-between px-5 py-2 border-b border-white/5 bg-[#0d0d0d]">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:sliders-horizontal" width={15} height={15} className="text-white/60" />
            <span className="text-[13px] font-medium text-white/90">Customize</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={random}
              title="Random gradient (R)"
              aria-label="Random gradient"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:shuffle" width={14} height={14} />
            </button>
            <button
              onClick={handleReset}
              title="Reset to original"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:rotate-ccw" width={14} height={14} />
            </button>
            <button
              onClick={() => dispatchCustom({ type: "UNDO" })}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
              className="text-white/40 hover:text-white disabled:opacity-30 disabled:hover:text-white/40 transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:undo-2" width={14} height={14} />
            </button>
            <button
              onClick={() => dispatchCustom({ type: "REDO" })}
              disabled={!canRedo}
              title="Redo (Ctrl+Shift+Z)"
              aria-label="Redo"
              className="text-white/40 hover:text-white disabled:opacity-30 disabled:hover:text-white/40 transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:redo-2" width={14} height={14} />
            </button>
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <span key={isDark ? "moon" : "sun"} className="theme-icon-enter">
                <Icon icon={isDark ? "lucide:moon" : "lucide:sun"} width={14} height={14} />
              </span>
            </button>
            <button
              onClick={toggleFullscreen}
              title="Close"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:x" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* Scrollable controls */}
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto px-5 pt-6 pb-0 space-y-4 ui-styled-scrollbar">
          {/* Scrollbar CSS sutil para igualar el aspecto técnico */}
          <style>{`
            .ui-styled-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .ui-styled-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .ui-styled-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.08);
              border-radius: 8px;
            }
            .ui-styled-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.15);
            }
          `}</style>

          {/* Global controls */}
          <div className="flex flex-col gap-4">
            {/* Grain toggle */}
            <div className="flex items-center justify-between">
              <label className="text-[13px] text-white/60 font-medium">Grain Overlay</label>
              <button
                onClick={handleGrainToggle}
                role="switch"
                aria-checked={effectiveGrain}
                aria-label="Grain overlay"
                className={`relative w-9 h-5 rounded-full transition-colors border border-white/5 focus-visible:outline-2 focus-visible:outline-white/60 ${
                  effectiveGrain ? "bg-[#333333]" : "bg-[#141414]"
                }`}
              >
                <div
                  className={`absolute top-[1px] w-4 h-4 rounded-full shadow transition-transform ${
                    effectiveGrain ? "translate-x-4 bg-white" : "translate-x-0.5 bg-white/40"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Layers (Tu componente original se mantiene aquí) */}
          <div className="flex flex-col gap-4">
            <LayerPanel
              layers={effectiveLayers}
              onUpdateLayer={handleUpdateLayer}
              onRemoveLayer={handleRemoveLayer}
              onAddLayer={handleAddLayer}
              onReorder={handleReorder}
            />
          </div>

          <div className="h-px bg-white/5" />

          {/* Export (Tu componente original se mantiene aquí) */}
          <div className="flex flex-col gap-4">
            <ExportPanel
              format={format}
              onFormatChange={setFormat}
              code={code}
              copied={copied}
              onCopy={handleCopy}
            />
          </div>
        </div>

        {/* Fixed export actions - Fondo contrastado abajo */}
        <div className="border-t border-white/5 bg-[#0d0d0d]">
          <div className="px-5 pt-3 pb-2 flex flex-col gap-2">
            <button
              onClick={() => handleCopy(aiPrompt, "AI Prompt")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 hover:from-violet-600 hover:to-fuchsia-600 text-white text-[12px] font-medium py-2 px-3 squircle-element transition-all shadow-[0_2px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
            >
              <Icon
                icon={
                  copied === "AI Prompt" ? "lucide:check" : "lucide:sparkles"
                }
                width={12}
                height={12}
              />
              {copied === "AI Prompt" ? "Prompt Copied!" : "Copy AI Prompt"}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload("png")}
                disabled={downloading}
                className="flex flex-1 items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[12px] font-medium py-2 px-3 squircle-element transition-all border border-white/10 disabled:opacity-50"
              >
                <Icon
                  icon={
                    downloading ? "lucide:loader-circle" : "lucide:image-down"
                  }
                  width={12}
                  height={12}
                  className={downloading ? "animate-spin" : ""}
                />
                Download PNG
              </button>
              <button
                onClick={() => handleDownload("svg")}
                disabled={downloading}
                className="flex flex-1 items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[12px] font-medium py-2 px-3 squircle-element transition-all border border-white/10 disabled:opacity-50"
              >
                <Icon icon="lucide:file-down" width={12} height={12} />
                Download SVG
              </button>
            </div>
          </div>

          {/* Keyboard hints - Fondo contrastado sutil abajo */}
          <div className="px-5 py-3 border-t border-white/5 bg-[#0d0d0d] flex items-center gap-4 text-white/40 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">←→</kbd> nav
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">R</kbd> random
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">⌘Z</kbd> undo
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">esc</kbd> close
            </span>
          </div>
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
                  mixBlendMode: resolveBlendMode(
                    layer.blendMode,
                    !isDark,
                  ) as React.CSSProperties["mixBlendMode"],
                  filter:
                    layer.blur > 0
                      ? `blur(${scaleBlurFull(layer.blur).desktop}px)`
                      : undefined,
                  opacity: layer.opacity ?? 1,
                }}
              />
            ))}
            {effectiveGrain && <GrainOverlay className="absolute inset-0" />}
          </div>
        </div>
      </div>
    </div>
  );
}