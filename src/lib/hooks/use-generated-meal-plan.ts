"use client";

import { useCallback, useEffect, useState } from "react";
import { generatedMealPlanSchema } from "@/lib/ai/meal-plan-schema";
import type { GeneratedMealPlan } from "@/lib/types/meal-plan";

const generatedPlanStorageKey = "kostmeal.generatedPlan";

export function saveGeneratedMealPlan(plan: GeneratedMealPlan) {
  window.localStorage.setItem(generatedPlanStorageKey, JSON.stringify(plan));
}

export function clearGeneratedMealPlan() {
  window.localStorage.removeItem(generatedPlanStorageKey);
}

export function useGeneratedMealPlan() {
  const [plan, setPlan] = useState<GeneratedMealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const readPlan = useCallback(() => {
    try {
      const rawPlan = window.localStorage.getItem(generatedPlanStorageKey);

      if (!rawPlan) {
        setPlan(null);
        return;
      }

      const parsed = generatedMealPlanSchema.safeParse(JSON.parse(rawPlan));
      setPlan(parsed.success ? parsed.data : null);
    } catch {
      setPlan(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(readPlan);
    return () => cancelAnimationFrame(frameId);
  }, [readPlan]);

  return {
    plan,
    loading,
    refresh: readPlan,
    clear: () => {
      clearGeneratedMealPlan();
      setPlan(null);
    },
  };
}
