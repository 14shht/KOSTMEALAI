import { AlertCircle, ChartNoAxesColumnIncreasing } from "lucide-react";
import { BudgetCard } from "@/components/cards/BudgetCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { PreferencePanel, ProfileForm } from "@/components/forms/ProfileForm";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ProfilePage() {
  return (
    <AppShell>
      <SectionHeader title="Pengaturan Profil" subtitle="Personalisasi pengalaman makan hemat & sehat sesuai gaya hidupmu." />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <ProfileCard />
        <ProfileForm />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <BudgetCard />
          <Card className="p-6" hover={false}>
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold"><ChartNoAxesColumnIncreasing className="h-5 w-5 text-primary" />Target Nutrisi</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[["Kalori", "2100", "KCAL"], ["Protein", "65", "GRAM"], ["Karbo", "250", "GRAM"]].map(([label, value, unit]) => (
                <div key={label} className="rounded-xl bg-soft-green p-5 text-center">
                  <p className="uppercase text-text-secondary">{label}</p>
                  <p className="mt-2 text-xl text-primary">{value}</p>
                  <p className="text-xs font-bold">{unit}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <PreferencePanel />
      </div>
      <Card className="mt-6 p-6" hover={false}>
        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">Alergi & Pantangan</h2>
        <div className="flex flex-wrap gap-3">
          <Badge tone="red" className="normal-case">Kacang Tanah ×</Badge>
          <Badge tone="red" className="normal-case">Udang ×</Badge>
          <button className="focus-soft rounded-full border border-dashed border-border-soft px-5 py-2 text-text-secondary">+ Tambah Alergi</button>
        </div>
      </Card>
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border-soft bg-muted-green p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex gap-3 text-text-secondary"><AlertCircle className="h-5 w-5" />Perubahan akan langsung diterapkan pada rekomendasi menu berikutnya.</p>
        <div className="flex gap-3">
          <Button variant="ghost">Batalkan</Button>
          <Button>Simpan Perubahan</Button>
        </div>
      </div>
    </AppShell>
  );
}
