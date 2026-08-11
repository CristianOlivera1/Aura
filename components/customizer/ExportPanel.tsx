"use client";

import { useState, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useGradients } from "@/components/GradientProvider";
import { CodeBlock } from "@/components/customizer/CodeBlock";
import { EXPORT_FORMATS, exportGradient, type ExportFormat } from "@/lib/exportFormats";
import { generateAIPrompt } from "@/lib/generateAIPrompt";

const FORMAT_LANGS: Record<ExportFormat, "css" | "html" | "tsx" | "javascript"> = {
  css: "css",
  tailwind: "html",
  variables: "css",
  cssinjs: "tsx",
};

export function ExportPanel() {
  const { active, effectiveLayers, showToast } = useGradients();
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(label);
        showToast(`Copied ${label}`);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        showToast("Failed to copy");
      }
    },
    [showToast],
  );

  const code = useMemo(
    () => (active ? exportGradient(format, active, effectiveLayers) : ""),
    [active, format, effectiveLayers],
  );

  const aiPrompt = useMemo(
    () => (active ? generateAIPrompt(active, effectiveLayers) : ""),
    [active, effectiveLayers],
  );

  if (!active) return null;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
        Export
      </span>

      {/* Format tabs */}
      <div className="flex flex-wrap gap-1">
        {EXPORT_FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className={`flex items-center gap-1 px-2 py-1 text-[10px] rounded transition-all ${
              format === f.id
                ? "bg-white/15 text-white border border-white/20"
                : "text-white/50 hover:text-white/80 border border-transparent"
            }`}
          >
            <Icon icon={f.icon} width={11} height={11} />
            {f.label}
          </button>
        ))}
      </div>

      {/* Syntax-highlighted code preview */}
      <div className="relative bg-black/40 border border-white/10 rounded-lg overflow-hidden">
        <CodeBlock code={code} language={FORMAT_LANGS[format]} />
        <button
          onClick={() => handleCopy(code, format.toUpperCase())}
          className="absolute top-2 right-2 flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-[10px] px-2 py-1 rounded transition-all"
        >
          <Icon
            icon={copied === format.toUpperCase() ? "lucide:check" : "lucide:clipboard-copy"}
            width={11}
            height={11}
          />
          {copied === format.toUpperCase() ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* AI Prompt button */}
      <button
        onClick={() => handleCopy(aiPrompt, "AI Prompt")}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 hover:from-violet-600 hover:to-fuchsia-600 text-white text-xs font-medium py-2.5 px-4 rounded-lg transition-all shadow-[0_2px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
      >
        <Icon
          icon={copied === "AI Prompt" ? "lucide:check" : "lucide:sparkles"}
          width={14}
          height={14}
        />
        {copied === "AI Prompt" ? "Prompt Copied!" : "Copy AI Prompt"}
      </button>
    </div>
  );
}
