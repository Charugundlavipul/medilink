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

export const handleChatSummary: RequestHandler = async (req, res) => {
  const { prompt } = req.body ?? {};
  const trimmedPrompt = typeof prompt === "string" ? prompt.trim() : "";

  if (!trimmedPrompt) {
    res.status(400).json({ error: "Prompt is required." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "Gemini API key is not configured." });
    return;
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: buildPrompt(trimmedPrompt) }],
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
      const error = await response.json().catch(() => ({}));
      res.status(response.status).json({
        error: error.error?.message ?? "Failed to generate summary.",
      });
      return;
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const summary =
      data.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .map((part) => part?.text?.trim())
        .filter(Boolean)
        .join("\n")
        ?.trim() ?? "";

    if (!summary) {
      res.status(502).json({ error: "Gemini returned an empty response." });
      return;
    }

    const payload: ChatSummaryResponse = {
      summary,
    };

    res.json(payload);
  } catch (error) {
    console.error("Gemini summary error", error);
    res.status(500).json({ error: "Unexpected error generating summary." });
  }
};
