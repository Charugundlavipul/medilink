import {
  generateChatSummary,
  GeminiRequestError,
} from "../../server/routes/chat-summary";

const parseBody = (body: unknown): Record<string, unknown> => {
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  if (body && typeof body === "object") {
    return body as Record<string, unknown>;
  }

  return {};
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = parseBody(req.body);
    const payload = await generateChatSummary(body.prompt);
    res.status(200).json(payload);
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      res.status(error.status).json({ error: error.message });
      return;
    }

    console.error("Gemini summary error", error);
    res.status(500).json({ error: "Unexpected error generating summary." });
  }
}
