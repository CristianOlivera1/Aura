"use client";

import { useGradients } from "@/components/GradientProvider";
import { GrainOverlay } from "@/components/GrainOverlay";

export function AuraBackground() {
  const { effectiveLayers, effectiveGrain } = useGradients();

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* No base layer here — blend modes composite directly against the
          body background (var(--color-bg)), which is how the original aura
          gradients were designed to look correct in both light and dark. */}

      {/* Dynamic layers — from customizer state */}
      {effectiveLayers.map((layer, i) => (
        <div
          key={i}
          className={`absolute inset-0 transform-gpu will-change-transform transition-[background-image] duration-700 ${layer.blur > 0 ? "blur-[90px] md:blur-[130px]" : ""}`}
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
    </div>
  );
}
