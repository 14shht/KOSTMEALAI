"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "orange" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variants = {
  primary: "bg-primary text-white shadow-[0_10px_24px_rgba(0,122,61,0.24)] hover:bg-primary-dark",
  secondary: "bg-muted-green text-text-primary hover:bg-border-soft",
  outline: "border border-primary text-primary bg-white hover:bg-soft-green",
  orange: "bg-brown-orange text-white shadow-[0_10px_24px_rgba(168,85,0,0.2)] hover:bg-orange",
  ghost: "bg-transparent text-text-secondary hover:bg-soft-green",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "focus-soft inline-flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:opacity-55",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {rightIcon}
    </motion.button>
  );
}
