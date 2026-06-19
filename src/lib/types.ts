import type { GeneratedMealPlan } from "@/lib/types/meal-plan";

export type StoredMeal = {
  id: string;
  title: string;
  mealType?: string;
  time: string;
  price: string;
  calories: number;
  protein: string;
  image: string;
  tags: string[];
  description?: string;
  ingredients?: string[];
  steps?: string[];
  completed?: boolean;
  category?: string;
};

export type ShoppingItem = {
  id: string;
  name: string;
  category: string;
  quantity: string;
  estimatedPrice: number;
  checked: boolean;
};

export type MealHistoryRecord = {
  id: string;
  createdAt: string;
  title: string;
  range: string;
  cost: number;
  budget: number;
  goal: GeneratedMealPlan["summary"]["goal"];
  calories: number;
  protein: number;
  status: "Berjalan" | "Selesai";
  plan: GeneratedMealPlan;
};

export type ProfilePreferences = {
  fullName: string;
  email: string;
  job: string;
  location: string;
  preferences: string[];
  cookingTools: string[];
  allergies: string[];
};
