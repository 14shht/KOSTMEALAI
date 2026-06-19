"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Banknote, ChartNoAxesColumnIncreasing, Check, CookingPot, Sparkles, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateMealPlanApiResponseSchema } from "@/lib/ai/meal-plan-schema";
import { cookingTools, generateGoals, tastePrefs } from "@/lib/mock-data";
import { saveGeneratedMealPlan } from "@/lib/hooks/use-generated-meal-plan";
import { createMockMealPlan } from "@/lib/mock-ai-meal-plan";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { MealPlanRequest } from "@/lib/types/meal-plan";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/feedback/ToastProvider";

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

const setupSteps = [
  ["1", "Setup", true],
  ["2", "Review", false],
  ["3", "Done", false],
] as const;

const stepProgressWidth = {
  1: "0%",
  2: "50%",
  3: "100%",
} as const;

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeTool(label: string) {
  return label.toLowerCase().replaceAll(" ", "-");
}

function formatRupiah(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function GenerateMealPlanForm() {
  const router = useRouter();
  const { saveActiveMealPlan } = useKostMealStore();
  const { showToast } = useToast();
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
  const [generationStep, setGenerationStep] = useState<1 | 2 | 3>(1);

  const isFormValid = Number(weeklyBudget) >= 50000 && selectedTools.length > 0 && durationDays > 0;
  const selectedGoalLabel = goalOptions.find((goal) => goal.value === nutritionGoal)?.label ?? "High Protein";
  const selectedToolLabels = cookingTools
    .filter((tool) => selectedTools.includes(normalizeTool(tool.label)))
    .map((tool) => tool.label);

  const mealPlanPayload: MealPlanRequest = {
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
    if (!isFormValid) {
      setError("Lengkapi budget minimal Rp 50.000 dan pilih minimal satu alat masak.");
      setGenerationStep(1);
      return;
    }

    setIsSubmitting(true);
    setGenerationStep(3);

    try {
      const response = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealPlanPayload),
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
      saveActiveMealPlan(apiResult.data);
      setGenerationStep(3);
      showToast("Meal plan berhasil dibuat.");
      window.setTimeout(() => router.push("/meal-plan-result"), 520);
    } catch {
      const fallbackPlan = createMockMealPlan(mealPlanPayload);
      saveGeneratedMealPlan(fallbackPlan);
      saveActiveMealPlan(fallbackPlan);
      setGenerationStep(3);
      showToast("Meal plan berhasil dibuat.");
      window.setTimeout(() => router.push("/meal-plan-result"), 520);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (generationStep === 1) {
      if (!isFormValid) {
        setError("Lengkapi budget minimal Rp 50.000 dan pilih minimal satu alat masak.");
        return;
      }

      setError("");
      setGenerationStep(2);
      return;
    }

    if (generationStep === 2) {
      await submitMealPlan();
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-light/25 blur-3xl" />
      <div className="relative mb-12 px-2 text-center text-sm text-text-secondary sm:px-16">
        <motion.div
          className="absolute left-[calc(16.666%+20px)] right-[calc(16.666%+20px)] top-5 h-1 overflow-hidden rounded-full bg-primary-light/35"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-emerald-400 to-primary"
            initial={{ width: "0%" }}
            animate={{ width: stepProgressWidth[generationStep] }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="absolute inset-y-0 w-20 rounded-full bg-white/45 blur-sm"
            animate={{ x: ["-35%", "240%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="relative z-10 grid grid-cols-3 items-start">
        {setupSteps.map(([num, label], index) => {
          const stepNumber = index + 1;
          const done = generationStep > stepNumber;
          const active = generationStep === stepNumber;
          return (
          <div key={num}>
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.34, ease: "easeOut" }}
            >
              <motion.span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-[0_10px_28px_rgba(22,29,23,0.08)] transition-colors duration-300",
                  done && "border-primary bg-primary text-white",
                  active && "border-primary bg-white text-primary ring-4 ring-primary-light/55",
                  !done && !active && "border-primary-light bg-white text-primary",
                )}
                animate={active ? { scale: [1, 1.07, 1] } : { scale: 1 }}
                transition={{ duration: 0.72, repeat: active && isSubmitting ? Infinity : 0, repeatDelay: 0.8, ease: "easeOut" }}
              >
                {done ? <Check className="h-5 w-5" /> : num}
              </motion.span>
              <b className={cn("transition-colors duration-300", active || done ? "text-primary" : "text-text-primary")}>{label}</b>
              <span className={cn("text-xs font-medium transition-opacity duration-300", active ? "opacity-100" : "opacity-0")}>
                {active && isSubmitting ? "Memproses" : "Aktif"}
              </span>
            </motion.div>
          </div>
          );
        })}
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {isSubmitting && generationStep !== 3 ? (
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

        {generationStep === 1 ? (
          <>
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
          </>
        ) : null}

        {generationStep === 2 ? (
          <Card className="p-6 sm:p-8" hover={false}>
            <div className="mb-7 flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Review Meal Plan Kamu</h2>
              <p className="text-text-secondary">
                Cek lagi preferensi sebelum KostMeal AI membuat menu. Kalau ada yang belum pas, kembali ke Setup.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Budget", formatRupiah(Number(weeklyBudget) || 0)],
                ["Durasi", `${durationDays} hari`],
                ["Makan per Hari", `${mealsPerDay} kali`],
                ["Target Nutrisi", selectedGoalLabel],
                ["Alat Masak", selectedToolLabels.join(", ") || "Belum dipilih"],
                ["Bahan Tersedia", availableIngredients || "Tidak ada"],
                ["Preferensi Rasa", foodPreferences.join(", ") || "Tidak ada"],
                ["Lokasi", location || "Tidak diisi"],
                ["Makanan Dihindari", avoidedFoods || "Tidak ada"],
                ["Alergi", allergies || "Tidak ada"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-soft-green p-4">
                  <p className="text-xs font-bold uppercase text-primary">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">{value}</p>
                </div>
              ))}
            </div>
            {notes.trim() ? (
              <div className="mt-4 rounded-2xl border border-border-soft bg-white p-4">
                <p className="text-xs font-bold uppercase text-primary">Catatan Tambahan</p>
                <p className="mt-2 text-sm text-text-secondary">{notes}</p>
              </div>
            ) : null}
          </Card>
        ) : null}

        {generationStep === 3 ? (
          <Card className="border-primary/20 bg-primary/5 p-8 text-center" hover={false} role="status" aria-live="polite">
            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-[0_18px_40px_rgba(0,122,61,0.22)]"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            >
              {isSubmitting ? <Sparkles className="h-7 w-7" /> : <Check className="h-7 w-7" />}
            </motion.div>
            <h2 className="mt-6 text-2xl font-bold text-text-primary">
              {isSubmitting ? "KostMeal AI sedang membuat meal plan..." : "Meal plan berhasil dibuat."}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-secondary">
              {isSubmitting
                ? "Sistem sedang menyusun menu, estimasi budget, daftar belanja, dan nutrisi berdasarkan pilihan kamu."
                : "Sebentar lagi kamu diarahkan ke halaman hasil meal plan."}
            </p>
          </Card>
        ) : null}

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
            onClick={() => {
              if (generationStep === 2) {
                setGenerationStep(1);
                return;
              }

              router.push("/");
            }}
          >
            {generationStep === 2 ? "Kembali ke Setup" : "Kembali ke Beranda"}
          </Button>
          <div className="w-full sm:w-auto">
            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting || generationStep === 3 || !isFormValid}
              className="w-full sm:w-auto"
              rightIcon={<Sparkles className="h-5 w-5" />}
            >
              {generationStep === 1 ? "Lanjut ke Review" : "Generate Menu Sekarang"}
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
