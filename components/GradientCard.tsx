"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { type Gradient } from "@/lib/gradients";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  gradient: Gradient;
  index: number;
}

export function GradientCard({ gradient, index }: Props) {
  const { active, apply, toggleFullscreen } = useGradients();
  const isActive = active?.id === gradient.id;
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal<HTMLDivElement>({ stagger: index % 3 });

  /* ── 3D tilt effect ── */

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const highlight = highlightRef.current;
    if (!card || !highlight) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    highlight.style.opacity = "1";
    highlight.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.25), transparent 60%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const highlight = highlightRef.current;
    if (card) card.style.transform = "";
    if (highlight) highlight.style.opacity = "0";
  }, []);

  /* ── Preview (background only) ── */

  const handlePreview = useCallback(() => {
    apply(gradient.id);
  }, [apply, gradient.id]);

  /* ── Customize (opens fullscreen modal) ── */

  const handleCustomize = useCallback(() => {
    apply(gradient.id);
    toggleFullscreen();
  }, [apply, gradient.id, toggleFullscreen]);

  return (
    <div ref={revealRef} className="reveal">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`swatch marks relative aspect-square border-r border-b border-muted overflow-hidden transition-transform duration-300 ease-out ${
          isActive ? "is-active" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-[#0c0a08]" />
        <div
          className="absolute inset-0 mix-blend-hard-light blur-[36px]"
          style={{ background: gradient.hard }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light blur-[36px]"
          style={{ background: gradient.soft }}
        />

        {/* 3D highlight that follows cursor */}
        <div
          ref={highlightRef}
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Hover overlay with actions */}
        <div className="swatch-overlay absolute inset-0 bg-black/35 flex items-center justify-center gap-3 z-30">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 bg-white/95 text-[#14130f] px-4 py-2 text-sm font-medium hover:bg-white transition-colors rounded-md"
          >
            <Icon icon="lucide:eye" width={14} height={14} />
            Preview
          </button>
          <button
            onClick={handleCustomize}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm rounded-md border border-white/20"
          >
            <Icon icon="lucide:sliders-horizontal" width={14} height={14} />
            Personalizar
          </button>
        </div>

        {/* Active badge */}
        {isActive && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-accent text-accent-fg text-[10px] font-medium uppercase tracking-wide px-2 py-1 z-30 rounded-sm">
            <Icon icon="lucide:check" width={11} height={11} />
            Active
          </span>
        )}

        {/* Name + description */}
        <div className="absolute left-4 bottom-4 leading-tight z-10">
          <p className="text-sm text-white font-medium">{gradient.name}</p>
          <p className="text-[10px] text-white/70 mt-0.5">{gradient.desc}</p>
        </div>

        {/* Corner marks */}
        <Icon icon="lucide:plus" className="corner-mark tl" />
        <Icon icon="lucide:plus" className="corner-mark tr" />
        <Icon icon="lucide:plus" className="corner-mark bl" />
        <Icon icon="lucide:plus" className="corner-mark br" />
      </div>
    </div>
  );
}
