import { ChevronDown, Clock, Filter, Plus, Search } from "lucide-react";
import { FavoriteMealCard } from "@/components/cards/FavoriteMealCard";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { favorites } from "@/lib/mock-data";

export default function FavoritesPage() {
  return (
    <AppShell>
      <SectionHeader title="Menu Favorit" subtitle="Kumpulan resep yang paling sering kamu masak." />
      <div className="mb-10 rounded-3xl bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Cari resep favorit</span>
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input className="focus-soft h-12 w-full rounded-full bg-muted-green px-12" placeholder="Cari resep favoritmu..." />
          </label>
          <Button variant="secondary" leftIcon={<Filter className="h-4 w-4" />}>Kategori</Button>
          <Button variant="secondary" leftIcon={<Clock className="h-4 w-4" />}>Waktu Masak</Button>
          <Button leftIcon={<Plus className="h-4 w-4" />}>Tambah Baru</Button>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map((favorite) => <FavoriteMealCard key={favorite.title} {...favorite} />)}
        <EmptyState title="Tambah Favorit Baru" description="Jelajahi resep dan simpan yang kamu suka di sini." />
      </div>
      <div className="mt-12 text-center">
        <Button variant="secondary" rightIcon={<ChevronDown className="h-4 w-4" />}>Muat Lebih Banyak</Button>
        <p className="mt-4 text-sm text-text-secondary">Menampilkan 5 dari 24 resep favorit</p>
      </div>
    </AppShell>
  );
}
