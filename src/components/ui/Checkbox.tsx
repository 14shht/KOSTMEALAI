"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  boxed?: boolean;
};

export function Checkbox({ label, className, boxed, defaultChecked, ...props }: CheckboxProps) {
  return (
    <label
      className={cn(
        "focus-within:outline-primary-light flex items-center gap-3 rounded-xl text-text-primary transition",
        boxed && "border border-border-soft bg-soft-green px-4 py-3",
        className,
      )}
    >
      <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} {...props} />
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-text-secondary/50 bg-white text-white transition peer-checked:border-primary peer-checked:bg-primary">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span>{label}</span>
    </label>
  );
}
