import type { Gradient, Layer } from "@/lib/gradients";

/**
 * Generates a professional, descriptive AI prompt that users can send to
 * ChatGPT, Claude, Copilot, etc. to replicate the gradient in any project.
 *
 * Includes: visual description, full CSS code, and integration snippets
 * for React, Vue 3, Svelte, and vanilla HTML.
 */
export function generateAIPrompt(g: Gradient, layers: Layer[]): string {
  const layerDescriptions = layers
    .map((l, i) => {
      const type = l.background.startsWith("radial")
        ? "Radial gradient"
        : l.background.startsWith("conic")
          ? "Conic gradient"
          : l.background.startsWith("repeating")
            ? "Repeating gradient"
            : "Linear gradient";
      return `- **Layer ${i + 1}:** ${type}. Blend mode: \`${l.blendMode}\`, blur: \`${l.blur}px\`${l.opacity != null && l.opacity !== 1 ? `, opacity: ${l.opacity}` : ""}.`;
    })
    .join("\n");

  const cssLayers = layers
    .map(
      (l, i) =>
        `.aura-layer-${i + 1} {\n  position: absolute;\n  inset: 0;\n  background: ${l.background};${l.backgroundSize ? `\n  background-size: ${l.backgroundSize};` : ""}\n  mix-blend-mode: ${l.blendMode};${l.blur > 0 ? `\n  filter: blur(${l.blur}px);` : ""}${l.opacity != null && l.opacity !== 1 ? `\n  opacity: ${l.opacity};` : ""}\n  pointer-events: none;\n}`,
    )
    .join("\n\n");

  const reactLayers = layers
    .map(
      (l, i) =>
        `      <div\n        style={{\n          position: "absolute",\n          inset: 0,\n          background: "${l.background}",${l.backgroundSize ? `\n          backgroundSize: "${l.backgroundSize}",` : ""}\n          mixBlendMode: "${l.blendMode}",${l.blur > 0 ? `\n          filter: "blur(${l.blur}px)",` : ""}${l.opacity != null && l.opacity !== 1 ? `\n          opacity: ${l.opacity},` : ""}\n          pointerEvents: "none",\n        }}\n        aria-hidden="true"\n      />`,
    )
    .join("\n");

  const vueLayers = layers
    .map(
      (l, i) =>
        `    <div\n      :style="{\n        position: 'absolute',\n        inset: 0,\n        background: '${l.background.replace(/'/g, "\\'")}',${l.backgroundSize ? `\n        backgroundSize: '${l.backgroundSize}',` : ""}\n        mixBlendMode: '${l.blendMode}',${l.blur > 0 ? `\n        filter: 'blur(${l.blur}px)',` : ""}${l.opacity != null && l.opacity !== 1 ? `\n        opacity: ${l.opacity},` : ""}\n        pointerEvents: 'none',\n      }"\n      aria-hidden="true"\n    />`,
    )
    .join("\n");

  const svelteLayers = layers
    .map(
      (l, i) =>
        `  <div\n    style="position:absolute;inset:0;background:${l.background};${l.backgroundSize ? `background-size:${l.backgroundSize};` : ""}mix-blend-mode:${l.blendMode};${l.blur > 0 ? `filter:blur(${l.blur}px);` : ""}${l.opacity != null && l.opacity !== 1 ? `opacity:${l.opacity};` : ""}pointer-events:none;"\n    aria-hidden="true"\n  ></div>`,
    )
    .join("\n");

  return `## Aura Gradient: "${g.name}"

### Visual Description
A ${g.mood} atmospheric gradient background using layered CSS blend modes.
Category: **${g.category}**. Theme: **${g.dark ? "dark" : "light"}**.
The composition uses ${layers.length} layer${layers.length > 1 ? "s" : ""} over a ${g.dark ? "dark" : "light"} base color (\`${g.base}\`):

${layerDescriptions}
${g.grain ? "\nA **grain texture overlay** (SVG feTurbulence noise) is applied on top for an analog film feel." : ""}

### Implementation Notes
- Each layer is an absolutely-positioned div with its own \`mix-blend-mode\` and optional \`filter: blur()\`.
- Use \`transform: translateZ(0)\` or \`will-change: transform\` on blur layers for GPU acceleration.
- All decorative layers should have \`pointer-events: none\` and \`aria-hidden="true"\`.
- The parent container needs \`position: relative\` and \`overflow: hidden\`.

### CSS Code

\`\`\`css
/* ${g.name} — Aura */
.aura-bg {
  position: relative;
  overflow: hidden;
  background-color: ${g.base};
}

${cssLayers}
\`\`\`

### React / Next.js

\`\`\`tsx
export function AuraBackground() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "${g.base}",
      }}
    >
${reactLayers}
      {/* Your content here */}
    </div>
  );
}
\`\`\`

### Vue 3

\`\`\`vue
<template>
  <div :style="{ position: 'relative', overflow: 'hidden', backgroundColor: '${g.base}' }">
${vueLayers}
    <!-- Your content here -->
  </div>
</template>
\`\`\`

### Svelte

\`\`\`svelte
<div style="position:relative;overflow:hidden;background-color:${g.base};">
${svelteLayers}
  <!-- Your content here -->
</div>
\`\`\`

### Vanilla HTML

\`\`\`html
<div class="aura-bg">
${layers.map((_, i) => `  <div class="aura-layer-${i + 1}" aria-hidden="true"></div>`).join("\n")}
  <!-- Your content here -->
</div>
\`\`\`
`;
}
