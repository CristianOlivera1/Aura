"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import { CodeBlock } from "@/components/customizer/CodeBlock";
import { EXPORT_FORMATS, type ExportFormat } from "@/lib/exportFormats";

const FORMAT_LANGS: Record<ExportFormat, "css" | "html" | "tsx" | "javascript"> = {
  css: "css",
  tailwind: "html",
  variables: "css",
  cssinjs: "tsx",
};

interface Props {
  format: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
  code: string;
  copied: string | null;
  onCopy: (text: string, label: string) => void;
}

export function ExportPanel({ format, onFormatChange, code, copied, onCopy }: Props) {
  const fmtRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const formatLabel =
    EXPORT_FORMATS.find((f) => f.id === format)?.label ?? format;

  /* Roving-tabindex keyboard nav for the format tabs */
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>, index: number) => {
      let next = -1;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (index + 1) % EXPORT_FORMATS.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (index - 1 + EXPORT_FORMATS.length) % EXPORT_FORMATS.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = EXPORT_FORMATS.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      onFormatChange(EXPORT_FORMATS[next].id);
      fmtRefs.current[next]?.focus();
    },
    [onFormatChange],
  );

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
        Export
      </span>

      {/* Format tabs */}
      <div
        role="tablist"
        aria-label="Export format"
        onKeyDown={(e) => {
          const idx = EXPORT_FORMATS.findIndex((f) => f.id === format);
          if (idx !== -1) handleTabKeyDown(e, idx);
        }}
        className="flex flex-wrap gap-1"
      >
        {EXPORT_FORMATS.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              fmtRefs.current[i] = el;
            }}
            role="tab"
            id={`fmt-${f.id}`}
            aria-selected={format === f.id}
            aria-controls="export-code-panel"
            tabIndex={format === f.id ? 0 : -1}
            onClick={() => onFormatChange(f.id)}
            className={`flex items-center gap-1 px-2 py-1 text-[12px] rounded transition-all ${
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
      <div
        role="tabpanel"
        id="export-code-panel"
        aria-labelledby={`fmt-${format}`}
        className="relative flex flex-1 min-h-[200px] bg-black/40 border border-white/10 squircle-element overflow-hidden"
      >
        <CodeBlock code={code} language={FORMAT_LANGS[format]} />
        <button
          onClick={() => onCopy(code, formatLabel)}
          className="absolute top-2 right-4 flex items-center gap-1 bg-white/90 hover:bg-white/20 text-black hover:text-white text-[12px] px-2 py-1 rounded transition-all"
        >
          <Icon
            icon={copied === formatLabel ? "lucide:check" : "lucide:clipboard-copy"}
            width={11}
            height={11}
          />
          {copied === formatLabel ? "Copied!" : `Copy ${formatLabel}`}
        </button>
      </div>
    </div>
  );
}