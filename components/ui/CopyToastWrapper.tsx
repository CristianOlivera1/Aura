"use client";

import { useCallback } from "react";
import { CopyToast } from "@/components/ui/CopyToast";
import { useGradients } from "@/components/GradientProvider";

export function CopyToastWrapper() {
  const { toasts, dismissToast } = useGradients();

  const handleDone = useCallback(
    (id: number) => dismissToast(id),
    [dismissToast],
  );

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => (
        <CopyToast
          key={t.id}
          message={t.message}
          type={t.type}
          onDone={() => handleDone(t.id)}
        />
      ))}
    </div>
  );
}
