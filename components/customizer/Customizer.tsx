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
      grain: active.grain ?? false,
    });
  }, [active, dispatchCustom]);

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
      <div className="relative flex-1 overflow-hidden bg-[#0c0a08]" data-customizer-preview>
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
          <p className="text-xs text-white/50 mt-0.5">
            {active.category} · {active.desc}
          </p>
        </div>
      </div>

      {/* ══ Right: Control Panel ══ */}
      {/* Aplicando los tonos oscuros de la imagen: #0a0a0a para el panel general y bordes sutiles white/5 */}
      <div className="w-[370px] bg-[#0a0a0a] border-l border-white/5 flex flex-col overflow-hidden">
        {/* Panel header - Fondo ligeramente contrastado */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0d0d0d]">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:sliders-horizontal" width={15} height={15} className="text-white/60" />
            <span className="text-[13px] font-medium text-white/90">Customize</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              title="Reset to original"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:rotate-ccw" width={14} height={14} />
            </button>
            <button
              onClick={() => dispatchCustom({ type: "UNDO" })}
              title="Undo (Ctrl+Z)"
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Icon icon="lucide:undo-2" width={14} height={14} />
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
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto px-5 py-6 space-y-6 ui-styled-scrollbar">
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
            {/* Títulos de sección con el tracking espaciado que se ve en la imagen (e.g. SWATCHES) */}
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
              Global
            </span>

            {/* Grain toggle */}
            <div className="flex items-center justify-between">
              <label className="text-[13px] text-white/60 font-medium">Grain Overlay</label>
              <button
                onClick={handleGrainToggle}
                className={`relative w-9 h-5 rounded-full transition-colors border border-white/5 ${
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
          <div className="flex-1 min-h-0 flex flex-col gap-4 pb-4">
            <ExportPanel />
          </div>
        </div>

        {/* Keyboard hints - Fondo contrastado sutil abajo */}
        <div className="px-5 py-3 border-t border-white/5 bg-[#0d0d0d] flex items-center gap-4 text-white/40 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">←→</kbd> nav
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">⌘Z</kbd> undo
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}