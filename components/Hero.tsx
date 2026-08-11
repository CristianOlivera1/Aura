"use client";

import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { useReveal } from "@/hooks/useReveal";
import { GitHubBadge } from "@/components/ui/GitHubBadge";
import { GITHUB_URL } from "@/lib/constants";

export function Hero() {
  const { active } = useGradients();
  const pillRef = useReveal<HTMLSpanElement>({ stagger: 0 });
  const h1Ref = useReveal<HTMLHeadingElement>({ stagger: 1 });
  const pRef = useReveal<HTMLParagraphElement>({ stagger: 2 });
  const ctaRef = useReveal<HTMLDivElement>({ stagger: 3 });

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-24 sm:py-32 flex flex-col items-center text-center">
        <span
          ref={pillRef}
          className="reveal glass inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-base shadow-lg transition-all duration-300 border border-muted text-muted-fg mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-medium text-fg">Layered gradients</span>
          <span className="text-muted-fg">· CSS blend modes</span>
          <Icon icon="lucide:sparkles" width={14} height={14} className="text-accent" />
        </span>

        <h1
          ref={h1Ref}
          className="reveal font-semibold text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-3xl"
        >
          Backgrounds that feel{" "}
          <span className="italic text-accent">like light.</span>
        </h1>

        <p
          ref={pRef}
          className="reveal mt-6 text-xl text-muted-fg max-w-lg"
          style={active ? { color: active.text } : undefined}
        >
          Aura is a small, growing set of ambient gradients built from layered
          blend modes — soft, atmospheric, and easy to drop behind any
          interface. Preview one below and the whole page picks up its glow.
        </p>

        <div ref={ctaRef} className="reveal flex flex-wrap justify-center gap-3 mt-10">
          <a
            href="#gradients"
            className="bg-accent text-accent-fg px-6 py-2.5 text-base font-medium hover:opacity-90 transition-opacity squircle-element"
          >
            Browse gradients
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass border border-muted px-6 py-2.5 text-base font-medium flex items-center gap-2 hover:border-accent hover:text-accent transition-colors squircle-element"
          >
            <Icon icon="lucide:github" width={15} height={15} />
            Star on GitHub
            <GitHubBadge />
          </a>
        </div>
      </div>
    </section>
  );
}
