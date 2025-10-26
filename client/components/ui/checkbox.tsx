import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onCheckedChange?: (v: boolean) => void;
};

const Checkbox = React.forwardRef<HTMLInputElement, Props>(({ className, onCheckedChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      {...(props as any)}
      onChange={(e) => {
        props.onChange?.(e as any);
        onCheckedChange?.(e.currentTarget.checked);
      }}
      className={cn("h-4 w-4 rounded-sm border border-input bg-background", className)}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
