import { Bell } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { IconButton } from "@/components/ui/IconButton";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border-soft bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
      <BrandLogo href="/dashboard" markClassName="h-8 w-8 rounded-lg" />
      <IconButton label="Notifikasi" icon={<Bell className="h-5 w-5" />} className="h-10 w-10" />
    </header>
  );
}
