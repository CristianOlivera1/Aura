"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onDone: () => void;
}

export function CopyToast({ message, type, onDone }: ToastProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onDone, 300);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  const isError = type === "error";

  return (
    <div
      className="glass border flex items-center gap-2.5 px-5 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{
        animation:
          phase === "enter"
            ? "toast-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both"
            : "toast-out 0.3s cubic-bezier(0.55, 0, 1, 0.45) both",
      }}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          isError ? "bg-red-500/20" : "bg-accent/20"
        }`}
      >
        <Icon
          icon={isError ? "lucide:circle-alert" : "lucide:check"}
          width={12}
          height={12}
          className={isError ? "text-red-400" : "text-accent"}
        />
      </div>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
