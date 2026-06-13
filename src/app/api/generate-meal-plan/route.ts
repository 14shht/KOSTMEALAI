import { NextResponse } from "next/server";
import { zodTextFormat } from "openai/helpers/zod";
import { buildMealPlanPrompt } from "@/lib/ai/meal-plan-prompt";
import { generatedMealPlanSchema, mealPlanRequestSchema } from "@/lib/ai/meal-plan-schema";
import { getOpenAIClient, openAIModel } from "@/lib/ai/openai-client";
import { createMockMealPlan } from "@/lib/mock-ai-meal-plan";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Body request harus berupa JSON valid." }, { status: 400 });
  }

  const parsedRequest = mealPlanRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        message: "Data form belum valid.",
        issues: parsedRequest.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json({
      source: "mock",
      data: createMockMealPlan(parsedRequest.data),
    });
  }

  try {
    const response = await client.responses.parse({
      model: openAIModel,
      instructions: "Return only structured JSON that matches the requested schema.",
      input: buildMealPlanPrompt(parsedRequest.data),
      text: {
        format: zodTextFormat(generatedMealPlanSchema, "kostmeal_meal_plan"),
      },
    });

    const parsedMealPlan = generatedMealPlanSchema.safeParse(response.output_parsed);

    if (!parsedMealPlan.success) {
      console.error("OpenAI meal plan response failed validation", parsedMealPlan.error);
      return NextResponse.json(
        { message: "Gagal memvalidasi hasil meal plan. Coba lagi sebentar." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      source: "openai",
      data: parsedMealPlan.data,
    });
  } catch (error) {
    console.error("OpenAI meal plan generation failed", error);
    return NextResponse.json(
      { message: "Gagal generate meal plan. Coba lagi sebentar." },
      { status: 500 },
    );
  }
}
