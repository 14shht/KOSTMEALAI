"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Banknote, CalendarDays, Flame, WalletCards } from "lucide-react";
import { createAuthUser, getAuthUser, saveAuthUser } from "@/lib/auth";
import { authUserChangedEvent } from "@/lib/hooks/use-auth-user";
import { generatedMealPlanSchema } from "@/lib/ai/meal-plan-schema";
import { foodImages } from "@/lib/constants";
import { favorites as mockFavorites, todayMeals } from "@/lib/mock-data";
import { readStorage, writeStorage } from "@/lib/storage";
import type { GeneratedMealPlan } from "@/lib/types/meal-plan";
import type { MealHistoryRecord, ProfilePreferences, ShoppingItem, StoredMeal } from "@/lib/types";

const activePlanKey = "kostmeal.activeMealPlan";
const legacyGeneratedPlanKey = "kostmeal.generatedPlan";
const favoriteMealsKey = "kostmeal.favoriteMeals";
const shoppingListKey = "kostmeal.shoppingList";
const mealHistoryKey = "kostmeal.mealHistory";
const profilePreferencesKey = "kostmeal.profilePreferences";
const completedMealIdsKey = "kostmeal.completedMealIds";
const activeExtraMealsKey = "kostmeal.activeExtraMeals";

const defaultProfile: ProfilePreferences = {
  fullName: "Faiq",
  email: "faiq@example.com",
  job: "Mahasiswa",
  location: "Jakarta Selatan",
  preferences: ["Indonesia", "Western"],
  cookingTools: ["Rice Cooker", "Kompor Gas"],
  allergies: ["Kacang Tanah", "Udang"],
};

function formatRupiahShort(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getAccountStorageKey(key: string) {
  const email = getAuthUser()?.email.trim().toLowerCase();
  return `${key}.${encodeURIComponent(email || "guest")}`;
}

function goalLabel(goal: GeneratedMealPlan["summary"]["goal"]) {
  const labels = {
    "hemat-kalori": "Hemat Kalori",
    "high-protein": "High Protein",
    balance: "Balance",
    "hemat-budget": "Hemat Budget",
  };

  return labels[goal];
}

function dateRange(days: number) {
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + Math.max(days - 1, 0));

  const formatter = new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function planToMeals(plan: GeneratedMealPlan | null, completedMealIds: string[]): StoredMeal[] {
  if (!plan) {
    return todayMeals.map((meal, index) => {
      const id = `mock-${index}`;

      return {
        id,
        title: meal.title,
        mealType: meal.mealType,
        time: meal.time ?? "15 Menit",
        price: meal.price ?? "Rp 0",
        calories: meal.calories ?? 0,
        protein: meal.protein ?? "0g",
        image: meal.image,
        tags: meal.mealType ? [meal.mealType] : [],
        completed: completedMealIds.includes(id),
      };
    });
  }

  return plan.days[0]?.meals.map((meal, index) => {
    const id = `day-1-${meal.type}-${meal.name}`;
    return {
      id,
      title: meal.name,
      mealType: meal.type,
      time: `${meal.prepTimeMinutes} Menit`,
      price: formatRupiahShort(meal.estimatedCost),
      calories: meal.estimatedCalories,
      protein: `${meal.estimatedProtein}g`,
      image: [foodImages.nasiGoreng, foodImages.ayamSayur, foodImages.smoothie][index % 3],
      tags: [meal.type, goalLabel(plan.summary.goal)],
      description: meal.description,
      ingredients: meal.ingredients.map((ingredient) => `${ingredient.name} (${ingredient.quantity})`),
      steps: meal.steps,
      completed: completedMealIds.includes(id),
    };
  }) ?? [];
}

function planToShoppingItems(plan: GeneratedMealPlan): ShoppingItem[] {
  return plan.shoppingList.flatMap((category) =>
    category.items.map((item) => ({
      id: createId("shop"),
      name: item.name,
      category: category.category,
      quantity: item.quantity,
      estimatedPrice: item.estimatedPrice,
      checked: false,
    })),
  );
}

function planToHistory(plan: GeneratedMealPlan): MealHistoryRecord {
  return {
    id: createId("history"),
    createdAt: new Date().toISOString(),
    title: plan.title,
    range: dateRange(plan.days.length),
    cost: plan.summary.estimatedTotalCost,
    budget: plan.summary.weeklyBudget,
    goal: plan.summary.goal,
    calories: plan.summary.averageCaloriesPerDay,
    protein: plan.summary.averageProteinPerDay,
    status: "Berjalan",
    plan,
  };
}

function getInitialPlan() {
  const activePlan = readStorage<GeneratedMealPlan | null>(activePlanKey, null);
  if (activePlan) return activePlan;

  const legacyPlan = readStorage<unknown | null>(legacyGeneratedPlanKey, null);
  const parsedLegacyPlan = generatedMealPlanSchema.safeParse(legacyPlan);
  return parsedLegacyPlan.success ? parsedLegacyPlan.data : null;
}

function getInitialFavorites(): StoredMeal[] {
  const stored = readStorage<StoredMeal[] | null>(getAccountStorageKey(favoriteMealsKey), null);
  if (stored) return stored;

  return mockFavorites.map((favorite, index) => ({
    id: `favorite-${index}`,
    title: favorite.title,
    image: favorite.image,
    tags: favorite.tags,
    calories: favorite.kcal,
    price: favorite.price,
    time: favorite.time,
    protein: "20g",
    category: favorite.tags[0] ?? "Favorit",
  }));
}

function getInitialProfile(): ProfilePreferences {
  const authUser = getAuthUser();
  const stored = readStorage<ProfilePreferences | null>(profilePreferencesKey, null);

  if (stored) return { ...stored, email: authUser?.email ?? stored.email };
  if (!authUser) return defaultProfile;

  return {
    ...defaultProfile,
    fullName: authUser.displayName,
    email: authUser.email,
  };
}

export function useKostMealStore() {
  const [hydrated, setHydrated] = useState(false);
  const [activeMealPlan, setActiveMealPlan] = useState<GeneratedMealPlan | null>(null);
  const [favoriteMeals, setFavoriteMeals] = useState<StoredMeal[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [mealHistory, setMealHistory] = useState<MealHistoryRecord[]>([]);
  const [profile, setProfile] = useState<ProfilePreferences>(defaultProfile);
  const [completedMealIds, setCompletedMealIds] = useState<string[]>([]);
  const [activeExtraMeals, setActiveExtraMeals] = useState<StoredMeal[]>([]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const initialPlan = getInitialPlan();
      const initialShopping = readStorage<ShoppingItem[] | null>(shoppingListKey, null);
      setActiveMealPlan(initialPlan);
      setFavoriteMeals(getInitialFavorites());
      setShoppingList(initialShopping ?? (initialPlan ? planToShoppingItems(initialPlan) : []));
      setMealHistory(readStorage<MealHistoryRecord[]>(mealHistoryKey, []));
      setProfile(getInitialProfile());
      const storedCompletedMealIds = readStorage<string[] | null>(completedMealIdsKey, null);
      setCompletedMealIds(
        storedCompletedMealIds ?? (initialPlan ? [] : todayMeals.flatMap((meal, index) => (meal.ready ? [`mock-${index}`] : []))),
      );
      setActiveExtraMeals(readStorage<StoredMeal[]>(getAccountStorageKey(activeExtraMealsKey), []));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(activePlanKey, activeMealPlan);
    writeStorage(legacyGeneratedPlanKey, activeMealPlan);
    writeStorage(getAccountStorageKey(favoriteMealsKey), favoriteMeals);
    writeStorage(shoppingListKey, shoppingList);
    writeStorage(mealHistoryKey, mealHistory);
    writeStorage(profilePreferencesKey, profile);
    writeStorage(completedMealIdsKey, completedMealIds);
    writeStorage(getAccountStorageKey(activeExtraMealsKey), activeExtraMeals);
  }, [activeExtraMeals, activeMealPlan, completedMealIds, favoriteMeals, hydrated, mealHistory, profile, shoppingList]);

  const todayMealList = useMemo(
    () => [...planToMeals(activeMealPlan, completedMealIds), ...activeExtraMeals.map((meal) => ({
      ...meal,
      completed: completedMealIds.includes(meal.id),
    }))],
    [activeExtraMeals, activeMealPlan, completedMealIds],
  );

  const dashboardSummaryCards = useMemo(() => {
    const totalShopping = shoppingList.reduce((total, item) => total + item.estimatedPrice, 0);
    const remainingShoppingItems = shoppingList.filter((item) => !item.checked).length;
    const totalCalories = todayMealList.reduce((total, meal) => total + meal.calories, 0);
    const completedCalories = todayMealList.filter((meal) => meal.completed).reduce((total, meal) => total + meal.calories, 0);
    const completedDays = activeMealPlan ? Math.min(activeMealPlan.days.length, Math.max(1, completedMealIds.length)) : 0;
    const budget = activeMealPlan?.summary.weeklyBudget ?? 450000;
    const remainingBudget = Math.max(budget - totalShopping, 0);

    return [
      {
        label: "Sisa Budget",
        value: formatRupiahShort(remainingBudget),
        meta: "Minggu Ini",
        progress: budget ? Math.round((remainingBudget / budget) * 100) : 0,
        tone: "green",
        icon: WalletCards,
      },
      {
        label: "Kalori Harian",
        value: `${completedCalories} / ${totalCalories || activeMealPlan?.summary.averageCaloriesPerDay || 2100}`,
        meta: "Target",
        progress: totalCalories ? Math.round((completedCalories / totalCalories) * 100) : 0,
        tone: "orange",
        icon: Flame,
      },
      {
        label: "Rencana Mingguan",
        value: activeMealPlan ? "Aktif" : "Kosong",
        meta: "Status",
        caption: activeMealPlan ? `${Math.max(activeMealPlan.days.length - completedDays, 0)} hari tersisa` : "Buat plan baru",
        icon: CalendarDays,
      },
      {
        label: "Daftar Belanja",
        value: formatRupiahShort(totalShopping),
        meta: "Estimasi",
        caption: `${remainingShoppingItems} item belum dibeli`,
        tone: "orange",
        icon: Banknote,
      },
    ];
  }, [activeMealPlan, completedMealIds.length, shoppingList, todayMealList]);

  const saveActiveMealPlan = useCallback((plan: GeneratedMealPlan) => {
    setActiveMealPlan(plan);
    setShoppingList(planToShoppingItems(plan));
    setMealHistory((current) => [planToHistory(plan), ...current]);
    setCompletedMealIds([]);
    setActiveExtraMeals([]);
  }, []);

  const toggleMealCompleted = useCallback((mealId: string) => {
    setCompletedMealIds((current) => (
      current.includes(mealId) ? current.filter((id) => id !== mealId) : [...current, mealId]
    ));
  }, []);

  const addSnack = useCallback((meal: StoredMeal) => {
    setFavoriteMeals((current) => current.some((item) => item.id === meal.id) ? current : [meal, ...current]);
  }, []);

  const addFavoriteMeal = useCallback((meal: StoredMeal) => {
    setFavoriteMeals((current) => current.some((item) => item.title === meal.title) ? current : [{ ...meal, id: meal.id || createId("fav") }, ...current]);
  }, []);

  const removeFavoriteMeal = useCallback((mealId: string) => {
    setFavoriteMeals((current) => current.filter((meal) => meal.id !== mealId));
  }, []);

  const applyFavoriteAgain = useCallback((meal: StoredMeal) => {
    setActiveExtraMeals((current) => current.some((item) => item.id === meal.id) ? current : [{ ...meal, mealType: meal.mealType ?? "Favorit" }, ...current]);
    setFavoriteMeals((current) => current.some((item) => item.id === meal.id) ? current : [meal, ...current]);
  }, []);

  const addActiveMeal = useCallback((meal: StoredMeal) => {
    const nextMeal = { ...meal, id: meal.id || createId("active") };
    setActiveExtraMeals((current) => current.some((item) => item.id === nextMeal.id) ? current : [nextMeal, ...current]);
  }, []);

  const toggleShoppingItem = useCallback((itemId: string) => {
    setShoppingList((current) => current.map((item) => item.id === itemId ? { ...item, checked: !item.checked } : item));
  }, []);

  const markAllShoppingBought = useCallback(() => {
    setShoppingList((current) => current.map((item) => ({ ...item, checked: true })));
  }, []);

  const addShoppingItem = useCallback((item: Omit<ShoppingItem, "id" | "checked">) => {
    setShoppingList((current) => [{ ...item, id: createId("shop"), checked: false }, ...current]);
  }, []);

  const updateProfile = useCallback((nextProfile: ProfilePreferences) => {
    setProfile(nextProfile);
    saveAuthUser(createAuthUser({ email: nextProfile.email, fullName: nextProfile.fullName }));
    window.dispatchEvent(new Event(authUserChangedEvent));
  }, []);

  return {
    hydrated,
    activeMealPlan,
    favoriteMeals,
    shoppingList,
    mealHistory,
    profile,
    completedMealIds,
    todayMealList,
    dashboardSummaryCards,
    saveActiveMealPlan,
    toggleMealCompleted,
    addSnack,
    addFavoriteMeal,
    removeFavoriteMeal,
    applyFavoriteAgain,
    addActiveMeal,
    toggleShoppingItem,
    markAllShoppingBought,
    addShoppingItem,
    updateProfile,
  };
}
