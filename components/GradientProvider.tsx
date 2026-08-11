"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { GRADIENTS, type Gradient, type Layer } from "@/lib/gradients";

/* ── Customization state ── */

interface CustomState {
  layers: Layer[];
  base: string;
  grain: boolean;
  history: Layer[][];
}

type CustomAction =
  | { type: "INIT"; layers: Layer[]; base: string; grain: boolean }
  | { type: "UPDATE_LAYER"; index: number; layer: Layer }
  | { type: "ADD_LAYER"; layer: Layer }
  | { type: "REMOVE_LAYER"; index: number }
  | { type: "REORDER"; from: number; to: number }
  | { type: "SET_BASE"; base: string }
  | { type: "SET_GRAIN"; grain: boolean }
  | { type: "UNDO" }
  | { type: "RESET"; layers: Layer[]; base: string; grain: boolean };

function customReducer(state: CustomState, action: CustomAction): CustomState {
  switch (action.type) {
    case "INIT":
      return { layers: action.layers, base: action.base, grain: action.grain, history: [] };

    case "UPDATE_LAYER": {
      const layers = [...state.layers];
      layers[action.index] = action.layer;
      return { ...state, layers, history: [...state.history, state.layers] };
    }
    case "ADD_LAYER":
      return {
        ...state,
        layers: [...state.layers, action.layer],
        history: [...state.history, state.layers],
      };
    case "REMOVE_LAYER": {
      const layers = state.layers.filter((_, i) => i !== action.index);
      return { ...state, layers, history: [...state.history, state.layers] };
    }
    case "REORDER": {
      const layers = [...state.layers];
      const [moved] = layers.splice(action.from, 1);
      layers.splice(action.to, 0, moved);
      return { ...state, layers, history: [...state.history, state.layers] };
    }
    case "SET_BASE":
      return { ...state, base: action.base };
    case "SET_GRAIN":
      return { ...state, grain: action.grain };
    case "UNDO": {
      if (state.history.length === 0) return state;
      const history = [...state.history];
      const prev = history.pop()!;
      return { ...state, layers: prev, history };
    }
    case "RESET":
      return { layers: action.layers, base: action.base, grain: action.grain, history: [] };
  }
}

/* ── Context ── */

interface GradientContextValue {
  active: Gradient | null;
  isDark: boolean;
  fullscreen: boolean;
  toggleFullscreen: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
  themeOverride: "light" | "dark" | null;
  toggleTheme: () => void;
  apply: (id: string) => void;
  reset: () => void;
  goNext: () => void;
  goPrev: () => void;
  /* ── Customizer ── */
  custom: CustomState;
  dispatchCustom: React.Dispatch<CustomAction>;
  effectiveLayers: Layer[];
  effectiveBase: string;
  effectiveGrain: boolean;
}

const GradientContext = createContext<GradientContextValue | null>(null);

export function GradientProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(GRADIENTS[0].id);
  const [fullscreen, setFullscreen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [themeOverride, setThemeOverride] = useState<"light" | "dark" | null>(null);

  const active = useMemo(
    () => GRADIENTS.find((g) => g.id === activeId) ?? null,
    [activeId],
  );

  /* ── Customizer reducer ── */
  const [custom, dispatchCustom] = useReducer(customReducer, {
    layers: active?.layers ?? [],
    base: active?.base ?? "#0c0a08",
    grain: active?.grain ?? false,
    history: [],
  });

  // Re-initialize custom state when active gradient changes
  useEffect(() => {
    if (active) {
      dispatchCustom({
        type: "INIT",
        layers: active.layers,
        base: active.base,
        grain: active.grain ?? false,
      });
    }
  }, [active]);

  const effectiveLayers = custom.layers;
  const effectiveBase = custom.base;
  const effectiveGrain = custom.grain;

  // Compute effective theme
  const effectiveLight = themeOverride
    ? themeOverride === "light"
    : active
      ? !active.dark
      : true;

  useEffect(() => {
    document.documentElement.classList.toggle("light", effectiveLight);
  }, [effectiveLight]);

  const showToast = useCallback((msg: string) => setToast(msg), []);
  const clearToast = useCallback(() => setToast(null), []);

  const goNext = useCallback(() => {
    if (!active) return;
    const idx = GRADIENTS.findIndex((g) => g.id === active.id);
    const next = GRADIENTS[(idx + 1) % GRADIENTS.length];
    setActiveId(next.id);
    setThemeOverride(null);
  }, [active]);

  const goPrev = useCallback(() => {
    if (!active) return;
    const idx = GRADIENTS.findIndex((g) => g.id === active.id);
    const prev = GRADIENTS[(idx - 1 + GRADIENTS.length) % GRADIENTS.length];
    setActiveId(prev.id);
    setThemeOverride(null);
  }, [active]);

  const value = useMemo<GradientContextValue>(
    () => ({
      active,
      isDark: !effectiveLight,
      fullscreen,
      toggleFullscreen: () => setFullscreen((f) => !f),
      toast,
      showToast,
      clearToast,
      themeOverride,
      toggleTheme: () =>
        setThemeOverride((prev) => {
          if (prev === null) return effectiveLight ? "dark" : "light";
          return prev === "light" ? "dark" : "light";
        }),
      apply: (id) => {
        setActiveId(id);
        setThemeOverride(null);
      },
      reset: () => {
        setActiveId(null);
        setThemeOverride(null);
      },
      goNext,
      goPrev,
      custom,
      dispatchCustom,
      effectiveLayers,
      effectiveBase,
      effectiveGrain,
    }),
    [active, effectiveLight, fullscreen, toast, showToast, clearToast, themeOverride, goNext, goPrev, custom, effectiveLayers, effectiveBase, effectiveGrain],
  );

  return (
    <GradientContext.Provider value={value}>{children}</GradientContext.Provider>
  );
}

export function useGradients() {
  const ctx = useContext(GradientContext);
  if (!ctx) {
    throw new Error("useGradients must be used within a GradientProvider");
  }
  return ctx;
}
