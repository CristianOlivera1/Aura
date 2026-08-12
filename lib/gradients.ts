/* ── Types ── */

export type GradientMood = "warm" | "cool" | "vivid";
export type Category = "aura" | "mesh" | "nebula" | "prism" | "grain" | "glass" | "flux" | "lattice";

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
  { id: "grain", label: "Grain", icon: "lucide:scan-line" },
  { id: "glass", label: "Glass", icon: "lucide:diamond" },
  { id: "flux", label: "Flux", icon: "lucide:blob" },
  { id: "lattice", label: "Lattice", icon: "lucide:grid-3x3" },
];

/* ══════════════════════════════════════════════════════════════
   GRADIENTS - Premium multi-layer backgrounds
   ══════════════════════════════════════════════════════════════ */

export const GRADIENTS: Gradient[] = [

  /* ── AURA - Signature blend-mode atmospheric gradients ── */

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
      { background: "radial-gradient(ellipse 89% 99% at 50% -38%, rgba(0,0,0,0) 0%, rgb(30,32,35) 38%, rgb(45,70,115) 70%, rgb(142,123,227) 90%, rgb(248,104,196) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "radial-gradient(ellipse 95% 105% at 50% -34%, rgba(0,0,0,0.15) 0%, rgb(30,32,35) 42%, rgb(55,82,135) 74%, rgb(150,126,228) 92%, rgb(246,108,198) 100%)", blendMode: "soft-light", blur: 36 },
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

  /* ── VIVID ── */

  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    category: "aura",
    mood: "vivid",
    desc: "Emerald arc into electric violet",
    dark: false,
    text: "#1a4a3e",
    base: "#f2faf6",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,255,166,0.12) 28%, rgb(255,255,255) 18%, rgb(61,200,255) 68%, rgb(139,92,246) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,255,166,0.22) 34%, rgb(255,255,255) 66%, rgb(61,200,255) 82%, rgb(139,92,246) 100%)", blendMode: "soft-light", blur: 36 },
    ],
  },
  {
    id: "nebula-void",
    name: "Nebula Void",
    category: "aura",
    mood: "vivid",
    desc: "Cosmic dust swirling through deep space",
    dark: true,
    text: "#e0d4ff",
    base: "#08060a",
    layers: [
      { background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgb(10,10,15) 0%, rgb(40,20,60) 40%, rgb(100,40,180) 70%, rgb(60,100,255) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "radial-gradient(ellipse 105% 105% at 50% -5%, rgb(12,12,18) 0%, rgb(45,25,65) 42%, rgb(110,45,190) 72%, rgb(65,105,255) 100%)", blendMode: "soft-light", blur: 36 },
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
        blur: 80,
        opacity: 1,
      },
      {
        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 138, 255, 0.9) 40%, rgb(255, 255, 255) 70%, rgb(247, 164, 66) 80%, rgb(233, 66, 247) 100%)",
        blendMode: "soft-light",
        blur: 80,
        opacity: 1,
      },
      {
        background: "linear-gradient(to top, rgb(0, 0, 31) 0%, rgba(0, 0, 31, 0.99) 8.1%, rgba(0, 0, 31, 0.953) 15.5%, rgba(0, 0, 31, 0.894) 22.5%, rgba(0, 0, 31, 0.824) 29%, rgba(0, 0, 31, 0.74) 35.3%, rgba(0, 0, 31, 0.647) 41.2%, rgba(0, 0, 31, 0.55) 47.1%, rgba(0, 0, 31, 0.45) 52.9%, rgba(0, 0, 31, 0.353) 58.8%, rgba(0, 0, 31, 0.26) 64.7%, rgba(0, 0, 31, 0.176) 71%, rgba(0, 0, 31, 0.106) 77.5%, rgba(0, 0, 31, 0.047) 84.5%, rgba(0, 0, 31, 0.01) 91.9%, rgba(0, 0, 31, 0) 100%)",
        blendMode: "normal",
        blur: 0,
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
        blur: 80,
        opacity: 1,
      },
      {
        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 138, 255, 0.9) 40%, rgb(255, 255, 255) 70%, rgb(247, 164, 66) 80%, rgb(233, 66, 247) 100%)",
        blendMode: "soft-light",
        blur: 80,
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
    desc: "Horizonte ámbar que se disuelve en dusk rosa-violeta",
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
    desc: "Horizonte cian helado que se funde en rosa pálido",
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
    desc: "Horizonte cian eléctrico sangrando hacia magenta neón",
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
    desc: "Horizonte rojo profundo derritiéndose en oro ámbar",
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
    desc: "Horizonte índigo que se abre en lavanda y rosa",
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

  /* ── MESH - Multi-point radial gradient compositions ── */

  {
    id: "mesh-sakura",
    name: "Sakura Fields",
    category: "mesh",
    mood: "warm",
    desc: "Cherry blossom pink mesh with warm peach nodes",
    dark: false,
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
    id: "mesh-golden-coast",
    name: "Golden Coast",
    category: "mesh",
    mood: "warm",
    desc: "Sunset beach mesh with amber and coral nodes",
    dark: false,
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
    id: "mesh-lavender-haze",
    name: "Lavender Haze",
    category: "mesh",
    mood: "vivid",
    desc: "Soft purple mesh with lilac and mauve nodes",
    dark: false,
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
    id: "mesh-citrine",
    name: "Citrine Mesh",
    category: "mesh",
    mood: "warm",
    desc: "Sunlit yellow-gold mesh with amber nodes",
    dark: false,
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
    id: "celestial-drift",
    name: "Celestial Drift",
    category: "mesh",
    mood: "vivid",
    desc: "Mesh cósmico pastel con nodos lavanda y menta bajo estrellas tenues",
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

  /* ── NEBULA - Floating orbs / blobs ── */

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
    id: "nebula-supernova",
    name: "Supernova",
    category: "nebula",
    mood: "warm",
    desc: "Explosive amber and crimson orbs",
    dark: false,
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
    text: "#064e3b",
    base: "#ecfdf5",
    layers: [
      { background: "radial-gradient(ellipse 40% 45% at 30% 40%, rgba(52,211,153,0.7) 0%, transparent 65%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(ellipse 35% 40% at 65% 55%, rgba(20,184,166,0.5) 0%, transparent 60%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 25% 30% at 75% 25%, rgba(110,231,183,0.4) 0%, transparent 55%)", blendMode: "normal", blur: 50 },
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
    id: "nebula-rose-quartz",
    name: "Rose Quartz",
    category: "nebula",
    mood: "warm",
    desc: "Delicate pink and blush floating orbs",
    dark: false,
    text: "#831843",
    base: "#fff1f2",
    layers: [
      { background: "radial-gradient(ellipse 45% 50% at 35% 45%, rgba(251,113,133,0.6) 0%, transparent 60%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 30% 35% at 70% 35%, rgba(244,114,182,0.5) 0%, transparent 55%)", blendMode: "normal", blur: 55 },
      { background: "radial-gradient(ellipse 35% 40% at 55% 75%, rgba(253,164,175,0.4) 0%, transparent 50%)", blendMode: "normal", blur: 60 },
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

  /* ── PRISM - Conic / prismatic / rainbow effects ── */

  {
    id: "prism-rainbow-flare",
    name: "Rainbow Flare",
    category: "prism",
    mood: "vivid",
    desc: "Full spectrum conic burst",
    dark: false,
    text: "#3b1f6e",
    base: "#fafafa",
    layers: [
      { background: "conic-gradient(from 180deg at 50% 60%, #f43f5e, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #f43f5e)", blendMode: "soft-light", blur: 80 },
      { background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)", blendMode: "overlay", blur: 40 },
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
    id: "prism-crystal-edge",
    name: "Crystal Edge",
    category: "prism",
    mood: "cool",
    desc: "Angular prism refraction with blue-violet",
    dark: false,
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
    text: "#fef3c7",
    base: "#0c0502",
    layers: [
      { background: "conic-gradient(from 90deg at 50% 65%, #f59e0b, #ef4444, #f97316, #fbbf24, #f59e0b)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 60%, rgba(251,191,36,0.4) 0%, transparent 45%)", blendMode: "screen", blur: 50 },
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
    desc: "Fragmento cónico con tonos de aurora atravesando el espacio profundo",
    dark: true,
    text: "#d5f5ff",
    base: "#07080f",
    layers: [
      { background: "conic-gradient(from 210deg at 50% 55%, #14b8a6, #6366f1, #ec4899, #22d3ee, #14b8a6)", blendMode: "screen", blur: 65 },
      { background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 50%)", blendMode: "multiply", blur: 20 },
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
    desc: "Vacío índigo con un resplandor distante y estrellas dispersas",
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
    desc: "Halo magenta brillando a través de un campo de estrellas lejanas",
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
    desc: "Nubes de nebulosa teal y magenta a la deriva entre polvo estelar",
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
    desc: "Resplandor azul-blanco frío bajo un denso campo estelar",
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

  /* ── BEAMS - Light shafts through darkness ── */
  {
    id: "emerald-beams",
    name: "Emerald Beams",
    category: "aura",
    mood: "cool",
    desc: "Verdant light shafts through deep forest",
    dark: true,
    text: "#c8f0d8",
    base: "#060f0a",
    grain: true,
    layers: [
      { background: "repeating-linear-gradient(100deg, rgba(40,100,70,0.5) 0%, rgba(30,80,55,0.25) 3%, transparent 5%, transparent 8%, rgba(35,90,60,0.35) 10%, rgba(40,100,70,0.5) 12%)", blendMode: "screen", blur: 24, opacity: 0.6 },
      { background: "radial-gradient(55% 55% at 50% 55%, rgba(45,120,85,0.4) 0%, transparent 100%)", blendMode: "soft-light", blur: 40, opacity: 0.8 },
      { background: "repeating-linear-gradient(100deg, rgba(80,180,130,0.12) 0%, rgba(60,150,100,0.08) 2%, transparent 4%, rgba(70,160,110,0.06) 5%, transparent 7%)", blendMode: "overlay", blur: 16, opacity: 0.5 },
    ],
  },
  {
    id: "midnight-beams",
    name: "Midnight Beams",
    category: "aura",
    mood: "cool",
    desc: "Indigo rays slicing through midnight",
    dark: true,
    text: "#c4c8f0",
    base: "#080a14",
    grain: true,
    layers: [
      { background: "repeating-linear-gradient(100deg, rgba(50,55,100,0.5) 0%, rgba(40,45,80,0.25) 3%, transparent 5%, transparent 8%, rgba(45,50,90,0.35) 10%, rgba(50,55,100,0.5) 12%)", blendMode: "screen", blur: 24, opacity: 0.6 },
      { background: "radial-gradient(55% 55% at 50% 55%, rgba(55,65,130,0.4) 0%, transparent 100%)", blendMode: "soft-light", blur: 40, opacity: 0.8 },
      { background: "repeating-linear-gradient(100deg, rgba(100,110,200,0.12) 0%, rgba(80,90,170,0.08) 2%, transparent 4%, rgba(90,100,185,0.06) 5%, transparent 7%)", blendMode: "overlay", blur: 16, opacity: 0.5 },
    ],
  },
  {
    id: "amber-beams",
    name: "Amber Beams",
    category: "aura",
    mood: "warm",
    desc: "Golden shafts through smoked glass",
    dark: true,
    text: "#f5e6c8",
    base: "#0f0a04",
    grain: true,
    layers: [
      { background: "repeating-linear-gradient(100deg, rgba(120,90,40,0.5) 0%, rgba(100,75,30,0.25) 3%, transparent 5%, transparent 8%, rgba(110,82,35,0.35) 10%, rgba(120,90,40,0.5) 12%)", blendMode: "screen", blur: 24, opacity: 0.6 },
      { background: "radial-gradient(55% 55% at 50% 55%, rgba(140,105,45,0.4) 0%, transparent 100%)", blendMode: "soft-light", blur: 40, opacity: 0.8 },
      { background: "repeating-linear-gradient(100deg, rgba(200,160,80,0.12) 0%, rgba(180,140,60,0.08) 2%, transparent 4%, rgba(190,150,70,0.06) 5%, transparent 7%)", blendMode: "overlay", blur: 16, opacity: 0.5 },
    ],
  },
  {
    id: "platinum-beams",
    name: "Platinum Beams",
    category: "aura",
    mood: "cool",
    desc: "Silver light refracting through crystal",
    dark: true,
    text: "#e8e8f0",
    base: "#0a0a0f",
    grain: true,
    layers: [
      { background: "repeating-linear-gradient(100deg, rgba(80,80,100,0.5) 0%, rgba(65,65,85,0.25) 3%, transparent 5%, transparent 8%, rgba(72,72,92,0.35) 10%, rgba(80,80,100,0.5) 12%)", blendMode: "screen", blur: 24, opacity: 0.6 },
      { background: "radial-gradient(55% 55% at 50% 55%, rgba(90,90,120,0.4) 0%, transparent 100%)", blendMode: "soft-light", blur: 40, opacity: 0.8 },
      { background: "repeating-linear-gradient(100deg, rgba(150,150,180,0.12) 0%, rgba(130,130,160,0.08) 2%, transparent 4%, rgba(140,140,170,0.06) 5%, transparent 7%)", blendMode: "overlay", blur: 16, opacity: 0.5 },
    ],
  },
  {
    id: "teal-beams",
    name: "Teal Beams",
    category: "aura",
    mood: "cool",
    desc: "Abyssal light filtering through deep water",
    dark: true,
    text: "#c8f0f0",
    base: "#040f0f",
    grain: true,
    layers: [
      { background: "repeating-linear-gradient(100deg, rgba(30,80,80,0.5) 0%, rgba(25,65,65,0.25) 3%, transparent 5%, transparent 8%, rgba(28,72,72,0.35) 10%, rgba(30,80,80,0.5) 12%)", blendMode: "screen", blur: 24, opacity: 0.6 },
      { background: "radial-gradient(55% 55% at 50% 55%, rgba(35,95,95,0.4) 0%, transparent 100%)", blendMode: "soft-light", blur: 40, opacity: 0.8 },
      { background: "repeating-linear-gradient(100deg, rgba(60,160,160,0.12) 0%, rgba(50,140,140,0.08) 2%, transparent 4%, rgba(55,150,150,0.06) 5%, transparent 7%)", blendMode: "overlay", blur: 16, opacity: 0.5 },
    ],
  },
  {
    id: "magenta-beams",
    name: "Magenta Beams",
    category: "aura",
    mood: "vivid",
    desc: "Neon pink slicing through the dark",
    dark: true,
    text: "#f0c8f0",
    base: "#0f040f",
    grain: true,
    layers: [
      { background: "repeating-linear-gradient(100deg, rgba(100,30,80,0.5) 0%, rgba(80,25,65,0.25) 3%, transparent 5%, transparent 8%, rgba(90,28,72,0.35) 10%, rgba(100,30,80,0.5) 12%)", blendMode: "screen", blur: 24, opacity: 0.6 },
      { background: "radial-gradient(55% 55% at 50% 55%, rgba(120,35,95,0.4) 0%, transparent 100%)", blendMode: "soft-light", blur: 40, opacity: 0.8 },
      { background: "repeating-linear-gradient(100deg, rgba(200,60,160,0.12) 0%, rgba(170,50,135,0.08) 2%, transparent 4%, rgba(185,55,148,0.06) 5%, transparent 7%)", blendMode: "overlay", blur: 16, opacity: 0.5 },
    ],
  },
  /* ── GRAIN - Gradient + SVG noise texture ── */

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
    id: "grain-desert-sand",
    name: "Desert Sand",
    category: "grain",
    mood: "warm",
    desc: "Warm beige with gritty film texture",
    dark: false,
    text: "#78350f",
    base: "#fefce8",
    grain: true,
    layers: [
      { background: "linear-gradient(155deg, #fef9c3 0%, #fde68a 40%, #fcd34d 70%, #fbbf24 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 50% 40%, rgba(245,158,11,0.2) 0%, transparent 55%)", blendMode: "soft-light", blur: 30 },
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
    id: "grain-concrete",
    name: "Concrete Grain",
    category: "grain",
    mood: "cool",
    desc: "Cool concrete gray with fine analog texture",
    dark: false,
    text: "#3f3f46",
    base: "#f4f4f5",
    grain: true,
    layers: [
      { background: "linear-gradient(150deg, #e4e4e7 0%, #d4d4d8 40%, #a1a1aa 70%, #71717a 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 50% 40%, rgba(113,113,122,0.2) 0%, transparent 55%)", blendMode: "soft-light", blur: 30 },
    ],
  },
  {
    id: "grain-cosmic-ash",
    name: "Cosmic Ash",
    category: "grain",
    mood: "cool",
    desc: "Grano carbón e índigo con un sutil trasfondo violeta",
    dark: true,
    text: "#d6d0f0",
    base: "#0d0b16",
    grain: true,
    layers: [
      { background: "linear-gradient(140deg, #0d0b16 0%, #1e1b32 40%, #312e4d 70%, #433f68 100%)", blendMode: "normal", blur: 0 },
      { background: "radial-gradient(circle at 55% 40%, rgba(129,140,248,0.25) 0%, transparent 50%)", blendMode: "screen", blur: 45 },
    ],
  },
  /* ── GLASS - Frosted refraction backgrounds ── */

  {
    id: "glass-arctic-frost",
    name: "Arctic Frost",
    category: "glass",
    mood: "cool",
    desc: "Frosted glass with blue-cyan refraction",
    dark: false,
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
    id: "glass-rose-window",
    name: "Rose Window",
    category: "glass",
    mood: "warm",
    desc: "Stained glass with rose and amber refractions",
    dark: false,
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
    desc: "Vidrio esmerilado oscuro en azul-violeta con luz estelar embebida",
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

  /* ── FLUX - Organic blobs / morphing shapes ── */

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
    id: "flux-bubblegum",
    name: "Bubblegum",
    category: "flux",
    mood: "vivid",
    desc: "Playful pink, purple and mint blob composition",
    dark: false,
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
    id: "flux-cloud-nine",
    name: "Cloud Nine",
    category: "flux",
    mood: "warm",
    desc: "Soft peach and cream organic cloudscape",
    dark: false,
    text: "#9a3412",
    base: "#fff7ed",
    layers: [
      { background: "radial-gradient(ellipse 55% 45% at 30% 50%, rgba(253,186,116,0.6) 0%, transparent 60%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(ellipse 45% 55% at 65% 40%, rgba(251,146,60,0.45) 0%, transparent 55%)", blendMode: "normal", blur: 65 },
      { background: "radial-gradient(ellipse 40% 35% at 50% 70%, rgba(254,215,170,0.5) 0%, transparent 50%)", blendMode: "normal", blur: 55 },
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
    desc: "Blobs orgánicos magenta, teal y violeta a la deriva como nubes de nebulosa",
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

  /* ── LATTICE - Geometric patterns with gradient overlays ── */

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
    id: "lattice-light-weave",
    name: "Light Weave",
    category: "lattice",
    mood: "cool",
    desc: "Delicate grid on soft blue with subtle glow",
    dark: false,
    text: "#1e3a5f",
    base: "#f0f9ff",
    layers: [
      { background: "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)", blendMode: "normal", blur: 0, opacity: 1, backgroundSize: "40px 40px" },
      { background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.25) 0%, transparent 50%)", blendMode: "normal", blur: 60 },
      { background: "radial-gradient(circle at 30% 70%, rgba(99,102,241,0.15) 0%, transparent 40%)", blendMode: "normal", blur: 50 },
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
    desc: "Grilla fina sobre azul marino profundo, salpicada de puntos brillantes",
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

export const MOODS: ("all" | GradientMood)[] = ["all", "warm", "cool", "vivid"];

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
