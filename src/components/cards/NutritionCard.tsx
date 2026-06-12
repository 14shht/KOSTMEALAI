import { Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { nutrition } from "@/lib/mock-data";

export function NutritionCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Analisis Nutrisi</h2>
        <Info className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-7 space-y-6">
        {nutrition.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-text-primary">{item.label}</span>
              <span className="text-text-secondary">{item.value}g / {item.target}g</span>
            </div>
            <ProgressBar value={(item.value / item.target) * 100} barClassName={item.color} />
          </div>
        ))}
      </div>
      <div className="mt-7 border-t border-border-soft pt-6 text-center text-sm text-text-secondary">
        &ldquo;Kamu butuh lebih banyak <b className="text-primary">Protein</b> untuk mencapai target mingguan.&rdquo;
      </div>
    </Card>
  );
}
