"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import { GradientCard } from "@/components/GradientCard";
import { useGradients } from "@/components/GradientProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GRADIENTS, CATEGORIES, type Category } from "@/lib/gradients";

type CategoryFilter = "all" | Category;

export function GradientsSection() {
  const { active, reset, random } = useGradients();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const q = query.trim().toLowerCase();
  const visible = GRADIENTS.filter(
    (g) =>
      (category === "all" || g.category === category) &&
      (!q || g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)),
  );

  /* Roving-tabindex keyboard nav for the category tabs */
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>, index: number) => {
      let next = -1;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (index + 1) % CATEGORIES.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = CATEGORIES.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const id = CATEGORIES[next].id as CategoryFilter;
      setCategory(id);
      catRefs.current[next]?.focus();
    },
    [],
  );

  /* Arrow-key navigation across the gradient cards */
  const handleGridKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const grid = e.currentTarget;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card]"));
    const idx = cards.indexOf(document.activeElement as HTMLElement);
    if (idx === -1) return;
    let next = -1;
    switch (e.key) {
      case "ArrowRight":
        next = idx + 1;
        break;
      case "ArrowLeft":
        next = idx - 1;
        break;
      case "ArrowDown":
      case "ArrowUp": {
        const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
        next = e.key === "ArrowDown" ? idx + cols : idx - cols;
        break;
      }
      case "Home":
        next = 0;
        break;
      case "End":
        next = cards.length - 1;
        break;
      default:
        return;
    }
    if (next < 0 || next >= cards.length) return;
    e.preventDefault();
    cards[next].focus();
  }, []);

  return (
    <section id="gradients">
      <div className="mx-auto max-w-7xl w-full px-6 pt-14 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-muted" />
              <span className="w-2 h-2 rounded-full bg-muted" />
            </div>
            <Badge className="text-[11px] uppercase tracking-[0.3em] text-muted-fg px-2.5">
              {visible.length} Backgrounds
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <Badge>
              <span className="text-sm sm:text-muted-fg">Previewing -</span>
              <span className="text-sm font-medium">{active?.name ?? "none"}</span>
            </Badge>
            <span className="w-px h-4 bg-muted mx-1" />
            <Button
              onClick={random}
              title="Random gradient"
              aria-label="Random gradient"
              size="icon-sm"
              icon="lucide:shuffle"
              iconSize={13}
            />
            <Button
              onClick={reset}
              title="Reset background"
              aria-label="Reset background"
              size="icon-sm"
              icon="lucide:rotate-ccw"
              iconSize={13}
            />
          </div>
        </div>

        {/* Category tabs + search */}
        <div className="flex flex-wrap items-center gap-3 max-w-full">
          <div
            role="tablist"
            aria-label="Gradient categories"
            onKeyDown={(e) => {
              const idx = CATEGORIES.findIndex((c) => c.id === category);
              if (idx !== -1) handleTabKeyDown(e, idx);
            }}
            // Cambios realizados aquí:
            // - `flex sm:inline-flex`: flex en móviles para tomar el ancho disponible, inline-flex en escritorio.
            // - `flex-nowrap sm:flex-wrap`: una sola línea en móviles, envuelve en escritorio.
            // - `overflow-x-auto`: permite el scroll horizontal.
            // - Clases para ocultar la barra de scroll en todos los navegadores.
            className="glass border border-muted flex sm:inline-flex flex-nowrap sm:flex-wrap items-center gap-1 p-1 squircle-element overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {CATEGORIES.map((cat, i) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    catRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`cat-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls="gradients-grid-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setCategory(cat.id as CategoryFilter)}
                  // Agregado `shrink-0` y `whitespace-nowrap` para evitar que los botones se encojan y quiebren el texto
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 squircle-element shrink-0 whitespace-nowrap ${
                    isActive
                      ? "bg-accent text-accent-fg shadow-sm"
                      : "text-muted-fg hover:text-fg hover:bg-muted/30"
                  }`}
                >
                  <Icon icon={cat.icon} width={13} height={13} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <label className="glass border border-muted flex items-center gap-2 h-9 px-3 squircle-element text-muted-fg focus-within:border-accent focus-within:text-fg transition-colors">
            <Icon icon="lucide:search" width={14} height={14} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gradients…"
              aria-label="Search gradients by name or description"
              className="bg-transparent outline-none w-full min-w-[140px] text-sm placeholder:text-muted-fg/70"
            />
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 pb-24">
        <div
          id="gradients-grid-panel"
          role="tabpanel"
          aria-labelledby={`cat-${category}`}
          onKeyDown={handleGridKeyDown}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
        >
          {visible.map((g, i) => (
            <GradientCard key={g.id} gradient={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}