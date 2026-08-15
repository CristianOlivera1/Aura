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
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-24 sm:py-30 flex flex-col items-center text-center">
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
          <span className="italic text-accent">
            <span className="relative inline-block">
              like
              <img
                src="/svg/decorator-like.svg"
                alt=""
                aria-hidden="true"
                className="absolute -left-0.5 bottom-2 sm:bottom-3 w-2 sm:w-4 h-auto translate-y-[15%] -z-10 select-none pointer-events-none"
              />
            </span>{" "}
            light.
          </span>
        </h1>

        <p
          ref={pRef}
          className="reveal mt-6 text-xl text-muted-fg max-w-lg"
          style={active ? { color: active.text } : undefined}
        >
          Aura is a small, growing set of ambient gradients built from layered
          blend modes - soft, atmospheric, and easy to drop behind any
          interface.
        </p>

        <div ref={ctaRef} className="reveal relative flex flex-wrap justify-center gap-3 mt-10">

          <div className="absolute -top-4 -left-14 sm:-top-8 sm:-left-32 hidden sm:flex flex-col items-center -rotate-20 text-accent animate-pulse">
            <span className="text-sm mr-10 font-medium italic mb-1 tracking-wide">
              Try it out!
            </span>
            <img
              src="/svg/hero-arrow.svg"
              alt=""
              aria-hidden="true"
              className="w-12 h-12 drop-shadow-sm rotate-80 select-none pointer-events-none"
            />
          </div>

          <a
            href="#gradients"
            className="bg-accent text-accent-fg px-6 py-2.5 text-base font-medium hover:opacity-90 transition-opacity squircle-element z-10 relative"
          >
            Browse gradients
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass border border-muted px-6 py-2.5 text-base font-medium flex items-center gap-2 hover:border-accent hover:text-accent transition-colors squircle-element z-10 relative"
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