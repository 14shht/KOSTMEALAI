import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";
import { MealCard } from "@/components/cards/MealCard";
import { NutritionCard } from "@/components/cards/NutritionCard";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { WeeklyPreviewCard } from "@/components/cards/WeeklyPreviewCard";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { summaryCards, todayMeals } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Halo, Faiq 👋"
        subtitle="Hari ini rencanamu: Masakan rumahan hemat energi."
        action={<p className="hidden font-medium text-text-secondary md:block">Kamis, 24 Okt 2023</p>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
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
            {todayMeals.map((meal) => <MealCard key={meal.title} {...meal} />)}
            <EmptyState title="Tambah Snack" description="Ada sisa 200 kalori yang bisa kamu pakai!" icon={<Plus className="h-7 w-7" />} />
          </div>
        </section>
        <aside className="space-y-6">
          <NutritionCard />
          <WeeklyPreviewCard />
        </aside>
      </div>
      <Link href="/generate-plan" className="fixed bottom-24 right-4 z-20 lg:bottom-8 lg:right-8">
        <Button size="lg" rightIcon={<Sparkles className="h-5 w-5" />}>Generate Meal Plan Baru</Button>
      </Link>
    </AppShell>
  );
}
