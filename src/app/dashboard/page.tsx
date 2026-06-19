"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { MealCard } from "@/components/cards/MealCard";
import { NutritionCard } from "@/components/cards/NutritionCard";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { WeeklyPreviewCard } from "@/components/cards/WeeklyPreviewCard";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { AppShell } from "@/components/layout/AppShell";
import { BaseModal } from "@/components/modals/BaseModal";
import { MealDetailModal } from "@/components/modals/MealDetailModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/feedback/ToastProvider";
import { useAuthUser } from "@/lib/hooks/use-auth-user";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { StoredMeal } from "@/lib/types";

export default function DashboardPage() {
  const { authUser } = useAuthUser();
  const { activeMealPlan, completedMealIds, dashboardSummaryCards, todayMealList, toggleMealCompleted, addActiveMeal } = useKostMealStore();
  const { showToast } = useToast();
  const [selectedMeal, setSelectedMeal] = useState<StoredMeal | null>(null);
  const [snackModalOpen, setSnackModalOpen] = useState(false);
  const [snackName, setSnackName] = useState("");
  const [snackCalories, setSnackCalories] = useState("200");

  if (!authUser) return null;

  const addSnack = () => {
    if (!snackName.trim()) return;
    addActiveMeal({
      id: `snack-${Date.now()}`,
      title: snackName.trim(),
      mealType: "Snack",
      time: "5 Menit",
      price: "Rp 8.000",
      calories: Number(snackCalories) || 0,
      protein: "4g",
      image: "/assets/foods/bowl.svg",
      tags: ["Snack"],
      completed: false,
    });
    setSnackName("");
    setSnackCalories("200");
    setSnackModalOpen(false);
    showToast("Snack berhasil ditambahkan.");
  };

  return (
    <AppShell>
      <DashboardGreeting authUser={authUser} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardSummaryCards.map((card) => {
          const href = card.label === "Daftar Belanja" ? "/shopping-list" : card.label === "Rencana Mingguan" ? "/meal-plan-result" : undefined;
          return href ? (
            <Link key={card.label} href={href}>
              <SummaryCard {...card} />
            </Link>
          ) : (
            <SummaryCard key={card.label} {...card} />
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_280px]">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Menu Hari Ini</h2>
            <Link href="/meal-plan-result" className="font-semibold text-primary transition duration-300 hover:text-primary-dark">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {todayMealList.map((meal) => (
              <MealCard
                key={meal.id}
                {...meal}
                ready={meal.completed}
                onOpen={() => setSelectedMeal(meal)}
                onToggleReady={() => {
                  toggleMealCompleted(meal.id);
                }}
              />
            ))}
            <button type="button" className="text-left" onClick={() => setSnackModalOpen(true)}>
              <EmptyState title="Tambah Snack" description="Ada sisa 200 kalori yang bisa kamu pakai!" icon={<Plus className="h-7 w-7" />} />
            </button>
          </div>
        </section>
        <aside className="space-y-6">
          <NutritionCard meals={todayMealList} nutritionAnalysis={activeMealPlan?.nutritionAnalysis} />
          <WeeklyPreviewCard plan={activeMealPlan} completedMealIds={completedMealIds} />
        </aside>
      </div>
      <Link href="/generate-plan" className="fixed bottom-24 right-4 z-20 lg:bottom-8 lg:right-8">
        <Button size="lg" rightIcon={<Sparkles className="h-5 w-5" />}>Generate Meal Plan Baru</Button>
      </Link>
      <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      <BaseModal open={snackModalOpen} title="Tambah Snack" onClose={() => setSnackModalOpen(false)}>
        <div className="space-y-4">
          <Input label="Nama Snack" value={snackName} onChange={(event) => setSnackName(event.target.value)} placeholder="Contoh: Pisang dan susu" />
          <Input label="Kalori" type="number" value={snackCalories} onChange={(event) => setSnackCalories(event.target.value)} />
          <Button type="button" className="w-full" onClick={addSnack} disabled={!snackName.trim()}>
            Tambah Snack
          </Button>
        </div>
      </BaseModal>
    </AppShell>
  );
}
