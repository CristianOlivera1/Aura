"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import { GradientCard } from "@/components/GradientCard";
import { useGradients } from "@/components/GradientProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GRADIENTS, FEATURED_IDS, CATEGORIES, type Category } from "@/lib/gradients";

type CategoryFilter = "all" | Category;

const INITIAL_CARDS = 12;
const LOAD_MORE = 12;

export function GradientsSection() {
  const { active, reset, random, favorites } = useGradients();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [count, setCount] = useState(INITIAL_CARDS);
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Filter helpers — the visible count always resets when a filter changes,
     so no effect or render-phase adjustment is needed. */
  const applyCategory = useCallback((c: CategoryFilter) => {
    setCategory(c);
    setCount(INITIAL_CARDS);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (c === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", c);
      window.history.replaceState(null, "", url);
    }
  }, []);

  const applyQuery = useCallback((q: string) => {
    setQuery(q);
    setCount(INITIAL_CARDS);
  }, []);

  const applyFavOnly = useCallback(() => {
    setFavOnly((f) => !f);
    setCount(INITIAL_CARDS);
  }, []);

  /* Jump to the card of the currently previewed gradient.
     Handles three cases: card already rendered, card below the lazy-load
     cutoff (bump `count` and wait a frame), or card hidden by filters/search
     (clear them so it becomes visible). */
  const scrollToActiveCard = useCallback(() => {
    if (!active) return;
    const node = document.getElementById(`g-${active.id}`);
    const behavior = window.matchMedia("(pointer: coarse)").matches
      ? "auto"
      : "smooth";
    if (node) {
      node.scrollIntoView({ behavior, block: "center" });
      return;
    }

    // Not rendered yet — clear filters/search and render enough cards to include it.
    if (category !== "all") applyCategory("all");
    if (query.trim() !== "") applyQuery("");
    if (favOnly) setFavOnly(false);

    // Position of the card in the fully-rendered (featured-first) list, since
    // the featured pinning reorders cards and `GRADIENTS.findIndex` alone can
    // undercount how many cards are rendered before this one.
    const pinned = [
      ...FEATURED_IDS.map((id) => GRADIENTS.find((g) => g.id === id)).filter(Boolean),
      ...GRADIENTS.filter((g) => !FEATURED_IDS.includes(g.id)),
    ];
    const pinnedIdx = pinned.findIndex((g) => g?.id === active.id);
    setCount(Math.max(INITIAL_CARDS, pinnedIdx + LOAD_MORE));

    const target = () =>
      document
        .getElementById(`g-${active.id}`)
        ?.scrollIntoView({ behavior, block: "center" });
    // Give React a second frame to commit the larger `count` before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(target));
  }, [active, category, query, favOnly, applyCategory, applyQuery]);

  const q = query.trim().toLowerCase();
  const filtered = GRADIENTS.filter(
    (g) =>
      (category === "all" || g.category === category) &&
      (!favOnly || favorites.includes(g.id)) &&
      (!q || g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)),
  );

  /* Featured gradients are pinned to the front of the grid, in FEATURED_IDS order */
  const visible = [
    ...(FEATURED_IDS.map((id) => filtered.find((g) => g.id === id)).filter(
      (g): g is (typeof filtered)[number] => Boolean(g),
    ) as (typeof filtered)[number][]),
    ...filtered.filter((g) => !FEATURED_IDS.includes(g.id)),
  ];

  /* Load more cards as the sentinel enters the viewport (shrinks SSR HTML) */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((c) => Math.min(c + LOAD_MORE, visible.length));
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [visible.length]);

  /* Keep the `category` filter in sync with the URL (?category=mesh), so the
     filtered view can be shared and survives reload/back. Mirror of the
     provider's gradient deep-linking. */
  useEffect(() => {
    const readCategory = () => {
      if (typeof window === "undefined") return;
      const c = new URLSearchParams(window.location.search).get("category");
      if (c && c !== "all" && CATEGORIES.some((x) => x.id === c)) {
        setCategory(c as CategoryFilter);
      } else {
        setCategory("all");
      }
      setCount(INITIAL_CARDS);
    };
    readCategory();
    window.addEventListener("popstate", readCategory);
    return () => window.removeEventListener("popstate", readCategory);
  }, []);

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
      applyCategory(id);
      catRefs.current[next]?.focus();
    },
    [applyCategory],
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
            <Badge
              role="button"
              tabIndex={0}
              aria-label={`Scroll to ${active?.name ?? "the"} gradient card`}
              title="Scroll to the previewed gradient"
              onClick={scrollToActiveCard}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollToActiveCard();
                }
              }}
              className="cursor-pointer hover:border-accent hover:text-accent transition-colors"
            >
              <span className="text-sm sm:text-muted-fg">Previewing -</span>
              <span className="text-sm font-medium truncate max-w-[60px] inline-block md:max-w-none">
                {active?.name ?? "none"}
              </span>
            </Badge>
            <span className="w-px h-4 bg-gray-400 mx-1" />
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
            <button
              type="button"
              onClick={applyFavOnly}
              aria-pressed={favOnly}
              title={favOnly ? "Show all gradients" : "Show favorites only"}
              aria-label={favOnly ? "Show all gradients" : "Show favorites only"}
              className={`glass border border-muted w-7 h-7 inline-flex items-center justify-center squircle-element transition-colors ${favOnly
                ? "text-rose-500 border-rose-500/60"
                : "hover:border-accent hover:text-accent"
                }`}
            >
              <Icon
                icon="mdi:heart"
                width={13}
                height={13}
                className={favOnly ? "fill-current" : ""}
              />
            </button>
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
                  onClick={() => applyCategory(cat.id as CategoryFilter)}
                  // Agregado `shrink-0` y `whitespace-nowrap` para evitar que los botones se encojan y quiebren el texto
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 squircle-element shrink-0 whitespace-nowrap ${isActive
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
              onChange={(e) => applyQuery(e.target.value)}
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
          {visible.slice(0, count).map((g, i) => (
            <GradientCard key={g.id} gradient={g} index={i} />
          ))}
        </div>
        {count < visible.length && <div ref={sentinelRef} className="h-px" aria-hidden="true" />}
      </div>
    </section>
  );
}