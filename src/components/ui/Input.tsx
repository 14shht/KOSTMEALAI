import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helper?: string;
};

export function Input({ label, helper, className, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replaceAll(" ", "-");
  return (
    <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
      <span>{label}</span>
      <input
        id={inputId}
        className={cn(
          "focus-soft mt-2 h-13 w-full rounded-full border border-border-soft bg-soft-green px-5 text-text-primary placeholder:text-slate-500 transition",
          className,
        )}
        {...props}
      />
      {helper ? <span className="mt-2 block text-xs italic text-text-secondary">{helper}</span> : null}
    </label>
  );
}
