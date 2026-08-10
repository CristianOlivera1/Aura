"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface CopyToastProps {
  message: string;
  visible: boolean;
  onDone: () => void;
}

export function CopyToast({ message, visible, onDone }: CopyToastProps) {
  const [phase, setPhase] = useState<"enter" | "exit" | "hidden">("hidden");

  const [prevVisible, setPrevVisible] = useState(visible);
  if (visible !== prevVisible) {
    setPrevVisible(visible);
    setPhase(visible ? "enter" : "hidden");
  }

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onDone, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible, onDone]);

  if (phase === "hidden") return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]">
      <div
        className="glass border border-muted flex items-center gap-2.5 px-5 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        style={{
          animation:
            phase === "enter"
              ? "toast-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both"
              : "toast-out 0.3s cubic-bezier(0.55, 0, 1, 0.45) both",
        }}
      >
        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
          <Icon icon="lucide:check" width={12} height={12} className="text-accent" />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
