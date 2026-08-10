export type GradientMood = "warm" | "cool" | "vivid";

export interface Gradient {
  id: string;
  name: string;
  mood: GradientMood;
  desc: string;
  dark: boolean;
  /** Color del texto sin fondo (p. ej. párrafo del hero) legible sobre el gradiente */
  text: string;
  hard: string;
  soft: string;
}

export const GRADIENTS: Gradient[] = [
  {
    id: "sunrise-drift",
    name: "Sunrise Drift",
    mood: "vivid",
    desc: "Blue into orange, high key",
    dark: false,
    text: "#24406e",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,138,255,0.1) 30%, rgb(255,255,255) 20%, rgb(247,164,66) 70%, rgb(233,66,247) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,138,255,0.2) 35%, rgb(255,255,255) 70%, rgb(247,164,66) 80%, rgb(233,66,247) 100%)",
  },
  {
    id: "ember-glow",
    name: "Ember Glow",
    mood: "warm",
    desc: "Coral into deep rose",
    dark: false,
    text: "#7a1f2e",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,106,61,0.12) 28%, rgb(255,255,255) 18%, rgb(255,201,77) 68%, rgb(255,61,119) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(255,106,61,0.22) 34%, rgb(255,255,255) 66%, rgb(255,201,77) 82%, rgb(255,61,119) 100%)",
  },
  {
    id: "glacier-mist",
    name: "Glacier Mist",
    mood: "cool",
    desc: "Cyan into indigo",
    dark: false,
    text: "#1f3b6e",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,210,255,0.12) 28%, rgb(255,255,255) 18%, rgb(53,230,192) 68%, rgb(91,110,245) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(77,210,255,0.22) 34%, rgb(255,255,255) 66%, rgb(53,230,192) 82%, rgb(91,110,245) 100%)",
  },
  {
    id: "deep-lagoon",
    name: "Deep Lagoon",
    mood: "cool",
    desc: "Teal into violet",
    dark: true,
    text: "#d9f4ec",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(47,209,166,0.12) 28%, rgb(255,255,255) 18%, rgb(61,124,255) 68%, rgb(122,92,255) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(47,209,166,0.22) 34%, rgb(255,255,255) 66%, rgb(61,124,255) 82%, rgb(122,92,255) 100%)",
  },
  {
    id: "orchid-bloom",
    name: "Orchid Bloom",
    mood: "vivid",
    desc: "Magenta into blue",
    dark: false,
    text: "#5b1f6e",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,61,224,0.12) 28%, rgb(255,255,255) 18%, rgb(139,92,246) 68%, rgb(61,139,255) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,61,224,0.22) 34%, rgb(255,255,255) 66%, rgb(139,92,246) 82%, rgb(61,139,255) 100%)",
  },
  {
    id: "amber-dusk",
    name: "Amber Dusk",
    mood: "warm",
    desc: "Amber into plum",
    dark: true,
    text: "#f3e3c3",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,179,61,0.12) 28%, rgb(255,255,255) 18%, rgb(198,90,46) 68%, rgb(109,63,174) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(242,179,61,0.22) 34%, rgb(255,255,255) 66%, rgb(198,90,46) 82%, rgb(109,63,174) 100%)",
  },
  {
    id: "arctic-aurora",
    name: "Arctic Aurora",
    mood: "cool",
    desc: "Emerald into violet",
    dark: true,
    text: "#d7f7ef",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(16,185,129,0.14) 28%, rgb(255,255,255) 18%, rgb(6,182,212) 60%, rgb(124,58,237) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(16,185,129,0.24) 34%, rgb(255,255,255) 66%, rgb(6,182,212) 78%, rgb(124,58,237) 100%)",
  },
  {
    id: "peach-sorbet",
    name: "Peach Sorbet",
    mood: "warm",
    desc: "Peach into soft pink",
    dark: false,
    text: "#6e3a28",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(251,146,60,0.10) 28%, rgb(255,255,255) 18%, rgb(251,191,146) 62%, rgb(244,114,182) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(251,146,60,0.20) 34%, rgb(255,255,255) 66%, rgb(251,191,146) 80%, rgb(244,114,182) 100%)",
  },
  {
    id: "neon-pulse",
    name: "Neon Pulse",
    mood: "vivid",
    desc: "Electric cyan into magenta",
    dark: true,
    text: "#e0fbff",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(6,182,212,0.16) 28%, rgb(255,255,255) 18%, rgb(34,211,238) 58%, rgb(217,70,239) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(6,182,212,0.26) 34%, rgb(255,255,255) 66%, rgb(34,211,238) 76%, rgb(217,70,239) 100%)",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    mood: "warm",
    desc: "Gold into lavender",
    dark: false,
    text: "#5b3a1f",
    hard: "linear-gradient(rgba(0,0,0,0) 0%, rgba(245,158,11,0.12) 28%, rgb(255,255,255) 18%, rgb(252,211,77) 62%, rgb(167,139,250) 100%)",
    soft: "linear-gradient(rgba(0,0,0,0) 0%, rgba(245,158,11,0.22) 34%, rgb(255,255,255) 66%, rgb(252,211,77) 80%, rgb(167,139,250) 100%)",
  },
];

/** Generate copyable CSS for a gradient */
export function gradientToCSS(g: Gradient): string {
  return `/* ${g.name} — Aura */
background-color: ${g.dark ? "#0c0a08" : "#faf8f2"};

/* hard-light layer */
background-image: ${g.hard};
background-blend-mode: hard-light;

/* soft-light layer (apply to a pseudo-element or second div) */
/* ${g.soft} */
/* mix-blend-mode: soft-light; */`;
}

export const MOODS: ("all" | GradientMood)[] = ["all", "warm", "cool", "vivid"];
