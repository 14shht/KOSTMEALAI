"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Download, Heart, Share2, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/components/feedback/ToastProvider";
import { AppShell } from "@/components/layout/AppShell";
import { ShareModal } from "@/components/modals/ShareModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { foodImages } from "@/lib/constants";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import { formatRupiah } from "@/lib/utils";

export default function MealPlanResultPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { activeMealPlan: plan, hydrated, addFavoriteMeal, shoppingList, toggleShoppingItem } = useKostMealStore();
  const [shareOpen, setShareOpen] = useState(false);

  const groupedShoppingList = useMemo(() => (
    shoppingList.reduce<Record<string, typeof shoppingList>>((groups, item) => {
      groups[item.category] = [...(groups[item.category] ?? []), item];
      return groups;
    }, {})
  ), [shoppingList]);

  const shareText = useMemo(() => {
    if (!plan) return "";
    return `${plan.title}\nBudget: ${formatRupiah(plan.summary.weeklyBudget)}\nEstimasi biaya: ${formatRupiah(plan.summary.estimatedTotalCost)}\nRata-rata kalori: ${plan.summary.averageCaloriesPerDay} kkal/hari`;
  }, [plan]);

  if (!hydrated) {
    return (
      <AppShell>
        <Card className="mx-auto max-w-xl border-primary/20 bg-primary/5 p-8 text-center" hover={false}>
          <Sparkles className="mx-auto h-8 w-8 animate-pulse text-primary" />
          <p className="mt-4 font-semibold text-primary">AI sedang membuat meal plan kamu...</p>
          <p className="mt-2 text-sm text-text-secondary">Sebentar, data meal plan sedang disiapkan.</p>
        </Card>
      </AppShell>
    );
  }

  if (!plan) {
    return (
      <AppShell>
        <Card className="mx-auto max-w-xl p-8 text-center" hover={false}>
          <h1 className="text-3xl font-bold">Belum ada meal plan yang dibuat.</h1>
          <p className="mt-4 text-text-secondary">
            Isi preferensi kamu dulu agar KostMeal AI bisa membuat menu yang sesuai.
          </p>
          <p className="mt-3 text-sm text-text-secondary">Estimasi kalori dan harga bersifat perkiraan.</p>
          <Link href="/generate-plan">
            <Button className="mt-6" rightIcon={<Sparkles className="h-5 w-5" />}>Buat Meal Plan</Button>
          </Link>
        </Card>
      </AppShell>
    );
  }

  const totalShoppingItems = shoppingList.length || plan.shoppingList.reduce((total, category) => total + category.items.length, 0);
  const budgetUsage = Math.min((plan.summary.estimatedTotalCost / plan.summary.weeklyBudget) * 100, 100);

  const saveMealsToFavorite = () => {
    plan.days[0]?.meals.forEach((meal, index) => {
      addFavoriteMeal({
        id: `favorite-${meal.type}-${meal.name}`,
        title: meal.name,
        mealType: meal.type,
        time: `${meal.prepTimeMinutes} Menit`,
        price: formatRupiah(meal.estimatedCost),
        calories: meal.estimatedCalories,
        protein: `${meal.estimatedProtein}g`,
        image: [foodImages.nasiGoreng, foodImages.ayamSayur, foodImages.smoothie][index % 3],
        tags: [meal.type, plan.summary.goal],
        description: meal.description,
        ingredients: meal.ingredients.map((ingredient) => `${ingredient.name} (${ingredient.quantity})`),
        steps: meal.steps,
      });
    });
    showToast("Menu berhasil disimpan ke favorit.");
  };

  return (
    <AppShell>
      <SectionHeader
        title={plan.title}
        subtitle={plan.summary.notes}
        action={
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button type="button" variant="outline" className="w-full sm:w-auto" leftIcon={<Share2 className="h-4 w-4" />} onClick={() => setShareOpen(true)}>Bagikan</Button>
            <Button type="button" variant="orange" className="w-full sm:w-auto" leftIcon={<Download className="h-4 w-4" />} onClick={() => showToast("Fitur ekspor PDF akan segera tersedia.", "info")}>Ekspor PDF</Button>
          </div>
        }
      />

      <Card className="mb-6 border-primary/20 bg-primary/5 p-4 text-sm text-text-secondary" hover={false}>
        Estimasi kalori dan harga bersifat perkiraan.
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-8">
          <div className="grid gap-5 md:grid-cols-2">
            {plan.days.map((day) => (
              <Card key={day.dayIndex} className="min-w-0 p-4" hover={false}>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold uppercase text-primary">{day.dayName}</span>
                  {day.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}
                </div>
                <h2 className="mb-4 text-2xl font-bold">{day.label}</h2>
                <div className="mb-5 rounded-xl bg-soft-green p-4">
                  <p className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1"><Zap className="h-4 w-4" />{day.totalCalories} kkal</span>
                    <b>{day.totalProtein}g protein</b>
                    <b>{formatRupiah(day.totalCost)}</b>
                  </p>
                </div>
                {day.meals.map((meal) => (
                  <div key={`${day.dayIndex}-${meal.type}-${meal.name}`} className="mb-5">
                    <p className="text-xs font-semibold uppercase text-orange">{meal.type}</p>
                    <p className="font-semibold">{meal.name}</p>
                    <p className="mt-1 text-sm text-text-secondary">{meal.description}</p>
                    <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-text-secondary">
                      <span>{meal.estimatedCalories} kkal</span>
                      <span>-</span>
                      <span>{meal.estimatedProtein}g protein</span>
                      <span>-</span>
                      <span>{formatRupiah(meal.estimatedCost)}</span>
                      <span>-</span>
                      <span>{meal.prepTimeMinutes} menit</span>
                    </p>
                    <details className="mt-3 rounded-xl bg-soft-green p-3 text-sm">
                      <summary className="cursor-pointer font-semibold text-primary">Bahan & langkah</summary>
                      <ul className="mt-3 space-y-1 text-text-secondary">
                        {meal.ingredients.map((ingredient) => (
                          <li key={`${meal.name}-${ingredient.name}`}>
                            {ingredient.name} - {ingredient.quantity} ({formatRupiah(ingredient.estimatedPrice)})
                          </li>
                        ))}
                      </ul>
                      <ol className="mt-3 list-decimal space-y-1 pl-5 text-text-secondary">
                        {meal.steps.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    </details>
                  </div>
                ))}
              </Card>
            ))}
          </div>

          <Card className="p-7" hover={false}>
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Ringkasan</h2>
                <p className="mt-4 text-lg leading-8 text-text-secondary">
                  Estimasi hemat {formatRupiah(plan.summary.estimatedSavings)} dari budget kamu.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button type="button" variant="secondary" className="w-full sm:w-auto" leftIcon={<Heart className="h-5 w-5" />} onClick={saveMealsToFavorite}>Simpan ke Favorit</Button>
                <Button type="button" className="w-full sm:w-auto" rightIcon={<Sparkles className="h-5 w-5" />} onClick={() => router.push("/generate-plan")}>Generate Ulang</Button>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                ["Total Budget", formatRupiah(plan.summary.weeklyBudget), budgetUsage],
                ["Estimasi Biaya", formatRupiah(plan.summary.estimatedTotalCost), budgetUsage],
                ["Protein Rata-rata", `${plan.summary.averageProteinPerDay}g / hari`, Math.min(plan.summary.averageProteinPerDay, 100)],
              ].map(([label, value, progress]) => (
                <div key={String(label)} className="rounded-2xl bg-soft-green p-6">
                  <p className="text-sm font-bold uppercase text-primary">{label}</p>
                  <p className="mt-2 break-words text-3xl font-black">{String(value)}</p>
                  <ProgressBar value={Number(progress)} className="mt-4" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7" hover={false}>
            <h2 className="text-2xl font-bold">Tips Budget</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {plan.budgetTips.map((tip) => (
                <p key={tip} className="rounded-xl bg-soft-green p-4 text-sm text-text-secondary">{tip}</p>
              ))}
            </div>
            {plan.warnings.length ? (
              <div className="mt-6 space-y-2">
                {plan.warnings.map((warning) => (
                  <p key={warning} className="flex gap-2 rounded-xl bg-orange/10 p-3 text-sm text-text-secondary">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-brown-orange" />
                    {warning}
                  </p>
                ))}
              </div>
            ) : null}
          </Card>
        </main>

        <aside className="min-w-0 space-y-6">
          <Card className="p-7" hover={false}>
            <h2 className="text-2xl font-bold">Analisis Nutrisi</h2>
            <div className="mt-6 space-y-5">
              {[
                ["Karbo", plan.nutritionAnalysis.carbsPercent],
                ["Protein", plan.nutritionAnalysis.proteinPercent],
                ["Lemak", plan.nutritionAnalysis.fatPercent],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <div className="mb-2 flex justify-between text-sm font-semibold">
                    <span>{label}</span>
                    <span>{Number(value)}%</span>
                  </div>
                  <ProgressBar value={Number(value)} barClassName={label === "Protein" ? "bg-primary" : "bg-brown-orange"} />
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              {plan.nutritionAnalysis.tips.map((tip) => (
                <p key={tip} className="rounded-xl bg-soft-green p-3 text-sm text-text-secondary">{tip}</p>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden" hover={false}>
            <div className="bg-muted-green p-6 sm:p-8">
              <h2 className="text-3xl font-bold">Daftar Belanja</h2>
              <p className="text-text-secondary">Total {totalShoppingItems} item perlu dibeli</p>
            </div>
            <div className="space-y-6 p-6 sm:p-8">
              {Object.entries(groupedShoppingList).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-bold uppercase text-primary">{category}</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <Checkbox
                        key={item.id}
                        checked={item.checked}
                        onChange={() => toggleShoppingItem(item.id)}
                        label={(
                          <span className={item.checked ? "text-text-secondary line-through" : ""}>
                            <span className="block">{item.name} ({item.quantity})</span>
                            <span className="text-xs text-text-secondary">{formatRupiah(item.estimatedPrice)}</span>
                          </span>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <Link href="/shopping-list">
                <Button variant="orange" className="mt-10 w-full" leftIcon={<ShoppingCart className="h-5 w-5" />}>Lihat Daftar Belanja</Button>
              </Link>
            </div>
          </Card>
        </aside>
      </div>
      <ShareModal open={shareOpen} text={shareText} onClose={() => setShareOpen(false)} onCopied={() => showToast("Link berhasil disalin.")} />
    </AppShell>
  );
}
