import { Users, MessageSquare, FileText, Map, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/feed/PostCard";

export default function Index() {
  return (
    <div className="space-y-8 pb-28">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-white shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Search</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">Find cases, clinicians, and discussions instantly.</h2>
              <p className="text-sm text-muted-foreground">
                Filter by specialty or topic to jump straight into the conversations that matter most.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
              <div className="relative flex-1 sm:w-72 md:w-80">
                <Input
                  placeholder="Search cases, doctors, topics..."
                  className="h-12 rounded-full border-border bg-white/90 pl-4 pr-4 text-sm shadow-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button className="h-12 rounded-full bg-primary px-5 text-primary-foreground">Search</Button>
                <Button variant="outline" className="h-12 rounded-full px-5" asChild>
                  <Link to="/create" className="inline-flex items-center gap-2 text-sm font-semibold">
                    <Plus className="h-4 w-4" />
                    Create Case
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-white/70 px-3 py-1 shadow-sm">Myocarditis</span>
            <span className="rounded-full border border-border/60 bg-white/70 px-3 py-1 shadow-sm">ECMO</span>
            <span className="rounded-full border border-border/60 bg-white/70 px-3 py-1 shadow-sm">Takotsubo</span>
            <span className="rounded-full border border-border/60 bg-white/70 px-3 py-1 shadow-sm">Case Reviews</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Curated for you</h2>
            <p className="text-sm text-muted-foreground">
              Fresh discussions from your specialty focus and collaboration circles.
            </p>
          </div>
          <Button variant="outline" className="rounded-full px-4 text-sm">
            See all cases
          </Button>
        </div>

        <div className="space-y-4">
          <PostCard
            doctor="Dr. Emily Carter"
            specialty="Cardiology"
            initials="EC"
            title="Atypical Presentation of Myocarditis in a Young Adult"
            excerpt="Presenting a case of a 24-year-old patient with vague symptoms leading to a challenging diagnosis of myocarditis. This case highlights the importance of considering broad differentials in young, otherwise healthy individuals."
            tags={["Cardiology", "Myocarditis", "Diagnosis"]}
            likes={12}
            caseId="atypical-presentation-of-myocarditis-in-a-young-adult"
          />
          <PostCard
            doctor="Dr. Johnathan Lee"
            specialty="Neurology"
            initials="JL"
            title="Rare Neurological Disorder Mimicking a Stroke"
            excerpt="A fascinating case of a 55-year-old patient presenting with acute hemiparesis. Initial imaging suggested an ischemic stroke, but further investigation revealed a rare mitochondrial disorder. A deep dive into the diagnostic process."
            tags={["Neurology", "Stroke", "Genetics"]}
            likes={28}
            caseId="rare-neurological-disorder-mimicking-a-stroke"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-border/60 bg-white/90 p-6 shadow-lg md:p-8">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Live Collaboration Stats</h2>
          <p className="text-sm text-muted-foreground">
            Join thousands of specialists exchanging insights, sharing imaging, and solving cases together.
          </p>
        </div>
        <div className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Active Consultants
              <Users className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">2,480</p>
            <p className="text-xs text-primary">+320 this week</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Cases Shared
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">8,931</p>
            <p className="text-xs text-primary">+580 this month</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Threads Today
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">412</p>
            <p className="text-xs text-primary">+18% vs. average</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Global Coverage
              <Map className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">42 Countries</p>
            <p className="text-xs text-primary">Regional panels expanding</p>
          </div>
        </div>
      </section>
    </div>
  );
}
