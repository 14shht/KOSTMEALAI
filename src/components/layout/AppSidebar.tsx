"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { appNavItems } from "@/lib/constants";
import { user } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border-soft bg-white px-4 py-6 shadow-[18px_0_45px_rgba(22,29,23,0.04)] lg:flex lg:flex-col">
      <div className="px-2">
        <BrandLogo href="/dashboard" markClassName="h-10 w-10" textClassName="text-2xl" />
        <p className="text-sm text-text-secondary">Anak Kos Edition</p>
      </div>

      <nav className="mt-10 space-y-2" aria-label="Navigasi utama">
        {appNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-soft flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-text-secondary transition duration-300 ease-out hover:bg-soft-green hover:text-primary",
                active && "bg-primary-light text-primary-dark shadow-[0_10px_24px_rgba(0,122,61,0.12)]",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border-soft pt-5">
        <div className="flex items-center gap-3 rounded-xl bg-soft-green p-2 transition duration-300 hover:bg-muted-green/70">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light font-bold text-primary-dark">
            {user.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{user.fullName}</p>
            <p className="text-xs uppercase text-text-secondary">{user.plan}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
