import { Link } from "react-router-dom";
import { Clock, BarChart3, Award } from "lucide-react";

import * as UI from "@/components/ui/button";
import type { Course } from "@/data/courses";

type Props = {
  course: Course;
};

export default function LearningCard({ course }: Props) {
  const { id, title, instructor, org, duration, difficulty, certification, cardImage, summary } = course;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={cardImage}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {certification && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/50 bg-primary/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-sm">
            <Award className="h-3.5 w-3.5" />
            Certificate
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-snug text-foreground">{title}</h3>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Dr. {instructor} · {org}
          </p>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-3 py-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{duration}</p>
              <p className="text-[11px] uppercase tracking-wide">Duration</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-3 py-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{difficulty}</p>
              <p className="text-[11px] uppercase tracking-wide">Level</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link to={`/course/${id}`} className="inline-flex flex-1 basis-32 md:flex-none">
            <UI.Button className="h-10 flex-1 rounded-full text-sm font-semibold">
              Start Course
            </UI.Button>
          </Link>
          <Link to={`/course/${id}`} className="inline-flex flex-1 basis-28 md:flex-none">
            <UI.Button variant="outline" className="h-10 flex-1 rounded-full text-sm font-semibold">
              View Details
            </UI.Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
