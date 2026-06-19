"use client";

import { Flame, Timer, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BaseModal } from "@/components/modals/BaseModal";
import type { StoredMeal } from "@/lib/types";

type MealDetailModalProps = {
  meal: StoredMeal | null;
  onClose: () => void;
  onFavorite?: (meal: StoredMeal) => void;
};

export function MealDetailModal({ meal, onClose, onFavorite }: MealDetailModalProps) {
  return (
    <BaseModal open={Boolean(meal)} title={meal?.title ?? "Detail Menu"} onClose={onClose}>
      {meal ? (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {meal.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
          {meal.description ? <p className="leading-7 text-text-secondary">{meal.description}</p> : null}
          <div className="grid grid-cols-3 gap-3 text-sm text-text-secondary">
            <span className="rounded-xl bg-soft-green p-3"><Flame className="mb-1 h-4 w-4" />{meal.calories} kkal</span>
            <span className="rounded-xl bg-soft-green p-3"><WalletCards className="mb-1 h-4 w-4" />{meal.price}</span>
            <span className="rounded-xl bg-soft-green p-3"><Timer className="mb-1 h-4 w-4" />{meal.time}</span>
          </div>
          {meal.ingredients?.length ? (
            <div>
              <h3 className="mb-2 font-semibold">Bahan</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                {meal.ingredients.map((ingredient) => <li key={ingredient}>- {ingredient}</li>)}
              </ul>
            </div>
          ) : null}
          {meal.steps?.length ? (
            <div>
              <h3 className="mb-2 font-semibold">Langkah</h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-text-secondary">
                {meal.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          ) : null}
          {onFavorite ? (
            <Button className="w-full" type="button" onClick={() => onFavorite(meal)}>
              Simpan ke Favorit
            </Button>
          ) : null}
        </div>
      ) : null}
    </BaseModal>
  );
}
