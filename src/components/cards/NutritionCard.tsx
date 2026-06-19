import { Info } from "lucide-react";
import { CountUpText } from "@/components/landing/CountUpText";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { GeneratedMealPlan } from "@/lib/types/meal-plan";
import type { StoredMeal } from "@/lib/types";

type NutritionCardProps = {
  meals?: StoredMeal[];
  nutritionAnalysis?: GeneratedMealPlan["nutritionAnalysis"];
};

const defaultTargets = {
  Protein: 120,
  Karbohidrat: 250,
  Lemak: 70,
};

function parseProtein(value: string) {
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

function getStatus(value: number, target: number) {
  const progress = target ? (value / target) * 100 : 0;
  if (progress >= 100) return "Lewat target";
  if (progress >= 75) return "Hampir penuh";
  if (progress >= 45) return "Cukup";
  return "Rendah";
}

function getSuggestion(items: Array<{ label: string; value: number; target: number }>) {
  const lowest = [...items].sort((a, b) => (a.value / a.target) - (b.value / b.target))[0];

  if (!lowest) return "Komposisi nutrisi hari ini sudah seimbang.";
  if (lowest.label === "Protein") return "Kamu butuh lebih banyak Protein untuk mencapai target harian.";
  if (lowest.label === "Karbohidrat") return "Tambahkan sumber karbo hemat seperti nasi, kentang, atau oatmeal.";
  return "Pilih cara masak rendah minyak untuk menjaga target lemak tetap aman.";
}

export function NutritionCard({ meals = [], nutritionAnalysis }: NutritionCardProps) {
  const completedMeals = meals.filter((meal) => meal.completed);
  const completedCalories = completedMeals.reduce((total, meal) => total + meal.calories, 0);
  const proteinValue = Math.round(completedMeals.reduce((total, meal) => total + parseProtein(meal.protein), 0));
  const carbsPercent = nutritionAnalysis?.carbsPercent ?? 50;
  const fatPercent = nutritionAnalysis?.fatPercent ?? 25;
  const carbsValue = Math.round((completedCalories * (carbsPercent / 100)) / 4);
  const fatValue = Math.round((completedCalories * (fatPercent / 100)) / 9);
  const nutrition = [
    { label: "Protein", value: proteinValue, target: defaultTargets.Protein, color: "bg-primary" },
    { label: "Karbohidrat", value: carbsValue, target: defaultTargets.Karbohidrat, color: "bg-orange" },
    { label: "Lemak", value: fatValue, target: defaultTargets.Lemak, color: "bg-orange/60" },
  ];
  const suggestion = completedMeals.length ? getSuggestion(nutrition) : "Centang menu yang sudah dimakan untuk melihat progress nutrisi hari ini.";

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Analisis Nutrisi</h2>
        <Info className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 text-sm text-text-secondary">
        Berdasarkan {completedMeals.length} dari {meals.length} menu yang sudah kamu tandai selesai.
      </p>
      <div className="mt-7 space-y-6">
        {nutrition.map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-text-primary">{item.label}</span>
              <span className="text-text-secondary">
                <CountUpText value={item.value} suffix="g" /> / <CountUpText value={item.target} suffix="g" />
              </span>
            </div>
            <div className="mb-2 flex justify-end text-xs font-semibold text-primary">
              {getStatus(item.value, item.target)}
            </div>
            <ProgressBar
              value={(item.value / item.target) * 100}
              barClassName={item.color}
              delay={index * 0.12}
            />
          </div>
        ))}
      </div>
      <div className="mt-7 border-t border-border-soft pt-6 text-center text-sm text-text-secondary">
        &ldquo;{suggestion}&rdquo;
      </div>
    </Card>
  );
}
