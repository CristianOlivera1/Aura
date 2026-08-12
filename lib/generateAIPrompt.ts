import {
  resolveBlendMode,
  scaleBlurFull,
  type Gradient,
  type Layer,
} from "@/lib/gradients";
import { auraContainerCSS, auraLayerCSS } from "@/lib/exportFormats";

/**
 * Generates a professional, descriptive AI prompt that users can send to
 * ChatGPT, Claude, Copilot, etc. to replicate the gradient in any project.
 *
 * KEY ARCHITECTURE (mirrors the catalog render exactly):
 * - The static container gets `min-height: 100vh` (absolute layers with
 *   `inset: 0` contribute NO height, so without it the page collapses to 0px
 *   and only the body background shows).
 * - Blend-mode gradients (aura category): the base color goes on BODY/page,
 *   container is transparent, abs-pos layers blend against the body.
 * - Non-blend-mode gradients (flux, lattice, etc.): base color goes on the
 *   container directly.
 * - The backdrop is the color the catalog actually composites against:
 *   light theme `#faf8f2` when `g.dark` is false, dark theme `#100e0b` when
 *   `g.dark` is true. Blend modes are resolved with the same `resolveBlendMode`
 *   the app uses (`hard-light`/`soft-light`/`screen`/`overlay` → `multiply` on
 *   a light backdrop), so the exported result matches the catalog visually.
 */

/** Palette the catalog vignettes are authored against. */
const LIGHT_BG = "#faf8f2";
const DARK_BG = "#100e0b";

function usesBlendModes(layers: Layer[]): boolean {
  return layers.some((l) => l.blendMode !== "normal");
}

/** Blend modes that break when composited against a light background. */
const LIGHT_FRIENDLY_BLEND = new Set([
  "hard-light",
  "soft-light",
  "screen",
  "overlay",
]);

export function generateAIPrompt(
  g: Gradient,
  layers: Layer[],
  grain = g.grain ?? false,
  light = !g.dark,
): string {
  const bg = light ? LIGHT_BG : DARK_BG;
  const hasBlend = usesBlendModes(layers);

  /** Blend mode as it renders in the catalog (theme-resolved). */
  const resolved = layers.map((l) => resolveBlendMode(l.blendMode, light));
  const darkModes = [...new Set(resolved)].filter((m) => LIGHT_FRIENDLY_BLEND.has(m));

  const layerDescriptions = layers
    .map((l, i) => {
      const type = l.background.startsWith("radial")
        ? "Radial gradient"
        : l.background.startsWith("conic")
          ? "Conic gradient"
          : l.background.startsWith("repeating")
            ? "Repeating gradient"
            : "Linear gradient";
      const b = scaleBlurFull(l.blur);
      const blurText = b.mobile > 0 ? `blur: \`${b.mobile}px\` (mobile) / \`${b.desktop}px\` (desktop)` : "no blur";
      return `- **Layer ${i + 1}:** ${type}. Blend mode: \`${resolved[i]}\`, ${blurText}${l.opacity != null && l.opacity !== 1 ? `, opacity: ${l.opacity}` : ""}.`;
    })
    .join("\n");

  const blendNote = hasBlend
    ? `

### ⚠️ Critical: Blend Mode Architecture
These layers use CSS \`mix-blend-mode\` (${[...new Set(resolved)].filter((m) => m !== "normal").join(", ")}). 
Blend modes composite against whatever is **behind** the element - the page/body background.

**DO NOT** set \`background-color\` on the gradient container itself. Instead:
1. Set \`background-color: ${bg}\` on the **\`<body>\`** or **page wrapper**.
2. The gradient container must be **transparent** (no background).
3. The layers will blend against the body background to create the atmospheric effect.

If you put the base color on the container, the blend modes will composite against that instead of the page, producing incorrect (washed-out or too dark) results.`
    : "";

  const themeNote =
    hasBlend && darkModes.length > 0
      ? `

### 🌗 Light / Dark Theme Adaptation
The layer blend modes (${darkModes.map((m) => `\`${m}\``).join(", ")}) are tuned for a dark backdrop. If you composite them over a **light or white** surface they wash out (the gradient "disappears"). To keep the same colors, swap each of those blend modes for \`multiply\` and keep the backlight light:

| Original blend mode | On a light surface use |
| --- | --- |
${darkModes.map((m) => `| \`${m}\` | \`multiply\` |`).join("\n")}

\`multiply\`, \`normal\`, and dark backdrops need no change.`
      : "";

  const cssLayers = layers.map((l, i) => auraLayerCSS(l, i, light)).join("\n\n");

  const bodyCSS = auraContainerCSS(g, layers, light);

  const reactBg = hasBlend
    ? `    <div\n      style={{\n        position: "relative",\n        overflow: "hidden",\n        minHeight: "100vh",\n        /* NO backgroundColor - blend modes composite against body/page bg */\n      }}\n    >`
    : `    <div\n      style={{\n        position: "relative",\n        overflow: "hidden",\n        minHeight: "100vh",\n        backgroundColor: "${bg}",\n      }}\n    >`;

  const reactLayers = layers
    .map(
      (l, i) => {
        const b = scaleBlurFull(l.blur);
        return `      <div\n        style={{\n          position: "absolute",\n          inset: 0,\n          background: "${l.background}",${l.backgroundSize ? `\n          backgroundSize: "${l.backgroundSize}",` : ""}\n          mixBlendMode: "${resolved[i]}",${b.mobile > 0 ? `\n          filter: "blur(${b.mobile}px)", /* ${b.desktop}px on desktop */` : ""}${l.opacity != null && l.opacity !== 1 ? `\n          opacity: ${l.opacity},` : ""}\n          pointerEvents: "none",\n          transform: "translateZ(0)",\n        }}\n        aria-hidden="true"\n      />`;
      },
    )
    .join("\n");

  const grainSvg = `\n      <div\n        aria-hidden="true"\n        style={{\n          position: "absolute",\n          inset: 0,\n          mixBlendMode: "overlay",\n          opacity: 0.85,\n          pointerEvents: "none",\n        }}\n      >\n        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n          <filter id="grain">\n            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />\n            <feColorMatrix\n              type="matrix"\n              values="0.181 0.608 0.061 0 0.075\n                    0.181 0.608 0.061 0 0.075\n                    0.181 0.608 0.061 0 0.075\n                    0     0     0     1 0"\n            />\n          </filter>\n          <rect width="100%" height="100%" filter="url(#grain)" />\n        </svg>\n      </div>`;

  const grainHtml = `  <div aria-hidden="true" style="position:absolute;inset:0;mix-blend-mode:overlay;opacity:0.85;pointer-events:none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0.181 0.608 0.061 0 0.075 0.181 0.608 0.061 0 0.075 0.181 0.608 0.061 0 0.075 0 0 0 1 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)"/>
    </svg>
  </div>`;

  const grainCSS = `/* Film-grain overlay - SVG feTurbulence noise, overlay blend */
.aura-grain {
  position: absolute;
  inset: 0;
  mix-blend-mode: overlay;
  opacity: 0.85;
  pointer-events: none;
}`;

  const bodyNote = hasBlend
    ? `\n\n> **Remember:** Set \`body { background-color: ${bg}; }\` in your global CSS. The component container must NOT have its own background-color.`
    : "";

  return `## Aura Gradient: "${g.name}"

### Visual Description
A ${g.mood} atmospheric gradient background${hasBlend ? " using layered CSS blend modes" : ""}.
Category: **${g.category}**. Theme: **${light ? "light" : "dark"}**.
The composition uses ${layers.length} layer${layers.length > 1 ? "s" : ""} over a ${light ? "light" : "dark"} backdrop (\`${bg}\`):

${layerDescriptions}
${grain ? "\nA **grain texture overlay** (SVG feTurbulence noise) is applied on top for an analog film feel." : ""}
${blendNote}
${themeNote}
### Implementation Notes
- Give the container an explicit \`min-height: 100vh\` (or the height of your section). Every layer is \`position: absolute; inset: 0;\` so the stack contributes \`0px\` of height on its own - without this the page collapses to a bare background.
- Each layer is an absolutely-positioned div with its own \`mix-blend-mode\` and optional \`filter: blur()\`.
- Use \`transform: translateZ(0)\` or \`will-change: transform\` on blur layers for GPU acceleration.
- All decorative layers should have \`pointer-events: none\` and \`aria-hidden="true"\`.
- The parent container needs \`position: relative\` and \`overflow: hidden\`.${hasBlend ? `\n- **The base color (${bg}) must be on the body/page, NOT on the container.**` : ""}
- **Page content must sit above the layers**: wrap it in an element with \`position: relative\` and \`z-index: 1\`, otherwise the absolutely-positioned layers paint over it.
- **Do not generate sample text, headings, or demo content** - produce the background only, ready for real content.

### CSS Code

\`\`\`css
/* ${g.name} - Aura */
${bodyCSS}

${cssLayers}
${grain ? `

${grainCSS}` : ""}
\`\`\`
${grain ? `

> Add the grain as a child of the container: an inline SVG with the feTurbulence filter above (see the React/HTML sections), using \`mix-blend-mode: overlay\` and \`opacity: 0.85\`.` : ""}

### React / Next.js

\`\`\`tsx
export function AuraBackground() {
  return (
${reactBg}
${reactLayers}${grain ? grainSvg : ""}
      {/* Your content lives here - put it in a wrapper that sits ABOVE the layers */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Your actual content */}
      </div>
    </div>
  );
}
\`\`\`${bodyNote}

> **Important:** Do NOT put any placeholder text or sample headings in the output. The gradient background should be left clean - your (or the user's) real content goes inside the \`zIndex: 1\` wrapper.

### Vanilla HTML

\`\`\`html
<div class="aura-bg">
${layers.map((_, i) => `  <div class="aura-layer-${i + 1}" aria-hidden="true"></div>`).join("\n")}${grain ? "\n" + grainHtml : ""}
  <!-- Your content lives here - this wrapper sits ABOVE the absolute layers -->
  <div style="position: relative; z-index: 1;">
    <!-- Your actual content -->
  </div>
</div>
\`\`\`
`;
}