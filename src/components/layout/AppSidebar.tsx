"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { appNavItems } from "@/lib/constants";
import { useAuthUser } from "@/lib/hooks/use-auth-user";
import { getProfileAvatar, profileAvatarChangedEvent } from "@/lib/profile-avatar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();
  const { authUser } = useAuthUser();
  const displayName = authUser?.displayName ?? "User";
  const initials = authUser?.initials ?? "U";
  const email = authUser?.email ?? "";
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => (email ? getProfileAvatar(email) : null));

  useEffect(() => {
    const syncAvatar = () => setAvatarUrl(email ? getProfileAvatar(email) : null);
    window.addEventListener(profileAvatarChangedEvent, syncAvatar);
    return () => window.removeEventListener(profileAvatarChangedEvent, syncAvatar);
  }, [email]);

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
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-light font-bold text-primary-dark">
            {avatarUrl ? <Image src={avatarUrl} alt="Foto profil" fill sizes="40px" unoptimized className="object-cover" /> : initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">{displayName}</p>
            <p className="truncate text-xs text-text-secondary">{email}</p>
          </div>
          <LogoutButton className="h-9 w-9 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
