"use client";

import { useCallback } from "react";
import { CopyToast } from "@/components/CopyToast";
import { useGradients } from "@/components/GradientProvider";

export function CopyToastWrapper() {
  const { toast, clearToast } = useGradients();

  const handleDone = useCallback(() => {
    clearToast();
  }, [clearToast]);

  return <CopyToast message={toast ?? ""} visible={!!toast} onDone={handleDone} />;
}
