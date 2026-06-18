"use client";

import { IdCard } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuthUser } from "@/lib/hooks/use-auth-user";

export function ProfileForm() {
  const { authUser } = useAuthUser();

  return (
    <Card className="p-6" hover={false}>
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold"><IdCard className="h-5 w-5 text-primary" />Informasi Pengguna</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <Input label="Nama Lengkap" value={authUser.displayName} readOnly />
        <Input label="Email" value={authUser.email} readOnly />
        <Select label="Pekerjaan" options={["Karyawan Swasta", "Mahasiswa", "Freelancer"]} />
        <Input label="Domisili" defaultValue="Jakarta Selatan" />
      </div>
    </Card>
  );
}

export function PreferencePanel() {
  return (
    <Card className="p-6" hover={false}>
      <h2 className="mb-5 text-lg font-semibold">Preferensi Makanan</h2>
      <div className="flex flex-wrap gap-2">
        {["Indonesia", "Western", "Asian Fusion", "Vegetarian", "Pedas"].map((item, index) => (
          <Chip key={item} selected={index < 2}>{item}</Chip>
        ))}
      </div>
      <div className="my-6 h-px bg-border-soft" />
      <h3 className="mb-4 font-medium uppercase text-text-secondary">Peralatan Masak Tersedia</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Checkbox label="Rice Cooker" defaultChecked />
        <Checkbox label="Kompor Gas" defaultChecked />
        <Checkbox label="Air Fryer" />
        <Checkbox label="Microwave" />
      </div>
    </Card>
  );
}
