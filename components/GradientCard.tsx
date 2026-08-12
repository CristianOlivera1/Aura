"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { resolveBlendMode, type Gradient, CATEGORIES } from "@/lib/gradients";
import { exportAllFormats } from "@/lib/exportFormats";
import { generateAIPrompt } from "@/lib/generateAIPrompt";
import { copyToClipboard } from "@/lib/clipboard";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  gradient: Gradient;
  index: number;
}

export function GradientCard({ gradient, index }: Props) {
  const { active, apply, preview, toggleFullscreen, flashTick, favorites, toggleFavorite, showToast } =
    useGradients();
  const isActive = active?.id === gradient.id;
  const isFavorite = favorites.includes(gradient.id);

  const [copied, setCopied] = useState<string | null>(null);

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

  const handleCopyPrompt = useCallback(async () => {
    const text = generateAIPrompt(
      gradient,
      gradient.layers,
      gradient.grain ?? false,
      !gradient.dark,
    );
    const ok = await copyToClipboard(text.trim());
    if (ok) {
      setCopied("prompt");
      showToast(`Copied AI prompt for ${gradient.name}`);
    } else {
      showToast("Failed to copy", "error");
    }
    setTimeout(() => setCopied(null), 2000);
  }, [gradient, showToast]);

  const handleCopyAll = useCallback(async () => {
    const text = exportAllFormats(gradient, gradient.layers, !gradient.dark);
    const ok = await copyToClipboard(text.trim());
    if (ok) {
      setCopied("all");
      showToast(`Copied ${gradient.name} in all formats`);
    } else {
      showToast("Failed to copy", "error");
    }
    setTimeout(() => setCopied(null), 2000);
  }, [gradient, showToast]);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        preview(gradient.id);
      }
    },
    [preview, gradient.id],
  );

  const handleToggleFavorite = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(gradient.id);
    },
    [toggleFavorite, gradient.id],
  );

  return (
    <div
      ref={revealRef}
      id={`g-${gradient.id}`}
      className="reveal scroll-mt-24 outline-none squircle-element-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
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
        className={`swatch marks relative w-full aspect-[1/1.15] squircle-element-xl border-r border-b border-muted overflow-hidden transition-all duration-300 ease-out shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${isActive ? "is-active" : ""
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
              mixBlendMode: resolveBlendMode(
                layer.blendMode,
                !gradient.dark,
              ) as React.CSSProperties["mixBlendMode"],
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
        <div className="swatch-overlay absolute inset-0 bg-black/35 flex flex-wrap items-center justify-center gap-2 z-30 px-3">
          <button
            onClick={handlePreview}
            className="flex items-center gap-1.5 bg-white/95 text-[#14130f] px-3 py-2 text-[13px] font-medium hover:bg-white transition-colors squircle-element shadow-lg"
          >
            <Icon icon="lucide:eye" width={13} height={13} /> Preview
          </button>
          <button
            onClick={handleCustomize}
            className="flex items-center gap-1.5 bg-white/20 text-white px-3 py-2 text-[13px] font-medium hover:bg-white/50 transition-colors backdrop-blur-sm squircle-element border border-white/20 shadow-lg"
          >
            <Icon icon="lucide:sliders-horizontal" width={13} height={13} /> Customize
          </button>
          <button
            onClick={handleCopyPrompt}
            title="Copy AI prompt for this gradient"
            aria-label="Copy AI prompt for this gradient"
            className="flex items-center gap-1.5 bg-white/20 text-white px-3 py-2 text-[13px] font-medium hover:bg-white/50 transition-colors backdrop-blur-sm squircle-element border border-white/20 shadow-lg"
          >
            <Icon
              icon={copied === "prompt" ? "lucide:check" : "lucide:sparkles"}
              width={13}
              height={13}
            />
            {copied === "prompt" ? "Copied!" : "Copy Prompt"}
          </button>
          <button
            onClick={handleCopyAll}
            title="Copy all formats (CSS, Tailwind, Variables, CSS-in-JS)"
            aria-label="Copy all formats"
            className="flex items-center gap-1.5 bg-white/20 text-white px-3 py-2 text-[13px] font-medium hover:bg-white/50 transition-colors backdrop-blur-sm squircle-element border border-white/20 shadow-lg"
          >
            <Icon
              icon={copied === "all" ? "lucide:check" : "lucide:clipboard-copy"}
              width={13}
              height={13}
            />
            {copied === "all" ? "Copied!" : "Copy All"}
          </button>
        </div>

        {/* Active badge */}
        {isActive && (
          <span className="glass-white absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg z-30 tracking-wider">
            <span className="uppercase tracking-widest text-[10px] text-neutral-950 font-black">
              Active
            </span>
          </span>
        )}

        {/* Favorite toggle */}
        <button
          onClick={handleToggleFavorite}
          title={isFavorite ? "Remove from favorites" : "Save as favorite"}
          aria-label={isFavorite ? "Remove from favorites" : "Save as favorite"}
          aria-pressed={isFavorite}
          className={`absolute top-4 right-4 z-40 flex items-center justify-center p-1.5 transition-all duration-200 ${isFavorite
            ? "text-rose-500 scale-110 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
            : "text-white/60 hover:text-white hover:scale-110"
            }`}
        >
          <Icon
            icon="mdi:heart"
            width={16}
            height={16}
            className={isFavorite ? "fill-current" : ""}
          />
        </button>

        {/* Category badge */}
        {categoryMeta && (
          <span className="absolute top-4 left-4 flex items-center gap-1 bg-black/40 text-white/80 text-[9px] font-medium uppercase tracking-wider px-2 py-1 z-10 squircle-element backdrop-blur-sm border border-white/10">
            <Icon icon={categoryMeta.icon} width={10} height={10} /> {categoryMeta.label}
          </span>
        )}

        {/* Name + description (Con mayor separación y padding de margen) */}
        <div className="absolute left-5 bottom-5 right-5 leading-tight z-10 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <p className="text-base text-white font-semibold">{gradient.name}</p>
            <p className="text-xs text-white/70">{gradient.desc}</p>
          </div>
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