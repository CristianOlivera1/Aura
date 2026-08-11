"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { GradientCard } from "@/components/GradientCard";
import { useGradients } from "@/components/GradientProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GRADIENTS, CATEGORIES, type Category } from "@/lib/gradients";

type CategoryFilter = "all" | Category;

export function GradientsSection() {
  const { active, reset } = useGradients();
  const [category, setCategory] = useState<CategoryFilter>("all");

  const visible =
    category === "all"
      ? GRADIENTS
      : GRADIENTS.filter((g) => g.category === category);

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
              <span className="text-muted-fg">Previewing —</span>
              <span className="font-medium">{active?.name ?? "none"}</span>
            </Badge>
            <span className="w-px h-4 bg-muted mx-1" />
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

        {/* Category tabs */}
        <div className="glass border border-muted inline-flex flex-wrap items-center gap-x-1 gap-y-1 p-1 rounded-lg">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as CategoryFilter)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 rounded-md ${
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
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {visible.map((g, i) => (
            <GradientCard key={g.id} gradient={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
