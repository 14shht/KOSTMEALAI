"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { useAuthUser } from "@/lib/hooks/use-auth-user";

export function PublicNavbar() {
  const { authUser, isLoading } = useAuthUser();

  return (
    <header className="sticky top-0 z-40 bg-white/90 py-3 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border-soft bg-white px-3 py-2 shadow-[0_18px_45px_rgba(22,29,23,0.08)] sm:px-4 lg:px-7">
        <BrandLogo markClassName="h-8 w-8 rounded-lg shadow-none" textClassName="text-base" />

        <div className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <a href="#fitur" className="hover:text-primary">Fitur</a>
          <a href="#resep" className="hover:text-primary">Resep</a>
          <a href="#harga" className="hover:text-primary">Harga</a>
        </div>

        <div className="flex min-w-[118px] items-center justify-end gap-4 text-sm font-medium">
          {isLoading ? null : authUser ? (
            <Link href="/dashboard">
              <Button size="sm" className="h-9 px-5">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden text-text-secondary hover:text-primary sm:inline">
                Masuk
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 border-border-soft px-5 text-text-primary shadow-none hover:border-primary hover:bg-white hover:text-primary"
                >
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
