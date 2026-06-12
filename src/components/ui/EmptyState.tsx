import type { ReactNode } from "react";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft bg-soft-green/40 p-8 text-center",
        className,
      )}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted-green text-text-secondary">
        {icon ?? <PlusCircle className="h-7 w-7" />}
      </div>
      <h3 className="font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-56 text-sm text-text-secondary">{description}</p>
    </div>
  );
}
