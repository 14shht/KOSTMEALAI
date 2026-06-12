import { Flame, Heart, Timer, Trash2, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type FavoriteMealCardProps = {
  title: string;
  image: string;
  tags: string[];
  kcal: number;
  price: string;
  time: string;
};

export function FavoriteMealCard({ title, image, tags, kcal, price, time }: FavoriteMealCardProps) {
  const imageStyle = image.startsWith("/") ? { backgroundImage: `url(${image})` } : undefined;
  return (
    <Card className="overflow-hidden">
      <div className={cn("relative h-56 bg-cover bg-center", !imageStyle && image)} style={imageStyle}>
        <button aria-label={`Hapus ${title} dari favorit`} className="absolute right-4 top-4 rounded-full bg-white p-3 text-red-600 shadow-card">
          <Heart className="h-5 w-5 fill-current" />
        </button>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {tags.map((tag, index) => (
            <Badge key={tag} tone={index % 2 ? "orange" : "green"}>{tag}</Badge>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Flame className="h-4 w-4" />{kcal} kkal</span>
          <span className="flex items-center gap-1"><WalletCards className="h-4 w-4" />{price}</span>
          <span className="flex items-center gap-1"><Timer className="h-4 w-4" />{time}</span>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Button variant="secondary" size="sm" className="flex-1">Detail</Button>
          <Button variant="orange" size="sm" className="flex-1">Pakai Lagi</Button>
          <button aria-label={`Hapus ${title}`} className="focus-soft rounded-full bg-danger/15 p-3 text-danger">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
