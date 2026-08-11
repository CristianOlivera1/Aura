"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { GitHubBadge } from "@/components/ui/GitHubBadge";
import { GITHUB_URL } from "@/lib/constants";

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-muted"
          : "border-b border-transparent bg-transparent"
      }`}
    >
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
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass border border-muted flex items-center gap-2 h-9 px-3 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Icon icon="lucide:github" width={15} height={15} />
            <GitHubBadge className="text-sm" />
          </a>
        </div>
      </div>
    </header>
  );
}
