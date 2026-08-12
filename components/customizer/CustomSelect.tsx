"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { Icon } from "@iconify/react";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Custom dropdown select with dark glass styling.
 * Replaces native <select> with a styled popover.
 */
export function CustomSelect({ value, options, onChange, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selected = options.find((o) => o.value === value);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Focus the current option when the list opens
  useEffect(() => {
    if (!open) return;
    const idx = options.findIndex((o) => o.value === value);
    optionRefs.current[Math.max(0, idx)]?.focus();
  }, [open, options, value]);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setOpen(false);
    },
    [onChange],
  );

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = optionRefs.current.findIndex((el) => el === document.activeElement);
    let next = -1;
    if (e.key === "ArrowDown") {
      next = current < 0 ? 0 : Math.min(options.length - 1, current + 1);
    } else if (e.key === "ArrowUp") {
      next = current < 0 ? options.length - 1 : Math.max(0, current - 1);
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = options.length - 1;
    }
    if (next >= 0) {
      e.preventDefault();
      optionRefs.current[next]?.focus();
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className="flex items-center justify-between w-full bg-white/5 border border-white/10 hover:border-white/25 text-white text-[12px] squircle-element px-2.5 py-1.5 outline-none transition-colors"
      >
        <span className="truncate">{selected?.label ?? value}</span>
        <Icon
          icon="lucide:chevrons-up-down"
          width={11}
          height={11}
          className="text-white/40 ml-1.5 shrink-0"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label="Select an option"
          onKeyDown={handleListKeyDown}
          className="absolute left-0 right-0 top-full mt-1 z-50 bg-[#16161e]/95 backdrop-blur-xl border border-white/15 squircle-element shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ animation: "select-in 0.15s ease-out both" }}
        >
          <div className="py-1 max-h-48 overflow-y-auto custom-scrollbar">
            {options.map((option, i) => (
              <button
                key={option.value}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-[11px] transition-colors ${
                  option.value === value
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {option.value === value && (
                  <Icon icon="lucide:check" width={11} height={11} className="text-violet-400 shrink-0" />
                )}
                <span className={option.value === value ? "" : "ml-[19px]"}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
