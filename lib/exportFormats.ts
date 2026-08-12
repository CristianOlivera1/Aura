import {
  resolveBlendMode,
  scaleBlurFull,
  type Gradient,
  type Layer,
} from "@/lib/gradients";

/* ══════════════════════════════════════════════════════════════
   Export format generators for gradient customizations.

   KEY ARCHITECTURE (mirrors the catalog render exactly):
   - Static container gets `min-height: 100vh` (absolute layers with
     `inset: 0` contribute no height).
   - Blend-mode gradients (aura category): base color goes on BODY/page,
     container is transparent so blend modes see through to body.
   - Non-blend-mode gradients: base color goes on the container directly.
   - Backdrop is the catalog color the preview composites against
     (`#faf8f2` light / `#100e0b` dark) and blend modes go through the same
     `resolveBlendMode` the app uses, so the export matches what the user
     sees in the preview at any time.
   ══════════════════════════════════════════════════════════════ */

/** Palette the catalog vignettes are authored against. */
const LIGHT_BG = "#faf8f2";
const DARK_BG = "#100e0b";

function usesBlendModes(layers: Layer[]): boolean {
  return layers.some((l) => l.blendMode !== "normal");
}

function layerCSS(layer: Layer, i: number, light: boolean): string {
  const mode = resolveBlendMode(layer.blendMode, light);
  const b = scaleBlurFull(layer.blur);
  const props = [
    `  background: ${layer.background};`,
    layer.backgroundSize ? `  background-size: ${layer.backgroundSize};` : null,
    `  mix-blend-mode: ${mode};`,
    b.mobile > 0 ? `  filter: blur(${b.mobile}px); /* use ${b.desktop}px on desktop */` : null,
    layer.opacity != null && layer.opacity !== 1 ? `  opacity: ${layer.opacity};` : null,
    `  transform: translateZ(0);`,
    `  will-change: transform;`,
  ]
    .filter(Boolean)
    .join("\n");

  return `/* Layer ${i + 1} - ${mode} */\n.aura-layer-${i + 1} {\n  position: absolute;\n  inset: 0;\n${props}\n  pointer-events: none;\n}`;
}

/* ── Vanilla CSS ── */

export function toVanillaCSS(g: Gradient, layers: Layer[], light: boolean): string {
  const hasBlend = usesBlendModes(layers);
  const bg = light ? LIGHT_BG : DARK_BG;
  const base = hasBlend
    ? `/* Base color on BODY - blend modes composite against this */\nbody {\n  background-color: ${bg};\n}\n\n.aura-bg {\n  position: relative;\n  overflow: hidden;\n  min-height: 100vh; /* height must be explicit - absolute layers add none */\n  /* NO background-color - layers blend against body */\n}`
    : `.aura-bg {\n  position: relative;\n  overflow: hidden;\n  min-height: 100vh; /* height must be explicit - absolute layers add none */\n  background-color: ${bg};\n}`;

  const layerBlocks = layers.map((l, i) => layerCSS(l, i, light)).join("\n\n");

  /* Content must sit above the absolute layers */
  const content = `\n\n/* Content wrapper - keep it above the absolute layers */\n.aura-content {\n  position: relative;\n  z-index: 1;\n}`;

  return `/* ${g.name} - Aura (${g.category}) */\n\n${base}\n\n${layerBlocks}${content}`;
}

/* ── Tailwind ── */

export function toTailwind(g: Gradient, layers: Layer[], light: boolean): string {
  const hasBlend = usesBlendModes(layers);
  const bg = light ? LIGHT_BG : DARK_BG;

  const layerDivs = layers
    .map((l, i) => {
      const mode = resolveBlendMode(l.blendMode, light);
      const b = scaleBlurFull(l.blur);
      const classes = [
        "absolute inset-0 pointer-events-none",
        b.mobile > 0 ? `blur-[${b.mobile}px] md:blur-[${b.desktop}px]` : "",
        l.opacity != null && l.opacity !== 1 ? `opacity-${Math.round(l.opacity * 100)}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      const style = [
        `background: ${l.background}`,
        l.backgroundSize ? `background-size: ${l.backgroundSize}` : "",
        `mix-blend-mode: ${mode}`,
      ]
        .filter(Boolean)
        .join("; ");

      return `  <!-- Layer ${i + 1} -->\n  <div class="${classes}"\n       style="${style}" aria-hidden="true"></div>`;
    })
    .join("\n");

  const containerClass = hasBlend
    ? "relative overflow-hidden min-h-screen"
    : `relative overflow-hidden min-h-screen bg-[${bg}]`;

  const bodyComment = hasBlend
    ? `<!-- ⚠️ Set body bg: <body class="bg-[${bg}]"> -->\n`
    : "";

  return `${bodyComment}<!-- ${g.name} - Aura (${g.category}) -->\n<div class="${containerClass}">\n${layerDivs}\n  <!-- Content wrapper - keep it above the absolute layers -->\n  <div class="relative z-[1]">\n    <!-- Your content -->\n  </div>\n</div>`;
}

/* ── CSS Custom Properties ── */

export function toCSSVariables(g: Gradient, layers: Layer[], light: boolean): string {
  const slug = g.id;
  const bg = light ? LIGHT_BG : DARK_BG;
  const vars = [
    `  --${slug}-base: ${bg};`,
    ...layers.flatMap((l, i) => [
      `  --${slug}-layer${i + 1}: ${l.background};`,
      `  --${slug}-blend${i + 1}: ${resolveBlendMode(l.blendMode, light)};`,
      l.blur > 0 ? `  --${slug}-blur${i + 1}: ${l.blur}px;` : null,
    ]),
  ]
    .filter(Boolean)
    .join("\n");

  return `/* ${g.name} - CSS Custom Properties */\n:root {\n${vars}\n}`;
}

/* ── CSS-in-JS (React) ── */

export function toCSSInJS(g: Gradient, layers: Layer[], light: boolean): string {
  const hasBlend = usesBlendModes(layers);
  const bg = light ? LIGHT_BG : DARK_BG;

  const layerObjs = layers
    .map((l, i) => {
      const mode = resolveBlendMode(l.blendMode, light);
      const b = scaleBlurFull(l.blur);
      const obj = [
        `    background: "${l.background}",`,
        l.backgroundSize ? `    backgroundSize: "${l.backgroundSize}",` : null,
        `    mixBlendMode: "${mode}" as const,`,
        b.mobile > 0 ? `    filter: "blur(${b.mobile}px)", /* use ${b.desktop}px on desktop */` : null,
        l.opacity != null && l.opacity !== 1 ? `    opacity: ${l.opacity},` : null,
        `    transform: "translateZ(0)",`,
      ]
        .filter(Boolean)
        .join("\n");

      return `  // Layer ${i + 1}\n  {\n    position: "absolute" as const,\n    inset: 0,\n${obj}\n    pointerEvents: "none" as const,\n  },`;
    })
    .join("\n");

  const bgNote = hasBlend
    ? `// ⚠️ Set body background to "${bg}" in global CSS\n// Container must NOT have backgroundColor for blend modes to work\n`
    : "";

  const containerBg = hasBlend ? "" : `\n  backgroundColor: "${bg}",`;

  return `${bgNote}// ${g.name} - Aura (${g.category})\nconst containerStyle = {\n  position: "relative" as const,\n  overflow: "hidden",\n  minHeight: "100vh",${containerBg}\n};\n\nconst contentStyle = {\n  position: "relative" as const,\n  zIndex: 1,\n};\n\nconst layers = [\n${layerObjs}\n];`;
}

export type ExportFormat = "css" | "tailwind" | "variables" | "cssinjs";

export const EXPORT_FORMATS: { id: ExportFormat; label: string; icon: string }[] = [
  { id: "css", label: "CSS", icon: "lucide:file-code" },
  { id: "tailwind", label: "Tailwind", icon: "lucide:wind" },
  { id: "variables", label: "Variables", icon: "lucide:variable" },
  { id: "cssinjs", label: "CSS-in-JS", icon: "lucide:braces" },
];

export function exportGradient(
  format: ExportFormat,
  g: Gradient,
  layers: Layer[],
  light: boolean,
): string {
  switch (format) {
    case "css": return toVanillaCSS(g, layers, light);
    case "tailwind": return toTailwind(g, layers, light);
    case "variables": return toCSSVariables(g, layers, light);
    case "cssinjs": return toCSSInJS(g, layers, light);
  }
}