"use client";

import { useState } from "react";
import { CalendarPlus, Check, Heart } from "lucide-react";
import { CountUpText } from "@/components/landing/CountUpText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const scheduleSlots = ["Sarapan", "Makan Siang", "Makan Malam"];

export function ScheduleMealCard() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

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
            onClick={() => setIsFavorite((current) => !current)}
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
          leftIcon={selectedSlot ? <Check className="h-4 w-4" /> : <CalendarPlus className="h-4 w-4" />}
          disabled={!selectedSlot}
        >
          {selectedSlot ? `Ditambahkan ke ${selectedSlot}` : "Pilih Jadwal Makan"}
        </Button>
      </div>
    </Card>
  );
}
