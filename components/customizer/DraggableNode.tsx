"use client";

import { useCallback, useRef, type PointerEvent } from "react";

interface Props {
  /** Position as percentage (0–100) */
  x: number;
  y: number;
  color: string;
  label: string;
  onMove: (x: number, y: number) => void;
}

/**
 * A draggable circular node rendered on top of the gradient preview.
 * Uses pointer capture for smooth cross-element dragging.
 */
export function DraggableNode({ x, y, color, label, onMove }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      // Get position relative to the preview container (parent of parent)
      const preview = (e.target as HTMLElement).closest("[data-customizer-preview]");
      if (!preview) return;
      const rect = preview.getBoundingClientRect();
      const nx = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const ny = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      onMove(nx, ny);
    },
    [onMove],
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group touch-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={`${label} — ${Math.round(x)}%, ${Math.round(y)}%`}
    >
      {/* Outer glow ring */}
      <div
        className="absolute -inset-3 rounded-full opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"
        style={{ backgroundColor: color }}
      />
      {/* Node circle */}
      <div
        className="relative w-5 h-5 rounded-full border-2 border-white shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-125 group-active:scale-110"
        style={{ backgroundColor: color }}
      />
      {/* Position tooltip (visible on hover/drag) */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none">
        <span className="bg-black/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap">
          {Math.round(x)}%, {Math.round(y)}%
        </span>
      </div>
    </div>
  );
}
