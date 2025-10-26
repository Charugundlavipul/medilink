import { useRef, useState, useEffect } from "react";
import { Paperclip, Mic, Send, Sparkles, Brain } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import AssistantPanel from "@/components/chat/AssistantPanel";
import { ensureAdditionalCasesRegistered, getCaseSummaries } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import type { CaseSummary, ChatSummaryResponse } from "@shared/api";

type UserMessage = {
  role: "user";
  id: string;
  content: string;
};

type AssistantMessage = {
  role: "assistant";
  id: string;
  summary: string;
  cases: CaseSummary[];
  status: "loading" | "ready" | "error";
  error?: string | null;
};

type Message = UserMessage | AssistantMessage;

const DEFAULT_SUMMARY =
  "Based on the symptoms, potential diagnoses include Spontaneous Coronary Artery Dissection (SCAD) and Pulmonary Embolism (PE). A CT Angiogram is highly recommended to confirm or rule out these conditions.";
const DEFAULT_CASES = getCaseSummaries().slice(0, 3);

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [casesExpanded, setCasesExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage: UserMessage = {
      role: "user",
      id: crypto.randomUUID(),
      content: text,
    };

    let caseSummaries: CaseSummary[] = getCaseSummaries().slice(0, 3);
    if (!casesExpanded) {
      ensureAdditionalCasesRegistered();
      const allCases = getCaseSummaries();
      caseSummaries = allCases.slice(-3);
      setCasesExpanded(true);
    } else {
      const allCases = getCaseSummaries();
      caseSummaries = allCases.slice(-3);
    }

    if (caseSummaries.length === 0) {
      caseSummaries = DEFAULT_CASES;
    }

    const assistantId = crypto.randomUUID();
    const pendingAssistant: AssistantMessage = {
      role: "assistant",
      id: assistantId,
      summary: "",
      cases: caseSummaries,
      status: "loading",
    };

    setMessages((prev) => [...prev, userMessage, pendingAssistant]);
    setInput("");

    try {
      const response = await fetch("/api/chat/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      const data = (await response.json().catch(() => ({}))) as Partial<ChatSummaryResponse> & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? `Gemini request failed with status ${response.status}`);
      }

      if (!data.summary) {
        throw new Error("Gemini returned an empty summary.");
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.role === "assistant" && message.id === assistantId
            ? { ...message, summary: data.summary.trim(), cases: caseSummaries, status: "ready", error: null }
            : message,
        ),
      );
    } catch (error) {
      console.error("Failed to update summary", error);
      setMessages((prev) =>
        prev.map((message) =>
          message.role === "assistant" && message.id === assistantId
            ? {
                ...message,
                status: "error",
                error: "Unable to update summary right now. Please try again.",
                summary: DEFAULT_SUMMARY,
                cases: caseSummaries,
              }
            : message,
        ),
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-40">
      {messages.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-border/60 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-foreground">Welcome to MediLink AI</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Ask about differential diagnoses, next-step investigations, or clinical pathways. MediLink surfaces concise
            reasoning and relevant case studies in seconds.
          </p>

          <div className="mt-6 grid gap-3 text-left text-sm text-muted-foreground md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Cardiology</p>
              <p className="mt-2 text-foreground">
                “45 y/o with atypical chest pain, non-diagnostic ECG. How should I triage and which imaging should lead?”
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Imaging</p>
              <p className="mt-2 text-foreground">
                “Post-viral myocarditis vs Takotsubo — what MRI markers differentiate and when is biopsy warranted?”
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Critical Care</p>
              <p className="mt-2 text-foreground">
                “Submassive PE with mild hypotension. Does this patient qualify for catheter-directed therapy?”
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-border/60 bg-primary/5 p-4 text-left text-sm md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Brain className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-muted-foreground">
                MediLink combines Gemini insights with curated case archives to provide evidence-backed suggestions.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Paperclip className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-muted-foreground">Attach context like imaging interpretations or lab summaries to tailor responses.</p>
            </div>
          </div>
        </div>
      ) : (
        messages.map((message) =>
          message.role === "user" ? (
            <ChatMessage key={message.id} role="user">
              {message.content}
            </ChatMessage>
          ) : (
            <AssistantPanel
              key={message.id}
              summary={message.summary}
              cases={message.cases}
              isLoading={message.status === "loading"}
              error={message.status === "error" ? message.error ?? "Unable to update summary." : null}
            />
          ),
        )
      )}
      <div ref={bottomRef} />

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 pb-6 pt-4 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <form onSubmit={onSubmit} className="mx-auto flex max-w-3xl items-center gap-3 px-3 md:px-6">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <button type="button" className="text-muted-foreground transition hover:text-foreground">
                <Paperclip className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a case, diagnosis, or treatment..."
              rows={1}
              className={cn(
                "max-h-40 w-full resize-none rounded-full border border-input bg-background/95 pl-12 pr-20",
                "py-3 text-sm outline-none shadow-lg transition focus:border-primary focus:ring-1 focus:ring-primary/60 md:text-base",
              )}
            />
            <div className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground">
              <button type="button" className="transition hover:text-foreground">
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90"
            aria-label="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
