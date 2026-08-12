"use client";

import Link from "next/link";
import { CONIC_GRADIENT, GITHUB_URL } from "@/lib/constants";
import { Logo } from "@/components/layout/Header";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Borde superior lineal visible con desvanecimiento en los extremos */}
      <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />

      {/* Brillo de fondo */}
      <div 
        className="pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 rounded-full blur-[100px] opacity-40" 
        style={{ background: CONIC_GRADIENT }} 
      />

      <div className="mx-auto max-w-7xl w-full px-6 py-12 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        
        {/* Izquierda: Branding y Descripción */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="font-semibold text-lg">Aura</span>
          </div>
          <p className="text-sm text-muted-fg mt-4 leading-relaxed">
            A small library of ambient gradient backgrounds. Free and open source — animated and customizable gradients are on the way.
          </p>
        </div>

        {/* Derecha: Enlaces y Metadatos */}
        <div className="flex flex-col items-start md:items-end gap-3 text-sm text-muted-fg">
          <div className="flex items-center gap-4">
            <a 
              href={GITHUB_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-fg/40">·</span>
            <Link 
              href="/llms.txt" 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              llms.txt <span className="text-xs text-muted-fg/70">(AI)</span>
            </Link>
          </div>
          <p className="text-xs text-muted-fg/60">
            Built for the community.
          </p>
        </div>

      </div>
    </footer>
  );
}