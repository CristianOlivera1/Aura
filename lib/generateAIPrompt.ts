import type { Gradient, Layer } from "@/lib/gradients";

/**
 * Generates a professional, descriptive AI prompt that users can send to
 * ChatGPT, Claude, Copilot, etc. to replicate the gradient in any project.
 *
 * KEY ARCHITECTURE:
 * - Blend-mode gradients (aura category): base color goes on BODY/page,
 *   container is transparent, layers blend against the body.
 * - Non-blend-mode gradients (flux, lattice, etc.): base color goes on
 *   the container directly.
 */

function usesBlendModes(layers: Layer[]): boolean {
  return layers.some((l) => l.blendMode !== "normal");
}

/** Scale blur for fullscreen use — card thumbnails use raw values,
 *  but page backgrounds need much higher blur for the atmospheric effect. */
function scaleBlur(blur: number): { mobile: number; desktop: number } {
  if (blur <= 0) return { mobile: 0, desktop: 0 };
  return { mobile: 90, desktop: 130 };
}

/** The actual body background colors from the CSS palette.
 *  These are the colors blend modes composite against. */
function bodyBg(dark: boolean): string {
  return dark ? "#100e0b" : "#faf8f2";
}

export function generateAIPrompt(g: Gradient, layers: Layer[]): string {
  const bg = bodyBg(g.dark);
  const hasBlend = usesBlendModes(layers);

  const layerDescriptions = layers
    .map((l, i) => {
      const type = l.background.startsWith("radial")
        ? "Radial gradient"
        : l.background.startsWith("conic")
          ? "Conic gradient"
          : l.background.startsWith("repeating")
            ? "Repeating gradient"
            : "Linear gradient";
      const b = scaleBlur(l.blur);
      const blurText = b.mobile > 0 ? `blur: \`${b.mobile}px\` (mobile) / \`${b.desktop}px\` (desktop)` : "no blur";
      return `- **Layer ${i + 1}:** ${type}. Blend mode: \`${l.blendMode}\`, ${blurText}${l.opacity != null && l.opacity !== 1 ? `, opacity: ${l.opacity}` : ""}.`;
    })
    .join("\n");

  const blendNote = hasBlend
    ? `

### ⚠️ Critical: Blend Mode Architecture
These layers use CSS \`mix-blend-mode\` (${[...new Set(layers.map((l) => l.blendMode))].filter((m) => m !== "normal").join(", ")}). 
Blend modes composite against whatever is **behind** the element — the page/body background.

**DO NOT** set \`background-color\` on the gradient container itself. Instead:
1. Set \`background-color: ${bg}\` on the **\`<body>\`** or **page wrapper**.
2. The gradient container must be **transparent** (no background).
3. The layers will blend against the body background to create the atmospheric effect.

If you put the base color on the container, the blend modes will composite against that instead of the page, producing incorrect (washed-out or too dark) results.`
    : "";

  const cssLayers = layers
    .map(
      (l, i) => {
        const b = scaleBlur(l.blur);
        const blurCSS = b.mobile > 0 ? `\n  filter: blur(${b.mobile}px); /* use ${b.desktop}px on desktop */` : "";
        return `.aura-layer-${i + 1} {\n  position: absolute;\n  inset: 0;\n  background: ${l.background};${l.backgroundSize ? `\n  background-size: ${l.backgroundSize};` : ""}\n  mix-blend-mode: ${l.blendMode};${blurCSS}${l.opacity != null && l.opacity !== 1 ? `\n  opacity: ${l.opacity};` : ""}\n  pointer-events: none;\n  transform: translateZ(0);\n  will-change: transform;\n}`;
      },
    )
    .join("\n\n");

  const bodyCSS = hasBlend
    ? `/* Set base color on the BODY, not on the container */\nbody {\n  background-color: ${bg};\n}\n\n.aura-bg {\n  position: relative;\n  overflow: hidden;\n  /* NO background-color here — blend modes need to see through to body */\n}`
    : `.aura-bg {\n  position: relative;\n  overflow: hidden;\n  background-color: ${bg};\n}`;

  const reactBg = hasBlend
    ? `    <div\n      style={{\n        position: "relative",\n        overflow: "hidden",\n        /* NO backgroundColor — blend modes composite against body/page bg */\n      }}\n    >`
    : `    <div\n      style={{\n        position: "relative",\n        overflow: "hidden",\n        backgroundColor: "${bg}",\n      }}\n    >`;

  const reactLayers = layers
    .map(
      (l) => {
        const b = scaleBlur(l.blur);
        return `      <div\n        style={{\n          position: "absolute",\n          inset: 0,\n          background: "${l.background}",${l.backgroundSize ? `\n          backgroundSize: "${l.backgroundSize}",` : ""}\n          mixBlendMode: "${l.blendMode}",${b.mobile > 0 ? `\n          filter: "blur(${b.mobile}px)", /* ${b.desktop}px on desktop */` : ""}${l.opacity != null && l.opacity !== 1 ? `\n          opacity: ${l.opacity},` : ""}\n          pointerEvents: "none",\n          transform: "translateZ(0)",\n        }}\n        aria-hidden="true"\n      />`;
      },
    )
    .join("\n");

  const bodyNote = hasBlend
    ? `\n\n> **Remember:** Set \`body { background-color: ${bg}; }\` in your global CSS. The component container must NOT have its own background-color.`
    : "";

  return `## Aura Gradient: "${g.name}"

### Visual Description
A ${g.mood} atmospheric gradient background${hasBlend ? " using layered CSS blend modes" : ""}.
Category: **${g.category}**. Theme: **${g.dark ? "dark" : "light"}**.
The composition uses ${layers.length} layer${layers.length > 1 ? "s" : ""} over a ${g.dark ? "dark" : "light"} base color (\`${bg}\`):

${layerDescriptions}
${g.grain ? "\nA **grain texture overlay** (SVG feTurbulence noise) is applied on top for an analog film feel." : ""}
${blendNote}

### Implementation Notes
- Each layer is an absolutely-positioned div with its own \`mix-blend-mode\` and optional \`filter: blur()\`.
- Use \`transform: translateZ(0)\` or \`will-change: transform\` on blur layers for GPU acceleration.
- All decorative layers should have \`pointer-events: none\` and \`aria-hidden="true"\`.
- The parent container needs \`position: relative\` and \`overflow: hidden\`.${hasBlend ? `\n- **The base color (${bg}) must be on the body/page, NOT on the container.**` : ""}

### CSS Code

\`\`\`css
/* ${g.name} — Aura */
${bodyCSS}

${cssLayers}
\`\`\`

### React / Next.js

\`\`\`tsx
export function AuraBackground() {
  return (
${reactBg}
${reactLayers}
      {/* Your content here */}
    </div>
  );
}
\`\`\`${bodyNote}

### Vanilla HTML

\`\`\`html
<div class="aura-bg">
${layers.map((_, i) => `  <div class="aura-layer-${i + 1}" aria-hidden="true"></div>`).join("\n")}
  <!-- Your content here -->
</div>
\`\`\`
`;
}
