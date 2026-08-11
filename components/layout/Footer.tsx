"use client";

import { CONIC_GRADIENT, GITHUB_URL } from "@/lib/constants";
import { Logo } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { GitHubBadge } from "@/components/ui/GitHubBadge";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Borde superior lineal visible con desvanecimiento en los extremos */}
      <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />

      <div className="pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 rounded-full blur-[100px] opacity-40" style={{ background: CONIC_GRADIENT }} />
      <div className="mx-auto max-w-7xl w-full px-6 py-14 relative z-10">
        <div className="flex items-center gap-2.5">
          <Logo size="sm" />
          <span className="font-semibold text-lg">Aura</span>
        </div>
        <p className="text-lg text-muted-fg mt-3 max-w-md">
          A small library of ambient gradient backgrounds. Free and open source — animated and customizable gradients are on the way.
        </p>
        <Button
          variant="glass"
          size="md"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          icon="lucide:github"
          className="mt-6"
        >
          Star on GitHub <span className="text-lg text-muted-fg">· </span>
          <GitHubBadge className="text-lg text-muted-fg" />
        </Button>
      </div>
    </footer>
  );
}