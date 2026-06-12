import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  barClassName?: string;
};

export function ProgressBar({ value, className, barClassName }: ProgressBarProps) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-muted-green", className)}>
      <div
        className={cn("h-full rounded-full bg-primary transition-all duration-300", barClassName)}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
