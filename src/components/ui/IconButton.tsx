"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = HTMLMotionProps<"button"> & {
  icon: ReactNode;
  label: string;
};

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      aria-label={label}
      title={label}
      className={cn(
        "focus-soft inline-flex h-11 w-11 items-center justify-center rounded-full bg-soft-green text-text-primary transition hover:bg-muted-green",
        className,
      )}
      {...props}
    >
      {icon}
    </motion.button>
  );
}
