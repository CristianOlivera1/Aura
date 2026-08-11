"use client";

/**
 * SVG noise overlay for the "grain" category.
 * Renders a fullscreen feTurbulence texture with mix-blend-mode: overlay.
 */
export function GrainOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ mixBlendMode: "overlay", opacity: 0.4 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
