import type { Gradient, Layer } from "@/lib/gradients";

/* ══════════════════════════════════════════════════════════════
   Export format generators for gradient customizations.
   Each returns a ready-to-paste code string.
   ══════════════════════════════════════════════════════════════ */

function layerCSS(layer: Layer, i: number): string {
  const props = [
    `  background: ${layer.background};`,
    `  mix-blend-mode: ${layer.blendMode};`,
    layer.blur > 0 ? `  filter: blur(${layer.blur}px);` : null,
    layer.backgroundSize ? `  background-size: ${layer.backgroundSize};` : null,
    layer.opacity != null && layer.opacity !== 1 ? `  opacity: ${layer.opacity};` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `/* Layer ${i + 1} — ${layer.blendMode} */\n.aura-layer-${i + 1} {\n  position: absolute;\n  inset: 0;\n${props}\n}`;
}

/* ── Vanilla CSS ── */

export function toVanillaCSS(g: Gradient, layers: Layer[]): string {
  const base = `.aura-bg {\n  position: relative;\n  overflow: hidden;\n  background-color: ${g.base};\n}`;
  const layerBlocks = layers.map((l, i) => layerCSS(l, i)).join("\n\n");
  return `/* ${g.name} — Aura (${g.category}) */\n\n${base}\n\n${layerBlocks}`;
}

/* ── Tailwind ── */

export function toTailwind(g: Gradient, layers: Layer[]): string {
  const layerDivs = layers
    .map((l, i) => {
      const classes = [
        "absolute inset-0",
        `mix-blend-${l.blendMode.replace("-", "-")}`,
        l.blur > 0 ? `blur-[${l.blur}px]` : "",
        l.opacity != null && l.opacity !== 1 ? `opacity-${Math.round(l.opacity * 100)}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      const style = [
        `background: ${l.background}`,
        l.backgroundSize ? `background-size: ${l.backgroundSize}` : "",
      ]
        .filter(Boolean)
        .join("; ");

      return `  <!-- Layer ${i + 1} -->\n  <div class="${classes}"\n       style="${style}"></div>`;
    })
    .join("\n");

  return `<!-- ${g.name} — Aura (${g.category}) -->\n<div class="relative overflow-hidden bg-[${g.base}]">\n${layerDivs}\n  <!-- Your content here -->\n</div>`;
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
  const layerObjs = layers
    .map((l, i) => {
      const obj = [
        `    background: "${l.background}",`,
        `    mixBlendMode: "${l.blendMode}" as const,`,
        l.blur > 0 ? `    filter: "blur(${l.blur}px)",` : null,
        l.backgroundSize ? `    backgroundSize: "${l.backgroundSize}",` : null,
        l.opacity != null && l.opacity !== 1 ? `    opacity: ${l.opacity},` : null,
      ]
        .filter(Boolean)
        .join("\n");

      return `  // Layer ${i + 1}\n  {\n    position: "absolute" as const,\n    inset: 0,\n${obj}\n  },`;
    })
    .join("\n");

  return `// ${g.name} — Aura (${g.category})\nconst baseStyle = {\n  position: "relative" as const,\n  overflow: "hidden",\n  backgroundColor: "${g.base}",\n};\n\nconst layers = [\n${layerObjs}\n];`;
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
