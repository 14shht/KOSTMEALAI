"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
  selected?: boolean;
};

export function Chip({ selected, className, ...props }: ChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "focus-soft rounded-full border px-5 py-2.5 text-sm transition",
        selected
          ? "border-primary-light bg-primary-light text-primary-dark font-semibold"
          : "border-transparent bg-muted-green text-text-secondary hover:border-border-soft",
        className,
      )}
      {...props}
    />
  );
}
