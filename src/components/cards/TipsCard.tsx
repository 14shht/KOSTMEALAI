import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type TipsCardProps = {
  title: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
};

export function TipsCard({ title, children, dark, className }: TipsCardProps) {
  return (
    <Card hover={false} className={cn("p-6", dark && "border-primary bg-primary text-white", className)}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className={cn("mt-3 text-text-secondary", dark && "text-white/85")}>{children}</div>
    </Card>
  );
}
