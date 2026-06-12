"use client";

import { Banknote, ChartNoAxesColumnIncreasing, CookingPot, Sparkles, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cookingTools, generateGoals, tastePrefs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function GenerateMealPlanForm() {
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

      <form className="space-y-8">
        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><Banknote className="h-6 w-6 text-brown-orange" />Budget & Durasi</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Target Budget Seminggu (Rp)" placeholder="Contoh: 300000" helper="Rata-rata anak kos: Rp 250k - 400k/minggu" />
            <Select label="Durasi Plan" options={["7 Hari (Satu Minggu)", "5 Hari Kerja", "3 Hari Hemat"]} />
          </div>
        </Card>

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><ChartNoAxesColumnIncreasing className="h-6 w-6 text-primary" />Target Nutrisi</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {generateGoals.map((goal) => {
              const Icon = goal.icon;
              return (
                <button
                  type="button"
                  key={goal.title}
                  className={cn(
                    "focus-soft rounded-xl border bg-soft-green p-4 text-left transition",
                    goal.selected ? "border-primary bg-primary-light/20 text-primary" : "border-border-soft",
                  )}
                >
                  <Icon className="mb-4 h-5 w-5" />
                  <h3 className="font-bold">{goal.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{goal.desc}</p>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><CookingPot className="h-6 w-6 text-orange" />Alat Masak & Bahan</h2>
          <p className="mb-4 font-medium text-text-secondary">Peralatan yang tersedia (Pilih semua yang ada)</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cookingTools.map((tool) => (
              <Checkbox key={tool.label} label={tool.label} boxed defaultChecked={tool.checked} />
            ))}
          </div>
        </Card>

        <Card className="p-6 sm:p-8" hover={false}>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold"><Utensils className="h-6 w-6 text-primary" />Preferensi Rasa</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tastePrefs.map((pref, index) => (
              <Chip key={pref} selected={index === 0} className="justify-center rounded-xl">{index === 0 ? "✓ " : ""}{pref}</Chip>
            ))}
          </div>
        </Card>

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="ghost" className="w-full sm:w-auto">Kembali ke Beranda</Button>
          <Button size="lg" className="w-full sm:w-auto" rightIcon={<Sparkles className="h-5 w-5" />}>Generate Menu Sekarang</Button>
        </div>
      </form>
    </div>
  );
}
