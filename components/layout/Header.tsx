"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { GitHubBadge } from "@/components/ui/GitHubBadge";
import { GITHUB_URL } from "@/lib/constants";
import Link from "next/link";

export function Logo({ size = "md" }: { size?: "md" | "sm" }) {
  // Definimos la altura del contenedor según el tamaño: md (40px / h-10) o sm (24px / h-6)
  // Usamos h- en lugar de size- para permitir que el ancho se adapte libremente a la imagen original
  const isMedium = size === "md";
  const heightClass = isMedium ? "h-10" : "h-6";

  return (
    <div className={`relative ${heightClass} w-auto shrink-0`}>
      <Image
        src="/images/metadata/aura.webp"
        alt="Aura Logo"
        width={100}
        height={100}
        priority
        className="h-full w-auto object-contain"
      />
    </div>
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
        <Link href="/" className="flex items-center gap-0.5">
          <Logo />
          <span className="text-3xl tracking-tight font-black italic">AURA</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
            className="glass border border-muted flex items-center justify-center w-9 h-9 hover:border-accent hover:text-accent transition-colors squircle-element"
          >
            <span key={isDark ? "moon" : "sun"} className="theme-icon-enter">
              <Icon icon={isDark ? "lucide:moon" : "lucide:sun"} width={16} height={16} />
            </span>
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass border border-muted flex items-center gap-2 h-9 px-3 text-sm hover:border-accent hover:text-accent transition-colors squircle-element"
          >
            <Icon icon="lucide:github" width={15} height={15} />
            <GitHubBadge className="text-sm" />
          </a>
        </div>
      </div>
    </header>
  );
}
