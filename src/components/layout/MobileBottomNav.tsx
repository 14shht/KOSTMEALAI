"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const items = appNavItems.filter((item) =>
    ["/dashboard", "/generate-plan", "/history", "/favorites", "/profile"].includes(item.href),
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border-soft bg-card-white px-2 py-2 shadow-[0_-12px_28px_rgba(22,29,23,0.08)] lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "focus-soft flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium text-text-secondary transition",
              active && "bg-primary-light/35 text-primary",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="truncate">{item.label.replace("Generate Plan", "Plan")}</span>
          </Link>
        );
      })}
    </nav>
  );
}
