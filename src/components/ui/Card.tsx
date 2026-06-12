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
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-border-soft bg-card-white shadow-card transition-shadow md:hover:shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
