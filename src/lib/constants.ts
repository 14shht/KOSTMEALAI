import {
  CalendarClock,
  Grid2X2,
  Heart,
  Sparkles,
  ShoppingCart,
  UserRound,
} from "lucide-react";

export const appName = "KostMeal AI";

export const appNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Grid2X2 },
  { href: "/generate-plan", label: "Generate Plan", icon: Sparkles },
  { href: "/history", label: "Riwayat", icon: CalendarClock },
  { href: "/favorites", label: "Favorit", icon: Heart },
  { href: "/shopping-list", label: "Daftar Belanja", icon: ShoppingCart },
  { href: "/profile", label: "Profil", icon: UserRound },
] as const;

export const foodImages = {
  nasiGoreng: "/assets/foods/nasi-goreng.svg",
  ayamSayur: "/assets/foods/ayam-sayur.svg",
  smoothie: "/assets/foods/bowl.svg",
  nasiKuning: "/assets/foods/nasi-goreng.svg",
  salad: "/assets/foods/ayam-sayur.svg",
  mie: "/assets/foods/noodles.svg",
  wrap: "/assets/foods/bowl.svg",
  oatmeal: "/assets/foods/bowl.svg",
};
