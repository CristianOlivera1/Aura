"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";

/**
 * Floating "Back to gallery" pill shown after a gradient is previewed from the
 * grid. Restores the exact scroll position where the user selected the card.
 * Auto-dismisses when the user scrolls down on their own past the hero fold.
 */
export function BackToGalleryButton() {
  const { previewReturn, backToGallery, dismissPreviewReturn } = useGradients();

  useEffect(() => {
    if (!previewReturn) return;

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Only dismiss on downward scroll past the hero fold (the smooth scroll
      // up to the hero moves upward, so it never triggers a dismiss).
      if (y > lastY && y > window.innerHeight * 0.3) {
        dismissPreviewReturn();
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [previewReturn, dismissPreviewReturn]);

  if (!previewReturn) return null;

  return (
    <button
      onClick={backToGallery}
      className="fixed bottom-24 right-20 z-40 flex items-center gap-2 glass border border-muted pl-3 pr-4 h-10 rounded-full text-sm font-medium shadow-lg hover:border-accent hover:text-accent transition-colors"
    >
      <Icon icon="lucide:arrow-down" width={14} height={14} />
      Back to gallery
    </button>
  );
}
