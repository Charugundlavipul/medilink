import { useNavigate } from "react-router-dom";

import * as UI from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { CaseSummary } from "@shared/api";

type AssistantPanelProps = {
  summary: string;
  cases: CaseSummary[];
  isLoading?: boolean;
  error?: string | null;
};

export default function AssistantPanel({ summary, cases, isLoading, error }: AssistantPanelProps) {
  const navigate = useNavigate();

  const handleViewCase = (caseId: string) => {
    navigate(`/case-study/${caseId}`);
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="p-5 md:p-6">
        <h3 className="text-sm font-semibold text-muted-foreground">MediLink AI Assistant</h3>
        <section className="mt-4">
          <h4 className="font-semibold">Summary of Findings</h4>
          <div
            className={cn(
              "mt-2 rounded-lg border border-dashed border-transparent bg-muted/30 p-3 text-sm text-muted-foreground",
              (isLoading || error) && "border-muted/60",
            )}
          >
            {isLoading && <p className="animate-pulse leading-relaxed">Generating tailored summary...</p>}
            {!isLoading && error && <p className="text-destructive leading-relaxed">{error}</p>}
            {!isLoading && !error && <p className="leading-relaxed whitespace-pre-wrap">{summary}</p>}
          </div>
        </section>

        {cases.length > 0 && (
          <section className="mt-6">
            <h4 className="font-semibold">Relevant Case Examples</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {cases.map((caseItem, index) => (
                <div
                  key={caseItem.id}
                  className={cn(
                    "rounded-lg border bg-white p-4",
                    index === cases.length - 1 && "md:col-span-2",
                  )}
                >
                  <div className="text-sm font-medium">{caseItem.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{caseItem.shortDescription}</p>
                  <UI.Button
                    variant="link"
                    className="mt-2 h-auto px-0 text-sm"
                    onClick={() => handleViewCase(caseItem.id)}
                  >
                    View Case Details
                  </UI.Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
