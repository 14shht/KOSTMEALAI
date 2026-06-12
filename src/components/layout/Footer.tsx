import { Send } from "lucide-react";
import { appName } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#243027] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-10">
        <div>
          <h2 className="text-xl font-bold text-primary-light">{appName}</h2>
          <p className="mt-4 text-sm text-white/65">
            Solusi nutrisi dan manajemen budget cerdas untuk gaya hidup modern.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Produk</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Generate Menu</li>
            <li>Daftar Belanja</li>
            <li>Nutrient Tracker</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Perusahaan</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Tentang Kami</li>
            <li>Karir</li>
            <li>Kontak</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Newsletter</h3>
          <p className="mt-4 text-sm text-white/60">Dapatkan tips hemat dan resep baru setiap minggu.</p>
          <div className="mt-4 flex rounded-full bg-white/10 p-1">
            <input
              aria-label="Email newsletter"
              placeholder="Email kamu"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/35"
            />
            <button aria-label="Kirim newsletter" className="rounded-full bg-primary-light p-2 text-primary-dark">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/35">
        © 2024 KostMeal AI. All rights reserved.
      </div>
    </footer>
  );
}
