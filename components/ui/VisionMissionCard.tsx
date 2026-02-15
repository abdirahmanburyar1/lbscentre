"use client";

import { type ReactNode } from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";

type VisionMissionCardProps = {
  title: string;
  description: ReactNode;
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
    <div 
      className="group relative flex h-full flex-col overflow-hidden bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      {/* Top Rail (Stand Design) */}
      <div className="h-3 w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 shadow-sm" />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col">
        
        {/* Graphic Header Section */}
        <div className="relative h-48 w-full overflow-hidden">
          {/* Right Side Pattern Background */}
          <div className="absolute inset-0 bg-slate-50">
             {/* Decorative Lines Pattern mimicking the reference */}
             <svg className="absolute inset-0 h-full w-full opacity-20" width="100%" height="100%">
                <pattern id="pattern-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                   <line x1="0" y1="0" x2="0" y2="40" stroke="var(--accent)" strokeWidth="2" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern-lines)" />
             </svg>
          </div>

          {/* Diagonal Shape / "Your Image" Area equivalent */}
          <div 
            className="absolute left-0 top-0 h-full w-[130%] bg-white shadow-lg"
            style={{ 
              clipPath: "polygon(0 0, 70% 0, 30% 100%, 0% 100%)",
            }}
          >
             {/* Inner Accent Triangle */}
             <div 
                className="absolute inset-0 bg-[var(--accent)] opacity-10"
             />
          </div>

          {/* Strong Accent Divider Line */}
          <div 
             className="absolute left-0 top-0 h-full w-[130%] pointer-events-none"
             style={{ 
               background: "transparent",
               borderRight: "4px solid var(--accent)",
               clipPath: "polygon(0 0, 70% 0, 30% 100%, 0% 100%)",
             }}
          />

          {/* Icon Positioned nicely */}
          <div className="absolute left-8 top-12 text-[var(--accent)]">
             <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md border-2 border-[var(--accent)]">
                <div className="h-10 w-10 [&_svg]:h-full [&_svg]:w-full">
                  {icon}
                </div>
             </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-1 flex-col px-8 py-6 text-center sm:text-left">
          <h3 className="mb-4 text-xl font-bold uppercase tracking-widest text-slate-900 relative inline-block self-center sm:self-start">
            {title}
            <span className="absolute -bottom-2 left-0 h-1 w-12 bg-[var(--accent)] rounded-full"></span>
          </h3>
          
          <div className="mt-4 text-sm leading-relaxed text-slate-600">
            {description}
          </div>
        </div>

        {/* Bottom Info Bar Style */}
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-6 py-3">
           <div className="flex justify-center items-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              <span>LBS Centre</span>
           </div>
        </div>
      </div>

      {/* Bottom Rail (Stand Design) */}
      <div className="relative h-4 w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 shadow-md">
         {/* Stand Feet simulation */}
         <div className="absolute -bottom-1 left-8 h-1.5 w-8 rounded-full bg-slate-400/50 shadow-sm"></div>
         <div className="absolute -bottom-1 right-8 h-1.5 w-8 rounded-full bg-slate-400/50 shadow-sm"></div>
      </div>
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
      "To transform Somali Agriculture through innovative solutions, Research, capacity building, market-driven solutions and strategic partnerships.",
    accentColor: "var(--logo-green)",
    icon: <IconVision />,
  },
  {
    title: "Mission",
    description: (
      <ul className="list-none space-y-3 text-left">
        <li className="flex gap-3">
          <span className="text-[var(--logo-brown)] font-bold text-lg leading-none">·</span>
          <span>To support initiatives that promote ecological farming and food sovereignty.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[var(--logo-brown)] font-bold text-lg leading-none">·</span>
          <span>To conduct a series of Agricultural Development projects designed to achieve self-sufficiency and provide healthy, safe, and affordable food to everyone.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[var(--logo-brown)] font-bold text-lg leading-none">·</span>
          <span>To engage extensively on multi-faceted Sustainable Development and Climate Change Action-related activities that would help bridge the poverty gap, mitigate Climate Change and empower the youth.</span>
        </li>
      </ul>
    ),
    accentColor: "var(--logo-brown)",
    icon: <IconMission />,
  },
  {
    title: "Values",
    description:
      "Integrity, community participation, evidence-based action, and partnership. We are accountable to the community we serve and committed to sustainable and inclusive development.",
    accentColor: "var(--logo-yellow)",
    icon: <IconValues />,
  },
];

export function VisionMissionValuesSection() {
  return (
    <section className="bg-slate-100 py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {VISION_MISSION_VALUES.map((item, i) => (
            <AnimateIn key={item.title} animation="fade-in-up" delay={i === 0 ? 0 : i === 1 ? 100 : 200} className="h-full">
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
