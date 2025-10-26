import type { RequestHandler } from "express";

import type { ChatSummaryResponse } from "@shared/api";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const buildPrompt = (userPrompt: string) => `
You are Medilink AI, a medical decision support assistant for cardiopulmonary cases.
Write one concise paragraph (1-2 sentences) summarizing the clinician's input.
Respond in plain text only, beginning with "Based on the symptoms," and cover key differential diagnoses, recommended next diagnostics, and any urgent flags.
Do not add headings, bullet points, or extra commentary beyond that single paragraph.

Clinician input:
${userPrompt}
`;

class GeminiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
  error?: { message?: string };
};

const extractPrompt = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const fetchSummaryFromGemini = async (
  prompt: string,
  apiKey: string,
): Promise<string> => {
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: buildPrompt(prompt) }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as GeminiResponse;
    throw new GeminiRequestError(
      response.status,
      payload.error?.message ?? "Failed to generate summary.",
    );
  }

  const data = (await response.json()) as GeminiResponse;

  const summary =
    data.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .map((part) => part?.text?.trim())
      .filter(Boolean)
      .join("\n")
      ?.trim() ?? "";

  if (!summary) {
    throw new GeminiRequestError(502, "Gemini returned an empty response.");
  }

  return summary;
};

export const generateChatSummary = async (
  prompt: unknown,
): Promise<ChatSummaryResponse> => {
  const trimmedPrompt = extractPrompt(prompt);

  if (!trimmedPrompt) {
    throw new GeminiRequestError(400, "Prompt is required.");
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new GeminiRequestError(500, "Gemini API key is not configured.");
  }

  const summary = await fetchSummaryFromGemini(trimmedPrompt, apiKey);
  return { summary };
};

export const handleChatSummary: RequestHandler = async (req, res) => {
  try {
    const payload = await generateChatSummary(req.body?.prompt);
    res.json(payload);
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      res.status(error.status).json({ error: error.message });
      return;
    }

    console.error("Gemini summary error", error);
    res.status(500).json({ error: "Unexpected error generating summary." });
  }
};

export { GeminiRequestError };
