import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Share2,
  Users,
  Stethoscope,
  HeartPulse,
  Clock,
  Image as ImageIcon,
  FileText,
  Film,
  Database,
} from "lucide-react";

import * as UI from "@/components/ui/button";
import { getCaseStudy } from "@/data/caseStudies";
import type { CaseAttachmentType } from "@shared/api";

const HERO_FALLBACK =
  "https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg";

const attachmentIconMap: Record<CaseAttachmentType, React.ComponentType<{ className?: string }>> = {
  image: ImageIcon,
  document: FileText,
  video: Film,
  data: Database,
};

const capitalise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const caseStudy = id ? getCaseStudy(id) : undefined;
  const authorName = caseStudy?.author ? caseStudy.author.replace(/^Dr\.?\s*/i, "").trim() : "Eleanor Pena";
  const doctorDisplay = `Dr. ${authorName}`;

  if (!caseStudy) {
    return (
      <div className="mx-auto max-w-2xl pb-24">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 font-medium text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <div className="rounded-3xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">Case not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The case study you selected is unavailable. Please return to the chatbot and try another case.
          </p>
          <UI.Button className="mt-6" onClick={() => navigate("/chatbot")}>
            Go to Chatbot
          </UI.Button>
        </div>
      </div>
    );
  }

  const meta = [
    {
      label: "Lead Specialist",
      value: doctorDisplay,
      icon: Stethoscope,
    },
    {
      label: "Primary Focus",
      value: caseStudy.title.split(":")[0]?.replace("Case", "Case"),
      icon: HeartPulse,
    },
    {
      label: "Collaborators",
      value: "Cardiology • Imaging • Critical Care",
      icon: Users,
    },
    {
      label: "Case Duration",
      value: "Acute → 30-day follow-up",
      icon: Clock,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl pb-28">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to previous
      </button>

      <section className="relative overflow-hidden rounded-3xl border border-border/80 shadow-sm">
        <img
          src={HERO_FALLBACK}
          alt={caseStudy.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 text-white md:px-10 md:pb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            <span>Case Study</span>
            <span>Cardiopulmonary</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{caseStudy.title}</h1>
          <p className="mt-2 text-sm text-white/80 md:max-w-2xl md:text-base">
            {caseStudy.shortDescription}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
              <Stethoscope className="h-4 w-4" />
              <span>{doctorDisplay}</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white transition hover:bg-white/20">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {meta.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-white/70 p-4 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
              <Icon className="h-4 w-4 text-primary/80" />
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-white/90 p-6 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-foreground">Case Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {caseStudy.abstractSummary}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border bg-primary/10 p-6 text-primary shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">
              Outcome
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {caseStudy.patientOutcome}
            </p>
          </div>
          <div className="rounded-3xl border bg-white/90 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Final Diagnosis
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {caseStudy.finalDiagnosis}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white/95 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Initial Presentation</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {caseStudy.initialPresentation}
            </p>
          </div>
          <div className="rounded-3xl border bg-white/95 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Key Challenge</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {caseStudy.keyChallenge}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border bg-white/95 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Collaborative Insights</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {caseStudy.collaborativeInsights}
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Case Assets</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Supporting imaging, lab results, and documentation referenced during multidisciplinary reviews.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {caseStudy.attachments.map((file) => {
            const Icon = attachmentIconMap[file.type] ?? FileText;
            return (
              <div
                key={file.name}
                className="flex items-start justify-between rounded-2xl border bg-white/95 p-4 shadow-sm transition hover:border-primary/60 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{file.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {capitalise(file.type)} • {file.size}
                    </div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-primary">Share your perspective</h3>
        <p className="mt-3 text-sm text-primary/80">
          Have experience with similar cases? Add your insights to help the MediLink community refine clinical strategy.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <UI.Button className="bg-primary text-primary-foreground">Open Discussion</UI.Button>
          <UI.Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            Save Case
          </UI.Button>
        </div>
      </section>
    </div>
  );
}
