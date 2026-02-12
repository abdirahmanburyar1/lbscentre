import { type ReactNode } from "react";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }: SkeletonProps & { lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? "w-[85%]" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-4 sm:p-6 md:p-7">
        <Skeleton className="h-5 w-3/4 sm:h-6" />
        <SkeletonText lines={3} />
      </div>
    </div>
  );
}

export function SkeletonSection({
  title = true,
  subtitle = true,
  content = "cards",
  cardCount = 3,
  className = "",
}: SkeletonProps & {
  title?: boolean;
  subtitle?: boolean;
  content?: "cards" | "text" | "stats" | "row";
  cardCount?: number;
}) {
  return (
    <section className={`py-12 sm:py-16 md:py-24 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-10 text-center sm:mb-14">
            {title && <Skeleton className="mx-auto h-8 w-48 sm:h-9 md:h-10" />}
            {subtitle && (
              <Skeleton className="mx-auto mt-3 h-4 max-w-md" />
            )}
          </div>
        )}
        {content === "cards" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cardCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {content === "text" && (
          <div className="mx-auto max-w-2xl">
            <SkeletonText lines={5} />
          </div>
        )}
        {content === "row" && <SkeletonRow imageLeft />}
        {content === "stats" && (
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="mx-auto h-8 w-16 sm:h-10 md:h-12" />
                <Skeleton className="mx-auto mt-2 h-4 w-20" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function SkeletonHero({ className = "" }: SkeletonProps) {
  return (
    <section
      className={`relative overflow-hidden bg-slate-300 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 ${className}`}
    >
      <div className="relative mx-auto max-w-6xl">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-10 w-full max-w-xl sm:h-12 md:h-14" />
        <Skeleton className="mt-4 h-5 w-full max-w-2xl" />
        <Skeleton className="mt-4 h-5 w-3/4 max-w-xl" />
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>
    </section>
  );
}

export function SkeletonRow({
  imageLeft = true,
  className = "",
}: SkeletonProps & { imageLeft?: boolean }) {
  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-10 ${className}`}>
      {imageLeft ? (
        <>
          <Skeleton className="aspect-[4/3] w-full max-w-md rounded-2xl lg:max-w-sm" />
          <div className="space-y-2">
            <SkeletonText lines={4} />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <SkeletonText lines={4} />
          </div>
          <Skeleton className="aspect-[4/3] w-full max-w-md rounded-2xl lg:max-w-sm" />
        </>
      )}
    </div>
  );
}
