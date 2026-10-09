import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

/** Loading placeholder. Pure CSS pulse; respects reduced-motion globally. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-surface-elevated",
        className,
      )}
    />
  );
}
