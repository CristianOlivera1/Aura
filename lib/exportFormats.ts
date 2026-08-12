import type { Gradient, Layer } from "@/lib/gradients";

/* ══════════════════════════════════════════════════════════════
   Export format generators for gradient customizations.

   KEY ARCHITECTURE for blend-mode gradients:
   - Base color goes on BODY/page, NOT on the container.
   - Container is transparent so blend modes see through to body.
   - Non-blend-mode gradients can use container background-color.
   ══════════════════════════════════════════════════════════════ */

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

/** Comment to include when layers could wash out on a light surface. */
function lightThemeTip(layers: Layer[]): string {
  const modes = [...new Set(layers.map((l) => l.blendMode))].filter(
    (m) => m !== "normal" && LIGHT_FRIENDLY_BLEND.has(m),
  );
  if (modes.length === 0) return "";
  return `\n\n/* Tip: on a light/white background surface, swap ${modes.join("/")} for multiply to avoid washing out */`;
}

/** Scale blur for fullscreen backgrounds — raw values are for card thumbnails */
function scaleBlur(blur: number): number {
  if (blur <= 0) return 0;
  return 90; // Use 90px base, recommend 130px for desktop in comments
}

function layerCSS(layer: Layer, i: number): string {
  const scaledBlur = scaleBlur(layer.blur);
  const props = [
    `  background: ${layer.background};`,
    layer.backgroundSize ? `  background-size: ${layer.backgroundSize};` : null,
    `  mix-blend-mode: ${layer.blendMode};`,
    scaledBlur > 0 ? `  filter: blur(${scaledBlur}px); /* use 130px on desktop */` : null,
    layer.opacity != null && layer.opacity !== 1 ? `  opacity: ${layer.opacity};` : null,
    `  transform: translateZ(0);`,
    `  will-change: transform;`,
  ]
    .filter(Boolean)
    .join("\n");

  return `/* Layer ${i + 1} — ${layer.blendMode} */\n.aura-layer-${i + 1} {\n  position: absolute;\n  inset: 0;\n${props}\n  pointer-events: none;\n}`;
}

/* ── Vanilla CSS ── */

export function toVanillaCSS(g: Gradient, layers: Layer[]): string {
  const hasBlend = usesBlendModes(layers);
  const base = hasBlend
    ? `/* Base color on BODY — blend modes composite against this */\nbody {\n  background-color: ${g.base};\n}\n\n.aura-bg {\n  position: relative;\n  overflow: hidden;\n  /* NO background-color — layers blend against body */\n}`
    : `.aura-bg {\n  position: relative;\n  overflow: hidden;\n  background-color: ${g.base};\n}`;

  const layerBlocks = layers.map((l, i) => layerCSS(l, i)).join("\n\n");
  return `/* ${g.name} — Aura (${g.category}) */\n\n${base}${lightThemeTip(layers)}\n\n${layerBlocks}`;
}

/* ── Tailwind ── */

export function toTailwind(g: Gradient, layers: Layer[]): string {
  const hasBlend = usesBlendModes(layers);

  const layerDivs = layers
    .map((l, i) => {
      const scaledBlur = scaleBlur(l.blur);
      const classes = [
        "absolute inset-0 pointer-events-none",
        scaledBlur > 0 ? `blur-[${scaledBlur}px] md:blur-[130px]` : "",
        l.opacity != null && l.opacity !== 1 ? `opacity-${Math.round(l.opacity * 100)}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      const style = [
        `background: ${l.background}`,
        l.backgroundSize ? `background-size: ${l.backgroundSize}` : "",
        `mix-blend-mode: ${l.blendMode}`,
      ]
        .filter(Boolean)
        .join("; ");

      return `  <!-- Layer ${i + 1} -->\n  <div class="${classes}"\n       style="${style}" aria-hidden="true"></div>`;
    })
    .join("\n");

  const containerClass = hasBlend
    ? "relative overflow-hidden"
    : `relative overflow-hidden bg-[${g.base}]`;

  const bodyComment = hasBlend
    ? `<!-- ⚠️ Set body bg: <body class="bg-[${g.base}]"> -->\n<!-- Tip: on a light/white surface, swap hard-light/soft-light/screen/overlay for multiply -->\n`
    : "";

  return `${bodyComment}<!-- ${g.name} — Aura (${g.category}) -->\n<div class="${containerClass}">\n${layerDivs}\n  <!-- Your content here -->\n</div>`;
}

/* ── CSS Custom Properties ── */

export function toCSSVariables(g: Gradient, layers: Layer[]): string {
  const slug = g.id;
  const vars = [
    `  --${slug}-base: ${g.base};`,
    ...layers.flatMap((l, i) => [
      `  --${slug}-layer${i + 1}: ${l.background};`,
      `  --${slug}-blend${i + 1}: ${l.blendMode};`,
      l.blur > 0 ? `  --${slug}-blur${i + 1}: ${l.blur}px;` : null,
    ]),
  ]
    .filter(Boolean)
    .join("\n");

  return `/* ${g.name} — CSS Custom Properties */\n:root {\n${vars}\n}`;
}

/* ── CSS-in-JS (React) ── */

export function toCSSInJS(g: Gradient, layers: Layer[]): string {
  const hasBlend = usesBlendModes(layers);

  const layerObjs = layers
    .map((l, i) => {
      const scaledBlur = scaleBlur(l.blur);
      const obj = [
        `    background: "${l.background}",`,
        l.backgroundSize ? `    backgroundSize: "${l.backgroundSize}",` : null,
        `    mixBlendMode: "${l.blendMode}" as const,`,
        scaledBlur > 0 ? `    filter: "blur(${scaledBlur}px)", /* use 130px on desktop */` : null,
        l.opacity != null && l.opacity !== 1 ? `    opacity: ${l.opacity},` : null,
        `    transform: "translateZ(0)",`,
      ]
        .filter(Boolean)
        .join("\n");

      return `  // Layer ${i + 1}\n  {\n    position: "absolute" as const,\n    inset: 0,\n${obj}\n    pointerEvents: "none" as const,\n  },`;
    })
    .join("\n");

  const bgNote = hasBlend
    ? `// ⚠️ Set body background to "${g.base}" in global CSS\n// Container must NOT have backgroundColor for blend modes to work\n// Tip: on a light/white surface, swap hard-light/soft-light/screen/overlay for multiply\n`
    : "";

  const containerBg = hasBlend ? "" : `\n  backgroundColor: "${g.base}",`;

  return `${bgNote}// ${g.name} — Aura (${g.category})\nconst containerStyle = {\n  position: "relative" as const,\n  overflow: "hidden",${containerBg}\n};\n\nconst layers = [\n${layerObjs}\n];`;
}

export type ExportFormat = "css" | "tailwind" | "variables" | "cssinjs";

export const EXPORT_FORMATS: { id: ExportFormat; label: string; icon: string }[] = [
  { id: "css", label: "CSS", icon: "lucide:file-code" },
  { id: "tailwind", label: "Tailwind", icon: "lucide:wind" },
  { id: "variables", label: "Variables", icon: "lucide:variable" },
  { id: "cssinjs", label: "CSS-in-JS", icon: "lucide:braces" },
];

export function exportGradient(format: ExportFormat, g: Gradient, layers: Layer[]): string {
  switch (format) {
    case "css": return toVanillaCSS(g, layers);
    case "tailwind": return toTailwind(g, layers);
    case "variables": return toCSSVariables(g, layers);
    case "cssinjs": return toCSSInJS(g, layers);
  }
}
