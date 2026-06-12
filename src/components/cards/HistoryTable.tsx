import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { historyRows } from "@/lib/mock-data";

export function HistoryTable() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
      <div className="hidden grid-cols-[1.2fr_0.8fr_1.4fr_0.8fr_0.5fr] bg-muted-green px-6 py-4 text-sm font-bold uppercase text-text-secondary md:grid">
        <span>Rentang Waktu</span>
        <span>Total Biaya</span>
        <span>Nutrisi</span>
        <span>Status</span>
        <span>Aksi</span>
      </div>
      {historyRows.map((row, index) => (
        <div key={row.range} className="grid gap-5 border-b border-border-soft px-6 py-6 md:grid-cols-[1.2fr_0.8fr_1.4fr_0.8fr_0.5fr] md:items-center">
          <div className="flex items-center gap-4">
            <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${index === 1 ? "bg-orange/15 text-brown-orange" : "bg-primary-light/20 text-primary"}`}>
              <CalendarDays className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-text-primary">{row.range}</p>
              <p className="text-sm text-text-secondary">{row.week}</p>
            </div>
          </div>
          <div>
            <p className="font-bold">{row.cost}</p>
            <Badge tone={row.tag === "Hemat" ? "orange" : "muted"}>{row.tag}</Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-[64px_1fr_80px] items-center gap-2">
              <span>Kalori:</span><ProgressBar value={72} /><b>{row.calories}</b>
            </div>
            <div className="grid grid-cols-[64px_1fr_80px] items-center gap-2">
              <span>Protein:</span><ProgressBar value={65} barClassName="bg-orange" /><b>{row.protein}</b>
            </div>
          </div>
          <Badge tone={row.status === "Selesai" ? "green" : "orange"} className="w-fit normal-case">{row.status}</Badge>
          <Button variant="outline" size="sm">Detail</Button>
        </div>
      ))}
      <div className="flex flex-col gap-4 px-6 py-5 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <span>Menampilkan 3 dari 24 rencana makan</span>
        <div className="flex gap-2">
          <button className="rounded-full bg-soft-green p-3"><ChevronLeft className="h-4 w-4" /></button>
          {[1, 2, 3].map((page) => (
            <button key={page} className={`h-10 w-10 rounded-full border border-border-soft ${page === 1 ? "bg-primary text-white" : "bg-soft-green"}`}>{page}</button>
          ))}
          <button className="rounded-full bg-soft-green p-3"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
