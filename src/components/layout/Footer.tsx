import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { appName } from "@/lib/constants";

export function Footer() {
  const navigationLinks = [
    { href: "/", label: "Beranda" },
    { href: "#fitur", label: "Fitur Utama", active: true },
    { href: "#resep", label: "Resep" },
    { href: "/login", label: "Masuk" },
    { href: "/login", label: "Daftar Sekarang" },
  ];

  const featureLinks = [
    "AI Meal Generator",
    "Pantau Nutrisi",
    "Smart Shopping List",
  ];

  const supportLinks = [
    "Pusat Bantuan",
    "Kontak Kami",
    "Kebijakan Privasi",
    "Syarat & Ketentuan",
  ];

  return (
    <footer className="border-t border-border-soft bg-white text-text-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo textClassName="text-xl" />
            <p className="mt-5 max-w-xs text-sm font-semibold leading-6">
              Makan sehat, budget tetap waras
            </p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-text-secondary">
              Bantu anak kos merencanakan menu bergizi, pantau nutrisi harian,
              dan hemat belanja dengan bantuan AI.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-text-secondary/60">Navigasi</h3>
            <ul className="mt-6 space-y-5 text-sm">
              {navigationLinks.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className={item.active ? "font-medium text-primary" : "text-text-secondary hover:text-primary"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-text-secondary/60">Fitur</h3>
            <ul className="mt-6 space-y-5 text-sm text-text-secondary">
              {featureLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-text-secondary/60">Dukungan</h3>
            <ul className="mt-6 space-y-5 text-sm text-text-secondary">
              {supportLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border-soft pt-8 text-sm text-text-secondary">
          <p>&copy; 2026 {appName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
