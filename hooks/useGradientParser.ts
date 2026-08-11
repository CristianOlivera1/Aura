/**
 * Gradient CSS parsing utilities.
 *
 * Extracts structured data from CSS gradient strings:
 * - Gradient type (linear, radial, conic, repeating)
 * - Direction / angle (for linear)
 * - Position (for radial/conic: at X% Y%)
 * - Dominant color (first non-transparent color stop)
 */

export type GradientType = "linear" | "radial" | "conic" | "repeating" | "unknown";

export interface ParsedGradient {
  type: GradientType;
  /** Angle in degrees for linear gradients (null otherwise) */
  angle: number | null;
  /** Position { x, y } in percent for radial/conic (null otherwise) */
  position: { x: number; y: number } | null;
  /** First non-transparent color found */
  dominantColor: string;
  /** The raw CSS string */
  raw: string;
}

/* ── Type detection ── */

export function detectGradientType(css: string): GradientType {
  if (css.startsWith("repeating-")) return "repeating";
  if (css.startsWith("linear-gradient") || css.startsWith("linear")) return "linear";
  if (css.startsWith("radial-gradient") || css.startsWith("radial")) return "radial";
  if (css.startsWith("conic-gradient") || css.startsWith("conic")) return "conic";
  return "unknown";
}

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

/* ── Angle extraction (linear) ── */

const ANGLE_RE = /linear-gradient\(\s*([\d.]+)deg/;
const DIR_MAP: Record<string, number> = {
  "to top": 0,
  "to top right": 45,
  "to right": 90,
  "to bottom right": 135,
  "to bottom": 180,
  "to bottom left": 225,
  "to left": 270,
  "to top left": 315,
};

export function extractAngle(css: string): number | null {
  const m = ANGLE_RE.exec(css);
  if (m) return parseFloat(m[1]);

  for (const [dir, deg] of Object.entries(DIR_MAP)) {
    if (css.includes(dir)) return deg;
  }
  // Default: linear-gradient without direction = 180deg (top to bottom)
  if (css.startsWith("linear-gradient")) return 180;
  return null;
}

export function replaceAngle(css: string, angleDeg: number): string {
  const m = ANGLE_RE.exec(css);
  if (m) return css.replace(ANGLE_RE, `linear-gradient(${angleDeg.toFixed(0)}deg`);

  // Replace direction keywords
  for (const dir of Object.keys(DIR_MAP)) {
    if (css.includes(dir)) {
      return css.replace(dir, `${angleDeg.toFixed(0)}deg`);
    }
  }
  // Insert angle after opening paren
  return css.replace("linear-gradient(", `linear-gradient(${angleDeg.toFixed(0)}deg, `);
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

/* ── Color replacement (replace dominant color in a gradient string) ── */

export function replaceDominantColor(css: string, oldColor: string, newColor: string): string {
  return css.replace(oldColor, newColor);
}

/* ── Full parse ── */

export function parseGradient(css: string): ParsedGradient {
  const type = detectGradientType(css);
  return {
    type,
    angle: type === "linear" ? extractAngle(css) : null,
    position: type === "radial" || type === "conic" ? extractPosition(css) : null,
    dominantColor: extractDominantColor(css),
    raw: css,
  };
}
