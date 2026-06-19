"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterOption = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  icon: LucideIcon;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

export function FilterDropdown({ icon: Icon, label, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative min-w-0">
      <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        {label}
      </p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 text-left text-sm font-semibold text-text-primary shadow-[0_1px_2px_rgba(28,42,31,0.04)] transition duration-200",
          open ? "border-primary ring-2 ring-primary/15" : "border-[#d8e6d8] hover:border-primary/50 hover:bg-[#fcfefc]",
        )}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-xl border border-[#d5e2d4] bg-white p-1.5 shadow-[0_18px_42px_rgba(30,51,33,0.16)]"
          >
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                    selected ? "bg-primary text-white" : "text-text-primary hover:bg-soft-green",
                  )}
                >
                  <span>{option.label}</span>
                  {selected ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
