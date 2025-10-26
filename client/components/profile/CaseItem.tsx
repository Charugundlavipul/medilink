import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as UI from "@/components/ui/button";
import { HeartPulse, ActivitySquare, Stethoscope } from "lucide-react";

export default function CaseItem({ title, description, icon = "heart", caseId = "1" }: { title: string; description: string; icon?: "heart" | "activity" | "stetho"; caseId?: string }) {
  const navigate = useNavigate();
  const Icon = icon === "activity" ? ActivitySquare : icon === "stetho" ? Stethoscope : HeartPulse;

  const handleViewCaseStudy = () => {
    navigate(`/case-study/${caseId}`);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-4 md:p-5 flex gap-4">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <div className="mt-3">
          <UI.Button size="sm" variant="secondary" className="rounded-full" onClick={handleViewCaseStudy}>View Case Study</UI.Button>
        </div>
      </div>
    </div>
  );
}
