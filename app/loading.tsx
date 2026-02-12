import Image from "next/image";
import {
  Skeleton,
  SkeletonRow,
  SkeletonSection,
  SkeletonText,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero skeleton with logo */}
      <section className="relative overflow-hidden bg-slate-300 px-4 pt-[72px] pb-16 sm:pt-[80px] sm:pb-24 lg:pb-32">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex min-h-[40vh] flex-1 flex-col items-center justify-center gap-6 lg:items-start">
            <div className="relative h-20 w-20 animate-pulse sm:h-24 sm:w-24">
              <Image
                src="/lbscentre.png"
                alt=""
                fill
                className="object-contain opacity-80"
                sizes="96px"
              />
            </div>
            <div className="h-1 w-16 overflow-hidden rounded-full bg-white/30">
              <div className="h-full w-1/2 animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-white" />
            </div>
          </div>
          <div className="hidden w-full max-w-xl space-y-4 lg:block">
            <Skeleton className="h-4 w-24 rounded bg-white/40" />
            <Skeleton className="h-10 w-full rounded bg-white/40" />
            <Skeleton className="h-5 w-full rounded bg-white/40" />
            <Skeleton className="h-5 w-[85%] rounded bg-white/40" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-12 w-36 rounded-xl bg-white/40" />
              <Skeleton className="h-12 w-32 rounded-xl bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are skeleton */}
      <SkeletonSection
        title
        subtitle
        content="row"
        className="border-t border-slate-200 bg-white"
      />

      {/* Vision, Mission & Values skeleton - 3 circular cards */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-80 w-80 rounded-full sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]" />
                <Skeleton className="mt-3 h-4 w-64 rounded-b-full bg-slate-200/60 blur-sm sm:w-72 lg:w-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas skeleton - cards */}
      <SkeletonSection
        title
        subtitle
        content="cards"
        cardCount={6}
        className="bg-white"
      />

      {/* Featured Projects skeleton */}
      <SkeletonSection
        title
        subtitle
        content="cards"
        cardCount={3}
        className="border-t border-slate-200 bg-slate-50/50"
      />
      <div className="flex justify-center border-t border-slate-200 bg-slate-50/50 pb-12 sm:pb-16 md:pb-24 lg:pb-28">
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      {/* Impact skeleton */}
      <SkeletonSection
        title
        subtitle
        content="stats"
        className="border-t border-slate-200 bg-white"
      />

      {/* CTA skeleton */}
      <section className="border-t border-slate-300 bg-slate-400 px-4 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Skeleton className="mx-auto h-8 w-48 bg-white/30" />
          <Skeleton className="mx-auto mt-4 h-4 w-72 bg-white/30" />
          <Skeleton className="mx-auto mt-6 h-12 w-36 rounded-xl bg-white/30 sm:mt-8" />
        </div>
      </section>
    </>
  );
}
