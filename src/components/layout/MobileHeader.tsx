"use client";

import { Bell } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { IconButton } from "@/components/ui/IconButton";
import { useAuthUser } from "@/lib/hooks/use-auth-user";

export function MobileHeader() {
  const { authUser } = useAuthUser();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border-soft bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
      <BrandLogo href="/dashboard" markClassName="h-8 w-8 rounded-lg" />
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary-dark" title={authUser.displayName}>
          {authUser.initials}
        </div>
        <IconButton label="Notifikasi" icon={<Bell className="h-5 w-5" />} className="h-10 w-10" />
        <LogoutButton className="h-10 w-10" />
      </div>
    </header>
  );
}
