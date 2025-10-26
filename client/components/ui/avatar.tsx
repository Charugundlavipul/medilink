import * as React from "react";
import React from "react";
import { cn } from "@/lib/utils";

export const Avatar: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
    {children}
  </div>
);

export const AvatarImage: React.FC<{ src?: string; alt?: string; className?: string }> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={cn("aspect-square h-full w-full object-cover", className)} />
);

export const AvatarFallback: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted text-sm", className)}>{children}</div>
);
