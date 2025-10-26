import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarCircleProps {
  src?: string;
  alt?: string;
  initials: string;
  className?: string;
}

export default function AvatarCircle({ src, alt, initials, className }: AvatarCircleProps) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  return (
    <div className={cn("relative h-11 w-11 rounded-full overflow-hidden bg-primary/10 text-primary grid place-items-center select-none", className)}>
      {showImage ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setErrored(true)} />
      ) : (
        <span className="font-semibold text-sm">{initials}</span>
      )}
    </div>
  );
}
