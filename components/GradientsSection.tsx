"use client";

import { useState } from "react";
import { GradientCard } from "@/components/GradientCard";
import { useGradients } from "@/components/GradientProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GRADIENTS, MOODS, type GradientMood } from "@/lib/gradients";

type MoodFilter = "all" | GradientMood;

export function GradientsSection() {
  const { active, reset } = useGradients();
  const [mood, setMood] = useState<MoodFilter>("all");

  const visible =
    mood === "all"
      ? GRADIENTS
      : GRADIENTS.filter((g) => g.mood === mood);

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
              Gradients
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
            <Button
              disabled
              title="Animate — coming soon"
              size="icon-sm"
              className="text-muted-fg/40 cursor-not-allowed"
              icon="lucide:play"
              iconSize={13}
            />
          </div>
        </div>

        <div className="glass border border-muted inline-flex flex-wrap items-center gap-x-7 gap-y-2 px-4 py-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`mood-tab text-lg uppercase tracking-widest pb-1.5 transition-colors ${
                mood === m ? "is-active" : "hover:text-fg"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-muted">
          {visible.map((g, i) => (
            <GradientCard key={g.id} gradient={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
