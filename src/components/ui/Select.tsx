import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
};

export function Select({ label, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replaceAll(" ", "-");
  return (
    <label htmlFor={selectId} className="block text-sm font-medium text-text-secondary">
      <span>{label}</span>
      <span className="relative mt-2 block">
        <select
          id={selectId}
          className={cn(
            "focus-soft h-13 w-full appearance-none rounded-full border border-border-soft bg-soft-green px-5 pr-11 text-text-primary transition",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
      </span>
    </label>
  );
}
