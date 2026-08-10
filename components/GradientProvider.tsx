"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { GRADIENTS, type Gradient } from "@/lib/gradients";

interface GradientContextValue {
  active: Gradient | null;
  isDark: boolean;
  /** Fullscreen preview state */
  fullscreen: boolean;
  toggleFullscreen: () => void;
  /** Toast */
  toast: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
  /** Theme */
  themeOverride: "light" | "dark" | null;
  toggleTheme: () => void;
  /** Gradient navigation */
  apply: (id: string) => void;
  reset: () => void;
  goNext: () => void;
  goPrev: () => void;
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

  // Compute effective theme: override > gradient-driven > default light
  const effectiveLight = themeOverride
    ? themeOverride === "light"
    : active
      ? !active.dark
      : true;

  // Drive the page theme from the active gradient or override
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
    }),
    [active, effectiveLight, fullscreen, toast, showToast, clearToast, themeOverride, goNext, goPrev],
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
