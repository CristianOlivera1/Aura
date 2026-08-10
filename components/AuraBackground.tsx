"use client";

import { useGradients } from "@/components/GradientProvider";

export function AuraBackground() {
  const { active } = useGradients();

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 mix-blend-hard-light blur-[90px] md:blur-[130px] transform-gpu will-change-transform transition-[background] duration-700"
        style={{ background: active?.hard }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light blur-[90px] md:blur-[130px] transform-gpu will-change-transform transition-[background] duration-700"
        style={{ background: active?.soft }}
      />
    </div>
  );
}
