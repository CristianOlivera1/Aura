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

    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      el.classList.add("is-visible");
      observer?.disconnect();
    };

    // Content already on screen when the page loads must appear immediately,
    // without waiting for an IntersectionObserver tick. This keeps the first
    // block of hero + cards visible from the start.
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      reveal();
      return;
    }

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal();
        },
        { threshold, rootMargin },
      );
      observer.observe(el);
    } else {
      // No IO support: never leave content hidden.
      reveal();
    }

    return () => observer?.disconnect();
  }, [stagger, threshold, rootMargin]);

  return ref;
}