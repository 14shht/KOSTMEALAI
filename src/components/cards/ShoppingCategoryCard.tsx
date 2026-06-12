import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";

type Item = { name: string; detail: string; checked?: boolean };

type ShoppingCategoryCardProps = {
  title: string;
  count: number;
  tone?: "green" | "orange" | "red";
  icon: LucideIcon;
  items: readonly Item[];
};

export function ShoppingCategoryCard({ title, count, icon: Icon, items, tone = "green" }: ShoppingCategoryCardProps) {
  return (
    <Card className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone === "green" ? "bg-primary-light/25 text-primary" : "bg-orange/15 text-brown-orange"}`}>
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
        </div>
        <Badge tone="muted" className="normal-case">{count} Items</Badge>
      </div>
      <div className="space-y-5">
        {items.map((item) => (
          <Checkbox
            key={item.name}
            defaultChecked={item.checked}
            label={
              <span className={item.checked ? "text-text-secondary line-through" : ""}>
                <span className="block font-medium">{item.name}</span>
                <span className="text-text-secondary">{item.detail}</span>
              </span>
            }
          />
        ))}
      </div>
    </Card>
  );
}
