"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  barClassName?: string;
  delay?: number;
  duration?: number;
};

export function ProgressBar({
  value,
  className,
  barClassName,
  delay = 0,
  duration = 0.9,
}: ProgressBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.7 });
  const safeValue = Math.max(0, Math.min(value, 100));

  return (
    <div
      ref={ref}
      className={cn("h-2 overflow-hidden rounded-full bg-muted-green", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeValue)}
    >
      <motion.div
        className={cn("h-full origin-left rounded-full bg-primary", barClassName)}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? safeValue / 100 : 0 }}
        transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
