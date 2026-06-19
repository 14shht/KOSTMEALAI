"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Check, Heart } from "lucide-react";
import { CountUpText } from "@/components/landing/CountUpText";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthUser } from "@/lib/hooks/use-auth-user";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import type { StoredMeal } from "@/lib/types";

const scheduleSlots = ["Sarapan", "Makan Siang", "Makan Malam"];
const quinoaBowl: StoredMeal = {
  id: "landing-super-quinoa-bowl",
  title: "Super Quinoa Bowl",
  mealType: "Sarapan",
  time: "20 Menit",
  price: "Rp 18.000",
  calories: 450,
  protein: "18g",
  image: "/assets/foods/buddha-bowl-sayur.png",
  tags: ["Sehat", "High Protein"],
  description: "Quinoa bowl dengan sayuran segar, alpukat, dan buncis panggang.",
};

export function ScheduleMealCard() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [scheduledSlot, setScheduledSlot] = useState<string | null>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const { authUser, isLoading } = useAuthUser();
  const { hydrated, favoriteMeals, addFavoriteMeal, removeFavoriteMeal, addActiveMeal } = useKostMealStore();
  const favoriteEntry = favoriteMeals.find((meal) => meal.id === quinoaBowl.id);
  const isFavorite = Boolean(favoriteEntry);
  const isAddedToSelectedSlot = Boolean(selectedSlot && scheduledSlot === selectedSlot);

  const requireAccount = () => {
    if (isLoading || !hydrated) {
      showToast("Menyiapkan data akun...", "info");
      return false;
    }
    if (authUser) return true;

    showToast("Masuk dulu untuk menyimpan menu ke akunmu.", "info");
    router.push("/login?next=/");
    return false;
  };

  const handleFavorite = () => {
    if (!requireAccount()) return;

    if (favoriteEntry) {
      removeFavoriteMeal(favoriteEntry.id);
      showToast("Menu dihapus dari favorit.");
      return;
    }

    addFavoriteMeal(quinoaBowl);
    showToast("Super Quinoa Bowl disimpan ke favorit.");
  };

  const handleAddToSchedule = () => {
    if (!selectedSlot || !requireAccount()) return;

    addActiveMeal({ ...quinoaBowl, id: `${quinoaBowl.id}-${selectedSlot}`, mealType: selectedSlot, tags: [selectedSlot, "High Protein"] });
    setScheduledSlot(selectedSlot);
    showToast(`Super Quinoa Bowl ditambahkan ke ${selectedSlot.toLowerCase()}.`);
  };

  return (
    <Card className="mx-auto w-full max-w-md overflow-hidden">
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/foods/buddha-bowl-sayur.png')" }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Super Quinoa Bowl</h3>
            <p className="text-sm text-primary">
              Estimasi biaya: <CountUpText value={18000} prefix="Rp " />
            </p>
          </div>
          <button
            type="button"
            onClick={handleFavorite}
            className="focus-soft grid h-10 w-10 shrink-0 place-items-center rounded-full text-text-primary transition hover:bg-soft-green hover:text-primary"
            aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          >
            <Heart className={isFavorite ? "h-6 w-6 fill-primary text-primary" : "h-6 w-6"} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3 text-center text-xs font-bold text-text-secondary">
          <span><CountUpText value={450} /><br />Kalori</span>
          <span><CountUpText value={18} suffix="g" /><br />Protein</span>
          <span><CountUpText value={64} suffix="g" /><br />Karbo</span>
          <span><CountUpText value={22} suffix="g" /><br />Lemak</span>
        </div>

        <div className="mt-6 rounded-2xl bg-[#f8fff6] p-3">
          <p className="text-xs font-black uppercase tracking-wide text-text-secondary">Tambah ke jadwal</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {scheduleSlots.map((slot) => {
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={
                    isSelected
                      ? "rounded-full bg-primary px-3 py-2 text-xs font-black text-white shadow-[0_8px_18px_rgba(0,122,61,0.18)] transition"
                      : "rounded-full bg-white px-3 py-2 text-xs font-black text-text-secondary transition hover:bg-soft-green hover:text-primary"
                  }
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          variant={selectedSlot ? "primary" : "orange"}
          className="mt-4 w-full"
          leftIcon={isAddedToSelectedSlot ? <Check className="h-4 w-4" /> : <CalendarPlus className="h-4 w-4" />}
          disabled={!selectedSlot || isAddedToSelectedSlot}
          onClick={handleAddToSchedule}
        >
          {isAddedToSelectedSlot ? `Sudah ditambahkan ke ${selectedSlot}` : selectedSlot ? `Tambahkan ke ${selectedSlot}` : "Pilih Waktu Makan"}
        </Button>
      </div>
    </Card>
  );
}
