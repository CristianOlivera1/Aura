"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { GRADIENTS, type Gradient, type Layer } from "@/lib/gradients";

/* ── Customization state ── */

interface CustomSnapshot {
  layers: Layer[];
  grain: boolean;
}

interface CustomState {
  layers: Layer[];
  grain: boolean;
  history: CustomSnapshot[];
  redo: CustomSnapshot[];
}

type CustomAction =
  | { type: "INIT"; layers: Layer[]; grain: boolean }
  | { type: "UPDATE_LAYER"; index: number; layer: Layer }
  | { type: "ADD_LAYER"; layer: Layer }
  | { type: "REMOVE_LAYER"; index: number }
  | { type: "REORDER"; from: number; to: number }
  | { type: "SET_GRAIN"; grain: boolean }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET"; layers: Layer[]; grain: boolean };

function takeSnapshot(state: CustomState): CustomSnapshot {
  return { layers: state.layers, grain: state.grain };
}

let layerIdCounter = 0;
function nextLayerId(): string {
  layerIdCounter += 1;
  return `layer-${layerIdCounter}`;
}

function customReducer(state: CustomState, action: CustomAction): CustomState {
  switch (action.type) {
    case "INIT":
      return {
        layers: action.layers.map((l) => ({ ...l, id: l.id ?? nextLayerId() })),
        grain: action.grain,
        history: [],
        redo: [],
      };

    case "UPDATE_LAYER": {
      const layers = [...state.layers];
      layers[action.index] = action.layer;
      return {
        ...state,
        layers,
        history: [...state.history, takeSnapshot(state)],
        redo: [],
      };
    }
    case "ADD_LAYER":
      return {
        ...state,
        layers: [...state.layers, { ...action.layer, id: action.layer.id ?? nextLayerId() }],
        history: [...state.history, takeSnapshot(state)],
        redo: [],
      };
    case "REMOVE_LAYER": {
      const layers = state.layers.filter((_, i) => i !== action.index);
      return {
        ...state,
        layers,
        history: [...state.history, takeSnapshot(state)],
        redo: [],
      };
    }
    case "REORDER": {
      const layers = [...state.layers];
      const [moved] = layers.splice(action.from, 1);
      layers.splice(action.to, 0, moved);
      return {
        ...state,
        layers,
        history: [...state.history, takeSnapshot(state)],
        redo: [],
      };
    }
    case "SET_GRAIN":
      return {
        ...state,
        grain: action.grain,
        history: [...state.history, takeSnapshot(state)],
        redo: [],
      };
    case "UNDO": {
      if (state.history.length === 0) return state;
      const history = [...state.history];
      const prev = history.pop()!;
      return {
        ...state,
        layers: prev.layers,
        grain: prev.grain,
        history,
        redo: [...state.redo, takeSnapshot(state)],
      };
    }
    case "REDO": {
      if (state.redo.length === 0) return state;
      const redo = [...state.redo];
      const next = redo.pop()!;
      return {
        ...state,
        layers: next.layers,
        grain: next.grain,
        redo,
        history: [...state.history, takeSnapshot(state)],
      };
    }
    case "RESET":
      return { layers: action.layers, grain: action.grain, history: [], redo: [] };
  }
}

/* ── Context ── */

/* ── Toasts ── */

export interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error";
}

interface GradientContextValue {
  active: Gradient | null;
  isDark: boolean;
  fullscreen: boolean;
  toggleFullscreen: () => void;
  toasts: ToastItem[];
  showToast: (msg: string, type?: "success" | "error") => void;
  dismissToast: (id: number) => void;
  themeOverride: "light" | "dark" | null;
  toggleTheme: () => void;
  apply: (id: string) => void;
  reset: () => void;
  goNext: () => void;
  goPrev: () => void;
  random: () => void;
  /* ── Preview scroll UX ── */
  preview: (id: string) => void;
  previewReturn: { y: number } | null;
  backToGallery: () => void;
  dismissPreviewReturn: () => void;
  /** Increments every time the user returns to the gallery, to flash the active card */
  flashTick: number;
  /* ── Customizer ── */
  custom: CustomState;
  dispatchCustom: React.Dispatch<CustomAction>;
  effectiveLayers: Layer[];
  effectiveGrain: boolean;
}

const GradientContext = createContext<GradientContextValue | null>(null);

export function GradientProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(GRADIENTS[0].id);
  const [fullscreen, setFullscreen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [themeOverride, setThemeOverride] = useState<"light" | "dark" | null>("light");
  const [previewReturn, setPreviewReturn] = useState<{ y: number } | null>(null);
  const previewReturnRef = useRef<{ y: number } | null>(null);
  const [flashTick, setFlashTick] = useState(0);
  const toastId = useRef(0);

  const active = useMemo(
    () => GRADIENTS.find((g) => g.id === activeId) ?? null,
    [activeId],
  );

  /* ── Customizer reducer ── */
  const [custom, dispatchCustom] = useReducer(customReducer, {
    layers: active?.layers ?? [],
    grain: active?.grain ?? false,
    history: [],
    redo: [],
  });

  // Re-initialize custom state when active gradient changes
  useEffect(() => {
    if (active) {
      dispatchCustom({
        type: "INIT",
        layers: active.layers,
        grain: active.grain ?? false,
      });
    }
  }, [active]);

  const effectiveLayers = custom.layers;
  const effectiveGrain = custom.grain;

  // Compute effective theme
  const effectiveLight = themeOverride
    ? themeOverride === "light"
    : active
      ? !active.dark
      : true;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !effectiveLight);
  }, [effectiveLight]);

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, message: msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

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

  /* ── Preview scroll UX ── */

  const preview = useCallback((id: string) => {
    const y = typeof window !== "undefined" ? window.scrollY : 0;
    setActiveId(id);
    setThemeOverride(null);
    setPreviewReturn({ y });
    previewReturnRef.current = { y };
    window.history.pushState(null, "", `?gradient=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const backToGallery = useCallback(() => {
    if (previewReturn) {
      window.scrollTo({ top: previewReturn.y, behavior: "smooth" });
    }
    setPreviewReturn(null);
    previewReturnRef.current = null;
    setFlashTick((t) => t + 1);
  }, [previewReturn]);

  const dismissPreviewReturn = useCallback(() => {
    setPreviewReturn(null);
    previewReturnRef.current = null;
  }, []);

  /* ── Random / shuffle ── */

  const random = useCallback(() => {
    const pool = GRADIENTS.filter((g) => g.id !== activeId);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    setActiveId(pick.id);
    setThemeOverride(null);
  }, [activeId]);

  /* ── Deep-linking: keep the selected gradient in sync with the URL ── */

  const syncFromURL = useCallback(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("g");
    if (id && GRADIENTS.some((g) => g.id === id)) {
      setActiveId(id);
      setThemeOverride(null);
    } else {
      setActiveId(GRADIENTS[0].id);
      setThemeOverride("light");
    }
  }, []);

  useEffect(() => {
    // Legit: sync the selected gradient from the URL once on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    syncFromURL();
    const onPopState = () => {
      const pending = previewReturnRef.current;
      syncFromURL();
      if (pending) {
        previewReturnRef.current = null;
        setPreviewReturn(null);
        window.scrollTo({ top: pending.y, behavior: "smooth" });
        setFlashTick((t) => t + 1);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [syncFromURL]);

  const value = useMemo<GradientContextValue>(
    () => ({
      active,
      isDark: !effectiveLight,
      fullscreen,
      toggleFullscreen: () => setFullscreen((f) => !f),
      toasts,
      showToast,
      dismissToast,
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
        const def = GRADIENTS[0];
        setActiveId(def.id);
        setThemeOverride("light");
        dispatchCustom({
          type: "RESET",
          layers: def.layers,
          grain: def.grain ?? false,
        });
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("g");
          window.history.replaceState(null, "", url);
        }
      },
      goNext,
      goPrev,
      random,
      preview,
      previewReturn,
      backToGallery,
      dismissPreviewReturn,
      flashTick,
      custom,
      dispatchCustom,
      effectiveLayers,
      effectiveGrain,
    }),
    [active, effectiveLight, fullscreen, toasts, showToast, dismissToast, themeOverride, goNext, goPrev, random, preview, previewReturn, backToGallery, dismissPreviewReturn, flashTick, custom, effectiveLayers, effectiveGrain],
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
