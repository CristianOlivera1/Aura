"use client";

import { useId } from "react";

/**
 * Film-grain noise overlay for the "grain" category.
 * feTurbulence is remapped to neutral mid-gray noise and blended with
 * `overlay`, so it adds texture without shifting brightness or hue.
 */
export function GrainOverlay({ className = "" }: { className?: string }) {
  const filterId = `grain-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ mixBlendMode: "overlay", opacity: 0.85 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0.181 0.608 0.061 0 0.075
                    0.181 0.608 0.061 0 0.075
                    0.181 0.608 0.061 0 0.075
                    0     0     0     1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
