"use client";

import { useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { gradientToCSS } from "@/lib/gradients";

export function FullscreenPreview() {
  const { active, fullscreen, toggleFullscreen, showToast, goNext, goPrev, effectiveBase } =
    useGradients();

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!fullscreen) return;
      switch (e.key) {
        case "Escape":
          toggleFullscreen();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    },
    [fullscreen, toggleFullscreen, goNext, goPrev],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Copy CSS ── */
  const handleCopy = useCallback(async () => {
    if (!active) return;
    const css = gradientToCSS(active);
    try {
      await navigator.clipboard.writeText(css);
      showToast(`Copied "${active.name}" CSS`);
    } catch {
      showToast("Failed to copy");
    }
  }, [active, showToast]);

  if (!fullscreen || !active) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        animation: "fullscreen-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {/* Base color from customizer state */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: effectiveBase }}
      />

      {/* Dynamic layers */}
      {active.layers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: layer.background,
            backgroundSize: layer.backgroundSize,
            mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
            filter: layer.blur > 0 ? `blur(${Math.min(layer.blur * 2.5, 130)}px)` : undefined,
            opacity: layer.opacity ?? 1,
          }}
        />
      ))}

      {/* Grain overlay */}
      {active.grain && <GrainOverlay className="absolute inset-0" />}

      {/* Click backdrop to close */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={toggleFullscreen}
      />

      {/* Close button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 z-30 glass border border-white/20 w-10 h-10 flex items-center justify-center text-white hover:border-white/40 transition-colors rounded-full"
      >
        <Icon icon="lucide:x" width={18} height={18} />
      </button>

      {/* Side navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 glass border border-white/20 w-12 h-12 flex items-center justify-center text-white hover:border-white/40 transition-colors rounded-full"
      >
        <Icon icon="lucide:chevron-left" width={20} height={20} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 glass border border-white/20 w-12 h-12 flex items-center justify-center text-white hover:border-white/40 transition-colors rounded-full"
      >
        <Icon icon="lucide:chevron-right" width={20} height={20} />
      </button>

      {/* Bottom toolbar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="glass border border-white/20 flex items-center gap-4 px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">
              {active.name}
            </span>
            <span className="text-[11px] text-white/60">
              {active.category} · {active.desc}
            </span>
          </div>

          <span className="w-px h-6 bg-white/20" />

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <Icon icon="lucide:clipboard-copy" width={14} height={14} />
            Copy CSS
          </button>

          <span className="w-px h-6 bg-white/20" />

          <span className="flex items-center gap-2 text-white/40 text-xs">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
              ←
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
              →
            </kbd>
            navigate
            <span className="ml-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                esc
              </kbd>{" "}
              close
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
