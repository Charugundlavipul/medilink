import * as React from "react";
import { cn } from "@/lib/utils";

// Lightweight non-Radix Select stubs to avoid hook errors in environments
// where Radix hooks can misbehave. These provide minimal rendering only.

export const Select: React.FC<React.PropsWithChildren<Record<string, any>>> = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectGroup: React.FC<React.PropsWithChildren<Record<string, any>>> = ({ children }) => (
  <div>{children}</div>
);

export const SelectValue: React.FC<React.PropsWithChildren<{ placeholder?: string }>> = ({ children, placeholder }) => (
  <span>{children ?? placeholder}</span>
);

export const SelectTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-between h-10 px-3", className)} {...props}>
    {children}
  </div>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("p-1 bg-popover rounded-md border shadow-sm", className)} {...props}>
    {children}
  </div>
));
SelectContent.displayName = "SelectContent";

export const SelectLabel: React.FC<React.PropsWithChildren<Record<string, any>>> = ({ children }) => (
  <div className="py-1.5 text-sm font-semibold">{children}</div>
);

export const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("py-1.5 px-2 text-sm cursor-pointer", className)} {...props}>
    {children}
  </div>
));
SelectItem.displayName = "SelectItem";

export const SelectSeparator = ({ className }: { className?: string }) => <div className={cn("my-1 h-px bg-muted", className)} />;

export const SelectScrollUpButton = () => null;
export const SelectScrollDownButton = () => null;
