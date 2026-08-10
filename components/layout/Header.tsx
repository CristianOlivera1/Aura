"use client";

import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";

const CONIC_GRADIENT =
  "conic-gradient(from 200deg, #008AFF, #F7A442, #E942F7, #008AFF)";

export function Logo({ size = "md" }: { size?: "md" | "sm" }) {
  const box = size === "md" ? "w-6 h-6" : "w-5 h-5";
  return (
    <span className={`relative ${box} rounded-full shrink-0`} style={{ background: CONIC_GRADIENT, filter: "blur(0.2px)" }}>
      <span
        className={`absolute inset-0 rounded-full blur-[6px] opacity-70`}
        style={{ background: CONIC_GRADIENT }}
      />
    </span>
  );
}

export function Header() {
  const { isDark, toggleTheme } = useGradients();

  return (
    <header className="sticky top-0 z-50 border-b border-muted glass">
      <div className="mx-auto max-w-7xl w-full px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold text-lg tracking-tight">Aura</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
            className="glass border border-muted flex items-center justify-center w-9 h-9 hover:border-accent hover:text-accent transition-colors"
          >
            <span key={isDark ? "moon" : "sun"} className="theme-icon-enter">
              <Icon
                icon={isDark ? "lucide:moon" : "lucide:sun"}
                width={16}
                height={16}
              />
            </span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass border border-muted flex items-center gap-2 h-9 px-3 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Icon icon="lucide:github" width={15} height={15} />
            <span className="text-sm">648</span>
          </a>
         
        </div>
      </div>
    </header>
  );
}
