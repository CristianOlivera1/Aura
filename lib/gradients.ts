/* ── Types ── */

export type GradientMood = "warm" | "cool" | "vivid" | "dark";
export type Category = "aura" | "mesh" | "nebula" | "prism" | "lattice" | "grain" | "glass" | "flux";

export interface Layer {
  background: string;
  blendMode: string;
  blur: number;
  opacity?: number;
  /** For repeating patterns (grids, dots, stripes) */
  backgroundSize?: string;
  /** Stable identity assigned by the customizer reducer (used as React key) */
  id?: string;
}

export interface Gradient {
  id: string;
  name: string;
  category: Category;
  mood: GradientMood;
  desc: string;
  dark: boolean;
  text: string;
  /** Text color for the name/description block on the gallery card.
      Falls back to white when unset. */
  cardText?: string;
  base: string;
  layers: Layer[];
  grain?: boolean;
}

/* ── Category metadata ── */

export interface CategoryMeta {
  id: Category | "all";
  label: string;
  icon: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "all", label: "All", icon: "lucide:layers" },
  { id: "aura", label: "Aura", icon: "lucide:sun" },
  { id: "mesh", label: "Mesh", icon: "lucide:hexagon" },
  { id: "nebula", label: "Nebula", icon: "lucide:cloud" },
  { id: "prism", label: "Prism", icon: "lucide:triangle" },
  { id: "lattice", label: "Lattice", icon: "lucide:grid-3x3" },
  { id: "grain", label: "Grain", icon: "lucide:scan-line" },
  { id: "glass", label: "Glass", icon: "lucide:diamond" },
  { id: "flux", label: "Flux", icon: "lucide:blob" },
];

/* ══════════════════════════════════════════════════════════════
   GRADIENTS - Premium multi-layer backgrounds
   ══════════════════════════════════════════════════════════════ */

export const GRADIENTS: Gradient[] = [
  {
    id: "sunrise-drift",
    name: "Sunrise Drift",
    category: "aura",
    mood: "vivid",
    desc: "Blue into orange, high key",
    dark: false,
    text: "#24406e",
    base: "#0a0a0a",
    layers: [
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,138,255,0.1) 30%, rgb(255,255,255) 20%, rgb(247,164,66) 70%, rgb(233,66,247) 100%)",
        blendMode: "hard-light",
        blur: 30,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,138,255,0.2) 35%, rgb(255,255,255) 70%, rgb(247,164,66) 80%, rgb(233,66,247) 100%)",
        blendMode: "soft-light",
        blur: 50,
        opacity: 1,
      },
    ],
  },

  {
    id: "ember-glow",
    name: "Ember Glow",
    category: "aura",
    mood: "warm",
    desc: "Coral into deep rose",
    dark: false,
    text: "#7a1f2e",
    base: "#faf8f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,106,61,0.12) 28%, rgb(255,255,255) 18%, rgb(255,201,77) 68%, rgb(255,61,119) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,106,61,0.22) 34%, rgb(255,255,255) 66%, rgb(255,201,77) 82%, rgb(255,61,119) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "glacier-mist",
    name: "Glacier Mist",
    category: "aura",
    mood: "cool",
    desc: "Cyan into indigo",
    dark: false,
    text: "#1f3b6e",
    base: "#faf8f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,210,255,0.12) 28%, rgb(255,255,255) 18%, rgb(53,230,192) 68%, rgb(91,110,245) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,210,255,0.22) 34%, rgb(255,255,255) 66%, rgb(53,230,192) 82%, rgb(91,110,245) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "orchid-bloom",
    name: "Orchid Bloom",
    category: "aura",
    mood: "vivid",
    desc: "Magenta into blue",
    dark: false,
    text: "#5b1f6e",
    base: "#faf8f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,61,224,0.12) 28%, rgb(255,255,255) 18%, rgb(139,92,246) 68%, rgb(61,139,255) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,61,224,0.22) 34%, rgb(255,255,255) 66%, rgb(139,92,246) 82%, rgb(61,139,255) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "warm-ash",
    name: "Warm Ash",
    category: "aura",
    mood: "warm",
    desc: "Warm greige tones, understated and airy",
    dark: false,
    text: "#4a4238",
    base: "#f7f5f0",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(214,204,190,0.12) 28%, rgb(255,255,255) 18%, rgb(196,181,160) 68%, rgb(168,148,122) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(214,204,190,0.22) 34%, rgb(255,255,255) 66%, rgb(196,181,160) 82%, rgb(168,148,122) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "aura",
    mood: "warm",
    desc: "Amber melting into burnt sienna",
    dark: false,
    text: "#5c2e0a",
    base: "#faf8f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,183,77,0.12) 28%, rgb(255,255,255) 18%, rgb(255,138,61) 68%, rgb(183,77,0) 100%)", blendMode: "hard-light", blur: 50 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,183,77,0.22) 34%, rgb(255,255,255) 66%, rgb(255,138,61) 82%, rgb(183,77,0) 100%)", blendMode: "soft-light", blur: 40 },
    ],
  },

  {
    id: "rose-gold",
    name: "Rose Gold",
    category: "aura",
    mood: "warm",
    desc: "Blush pink dissolving into antique copper",
    dark: false,
    text: "#6e2e2a",
    base: "#faf2f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,183,178,0.12) 28%, rgb(255,255,255) 18%, rgb(255,145,140) 68%, rgb(200,120,115) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,183,178,0.22) 34%, rgb(255,255,255) 66%, rgb(255,145,140) 82%, rgb(200,120,115) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "sunset-boulevard",
    name: "Sunset Boulevard",
    category: "aura",
    mood: "warm",
    desc: "Coral haze fading into honeyed amber",
    dark: false,
    text: "#6e2a1a",
    base: "#faf6f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,107,107,0.12) 28%, rgb(255,255,255) 18%, rgb(255,170,100) 68%, rgb(255,200,80) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,107,107,0.22) 34%, rgb(255,255,255) 66%, rgb(255,170,100) 82%, rgb(255,200,80) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "champagne-fizz",
    name: "Champagne Fizz",
    category: "aura",
    mood: "warm",
    desc: "Pale gold bubbling into peach nectar",
    dark: false,
    text: "#5c3d1a",
    base: "#faf8f2",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,230,180,0.12) 28%, rgb(255,255,255) 18%, rgb(255,200,140) 68%, rgb(230,170,100) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,230,180,0.22) 34%, rgb(255,255,255) 66%, rgb(255,200,140) 82%, rgb(230,170,100) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "midnight-sapphire",
    name: "Midnight Sapphire",
    category: "aura",
    mood: "cool",
    desc: "Deep cobalt bleeding into violet ink",
    dark: false,
    text: "#c8d4ff",
    base: "#0a0c1a",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(61,90,255,0.12) 28%, rgb(255,255,255) 18%, rgb(45,55,135) 68%, rgb(20,25,60) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(61,90,255,0.22) 34%, rgb(255,255,255) 66%, rgb(45,55,135) 82%, rgb(20,25,60) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "ocean-pearl",
    name: "Ocean Pearl",
    category: "aura",
    mood: "cool",
    desc: "Seafoam drifting into abyssal blue",
    dark: false,
    text: "#1a3a4a",
    base: "#f0f7fa",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(178,235,242,0.12) 28%, rgb(255,255,255) 18%, rgb(77,182,200) 68%, rgb(45,100,130) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(178,235,242,0.22) 34%, rgb(255,255,255) 66%, rgb(77,182,200) 82%, rgb(45,100,130) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "arctic-frost",
    name: "Arctic Frost",
    category: "aura",
    mood: "cool",
    desc: "Ice crystal refracting into periwinkle",
    dark: false,
    text: "#1a2a4a",
    base: "#f2f6fa",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(200,230,255,0.12) 28%, rgb(255,255,255) 18%, rgb(150,200,255) 68%, rgb(100,130,200) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(200,230,255,0.22) 34%, rgb(255,255,255) 66%, rgb(150,200,255) 82%, rgb(100,130,200) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "silver-mist",
    name: "Silver Mist",
    category: "aura",
    mood: "cool",
    desc: "Mercury grey dissolving into pale lilac",
    dark: false,
    text: "#2a2a3a",
    base: "#f5f5f7",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(200,200,210,0.12) 28%, rgb(255,255,255) 18%, rgb(160,160,180) 68%, rgb(130,120,160) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(200,200,210,0.22) 34%, rgb(255,255,255) 66%, rgb(160,160,180) 82%, rgb(130,120,160) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "deep-lagoon",
    name: "Deep Lagoon",
    category: "aura",
    mood: "cool",
    desc: "Teal into violet",
    dark: true,
    text: "#d9f4ec",
    base: "#0c0a08",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(47,209,166,0.12) 28%, rgb(255,255,255) 18%, rgb(61,124,255) 68%, rgb(122,92,255) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(47,209,166,0.22) 34%, rgb(255,255,255) 66%, rgb(61,124,255) 82%, rgb(122,92,255) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },

  {
    id: "eclipse-flare",
    name: "Eclipse Flare",
    category: "aura",
    mood: "vivid",
    desc: "Dark void curving into blue, magenta, and ember",
    dark: true,
    text: "#ffe4f0",
    base: "#0c0a08",
    layers: [
      { background: "radial-gradient(ellipse 89% 99% at 50% -38%, rgba(0,0,0,0) 0%, rgb(30,32,35) 38%, rgb(45,70,115) 70%, rgb(142,123,227) 90%, rgb(248,104,196) 100%)", blendMode: "hard-light", blur: 50, opacity: 0.5 },
      { background: "radial-gradient(ellipse 95% 105% at 50% -34%, rgba(0,0,0,0.15) 0%, rgb(30,32,35) 42%, rgb(55,82,135) 74%, rgb(150,126,228) 92%, rgb(246,108,198) 100%)", blendMode: "soft-light", blur: 100 },
    ],
  },

  {
    id: "midnight-horizon",
    name: "Midnight Horizon",
    category: "aura",
    mood: "vivid",
    desc: "A vibrant transition from deep space blue to an electric sunrise horizon",
    dark: true,
    text: "#ffffff",
    base: "hsl(240, 100%, 6%)", // El azul ultra oscuro del fondo
    layers: [
      {
        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 138, 255, 0.9) 40%, rgb(255, 255, 255) 70%, rgb(247, 164, 66) 80%, rgb(233, 66, 247) 100%)",
        blendMode: "hard-light",
        blur: 50,
        opacity: 1,
      },
      {
        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 138, 255, 0.9) 40%, rgb(255, 255, 255) 70%, rgb(247, 164, 66) 80%, rgb(233, 66, 247) 100%)",
        blendMode: "soft-light",
        blur: 16,
        opacity: 1,
      },
      {
        background: "linear-gradient(to top, rgb(0, 0, 31) 0%, rgba(0, 0, 31, 0.99) 8.1%, rgba(0, 0, 31, 0.953) 15.5%, rgba(0, 0, 31, 0.894) 22.5%, rgba(0, 0, 31, 0.824) 29%, rgba(0, 0, 31, 0.74) 35.3%, rgba(0, 0, 31, 0.647) 41.2%, rgba(0, 0, 31, 0.55) 47.1%, rgba(0, 0, 31, 0.45) 52.9%, rgba(0, 0, 31, 0.353) 58.8%, rgba(0, 0, 31, 0.26) 64.7%, rgba(0, 0, 31, 0.176) 71%, rgba(0, 0, 31, 0.106) 77.5%, rgba(0, 0, 31, 0.047) 84.5%, rgba(0, 0, 31, 0.01) 91.9%, rgba(0, 0, 31, 0) 100%)",
        blendMode: "normal",
        blur: 44,
        opacity: 1,
      }
    ],
  },

  {
    id: "aurora-nova",
    name: "Aurora Nova",
    category: "aura",
    mood: "vivid",
    desc: "A vibrant transition from deep cosmic violet to an electric neon sunrise",
    dark: true,
    text: "#ffffff",
    base: "hsl(240, 100%, 6%)",
    layers: [
      {
        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 138, 255, 0.9) 40%, rgb(255, 255, 255) 70%, rgb(247, 164, 66) 80%, rgb(233, 66, 247) 100%)",
        blendMode: "hard-light",
        blur: 40,
        opacity: 1,
      },
      {
        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 138, 255, 0.9) 40%, rgb(255, 255, 255) 70%, rgb(247, 164, 66) 80%, rgb(233, 66, 247) 100%)",
        blendMode: "soft-light",
        blur: 40,
        opacity: 1,
      },
      {
        background: "linear-gradient(to top, rgb(0, 0, 31) 0%, rgba(0, 0, 31, 0.85) 8.1%, rgba(0, 0, 31, 0.7) 15.5%, rgba(0, 0, 31, 0.55) 22.5%, rgba(0, 0, 31, 0.4) 29%, rgba(0, 0, 31, 0.25) 35.3%, rgba(0, 0, 31, 0.15) 41.2%, rgba(0, 0, 31, 0) 50%)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.5,
      }
    ],
  },

  {
    id: "solstice-veil",
    name: "Solstice Veil",
    category: "aura",
    mood: "warm",
    desc: "Amber horizon dissolving into rose-violet dusk",
    dark: true,
    text: "#ffe9df",
    base: "hsl(345, 55%, 6%)",
    layers: [
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,94,58,0.9) 40%, rgb(255,255,255) 70%, rgb(255,159,67) 82%, rgb(236,64,122) 100%)",
        blendMode: "hard-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,94,58,0.9) 40%, rgb(255,255,255) 70%, rgb(255,159,67) 82%, rgb(236,64,122) 100%)",
        blendMode: "soft-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(to top, rgb(31,4,10) 0%, rgba(31,4,10,0.9) 15%, rgba(31,4,10,0.6) 35%, rgba(31,4,10,0.25) 60%, rgba(31,4,10,0) 100%)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "arctic-dawn",
    name: "Arctic Dawn",
    category: "aura",
    mood: "cool",
    desc: "Frozen cyan horizon melting into pale rose",
    dark: true,
    text: "#e8f4ff",
    base: "hsl(205, 60%, 6%)",
    layers: [
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(56,189,248,0.9) 40%, rgb(255,255,255) 70%, rgb(199,210,254) 82%, rgb(249,168,212) 100%)",
        blendMode: "hard-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(56,189,248,0.9) 40%, rgb(255,255,255) 70%, rgb(199,210,254) 82%, rgb(249,168,212) 100%)",
        blendMode: "soft-light",
        blur: 80,
        opacity: 1,
      },
    ],
  },

  {
    id: "neon-skyline",
    name: "Neon Skyline",
    category: "aura",
    mood: "vivid",
    desc: "Electric cyan horizon bleeding into neon magenta",
    dark: true,
    text: "#f5e6ff",
    base: "hsl(265, 75%, 5%)",
    layers: [
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(34,211,238,0.9) 40%, rgb(255,255,255) 70%, rgb(232,121,249) 82%, rgb(139,92,246) 100%)",
        blendMode: "hard-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(34,211,238,0.9) 40%, rgb(255,255,255) 70%, rgb(232,121,249) 82%, rgb(139,92,246) 100%)",
        blendMode: "soft-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(to top, rgb(8,4,20) 0%, rgba(8,4,20,0.85) 15%, rgba(8,4,20,0.5) 35%, rgba(8,4,20,0.15) 60%, rgba(8,4,20,0) 100%)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.6,
      },
    ],
  },

  {
    id: "crimson-veil",
    name: "Crimson Veil",
    category: "aura",
    mood: "warm",
    desc: "Deep crimson horizon melting into amber gold",
    dark: true,
    text: "#ffe8d6",
    base: "hsl(10, 65%, 5%)",
    layers: [
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(220,38,38,0.9) 40%, rgb(255,255,255) 70%, rgb(251,146,60) 82%, rgb(250,204,21) 100%)",
        blendMode: "hard-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(220,38,38,0.9) 40%, rgb(255,255,255) 70%, rgb(251,146,60) 82%, rgb(250,204,21) 100%)",
        blendMode: "soft-light",
        blur: 80,
        opacity: 1,
      },
    ],
  },

  {
    id: "violet-horizon",
    name: "Violet Horizon",
    category: "aura",
    mood: "vivid",
    desc: "Indigo horizon opening into lavender and rose",
    dark: true,
    text: "#ece5ff",
    base: "hsl(255, 65%, 6%)",
    layers: [
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(99,102,241,0.9) 40%, rgb(255,255,255) 70%, rgb(216,180,254) 82%, rgb(244,114,182) 100%)",
        blendMode: "hard-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(rgba(0,0,0,0) 0%, rgba(99,102,241,0.9) 40%, rgb(255,255,255) 70%, rgb(216,180,254) 82%, rgb(244,114,182) 100%)",
        blendMode: "soft-light",
        blur: 80,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(to top, rgb(10,8,26) 0%, rgba(10,8,26,0.9) 15%, rgba(10,8,26,0.55) 35%, rgba(10,8,26,0.2) 60%, rgba(10,8,26,0) 100%)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "eclipse-bloom",
    name: "Eclipse Bloom",
    category: "aura",
    mood: "cool",
    desc: "A dim cyan bloom emerging from behind a dark eclipse",
    dark: true,
    text: "#c7e9e7",
    base: "#050707",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(34% 34% at 68% 38%, rgba(55,122,119,0.34) 0%, rgba(28,75,74,0.20) 42%, transparent 78%)",
        blendMode: "screen",
        blur: 38,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(22% 22% at 68% 38%, rgba(82,153,148,0.18) 0%, transparent 72%)",
        blendMode: "screen",
        blur: 20,
        opacity: 0.8,
      },
      {
        background:
          "radial-gradient(18% 18% at 52% 48%, #020303 0%, #020303 62%, transparent 64%)",
        blendMode: "multiply",
        blur: 4,
        opacity: 1,
      },
    ],
  },

  {
    id: "tideglass",
    name: "Tideglass",
    category: "aura",
    mood: "cool",
    desc: "A translucent cyan tide bending across deep black",
    dark: true,
    text: "#c8eceb",
    base: "#040808",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(90% 22% at 50% 56%, rgba(28,103,101,0.34) 0%, rgba(18,65,64,0.18) 38%, transparent 78%)",
        blendMode: "screen",
        blur: 46,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(172deg, transparent 35%, rgba(53,142,137,0.20) 46%, rgba(29,89,87,0.28) 53%, transparent 66%)",
        blendMode: "screen",
        blur: 42,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(8deg, transparent 38%, rgba(67,153,147,0.10) 49%, transparent 60%)",
        blendMode: "soft-light",
        blur: 32,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "nightfall",
    name: "Nightfall",
    category: "aura",
    mood: "cool",
    desc: "Cold blue atmosphere descending from the upper edge",
    dark: true,
    text: "#c8d9e8",
    base: "#05070a",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(85% 55% at 52% 0%, rgba(35,70,105,0.34) 0%, rgba(24,49,74,0.18) 38%, transparent 76%)",
        blendMode: "screen",
        blur: 10,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(180deg, rgba(54,88,120,0.16) 0%, transparent 45%, rgba(0,0,0,0.18) 100%)",
        blendMode: "soft-light",
        blur: 10,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(42% 35% at 78% 16%, rgba(96,130,155,0.16) 0%, transparent 78%)",
        blendMode: "screen",
        blur: 10,
        opacity: 1,
      },
    ],
  },

  {
    id: "deep-current",
    name: "Deep Current",
    category: "aura",
    mood: "cool",
    desc: "A submerged current moving horizontally through darkness",
    dark: true,
    text: "#c4e7e5",
    base: "#030707",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(90deg, transparent 0%, rgba(16,58,58,0.12) 24%, rgba(24,105,103,0.34) 52%, rgba(18,74,73,0.18) 72%, transparent 100%)",
        blendMode: "screen",
        blur: 65,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(70% 28% at 54% 62%, rgba(34,124,120,0.28) 0%, rgba(20,68,67,0.13) 48%, transparent 82%)",
        blendMode: "screen",
        blur: 48,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(90deg, transparent 30%, rgba(75,158,153,0.08) 52%, transparent 72%)",
        blendMode: "overlay",
        blur: 24,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "smokeveil",
    name: "Smokeveil",
    category: "aura",
    mood: "cool",
    desc: "A translucent veil of blue-green smoke crossing the frame",
    dark: true,
    text: "#c8e2df",
    base: "#050706",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(155deg, transparent 8%, rgba(30,75,68,0.12) 28%, rgba(45,112,99,0.25) 43%, rgba(23,65,59,0.18) 59%, transparent 82%)",
        blendMode: "screen",
        blur: 70,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(70% 42% at 45% 50%, rgba(40,111,99,0.25) 0%, rgba(20,61,55,0.12) 48%, transparent 82%)",
        blendMode: "screen",
        blur: 65,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(25deg, transparent 25%, rgba(90,151,135,0.07) 50%, transparent 75%)",
        blendMode: "soft-light",
        blur: 45,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "copper-shadow",
    name: "Copper Shadow",
    category: "aura",
    mood: "warm",
    desc: "Muted copper light slipping beneath a black veil",
    dark: true,
    text: "#ead8c8",
    base: "#0a0705",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(58% 62% at 72% 64%, rgba(127,72,39,0.32) 0%, rgba(74,43,26,0.16) 42%, transparent 80%)",
        blendMode: "screen",
        blur: 58,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(135deg, transparent 35%, rgba(160,91,45,0.20) 52%, transparent 70%)",
        blendMode: "screen",
        blur: 45,
        opacity: 0.8,
      },
      {
        background:
          "radial-gradient(28% 30% at 84% 22%, rgba(194,119,69,0.13) 0%, transparent 78%)",
        blendMode: "soft-light",
        blur: 35,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "greenflare",
    name: "Greenflare",
    category: "aura",
    mood: "vivid",
    desc: "A concentrated emerald flare dissolving into black",
    dark: true,
    text: "#d4edda",
    base: "#040704",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(24% 42% at 72% 48%, rgba(48,145,76,0.38) 0%, rgba(28,83,48,0.18) 42%, transparent 82%)",
        blendMode: "screen",
        blur: 42,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(112deg, transparent 38%, rgba(47,132,74,0.18) 50%, transparent 64%)",
        blendMode: "screen",
        blur: 38,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(45% 70% at 20% 52%, rgba(24,70,38,0.14) 0%, transparent 80%)",
        blendMode: "soft-light",
        blur: 55,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "sage-phantom",
    name: "Sage Phantom",
    category: "aura",
    mood: "dark",
    desc: "Asymmetrical soft sage glow emerging from the bottom right",
    dark: true,
    text: "#a4b5b0",
    base: "#050708", // Deep black with a faint greenish tint
    grain: true,
    layers: [
      {
        // Main light core in the bottom-right corner
        background: "radial-gradient(ellipse 80% 80% at 85% 85%, rgba(135, 165, 155, 0.35) 0%, rgba(80, 110, 105, 0.15) 40%, rgba(0, 0, 0, 0) 70%)",
        blendMode: "screen",
        blur: 50,
        opacity: 1,
      },
      {
        // A subtle extension of the glow toward the center to give it that "wave" shape
        background: "radial-gradient(ellipse 70% 50% at 65% 75%, rgba(135, 165, 155, 0.12) 0%, rgba(0, 0, 0, 0) 60%)",
        blendMode: "screen",
        blur: 60,
        opacity: 1,
      }
    ],
  },

  {
    id: "abyssal-floor",
    name: "Abyssal Floor",
    category: "aura",
    mood: "dark",
    desc: "Deep cyan glow rising exclusively from the absolute black floor",
    dark: true,
    text: "#00e5ff",
    base: "#000000", // Pure black for contrast
    grain: true,
    layers: [
      {
        // Flattened ellipse concentrated at the base
        background: "radial-gradient(ellipse 120% 70% at 50% 110%, rgba(0, 90, 110, 0.8) 0%, rgba(0, 45, 60, 0.5) 40%, rgba(0, 0, 0, 0) 75%)",
        blendMode: "screen",
        blur: 50,
        opacity: 1,
      },
      {
        // Bottom linear reinforcement simulating light bouncing off the floor
        background: "linear-gradient(to top, rgba(0, 130, 150, 0.25) 0%, rgba(0, 0, 0, 0) 35%)",
        blendMode: "screen",
        blur: 20,
        opacity: 1,
      }
    ],
  },

  {
    id: "mesh-ember-dusk",
    name: "Ember Dusk",
    category: "mesh",
    mood: "warm",
    desc: "Last embers of sunset smoldering behind charcoal hills",
    dark: true,
    text: "#fdba74",
    base: "#0f0500",
    layers: [
      { background: "radial-gradient(circle at 30% 35%, rgba(234,88,12,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(circle at 70% 30%, rgba(251,146,60,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(circle at 50% 75%, rgba(153,27,27,0.4) 0%, transparent 50%)", blendMode: "multiply", blur: 90 },
      { background: "radial-gradient(circle at 20% 80%, rgba(251,191,36,0.2) 0%, transparent 35%)", blendMode: "overlay", blur: 55 },
    ],
  },

  {
    id: "mesh-lunar-surface",
    name: "Lunar Surface",
    category: "mesh",
    mood: "cool",
    desc: "Moon dust catching earthshine in silent craters",
    dark: true,
    text: "#e2e8f0",
    base: "#0a0a0f",
    layers: [
      { background: "radial-gradient(circle at 20% 30%, rgba(148,163,184,0.5) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 80% 25%, rgba(203,213,225,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 75%, rgba(100,116,139,0.35) 0%, transparent 50%)", blendMode: "soft-light", blur: 85 },
      { background: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 30%)", blendMode: "overlay", blur: 50 },
    ],
  },

  {
    id: "mesh-aurora-borealis",
    name: "Aurora Borealis",
    category: "mesh",
    mood: "cool",
    desc: "Northern lights mesh with emerald and violet nodes",
    dark: true,
    text: "#d7f7ef",
    base: "#050d0a",
    layers: [
      { background: "radial-gradient(circle at 15% 50%, rgba(16,185,129,0.8) 0%, transparent 45%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 55% 30%, rgba(52,211,153,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 80% 60%, rgba(139,92,246,0.7) 0%, transparent 50%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 40% 80%, rgba(6,182,212,0.4) 0%, transparent 35%)", blendMode: "screen", blur: 60 },
    ],
  },

  {
    id: "mesh-abyssal-void",
    name: "Abyssal Void",
    category: "mesh",
    mood: "dark",
    desc: "Crushing darkness pierced by bioluminescent anglerfish glow",
    dark: true,
    text: "#67e8f9",
    base: "#000508",
    layers: [
      { background: "radial-gradient(circle at 50% 40%, rgba(6,182,212,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 20% 70%, rgba(14,165,233,0.3) 0%, transparent 35%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 80% 60%, rgba(99,102,241,0.25) 0%, transparent 45%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 60% 85%, rgba(6,182,212,0.15) 0%, transparent 30%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-graphite",
    name: "Graphite Mesh",
    category: "mesh",
    mood: "cool",
    desc: "Monochrome graphite mesh with cool steel nodes",
    dark: true,
    text: "#d4d8dd",
    base: "#0d0e10",
    layers: [
      { background: "radial-gradient(circle at 25% 30%, rgba(100,116,139,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 75% 25%, rgba(148,163,184,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 75%, rgba(71,85,105,0.5) 0%, transparent 50%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 85% 70%, rgba(203,213,225,0.25) 0%, transparent 30%)", blendMode: "screen", blur: 55 },
    ],
  },

  {
    id: "mesh-deep-ocean",
    name: "Deep Ocean",
    category: "mesh",
    mood: "cool",
    desc: "Abyssal blue mesh with bioluminescent nodes",
    dark: true,
    text: "#d0f0fd",
    base: "#020617",
    layers: [
      { background: "radial-gradient(circle at 30% 40%, rgba(14,165,233,0.7) 0%, transparent 40%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 70% 25%, rgba(56,189,248,0.5) 0%, transparent 35%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 70%, rgba(99,102,241,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 85% 75%, rgba(6,182,212,0.4) 0%, transparent 30%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(circle at 15% 80%, rgba(79,70,229,0.3) 0%, transparent 25%)", blendMode: "screen", blur: 50 },
    ],
  },

  {
    id: "celestial-drift",
    name: "Celestial Drift",
    category: "mesh",
    mood: "vivid",
    desc: "Pastel cosmic mesh with lavender and mint nodes under faint stars",
    dark: true,
    text: "#eae6ff",
    base: "#0a0a16",
    layers: [
      { background: "radial-gradient(circle at 22% 32%, rgba(167,139,250,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 72% 22%, rgba(110,231,183,0.45) 0%, transparent 40%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 55% 75%, rgba(244,114,182,0.4) 0%, transparent 50%)", blendMode: "screen", blur: 80 },
      {
        background: `
          radial-gradient(circle at 10% 10%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 88% 15%, rgba(255,255,255,0.6) 1px, transparent 3px),
          radial-gradient(circle at 40% 90%, rgba(255,255,255,0.6) 1px, transparent 3px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "mesh-neon-tokyo",
    name: "Neon Tokyo",
    category: "mesh",
    mood: "vivid",
    desc: "Cyberpunk city lights bleeding through rain-slicked streets",
    dark: true,
    text: "#ff6b9d",
    base: "#0a0014",
    layers: [
      { background: "radial-gradient(circle at 15% 20%, rgba(255,0,128,0.7) 0%, transparent 50%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 85% 15%, rgba(0,255,255,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 50% 80%, rgba(255,255,0,0.4) 0%, transparent 55%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 70% 50%, rgba(255,0,255,0.3) 0%, transparent 40%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-volcanic-glass",
    name: "Volcanic Glass",
    category: "mesh",
    mood: "dark",
    desc: "Molten obsidian cooling into prismatic fractures",
    dark: true,
    text: "#ff8c69",
    base: "#0a0200",
    layers: [
      { background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 70% 25%, rgba(255,140,0,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 70%, rgba(139,0,0,0.5) 0%, transparent 50%)", blendMode: "multiply", blur: 90 },
      { background: "radial-gradient(circle at 20% 80%, rgba(255,215,0,0.25) 0%, transparent 35%)", blendMode: "overlay", blur: 55 },
    ],
  },

  {
    id: "mesh-pearl-diving",
    name: "Pearl Diving",
    category: "mesh",
    mood: "cool",
    desc: "Iridescent mother-of-pearl shimmering in abyssal depths",
    dark: true,
    text: "#e0f7fa",
    base: "#020a0f",
    layers: [
      { background: "radial-gradient(circle at 25% 35%, rgba(178,235,242,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 75% 30%, rgba(224,247,250,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 85 },
      { background: "radial-gradient(circle at 45% 75%, rgba(128,222,234,0.4) 0%, transparent 50%)", blendMode: "soft-light", blur: 70 },
      { background: "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 30%)", blendMode: "overlay", blur: 50 },
    ],
  },

  {
    id: "mesh-nebula-core",
    name: "Nebula Core",
    category: "mesh",
    mood: "vivid",
    desc: "Stellar nursery birthing new stars in chromatic gas clouds",
    dark: true,
    text: "#e0e7ff",
    base: "#050510",
    layers: [
      { background: "radial-gradient(circle at 25% 30%, rgba(139,92,246,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 75% 25%, rgba(236,72,153,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 50% 75%, rgba(59,130,246,0.5) 0%, transparent 50%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 20% 80%, rgba(250,204,21,0.2) 0%, transparent 35%)", blendMode: "overlay", blur: 55 },
      { background: "radial-gradient(circle at 85% 70%, rgba(255,255,255,0.1) 0%, transparent 25%)", blendMode: "screen", blur: 40 },
    ],
  },

  {
    id: "mesh-witching-hour",
    name: "Witching Hour",
    category: "mesh",
    mood: "dark",
    desc: "Midnight ritual glow with emerald smoke and violet embers",
    dark: true,
    text: "#d8b4fe",
    base: "#0a0010",
    layers: [
      { background: "radial-gradient(circle at 30% 25%, rgba(139,92,246,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 70% 35%, rgba(16,185,129,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 85 },
      { background: "radial-gradient(circle at 45% 75%, rgba(236,72,153,0.4) 0%, transparent 50%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 15% 80%, rgba(250,204,21,0.2) 0%, transparent 30%)", blendMode: "overlay", blur: 55 },
    ],
  },

  {
    id: "mesh-starlight-canvas",
    name: "Starlight Canvas",
    category: "mesh",
    mood: "vivid",
    desc: "Painter's palette dipped in galaxy dust and constellation ink",
    dark: true,
    text: "#e0e7ff",
    base: "#020205",
    layers: [
      { background: "radial-gradient(circle at 25% 30%, rgba(99,102,241,0.5) 0%, transparent 45%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 75% 25%, rgba(236,72,153,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 50% 75%, rgba(14,165,233,0.4) 0%, transparent 50%)", blendMode: "screen", blur: 85 },
      { background: "radial-gradient(circle at 20% 80%, rgba(250,204,21,0.2) 0%, transparent 35%)", blendMode: "overlay", blur: 55 },
      { background: "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.8) 1px, transparent 3px), radial-gradient(circle at 88% 15%, rgba(255,255,255,0.6) 1px, transparent 3px), radial-gradient(circle at 40% 90%, rgba(255,255,255,0.6) 1px, transparent 3px)", blendMode: "screen", blur: 0, opacity: 0.8 },
    ],
  },

  {
    id: "mesh-arctic-aurora",
    name: "Arctic Aurora",
    category: "mesh",
    mood: "cool",
    desc: "Polar light curtains dancing across frozen tundra",
    dark: true,
    text: "#a5f3fc",
    base: "#020617",
    layers: [
      { background: "radial-gradient(circle at 15% 40%, rgba(34,211,238,0.7) 0%, transparent 45%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 60% 25%, rgba(52,211,153,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 90 },
      { background: "radial-gradient(circle at 80% 65%, rgba(139,92,246,0.6) 0%, transparent 50%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 35% 80%, rgba(6,182,212,0.35) 0%, transparent 35%)", blendMode: "overlay", blur: 65 },
    ],
  },

  {
    id: "mesh-bourbon-smoke",
    name: "Bourbon Smoke",
    category: "mesh",
    mood: "warm",
    desc: "Amber liquid light refracting through oak-aged haze",
    dark: true,
    text: "#fbbf24",
    base: "#0f0800",
    layers: [
      { background: "radial-gradient(circle at 25% 30%, rgba(180,83,9,0.6) 0%, transparent 45%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(circle at 75% 25%, rgba(217,119,6,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(circle at 50% 75%, rgba(120,53,15,0.5) 0%, transparent 50%)", blendMode: "multiply", blur: 90 },
      { background: "radial-gradient(circle at 20% 80%, rgba(251,191,36,0.25) 0%, transparent 35%)", blendMode: "overlay", blur: 100 },
    ],
  },

  {
    id: "mesh-digital-rain",
    name: "Digital Rain",
    category: "mesh",
    mood: "cool",
    desc: "Matrix code dissolving into phosphor green pools",
    dark: true,
    text: "#4ade80",
    base: "#000a00",
    layers: [
      { background: "radial-gradient(circle at 30% 20%, rgba(34,197,94,0.7) 0%, transparent 45%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 70% 35%, rgba(16,185,129,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 85 },
      { background: "radial-gradient(circle at 45% 70%, rgba(6,182,212,0.4) 0%, transparent 50%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 80% 80%, rgba(132,204,22,0.2) 0%, transparent 30%)", blendMode: "overlay", blur: 55 },
    ],
  },

  {
    id: "mesh-obsidian-prism",
    name: "Obsidian Prism",
    category: "mesh",
    mood: "dark",
    desc: "Black volcanic glass fracturing light into hidden spectra",
    dark: true,
    text: "#c4b5fd",
    base: "#050505",
    layers: [
      { background: "radial-gradient(circle at 30% 25%, rgba(139,92,246,0.4) 0%, transparent 45%)", blendMode: "screen", blur: 75 },
      { background: "radial-gradient(circle at 70% 35%, rgba(6,182,212,0.3) 0%, transparent 40%)", blendMode: "screen", blur: 85 },
      { background: "radial-gradient(circle at 50% 75%, rgba(236,72,153,0.25) 0%, transparent 50%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 20% 80%, rgba(250,204,21,0.15) 0%, transparent 30%)", blendMode: "overlay", blur: 55 },
    ],
  },

  {
    id: "mesh-copper-patina",
    name: "Copper Patina",
    category: "mesh",
    mood: "warm",
    desc: "Oxidized bronze catching verdigris and rust in equal measure",
    dark: true,
    text: "#fde68a",
    base: "#0f0a00",
    layers: [
      { background: "radial-gradient(circle at 25% 30%, rgba(180,83,9,0.5) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 75% 25%, rgba(21,128,61,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 75%, rgba(120,53,15,0.4) 0%, transparent 50%)", blendMode: "multiply", blur: 90 },
      { background: "radial-gradient(circle at 20% 80%, rgba(234,179,8,0.2) 0%, transparent 35%)", blendMode: "overlay", blur: 55 },
    ],
  },

  {
    id: "mesh-golden-coast",
    name: "Golden Coast",
    category: "mesh",
    mood: "warm",
    desc: "Sunset beach mesh with amber and coral nodes",
    dark: false,
    cardText: "#000000",
    text: "#5b3a1f",
    base: "#fffbeb",
    layers: [
      { background: "radial-gradient(circle at 25% 25%, rgba(251,191,36,0.6) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 75% 35%, rgba(251,146,60,0.5) 0%, transparent 40%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 50% 75%, rgba(244,63,94,0.4) 0%, transparent 50%)", blendMode: "normal", blur: 90 },
      { background: "radial-gradient(circle at 85% 80%, rgba(245,158,11,0.3) 0%, transparent 35%)", blendMode: "soft-light", blur: 60 },
    ],
  },

  {
    id: "mesh-sakura",
    name: "Sakura Fields",
    category: "mesh",
    mood: "warm",
    desc: "Cherry blossom pink mesh with warm peach nodes",
    dark: false,
    cardText: "#000000",
    text: "#6e2848",
    base: "#fdf2f8",
    layers: [
      { background: "radial-gradient(circle at 20% 30%, rgba(251,113,133,0.7) 0%, transparent 50%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(circle at 80% 20%, rgba(249,168,212,0.6) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 60% 80%, rgba(253,164,175,0.5) 0%, transparent 55%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 30% 70%, rgba(244,114,182,0.4) 0%, transparent 40%)", blendMode: "soft-light", blur: 50 },
    ],
  },

  {
    id: "mesh-citrine",
    name: "Citrine Mesh",
    category: "mesh",
    mood: "warm",
    desc: "Sunlit yellow-gold mesh with amber nodes",
    dark: false,
    cardText: "#000000",
    text: "#5a4a10",
    base: "#fffef0",
    layers: [
      { background: "radial-gradient(circle at 22% 28%, rgba(250,204,21,0.6) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 78% 32%, rgba(253,224,71,0.5) 0%, transparent 40%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 50% 78%, rgba(234,179,8,0.4) 0%, transparent 50%)", blendMode: "normal", blur: 85 },
      { background: "radial-gradient(circle at 85% 75%, rgba(202,138,4,0.3) 0%, transparent 35%)", blendMode: "soft-light", blur: 55 },
    ],
  },

  {
    id: "mesh-lavender-haze",
    name: "Lavender Haze",
    category: "mesh",
    mood: "vivid",
    desc: "Soft purple mesh with lilac and mauve nodes",
    dark: false,
    cardText: "#000000",
    text: "#4c1d95",
    base: "#faf5ff",
    layers: [
      { background: "radial-gradient(circle at 20% 40%, rgba(192,132,252,0.6) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 70% 30%, rgba(167,139,250,0.5) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 45% 75%, rgba(216,180,254,0.4) 0%, transparent 40%)", blendMode: "normal", blur: 90 },
      { background: "radial-gradient(circle at 85% 65%, rgba(232,121,249,0.35) 0%, transparent 35%)", blendMode: "soft-light", blur: 60 },
    ],
  },

  {
    id: "mesh-rose-quartz",
    name: "Rose Quartz",
    category: "mesh",
    mood: "warm",
    desc: "Crystalline pink formations catching dawn light",
    dark: false,
    cardText: "#000000",
    text: "#9d174d",
    base: "#fdf2f8",
    layers: [
      { background: "radial-gradient(circle at 22% 28%, rgba(251,113,133,0.6) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 78% 32%, rgba(244,114,182,0.5) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 78%, rgba(253,164,175,0.4) 0%, transparent 55%)", blendMode: "soft-light", blur: 85 },
      { background: "radial-gradient(circle at 30% 70%, rgba(255,228,230,0.5) 0%, transparent 40%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-saffron-silk",
    name: "Saffron Silk",
    category: "mesh",
    mood: "warm",
    desc: "Spice market warmth woven through golden fabric folds",
    dark: false,
    cardText: "#000000",
    text: "#78350f",
    base: "#fffbeb",
    layers: [
      { background: "radial-gradient(circle at 20% 25%, rgba(234,179,8,0.6) 0%, transparent 50%)", blendMode: "normal", blur: 75 },
      { background: "radial-gradient(circle at 80% 30%, rgba(217,119,6,0.5) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 80%, rgba(180,83,9,0.4) 0%, transparent 55%)", blendMode: "soft-light", blur: 85 },
      { background: "radial-gradient(circle at 30% 70%, rgba(251,191,36,0.3) 0%, transparent 40%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-solar-flare",
    name: "Solar Flare",
    category: "mesh",
    mood: "warm",
    desc: "Coronal mass ejection captured in frozen light",
    dark: false,
    cardText: "#000000",
    text: "#8b4513",
    base: "#fff8e7",
    layers: [
      { background: "radial-gradient(circle at 20% 25%, rgba(255,200,50,0.7) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 80% 20%, rgba(255,140,0,0.6) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 75%, rgba(255,69,0,0.5) 0%, transparent 55%)", blendMode: "soft-light", blur: 90 },
      { background: "radial-gradient(circle at 30% 70%, rgba(255,255,200,0.4) 0%, transparent 40%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-frosted-jade",
    name: "Frosted Jade",
    category: "mesh",
    mood: "cool",
    desc: "Ancient jade carved from glacier ice and mountain mist",
    dark: false,
    cardText: "#000000",
    text: "#065f46",
    base: "#f0fdf4",
    layers: [
      { background: "radial-gradient(circle at 25% 30%, rgba(52,211,153,0.5) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 75% 25%, rgba(16,185,129,0.4) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 80%, rgba(6,182,212,0.35) 0%, transparent 55%)", blendMode: "soft-light", blur: 85 },
      { background: "radial-gradient(circle at 30% 70%, rgba(209,250,229,0.5) 0%, transparent 40%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-tropical-punch",
    name: "Tropical Punch",
    category: "mesh",
    mood: "vivid",
    desc: "Mango and dragon fruit colliding in a blender of light",
    dark: false,
    cardText: "#000000",
    text: "#be123c",
    base: "#fff1f2",
    layers: [
      { background: "radial-gradient(circle at 22% 28%, rgba(251,146,60,0.6) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 78% 32%, rgba(244,63,94,0.5) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 78%, rgba(250,204,21,0.4) 0%, transparent 55%)", blendMode: "soft-light", blur: 90 },
      { background: "radial-gradient(circle at 85% 70%, rgba(236,72,153,0.3) 0%, transparent 35%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-cotton-candy",
    name: "Cotton Candy",
    category: "mesh",
    mood: "vivid",
    desc: "Sugar-spun clouds dissolving in pastel twilight",
    dark: false,
    cardText: "#000000",
    text: "#be185d",
    base: "#fff0f5",
    layers: [
      { background: "radial-gradient(circle at 20% 30%, rgba(244,114,182,0.6) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 75% 25%, rgba(167,139,250,0.5) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 80%, rgba(253,186,116,0.4) 0%, transparent 55%)", blendMode: "soft-light", blur: 90 },
      { background: "radial-gradient(circle at 85% 70%, rgba(192,132,252,0.3) 0%, transparent 35%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "mesh-alpine-meadow",
    name: "Alpine Meadow",
    category: "mesh",
    mood: "cool",
    desc: "Wildflower blooms scattered across high altitude pastures",
    dark: false,
    cardText: "#000000",
    text: "#14532d",
    base: "#f0fdf4",
    layers: [
      { background: "radial-gradient(circle at 20% 30%, rgba(132,204,22,0.5) 0%, transparent 50%)", blendMode: "normal", blur: 80 },
      { background: "radial-gradient(circle at 75% 25%, rgba(52,211,153,0.4) 0%, transparent 45%)", blendMode: "normal", blur: 70 },
      { background: "radial-gradient(circle at 50% 80%, rgba(250,204,21,0.35) 0%, transparent 55%)", blendMode: "soft-light", blur: 85 },
      { background: "radial-gradient(circle at 30% 70%, rgba(167,139,250,0.25) 0%, transparent 40%)", blendMode: "overlay", blur: 60 },
    ],
  },

  {
    id: "nebula-cosmic-dust",
    name: "Cosmic Dust",
    category: "nebula",
    mood: "vivid",
    desc: "Floating violet and cyan orbs in deep space",
    dark: true,
    text: "#e0d4ff",
    base: "#09090b",
    layers: [
      { background: "radial-gradient(ellipse 40% 50% at 25% 35%, rgba(139,92,246,0.9) 0%, transparent 70%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 35% 45% at 70% 60%, rgba(6,182,212,0.8) 0%, transparent 70%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 25% 30% at 50% 20%, rgba(244,114,182,0.5) 0%, transparent 70%)", blendMode: "screen", blur: 40 },
      { background: "radial-gradient(ellipse 20% 25% at 80% 30%, rgba(232,121,249,0.4) 0%, transparent 70%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "blood-aurora",
    name: "Blood Aurora",
    category: "nebula",
    mood: "dark",
    desc: "Crimson and gold aurora curtains burning across an absolute night sky",
    dark: true,
    text: "#ffe0d0",
    base: "#050101",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(154deg, transparent 18%, rgba(60,10,10,0.06) 29%, rgba(255,40,0,0.40) 36%, rgb(255,255,255) 42%, rgba(207,60,20,0.32) 48%, rgba(158,20,10,0.22) 55%, rgba(255,90,0,0.30) 62%, rgba(60,15,10,0.08) 68%, transparent 82%)",
        blendMode: "screen",
        blur: 34,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(128deg, transparent 28%, rgba(80,10,20,0.06) 38%, rgba(255,80,0,0.35) 43%, rgb(255,255,255) 48%, rgba(200,60,30,0.22) 52%, rgba(255,40,0,0.25) 57%, rgba(90,20,10,0.10) 62%, transparent 76%)",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 78% 20% at 51% 53%, rgba(200,50,20,0.24) 0%, rgba(100,20,10,0.10) 45%, transparent 82%)",
        blendMode: "screen",
        blur: 28,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 48% 9% at 52% 50%, rgba(255,220,190,0.14) 0%, rgba(200,80,50,0.06) 45%, transparent 80%)",
        blendMode: "screen",
        blur: 70,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(to top, rgba(5,1,1,0.90) 0%, rgba(5,1,1,0.58) 28%, rgba(5,1,1,0.20) 55%, transparent 78%)",
        blendMode: "multiply",
        blur: 32,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 50% 28% at 72% 18%, rgba(150,90,20,0.10) 0%, rgba(100,60,10,0.04) 45%, transparent 82%)",
        blendMode: "screen",
        blur: 55,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "void-serpent",
    name: "Void Serpent",
    category: "nebula",
    mood: "dark",
    desc: "Poisonous green and violet curtains coiling through an absolute void",
    dark: true,
    text: "#d8ffe0",
    base: "#020502",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(154deg, transparent 18%, rgba(10,60,20,0.06) 29%, rgba(140,255,20,0.40) 36%, rgb(255,255,255) 42%, rgba(110,60,200,0.32) 48%, rgba(60,150,40,0.22) 55%, rgba(160,0,255,0.30) 62%, rgba(10,50,20,0.08) 68%, transparent 82%)",
        blendMode: "screen",
        blur: 34,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(128deg, transparent 28%, rgba(15,80,30,0.06) 38%, rgba(120,0,255,0.35) 43%, rgb(255,255,255) 48%, rgba(70,200,90,0.22) 52%, rgba(150,255,20,0.25) 57%, rgba(20,90,40,0.10) 62%, transparent 76%)",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 78% 20% at 51% 53%, rgba(90,200,60,0.24) 0%, rgba(40,100,30,0.10) 45%, transparent 82%)",
        blendMode: "screen",
        blur: 28,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 48% 9% at 52% 50%, rgba(220,255,220,0.14) 0%, rgba(120,80,180,0.06) 45%, transparent 80%)",
        blendMode: "screen",
        blur: 70,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(to top, rgba(2,5,2,0.90) 0%, rgba(2,5,2,0.58) 28%, rgba(2,5,2,0.20) 55%, transparent 78%)",
        blendMode: "multiply",
        blur: 32,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 50% 28% at 72% 18%, rgba(100,30,180,0.10) 0%, rgba(60,20,120,0.04) 45%, transparent 82%)",
        blendMode: "screen",
        blur: 55,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "nebula-plasma",
    name: "Plasma Storm",
    category: "nebula",
    mood: "vivid",
    desc: "Electric purple and blue plasma blobs",
    dark: true,
    text: "#e8d5ff",
    base: "#09090b",
    layers: [
      { background: "radial-gradient(ellipse 50% 40% at 35% 50%, rgba(124,58,237,0.9) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 40% 50% at 65% 40%, rgba(59,130,246,0.8) 0%, transparent 60%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(168,85,247,0.6) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 20% 20% at 20% 25%, rgba(96,165,250,0.4) 0%, transparent 50%)", blendMode: "screen", blur: 35 },
      { background: "radial-gradient(ellipse 15% 18% at 80% 70%, rgba(147,51,234,0.5) 0%, transparent 60%)", blendMode: "screen", blur: 30 },
    ],
  },

  {
    id: "nebula-ashen",
    name: "Ashen Nebula",
    category: "nebula",
    mood: "cool",
    desc: "Dim charcoal orbs drifting through a gray void",
    dark: true,
    text: "#c9cdd3",
    base: "#0a0a0b",
    layers: [
      { background: "radial-gradient(ellipse 42% 48% at 30% 40%, rgba(148,163,184,0.5) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 68% 55%, rgba(100,116,139,0.45) 0%, transparent 60%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(ellipse 25% 30% at 50% 80%, rgba(71,85,105,0.4) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
    ],
  },

  {
    id: "nebula-quiet-glow",
    name: "Quiet Glow",
    category: "nebula",
    mood: "cool",
    desc: "A single soft cyan presence floating in darkness",
    dark: true,
    text: "#c8e7e6",
    base: "#050707",
    grain: true,
    layers: [
      {
        background: "radial-gradient(ellipse 42% 48% at 68% 48%, rgba(45,140,137,0.34) 0%, rgba(25,76,75,0.16) 42%, transparent 78%)",
        blendMode: "screen",
        blur: 55,
        opacity: 1,
      },
      {
        background: "radial-gradient(ellipse 20% 24% at 66% 48%, rgba(78,166,161,0.12) 0%, transparent 72%)",
        blendMode: "screen",
        blur: 28,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "nebula-moonlit",
    name: "Moonlit",
    category: "nebula",
    mood: "cool",
    desc: "A pale blue glow fading into a midnight void",
    dark: true,
    text: "#d6e1ef",
    base: "#05070a",
    grain: true,
    layers: [
      {
        background: "radial-gradient(ellipse 38% 42% at 76% 30%, rgba(105,135,165,0.26) 0%, rgba(57,79,103,0.12) 45%, transparent 78%)",
        blendMode: "screen",
        blur: 10,
        opacity: 1,
      },
      {
        background: "radial-gradient(ellipse 18% 20% at 76% 30%, rgba(180,198,214,0.10) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 15,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "nebula-emberveil",
    name: "Emberveil",
    category: "nebula",
    mood: "warm",
    desc: "A muted ember drifting behind a dark veil",
    dark: true,
    text: "#ead4c2",
    base: "#090604",
    grain: true,
    layers: [
      {
        background: "radial-gradient(ellipse 45% 50% at 28% 62%, rgba(143,77,39,0.28) 0%, rgba(79,45,27,0.13) 45%, transparent 80%)",
        blendMode: "screen",
        blur: 60,
        opacity: 1,
      },
      {
        background: "radial-gradient(ellipse 18% 22% at 31% 60%, rgba(211,119,58,0.13) 0%, transparent 72%)",
        blendMode: "screen",
        blur: 30,
        opacity: 0.75,
      },
    ],
  },

  {
    id: "nebula-dew",
    name: "Dew",
    category: "nebula",
    mood: "cool",
    desc: "Tiny turquoise atmosphere suspended in deep black",
    dark: true,
    text: "#c8ebe8",
    base: "#040707",
    grain: true,
    layers: [
      {
        background: "radial-gradient(ellipse 28% 32% at 32% 34%, rgba(36,125,119,0.30) 0%, rgba(22,66,64,0.13) 45%, transparent 78%)",
        blendMode: "screen",
        blur: 40,
        opacity: 1,
      },
      {
        background: "radial-gradient(ellipse 16% 18% at 32% 34%, rgba(82,169,160,0.14) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 22,
        opacity: 0.8,
      },
      {
        background: "radial-gradient(ellipse 24% 28% at 78% 72%, rgba(25,91,89,0.16) 0%, transparent 78%)",
        blendMode: "screen",
        blur: 40,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "nebula-boreal",
    name: "Boreal",
    category: "nebula",
    mood: "cool",
    desc: "A restrained northern green haze in a black void",
    dark: true,
    text: "#d0ebe0",
    base: "#040706",
    grain: true,
    layers: [
      {
        background: "radial-gradient(ellipse 46% 52% at 62% 42%, rgba(35,112,78,0.27) 0%, rgba(22,65,49,0.13) 45%, transparent 80%)",
        blendMode: "screen",
        blur: 10,
        opacity: 1,
      },
      {
        background: "linear-gradient(125deg, transparent 35%, rgba(55,137,99,0.10) 52%, transparent 68%)",
        blendMode: "soft-light",
        blur: 30,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "nebula-silk",
    name: "Silk",
    category: "nebula",
    mood: "cool",
    desc: "A thin atmospheric ribbon softly crossing the void",
    dark: true,
    text: "#cbe6e4",
    base: "#040707",
    grain: true,
    layers: [
      {
        background: "linear-gradient(154deg, transparent 28%, rgba(31,103,99,0.08) 38%, rgba(48,137,130,0.22) 48%, rgba(25,78,75,0.12) 56%, transparent 68%)",
        blendMode: "screen",
        blur: 30,
        opacity: 1,
      },
      {
        background: "radial-gradient(ellipse 70% 18% at 50% 52%, rgba(38,116,111,0.20) 0%, rgba(20,61,59,0.08) 48%, transparent 82%)",
        blendMode: "screen",
        blur: 25,
        opacity: 0.85,
      },
    ],
  },

  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    category: "nebula",
    mood: "vivid",
    desc: "Layered emerald and cyan aurora curtains drifting across a midnight sky",
    dark: true,
    text: "#e1fff6",
    base: "#020509",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(154deg, transparent 18%, rgba(12,72,61,0.06) 29%, rgba(0,229,255,0.40) 36%, rgb(255,255,255) 42%, rgba(73,207,158,0.32) 48%, rgba(38,158,119,0.22) 55%, rgba(0,183,255,0.30) 62%, rgba(15,76,65,0.08) 68%, transparent 82%)",
        blendMode: "screen",
        blur: 34,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(128deg, transparent 28%, rgba(15,82,96,0.06) 38%, rgba(0,183,255,0.35) 43%, rgb(255,255,255) 48%, rgba(68,197,185,0.22) 52%, rgba(0,229,255,0.25) 57%, rgba(25,105,112,0.10) 62%, transparent 76%)",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 78% 20% at 51% 53%, rgba(65,183,155,0.24) 0%, rgba(30,102,91,0.10) 45%, transparent 82%)",
        blendMode: "screen",
        blur: 28,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 48% 9% at 52% 50%, rgba(190,255,226,0.14) 0%, rgba(91,195,163,0.06) 45%, transparent 80%)",
        blendMode: "screen",
        blur: 70,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(to top, rgba(1,5,13,0.90) 0%, rgba(2,7,16,0.58) 28%, rgba(3,9,20,0.20) 55%, transparent 78%)",
        blendMode: "multiply",
        blur: 32,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 50% 28% at 72% 18%, rgba(89,62,151,0.10) 0%, rgba(57,44,100,0.04) 45%, transparent 82%)",
        blendMode: "screen",
        blur: 55,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "deep-cosmos",
    name: "Deep Cosmos",
    category: "nebula",
    mood: "cool",
    desc: "Deep purple abyss with stellar glows and distant twinkling stars",
    dark: true,
    text: "#ffffff",
    base: "#0F0F12",
    layers: [
      {
        background: "linear-gradient(180deg, #0F0F12 0%, rgba(76, 29, 149, 0.5) 50%, rgba(109, 40, 217, 0.7) 100%)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
      },
      {
        background: "radial-gradient(ellipse at 50% 115%, rgba(147, 51, 234, 0.55) 0%, rgba(109, 40, 217, 0.2) 60%, transparent 80%)",
        blendMode: "screen",
        blur: 120,
        opacity: 1,
      },
      {
        background: "radial-gradient(circle at 100% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)",
        blendMode: "screen",
        blur: 100,
        opacity: 1,
      },
      {
        background: `
          radial-gradient(circle at 12% 18%, rgba(255,255,255,0.8) 1px, transparent 3px),
          radial-gradient(circle at 78% 14%, rgba(250,232,255,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 88% 44%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 18% 58%, rgba(233,213,255,1) 1.5px, transparent 4px),
          radial-gradient(circle at 6% 40%, rgba(255,255,255,0.6) 1px, transparent 3px),
          radial-gradient(circle at 68% 6%, rgba(250,232,255,0.8) 1px, transparent 3px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      }
    ],
  },

  {
    id: "starlit-abyss",
    name: "Starlit Abyss",
    category: "nebula",
    mood: "cool",
    desc: "Indigo void with a distant glow and scattered stars",
    dark: true,
    text: "#e0e4ff",
    base: "#06060c",
    layers: [
      {
        background:
          "linear-gradient(180deg, #06060c 0%, rgba(30,27,75,0.5) 50%, rgba(49,46,129,0.6) 100%)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(ellipse at 50% 115%, rgba(79,70,229,0.55) 0%, rgba(49,46,129,0.15) 60%, transparent 80%)",
        blendMode: "screen",
        blur: 120,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(circle at 15% 20%, rgba(56,189,248,0.15) 0%, transparent 40%)",
        blendMode: "screen",
        blur: 100,
        opacity: 1,
      },
      {
        background: `
          radial-gradient(circle at 10% 15%, rgba(255,255,255,0.8) 1px, transparent 3px),
          radial-gradient(circle at 82% 10%, rgba(199,210,254,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 90% 48%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 22% 62%, rgba(224,231,255,1) 1.5px, transparent 4px),
          radial-gradient(circle at 5% 45%, rgba(255,255,255,0.6) 1px, transparent 3px),
          radial-gradient(circle at 65% 8%, rgba(199,210,254,0.8) 1px, transparent 3px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "stardust-halo",
    name: "Stardust Halo",
    category: "nebula",
    mood: "vivid",
    desc: "Magenta halo glowing through a field of distant stars",
    dark: true,
    text: "#ffe4f5",
    base: "#0a0612",
    layers: [
      {
        background:
          "linear-gradient(180deg, #0a0612 0%, rgba(76,29,90,0.5) 50%, rgba(157,23,138,0.5) 100%)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(ellipse at 50% 110%, rgba(232,121,249,0.55) 0%, rgba(157,23,138,0.15) 60%, transparent 80%)",
        blendMode: "screen",
        blur: 120,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(circle at 80% 20%, rgba(244,114,182,0.2) 0%, transparent 40%)",
        blendMode: "screen",
        blur: 100,
        opacity: 1,
      },
      {
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 1px, transparent 3px),
          radial-gradient(circle at 70% 12%, rgba(250,232,255,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 88% 55%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 12% 60%, rgba(233,213,255,1) 1.5px, transparent 4px),
          radial-gradient(circle at 40% 8%, rgba(255,255,255,0.6) 1px, transparent 3px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "galactic-bloom",
    name: "Galactic Bloom",
    category: "nebula",
    mood: "vivid",
    desc: "Teal and magenta nebula clouds drifting through stellar dust",
    dark: true,
    text: "#d4fff2",
    base: "#050810",
    layers: [
      { background: "radial-gradient(ellipse 50% 45% at 30% 40%, rgba(20,184,166,0.7) 0%, transparent 65%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(ellipse 45% 50% at 68% 55%, rgba(232,121,249,0.6) 0%, transparent 60%)", blendMode: "screen", blur: 65 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 20%, rgba(99,102,241,0.4) 0%, transparent 55%)", blendMode: "screen", blur: 50 },
      {
        background: `
          radial-gradient(circle at 14% 22%, rgba(255,255,255,0.8) 1px, transparent 3px),
          radial-gradient(circle at 76% 30%, rgba(209,250,229,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 85% 75%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 25% 78%, rgba(250,232,255,1) 1.5px, transparent 4px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "orion-drift",
    name: "Orion Drift",
    category: "nebula",
    mood: "cool",
    desc: "Cold blue-white glow beneath a dense star field",
    dark: true,
    text: "#dbeeff",
    base: "#04070f",
    layers: [
      { background: "radial-gradient(ellipse 55% 50% at 40% 45%, rgba(56,189,248,0.6) 0%, transparent 65%)", blendMode: "screen", blur: 65 },
      { background: "radial-gradient(ellipse 40% 45% at 65% 60%, rgba(255,255,255,0.35) 0%, transparent 60%)", blendMode: "soft-light", blur: 55 },
      {
        background: `
          radial-gradient(circle at 8% 12%, rgba(255,255,255,0.9) 1px, transparent 3px),
          radial-gradient(circle at 30% 8%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 60% 15%, rgba(199,210,254,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 85% 22%, rgba(255,255,255,0.7) 1px, transparent 3px),
          radial-gradient(circle at 92% 60%, rgba(255,255,255,0.8) 1.5px, transparent 4px),
          radial-gradient(circle at 45% 75%, rgba(199,210,254,1) 1.5px, transparent 4px),
          radial-gradient(circle at 15% 68%, rgba(255,255,255,0.6) 1px, transparent 3px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "nebula-golden-dawn",
    name: "Golden Dawn",
    category: "nebula",
    mood: "warm",
    desc: "Solar flares condensing into molten gold spheres",
    dark: true,
    text: "#fff3cd",
    base: "#0f0800",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 30% 40%, rgba(251,191,36,0.85) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(234,179,8,0.7) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(217,119,6,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 20% 25% at 80% 70%, rgba(180,83,9,0.35) 0%, transparent 60%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-arctic-ice",
    name: "Arctic Ice",
    category: "nebula",
    mood: "cool",
    desc: "Frozen nitrogen crystals orbiting a distant white dwarf",
    dark: true,
    text: "#cffafe",
    base: "#020a0f",
    layers: [
      { background: "radial-gradient(ellipse 40% 45% at 25% 35%, rgba(34,211,238,0.8) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 65% 55%, rgba(6,182,212,0.6) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 25% 30% at 75% 25%, rgba(165,243,252,0.4) 0%, transparent 55%)", blendMode: "screen", blur: 40 },
      { background: "radial-gradient(ellipse 20% 22% at 45% 80%, rgba(103,232,249,0.3) 0%, transparent 50%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-witch-brew",
    name: "Witch's Brew",
    category: "nebula",
    mood: "vivid",
    desc: "Toxic green bubbles rising from a cauldron of stars",
    dark: true,
    text: "#bef264",
    base: "#050a00",
    layers: [
      { background: "radial-gradient(ellipse 42% 48% at 35% 40%, rgba(132,204,22,0.85) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 38% 42% at 70% 50%, rgba(101,163,13,0.7) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 28% 32% at 55% 75%, rgba(163,230,53,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 18% 20% at 20% 25%, rgba(190,242,100,0.35) 0%, transparent 50%)", blendMode: "screen", blur: 30 },
    ],
  },

  {
    id: "nebula-blood-moon",
    name: "Blood Moon",
    category: "nebula",
    mood: "dark",
    desc: "Crimson lunar eclipses casting long shadows through dust",
    dark: true,
    text: "#fecaca",
    base: "#0a0000",
    layers: [
      { background: "radial-gradient(ellipse 48% 52% at 40% 45%, rgba(220,38,38,0.9) 0%, transparent 60%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(153,27,27,0.7) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 30% 35% at 25% 70%, rgba(239,68,68,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 22% 25% at 60% 80%, rgba(185,28,28,0.4) 0%, transparent 60%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-cobalt-dream",
    name: "Cobalt Dream",
    category: "nebula",
    mood: "cool",
    desc: "Deep blue orbs suspended in midnight ink",
    dark: true,
    text: "#bfdbfe",
    base: "#020617",
    layers: [
      { background: "radial-gradient(ellipse 42% 48% at 30% 40%, rgba(37,99,235,0.85) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 38% 42% at 70% 50%, rgba(29,78,216,0.7) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 28% 32% at 55% 75%, rgba(59,130,246,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 18% 20% at 20% 25%, rgba(96,165,250,0.3) 0%, transparent 50%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-sunset-orchid",
    name: "Sunset Orchid",
    category: "nebula",
    mood: "vivid",
    desc: "Purple and tangerine orbs colliding at the horizon",
    dark: true,
    text: "#fce7f3",
    base: "#0a0210",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 35% 40%, rgba(168,85,247,0.85) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(251,146,60,0.7) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(192,132,252,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 20% 25% at 80% 70%, rgba(234,179,8,0.35) 0%, transparent 60%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-smoke-signal",
    name: "Smoke Signal",
    category: "nebula",
    mood: "dark",
    desc: "Gray smoke rings drifting from an extinguished star",
    dark: true,
    text: "#e5e7eb",
    base: "#0a0a0a",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 35% 40%, rgba(75,85,99,0.6) 0%, transparent 65%)", blendMode: "screen", blur: 40 },
      { background: "radial-gradient(ellipse 38% 42% at 70% 50%, rgba(55,65,81,0.5) 0%, transparent 60%)", blendMode: "screen", blur: 30 },
      { background: "radial-gradient(ellipse 28% 32% at 55% 75%, rgba(107,114,128,0.35) 0%, transparent 55%)", blendMode: "screen", blur: 25 },
      { background: "radial-gradient(ellipse 20% 22% at 20% 25%, rgba(156,163,175,0.25) 0%, transparent 50%)", blendMode: "screen", blur: 15 },
    ],
  },

  {
    id: "nebula-coral-reef",
    name: "Coral Reef",
    category: "nebula",
    mood: "vivid",
    desc: "Living coral polyps glowing in abyssal currents",
    dark: true,
    text: "#fed7aa",
    base: "#0a0400",
    layers: [
      { background: "radial-gradient(ellipse 42% 48% at 30% 40%, rgba(249,115,22,0.8) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 36% 40% at 70% 50%, rgba(244,63,94,0.65) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 28% 32% at 50% 75%, rgba(251,146,60,0.45) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 18% 20% at 80% 30%, rgba(255,107,107,0.3) 0%, transparent 50%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-thunder-storm",
    name: "Thunder Storm",
    category: "nebula",
    mood: "dark",
    desc: "Electric violet thunderheads rolling through void",
    dark: true,
    text: "#ddd6fe",
    base: "#050510",
    layers: [
      { background: "radial-gradient(ellipse 48% 52% at 40% 45%, rgba(91,33,182,0.85) 0%, transparent 60%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(76,29,149,0.7) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 30% 35% at 25% 70%, rgba(124,58,237,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 22% 25% at 60% 80%, rgba(139,92,246,0.35) 0%, transparent 60%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-midnight-rose",
    name: "Midnight Rose",
    category: "nebula",
    mood: "dark",
    desc: "Deep burgundy petals unfurling in eternal darkness",
    dark: true,
    text: "#fbcfe8",
    base: "#0a0005",
    layers: [
      { background: "radial-gradient(ellipse 42% 48% at 35% 40%, rgba(159,18,57,0.85) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 38% 42% at 70% 50%, rgba(190,18,60,0.7) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 28% 32% at 55% 75%, rgba(219,39,119,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 18% 20% at 20% 25%, rgba(244,114,182,0.3) 0%, transparent 50%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-neon-sludge",
    name: "Neon Sludge",
    category: "nebula",
    mood: "vivid",
    desc: "Toxic waste orbs glowing with unnatural intensity",
    dark: true,
    text: "#86efac",
    base: "#001a00",
    layers: [
      { background: "radial-gradient(ellipse 42% 48% at 30% 40%, rgba(34,197,94,0.9) 0%, transparent 65%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(ellipse 36% 40% at 70% 50%, rgba(22,163,74,0.75) 0%, transparent 60%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 28% 32% at 50% 75%, rgba(74,222,128,0.55) 0%, transparent 55%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 18% 20% at 80% 30%, rgba(134,239,172,0.35) 0%, transparent 50%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-supernova",
    name: "Supernova",
    category: "nebula",
    mood: "warm",
    desc: "Explosive amber and crimson orbs",
    dark: false,
    cardText: "#000000",
    text: "#ffecd2",
    base: "#0a0502",
    layers: [
      { background: "radial-gradient(ellipse 45% 55% at 40% 45%, rgba(245,158,11,0.9) 0%, transparent 65%)", blendMode: "screen", blur: 60 },
      { background: "radial-gradient(ellipse 30% 40% at 70% 35%, rgba(239,68,68,0.7) 0%, transparent 70%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 35% 35% at 25% 70%, rgba(251,146,60,0.6) 0%, transparent 65%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 20% 20% at 60% 75%, rgba(220,38,38,0.4) 0%, transparent 70%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "nebula-mint-cloud",
    name: "Mint Cloud",
    category: "nebula",
    mood: "cool",
    desc: "Ethereal teal and emerald floating spheres",
    dark: false,
    cardText: "#000000",
    text: "#064e3b",
    base: "#ecfdf5",
    layers: [
      { background: "radial-gradient(ellipse 40% 45% at 30% 40%, rgba(52,211,153,0.7) 0%, transparent 65%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(ellipse 35% 40% at 65% 55%, rgba(20,184,166,0.5) 0%, transparent 60%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 25% 30% at 75% 25%, rgba(110,231,183,0.4) 0%, transparent 55%)", blendMode: "normal", blur: 50 },
    ],
  },

  {
    id: "nebula-rose-quartz",
    name: "Rose Quartz",
    category: "nebula",
    mood: "warm",
    desc: "Delicate pink and blush floating orbs",
    dark: false,
    cardText: "#000000",
    text: "#831843",
    base: "#fff1f2",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 35% 45%, rgba(251,113,133,0.6) 0%, transparent 60%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 30% 35% at 70% 35%, rgba(244,114,182,0.5) 0%, transparent 55%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 55% 75%, rgba(253,164,175,0.4) 0%, transparent 50%)", blendMode: "normal", blur: 60 },
    ],
  },

  {
    id: "nebula-peach-velvet",
    name: "Peach Velvet",
    category: "nebula",
    mood: "warm",
    desc: "Soft peach fuzz orbs floating in cream",
    dark: false,
    cardText: "#000000",
    text: "#9a3412",
    base: "#fff7ed",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 30% 40%, rgba(251,146,60,0.6) 0%, transparent 60%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(253,186,116,0.5) 0%, transparent 55%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(249,115,22,0.35) 0%, transparent 50%)", blendMode: "normal", blur: 50 },
      { background: "radial-gradient(ellipse 20% 22% at 80% 65%, rgba(255,237,213,0.5) 0%, transparent 45%)", blendMode: "normal", blur: 40 },
    ],
  },

  {
    id: "nebula-lavender-fields",
    name: "Lavender Fields",
    category: "nebula",
    mood: "cool",
    desc: "Soft violet spheres blooming in twilight",
    dark: false,
    cardText: "#000000",
    text: "#581c87",
    base: "#faf5ff",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 30% 40%, rgba(192,132,252,0.55) 0%, transparent 60%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(168,85,247,0.45) 0%, transparent 55%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(216,180,254,0.35) 0%, transparent 50%)", blendMode: "normal", blur: 50 },
      { background: "radial-gradient(ellipse 20% 22% at 80% 65%, rgba(233,213,255,0.4) 0%, transparent 45%)", blendMode: "normal", blur: 40 },
    ],
  },

  {
    id: "nebula-sand-dunes",
    name: "Sand Dunes",
    category: "nebula",
    mood: "warm",
    desc: "Desert mirages of heated air bending starlight",
    dark: false,
    cardText: "#000000",
    text: "#713f12",
    base: "#fefce8",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 30% 40%, rgba(234,179,8,0.5) 0%, transparent 60%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 35% 40% at 70% 35%, rgba(202,138,4,0.4) 0%, transparent 55%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(217,119,6,0.3) 0%, transparent 50%)", blendMode: "normal", blur: 50 },
      { background: "radial-gradient(ellipse 20% 22% at 80% 65%, rgba(251,191,36,0.25) 0%, transparent 45%)", blendMode: "normal", blur: 40 },
    ],
  },

  {
    id: "nebula-champagne-bubbles",
    name: "Champagne Bubbles",
    category: "nebula",
    mood: "warm",
    desc: "Effervescent gold spheres rising through crystal",
    dark: false,
    cardText: "#000000",
    text: "#78350f",
    base: "#fffbeb",
    layers: [
      { background: "radial-gradient(ellipse 40% 45% at 30% 40%, rgba(251,191,36,0.5) 0%, transparent 60%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 35% 38% at 65% 55%, rgba(253,224,71,0.4) 0%, transparent 55%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(ellipse 25% 28% at 75% 25%, rgba(234,179,8,0.35) 0%, transparent 50%)", blendMode: "normal", blur: 50 },
      { background: "radial-gradient(ellipse 20% 22% at 45% 80%, rgba(254,240,138,0.4) 0%, transparent 45%)", blendMode: "normal", blur: 40 },
    ],
  },

  {
    id: "prism-glasswave",
    name: "Glasswave",
    category: "prism",
    mood: "cool",
    desc: "Thin spectral waves refracting through translucent glass",
    dark: true,
    text: "#d8f8ff",
    base: "#05080b",
    layers: [
      {
        background:
          "linear-gradient(118deg, transparent 18%, rgba(34,211,238,0.18) 30%, rgba(129,140,248,0.24) 39%, rgba(236,72,153,0.20) 47%, rgba(251,191,36,0.16) 56%, rgba(34,197,94,0.18) 66%, transparent 80%)",
        blendMode: "screen",
        blur: 38,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(62deg, transparent 30%, rgba(255,255,255,0.10) 42%, rgba(103,232,249,0.14) 50%, transparent 64%)",
        blendMode: "overlay",
        blur: 18,
        opacity: 0.8,
      },
      {
        background:
          "radial-gradient(ellipse 65% 18% at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 75%)",
        blendMode: "screen",
        blur: 35,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "prism-spectral-edge",
    name: "Spectral Edge",
    category: "prism",
    mood: "vivid",
    desc: "A concentrated rainbow refraction emerging from one edge",
    dark: true,
    text: "#f0f9ff",
    base: "#050609",
    layers: [
      {
        background:
          "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.04) 32%, rgba(6,182,212,0.18) 45%, rgba(34,197,94,0.22) 51%, rgba(250,204,21,0.20) 57%, rgba(244,63,94,0.18) 64%, transparent 82%)",
        blendMode: "screen",
        blur: 30,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(102deg, transparent 38%, rgba(255,255,255,0.22) 46%, rgba(125,211,252,0.14) 51%, transparent 60%)",
        blendMode: "screen",
        blur: 16,
        opacity: 0.85,
      },
      {
        background:
          "radial-gradient(ellipse 25% 65% at 92% 50%, rgba(139,92,246,0.16) 0%, transparent 78%)",
        blendMode: "screen",
        blur: 35,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "prism-refract",
    name: "Refract",
    category: "prism",
    mood: "vivid",
    desc: "Diagonal spectral refraction split across a dark surface",
    dark: true,
    text: "#e0f2fe",
    base: "#050608",
    layers: [
      {
        background:
          "linear-gradient(135deg, transparent 25%, #22d3ee 34%, #3b82f6 40%, #8b5cf6 46%, #ec4899 52%, #f59e0b 58%, #22c55e 64%, transparent 74%)",
        blendMode: "screen",
        blur: 42,
        opacity: 0.68,
      },
      {
        background:
          "linear-gradient(135deg, transparent 34%, rgba(255,255,255,0.26) 47%, rgba(255,255,255,0.05) 53%, transparent 67%)",
        blendMode: "screen",
        blur: 14,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
        blendMode: "overlay",
        blur: 55,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "prism-polaris",
    name: "Polaris",
    category: "prism",
    mood: "cool",
    desc: "Cold cyan and violet spectrum orbiting a dark center",
    dark: true,
    text: "#dffaff",
    base: "#04070b",
    layers: [
      {
        background:
          "conic-gradient(from 160deg at 50% 50%, #06b6d4, #2563eb, #7c3aed, #a855f7, #22d3ee, #06b6d4)",
        blendMode: "screen",
        blur: 62,
        opacity: 0.68,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(207,250,254,0.18) 0%, rgba(103,232,249,0.08) 22%, transparent 54%)",
        blendMode: "screen",
        blur: 25,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 38%, transparent 62%)",
        blendMode: "multiply",
        blur: 18,
        opacity: 0.9,
      },
    ],
  },

  {
    id: "prism-splitlight",
    name: "Splitlight",
    category: "prism",
    mood: "vivid",
    desc: "A clean beam splitting into spectral colors",
    dark: true,
    text: "#f8fbff",
    base: "#040507",
    layers: [
      {
        background:
          "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 35%, rgba(34,211,238,0.20) 42%, rgba(59,130,246,0.22) 47%, rgba(139,92,246,0.22) 52%, rgba(236,72,153,0.20) 57%, rgba(245,158,11,0.16) 63%, transparent 78%)",
        blendMode: "screen",
        blur: 32,
        opacity: 1,
      },
      {
        background:
          "linear-gradient(102deg, transparent 38%, rgba(255,255,255,0.30) 48%, rgba(255,255,255,0.08) 52%, transparent 64%)",
        blendMode: "screen",
        blur: 12,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 30% 55% at 28% 50%, rgba(59,130,246,0.12) 0%, transparent 80%)",
        blendMode: "screen",
        blur: 45,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "prism-neon-ring",
    name: "Neon Ring",
    category: "prism",
    mood: "vivid",
    desc: "Thin spectral ring glowing around a deep central void",
    dark: true,
    text: "#f0f9ff",
    base: "#050509",
    layers: [
      {
        background:
          "radial-gradient(circle at 50% 50%, transparent 34%, rgba(34,211,238,0.22) 38%, rgba(59,130,246,0.22) 42%, rgba(139,92,246,0.20) 46%, rgba(236,72,153,0.18) 50%, rgba(245,158,11,0.14) 54%, transparent 61%)",
        blendMode: "screen",
        blur: 28,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, transparent 42%, rgba(255,255,255,0.16) 46%, transparent 51%)",
        blendMode: "screen",
        blur: 12,
        opacity: 0.85,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, #030306 0%, #030306 34%, transparent 35%)",
        blendMode: "multiply",
        blur: 8,
        opacity: 1,
      },
    ],
  },

  {
    id: "prism-aether",
    name: "Aether",
    category: "prism",
    mood: "cool",
    desc: "Weightless cyan-violet iridescence floating through darkness",
    dark: true,
    text: "#e4f7ff",
    base: "#05070a",
    layers: [
      {
        background:
          "radial-gradient(ellipse 48% 38% at 34% 48%, rgba(34,211,238,0.24) 0%, rgba(59,130,246,0.14) 45%, transparent 78%)",
        blendMode: "screen",
        blur: 55,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(ellipse 42% 40% at 70% 45%, rgba(167,139,250,0.22) 0%, rgba(217,70,239,0.10) 46%, transparent 80%)",
        blendMode: "screen",
        blur: 58,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(145deg, transparent 30%, rgba(255,255,255,0.08) 48%, rgba(103,232,249,0.10) 55%, transparent 72%)",
        blendMode: "soft-light",
        blur: 35,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "prism-diamond",
    name: "Diamond",
    category: "prism",
    mood: "vivid",
    desc: "Sharp spectral light refracted through an invisible crystal",
    dark: true,
    text: "#f8fafc",
    base: "#06070a",
    layers: [
      {
        background:
          "linear-gradient(45deg, transparent 24%, rgba(34,211,238,0.20) 35%, rgba(255,255,255,0.22) 40%, rgba(129,140,248,0.24) 46%, rgba(236,72,153,0.18) 52%, rgba(245,158,11,0.14) 59%, transparent 72%)",
        blendMode: "screen",
        blur: 26,
        opacity: 0.9,
      },
      {
        background:
          "linear-gradient(135deg, transparent 34%, rgba(255,255,255,0.20) 46%, rgba(103,232,249,0.14) 52%, transparent 65%)",
        blendMode: "screen",
        blur: 14,
        opacity: 1,
      },
      {
        background:
          "conic-gradient(from 45deg at 50% 50%, transparent, rgba(99,102,241,0.08), transparent, rgba(34,211,238,0.08), transparent)",
        blendMode: "overlay",
        blur: 35,
        opacity: 0.8,
      },
    ],
  },

  {
    id: "prism-aurora-glass",
    name: "Aurora Glass",
    category: "prism",
    mood: "cool",
    desc: "Boreal cyan, emerald and violet refracted through translucent glass",
    dark: true,
    text: "#e2fff8",
    base: "#040708",
    layers: [
      {
        background:
          "conic-gradient(from 210deg at 50% 50%, #10b981, #06b6d4, #67e8f9, #8b5cf6, #22c55e, #10b981)",
        blendMode: "screen",
        blur: 58,
        opacity: 0.55,
      },
      {
        background:
          "linear-gradient(142deg, transparent 28%, rgba(255,255,255,0.10) 42%, rgba(103,232,249,0.16) 50%, rgba(52,211,153,0.12) 58%, transparent 74%)",
        blendMode: "screen",
        blur: 24,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(220,255,250,0.12) 0%, transparent 48%)",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },
    ],
  },

  {
    id: "prism-dark-spectrum",
    name: "Dark Spectrum",
    category: "prism",
    mood: "vivid",
    desc: "Neon prismatic halo on dark void",
    dark: true,
    text: "#e8d5ff",
    base: "#09090b",
    layers: [
      { background: "conic-gradient(from 220deg at 50% 55%, #6366f1, #06b6d4, #10b981, #f59e0b, #ef4444, #ec4899, #8b5cf6, #6366f1)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.6) 0%, transparent 50%)", blendMode: "multiply", blur: 20 },
    ],
  },

  {
    id: "prism-steel-spectrum",
    name: "Steel Spectrum",
    category: "prism",
    mood: "cool",
    desc: "Muted steel-blue conic burst, quiet and industrial",
    dark: true,
    text: "#c3ccd6",
    base: "#0b0c0e",
    layers: [
      { background: "conic-gradient(from 200deg at 50% 55%, #334155, #64748b, #94a3b8, #475569, #1e293b, #334155)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 50%)", blendMode: "multiply", blur: 20 },
    ],
  },

  {
    id: "prism-borealis-shard",
    name: "Borealis Shard",
    category: "prism",
    mood: "vivid",
    desc: "Conic fragment with aurora tones crossing deep space",
    dark: true,
    text: "#d5f5ff",
    base: "#07080f",
    layers: [
      { background: "conic-gradient(from 210deg at 50% 55%, #14b8a6, #6366f1, #ec4899, #22d3ee, #14b8a6)", blendMode: "screen", blur: 65 },
      { background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 50%)", blendMode: "multiply", blur: 20 },
    ],
  },

  {
    id: "prism-iris-halo",
    name: "Iris Halo",
    category: "prism",
    mood: "vivid",
    desc: "Soft iridescent ring with a luminous spectral center",
    dark: true,
    text: "#f5eaff",
    base: "#07070b",
    layers: [
      {
        background:
          "conic-gradient(from 45deg at 50% 50%, #06b6d4, #6366f1, #d946ef, #f43f5e, #f59e0b, #22c55e, #06b6d4)",
        blendMode: "screen",
        blur: 55,
        opacity: 0.72,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 28%, transparent 58%)",
        blendMode: "screen",
        blur: 25,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, #050507 25%, transparent 27%, transparent 100%)",
        blendMode: "multiply",
        blur: 12,
        opacity: 0.9,
      },
    ],
  },

  {
    id: "prism-rainbow-flare",
    name: "Rainbow Flare",
    category: "prism",
    mood: "vivid",
    desc: "Full spectrum conic burst",
    dark: false,
    cardText: "#ffffff",
    text: "#3b1f6e",
    base: "#fafafa",
    layers: [
      { background: "conic-gradient(from 180deg at 50% 60%, #f43f5e, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #f43f5e)", blendMode: "soft-light", blur: 80 },
      { background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)", blendMode: "overlay", blur: 40 },
    ],
  },

  {
    id: "prism-crystal-edge",
    name: "Crystal Edge",
    category: "prism",
    mood: "cool",
    desc: "Angular prism refraction with blue-violet",
    dark: false,
    cardText: "#ffffff",
    text: "#1e1b4b",
    base: "#f5f3ff",
    layers: [
      { background: "conic-gradient(from 135deg at 30% 40%, #818cf8, #c084fc, #f0abfc, #93c5fd, #818cf8)", blendMode: "soft-light", blur: 60 },
      { background: "conic-gradient(from 315deg at 70% 60%, #a78bfa, #67e8f9, #86efac, #a78bfa)", blendMode: "soft-light", blur: 70 },
    ],
  },

  {
    id: "prism-solar-flare",
    name: "Solar Flare",
    category: "prism",
    mood: "warm",
    desc: "Warm conic burst from golden core",
    dark: false,
    cardText: "#ffffff",
    text: "#fef3c7",
    base: "#0c0502",
    layers: [
      { background: "conic-gradient(from 90deg at 50% 65%, #f59e0b, #ef4444, #f97316, #fbbf24, #f59e0b)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 60%, rgba(251,191,36,0.4) 0%, transparent 45%)", blendMode: "screen", blur: 50 },
    ],
  },

  {
    id: "grain-midnight-film",
    name: "Midnight Film",
    category: "grain",
    mood: "cool",
    desc: "Deep indigo with analog film grain",
    dark: true,
    text: "#c7d2fe",
    base: "#0f0a1e",
    grain: true,
    layers: [
      { background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #6366f1 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 60% 40%, rgba(129,140,248,0.3) 0%, transparent 50%)", blendMode: "screen", blur: 40 },
    ],
  },

  {
    id: "grain-warm-velvet",
    name: "Warm Velvet",
    category: "grain",
    mood: "warm",
    desc: "Rich burgundy with soft texture",
    dark: true,
    text: "#fecdd3",
    base: "#1a0505",
    grain: true,
    layers: [
      { background: "linear-gradient(145deg, #450a0a 0%, #7f1d1d 35%, #991b1b 60%, #b91c1c 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 40% 50%, rgba(252,165,165,0.2) 0%, transparent 50%)", blendMode: "screen", blur: 50 },
    ],
  },

  {
    id: "grain-forest-mist",
    name: "Forest Mist",
    category: "grain",
    mood: "cool",
    desc: "Emerald depth with organic noise",
    dark: true,
    text: "#d1fae5",
    base: "#022c22",
    grain: true,
    layers: [
      { background: "linear-gradient(140deg, #022c22 0%, #064e3b 35%, #065f46 60%, #047857 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 55% 45%, rgba(52,211,153,0.25) 0%, transparent 50%)", blendMode: "screen", blur: 45 },
    ],
  },

  {
    id: "grain-cosmic-ash",
    name: "Cosmic Ash",
    category: "grain",
    mood: "cool",
    desc: "Charcoal and indigo grain over a subtle violet undertone",
    dark: true,
    text: "#d6d0f0",
    base: "#0d0b16",
    grain: true,
    layers: [
      { background: "linear-gradient(140deg, #0d0b16 0%, #1e1b32 40%, #312e4d 70%, #433f68 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 55% 40%, rgba(129,140,248,0.25) 0%, transparent 50%)", blendMode: "screen", blur: 45 },
    ],
  },

  {
    id: "grain-obsidian",
    name: "Obsidian",
    category: "grain",
    mood: "cool",
    desc: "Black volcanic depth with subtle graphite texture",
    dark: true,
    text: "#d4d4d8",
    base: "#050505",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(135deg, #030303 0%, #111111 42%, #1c1c1c 72%, #090909 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 68% 38%, rgba(161,161,170,0.16) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 5,
      },
    ],
  },

  {
    id: "grain-ocean-depth",
    name: "Ocean Depth",
    category: "grain",
    mood: "cool",
    desc: "Deep marine blue with soft underwater illumination",
    dark: true,
    text: "#c7f9ff",
    base: "#020b12",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #020b12 0%, #073047 38%, #075985 68%, #0e7490 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 55% 40% at 58% 38%, rgba(34,211,238,0.24) 0%, rgba(14,116,144,0.10) 48%, transparent 75%)",
        blendMode: "screen",
        blur: 50,
      },
    ],
  },

  {
    id: "grain-moss",
    name: "Moss",
    category: "grain",
    mood: "cool",
    desc: "Muted moss green with earthy photographic texture",
    dark: true,
    text: "#d9f2c7",
    base: "#11150d",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(150deg, #11150d 0%, #283618 40%, #3f6212 68%, #4d7c0f 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 48% 42% at 42% 46%, rgba(163,230,53,0.18) 0%, rgba(101,163,13,0.08) 48%, transparent 75%)",
        blendMode: "screen",
        blur: 48,
      },
    ],
  },

  {
    id: "grain-smoked-lilac",
    name: "Smoked Lilac",
    category: "grain",
    mood: "cool",
    desc: "Dusty violet softened by a smoky analog texture",
    dark: true,
    text: "#e9d5ff",
    base: "#100c16",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(140deg, #100c16 0%, #24162e 38%, #4c1d62 68%, #6b3578 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 62% 40%, rgba(216,180,254,0.20) 0%, rgba(168,85,247,0.08) 48%, transparent 75%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "grain-olive-film",
    name: "Olive Film",
    category: "grain",
    mood: "warm",
    desc: "Muted olive tones inspired by vintage photography",
    dark: true,
    text: "#e7e5b5",
    base: "#15160b",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #15160b 0%, #3f4220 40%, #686b2a 70%, #85852f 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 55% 45% at 48% 42%, rgba(217,219,121,0.16) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 48,
      },
    ],
  },

  {
    id: "grain-carbon-blue",
    name: "Carbon Blue",
    category: "grain",
    mood: "cool",
    desc: "Charcoal black transitioning into restrained cobalt blue",
    dark: true,
    text: "#bfdbfe",
    base: "#05070c",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(138deg, #05070c 0%, #0f172a 40%, #172554 70%, #1e3a8a 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 45% 50% at 72% 40%, rgba(96,165,250,0.20) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 42,
      },
    ],
  },

  {
    id: "grain-rainforest",
    name: "Rainforest",
    category: "grain",
    mood: "cool",
    desc: "Dense tropical green with humid atmospheric texture",
    dark: true,
    text: "#ccfbf1",
    base: "#02100c",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(142deg, #02100c 0%, #064e3b 35%, #047857 62%, #059669 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 55% at 65% 38%, rgba(45,212,191,0.20) 0%, rgba(16,185,129,0.08) 50%, transparent 78%)",
        blendMode: "screen",
        blur: 48,
      },
    ],
  },

  {
    id: "grain-burnt-paper",
    name: "Burnt Paper",
    category: "grain",
    mood: "warm",
    desc: "Aged parchment fading into warm charcoal",
    dark: true,
    text: "#fed7aa",
    base: "#17100b",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(140deg, #29150b 0%, #78350f 38%, #a16207 66%, #d97706 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 45% 40%, rgba(254,215,170,0.16) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "grain-indigo-haze",
    name: "Indigo Haze",
    category: "grain",
    mood: "cool",
    desc: "Soft midnight indigo with a hazy luminous center",
    dark: true,
    text: "#c7d2fe",
    base: "#080914",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #080914 0%, #171853 38%, #312e81 68%, #4338ca 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 55% 45% at 52% 45%, rgba(165,180,252,0.20) 0%, rgba(99,102,241,0.08) 50%, transparent 76%)",
        blendMode: "screen",
        blur: 50,
      },
    ],
  },

  {
    id: "grain-smoke",
    name: "Smoke",
    category: "grain",
    mood: "cool",
    desc: "Neutral graphite gradient with dense atmospheric grain",
    dark: true,
    text: "#e4e4e7",
    base: "#080808",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #050505 0%, #18181b 42%, #27272a 68%, #3f3f46 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 58% 50% at 48% 44%, rgba(228,228,231,0.12) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 52,
      },
    ],
  },

  {
    id: "grain-copper-patina",
    name: "Copper Patina",
    category: "grain",
    mood: "warm",
    desc: "Aged copper transitioning into muted turquoise patina",
    dark: true,
    text: "#d5f5ef",
    base: "#0c100e",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(135deg, #431407 0%, #9a3412 32%, #0f766e 68%, #115e59 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 68% 42%, rgba(94,234,212,0.20) 0%, rgba(20,184,166,0.08) 50%, transparent 76%)",
        blendMode: "screen",
        blur: 48,
      },
    ],
  },

  {
    id: "grain-lunar-surface",
    name: "Lunar Surface",
    category: "grain",
    mood: "cool",
    desc: "Cold lunar gray with subtle mineral depth",
    dark: true,
    text: "#e5e7eb",
    base: "#0c0d0f",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(150deg, #090a0c 0%, #27272a 40%, #52525b 68%, #71717a 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 45% 50% at 60% 38%, rgba(212,212,216,0.18) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "grain-desert-sand",
    name: "Desert Sand",
    category: "grain",
    mood: "warm",
    desc: "Warm beige with gritty film texture",
    dark: false,
    cardText: "#000000",
    text: "#78350f",
    base: "#fefce8",
    grain: true,
    layers: [
      { background: "linear-gradient(155deg, #fef9c3 0%, #fde68a 40%, #fcd34d 70%, #fbbf24 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 50% 40%, rgba(245,158,11,0.2) 0%, transparent 55%)", blendMode: "soft-light", blur: 30 },
    ],
  },

  {
    id: "grain-concrete",
    name: "Concrete Grain",
    category: "grain",
    mood: "cool",
    desc: "Cool concrete gray with fine analog texture",
    dark: false,
    cardText: "#000000",
    text: "#3f3f46",
    base: "#f4f4f5",
    grain: true,
    layers: [
      { background: "linear-gradient(150deg, #e4e4e7 0%, #d4d4d8 40%, #a1a1aa 70%, #71717a 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 50% 40%, rgba(113,113,122,0.2) 0%, transparent 55%)", blendMode: "soft-light", blur: 30 },
    ],
  },

  {
    id: "grain-arctic-paper",
    name: "Arctic Paper",
    category: "grain",
    mood: "cool",
    desc: "Cold white surface with a delicate icy texture",
    dark: false,
    cardText: "#000000",
    text: "#334155",
    base: "#f8fafc",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #f8fafc 0%, #e0f2fe 38%, #bae6fd 68%, #dbeafe 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 40% at 35% 42%, rgba(125,211,252,0.22) 0%, transparent 60%)",
        blendMode: "soft-light",
        blur: 35,
      },
    ],
  },

  {
    id: "grain-terracotta",
    name: "Terracotta",
    category: "grain",
    mood: "warm",
    desc: "Burnt clay with warm tactile grain",
    dark: false,
    cardText: "#000000",
    text: "#7c2d12",
    base: "#fff7ed",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #fed7aa 0%, #f97316 38%, #c2410c 68%, #9a3412 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 48% 42% at 40% 45%, rgba(255,237,213,0.22) 0%, transparent 60%)",
        blendMode: "soft-light",
        blur: 38,
      },
    ],
  },

  {
    id: "grain-champagne",
    name: "Champagne",
    category: "grain",
    mood: "warm",
    desc: "Soft champagne surface with understated luxury texture",
    dark: false,
    cardText: "#000000",
    text: "#713f12",
    base: "#fffbeb",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #fffbeb 0%, #fef3c7 38%, #fde68a 68%, #fcd34d 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 55% 40% at 55% 38%, rgba(255,255,255,0.42) 0%, transparent 65%)",
        blendMode: "soft-light",
        blur: 32,
      },
    ],
  },

  {
    id: "grain-dusty-rose",
    name: "Dusty Rose",
    category: "grain",
    mood: "warm",
    desc: "Muted rose gradient with soft vintage film character",
    dark: false,
    cardText: "#ffffff",
    text: "#881337",
    base: "#fff1f2",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #ffe4e6 0%, #fda4af 38%, #fb7185 68%, #e11d48 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 48% 45% at 40% 42%, rgba(255,255,255,0.25) 0%, transparent 62%)",
        blendMode: "soft-light",
        blur: 40,
      },
    ],
  },

  {
    id: "grain-frosted-slate",
    name: "Frosted Slate",
    category: "grain",
    mood: "cool",
    desc: "Desaturated blue-gray with soft frosted texture",
    dark: false,
    cardText: "#000000",
    text: "#334155",
    base: "#f1f5f9",
    grain: true,
    layers: [
      {
        background:
          "linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 38%, #94a3b8 68%, #64748b 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 42% at 58% 40%, rgba(226,232,240,0.30) 0%, transparent 62%)",
        blendMode: "soft-light",
        blur: 35,
      },
    ],
  },

  {
    id: "glass-arctic-frost",
    name: "Arctic Frost",
    category: "glass",
    mood: "cool",
    desc: "Frosted glass with blue-cyan refraction",
    dark: false,
    cardText: "#000000",
    text: "#164e63",
    base: "#ecfeff",
    layers: [
      { background: "linear-gradient(135deg, rgba(207,250,254,0.9) 0%, rgba(165,243,252,0.4) 50%, rgba(34,211,238,0.3) 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.5) 0%, transparent 40%)", blendMode: "overlay", blur: 50 },
      { background: "radial-gradient(circle at 70% 70%, rgba(14,165,233,0.4) 0%, transparent 35%)", blendMode: "overlay", blur: 60 },
      { background: "linear-gradient(45deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.4) 100%)", blendMode: "soft-light", blur: 20 },
    ],
  },

  {
    id: "glass-rose-window",
    name: "Rose Window",
    category: "glass",
    mood: "warm",
    desc: "Stained glass with rose and amber refractions",
    dark: false,
    cardText: "#000000",
    text: "#881337",
    base: "#fff1f2",
    layers: [
      { background: "linear-gradient(135deg, rgba(255,228,230,0.9) 0%, rgba(254,205,211,0.5) 50%, rgba(252,165,165,0.3) 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 35% 40%, rgba(244,63,94,0.4) 0%, transparent 35%)", blendMode: "overlay", blur: 55 },
      { background: "radial-gradient(circle at 65% 55%, rgba(251,146,60,0.35) 0%, transparent 30%)", blendMode: "overlay", blur: 50 },
      { background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%)", blendMode: "soft-light", blur: 15 },
    ],
  },

  {
    id: "glass-ice-sheet",
    name: "Ice Sheet",
    category: "glass",
    mood: "cool",
    desc: "Layered translucent ice with frozen cyan fractures",
    dark: false,
    cardText: "#000000",
    text: "#164e63",
    base: "#f0f9ff",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(224,242,254,0.95) 0%, rgba(186,230,253,0.62) 50%, rgba(125,211,252,0.38) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "linear-gradient(115deg, transparent 20%, rgba(6,182,212,0.18) 38%, transparent 42%, rgba(56,189,248,0.22) 62%, transparent 76%)",
        blendMode: "overlay",
        blur: 18,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 25% 35%, rgba(255,255,255,0.60) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 35,
      },
      {
        background:
          "linear-gradient(35deg, rgba(255,255,255,0.55), transparent 35%, rgba(255,255,255,0.25) 65%, transparent)",
        blendMode: "soft-light",
        blur: 15,
      },
    ],
  },

  {
    id: "glass-aqua-bubble",
    name: "Aqua Bubble",
    category: "glass",
    mood: "cool",
    desc: "Soft translucent bubbles suspended in an aquatic glass surface",
    dark: false,
    cardText: "#000000",
    text: "#155e75",
    base: "#ecfeff",
    layers: [
      {
        background:
          "radial-gradient(circle at 25% 40%, rgba(34,211,238,0.34) 0%, rgba(103,232,249,0.12) 32%, transparent 55%), radial-gradient(circle at 72% 58%, rgba(14,165,233,0.28) 0%, rgba(125,211,252,0.10) 34%, transparent 58%)",
        blendMode: "normal",
        blur: 25,
      },
      {
        background:
          "radial-gradient(circle at 25% 40%, rgba(255,255,255,0.65) 0%, transparent 12%)",
        blendMode: "screen",
        blur: 12,
      },
      {
        background:
          "radial-gradient(circle at 72% 58%, rgba(255,255,255,0.55) 0%, transparent 13%)",
        blendMode: "screen",
        blur: 14,
      },
      {
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, transparent 45%, rgba(6,182,212,0.12) 100%)",
        blendMode: "soft-light",
        blur: 20,
      },
    ],
  },

  {
    id: "glass-champagne",
    name: "Champagne Glass",
    category: "glass",
    mood: "warm",
    desc: "Soft golden translucent glass with luxurious highlights",
    dark: false,
    cardText: "#000000",
    text: "#713f12",
    base: "#fffbeb",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(255,251,235,0.95) 0%, rgba(254,243,199,0.62) 50%, rgba(253,230,138,0.34) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 32% 42%, rgba(251,191,36,0.26) 0%, transparent 68%)",
        blendMode: "overlay",
        blur: 50,
      },
      {
        background:
          "radial-gradient(ellipse 42% 50% at 72% 60%, rgba(245,158,11,0.20) 0%, transparent 70%)",
        blendMode: "overlay",
        blur: 55,
      },
      {
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.65), transparent 42%, rgba(255,255,255,0.30) 72%)",
        blendMode: "soft-light",
        blur: 18,
      },
    ],
  },

  {
    id: "glass-frosted-mint",
    name: "Frosted Mint",
    category: "glass",
    mood: "cool",
    desc: "Pale mint glass with a soft frozen atmospheric glow",
    dark: false,
    cardText: "#000000",
    text: "#065f46",
    base: "#f0fdf4",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(236,253,245,0.96) 0%, rgba(167,243,208,0.58) 50%, rgba(110,231,183,0.30) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 30% 40%, rgba(52,211,153,0.26) 0%, transparent 68%)",
        blendMode: "overlay",
        blur: 52,
      },
      {
        background:
          "radial-gradient(ellipse 45% 50% at 72% 60%, rgba(45,212,191,0.20) 0%, transparent 70%)",
        blendMode: "overlay",
        blur: 55,
      },
      {
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.62) 0%, transparent 45%, rgba(255,255,255,0.32) 100%)",
        blendMode: "soft-light",
        blur: 18,
      },
    ],
  },

  {
    id: "glass-obsidian",
    name: "Obsidian Glass",
    category: "glass",
    mood: "cool",
    desc: "Dark frosted glass with violet refractions",
    dark: true,
    text: "#ddd6fe",
    base: "#0c0a12",
    layers: [
      { background: "linear-gradient(135deg, rgba(15,10,25,0.95) 0%, rgba(30,20,50,0.8) 50%, rgba(50,30,80,0.6) 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 25% 35%, rgba(139,92,246,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(circle at 75% 65%, rgba(99,102,241,0.3) 0%, transparent 35%)", blendMode: "screen", blur: 60 },
      { background: "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)", blendMode: "overlay", blur: 10 },
    ],
  },

  {
    id: "glass-emerald-lens",
    name: "Emerald Lens",
    category: "glass",
    mood: "cool",
    desc: "Green frosted glass with teal light beams",
    dark: true,
    text: "#a7f3d0",
    base: "#022c22",
    layers: [
      { background: "linear-gradient(135deg, rgba(2,44,34,0.95) 0%, rgba(6,78,59,0.7) 50%, rgba(4,120,87,0.5) 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 40% 30%, rgba(16,185,129,0.5) 0%, transparent 40%)", blendMode: "screen", blur: 55 },
      { background: "radial-gradient(circle at 60% 70%, rgba(52,211,153,0.35) 0%, transparent 35%)", blendMode: "screen", blur: 50 },
      { background: "linear-gradient(45deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.02) 100%)", blendMode: "overlay", blur: 10 },
    ],
  },

  {
    id: "glass-smoked",
    name: "Smoked Glass",
    category: "glass",
    mood: "cool",
    desc: "Dark smoked glass with graphite refractions",
    dark: true,
    text: "#d4d4d8",
    base: "#0c0c0d",
    layers: [
      { background: "linear-gradient(135deg, rgba(15,15,17,0.95) 0%, rgba(39,39,42,0.8) 50%, rgba(63,63,70,0.55) 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 30% 35%, rgba(113,113,122,0.35) 0%, transparent 40%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(circle at 72% 65%, rgba(161,161,170,0.25) 0%, transparent 35%)", blendMode: "screen", blur: 60 },
      { background: "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)", blendMode: "overlay", blur: 10 },
    ],
  },

  {
    id: "glass-starlight",
    name: "Starlight Glass",
    category: "glass",
    mood: "cool",
    desc: "Dark frosted blue-violet glass with embedded starlight",
    dark: true,
    text: "#dcd6ff",
    base: "#0a0918",
    layers: [
      { background: "linear-gradient(135deg, rgba(10,9,24,0.95) 0%, rgba(30,27,75,0.75) 50%, rgba(49,46,129,0.5) 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(circle at 70% 70%, rgba(129,140,248,0.3) 0%, transparent 35%)", blendMode: "screen", blur: 60 },
      {
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 1px, transparent 3px),
          radial-gradient(circle at 78% 25%, rgba(255,255,255,0.5) 1px, transparent 3px),
          radial-gradient(circle at 55% 80%, rgba(255,255,255,0.5) 1px, transparent 3px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "glass-liquid-cyan",
    name: "Liquid Cyan",
    category: "glass",
    mood: "cool",
    desc: "Translucent cyan glass flowing like liquid crystal",
    dark: true,
    text: "#cffafe",
    base: "#02080b",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(8,47,73,0.82) 0%, rgba(14,116,144,0.48) 48%, rgba(34,211,238,0.30) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 55% 42% at 28% 42%, rgba(34,211,238,0.42) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 48,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 72% 58%, rgba(103,232,249,0.30) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 55,
      },
      {
        background:
          "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 48%, rgba(255,255,255,0.04) 58%, transparent 72%)",
        blendMode: "screen",
        blur: 18,
      },
    ],
  },

  {
    id: "glass-boreal",
    name: "Boreal Glass",
    category: "glass",
    mood: "cool",
    desc: "Frosted glass infused with emerald and cyan northern light",
    dark: true,
    text: "#dcfff6",
    base: "#020807",
    layers: [
      {
        background:
          "linear-gradient(145deg, rgba(2,44,34,0.92) 0%, rgba(6,78,59,0.62) 48%, rgba(8,145,178,0.34) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "linear-gradient(145deg, transparent 24%, rgba(52,211,153,0.24) 40%, rgba(103,232,249,0.28) 51%, rgba(16,185,129,0.16) 62%, transparent 78%)",
        blendMode: "screen",
        blur: 35,
      },
      {
        background:
          "radial-gradient(ellipse 65% 22% at 50% 52%, rgba(167,243,208,0.18) 0%, transparent 78%)",
        blendMode: "screen",
        blur: 35,
      },
      {
        background:
          "linear-gradient(45deg, rgba(255,255,255,0.10) 0%, transparent 42%, rgba(207,250,254,0.08) 65%, transparent 100%)",
        blendMode: "overlay",
        blur: 14,
      },
    ],
  },

  {
    id: "glass-prism-window",
    name: "Prism Window",
    category: "glass",
    mood: "vivid",
    desc: "Transparent glass scattering subtle rainbow refractions",
    dark: true,
    text: "#f5f3ff",
    base: "#06070b",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(51,65,85,0.55) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "linear-gradient(115deg, transparent 24%, rgba(34,211,238,0.18) 34%, rgba(59,130,246,0.18) 42%, rgba(139,92,246,0.20) 50%, rgba(236,72,153,0.15) 58%, rgba(245,158,11,0.12) 66%, transparent 78%)",
        blendMode: "screen",
        blur: 32,
      },
      {
        background:
          "linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.22) 49%, transparent 58%)",
        blendMode: "screen",
        blur: 12,
      },
      {
        background:
          "radial-gradient(circle at 68% 32%, rgba(255,255,255,0.12) 0%, transparent 35%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "glass-violet-smoke",
    name: "Violet Smoke",
    category: "glass",
    mood: "vivid",
    desc: "Dark translucent violet glass surrounded by soft atmospheric haze",
    dark: true,
    text: "#ede9fe",
    base: "#08050f",
    layers: [
      {
        background:
          "linear-gradient(140deg, rgba(15,10,25,0.94) 0%, rgba(49,27,84,0.68) 52%, rgba(91,33,182,0.32) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 52% 48% at 30% 40%, rgba(139,92,246,0.42) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 48,
      },
      {
        background:
          "radial-gradient(ellipse 42% 55% at 70% 62%, rgba(217,70,239,0.28) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 55,
      },
      {
        background:
          "linear-gradient(125deg, transparent 25%, rgba(255,255,255,0.08) 48%, transparent 68%)",
        blendMode: "overlay",
        blur: 16,
      },
    ],
  },

  {
    id: "glass-amber-crystal",
    name: "Amber Crystal",
    category: "glass",
    mood: "warm",
    desc: "Warm translucent crystal with golden internal reflections",
    dark: true,
    text: "#fef3c7",
    base: "#0b0602",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(69,26,3,0.92) 0%, rgba(146,64,14,0.62) 48%, rgba(245,158,11,0.32) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 30% 42%, rgba(251,191,36,0.38) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 50,
      },
      {
        background:
          "radial-gradient(ellipse 40% 55% at 70% 60%, rgba(249,115,22,0.30) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 52,
      },
      {
        background:
          "linear-gradient(115deg, transparent 28%, rgba(255,255,255,0.16) 48%, transparent 60%)",
        blendMode: "screen",
        blur: 16,
      },
    ],
  },

  {
    id: "glass-carbon",
    name: "Carbon Glass",
    category: "glass",
    mood: "cool",
    desc: "Nearly black glass with restrained graphite reflections",
    dark: true,
    text: "#e4e4e7",
    base: "#050506",
    layers: [
      {
        background:
          "linear-gradient(145deg, rgba(9,9,11,0.98) 0%, rgba(39,39,42,0.72) 48%, rgba(24,24,27,0.88) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.07) 43%, rgba(161,161,170,0.12) 50%, transparent 67%)",
        blendMode: "screen",
        blur: 22,
      },
      {
        background:
          "radial-gradient(ellipse 42% 35% at 70% 30%, rgba(212,212,216,0.14) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "glass-deep-sea",
    name: "Deep Sea Glass",
    category: "glass",
    mood: "cool",
    desc: "Dense blue-green glass with submerged light refractions",
    dark: true,
    text: "#ccfbf1",
    base: "#02100f",
    layers: [
      {
        background:
          "linear-gradient(145deg, rgba(2,44,34,0.96) 0%, rgba(8,47,73,0.74) 48%, rgba(14,116,144,0.42) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 52% 48% at 28% 52%, rgba(20,184,166,0.34) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 48,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 72% 35%, rgba(34,211,238,0.28) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 55,
      },
      {
        background:
          "linear-gradient(150deg, transparent 30%, rgba(167,243,208,0.10) 48%, rgba(103,232,249,0.12) 56%, transparent 72%)",
        blendMode: "screen",
        blur: 24,
      },
    ],
  },

  {
    id: "glass-neon-refraction",
    name: "Neon Refraction",
    category: "glass",
    mood: "vivid",
    desc: "Dark frosted glass splitting cyan, violet and pink neon light",
    dark: true,
    text: "#f0f9ff",
    base: "#05050a",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(30,27,75,0.72) 50%, rgba(76,29,149,0.36) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "linear-gradient(112deg, transparent 20%, rgba(34,211,238,0.20) 34%, rgba(59,130,246,0.18) 43%, rgba(139,92,246,0.24) 52%, rgba(236,72,153,0.18) 62%, transparent 78%)",
        blendMode: "screen",
        blur: 32,
      },
      {
        background:
          "radial-gradient(ellipse 40% 55% at 72% 38%, rgba(217,70,239,0.22) 0%, transparent 72%)",
        blendMode: "screen",
        blur: 52,
      },
      {
        background:
          "linear-gradient(45deg, transparent 32%, rgba(255,255,255,0.12) 48%, transparent 62%)",
        blendMode: "screen",
        blur: 13,
      },
    ],
  },

  {
    id: "glass-moonstone",
    name: "Moonstone",
    category: "glass",
    mood: "cool",
    desc: "Smoky blue glass with a faint lunar iridescence",
    dark: true,
    text: "#dbeafe",
    base: "#070b12",
    layers: [
      {
        background:
          "linear-gradient(140deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.72) 50%, rgba(51,65,85,0.48) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 48% 42% at 30% 40%, rgba(125,211,252,0.25) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 52,
      },
      {
        background:
          "radial-gradient(ellipse 42% 48% at 70% 62%, rgba(129,140,248,0.20) 0%, transparent 72%)",
        blendMode: "screen",
        blur: 58,
      },
      {
        background:
          "linear-gradient(120deg, transparent 28%, rgba(255,255,255,0.10) 48%, transparent 65%)",
        blendMode: "overlay",
        blur: 15,
      },
    ],
  },

  {
    id: "glass-rain-window",
    name: "Rain Window",
    category: "glass",
    mood: "cool",
    desc: "Condensed blue glass with soft distorted light behind it",
    dark: true,
    text: "#dbeafe",
    base: "#030712",
    layers: [
      {
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.94) 0%, rgba(30,58,95,0.72) 50%, rgba(14,116,144,0.34) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(ellipse 35% 60% at 25% 45%, rgba(56,189,248,0.30) 0%, transparent 72%)",
        blendMode: "screen",
        blur: 45,
      },
      {
        background:
          "radial-gradient(ellipse 42% 45% at 72% 35%, rgba(129,140,248,0.22) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 55,
      },
      {
        background:
          "linear-gradient(80deg, transparent 20%, rgba(255,255,255,0.06) 22%, transparent 24%, transparent 45%, rgba(255,255,255,0.05) 47%, transparent 49%, transparent 72%, rgba(255,255,255,0.06) 74%, transparent 76%)",
        blendMode: "overlay",
        blur: 10,
        opacity: 0.7,
      },
    ],
  },

  {
    id: "glass-solar",
    name: "Solar Glass",
    category: "glass",
    mood: "warm",
    desc: "Warm transparent glass glowing from an internal amber core",
    dark: true,
    text: "#fef3c7",
    base: "#0c0502",
    layers: [
      {
        background:
          "linear-gradient(145deg, rgba(67,20,7,0.94) 0%, rgba(120,53,15,0.68) 50%, rgba(217,119,6,0.32) 100%)",
        blendMode: "normal",
        blur: 0,
      },
      {
        background:
          "radial-gradient(circle at 50% 52%, rgba(251,191,36,0.42) 0%, rgba(245,158,11,0.14) 38%, transparent 70%)",
        blendMode: "screen",
        blur: 45,
      },
      {
        background:
          "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.18) 48%, rgba(255,255,255,0.04) 57%, transparent 72%)",
        blendMode: "screen",
        blur: 16,
      },
    ],
  },

  {
    id: "flux-lava-lamp",
    name: "Lava Lamp",
    category: "flux",
    mood: "warm",
    desc: "Organic red and orange blobs floating in dark space",
    dark: true,
    text: "#fecaca",
    base: "#0a0202",
    layers: [
      { background: "radial-gradient(ellipse 55% 40% at 30% 55%, rgba(239,68,68,0.9) 0%, transparent 70%)", blendMode: "screen", blur: 40 },
      { background: "radial-gradient(ellipse 40% 55% at 65% 35%, rgba(249,115,22,0.85) 0%, transparent 70%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 30% 35% at 50% 75%, rgba(234,179,8,0.6) 0%, transparent 65%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 25% 20% at 80% 70%, rgba(239,68,68,0.5) 0%, transparent 60%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "flux-jellyfish",
    name: "Jellyfish",
    category: "flux",
    mood: "cool",
    desc: "Translucent cyan and violet organic shapes",
    dark: true,
    text: "#ccfbf1",
    base: "#020617",
    layers: [
      { background: "radial-gradient(ellipse 50% 65% at 35% 45%, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)", blendMode: "screen", blur: 30 },
      { background: "radial-gradient(ellipse 45% 35% at 60% 30%, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)", blendMode: "screen", blur: 35 },
      { background: "radial-gradient(ellipse 35% 50% at 70% 65%, rgba(34,211,238,0.6) 0%, rgba(34,211,238,0.05) 50%, transparent 70%)", blendMode: "screen", blur: 25 },
      { background: "radial-gradient(ellipse 20% 25% at 25% 70%, rgba(168,85,247,0.5) 0%, transparent 65%)", blendMode: "screen", blur: 20 },
    ],
  },

  {
    id: "flux-oil-spill",
    name: "Oil Spill",
    category: "flux",
    mood: "vivid",
    desc: "Iridescent dark blobs with rainbow reflections",
    dark: true,
    text: "#e0e7ff",
    base: "#030712",
    layers: [
      { background: "radial-gradient(ellipse 60% 50% at 40% 50%, rgba(99,102,241,0.7) 0%, transparent 60%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 45% 55% at 65% 40%, rgba(16,185,129,0.6) 0%, transparent 55%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 35% 40% at 30% 70%, rgba(236,72,153,0.5) 0%, transparent 50%)", blendMode: "screen", blur: 40 },
      { background: "radial-gradient(ellipse 25% 30% at 75% 75%, rgba(245,158,11,0.4) 0%, transparent 45%)", blendMode: "screen", blur: 35 },
      { background: "radial-gradient(ellipse 20% 25% at 55% 20%, rgba(6,182,212,0.35) 0%, transparent 40%)", blendMode: "screen", blur: 30 },
    ],
  },

  {
    id: "flux-graphite",
    name: "Graphite Flow",
    category: "flux",
    mood: "cool",
    desc: "Slow graphite and slate blobs in dark space",
    dark: true,
    text: "#d0d4d9",
    base: "#0a0a0b",
    layers: [
      { background: "radial-gradient(ellipse 55% 45% at 35% 50%, rgba(100,116,139,0.6) 0%, transparent 60%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 40% 50% at 68% 38%, rgba(148,163,184,0.5) 0%, transparent 55%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 30% 35% at 30% 72%, rgba(71,85,105,0.45) 0%, transparent 50%)", blendMode: "screen", blur: 40 },
      { background: "radial-gradient(ellipse 22% 25% at 78% 75%, rgba(203,213,225,0.3) 0%, transparent 45%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "flux-nebula-flow",
    name: "Nebula Flow",
    category: "flux",
    mood: "vivid",
    desc: "Organic magenta, teal and violet blobs drifting like nebula clouds",
    dark: true,
    text: "#eae0ff",
    base: "#08050f",
    layers: [
      { background: "radial-gradient(ellipse 55% 45% at 35% 45%, rgba(236,72,153,0.75) 0%, transparent 60%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 45% 50% at 68% 40%, rgba(20,184,166,0.65) 0%, transparent 55%)", blendMode: "screen", blur: 50 },
      { background: "radial-gradient(ellipse 35% 40% at 50% 75%, rgba(139,92,246,0.55) 0%, transparent 50%)", blendMode: "screen", blur: 45 },
      { background: "radial-gradient(ellipse 22% 25% at 80% 75%, rgba(232,121,249,0.4) 0%, transparent 45%)", blendMode: "screen", blur: 35 },
    ],
  },

  {
    id: "flux-liquid-metal",
    name: "Liquid Metal",
    category: "flux",
    mood: "cool",
    desc: "Molten silver forms flowing through a dark metallic void",
    dark: true,
    text: "#e2e8f0",
    base: "#050608",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 42% at 30% 52%, rgba(203,213,225,0.62) 0%, rgba(100,116,139,0.28) 42%, transparent 70%)",
        blendMode: "screen",
        blur: 38,
      },
      {
        background:
          "radial-gradient(ellipse 42% 58% at 68% 38%, rgba(148,163,184,0.58) 0%, rgba(71,85,105,0.22) 45%, transparent 72%)",
        blendMode: "screen",
        blur: 46,
      },
      {
        background:
          "radial-gradient(ellipse 30% 28% at 52% 70%, rgba(241,245,249,0.30) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "flux-toxic-mist",
    name: "Toxic Mist",
    category: "flux",
    mood: "vivid",
    desc: "Acid green and electric cyan vapor twisting through darkness",
    dark: true,
    text: "#d9f99d",
    base: "#020806",
    layers: [
      {
        background:
          "radial-gradient(ellipse 50% 58% at 32% 48%, rgba(132,204,22,0.72) 0%, rgba(77,124,15,0.18) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 34,
      },
      {
        background:
          "radial-gradient(ellipse 42% 48% at 68% 40%, rgba(34,211,238,0.62) 0%, rgba(8,145,178,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 42,
      },
      {
        background:
          "radial-gradient(ellipse 28% 35% at 52% 72%, rgba(163,230,53,0.42) 0%, transparent 62%)",
        blendMode: "screen",
        blur: 32,
      },
    ],
  },

  {
    id: "flux-velvet-liquid",
    name: "Velvet Liquid",
    category: "flux",
    mood: "warm",
    desc: "Deep burgundy and plum shapes melting into one another",
    dark: true,
    text: "#f5d0fe",
    base: "#0b040a",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 48% at 30% 52%, rgba(190,24,93,0.68) 0%, rgba(136,19,55,0.20) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 42,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 68% 38%, rgba(126,34,206,0.62) 0%, rgba(88,28,135,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 50,
      },
      {
        background:
          "radial-gradient(ellipse 28% 32% at 52% 72%, rgba(244,114,182,0.38) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 34,
      },
    ],
  },

  {
    id: "flux-aurora-fluid",
    name: "Aurora Fluid",
    category: "flux",
    mood: "cool",
    desc: "Liquid emerald and cyan forms inspired by northern lights",
    dark: true,
    text: "#d9fff5",
    base: "#020706",
    layers: [
      {
        background:
          "radial-gradient(ellipse 58% 32% at 32% 48%, rgba(16,185,129,0.72) 0%, rgba(5,120,87,0.20) 48%, transparent 74%)",
        blendMode: "screen",
        blur: 38,
      },
      {
        background:
          "radial-gradient(ellipse 52% 36% at 67% 42%, rgba(34,211,238,0.62) 0%, rgba(8,145,178,0.16) 48%, transparent 74%)",
        blendMode: "screen",
        blur: 44,
      },
      {
        background:
          "linear-gradient(145deg, transparent 30%, rgba(167,243,208,0.14) 46%, rgba(103,232,249,0.18) 53%, transparent 70%)",
        blendMode: "screen",
        blur: 30,
      },
      {
        background:
          "radial-gradient(ellipse 30% 20% at 52% 62%, rgba(236,253,245,0.12) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 24,
      },
    ],
  },

  {
    id: "flux-ink-bloom",
    name: "Ink Bloom",
    category: "flux",
    mood: "vivid",
    desc: "Pigment-like blue and violet ink blooming through water",
    dark: true,
    text: "#dbeafe",
    base: "#030712",
    layers: [
      {
        background:
          "radial-gradient(ellipse 48% 58% at 30% 42%, rgba(37,99,235,0.70) 0%, rgba(30,64,175,0.16) 50%, transparent 74%)",
        blendMode: "screen",
        blur: 32,
      },
      {
        background:
          "radial-gradient(ellipse 42% 50% at 65% 55%, rgba(124,58,237,0.68) 0%, rgba(91,33,182,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 40,
      },
      {
        background:
          "radial-gradient(ellipse 24% 40% at 50% 30%, rgba(96,165,250,0.38) 0%, transparent 68%)",
        blendMode: "screen",
        blur: 28,
      },
    ],
  },

  {
    id: "flux-cosmic-jelly",
    name: "Cosmic Jelly",
    category: "flux",
    mood: "vivid",
    desc: "Translucent magenta and cyan masses floating like alien jelly",
    dark: true,
    text: "#f5d0fe",
    base: "#05020a",
    layers: [
      {
        background:
          "radial-gradient(ellipse 48% 58% at 28% 48%, rgba(217,70,239,0.72) 0%, rgba(134,25,143,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 35,
      },
      {
        background:
          "radial-gradient(ellipse 42% 55% at 68% 38%, rgba(34,211,238,0.68) 0%, rgba(8,145,178,0.15) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 40,
      },
      {
        background:
          "radial-gradient(ellipse 25% 32% at 50% 72%, rgba(244,114,182,0.42) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "flux-volcanic-glass",
    name: "Volcanic Glass",
    category: "flux",
    mood: "warm",
    desc: "Molten amber shapes trapped inside black volcanic glass",
    dark: true,
    text: "#fed7aa",
    base: "#080403",
    layers: [
      {
        background:
          "radial-gradient(ellipse 50% 42% at 32% 55%, rgba(234,88,12,0.72) 0%, rgba(124,45,18,0.18) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 38,
      },
      {
        background:
          "radial-gradient(ellipse 42% 55% at 68% 38%, rgba(245,158,11,0.64) 0%, rgba(180,83,9,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 48,
      },
      {
        background:
          "radial-gradient(ellipse 24% 28% at 52% 70%, rgba(254,240,138,0.40) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "flux-deep-tide",
    name: "Deep Tide",
    category: "flux",
    mood: "cool",
    desc: "Slow-moving blue and teal masses inspired by deep ocean currents",
    dark: true,
    text: "#cffafe",
    base: "#02070a",
    layers: [
      {
        background:
          "radial-gradient(ellipse 62% 35% at 30% 58%, rgba(14,116,144,0.70) 0%, rgba(8,47,73,0.18) 48%, transparent 75%)",
        blendMode: "screen",
        blur: 44,
      },
      {
        background:
          "radial-gradient(ellipse 48% 50% at 70% 36%, rgba(20,184,166,0.58) 0%, rgba(15,118,110,0.14) 48%, transparent 74%)",
        blendMode: "screen",
        blur: 50,
      },
      {
        background:
          "linear-gradient(150deg, transparent 32%, rgba(103,232,249,0.12) 48%, rgba(45,212,191,0.16) 55%, transparent 72%)",
        blendMode: "screen",
        blur: 36,
      },
    ],
  },

  {
    id: "flux-electric-pulp",
    name: "Electric Pulp",
    category: "flux",
    mood: "vivid",
    desc: "High-energy lime, violet and cyan organic masses",
    dark: true,
    text: "#ecfccb",
    base: "#050608",
    layers: [
      {
        background:
          "radial-gradient(ellipse 48% 48% at 30% 45%, rgba(163,230,53,0.72) 0%, rgba(101,163,13,0.15) 50%, transparent 72%)",
        blendMode: "screen",
        blur: 34,
      },
      {
        background:
          "radial-gradient(ellipse 42% 52% at 68% 42%, rgba(168,85,247,0.70) 0%, rgba(109,40,217,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 42,
      },
      {
        background:
          "radial-gradient(ellipse 30% 28% at 52% 70%, rgba(34,211,238,0.48) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "flux-neon-plasma",
    name: "Neon Plasma",
    category: "flux",
    mood: "vivid",
    desc: "Electric blue and hot pink plasma colliding in organic forms",
    dark: true,
    text: "#f0f9ff",
    base: "#05020a",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 45% at 28% 48%, rgba(37,99,235,0.78) 0%, rgba(30,64,175,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 32,
      },
      {
        background:
          "radial-gradient(ellipse 48% 55% at 70% 40%, rgba(236,72,153,0.72) 0%, rgba(190,24,93,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 38,
      },
      {
        background:
          "radial-gradient(ellipse 24% 30% at 52% 65%, rgba(34,211,238,0.55) 0%, transparent 64%)",
        blendMode: "screen",
        blur: 25,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 45%)",
        blendMode: "screen",
        blur: 18,
      },
    ],
  },

  {
    id: "flux-solar-liquid",
    name: "Solar Liquid",
    category: "flux",
    mood: "warm",
    desc: "Golden and coral liquid forms glowing like a molten sun",
    dark: true,
    text: "#fef3c7",
    base: "#0b0502",
    layers: [
      {
        background:
          "radial-gradient(ellipse 52% 48% at 30% 50%, rgba(251,146,60,0.78) 0%, rgba(194,65,12,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 38,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 68% 38%, rgba(250,204,21,0.72) 0%, rgba(217,119,6,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 45,
      },
      {
        background:
          "radial-gradient(ellipse 24% 28% at 52% 68%, rgba(255,247,237,0.42) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 26,
      },
    ],
  },

  {
    id: "flux-boreal-pulse",
    name: "Boreal Pulse",
    category: "flux",
    mood: "cool",
    desc: "Emerald, cyan and violet organic masses with a northern glow",
    dark: true,
    text: "#e0fff7",
    base: "#020607",
    layers: [
      {
        background:
          "radial-gradient(ellipse 52% 45% at 28% 52%, rgba(16,185,129,0.72) 0%, rgba(5,120,87,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 36,
      },
      {
        background:
          "radial-gradient(ellipse 45% 52% at 68% 38%, rgba(34,211,238,0.68) 0%, rgba(8,145,178,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 42,
      },
      {
        background:
          "radial-gradient(ellipse 28% 35% at 50% 72%, rgba(139,92,246,0.38) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 34,
      },
      {
        background:
          "linear-gradient(145deg, transparent 30%, rgba(167,243,208,0.10) 46%, rgba(103,232,249,0.14) 53%, transparent 72%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "flux-black-cherry",
    name: "Black Cherry",
    category: "flux",
    mood: "warm",
    desc: "Dark cherry and crimson organic masses with a glossy depth",
    dark: true,
    text: "#fecdd3",
    base: "#090204",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 48% at 32% 50%, rgba(190,24,93,0.72) 0%, rgba(127,29,29,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 40,
      },
      {
        background:
          "radial-gradient(ellipse 42% 55% at 68% 38%, rgba(220,38,38,0.62) 0%, rgba(153,27,27,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 48,
      },
      {
        background:
          "radial-gradient(ellipse 25% 28% at 52% 70%, rgba(251,113,133,0.30) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 30,
      },
    ],
  },

  {
    id: "flux-frozen-plasma",
    name: "Frozen Plasma",
    category: "flux",
    mood: "cool",
    desc: "Icy blue organic masses glowing inside a frozen void",
    dark: true,
    text: "#e0f2fe",
    base: "#02060b",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 48% at 30% 50%, rgba(56,189,248,0.68) 0%, rgba(14,116,144,0.16) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 38,
      },
      {
        background:
          "radial-gradient(ellipse 45% 55% at 68% 38%, rgba(129,140,248,0.62) 0%, rgba(67,56,202,0.14) 48%, transparent 72%)",
        blendMode: "screen",
        blur: 46,
      },
      {
        background:
          "radial-gradient(ellipse 22% 26% at 52% 68%, rgba(186,230,253,0.34) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 28,
      },
    ],
  },

  {
    id: "flux-bubblegum",
    name: "Bubblegum",
    category: "flux",
    mood: "vivid",
    desc: "Playful pink, purple and mint blob composition",
    dark: false,
    cardText: "#000000",
    text: "#701a75",
    base: "#fdf4ff",
    layers: [
      { background: "radial-gradient(ellipse 50% 45% at 25% 40%, rgba(236,72,153,0.65) 0%, transparent 65%)", blendMode: "normal", blur: 50 },
      { background: "radial-gradient(ellipse 40% 50% at 70% 55%, rgba(168,85,247,0.55) 0%, transparent 60%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 50% 25%, rgba(52,211,153,0.45) 0%, transparent 55%)", blendMode: "normal", blur: 45 },
      { background: "radial-gradient(ellipse 30% 30% at 80% 30%, rgba(244,114,182,0.4) 0%, transparent 50%)", blendMode: "normal", blur: 40 },
    ],
  },

  {
    id: "flux-cloud-nine",
    name: "Cloud Nine",
    category: "flux",
    mood: "warm",
    desc: "Soft peach and cream organic cloudscape",
    dark: false,
    cardText: "#000000",
    text: "#9a3412",
    base: "#fff7ed",
    layers: [
      { background: "radial-gradient(ellipse 55% 45% at 30% 50%, rgba(253,186,116,0.6) 0%, transparent 60%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(ellipse 45% 55% at 65% 40%, rgba(251,146,60,0.45) 0%, transparent 55%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 40% 35% at 50% 70%, rgba(254,215,170,0.5) 0%, transparent 50%)", blendMode: "normal", blur: 55 },
    ],
  },

  {
    id: "flux-milk-tea",
    name: "Milk Tea",
    category: "flux",
    mood: "warm",
    desc: "Creamy caramel and beige organic forms with a soft tactile feel",
    dark: false,
    cardText: "#000000",
    text: "#78350f",
    base: "#fffbeb",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 45% at 30% 50%, rgba(217,119,6,0.38) 0%, rgba(245,158,11,0.12) 48%, transparent 72%)",
        blendMode: "normal",
        blur: 58,
      },
      {
        background:
          "radial-gradient(ellipse 45% 52% at 68% 40%, rgba(180,83,9,0.28) 0%, rgba(217,119,6,0.08) 50%, transparent 74%)",
        blendMode: "normal",
        blur: 62,
      },
      {
        background:
          "radial-gradient(ellipse 30% 28% at 50% 72%, rgba(255,255,255,0.62) 0%, transparent 68%)",
        blendMode: "soft-light",
        blur: 38,
      },
    ],
  },

  {
    id: "flux-sage-smoke",
    name: "Sage Smoke",
    category: "flux",
    mood: "cool",
    desc: "Muted sage and eucalyptus shapes drifting through pale air",
    dark: false,
    cardText: "#000000",
    text: "#365314",
    base: "#f5f7f0",
    layers: [
      {
        background:
          "radial-gradient(ellipse 55% 48% at 30% 48%, rgba(132,204,22,0.34) 0%, rgba(101,163,13,0.08) 48%, transparent 72%)",
        blendMode: "normal",
        blur: 40,
      },
      {
        background:
          "radial-gradient(ellipse 46% 52% at 68% 42%, rgba(45,212,191,0.28) 0%, rgba(20,184,166,0.06) 50%, transparent 74%)",
        blendMode: "normal",
        blur: 30,
      },
      {
        background:
          "radial-gradient(ellipse 32% 30% at 52% 70%, rgba(255,255,255,0.50) 0%, transparent 68%)",
        blendMode: "soft-light",
        blur: 30,
      },
    ],
  },

  {
    id: "aurora-beams",
    name: "Aurora Beams",
    category: "lattice",
    mood: "cool",
    desc: "Diagonal repeating light beams heavily blurred with a teal base glow",
    dark: true,
    text: "#ffffff",
    base: "#0a0a0a",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(55.8% 55.49% at 50% 100%, rgb(38, 77, 76) 0%, rgba(25, 48, 47, 0) 100%)",
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },

      {
        background: `
        repeating-linear-gradient(
          100deg,
          #262626 0%,
          #262626 3%,
          rgba(38, 38, 38, 0.7) 5%,
          rgba(38, 38, 38, 0.7) 7%,
          transparent 10%,
          transparent 12%,
          rgba(38, 38, 38, 0.7) 14%,
          #262626 16%
        ),
        repeating-linear-gradient(
          100deg,
          #9ca3af 0%,
          #9ca3af 1.5%,
          rgba(156, 163, 175, 0.8) 2%,
          #6b7280 3%,
          #6b7280 4%,
          rgba(156, 163, 175, 0.8) 4.5%,
          #9ca3af 5%
        )
      `,
        backgroundSize: "300% 200%",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },

      {
        background:
          "radial-gradient(ellipse at 100% 100%, #ffffff 20%, #0a0a0a 80%)",
        blendMode: "multiply",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "lattice-neon-grid",
    name: "Neon Grid",
    category: "lattice",
    mood: "vivid",
    desc: "Cyberpunk grid with neon purple glow lines",
    dark: true,
    text: "#d8b4fe",
    base: "#09090b",
    layers: [
      { background: "linear-gradient(rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.15) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "60px 60px" },
      { background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.5) 0%, transparent 50%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 25% 75%, rgba(236,72,153,0.3) 0%, transparent 40%)", blendMode: "screen", blur: 60 },
    ],
  },

  {
    id: "chrome-inferno",
    name: "Chrome Inferno",
    category: "lattice",
    mood: "warm",
    desc: "Incandescent metallic beams cutting through total darkness",
    dark: true,
    text: "#ffffff",
    base: "#0a0000",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(55.8% 55.49% at 50% 100%, rgb(120,30,10) 0%, rgba(80,15,5,0) 100%)",
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
      {
        background: `
          repeating-linear-gradient(
            100deg,
            #331100 0%,
            #331100 3%,
            rgba(80, 30, 10, 0.7) 5%,
            rgba(80, 30, 10, 0.7) 7%,
            transparent 10%,
            transparent 12%,
            rgba(80, 30, 10, 0.7) 14%,
            #331100 16%
          ),
          repeating-linear-gradient(
            100deg,
            #ff6b00 0%,
            #ff6b00 1.5%,
            rgba(255, 107, 0, 0.8) 2%,
            #b91c1c 3%,
            #b91c1c 4%,
            rgba(255, 107, 0, 0.8) 4.5%,
            #ff6b00 5%
          )
        `,
        backgroundSize: "300% 200%",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },
      {
        background: "radial-gradient(ellipse at 100% 100%, #ffffff 20%, #0a0000 80%)",
        blendMode: "multiply",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "diamond-storm",
    name: "Diamond Storm",
    category: "lattice",
    mood: "cool",
    desc: "Electric ice beams cutting through a glacial void",
    dark: true,
    text: "#ffffff",
    base: "#00030a",
    grain: true,
    layers: [
      {
        background:
          "radial-gradient(55.8% 55.49% at 50% 100%, rgb(20,60,120) 0%, rgba(10,30,80,0) 100%)",
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
      {
        background: `
          repeating-linear-gradient(
            100deg,
            #041022 0%,
            #041022 3%,
            rgba(20, 60, 120, 0.7) 5%,
            rgba(20, 60, 120, 0.7) 7%,
            transparent 10%,
            transparent 12%,
            rgba(20, 60, 120, 0.7) 14%,
            #041022 16%
          ),
          repeating-linear-gradient(
            100deg,
            #b3e5ff 0%,
            #b3e5ff 1.5%,
            rgba(179, 229, 255, 0.8) 2%,
            #2563eb 3%,
            #2563eb 4%,
            rgba(179, 229, 255, 0.8) 4.5%,
            #b3e5ff 5%
          )
        `,
        backgroundSize: "300% 200%",
        blendMode: "screen",
        blur: 30,
        opacity: 0.9,
      },
      {
        background: "radial-gradient(ellipse at 100% 100%, #ffffff 20%, #00030a 80%)",
        blendMode: "multiply",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "lattice-blueprint",
    name: "Blueprint",
    category: "lattice",
    mood: "cool",
    desc: "Technical blueprint grid with cyan highlights",
    dark: true,
    text: "#a5f3fc",
    base: "#0c1929",
    layers: [
      { background: "linear-gradient(rgba(14,165,233,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.12) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "50px 50px" },
      { background: "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "10px 10px" },
      { background: "radial-gradient(circle at 60% 40%, rgba(6,182,212,0.35) 0%, transparent 45%)", blendMode: "screen", blur: 70 },
    ],
  },

  {
    id: "lattice-diamond-weave",
    name: "Diamond Weave",
    category: "lattice",
    mood: "warm",
    desc: "Diagonal crosshatch with golden glow",
    dark: true,
    text: "#fef3c7",
    base: "#0a0704",
    layers: [
      { background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(245,158,11,0.08) 30px, rgba(245,158,11,0.08) 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(245,158,11,0.08) 30px, rgba(245,158,11,0.08) 31px)", blendMode: "normal", blur: 0, opacity: 1 },
      { background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 45%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 20% 80%, rgba(217,119,6,0.3) 0%, transparent 35%)", blendMode: "screen", blur: 50 },
    ],
  },

  {
    id: "lattice-dot-matrix",
    name: "Dot Matrix",
    category: "lattice",
    mood: "cool",
    desc: "Retro dot pattern with violet gradient wash",
    dark: true,
    text: "#ddd6fe",
    base: "#0f0520",
    layers: [
      { background: "radial-gradient(circle, rgba(139,92,246,0.2) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "20px 20px" },
      { background: "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.6) 0%, transparent 50%)", blendMode: "screen", blur: 70 },
      { background: "radial-gradient(circle at 70% 65%, rgba(168,85,247,0.4) 0%, transparent 40%)", blendMode: "screen", blur: 55 },
    ],
  },

  {
    id: "lattice-mono-grid",
    name: "Mono Grid",
    category: "lattice",
    mood: "cool",
    desc: "Minimal grayscale grid with soft steel glow",
    dark: true,
    text: "#c7ccd1",
    base: "#0b0b0c",
    layers: [
      { background: "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "50px 50px" },
      { background: "radial-gradient(circle at 50% 50%, rgba(148,163,184,0.3) 0%, transparent 50%)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 25% 75%, rgba(203,213,225,0.2) 0%, transparent 40%)", blendMode: "screen", blur: 60 },
    ],
  },

  {
    id: "lattice-star-grid",
    name: "Star Grid",
    category: "lattice",
    mood: "cool",
    desc: "Fine grid over deep marine blue, speckled with bright dots",
    dark: true,
    text: "#dbe4ff",
    base: "#05060f",
    layers: [
      {
        background: "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
        backgroundSize: "45px 45px",
      },
      { background: "radial-gradient(circle at 50% 45%, rgba(99,102,241,0.35) 0%, transparent 50%)", blendMode: "screen", blur: 80 },
      {
        background: `
          radial-gradient(circle at 15% 20%, rgba(255,255,255,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 78% 15%, rgba(199,210,254,0.9) 1.5px, transparent 4px),
          radial-gradient(circle at 88% 60%, rgba(255,255,255,0.8) 1.5px, transparent 4px),
          radial-gradient(circle at 30% 75%, rgba(255,255,255,0.8) 1.5px, transparent 4px),
          radial-gradient(circle at 55% 85%, rgba(199,210,254,0.9) 1.5px, transparent 4px)
        `,
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
    ],
  },

  {
    id: "lattice-hex-flow",
    name: "Hex Flow",
    category: "lattice",
    mood: "cool",
    desc: "Soft hexagonal lattice dissolving into cyan atmospheric light",
    dark: true,
    text: "#cffafe",
    base: "#02080b",
    layers: [
      {
        background:
          "linear-gradient(30deg, transparent 48%, rgba(34,211,238,0.10) 49%, rgba(34,211,238,0.10) 51%, transparent 52%), linear-gradient(90deg, transparent 48%, rgba(34,211,238,0.07) 49%, rgba(34,211,238,0.07) 51%, transparent 52%)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.8,
        backgroundSize: "52px 30px",
      },
      {
        background:
          "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(34,211,238,0.32) 0%, rgba(14,116,144,0.10) 48%, transparent 78%)",
        blendMode: "screen",
        blur: 70,
      },
      {
        background:
          "radial-gradient(circle at 20% 75%, rgba(45,212,191,0.18) 0%, transparent 38%)",
        blendMode: "screen",
        blur: 50,
      },
    ],
  },

  {
    id: "lattice-topographic",
    name: "Topographic",
    category: "lattice",
    mood: "cool",
    desc: "Layered contour lines flowing like a luminous terrain map",
    dark: true,
    text: "#d1fae5",
    base: "#030908",
    layers: [
      {
        background:
          "repeating-radial-gradient(ellipse at 40% 50%, transparent 0px, transparent 18px, rgba(52,211,153,0.10) 19px, rgba(52,211,153,0.10) 20px, transparent 21px, transparent 38px)",
        blendMode: "normal",
        blur: 1,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 55% 45% at 40% 48%, rgba(16,185,129,0.28) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 60,
      },
      {
        background:
          "radial-gradient(ellipse 35% 30% at 75% 30%, rgba(34,211,238,0.18) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 50,
      },
    ],
  },

  {
    id: "lattice-circuit",
    name: "Circuit",
    category: "lattice",
    mood: "vivid",
    desc: "Minimal electronic traces illuminated by electric blue",
    dark: true,
    text: "#bfdbfe",
    base: "#04070d",
    layers: [
      {
        background:
          "linear-gradient(90deg, transparent 49%, rgba(59,130,246,0.14) 49%, rgba(59,130,246,0.14) 51%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(59,130,246,0.10) 49%, rgba(59,130,246,0.10) 51%, transparent 51%)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.7,
        backgroundSize: "80px 80px",
      },
      {
        background:
          "radial-gradient(circle at 25% 25%, rgba(96,165,250,0.65) 0%, rgba(59,130,246,0.12) 8%, transparent 22%), radial-gradient(circle at 75% 65%, rgba(34,211,238,0.55) 0%, transparent 22%)",
        blendMode: "screen",
        blur: 20,
      },
      {
        background:
          "linear-gradient(135deg, transparent 35%, rgba(59,130,246,0.12) 50%, transparent 65%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "lattice-diamond-field",
    name: "Diamond Field",
    category: "lattice",
    mood: "vivid",
    desc: "Fine diamond lattice floating over a violet atmospheric field",
    dark: true,
    text: "#ede9fe",
    base: "#08050f",
    layers: [
      {
        background:
          "repeating-linear-gradient(45deg, transparent 0, transparent 24px, rgba(167,139,250,0.10) 25px, transparent 26px), repeating-linear-gradient(-45deg, transparent 0, transparent 24px, rgba(167,139,250,0.10) 25px, transparent 26px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.85,
      },
      {
        background:
          "radial-gradient(ellipse 55% 55% at 48% 45%, rgba(139,92,246,0.34) 0%, rgba(91,33,182,0.10) 50%, transparent 78%)",
        blendMode: "screen",
        blur: 70,
      },
      {
        background:
          "radial-gradient(circle at 78% 22%, rgba(236,72,153,0.20) 0%, transparent 35%)",
        blendMode: "screen",
        blur: 50,
      },
    ],
  },

  {
    id: "lattice-radar",
    name: "Radar",
    category: "lattice",
    mood: "cool",
    desc: "Concentric scanning rings with a subtle electromagnetic glow",
    dark: true,
    text: "#a7f3d0",
    base: "#020807",
    layers: [
      {
        background:
          "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 24px, rgba(52,211,153,0.11) 25px, transparent 26px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.9,
      },
      {
        background:
          "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(52,211,153,0.16) 28deg, transparent 48deg, transparent 360deg)",
        blendMode: "screen",
        blur: 12,
        opacity: 0.8,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(52,211,153,0.28) 0%, transparent 48%)",
        blendMode: "screen",
        blur: 65,
      },
    ],
  },

  {
    id: "lattice-microdots",
    name: "Microdots",
    category: "lattice",
    mood: "cool",
    desc: "Ultra-fine dot matrix fading into a soft blue atmosphere",
    dark: true,
    text: "#dbeafe",
    base: "#05070c",
    layers: [
      {
        background:
          "radial-gradient(circle, rgba(147,197,253,0.16) 1px, transparent 1.5px)",
        blendMode: "normal",
        blur: 0,
        opacity: 1,
        backgroundSize: "14px 14px",
      },
      {
        background:
          "radial-gradient(ellipse 65% 50% at 50% 45%, rgba(59,130,246,0.26) 0%, transparent 75%)",
        blendMode: "screen",
        blur: 65,
      },
      {
        background:
          "radial-gradient(circle at 80% 25%, rgba(125,211,252,0.22) 0%, transparent 30%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "lattice-wave-grid",
    name: "Wave Grid",
    category: "lattice",
    mood: "vivid",
    desc: "Curved interference lines creating a fluid geometric surface",
    dark: true,
    text: "#cffafe",
    base: "#030609",
    layers: [
      {
        background:
          "repeating-linear-gradient(100deg, transparent 0%, transparent 7%, rgba(34,211,238,0.08) 7.5%, transparent 8%, transparent 15%)",
        blendMode: "normal",
        blur: 3,
        opacity: 0.9,
        backgroundSize: "100% 42px",
      },
      {
        background:
          "repeating-linear-gradient(80deg, transparent 0%, transparent 9%, rgba(59,130,246,0.07) 9.5%, transparent 10%, transparent 18%)",
        blendMode: "screen",
        blur: 5,
        opacity: 0.8,
        backgroundSize: "100% 55px",
      },
      {
        background:
          "radial-gradient(ellipse 65% 35% at 50% 52%, rgba(6,182,212,0.28) 0%, transparent 75%)",
        blendMode: "screen",
        blur: 65,
      },
    ],
  },

  {
    id: "lattice-honeycomb",
    name: "Honeycomb",
    category: "lattice",
    mood: "warm",
    desc: "Hexagonal amber structure with a restrained golden glow",
    dark: true,
    text: "#fef3c7",
    base: "#0a0703",
    layers: [
      {
        background:
          "repeating-linear-gradient(30deg, transparent 0, transparent 25px, rgba(245,158,11,0.09) 26px, transparent 27px), repeating-linear-gradient(150deg, transparent 0, transparent 25px, rgba(245,158,11,0.09) 26px, transparent 27px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 55% 48% at 50% 48%, rgba(245,158,11,0.30) 0%, rgba(180,83,9,0.08) 50%, transparent 76%)",
        blendMode: "screen",
        blur: 65,
      },
      {
        background:
          "radial-gradient(circle at 25% 75%, rgba(251,191,36,0.18) 0%, transparent 35%)",
        blendMode: "screen",
        blur: 45,
      },
    ],
  },

  {
    id: "lattice-constellation",
    name: "Constellation",
    category: "lattice",
    mood: "cool",
    desc: "Sparse geometric network connecting luminous points",
    dark: true,
    text: "#dbeafe",
    base: "#03050c",
    layers: [
      {
        background:
          "linear-gradient(28deg, transparent 48%, rgba(129,140,248,0.08) 49%, transparent 50%), linear-gradient(142deg, transparent 48%, rgba(96,165,250,0.08) 49%, transparent 50%)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.8,
        backgroundSize: "90px 90px",
      },
      {
        background:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.85) 1px, transparent 3px), radial-gradient(circle at 65% 22%, rgba(191,219,254,0.8) 1.5px, transparent 4px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 3px), radial-gradient(circle at 35% 78%, rgba(165,180,252,0.8) 1.5px, transparent 4px)",
        blendMode: "screen",
        blur: 0,
        opacity: 1,
      },
      {
        background:
          "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(99,102,241,0.22) 0%, transparent 75%)",
        blendMode: "screen",
        blur: 70,
      },
    ],
  },

  {
    id: "lattice-prism-mesh",
    name: "Prism Mesh",
    category: "lattice",
    mood: "vivid",
    desc: "Angular mesh illuminated by cyan, violet and magenta refractions",
    dark: true,
    text: "#f0f9ff",
    base: "#07060c",
    layers: [
      {
        background:
          "repeating-linear-gradient(60deg, transparent 0, transparent 38px, rgba(34,211,238,0.08) 39px, transparent 40px), repeating-linear-gradient(120deg, transparent 0, transparent 38px, rgba(167,139,250,0.08) 39px, transparent 40px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 50% 45% at 35% 45%, rgba(34,211,238,0.28) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 60,
      },
      {
        background:
          "radial-gradient(ellipse 45% 50% at 70% 55%, rgba(217,70,239,0.24) 0%, transparent 70%)",
        blendMode: "screen",
        blur: 65,
      },
    ],
  },

  {
    id: "lattice-scanlines",
    name: "Scanlines",
    category: "lattice",
    mood: "vivid",
    desc: "Fine horizontal scanlines over a subtle cybernetic glow",
    dark: true,
    text: "#bae6fd",
    base: "#03070a",
    layers: [
      {
        background:
          "repeating-linear-gradient(0deg, rgba(56,189,248,0.09) 0px, rgba(56,189,248,0.09) 1px, transparent 1px, transparent 6px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.8,
      },
      {
        background:
          "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.14) 45%, rgba(59,130,246,0.18) 55%, transparent 100%)",
        blendMode: "screen",
        blur: 35,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.24) 0%, transparent 52%)",
        blendMode: "screen",
        blur: 65,
      },
    ],
  },

  {
    id: "lattice-moire",
    name: "Moiré",
    category: "lattice",
    mood: "vivid",
    desc: "Overlapping fine waves producing a hypnotic moiré surface",
    dark: true,
    text: "#e0e7ff",
    base: "#06070c",
    layers: [
      {
        background:
          "repeating-linear-gradient(15deg, transparent 0, transparent 9px, rgba(129,140,248,0.09) 10px, transparent 11px)",
        blendMode: "normal",
        blur: 1,
        opacity: 0.9,
      },
      {
        background:
          "repeating-linear-gradient(165deg, transparent 0, transparent 11px, rgba(34,211,238,0.07) 12px, transparent 13px)",
        blendMode: "screen",
        blur: 1,
        opacity: 0.8,
      },
      {
        background:
          "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(99,102,241,0.22) 0%, transparent 75%)",
        blendMode: "screen",
        blur: 70,
      },
    ],
  },

  {
    id: "lattice-celestial",
    name: "Celestial Lattice",
    category: "lattice",
    mood: "cool",
    desc: "Fine celestial geometry fading into a deep cosmic blue",
    dark: true,
    text: "#e0e7ff",
    base: "#030510",
    layers: [
      {
        background:
          "linear-gradient(rgba(129,140,248,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.07) 1px, transparent 1px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.8,
        backgroundSize: "36px 36px",
      },
      {
        background:
          "radial-gradient(circle at 50% 45%, rgba(79,70,229,0.28) 0%, transparent 65%)",
        blendMode: "screen",
        blur: 75,
      },
      {
        background:
          "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.9) 1px, transparent 3px), radial-gradient(circle at 78% 32%, rgba(191,219,254,0.8) 1px, transparent 3px), radial-gradient(circle at 62% 78%, rgba(255,255,255,0.75) 1px, transparent 3px)",
        blendMode: "screen",
        blur: 0,
        opacity: 0.9,
      },
    ],
  },

  {
    id: "lattice-aurora-grid",
    name: "Aurora Grid",
    category: "lattice",
    mood: "cool",
    desc: "Fine geometric grid submerged beneath an emerald and cyan aurora",
    dark: true,
    text: "#dcfff6",
    base: "#020706",
    layers: [
      {
        background:
          "linear-gradient(rgba(52,211,153,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.7,
        backgroundSize: "55px 55px",
      },
      {
        background:
          "linear-gradient(145deg, transparent 25%, rgba(16,185,129,0.18) 40%, rgba(34,211,238,0.24) 50%, rgba(52,211,153,0.12) 60%, transparent 76%)",
        blendMode: "screen",
        blur: 42,
        opacity: 0.9,
      },
      {
        background:
          "radial-gradient(ellipse 70% 25% at 50% 52%, rgba(94,234,212,0.22) 0%, transparent 78%)",
        blendMode: "screen",
        blur: 45,
      },
      {
        background:
          "radial-gradient(ellipse 35% 22% at 72% 25%, rgba(129,140,248,0.10) 0%, transparent 75%)",
        blendMode: "screen",
        blur: 50,
      },
    ],
  },

  {
    id: "lattice-light-weave",
    name: "Light Weave",
    category: "lattice",
    mood: "cool",
    desc: "Delicate grid on soft blue with subtle glow",
    dark: false,
    cardText: "#000000",
    text: "#1e3a5f",
    base: "#f0f9ff",
    layers: [
      { background: "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "40px 40px" },
      { background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.25) 0%, transparent 50%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(circle at 30% 70%, rgba(99,102,241,0.15) 0%, transparent 40%)", blendMode: "normal", blur: 50 },
    ],
  },

  {
    id: "lattice-soft-mesh",
    name: "Soft Mesh",
    category: "lattice",
    mood: "cool",
    desc: "Minimal pale mesh dissolving into an airy cyan atmosphere",
    dark: false,
    cardText: "#000000",
    text: "#164e63",
    base: "#f0fdfa",
    layers: [
      {
        background:
          "linear-gradient(rgba(20,184,166,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px)",
        blendMode: "normal",
        blur: 0,
        opacity: 0.8,
        backgroundSize: "48px 48px",
      },
      {
        background:
          "radial-gradient(ellipse 60% 45% at 48% 45%, rgba(45,212,191,0.22) 0%, transparent 75%)",
        blendMode: "normal",
        blur: 65,
      },
      {
        background:
          "radial-gradient(circle at 75% 25%, rgba(125,211,252,0.18) 0%, transparent 35%)",
        blendMode: "normal",
        blur: 50,
      },
    ],
  },
];

/** Generate copyable CSS for a gradient (fullscreen blur scale). */
export function gradientToCSS(g: Gradient): string {
  const layersCSS = g.layers
    .map((l, i) => {
      const blurLine =
        l.blur > 0
          ? `\nfilter: blur(90px); /* use 130px on desktop */`
          : "";
      return `/* Layer ${i + 1} - ${l.blendMode} */\nbackground: ${l.background};\nmix-blend-mode: ${l.blendMode};${blurLine}`;
    })
    .join("\n\n");

  return `/* ${g.name} - Aura (${g.category}) */\n/* Base - set on body/page for blend modes */\nbackground-color: ${g.base};\n\n${layersCSS}${g.grain ? "\n\n/* Grain: apply SVG feTurbulence noise overlay */" : ""}`;
}

/* ── Theme-aware blend modes ── */

/**
 * Catalog blend modes are authored against their natural backdrop (mostly
 * dark). Over a light theme background, `hard-light`, `soft-light`, `screen`
 * and `overlay` wash the gradient out to white. Map them to `multiply` so the
 * original hues render as tints on a light base - "white base, same colors".
 */
export function resolveBlendMode(mode: string, light: boolean): string {
  if (!light) return mode;
  switch (mode) {
    case "hard-light":
    case "soft-light":
    case "screen":
    case "overlay":
      return "multiply";
    default:
      return mode;
  }
}

/* ── Fullscreen blur scaling ── */

/**
 * Catalog blur values are tuned for card thumbnails (raw px). Fullscreen
 * backgrounds need much more blur for the atmospheric effect. Scale linearly
 * from the thumbnail anchor (36px → 90/130px on mobile/desktop) so edited
 * values produce a visible difference in the preview.
 */
export function scaleBlurFull(blur: number): { mobile: number; desktop: number } {
  if (blur <= 0) return { mobile: 0, desktop: 0 };
  return {
    mobile: Math.min(200, Math.round(blur * 2.5)),
    desktop: Math.min(260, Math.round(blur * 3.6)),
  };
}

/* ── Featured gradients ──
   Shown first in the grid (no visual label), pinned by id in this order. */
export const FEATURED_IDS: string[] = [
  "sunrise-drift",
  "golden-hour",
  "midnight-sapphire",
  "grain-dusty-rose",
  "aurora-nova",
  "aurora-borealis",
  "aurora-beams",
  "midnight-horizon",
  "champagne-fizz",
  "silver-mist",
  "arctic-frost",
  "ember-glow",
  "deep-lagoon",
  "eclipse-bloom",
  "blood-aurora",
  "prism-spectral-edge"
];
