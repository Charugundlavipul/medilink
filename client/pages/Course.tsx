import { Link, useParams } from "react-router-dom";

import * as UI from "@/components/ui/button";
import { getCourseById } from "@/data/courses";
import fallbackHero from "@/assets/course-robotic.svg";

export default function Course() {
  const { id } = useParams();
  const course = getCourseById(id);

  const title = course?.title ?? (id ? id.replace(/-/g, " ") : "Course");
  const heroImage = course?.heroImage ?? fallbackHero;

  return (
    <div className="space-y-6 pb-24">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="relative aspect-[16/6] w-full">
          <img src={heroImage} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              <span>{course?.difficulty ?? "Intermediate"}</span>
              {course?.certification && <span>Certification</span>}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              {course?.summary ?? "Develop clinical mastery with immersive multimedia lessons and real-world case simulations."}
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="font-semibold">About this course</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {course
                  ? `Led by Dr. ${course.instructor} from ${course.org}, this program combines concise lectures, guided simulations, and practice assessments to sharpen day-to-day decision-making.`
                  : "Start the course to explore detailed modules, interactive cases, and assessments tailored to clinical best practices."}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <UI.Button className="bg-primary text-primary-foreground">Start Course</UI.Button>
                <Link to="/learning" className="text-sm text-muted-foreground underline">
                  Back to learning
                </Link>
              </div>
            </div>

            <aside className="rounded-lg border bg-white p-4">
              <h3 className="text-sm font-semibold text-foreground">At a glance</h3>
              <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Duration</dt>
                  <dd>{course?.duration ?? "4 Hours"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Difficulty</dt>
                  <dd>{course?.difficulty ?? "Intermediate"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Certification</dt>
                  <dd>{course?.certification ? "Included" : "Not available"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Instructor</dt>
                  <dd>{course ? `Dr. ${course.instructor}` : "Faculty TBD"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Institution</dt>
                  <dd>{course?.org ?? "Medilink Academy"}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
