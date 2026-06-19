"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Clock3, Plus, RotateCcw, Search, SlidersHorizontal, Tag, X } from "lucide-react";
import { useToast } from "@/components/feedback/ToastProvider";
import { FavoriteMealCard } from "@/components/cards/FavoriteMealCard";
import { AppShell } from "@/components/layout/AppShell";
import { BaseModal } from "@/components/modals/BaseModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { MealDetailModal } from "@/components/modals/MealDetailModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { Input } from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { StoredMeal } from "@/lib/types";

export default function FavoritesPage() {
  const { showToast } = useToast();
  const { favoriteMeals, addFavoriteMeal, removeFavoriteMeal, applyFavoriteAgain } = useKostMealStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua Kategori");
  const [timeFilter, setTimeFilter] = useState("Semua Waktu");
  const [selectedMeal, setSelectedMeal] = useState<StoredMeal | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StoredMeal | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [manualTitle, setManualTitle] = useState("");
  const [manualTime, setManualTime] = useState("15");
  const [manualPrice, setManualPrice] = useState("12000");

  const categories = useMemo(() => ["Semua Kategori", ...Array.from(new Set(favoriteMeals.flatMap((meal) => meal.tags)))], [favoriteMeals]);
  const categoryOptions = useMemo(() => categories.map((item) => ({ label: item, value: item })), [categories]);
  const timeOptions = [
    { label: "Semua Waktu", value: "Semua Waktu" },
    { label: "Di bawah 15 menit", value: "< 15 Menit" },
    { label: "15 menit atau lebih", value: ">= 15 Menit" },
  ];
  const filteredMeals = useMemo(() => favoriteMeals.filter((meal) => {
    const matchesQuery = meal.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Semua Kategori" || meal.tags.includes(category);
    const minutes = Number(meal.time.replace(/\D/g, "")) || 0;
    const matchesTime = timeFilter === "Semua Waktu" || (timeFilter === "< 15 Menit" ? minutes < 15 : minutes >= 15);
    return matchesQuery && matchesCategory && matchesTime;
  }), [category, favoriteMeals, query, timeFilter]);

  const hasActiveFilters = Boolean(query || category !== "Semua Kategori" || timeFilter !== "Semua Waktu");
  const resetFilters = () => {
    setQuery("");
    setCategory("Semua Kategori");
    setTimeFilter("Semua Waktu");
  };
  const activeFilters = [
    category !== "Semua Kategori" ? { label: category, reset: () => setCategory("Semua Kategori") } : null,
    timeFilter !== "Semua Waktu" ? { label: timeOptions.find((option) => option.value === timeFilter)?.label ?? timeFilter, reset: () => setTimeFilter("Semua Waktu") } : null,
  ].filter((filter): filter is { label: string; reset: () => void } => Boolean(filter));

  const addManualFavorite = () => {
    if (!manualTitle.trim()) return;
    addFavoriteMeal({
      id: `manual-favorite-${Date.now()}`,
      title: manualTitle.trim(),
      image: "/assets/foods/bowl.svg",
      tags: ["Manual"],
      calories: 350,
      protein: "15g",
      price: `Rp ${Number(manualPrice).toLocaleString("id-ID")}`,
      time: `${manualTime} Menit`,
      description: "Menu favorit manual yang ditambahkan pengguna.",
    });
    setManualTitle("");
    setManualTime("15");
    setManualPrice("12000");
    setAddOpen(false);
    showToast("Menu berhasil disimpan ke favorit.");
  };

  return (
    <AppShell>
      <SectionHeader title="Menu Favorit" subtitle="Kumpulan resep yang paling sering kamu masak." />
      <section className="mb-10 border border-[#dce9dc] bg-[#f4fbf2] p-4 shadow-[0_12px_32px_rgba(28,70,36,0.06)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-[0_7px_16px_rgba(0,122,61,0.20)]">
              <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-text-primary">Cari & Filter Favorit</h2>
              <p className="text-sm text-text-secondary">Temukan resep tersimpan sesuai kebutuhanmu.</p>
            </div>
          </div>
          <button type="button" onClick={resetFilters} disabled={!hasActiveFilters} className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-primary transition hover:bg-primary-light disabled:cursor-not-allowed disabled:text-text-secondary/50 sm:self-auto">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.45fr)_minmax(180px,0.75fr)_minmax(180px,0.75fr)_auto] lg:items-end">
          <label className="block min-w-0">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">
              <Search className="h-4 w-4 text-primary" aria-hidden="true" />
              Cari Menu
            </span>
            <span className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-soft h-12 w-full rounded-xl border border-[#d8e6d8] bg-white px-11 pr-4 text-sm font-medium text-text-primary placeholder:text-text-secondary/70 transition hover:border-primary/50" placeholder="Cari resep favorit..." />
            </span>
          </label>
          <FilterDropdown icon={Tag} label="Kategori" value={category} options={categoryOptions} onChange={setCategory} />
          <FilterDropdown icon={Clock3} label="Waktu Masak" value={timeFilter} options={timeOptions} onChange={setTimeFilter} />
          <Button type="button" className="h-12 w-full lg:w-auto" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)}>Tambah Baru</Button>
        </div>
        {activeFilters.length ? (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#dce9dc] pt-4">
            <span className="mr-1 text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">Aktif</span>
            {activeFilters.map((filter) => (
              <button key={filter.label} type="button" onClick={filter.reset} className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-white px-3 py-1.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary-light">
                {filter.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : null}
      </section>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredMeals.map((favorite) => (
          <FavoriteMealCard
            key={favorite.id}
            id={favorite.id}
            title={favorite.title}
            image={favorite.image}
            tags={favorite.tags}
            kcal={favorite.calories}
            price={favorite.price}
            time={favorite.time}
            onDetail={() => setSelectedMeal(favorite)}
            onRemove={() => setDeleteTarget(favorite)}
            onUseAgain={() => {
              applyFavoriteAgain(favorite);
              showToast("Menu ditambahkan ke plan aktif.");
            }}
          />
        ))}
        <button type="button" className="text-left" onClick={() => setAddOpen(true)}>
          <EmptyState title="Tambah Favorit Baru" description="Jelajahi resep dan simpan yang kamu suka di sini." />
        </button>
      </div>
      <div className="mt-12 text-center">
        <Button type="button" variant="secondary" rightIcon={<ChevronDown className="h-4 w-4" />}>Muat Lebih Banyak</Button>
        <p className="mt-4 text-sm text-text-secondary">Menampilkan {filteredMeals.length} dari {favoriteMeals.length} resep favorit</p>
      </div>

      <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      <ConfirmModal
        open={Boolean(deleteTarget)}
        message="Yakin ingin menghapus menu ini?"
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) removeFavoriteMeal(deleteTarget.id);
          setDeleteTarget(null);
          showToast("Menu favorit berhasil dihapus.");
        }}
      />
      <BaseModal open={addOpen} title="Tambah Favorit Baru" onClose={() => setAddOpen(false)}>
        <div className="space-y-4">
          <Input label="Nama Menu" value={manualTitle} onChange={(event) => setManualTitle(event.target.value)} placeholder="Contoh: Tempe orek nasi hangat" />
          <Input label="Waktu Masak (menit)" type="number" value={manualTime} onChange={(event) => setManualTime(event.target.value)} />
          <Input label="Estimasi Harga" type="number" value={manualPrice} onChange={(event) => setManualPrice(event.target.value)} />
          <Button type="button" className="w-full" onClick={addManualFavorite} disabled={!manualTitle.trim()}>Simpan Favorit</Button>
        </div>
      </BaseModal>
    </AppShell>
  );
}
