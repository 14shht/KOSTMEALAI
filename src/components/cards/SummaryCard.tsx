import type { LucideIcon } from "lucide-react";
import { CountUpText } from "@/components/landing/CountUpText";
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

function AnimatedMetric({ value }: { value: string }) {
  if (value.startsWith("Rp ")) {
    const numericValue = Number(value.replace(/\D/g, ""));

    return <CountUpText value={numericValue} prefix="Rp " />;
  }

  if (/^\d[\d.]*\s\/\s\d[\d.]*$/.test(value)) {
    const [current, target] = value.split(" / ").map((part) => Number(part.replace(/\D/g, "")));

    return (
      <>
        <CountUpText value={current} /> / <CountUpText value={target} />
      </>
    );
  }

  return value;
}

function AnimatedCaption({ caption, tone }: { caption: string; tone?: string }) {
  const match = caption.match(/^(\d+)(.*)$/);
  const className = `mt-3 text-sm font-medium ${tone === "orange" ? "text-brown-orange" : "text-primary"}`;

  if (!match) {
    return <p className={className}>{caption}</p>;
  }

  return (
    <p className={className}>
      <CountUpText value={Number(match[1])} />
      {match[2]}
    </p>
  );
}

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
      <h3 className="mt-1 text-2xl font-bold leading-tight text-text-primary">
        <AnimatedMetric value={value} />
      </h3>
      {progress ? (
        <ProgressBar value={progress} className="mt-5" barClassName={tone === "orange" ? "bg-orange" : "bg-primary"} />
      ) : null}
      {caption ? <AnimatedCaption caption={caption} tone={tone} /> : null}
    </Card>
  );
}
