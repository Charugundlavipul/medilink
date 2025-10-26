import { useMemo, useState } from "react";
import { CalendarRange, Award, Users, HeartPulse, GraduationCap, Briefcase, Microscope, Activity, Plus } from "lucide-react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import CaseItem from "@/components/profile/CaseItem";
import { Button } from "@/components/ui/button";

type ExperienceItem = {
  period: string;
  role: string;
  organisation: string;
  summary: string;
  highlights: string[];
};

type EducationItem = {
  period: string;
  degree: string;
  institution: string;
  details: string;
};

export default function Profile() {
  const [tab, setTab] = useState<"experience" | "cases">("cases");

  const education = useMemo<EducationItem[]>(
    () => [
      {
        period: "2003 – 2007",
        degree: "MD, Cardiovascular Medicine",
        institution: "Harvard Medical School",
        details: "Dean’s Scholar • Research focus on microvascular ischemia",
      },
      {
        period: "2009 – 2011",
        degree: "Fellowship, Interventional Cardiology",
        institution: "Mayo Clinic",
        details: "Hybrid structural heart program • Advanced imaging integration",
      },
    ],
    [],
  );

  const experience = useMemo<ExperienceItem[]>(
    () => [
      {
        period: "2018 – Present",
        role: "Chief Interventional Cardiologist",
        organisation: "City Heart Center",
        summary:
          "Leads a 25-physician team delivering high-acuity PCI, hybrid OR, and structural interventions with outcomes in the top decile nationwide.",
        highlights: [
          "Launched 24/7 multidisciplinary SCAD response pathway reducing time-to-intervention by 35%",
          "Expanded AI-guided cath lab imaging protocol adopted across partner hospitals",
        ],
      },
      {
        period: "2011 – 2018",
        role: "Attending Cardiologist",
        organisation: "General Hospital",
        summary:
          "Performed 1,000+ interventional procedures annually while mentoring fellows in complex coronary and pulmonary vascular disease.",
        highlights: [
          "Blueprinted an ECMO bridge program for sepsis-induced cardiomyopathy",
          "Led cooperative registry on catheter-directed thrombolysis innovation",
        ],
      },
    ],
    [],
  );

  return (
    <div className="space-y-8 pb-28">
      <ProfileHeader />

      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-border/60 bg-white/90 p-4 shadow-sm sm:justify-between md:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          <HeartPulse className="h-4 w-4" />
          Clinical Snapshot
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground md:text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <CalendarRange className="h-4 w-4 text-primary" />
            15+ Years Practice
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <Users className="h-4 w-4 text-primary" />
            20k+ Consults
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <Award className="h-4 w-4 text-primary" />
            2024 Clinical Innovator
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b text-sm">
        <button
          className={`relative py-3 font-medium transition ${
            tab === "experience" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
          }`}
          onClick={() => setTab("experience")}
        >
          Experience
          {tab === "experience" && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
        </button>
        <button
          className={`relative py-3 font-medium transition ${
            tab === "cases" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
          }`}
          onClick={() => setTab("cases")}
        >
          Case Studies
          {tab === "cases" && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
        </button>
      </div>

      {tab === "cases" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-lg font-semibold text-foreground">Case Studies</div>
            <Button className="gap-2 rounded-full px-5" size="sm">
              <Plus className="h-4 w-4" />
              Create New Case Study
            </Button>
          </div>
          <div className="grid gap-4">
            <CaseItem
              caseId="scad-artery-dissect"
              title="High-Risk Spontaneous Coronary Artery Dissection"
              description="Managed a postpartum SCAD patient using a conservative strategy and cross-specialty collaboration to avoid unnecessary intervention."
              icon="stetho"
            />
            <CaseItem
              caseId="submassive-pe-ctpa"
              title="Submassive Pulmonary Embolism With CDT"
              description="Led the CDT pathway for a hemodynamically stable PE with RV strain, restoring perfusion while minimizing thrombolytic risk."
              icon="activity"
            />
            <CaseItem
              caseId="myocarditis-vs-takotsubo"
              title="Viral Myocarditis Mimicking Takotsubo"
              description="Applied advanced cardiac MRI interpretation to distinguish myocarditis from stress cardiomyopathy, guiding targeted therapy."
              icon="heart"
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <section className="md:col-span-1">
            <div className="rounded-3xl border border-border bg-white/95 p-5 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                Education
              </div>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                {education.map((item) => (
                  <li key={item.degree} className="rounded-2xl border border-transparent bg-primary/5 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-primary">{item.period}</div>
                    <div className="mt-1 text-foreground">
                      <span className="font-semibold">{item.degree}</span>, {item.institution}
                    </div>
                    <p className="mt-1 text-xs">{item.details}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="md:col-span-2">
            <div className="rounded-3xl border border-border bg-white/95 p-5 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                <Briefcase className="h-4 w-4 text-primary" />
                Professional Milestones
              </div>
              <div className="mt-4 space-y-6">
                {experience.map((item) => (
                  <div key={item.role} className="rounded-2xl border border-border/80 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-primary">{item.period}</div>
                        <div className="mt-1 text-lg font-semibold text-foreground">{item.role}</div>
                        <div className="text-sm text-muted-foreground">{item.organisation}</div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Microscope className="h-4 w-4" />
                        Complex Intervention
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                    <ul className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 rounded-xl bg-muted/40 p-3">
                          <Activity className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
