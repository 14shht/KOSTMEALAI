"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { useToast } from "@/components/feedback/ToastProvider";
import { FavoriteMealCard } from "@/components/cards/FavoriteMealCard";
import { AppShell } from "@/components/layout/AppShell";
import { BaseModal } from "@/components/modals/BaseModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { MealDetailModal } from "@/components/modals/MealDetailModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
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
  const filteredMeals = useMemo(() => favoriteMeals.filter((meal) => {
    const matchesQuery = meal.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Semua Kategori" || meal.tags.includes(category);
    const minutes = Number(meal.time.replace(/\D/g, "")) || 0;
    const matchesTime = timeFilter === "Semua Waktu" || (timeFilter === "< 15 Menit" ? minutes < 15 : minutes >= 15);
    return matchesQuery && matchesCategory && matchesTime;
  }), [category, favoriteMeals, query, timeFilter]);

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
      <div className="mb-10 rounded-3xl bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Cari resep favorit</span>
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-soft h-12 w-full rounded-full bg-muted-green px-12" placeholder="Cari resep favoritmu..." />
          </label>
          <Select aria-label="Kategori" label="Kategori" value={category} onChange={(event) => setCategory(event.target.value)} options={categories} className="lg:w-44" />
          <Select aria-label="Waktu Masak" label="Waktu Masak" value={timeFilter} onChange={(event) => setTimeFilter(event.target.value)} options={["Semua Waktu", "< 15 Menit", ">= 15 Menit"]} className="lg:w-44" />
          <Button type="button" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)}>Tambah Baru</Button>
        </div>
      </div>
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
