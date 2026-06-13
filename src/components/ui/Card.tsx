"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
  hover?: boolean;
};

export function Card({ className, hover = true, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl border border-border-soft bg-card-white shadow-card transition-[box-shadow,border-color,transform] duration-300 ease-out md:hover:border-primary/20 md:hover:shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
