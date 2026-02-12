"use client";

import { type ReactNode } from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";

type VisionMissionCardProps = {
  title: string;
  description: string;
  accentColor: string;
  icon: ReactNode;
};

export function VisionMissionCard({
  title,
  description,
  accentColor,
  icon,
}: VisionMissionCardProps) {
  return (
    <div className="group flex flex-col items-center transition-transform duration-300 ease-out hover:scale-[1.02]">
      <div
        className="relative flex h-80 w-80 flex-shrink-0 items-center justify-center sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]"
        style={
          {
            "--accent": accentColor,
          } as React.CSSProperties
        }
      >
        {/* Outer circle with colored arc (stroke) */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 transition-opacity duration-300 ease-out"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeDasharray="140 162"
            strokeLinecap="round"
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
        </svg>
        {/* Inner white circle (content container) - content starts at top */}
        <div className="relative flex h-64 w-64 flex-col items-center justify-start rounded-full border border-slate-200/80 bg-white pt-4 pb-6 pl-6 pr-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out sm:h-72 sm:w-72 sm:pt-5 sm:pb-8 sm:px-8 lg:h-80 lg:w-80 lg:pt-6 lg:pb-10 lg:px-10 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div
            className="mb-3 flex h-14 w-14 flex-shrink-0 items-center justify-center pt-[3px] sm:mb-4 sm:h-16 sm:w-16 lg:mb-5 lg:h-[4.25rem] lg:w-[4.25rem] [&_svg]:h-9 [&_svg]:w-9 sm:[&_svg]:h-10 sm:[&_svg]:w-10 lg:[&_svg]:h-11 lg:[&_svg]:w-11"
            style={{ color: accentColor }}
          >
            {icon}
          </div>
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-800 antialiased sm:text-sm md:text-base">
            {title}
          </h3>
          <p className="mt-2 line-clamp-5 text-center text-xs leading-relaxed text-slate-600 antialiased sm:mt-3 sm:text-sm sm:leading-relaxed md:mt-4 md:text-base md:leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {/* Subtle reflection */}
      <div
        className="mt-3 h-4 w-64 rounded-b-full bg-slate-200/30 blur-md transition-opacity duration-300 sm:w-72 lg:w-80"
        aria-hidden
      />
    </div>
  );
}

function IconVision() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 1 4 12.5c-.5.3-1.1.5-1.7.5H10.7c-.6 0-1.2-.2-1.7-.5A7 7 0 0 1 12 2Z" />
      <path d="M12 6v1" />
      <path d="M12 9v1" />
      <path d="M12 12v1" />
    </svg>
  );
}

function IconMission() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
    </svg>
  );
}

function IconValues() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v6" />
      <path d="M8 9l4-2 4 2" />
      <path d="M8 9v9" />
      <path d="M16 9v9" />
      <path d="M5 18h6" />
      <path d="M13 18h6" />
      <circle cx="8" cy="21" r="2" />
      <circle cx="16" cy="21" r="2" />
    </svg>
  );
}

const VISION_MISSION_VALUES = [
  {
    title: "Vision",
    description:
      "A Somalia where every community has access to food security, sustainable livelihoods, and resilience to climate and conflict.",
    accentColor: "var(--logo-green)",
    icon: <IconVision />,
  },
  {
    title: "Mission",
    description:
      "To strengthen social and agricultural development through evidence-based programs, capacity building, and partnerships that empower communities and promote inclusive growth.",
    accentColor: "var(--logo-brown)",
    icon: <IconMission />,
  },
  {
    title: "Values",
    description:
      "Integrity, community participation, evidence-based action, and partnership. We are accountable to the people we serve and committed to sustainable, inclusive development.",
    accentColor: "var(--logo-yellow)",
    icon: <IconValues />,
  },
];

export function VisionMissionValuesSection() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {VISION_MISSION_VALUES.map((item, i) => (
            <AnimateIn key={item.title} animation="fade-in-up" delay={i === 0 ? 0 : i === 1 ? 100 : 200}>
              <VisionMissionCard
                title={item.title}
                description={item.description}
                accentColor={item.accentColor}
                icon={item.icon}
              />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
