import { Download, Heart, Share2, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { NutritionCard } from "@/components/cards/NutritionCard";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { weeklyPlans } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function MealPlanResultPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Meal Plan Mingguan Kamu"
        subtitle="Berdasarkan budget Rp350.000/minggu dan target protein tinggi."
        action={
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Share2 className="h-4 w-4" />}>Bagikan</Button>
            <Button variant="orange" leftIcon={<Download className="h-4 w-4" />}>Ekspor PDF</Button>
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <main className="space-y-8">
          <div className="grid gap-5 md:grid-cols-2">
            {weeklyPlans.map((plan) => (
              <Card key={plan.title} className="p-4" hover={false}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">{plan.day}</span>
                  {plan.badge ? <Badge>{plan.badge}</Badge> : null}
                </div>
                <h2 className="mb-4 text-2xl font-bold">{plan.title}</h2>
                <div
                  className={cn("mb-3 h-32 rounded-xl bg-cover bg-center", !plan.image.startsWith("/") && plan.image)}
                  style={plan.image.startsWith("/") ? { backgroundImage: `url(${plan.image})` } : undefined}
                />
                {plan.meals.map(([label, title]) => (
                  <div key={title} className="mb-4">
                    <p className="text-xs font-semibold text-orange">{label}</p>
                    <p className="font-semibold">{title}</p>
                    <div className="mt-4 h-px w-36 bg-border-soft" />
                  </div>
                ))}
                <p className="flex items-center gap-1 text-sm"><Zap className="h-4 w-4" />{plan.kcal}<b>{plan.price}</b></p>
              </Card>
            ))}
          </div>
          <Card className="p-7" hover={false}>
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Ringkasan Mingguan</h2>
                <p className="mt-4 text-lg leading-8 text-text-secondary">Kamu menghemat 15% dari budget biasanya dengan menu ini!</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="secondary" leftIcon={<Heart className="h-5 w-5" />}>Simpan ke Favorit</Button>
                <Button rightIcon={<Sparkles className="h-5 w-5" />}>Generate Ulang</Button>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                ["Total Budget", "Rp295.400", 82],
                ["Average Protein", "78g / hari", 95],
                ["Meal Prep Time", "45m / sesi", 45],
              ].map(([label, value, progress]) => (
                <div key={String(label)} className="rounded-2xl bg-soft-green p-6">
                  <p className="text-sm font-bold uppercase text-primary">{label}</p>
                  <p className="mt-2 text-3xl font-black">{value}</p>
                  <ProgressBar value={Number(progress)} className="mt-4" barClassName={label === "Meal Prep Time" ? "bg-brown-orange" : "bg-primary"} />
                </div>
              ))}
            </div>
          </Card>
        </main>
        <aside className="space-y-6">
          <NutritionCard />
          <Card className="overflow-hidden" hover={false}>
            <div className="bg-muted-green p-8">
              <h2 className="text-3xl font-bold">Daftar Belanja</h2>
              <p className="text-text-secondary">Total 18 item perlu dibeli</p>
            </div>
            <div className="space-y-5 p-8">
              {["Beras Ramos (5kg)", "Dada Ayam Fillet (1kg)", "Telur Ayam (1 tray/16 btr)"].map((item) => (
                <Checkbox key={item} label={<span><span className="block">{item}</span><span className="text-xs text-text-secondary">Rp68.000</span></span>} />
              ))}
              <Button variant="orange" className="mt-10 w-full" leftIcon={<ShoppingCart className="h-5 w-5" />}>Lihat Daftar Belanja</Button>
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
