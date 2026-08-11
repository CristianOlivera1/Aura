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
   GRADIENTS — Premium multi-layer backgrounds
   ══════════════════════════════════════════════════════════════ */

export const GRADIENTS: Gradient[] = [

  /* ── AURA — Signature blend-mode atmospheric gradients ── */

  {
    id: "sunrise-drift",
    name: "Sunrise Drift",
    category: "aura",
    mood: "vivid",
    desc: "Blue into orange, high key",
    dark: false,
    text: "#24406e",
    base: "#0c0a08",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,138,255,0.1) 30%, rgb(255,255,255) 20%, rgb(247,164,66) 70%, rgb(233,66,247) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,138,255,0.2) 35%, rgb(255,255,255) 70%, rgb(247,164,66) 80%, rgb(233,66,247) 100%)", blendMode: "soft-light", blur: 36 },
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
    base: "#0c0a08",
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
    base: "#0c0a08",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,210,255,0.12) 28%, rgb(255,255,255) 18%, rgb(53,230,192) 68%, rgb(91,110,245) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,210,255,0.22) 34%, rgb(255,255,255) 66%, rgb(53,230,192) 82%, rgb(91,110,245) 100%)", blendMode: "soft-light", blur: 36 },
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
    id: "orchid-bloom",
    name: "Orchid Bloom",
    category: "aura",
    mood: "vivid",
    desc: "Magenta into blue",
    dark: false,
    text: "#5b1f6e",
    base: "#0c0a08",
    layers: [
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,61,224,0.12) 28%, rgb(255,255,255) 18%, rgb(139,92,246) 68%, rgb(61,139,255) 100%)", blendMode: "hard-light", blur: 36 },
      { background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,61,224,0.22) 34%, rgb(255,255,255) 66%, rgb(139,92,246) 82%, rgb(61,139,255) 100%)", blendMode: "soft-light", blur: 36 },
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

  /* ── MESH — Multi-point radial gradient compositions ── */

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

  /* ── NEBULA — Floating orbs / blobs ── */

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
    dark: true,
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

  /* ── PRISM — Conic / prismatic / rainbow effects ── */

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
    dark: true,
    text: "#fef3c7",
    base: "#0c0502",
    layers: [
      { background: "conic-gradient(from 90deg at 50% 65%, #f59e0b, #ef4444, #f97316, #fbbf24, #f59e0b)", blendMode: "screen", blur: 80 },
      { background: "radial-gradient(circle at 50% 60%, rgba(251,191,36,0.4) 0%, transparent 45%)", blendMode: "screen", blur: 50 },
    ],
  },

  /* ── GRAIN — Gradient + SVG noise texture ── */

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

  /* ── GLASS — Frosted refraction backgrounds ── */

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

  /* ── FLUX — Organic blobs / morphing shapes ── */

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

  /* ── LATTICE — Geometric patterns with gradient overlays ── */

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
  
];

/** Generate copyable CSS for a gradient */
export function gradientToCSS(g: Gradient): string {
  const layersCSS = g.layers
    .map((l, i) => `/* Layer ${i + 1} — ${l.blendMode} */\nbackground: ${l.background};\nmix-blend-mode: ${l.blendMode};\nfilter: blur(${l.blur}px);`)
    .join("\n\n");

  return `/* ${g.name} — Aura (${g.category}) */\n/* Base */\nbackground-color: ${g.base};\n\n${layersCSS}${g.grain ? "\n\n/* Grain: apply SVG feTurbulence noise overlay */" : ""}`;
}

export const MOODS: ("all" | GradientMood)[] = ["all", "warm", "cool", "vivid"];
