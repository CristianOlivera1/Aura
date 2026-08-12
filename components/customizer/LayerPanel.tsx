"use client";

import { useCallback } from "react";
import { Icon } from "@iconify/react";
import type { Layer } from "@/lib/gradients";
import { extractDominantColor, toHex, replaceDominantColor } from "@/hooks/useGradientParser";
import { CustomSelect } from "@/components/customizer/CustomSelect";

const BLEND_MODES = [
  "normal",
  "screen",
  "overlay",
  "hard-light",
  "soft-light",
  "multiply",
  "color-dodge",
  "color-burn",
  "difference",
] as const;

interface Props {
  layers: Layer[];
  onUpdateLayer: (index: number, layer: Layer) => void;
  onRemoveLayer: (index: number) => void;
  onAddLayer: () => void;
  onReorder: (from: number, to: number) => void;
}

export function LayerPanel({ layers, onUpdateLayer, onRemoveLayer, onAddLayer, onReorder }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
          Layers ({layers.length})
        </span>
        <button
          onClick={onAddLayer}
          className="flex items-center gap-1 text-[12px] text-white/60 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
        >
          <Icon icon="lucide:plus" width={10} height={10} />
          Add
        </button>
      </div>

      {layers.map((layer, i) => (
        <LayerRow
          key={layer.id ?? i}
          index={i}
          layer={layer}
          total={layers.length}
          onUpdate={(updated) => onUpdateLayer(i, updated)}
          onRemove={() => onRemoveLayer(i)}
          onMoveUp={i > 0 ? () => onReorder(i, i - 1) : undefined}
          onMoveDown={i < layers.length - 1 ? () => onReorder(i, i + 1) : undefined}
        />
      ))}
    </div>
  );
}

/* ── Single layer row ── */

function LayerRow({
  index,
  layer,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  layer: Layer;
  total: number;
  onUpdate: (layer: Layer) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const dominantColor = extractDominantColor(layer.background);
  const colorHex = toHex(dominantColor);

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newBg = replaceDominantColor(layer.background, dominantColor, e.target.value);
      onUpdate({ ...layer, background: newBg });
    },
    [layer, dominantColor, onUpdate],
  );

  const handleBlendChange = useCallback(
    (value: string) => {
      onUpdate({ ...layer, blendMode: value });
    },
    [layer, onUpdate],
  );

  const handleBlurChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...layer, blur: parseInt(e.target.value, 10) });
    },
    [layer, onUpdate],
  );

  const handleOpacityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...layer, opacity: parseInt(e.target.value, 10) / 100 });
    },
    [layer, onUpdate],
  );

  return (
    <div className="bg-white/5 border border-white/10 squircle-element p-3 space-y-2.5 transition-all hover:border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label
            className="relative w-4 h-4 rounded-full border border-white/30 overflow-hidden shrink-0 cursor-pointer"
            title="Edit dominant color"
          >
            <input
              type="color"
              value={colorHex}
              onChange={handleColorChange}
              aria-label={`Layer ${index + 1} dominant color`}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <span className="absolute inset-0" style={{ backgroundColor: dominantColor }} />
          </label>
          <span className="text-xs text-white/80 font-medium">Layer {index + 1}</span>
        </div>
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <button onClick={onMoveUp} className="text-white/30 hover:text-white/70 transition-colors p-0.5" title="Move up">
              <Icon icon="lucide:chevron-up" width={12} height={12} />
            </button>
          )}
          {onMoveDown && (
            <button onClick={onMoveDown} className="text-white/30 hover:text-white/70 transition-colors p-0.5" title="Move down">
              <Icon icon="lucide:chevron-down" width={12} height={12} />
            </button>
          )}
          {total > 1 && (
            <button onClick={onRemove} className="text-white/30 hover:text-red-400 transition-colors p-0.5 ml-1" title="Remove layer">
              <Icon icon="lucide:trash-2" width={12} height={12} />
            </button>
          )}
        </div>
      </div>

      {/* Blend mode */}
      <div className="flex items-center gap-2">
        <label className="text-[12px] text-white/40 w-12 shrink-0">Blend</label>
        <CustomSelect
          value={layer.blendMode}
          onChange={handleBlendChange}
          options={BLEND_MODES.map((mode) => ({ value: mode, label: mode }))}
          className="flex-1"
        />
      </div>

      {/* Blur slider */}
      <div className="flex items-center gap-2">
        <label className="text-[12px] text-white/40 w-12 shrink-0">Blur</label>
        <input
          type="range"
          min={0}
          max={100}
          value={layer.blur}
          onChange={handleBlurChange}
          className="flex-1 accent-[var(--color-accent)] h-1"
        />
        <span className="text-[12px] text-white/50 w-8 text-right font-mono">{layer.blur}px</span>
      </div>

      {/* Opacity slider */}
      <div className="flex items-center gap-2">
        <label className="text-[12px] text-white/40 w-12 shrink-0">Opacity</label>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round((layer.opacity ?? 1) * 100)}
          onChange={handleOpacityChange}
          className="flex-1 accent-[var(--color-accent)] h-1"
        />
        <span className="text-[12px] text-white/50 w-8 text-right font-mono">{Math.round((layer.opacity ?? 1) * 100)}%</span>
      </div>
    </div>
  );
}
