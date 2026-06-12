import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

type SummaryCardProps = {
  label: string;
  value: string;
  meta?: string;
  caption?: string;
  progress?: number;
  tone?: string;
  icon: LucideIcon;
};

export function SummaryCard({ label, value, meta, caption, progress, tone, icon: Icon }: SummaryCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-soft-green text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {meta ? <span className="text-xs text-text-secondary">{meta}</span> : null}
      </div>
      <p className="mt-5 text-sm font-medium text-text-secondary">{label}</p>
      <h3 className="mt-1 text-2xl font-bold leading-tight text-text-primary">{value}</h3>
      {progress ? (
        <ProgressBar value={progress} className="mt-5" barClassName={tone === "orange" ? "bg-orange" : "bg-primary"} />
      ) : null}
      {caption ? (
        <p className={`mt-3 text-sm font-medium ${tone === "orange" ? "text-brown-orange" : "text-primary"}`}>
          {caption}
        </p>
      ) : null}
    </Card>
  );
}
