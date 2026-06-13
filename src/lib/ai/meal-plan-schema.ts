import { z } from "zod";

const trimmedString = z.string().trim();
const trimmedStringArray = z.array(trimmedString).default([]);
const nonNegativeNumber = z.number().min(0);

export const mealPlanRequestSchema = z.object({
  weeklyBudget: z.coerce.number().min(50000, "Budget mingguan minimal Rp 50.000."),
  durationDays: z.coerce.number().refine((value) => [1, 3, 5, 7, 14].includes(value), {
    message: "Durasi harus 1, 3, 5, 7, atau 14 hari.",
  }),
  nutritionGoal: z.enum(["hemat-kalori", "high-protein", "balance", "hemat-budget"]),
  cookingTools: trimmedStringArray.transform((items) => (items.length > 0 ? items : ["rice-cooker"])),
  availableIngredients: trimmedStringArray,
  foodPreferences: trimmedStringArray,
  avoidedFoods: trimmedStringArray,
  allergies: trimmedStringArray,
  mealsPerDay: z.coerce.number().refine((value) => [2, 3, 4].includes(value), {
    message: "Jumlah makan per hari harus 2, 3, atau 4.",
  }),
  location: trimmedString.optional(),
  notes: trimmedString.optional(),
});

export const mealIngredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  estimatedPrice: nonNegativeNumber,
}).strict();

export const mealSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  estimatedCalories: nonNegativeNumber,
  estimatedProtein: nonNegativeNumber,
  estimatedCost: nonNegativeNumber,
  prepTimeMinutes: nonNegativeNumber,
  ingredients: z.array(mealIngredientSchema).min(1),
  steps: z.array(z.string()).min(1),
}).strict();

export const dayMealPlanSchema = z.object({
  dayIndex: z.number(),
  dayName: z.string(),
  label: z.string(),
  totalCalories: nonNegativeNumber,
  totalProtein: nonNegativeNumber,
  totalCost: nonNegativeNumber,
  badges: z.array(z.string()),
  meals: z.array(mealSchema).min(1),
}).strict();

export const shoppingListItemSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  estimatedPrice: nonNegativeNumber,
  isOptional: z.boolean(),
}).strict();

export const shoppingListCategorySchema = z.object({
  category: z.string(),
  items: z.array(shoppingListItemSchema).min(1),
}).strict();

export const nutritionAnalysisSchema = z.object({
  carbsPercent: nonNegativeNumber,
  proteinPercent: nonNegativeNumber,
  fatPercent: nonNegativeNumber,
  tips: z.array(z.string()),
}).strict();

export const generatedMealPlanSchema = z.object({
  title: z.string(),
  summary: z.object({
    weeklyBudget: nonNegativeNumber,
    estimatedTotalCost: nonNegativeNumber,
    estimatedSavings: nonNegativeNumber,
    averageCaloriesPerDay: nonNegativeNumber,
    averageProteinPerDay: nonNegativeNumber,
    goal: z.enum(["hemat-kalori", "high-protein", "balance", "hemat-budget"]),
    notes: z.string(),
  }).strict(),
  days: z.array(dayMealPlanSchema).min(1),
  shoppingList: z.array(shoppingListCategorySchema).min(1),
  nutritionAnalysis: nutritionAnalysisSchema,
  budgetTips: z.array(z.string()),
  warnings: z.array(z.string()),
}).strict();

export const generateMealPlanApiResponseSchema = z.object({
  source: z.enum(["openai", "mock"]),
  data: generatedMealPlanSchema,
});
