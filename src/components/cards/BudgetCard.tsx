import { Banknote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function BudgetCard() {
  return (
    <Card className="p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold"><Banknote className="h-5 w-5 text-primary" />Pengaturan Anggaran</h2>
      <p className="mt-5 text-text-secondary">KostMeal akan merekomendasikan resep sesuai budget harianmu.</p>
      <div className="mt-8 flex justify-between">
        <span>Budget Makan Harian</span>
        <span className="font-semibold text-primary">Rp 50.000</span>
      </div>
      <ProgressBar value={42} className="mt-4" />
      <div className="mt-5 flex justify-between text-xs font-bold uppercase text-text-secondary">
        <span>Irit (15rb)</span><span>Normal</span><span>Sultan (200rb)</span>
      </div>
    </Card>
  );
}
