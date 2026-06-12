import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { appName } from "@/lib/constants";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-xl font-bold text-primary">
          {appName}
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          <a href="#fitur">Fitur</a>
          <a href="#resep">Resep</a>
          <a href="#harga">Harga</a>
          <Link href="/login" className="text-primary">
            Masuk
          </Link>
        </div>
        <Link href="/login">
          <Button size="sm">Daftar Sekarang</Button>
        </Link>
      </nav>
    </header>
  );
}
