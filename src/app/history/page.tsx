import { Filter, Plus } from "lucide-react";
import { HistoryTable } from "@/components/cards/HistoryTable";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Select } from "@/components/ui/Select";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function HistoryPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Riwayat Rencana Makan"
        subtitle="Pantau perjalanan nutrisi dan pengeluaran makan harianmu."
        action={<Button leftIcon={<Plus className="h-4 w-4" />}>Rencana Baru</Button>}
      />
      <div className="mb-10 rounded-3xl bg-soft-green p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <Select label="Rentang Tanggal" options={["Semua Waktu", "Bulan Ini", "3 Bulan Terakhir"]} />
          <Select label="Anggaran" options={["Semua Budget", "Hemat", "Normal"]} />
          <Select label="Tujuan Diet" options={["Semua Goal", "High Protein", "Balance"]} />
          <IconButton label="Filter" icon={<Filter className="h-5 w-5" />} className="bg-orange text-text-primary hover:bg-orange/80" />
        </div>
      </div>
      <HistoryTable />
    </AppShell>
  );
}
