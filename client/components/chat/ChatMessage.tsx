import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ChatMessage({ role, children }: { role: "user" | "assistant"; children: ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={cn("w-full flex mb-4", isUser ? "justify-end" : "justify-start")}> 
      <div className={cn(
        "max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
        isUser ? "bg-[#1e4a8a] text-white rounded-tr-md" : "bg-white text-foreground border rounded-tl-md"
      )}>
        {children}
      </div>
    </div>
  );
}
