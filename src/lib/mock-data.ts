import {
  BadgeCheck,
  Banknote,
  Beef,
  BicepsFlexed,
  CalendarDays,
  Flame,
  Leaf,
  Soup,
  Utensils,
  WalletCards,
} from "lucide-react";
import { foodImages } from "./constants";

export const user = {
  name: "Faiq",
  fullName: "Budi Santoso",
  subtitle: "Anak Kos Hemat",
  plan: "Premium Member",
  initials: "F",
};

export const summaryCards = [
  {
    label: "Sisa Budget",
    value: "Rp 450.000",
    meta: "Bulan Ini",
    progress: 68,
    tone: "green",
    icon: WalletCards,
  },
  {
    label: "Kalori Harian",
    value: "1.450 / 2.100",
    meta: "Target",
    progress: 69,
    tone: "orange",
    icon: Flame,
  },
  {
    label: "Plan Aktif",
    value: '"Kos Hemat Pro"',
    meta: "Status",
    caption: "4 hari tersisa",
    icon: CalendarDays,
  },
  {
    label: "Daftar Belanja",
    value: "Rp 128.500",
    meta: "Estimasi",
    caption: "12 item belum dibeli",
    tone: "orange",
    icon: Banknote,
  },
];

export const todayMeals = [
  {
    title: "Nasi Goreng Oat & Telur",
    mealType: "Breakfast",
    time: "15 Menit",
    price: "Rp 12.000",
    calories: 420,
    protein: "18g",
    image: foodImages.nasiGoreng,
    ready: true,
  },
  {
    title: "Ayam Bakar & Sayur Rebus",
    mealType: "Lunch",
    time: "25 Menit",
    price: "Rp 18.000",
    calories: 550,
    protein: "32g",
    image: foodImages.ayamSayur,
  },
  {
    title: "Tumis Tempe & Brokoli",
    mealType: "Dinner",
    time: "20 Menit",
    price: "Rp 14.000",
    calories: 390,
    protein: "24g",
    image: foodImages.smoothie,
    locked: true,
  },
];

export const nutrition = [
  { label: "Protein", value: 50, target: 120, color: "bg-primary" },
  { label: "Karbohidrat", value: 180, target: 250, color: "bg-orange" },
  { label: "Lemak", value: 45, target: 70, color: "bg-orange/60" },
];

export const generateGoals = [
  {
    title: "Hemat Kalori",
    desc: "Fokus pada makanan rendah kalori & sehat.",
    icon: Flame,
  },
  {
    title: "High Protein",
    desc: "Cocok untuk yang rajin olahraga/gym.",
    icon: BicepsFlexed,
    selected: true,
  },
  {
    title: "Balance",
    desc: "Keseimbangan karbo, protein, dan lemak.",
    icon: BadgeCheck,
  },
];

export const cookingTools = [
  { label: "Rice Cooker", checked: true },
  { label: "Kompor Portable", checked: true },
  { label: "Air Fryer" },
  { label: "Microwave" },
  { label: "Blender" },
  { label: "Kulkas" },
];

export const tastePrefs = [
  "Pedas Banget",
  "Tanpa Micin",
  "Cepat Saji (<15mnt)",
  "Olahan Telur",
  "Olahan Ayam",
];

export const weeklyPlans = [
  {
    day: "SENIN",
    title: "Hari 1",
    badge: "Optimal",
    image: foodImages.nasiKuning,
    meals: [
      ["SARAPAN", "Nasi Kuning Kost Spesial"],
      ["MAKAN SIANG", "Soto Ayam Bening Hemat"],
    ],
    kcal: "1,850 kkal",
    price: "Rp42.500",
  },
  {
    day: "SELASA",
    title: "Hari 2",
    image: foodImages.oatmeal,
    meals: [
      ["SARAPAN", "Omelet Sayur & Roti Gandum"],
      ["MAKAN SIANG", "Gado-Gado Siram Kacang"],
    ],
    kcal: "1,920 kkal",
    price: "Rp38.000",
  },
];

export const shoppingCategories = [
  {
    title: "Carbohydrates",
    icon: Soup,
    count: 4,
    tone: "orange",
    items: [
      { name: "Beras Putih Cianjur", detail: "2 kg • Est. Rp 32.000" },
      { name: "Mie Instan (Soto)", detail: "5 bks • Est. Rp 15.000" },
    ],
  },
  {
    title: "Protein",
    icon: Beef,
    count: 3,
    tone: "red",
    items: [
      { name: "Dada Ayam Fillet", detail: "500g • Est. Rp 28.000", checked: true },
      { name: "Telur Ayam", detail: "10 btr • Est. Rp 20.000" },
    ],
  },
  {
    title: "Vegetables",
    icon: Leaf,
    count: 5,
    tone: "green",
    items: [
      { name: "Sawi Hijau", detail: "1 ikat • Est. Rp 5.000" },
      { name: "Wortel Lokal", detail: "250g • Est. Rp 4.500" },
    ],
  },
  {
    title: "Seasoning",
    icon: Utensils,
    count: 6,
    tone: "orange",
    items: [
      { name: "Bawang Putih", detail: "100g • Est. Rp 7.000" },
      { name: "Garam Meja", detail: "1 pks • Est. Rp 3.000" },
    ],
  },
] as const;

export const favorites = [
  {
    title: "Salad Ayam Bakar Spesial",
    image: foodImages.salad,
    tags: ["Mudah", "Hemat"],
    kcal: 320,
    price: "Rp 15.000",
    time: "15 Menit",
  },
  {
    title: "Healthy Mediterranean Bowl",
    image: foodImages.ayamSayur,
    tags: ["Menengah", "Populer"],
    kcal: 450,
    price: "Rp 22.000",
    time: "20 Menit",
  },
  {
    title: "Mie Goreng Telur Sayur",
    image: foodImages.mie,
    tags: ["Sangat Mudah", "Favorit"],
    kcal: 510,
    price: "Rp 8.000",
    time: "10 Menit",
  },
  {
    title: "Veggie Tortilla Wrap",
    image: foodImages.wrap,
    tags: ["Mudah", "Diet"],
    kcal: 280,
    price: "Rp 12.000",
    time: "8 Menit",
  },
  {
    title: "Oatmeal Berry Delight",
    image: foodImages.oatmeal,
    tags: ["Instan", "Breakfast"],
    kcal: 350,
    price: "Rp 10.000",
    time: "5 Menit",
  },
];

export const historyRows = [
  {
    range: "12 - 18 Mei 2024",
    week: "Minggu ke-3 Mei",
    cost: "Rp 185.000",
    tag: "Hemat",
    calories: "2.100 kkal",
    protein: "75g",
    status: "Selesai",
  },
  {
    range: "19 - 25 Mei 2024",
    week: "Minggu ke-4 Mei",
    cost: "Rp 210.500",
    tag: "Normal",
    calories: "2.450 kkal",
    protein: "95g",
    status: "Berjalan",
  },
  {
    range: "05 - 11 Mei 2024",
    week: "Minggu ke-2 Mei",
    cost: "Rp 155.000",
    tag: "Hemat",
    calories: "1.950 kkal",
    protein: "60g",
    status: "Selesai",
  },
];
