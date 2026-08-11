"use client";

import { useCallback, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
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
import type { Layer } from "@/lib/gradients";

export function Customizer() {
  const {
    active,
    fullscreen,
    toggleFullscreen,
    goNext,
    goPrev,
    effectiveLayers,
    effectiveBase,
    effectiveGrain,
    dispatchCustom,
  } = useGradients();

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!fullscreen) return;
      if (e.key === "Escape") toggleFullscreen();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        dispatchCustom({ type: "UNDO" });
      }
    },
    [fullscreen, toggleFullscreen, goNext, goPrev, dispatchCustom],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
      base: active.base,
      grain: active.grain ?? false,
    });
  }, [active, dispatchCustom]);

  const handleBaseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatchCustom({ type: "SET_BASE", base: e.target.value });
    },
    [dispatchCustom],
  );

  const handleGrainToggle = useCallback(() => {
    dispatchCustom({ type: "SET_GRAIN", grain: !effectiveGrain });
  }, [effectiveGrain, dispatchCustom]);

  if (!fullscreen || !active) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex"
      style={{
        animation: "fullscreen-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {/* ══ Left: Live Preview ══ */}
      <div
        className="relative flex-1 overflow-hidden bg-bg transition-colors duration-300"
        data-customizer-preview
      >
        {/* Background comes from bg-bg = var(--color-bg) — the same CSS variable
            as the body. This ensures blend modes composite identically to
            AuraBackground which also has NO own background. */}

        {/* Dynamic layers */}
        {effectiveLayers.map((layer, i) => (
          <div
            key={i}
            className={`absolute inset-0 ${layer.blur > 0 ? "blur-[90px] md:blur-[130px]" : ""}`}
            style={{
              backgroundImage: layer.background,
              backgroundSize: layer.backgroundSize ?? "cover",
              mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
              opacity: layer.opacity ?? 1,
            }}
          />
        ))}

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

        {/* Gradient name overlay */}
        <div className="absolute bottom-6 left-6 z-20">
          <h2 className="text-xl font-semibold text-white">{active.name}</h2>
          <p className="text-xs text-white/50 mt-0.5">{active.category} · {active.desc}</p>
        </div>
      </div>

      {/* ══ Right: Control Panel ══ */}
      <div className="w-[340px] bg-[#0e0e14]/95 backdrop-blur-xl border-l border-white/10 flex flex-col overflow-hidden">
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:sliders-horizontal" width={15} height={15} className="text-white/60" />
            <span className="text-sm font-medium text-white">Customize</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              title="Reset to original"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
            >
              <Icon icon="lucide:rotate-ccw" width={14} height={14} />
            </button>
            <button
              onClick={() => dispatchCustom({ type: "UNDO" })}
              title="Undo (Ctrl+Z)"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
            >
              <Icon icon="lucide:undo-2" width={14} height={14} />
            </button>
            <button
              onClick={toggleFullscreen}
              title="Close"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
            >
              <Icon icon="lucide:x" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* Scrollable controls */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-thin">
          {/* Global controls */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
              Global
            </span>

            {/* Base color */}
            <div className="flex items-center gap-3">
              <label className="text-[11px] text-white/60 w-16 shrink-0">Base</label>
              <div className="relative flex items-center gap-2 flex-1">
                <input
                  type="color"
                  value={effectiveBase}
                  onChange={handleBaseChange}
                  className="w-8 h-8 rounded cursor-pointer border border-white/20"
                />
                <span className="text-[11px] text-white/50 font-mono">{effectiveBase}</span>
              </div>
            </div>

            {/* Grain toggle */}
            <div className="flex items-center gap-3">
              <label className="text-[11px] text-white/60 w-16 shrink-0">Grain</label>
              <button
                onClick={handleGrainToggle}
                className={`relative w-9 h-5 rounded-full transition-colors ${
                  effectiveGrain ? "bg-violet-600" : "bg-white/15"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    effectiveGrain ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Layers */}
          <LayerPanel
            layers={effectiveLayers}
            onUpdateLayer={handleUpdateLayer}
            onRemoveLayer={handleRemoveLayer}
            onAddLayer={handleAddLayer}
            onReorder={handleReorder}
          />

          <div className="h-px bg-white/10" />

          {/* Export */}
          <ExportPanel />
        </div>

        {/* Keyboard hints */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center gap-3 text-white/30 text-[10px]">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-[9px]">←→</kbd> nav
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-[9px]">⌘Z</kbd> undo
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-[9px]">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
