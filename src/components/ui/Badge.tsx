import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "green" | "orange" | "red" | "muted";
};

const tones = {
  green: "bg-primary-light/25 text-primary",
  orange: "bg-orange/18 text-brown-orange",
  red: "bg-danger/15 text-danger",
  muted: "bg-muted-green text-text-secondary",
};

export function Badge({ className, tone = "green", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-normal",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
