"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ChartNoAxesColumnIncreasing, IdCard, X } from "lucide-react";
import { useToast } from "@/components/feedback/ToastProvider";
import { BudgetCard } from "@/components/cards/BudgetCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { ProfilePreferences } from "@/lib/types";

const preferenceOptions = ["Indonesia", "Western", "Asian Fusion", "Vegetarian", "Pedas"];
const cookingToolOptions = ["Rice Cooker", "Kompor Gas", "Air Fryer", "Microwave"];

export default function ProfilePage() {
  const { showToast } = useToast();
  const { profile, updateProfile } = useKostMealStore();
  const [draft, setDraft] = useState<ProfilePreferences>(profile);
  const [newAllergy, setNewAllergy] = useState("");
  const [showAllergyInput, setShowAllergyInput] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setDraft(profile));
    return () => window.cancelAnimationFrame(frameId);
  }, [profile]);

  const toggleValue = (field: "preferences" | "cookingTools", value: string) => {
    setDraft((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    setDraft((current) => ({ ...current, allergies: [...current.allergies, newAllergy.trim()] }));
    setNewAllergy("");
    setShowAllergyInput(false);
  };

  const saveChanges = () => {
    updateProfile(draft);
    showToast("Perubahan profil berhasil disimpan.");
  };

  return (
    <AppShell>
      <SectionHeader title="Pengaturan Profil" subtitle="Personalisasi pengalaman makan hemat & sehat sesuai gaya hidupmu." />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <ProfileCard />
        <Card className="p-6" hover={false}>
          <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold"><IdCard className="h-5 w-5 text-primary" />Informasi Pengguna</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Nama Lengkap" value={draft.fullName} onChange={(event) => setDraft({ ...draft, fullName: event.target.value })} />
            <Input label="Email" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
            <Select label="Pekerjaan" value={draft.job} onChange={(event) => setDraft({ ...draft, job: event.target.value })} options={["Karyawan Swasta", "Mahasiswa", "Freelancer"]} />
            <Input label="Domisili" value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} />
          </div>
        </Card>
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
        <Card className="p-6" hover={false}>
          <h2 className="mb-5 text-lg font-semibold">Preferensi Makanan</h2>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map((item) => (
              <Chip key={item} type="button" selected={draft.preferences.includes(item)} onClick={() => toggleValue("preferences", item)}>{item}</Chip>
            ))}
          </div>
          <div className="my-6 h-px bg-border-soft" />
          <h3 className="mb-4 font-medium uppercase text-text-secondary">Peralatan Masak Tersedia</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {cookingToolOptions.map((tool) => (
              <Checkbox key={tool} label={tool} checked={draft.cookingTools.includes(tool)} onChange={() => toggleValue("cookingTools", tool)} />
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6 p-6" hover={false}>
        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">Alergi & Pantangan</h2>
        <div className="flex flex-wrap gap-3">
          {draft.allergies.map((allergy) => (
            <Badge key={allergy} tone="red" className="normal-case">
              <button type="button" className="inline-flex items-center gap-1" onClick={() => setDraft((current) => ({ ...current, allergies: current.allergies.filter((item) => item !== allergy) }))}>
                {allergy} <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {showAllergyInput ? (
            <span className="flex items-center gap-2">
              <input value={newAllergy} onChange={(event) => setNewAllergy(event.target.value)} className="focus-soft h-10 rounded-full border border-border-soft bg-soft-green px-4" placeholder="Alergi baru" />
              <Button type="button" size="sm" onClick={addAllergy}>Tambah</Button>
            </span>
          ) : (
            <button type="button" className="focus-soft rounded-full border border-dashed border-border-soft px-5 py-2 text-text-secondary" onClick={() => setShowAllergyInput(true)}>+ Tambah Alergi</button>
          )}
        </div>
      </Card>
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border-soft bg-muted-green p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex gap-3 text-text-secondary"><AlertCircle className="h-5 w-5" />Perubahan akan langsung diterapkan pada rekomendasi menu berikutnya.</p>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={() => setDraft(profile)}>Batalkan</Button>
          <Button type="button" onClick={saveChanges}>Simpan Perubahan</Button>
        </div>
      </div>
    </AppShell>
  );
}
