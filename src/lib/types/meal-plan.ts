import { z } from "zod";
import {
  generatedMealPlanSchema,
  generateMealPlanApiResponseSchema,
  mealPlanRequestSchema,
} from "@/lib/ai/meal-plan-schema";

export type MealPlanRequest = z.infer<typeof mealPlanRequestSchema>;
export type GeneratedMealPlan = z.infer<typeof generatedMealPlanSchema>;
export type GenerateMealPlanApiResponse = z.infer<typeof generateMealPlanApiResponseSchema>;
