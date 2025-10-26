import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="rounded-md border bg-background p-3 shadow">
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
