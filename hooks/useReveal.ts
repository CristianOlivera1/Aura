"use client";

import { useEffect, useRef } from "react";

interface UseRevealOptions {
  /** Delay index for staggering (each unit = 80ms) */
  stagger?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Root margin */
  rootMargin?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const { stagger = 0, threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set stagger delay
    if (stagger > 0) {
      el.style.setProperty("--reveal-delay", `${stagger * 80}ms`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, threshold, rootMargin]);

  return ref;
}
