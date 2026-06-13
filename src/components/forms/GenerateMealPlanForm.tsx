"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Banknote, ChartNoAxesColumnIncreasing, CookingPot, Sparkles, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateMealPlanApiResponseSchema } from "@/lib/ai/meal-plan-schema";
import { cookingTools, generateGoals, tastePrefs } from "@/lib/mock-data";
import { saveGeneratedMealPlan } from "@/lib/hooks/use-generated-meal-plan";
import type { MealPlanRequest } from "@/lib/types/meal-plan";
import { cn } from "@/lib/utils";

const goalOptions = [
  { label: "Hemat Kalori", value: "hemat-kalori" },
  { label: "High Protein", value: "high-protein" },
  { label: "Balance", value: "balance" },
  { label: "Hemat Budget", value: "hemat-budget" },
] as const;

const durationOptions = [
  { label: "7 Hari (Satu Minggu)", value: 7 },
  { label: "5 Hari Kerja", value: 5 },
  { label: "3 Hari Hemat", value: 3 },
  { label: "1 Hari", value: 1 },
  { label: "14 Hari", value: 14 },
];

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeTool(label: string) {
  return label.toLowerCase().replaceAll(" ", "-");
}

export function GenerateMealPlanForm() {
  const router = useRouter();
  const defaultTools = useMemo(
    () => cookingTools.filter((tool) => tool.checked).map((tool) => normalizeTool(tool.label)),
    [],
  );

  const [weeklyBudget, setWeeklyBudget] = useState("350000");
  const [durationDays, setDurationDays] = useState(7);
  const [nutritionGoal, setNutritionGoal] = useState<MealPlanRequest["nutritionGoal"]>("high-protein");
  const [selectedTools, setSelectedTools] = useState<string[]>(defaultTools);
  const [availableIngredients, setAvailableIngredients] = useState("telur, tempe, bayam");
  const [foodPreferences, setFoodPreferences] = useState<string[]>(["Olahan Telur"]);
  const [avoidedFoods, setAvoidedFoods] = useState("");
  const [allergies, setAllergies] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [location, setLocation] = useState("Jakarta");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTool = (tool: string) => {
    setSelectedTools((current) => (
      current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool]
    ));
  };

  const togglePreference = (preference: string) => {
    setFoodPreferences((current) => (
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference]
    ));
  };

  const submitMealPlan = async () => {
    setError("");
    setIsSubmitting(true);

    const payload: MealPlanRequest = {
      weeklyBudget: Number(weeklyBudget),
      durationDays,
      nutritionGoal,
      cookingTools: selectedTools,
      availableIngredients: splitList(availableIngredients),
      foodPreferences,
      avoidedFoods: splitList(avoidedFoods),
      allergies: splitList(allergies),
      mealsPerDay,
      location: location.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    try {
      const response = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal generate meal plan. Coba lagi sebentar.");
      }

      const parsedResult = generateMealPlanApiResponseSchema.safeParse(result);

      if (!parsedResult.success) {
        throw new Error("Format meal plan tidak valid. Coba generate ulang.");
      }

      const apiResult = parsedResult.data;
      saveGeneratedMealPlan(apiResult.data);
      router.push("/meal-plan-result");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Gagal generate meal plan. Coba lagi sebentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitMealPlan();
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-light/25 blur-3xl" />
      <div className="mb-12 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 text-center text-sm text-text-secondary sm:px-16">
        {[["1", "Setup", true], ["2", "Review", false], ["3", "Done", false]].map(([num, label, active], index) => (
          <div key={String(num)} className={cn("contents", index === 2 && "")}>
            <div className="flex flex-col items-center gap-2">
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border-2", active ? "border-primary bg-primary text-white" : "border-border-soft")}>{num}</span>
              <b className={active ? "text-primary" : ""}>{label}</b>
            </div>
            {index < 2 ? <span className="h-px min-w-10 bg-border-soft" /> : null}
          </div>
        ))}
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {isSubmitting ? (
          <Card className="border-primary/20 bg-primary/5 p-5" hover={false} role="status" aria-live="polite">
            <div className="flex items-center gap-3 text-sm font-semibold text-primary">
              <Sparkles className="h-5 w-5 animate-pulse" />
              AI sedang membuat meal plan kamu...
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              KostMeal AI sedang menyesuaikan menu dengan budget, alat masak, dan preferensi kamu.
            </p>
          </Card>
        ) : null}

        {error ? (
          <Card className="border-danger/30 bg-danger/5 p-5 text-sm" hover={false} role="alert" aria-live="assertive">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium text-danger">{error}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={submitMealPlan}
                className="w-full border-danger/40 text-danger hover:bg-danger/5 sm:w-auto"
              >
                Coba Lagi
              </Button>
            </div>
          </Card>
        ) : null}

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><Banknote className="h-6 w-6 text-brown-orange" />Budget & Durasi</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Target Budget Seminggu (Rp)"
              type="number"
              min={50000}
              value={weeklyBudget}
              onChange={(event) => setWeeklyBudget(event.target.value)}
              helper="Rata-rata anak kos: Rp 250k - 400k/minggu"
            />
            <Select
              label="Durasi Plan"
              value={String(durationDays)}
              onChange={(event) => setDurationDays(Number(event.target.value))}
              options={durationOptions}
            />
            <Select
              label="Makan per Hari"
              value={String(mealsPerDay)}
              onChange={(event) => setMealsPerDay(Number(event.target.value))}
              options={[2, 3, 4].map((value) => ({ label: `${value} kali`, value }))}
            />
          </div>
        </Card>

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><ChartNoAxesColumnIncreasing className="h-6 w-6 text-primary" />Target Nutrisi</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {goalOptions.map((goal) => {
              const preset = generateGoals.find((item) => item.title === goal.label);
              const Icon = preset?.icon ?? Sparkles;
              const selected = nutritionGoal === goal.value;

              return (
                <button
                  type="button"
                  key={goal.value}
                  onClick={() => setNutritionGoal(goal.value)}
                  className={cn(
                    "focus-soft rounded-xl border bg-soft-green p-4 text-left transition",
                    selected ? "border-primary bg-primary-light/20 text-primary" : "border-border-soft",
                  )}
                >
                  <Icon className="mb-4 h-5 w-5" />
                  <h3 className="font-bold">{goal.label}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {preset?.desc ?? "Fokus pada pengeluaran paling hemat."}
                  </p>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><CookingPot className="h-6 w-6 text-orange" />Alat Masak & Bahan</h2>
          <p className="mb-4 font-medium text-text-secondary">Peralatan yang tersedia (Pilih semua yang ada)</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cookingTools.map((tool) => {
              const value = normalizeTool(tool.label);
              return (
                <Checkbox
                  key={tool.label}
                  label={tool.label}
                  boxed
                  checked={selectedTools.includes(value)}
                  onChange={() => toggleTool(value)}
                />
              );
            })}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Input
              label="Bahan yang Tersedia"
              value={availableIngredients}
              onChange={(event) => setAvailableIngredients(event.target.value)}
              placeholder="Contoh: telur, tempe, bayam"
              helper="Pisahkan dengan koma"
            />
            <Input
              label="Lokasi"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Contoh: Jakarta"
            />
          </div>
        </Card>

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><Utensils className="h-6 w-6 text-primary" />Preferensi Rasa</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tastePrefs.map((pref) => (
              <Chip
                key={pref}
                type="button"
                selected={foodPreferences.includes(pref)}
                onClick={() => togglePreference(pref)}
                className="justify-center rounded-xl"
              >
                {foodPreferences.includes(pref) ? "\u2713 " : ""}{pref}
              </Chip>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Input
              label="Makanan yang Dihindari"
              value={avoidedFoods}
              onChange={(event) => setAvoidedFoods(event.target.value)}
              placeholder="Contoh: seafood, jengkol"
              helper="Pisahkan dengan koma"
            />
            <Input
              label="Alergi"
              value={allergies}
              onChange={(event) => setAllergies(event.target.value)}
              placeholder="Contoh: kacang, susu"
              helper="Pisahkan dengan koma"
            />
          </div>
          <label className="mt-6 block text-sm font-medium text-text-secondary">
            <span>Catatan Tambahan</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Contoh: menu harus bisa meal prep untuk 2 hari"
              className="focus-soft mt-2 min-h-28 w-full rounded-3xl border border-border-soft bg-soft-green px-5 py-4 text-text-primary placeholder:text-slate-500 transition"
            />
          </label>
        </Card>

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={() => router.push("/")}>Kembali ke Beranda</Button>
          <div className="w-full sm:w-auto">
            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
              rightIcon={<Sparkles className="h-5 w-5" />}
            >
              {isSubmitting ? "AI sedang membuat meal plan kamu..." : "Generate Menu Sekarang"}
            </Button>
            <p className="mt-3 text-center text-xs text-text-secondary sm:text-right">
              Estimasi kalori dan harga bersifat perkiraan.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
