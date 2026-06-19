"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarRange, Plus, RotateCcw, SlidersHorizontal, Target, WalletCards, X } from "lucide-react";
import { HistoryTable } from "@/components/cards/HistoryTable";
import { AppShell } from "@/components/layout/AppShell";
import { BaseModal } from "@/components/modals/BaseModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { MealHistoryRecord } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

const rowsPerPage = 4;
const dateOptions = [
  { label: "Semua Waktu", value: "Semua Waktu" },
  { label: "Bulan Ini", value: "Bulan Ini" },
  { label: "3 Bulan Terakhir", value: "3 Bulan Terakhir" },
];
const budgetOptions = [
  { label: "Semua Budget", value: "Semua Budget" },
  { label: "Hemat", value: "Hemat" },
  { label: "Normal", value: "Normal" },
];
const goalOptions = [
  { label: "Semua Goal", value: "Semua Goal" },
  { label: "High Protein", value: "high-protein" },
  { label: "Balance", value: "balance" },
  { label: "Hemat Kalori", value: "hemat-kalori" },
  { label: "Hemat Budget", value: "hemat-budget" },
];

export default function HistoryPage() {
  const router = useRouter();
  const { mealHistory } = useKostMealStore();
  const [dateFilter, setDateFilter] = useState("Semua Waktu");
  const [budgetFilter, setBudgetFilter] = useState("Semua Budget");
  const [goalFilter, setGoalFilter] = useState("Semua Goal");
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<MealHistoryRecord | null>(null);

  const filteredHistory = useMemo(() => {
    const now = new Date();
    return mealHistory.filter((record) => {
      const createdAt = new Date(record.createdAt);
      const withinDate = dateFilter === "Semua Waktu"
        || (dateFilter === "Bulan Ini" && createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear())
        || (dateFilter === "3 Bulan Terakhir" && createdAt >= new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()));
      const withinBudget = budgetFilter === "Semua Budget"
        || (budgetFilter === "Hemat" ? record.cost <= 200000 : record.cost > 200000);
      const withinGoal = goalFilter === "Semua Goal" || record.goal === goalFilter;
      return withinDate && withinBudget && withinGoal;
    });
  }, [budgetFilter, dateFilter, goalFilter, mealHistory]);

  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / rowsPerPage));
  const visibleRows = filteredHistory.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const activeFilters = [
    dateFilter !== "Semua Waktu" ? { label: dateOptions.find((option) => option.value === dateFilter)?.label ?? dateFilter, reset: () => setDateFilter("Semua Waktu") } : null,
    budgetFilter !== "Semua Budget" ? { label: budgetOptions.find((option) => option.value === budgetFilter)?.label ?? budgetFilter, reset: () => setBudgetFilter("Semua Budget") } : null,
    goalFilter !== "Semua Goal" ? { label: goalOptions.find((option) => option.value === goalFilter)?.label ?? goalFilter, reset: () => setGoalFilter("Semua Goal") } : null,
  ].filter((filter): filter is { label: string; reset: () => void } => Boolean(filter));

  const resetFilters = () => {
    setDateFilter("Semua Waktu");
    setBudgetFilter("Semua Budget");
    setGoalFilter("Semua Goal");
    setPage(1);
  };

  return (
    <AppShell>
      <SectionHeader
        title="Riwayat Rencana Makan"
        subtitle="Pantau perjalanan nutrisi dan pengeluaran makan harianmu."
        action={<Button type="button" leftIcon={<Plus className="h-4 w-4" />} onClick={() => router.push("/generate-plan")}>Rencana Baru</Button>}
      />
      <section className="mb-10 border border-[#dce9dc] bg-[#f4fbf2] p-4 shadow-[0_12px_32px_rgba(28,70,36,0.06)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-[0_7px_16px_rgba(0,122,61,0.20)]">
              <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-text-primary">Filter Riwayat</h2>
              <p className="text-sm text-text-secondary">Persempit daftar meal plan yang ingin kamu lihat.</p>
            </div>
          </div>
          <button type="button" onClick={resetFilters} disabled={activeFilters.length === 0} className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-primary transition hover:bg-primary-light disabled:cursor-not-allowed disabled:text-text-secondary/50 sm:self-auto">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <FilterDropdown icon={CalendarRange} label="Rentang Tanggal" value={dateFilter} options={dateOptions} onChange={(value) => { setDateFilter(value); setPage(1); }} />
          <FilterDropdown icon={WalletCards} label="Anggaran" value={budgetFilter} options={budgetOptions} onChange={(value) => { setBudgetFilter(value); setPage(1); }} />
          <FilterDropdown icon={Target} label="Tujuan Diet" value={goalFilter} options={goalOptions} onChange={(value) => { setGoalFilter(value); setPage(1); }} />
        </div>
        {activeFilters.length ? (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#dce9dc] pt-4">
            <span className="mr-1 text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">Aktif</span>
            {activeFilters.map((filter) => (
              <button key={filter.label} type="button" onClick={() => { filter.reset(); setPage(1); }} className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-white px-3 py-1.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary-light">
                {filter.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : null}
      </section>
      {filteredHistory.length ? (
        <HistoryTable rows={visibleRows} page={page} totalPages={totalPages} onPageChange={setPage} onDetail={setSelectedRecord} />
      ) : (
        <Card className="p-8 text-center" hover={false}>
          <h2 className="text-2xl font-bold">Belum ada riwayat meal plan.</h2>
          <p className="mt-2 text-text-secondary">Generate meal plan baru untuk menambahkan record ke riwayat.</p>
          <Button type="button" className="mt-5" onClick={() => router.push("/generate-plan")}>Buat Meal Plan</Button>
        </Card>
      )}
      <BaseModal open={Boolean(selectedRecord)} title={selectedRecord?.title ?? "Detail Meal Plan"} onClose={() => setSelectedRecord(null)}>
        {selectedRecord ? (
          <div className="space-y-4 text-sm text-text-secondary">
            <p><b className="text-text-primary">Rentang:</b> {selectedRecord.range}</p>
            <p><b className="text-text-primary">Budget:</b> {formatRupiah(selectedRecord.budget)}</p>
            <p><b className="text-text-primary">Estimasi biaya:</b> {formatRupiah(selectedRecord.cost)}</p>
            <p><b className="text-text-primary">Kalori rata-rata:</b> {selectedRecord.calories} kkal/hari</p>
            <div>
              <b className="text-text-primary">Menu hari pertama:</b>
              <ul className="mt-2 space-y-1">
                {selectedRecord.plan.days[0]?.meals.map((meal) => <li key={meal.name}>- {meal.name}</li>)}
              </ul>
            </div>
          </div>
        ) : null}
      </BaseModal>
    </AppShell>
  );
}
