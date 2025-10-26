import { GraduationCap, Sparkles, Target, Search as IconSearch } from "lucide-react";

import FilterPills from "@/components/learning/FilterPills";
import LearningCard from "@/components/learning/LearningCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/data/courses";

export default function Learning() {
  const stats = [
    { icon: GraduationCap, value: "500+", label: "Expert-led lessons" },
    { icon: Sparkles, value: "120", label: "New this quarter" },
    { icon: Target, value: "40", label: "Certification tracks" },
  ];

  return (
    <div className="space-y-10 pb-24">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-white shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <div className="relative space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Learning Hub</p>
              <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                Elevate clinical expertise with curated microcourses and simulation tracks.
              </h1>
              <p className="text-sm text-muted-foreground md:text-base">
                Browse immersive cases, bite-sized refreshers, and board-style quizzes built with practicing specialists.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/60 bg-white/90 p-4 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Highlights</p>
              <dl className="grid gap-3 text-sm text-muted-foreground">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wide">{stat.label}</dt>
                      <dd className="text-lg font-semibold text-foreground">{stat.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <form className="rounded-2xl border border-border bg-white/95 p-4 shadow-sm md:p-5">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Search the academy
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses, certifications, live simulations..."
                  className="h-12 w-full rounded-xl border-border bg-muted/30 pl-11 text-sm md:h-12"
                />
              </div>
              <Button className="h-12 rounded-full px-6 text-sm font-semibold">
                Explore
              </Button>
            </div>
          </form>
        </div>
      </section>

      <FilterPills />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {courses.map((course) => (
          <LearningCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  );
}
