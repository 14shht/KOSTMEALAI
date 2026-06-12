import { Check, LockKeyhole, Timer } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type MealCardProps = {
  title: string;
  mealType?: string;
  time?: string;
  price?: string;
  calories?: number;
  protein?: string;
  image: string;
  ready?: boolean;
  locked?: boolean;
};

export function MealCard({ title, mealType, time, price, calories, protein, image, ready, locked }: MealCardProps) {
  const imageStyle = image.startsWith("/") ? { backgroundImage: `url(${image})` } : undefined;
  return (
    <Card className="overflow-hidden">
      <div className={cn("relative h-40 bg-cover bg-center", !imageStyle && image, locked && "opacity-70")} style={imageStyle}>
        {mealType ? <Badge className="absolute left-4 top-4 normal-case" tone="muted">{mealType}</Badge> : null}
        {locked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
            <LockKeyhole className="h-8 w-8" />
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold leading-tight text-text-primary">{title}</h3>
        {locked ? (
          <p className="mt-7 text-sm italic text-text-secondary">Menu akan terbuka pukul 17:00</p>
        ) : (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              {time ? <Badge className="normal-case">{time}</Badge> : null}
              {price ? <Badge className="normal-case" tone="orange">{price}</Badge> : null}
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-border-soft pt-4">
              <div className="flex gap-5 text-sm">
                <span><b className="block text-xs">CAL</b>{calories}</span>
                <span><b className="block text-xs">PROT</b>{protein}</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary text-white">
                {ready ? <Check className="h-5 w-5" /> : <Timer className="h-5 w-5 text-primary" />}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
