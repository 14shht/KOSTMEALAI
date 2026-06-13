import "server-only";

import OpenAI from "openai";
import { defaultOpenAIModel } from "@/lib/constants";

export const openAIModel = process.env.OPENAI_MODEL?.trim() || defaultOpenAIModel;

export function hasOpenAIKey() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function getOpenAIClient() {
  if (!hasOpenAIKey()) {
    return null;
  }

  // Security: OPENAI_API_KEY must only be read on the server.
  // Never expose it through NEXT_PUBLIC_* or client components.
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}
