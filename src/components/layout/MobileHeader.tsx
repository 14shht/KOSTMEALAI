import Link from "next/link";
import { Bell } from "lucide-react";
import { appName } from "@/lib/constants";
import { IconButton } from "@/components/ui/IconButton";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border-soft bg-cream/95 px-4 py-3 backdrop-blur lg:hidden">
      <Link href="/dashboard" className="font-bold text-primary">
        {appName}
      </Link>
      <IconButton label="Notifikasi" icon={<Bell className="h-5 w-5" />} className="h-10 w-10" />
    </header>
  );
}
