"use client";

import Link from "next/link";
import { useState } from "react";

export type FocusAreaItem = {
  title: string;
  description: string;
};

type FocusAreasDiceCarouselProps = {
  items: FocusAreaItem[];
};

const FAN_SIZE = 6;
const CARD_OFFSET_PX = 56;
const CARD_HALF_W = 152;
const CARD_ROTATIONS = [-8, -4, -1, 2, 4, 0];
const CARD_Z = [1, 2, 3, 4, 5, 6];

export function FocusAreasDiceCarousel({ items }: FocusAreasDiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayItems = items.slice(0, 5);
  const totalSlots = displayItems.length + 1;

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % totalSlots);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* No extra bg: only the Section wrapper holds the "big" background */}
      <div className="relative flex justify-center px-4 py-6 sm:py-8">
        <div className="relative h-[360px] w-full sm:h-[420px] md:h-[440px]">
          {Array.from({ length: FAN_SIZE }).map((_, fanPos) => {
            const slotIndex = (activeIndex - (FAN_SIZE - 1) + fanPos + totalSlots) % totalSlots;
            const isMoreCard = slotIndex === displayItems.length;
            const area = isMoreCard ? null : displayItems[slotIndex];
            const isFront = fanPos === FAN_SIZE - 1;
            const leftOffset = (fanPos - (FAN_SIZE - 1)) * CARD_OFFSET_PX;

            return (
              <div
                key={isMoreCard ? "more" : area!.title + fanPos}
                className={`absolute top-1/2 max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out ${
                  isFront ? "w-[304px] sm:w-[320px]" : "w-[260px] sm:w-[272px]"
                }`}
                style={{
                  left: `calc(50% - ${CARD_HALF_W}px + ${leftOffset}px)`,
                  transform: `translateY(-50%) rotate(${isFront ? 0 : CARD_ROTATIONS[fanPos]}deg)`,
                  zIndex: CARD_Z[fanPos],
                }}
              >
                {isMoreCard ? (
                  <Link
                    href="/programs"
                    className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-6 text-center shadow-lg transition-all duration-200 hover:border-[var(--logo-green)] hover:shadow-xl sm:min-h-[380px] sm:p-8"
                  >
                    <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-500">
                      +
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-700 sm:text-xl">
                      More focus areas
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      View all programs and remaining focus areas from our work.
                    </p>
                    <span className="mt-4 inline-block text-sm font-semibold text-[var(--logo-green-dark)]">
                      View all programs →
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={isFront ? goNext : undefined}
                    className={`block w-full rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-lg transition-all duration-200 ${
                      isFront
                        ? "min-h-[320px] cursor-pointer py-6 hover:border-slate-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--logo-green)]/40 focus:ring-offset-2 sm:min-h-[380px] sm:p-8"
                        : "min-h-[240px] cursor-default pointer-events-none sm:min-h-[260px]"
                    }`}
                    aria-label={isFront ? `${area!.title}. Click for next focus area.` : area!.title}
                    tabIndex={isFront ? 0 : -1}
                  >
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--logo-green)] text-base font-bold text-white shadow-sm">
                      {slotIndex + 1}
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                      {area!.title}
                    </h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-600">
                      {area!.description}
                    </p>
                    {isFront && (
                      <span className="mt-4 inline-block text-sm font-semibold text-[var(--logo-green-dark)]">
                        Click for next →
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots: 6 slots (5 focus + 1 more) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlots }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--logo-green)]/50 focus:ring-offset-2 ${
                i === activeIndex
                  ? "scale-125 bg-[var(--logo-green)]"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={i < displayItems.length ? `Go to focus area ${i + 1}` : "More focus areas"}
            />
          ))}
        </div>
        <Link
          href="/programs"
          className="rounded-xl border-2 border-[var(--logo-green-dark)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--logo-green-dark)] transition hover:bg-[var(--logo-green)] hover:text-white hover:border-[var(--logo-green)]"
        >
          View all programs
        </Link>
      </div>
    </div>
  );
}
