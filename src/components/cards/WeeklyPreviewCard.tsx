"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { GeneratedMealPlan } from "@/lib/types/meal-plan";

type WeeklyPreviewCardProps = {
  plan: GeneratedMealPlan | null;
  completedMealIds: string[];
};

type PreviewDay = {
  id: number;
  name: string;
  label: string;
  completedMeals: number;
  totalMeals: number;
  progress: number;
};

export function WeeklyPreviewCard({ plan, completedMealIds }: WeeklyPreviewCardProps) {
  const days = useMemo<PreviewDay[]>(() => (
    plan?.days.slice(0, 7).map((day) => {
      const completedMeals = day.meals.filter((meal) => (
        completedMealIds.includes(`day-${day.dayIndex}-${meal.type}-${meal.name}`)
      )).length;

      return {
        id: day.dayIndex,
        name: day.dayName,
        label: day.label,
        completedMeals,
        totalMeals: day.meals.length,
        progress: day.meals.length ? Math.round((completedMeals / day.meals.length) * 100) : 0,
      };
    }) ?? []
  ), [completedMealIds, plan]);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);

  const selectedDay = days.find((day) => day.id === selectedDayId) ?? days[0];

  return (
    <Card className="p-6" hover={false}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-2xl font-bold text-text-primary">Pratinjau Minggu Ini</h2>
        <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      </div>

      {days.length === 0 ? (
        <div className="mt-6 border-t border-border-soft pt-5">
          <p className="text-sm leading-6 text-text-secondary">Belum ada meal plan aktif untuk dilacak minggu ini.</p>
          <Link href="/generate-plan" className="mt-4 inline-flex text-sm font-bold text-primary transition hover:text-primary-dark">
            Buat meal plan →
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-4 gap-x-2 gap-y-4">
            {days.map((day) => {
              const selected = day.id === selectedDay?.id;
              const dayLabel = day.name.slice(0, 3).toUpperCase();

              return (
                <button
                  key={day.id}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Lihat progres ${day.name}: ${day.completedMeals} dari ${day.totalMeals} menu selesai`}
                  onClick={() => setSelectedDayId(day.id)}
                  className="group flex min-w-0 flex-col items-center gap-2 rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="text-xs font-bold text-text-secondary group-hover:text-primary">{dayLabel}</span>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition ${selected ? "bg-primary text-white shadow-[0_5px_12px_rgba(0,122,61,0.24)]" : "bg-soft-green text-primary group-hover:bg-primary-light"}`}>
                    {day.progress}%
                  </span>
                </button>
              );
            })}
          </div>

          {selectedDay ? (
            <div className="mt-6 border-t border-border-soft pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-bold text-text-primary">{selectedDay.label}</p>
                <p className="shrink-0 text-xs font-semibold text-primary">{selectedDay.completedMeals}/{selectedDay.totalMeals} selesai</p>
              </div>
              <ProgressBar value={selectedDay.progress} className="mt-3" />
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
}
