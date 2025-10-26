import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Heart,
  MessageSquare,
  Share2,
  Shield,
  Sparkles,
} from "lucide-react";

import AvatarCircle from "@/components/base/AvatarCircle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { caseMap } from "@/data/cases";

const attachmentIcon = (type: string) => {
  switch (type) {
    case "image":
      return <MessageSquare className="h-5 w-5 text-primary" />;
    case "video":
      return <MessageSquare className="h-5 w-5 text-primary" />;
    default:
      return <MessageSquare className="h-5 w-5 text-primary" />;
  }
};

export default function Case() {
  const { id } = useParams();
  const navigate = useNavigate();

  const caseRecord = (id && caseMap[id]) ?? null;

  if (!caseRecord) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 pb-24">
        <div className="rounded-3xl border border-border/60 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">Case not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The case you are looking for is unavailable. Try browsing the feed for more shared cases.
          </p>
          <Button
            className="mt-6 rounded-full bg-primary px-6 text-primary-foreground"
            onClick={() => navigate("/")}
          >
            Back to feed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-24">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-lg">
        <div className="relative bg-gradient-to-r from-primary/15 via-primary/5 to-transparent">
          <div className="relative flex flex-col gap-6 p-6 md:p-8">
            <Button
              variant="ghost"
              className="flex w-max items-center gap-2 rounded-full px-3 py-1 text-sm text-muted-foreground transition hover:text-primary"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <AvatarCircle initials={caseRecord.initials} className="h-14 w-14 text-base" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Shared by</p>
                  <h3 className="text-xl font-bold text-foreground">{caseRecord.doctor}</h3>
                  <p className="text-sm text-muted-foreground">
                    {caseRecord.specialty} • {caseRecord.postedDate}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Case reference: {caseRecord.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-primary/30 text-primary">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-primary/30 text-primary">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <Sparkles className="h-4 w-4" />
                Case Highlight
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                {caseRecord.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{caseRecord.keyChallenge}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div className="rounded-2xl border border-border bg-muted/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Case Summary</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{caseRecord.summary}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Patient</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{caseRecord.demographics}</p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Existing Conditions</p>
              <p className="mt-2 text-sm text-foreground">{caseRecord.conditions}</p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Symptoms</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {caseRecord.symptoms.map((symptom) => (
                  <span key={symptom} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Therapies Attempted</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {caseRecord.treatments.map((treatment) => (
                  <span key={treatment} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                    {treatment}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Supporting Files</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {caseRecord.attachments.map((file) => (
                <div key={file.name} className="group rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {attachmentIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="mt-3 w-full justify-center gap-2 text-sm text-primary hover:bg-primary/10">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border bg-muted/30 p-4 text-center sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold text-primary">{caseRecord.stats.likes}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Likes</p>
            </div>
            <div className="border-x border-border/60 px-4">
              <p className="text-2xl font-bold text-primary">{caseRecord.stats.insights}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Insights</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{caseRecord.stats.support}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6 rounded-3xl border border-border/60 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Case Discussion</h2>
            <p className="text-sm text-muted-foreground">Share insights, request follow-up data, or align on next steps.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Shield className="h-4 w-4" />
            Verified Clinicians Only
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <AvatarCircle initials="EP" className="h-10 w-10 text-sm" />
            <form className="flex-1 space-y-3">
              <textarea
                rows={2}
                placeholder="Add to the discussion... (Share your reasoning, ask a question, or suggest imaging)"
                className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Markdown formatting is supported.</p>
                <Button size="sm" className="rounded-full bg-primary px-4 text-primary-foreground">
                  Post Comment
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {caseRecord.comments.map((comment) => (
            <div
              key={comment.id}
              className={cn(
                "rounded-2xl border border-border/60 bg-muted/20 p-4 shadow-sm",
                comment.isReply && "md:ml-12",
              )}
            >
              <div className="flex items-start gap-3">
                <AvatarCircle initials={comment.initials} className="h-9 w-9 text-xs" />
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{comment.author}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{comment.specialty}</span>
                    {comment.isReply && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        Author reply
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  <p className="text-sm text-foreground leading-relaxed">{comment.text}</p>
                  <Button variant="ghost" size="sm" className="h-8 rounded-full px-3 text-xs text-primary hover:bg-primary/10">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


