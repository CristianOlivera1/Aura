"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { type Gradient, CATEGORIES } from "@/lib/gradients";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  gradient: Gradient;
  index: number;
}

export function GradientCard({ gradient, index }: Props) {
  const { active, apply, preview, toggleFullscreen, flashTick } = useGradients();
  const isActive = active?.id === gradient.id;

  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal<HTMLDivElement>({ stagger: index % 3 });

  /* Flash this card when the user returns to the gallery from a preview */
  const [flash, setFlash] = useState(false);
  const prevFlashTick = useRef(flashTick);
  useEffect(() => {
    const changed = prevFlashTick.current !== flashTick;
    prevFlashTick.current = flashTick;
    if (changed && isActive) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 1600);
      return () => clearTimeout(t);
    }
  }, [flashTick, isActive]);

  const categoryMeta = CATEGORIES.find((c) => c.id === gradient.category);

  /* ── 3D tilt effect original ── */
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

  const handlePreview = useCallback(() => {
    preview(gradient.id);
  }, [preview, gradient.id]);

  const handleCustomize = useCallback(() => {
    apply(gradient.id);
    toggleFullscreen();
  }, [apply, gradient.id, toggleFullscreen]);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        preview(gradient.id);
      }
    },
    [preview, gradient.id],
  );

  return (
    <div
      ref={revealRef}
      className="reveal outline-none squircle-element-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      data-card
      tabIndex={0}
      role="group"
      aria-label={`${gradient.name}: ${gradient.desc}`}
      onKeyDown={handleCardKeyDown}
    >
      {/* ── CARD PRINCIPAL (Sin el wrapper del borde giratorio, con sombra sutil y esquinas redondeadas amplias) ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`swatch marks relative w-full aspect-[1/1.15] squircle-element-xl border-r border-b border-muted overflow-hidden transition-all duration-300 ease-out shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${
          isActive ? "is-active" : ""
        } ${flash ? "card-flash" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Base — same body bg color AuraBackground composites against */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: gradient.dark ? "#100e0b" : "#faf8f2" }}
        />

        {/* Dynamic layers */}
        {gradient.layers.map((layer, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backgroundImage: layer.background,
              backgroundSize: layer.backgroundSize ?? "cover",
              mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
              filter: layer.blur > 0 ? `blur(${Math.min(layer.blur, 24)}px)` : undefined,
              opacity: layer.opacity ?? 1,
            }}
          />
        ))}

        {/* Grain overlay */}
        {gradient.grain && <GrainOverlay className="absolute inset-0" />}

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
            className="flex items-center gap-2 bg-white/95 text-[#14130f] px-4 py-2 text-sm font-medium hover:bg-white transition-colors squircle-element shadow-lg"
          >
            <Icon icon="lucide:eye" width={14} height={14} /> Preview
          </button>
          <button
            onClick={handleCustomize}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm squircle-element border border-white/20 shadow-lg"
          >
            <Icon icon="lucide:sliders-horizontal" width={14} height={14} /> Customize
          </button>
        </div>

        {/* Active badge */}
        {isActive && (
          <span className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-[#B38728] via-[#FBF5B7] to-[#AA771C] text-neutral-950 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 z-30 squircle-element shadow-[0_2px_10px_rgba(179,135,40,0.3)] border border-[#FBF5B7]/40">
            <Icon icon="lucide:check" width={11} height={11} className="stroke-[3]" /> Active
          </span>
        )}

        {/* Category badge */}
        {categoryMeta && (
          <span className="absolute top-4 left-4 flex items-center gap-1 bg-black/40 text-white/80 text-[9px] font-medium uppercase tracking-wider px-2 py-1 z-10 squircle-element backdrop-blur-sm border border-white/10">
            <Icon icon={categoryMeta.icon} width={10} height={10} /> {categoryMeta.label}
          </span>
        )}

        {/* Name + description (Con mayor separación y padding de margen) */}
        <div className="absolute left-5 bottom-5 right-5 leading-tight z-10 flex flex-col gap-1.5">
          <p className="text-base text-white font-semibold">{gradient.name}</p>
          <p className="text-xs text-white/70">{gradient.desc}</p>
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