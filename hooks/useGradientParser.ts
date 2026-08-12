/**
 * Gradient CSS parsing utilities.
 *
 * Extracts structured data from CSS gradient strings:
 * - Position (for radial/conic: at X% Y%)
 * - Dominant color (first non-transparent color stop)
 * - Color helpers for the layer color editor (toHex / replaceDominantColor)
 */

/* ── Position extraction (radial / conic) ── */

const POS_RE = /at\s+([\d.]+)%\s+([\d.]+)%/;

export function extractPosition(css: string): { x: number; y: number } | null {
  const m = POS_RE.exec(css);
  if (!m) return null;
  return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
}

export function replacePosition(css: string, x: number, y: number): string {
  return css.replace(POS_RE, `at ${x.toFixed(0)}% ${y.toFixed(0)}%`);
}

/* ── Color extraction ── */

const RGBA_RE = /rgba?\([\d\s,.]+\)/g;
const HEX_RE = /#[0-9a-fA-F]{3,8}/g;

export function extractDominantColor(css: string): string {
  // Collect all colors
  const rgbaMatches = css.match(RGBA_RE) ?? [];
  const hexMatches = css.match(HEX_RE) ?? [];
  const all = [...rgbaMatches, ...hexMatches];

  // Filter out transparent / very low opacity
  for (const c of all) {
    if (c.includes("0,0,0,0") || c === "transparent") continue;
    // Skip very low alpha
    const alphaMatch = /,\s*([\d.]+)\)$/.exec(c);
    if (alphaMatch && parseFloat(alphaMatch[1]) < 0.15) continue;
    return c;
  }
  return all[0] ?? "#888888";
}

/* ── Color helpers (layer color editor) ── */

/** Normalize any CSS color to #rrggbb for use as an <input type="color"> value. */
export function toHex(color: string): string {
  const m = /rgba?\(([\d\s,.]+)\)/.exec(color);
  if (m) {
    const [r, g, b] = m[1].split(",").map((p) => {
      const v = Math.round(parseFloat(p));
      return Math.max(0, Math.min(255, v));
    });
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }
  const hex = /^#([0-9a-fA-F]{3,8})$/.exec(color.trim());
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    return `#${h.slice(0, 6).toLowerCase()}`;
  }
  return "#888888";
}

function hexToRgba(hex: string, alpha: string): string {
  const h = toHex(hex).replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${parseFloat(alpha)})`;
}

/**
 * Replace the dominant color in a gradient string. The native color picker
 * only emits hex, so an rgba() match is rebuilt keeping its alpha to avoid
 * silently making the layer opaque.
 */
export function replaceDominantColor(css: string, oldColor: string, newColor: string): string {
  const alphaMatch = /,\s*([\d.]+)\)$/.exec(oldColor);
  const replacement = alphaMatch ? hexToRgba(newColor, alphaMatch[1]) : newColor;
  return css.replace(oldColor, replacement);
}
