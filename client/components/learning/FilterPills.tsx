import { cn } from "@/lib/utils";

const pills = [
  { label: "All", active: true },
  { label: "Surgical Techniques" },
  { label: "Diagnostics" },
  { label: "Pharmacology" },
  { label: "Medical Ethics" },
  { label: "Pediatrics" },
  { label: "Offers Certification" },
];

export default function FilterPills() {
  return (
    <div className="relative -mx-1 overflow-x-auto pb-2 pl-1">
      <div className="flex min-w-full flex-nowrap gap-2">
      {pills.map((p) => (
        <button
          key={p.label}
          type="button"
          className={cn(
            "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
            p.active
              ? "border-primary/60 bg-primary text-primary-foreground shadow-sm"
              : "border-border/60 bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {p.label}
        </button>
      ))}
      </div>
    </div>
  );
}
