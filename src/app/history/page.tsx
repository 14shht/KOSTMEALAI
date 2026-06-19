"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, Plus } from "lucide-react";
import { HistoryTable } from "@/components/cards/HistoryTable";
import { AppShell } from "@/components/layout/AppShell";
import { BaseModal } from "@/components/modals/BaseModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Select } from "@/components/ui/Select";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { MealHistoryRecord } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

const rowsPerPage = 4;

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

  return (
    <AppShell>
      <SectionHeader
        title="Riwayat Rencana Makan"
        subtitle="Pantau perjalanan nutrisi dan pengeluaran makan harianmu."
        action={<Button type="button" leftIcon={<Plus className="h-4 w-4" />} onClick={() => router.push("/generate-plan")}>Rencana Baru</Button>}
      />
      <div className="mb-10 rounded-3xl bg-soft-green p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <Select label="Rentang Tanggal" value={dateFilter} onChange={(event) => {
            setDateFilter(event.target.value);
            setPage(1);
          }} options={["Semua Waktu", "Bulan Ini", "3 Bulan Terakhir"]} />
          <Select label="Anggaran" value={budgetFilter} onChange={(event) => {
            setBudgetFilter(event.target.value);
            setPage(1);
          }} options={["Semua Budget", "Hemat", "Normal"]} />
          <Select label="Tujuan Diet" value={goalFilter} onChange={(event) => {
            setGoalFilter(event.target.value);
            setPage(1);
          }} options={[
            { label: "Semua Goal", value: "Semua Goal" },
            { label: "High Protein", value: "high-protein" },
            { label: "Balance", value: "balance" },
            { label: "Hemat Kalori", value: "hemat-kalori" },
            { label: "Hemat Budget", value: "hemat-budget" },
          ]} />
          <IconButton label="Filter" icon={<Filter className="h-5 w-5" />} className="bg-orange text-text-primary hover:bg-orange/80" />
        </div>
      </div>
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
