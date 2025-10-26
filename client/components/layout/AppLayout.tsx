import { PropsWithChildren } from "react";
import Header from "./Header";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30 text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto w-full max-w-[1100px] px-4 pt-6 pb-12 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
