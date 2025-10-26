import AvatarCircle from "@/components/base/AvatarCircle";
import { CalendarCheck2, CheckCircle2, Hospital, MapPin, Award } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-r from-white via-white to-primary/10 shadow-lg">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-primary/10 blur-lg" />
          <AvatarCircle
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop"
            alt="Dr. Eleanor Pena"
            initials="EP"
            className="relative h-20 w-20 border-4 border-white shadow-lg md:h-24 md:w-24"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                Dr. Eleanor Pena
              </h1>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Interventional Cardiology
              </p>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                <span className="inline-flex items-center gap-2">
                  <CalendarCheck2 className="h-4 w-4 text-primary" />
                  15+ years transforming complex cardiac care
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  New York, NY • Global case consultant
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700 md:text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Verified Certified Doctor
              </span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground md:text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
                  <Hospital className="h-4 w-4 text-primary" />
                  Chief, City Heart Center
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
                  <Award className="h-4 w-4 text-primary" />
                  Top 1% Outcomes 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
