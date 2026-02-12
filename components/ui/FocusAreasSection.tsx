import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";

export type FocusAreaItem = {
  title: string;
  description: string;
};

type FocusAreasSectionProps = {
  items: FocusAreaItem[];
};

function IconFoodSecurity() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
      <path d="M12 6a6 6 0 0 1 6 6c0 2.5-2 4.5-6 7-4-2.5-6-4.5-6-7a6 6 0 0 1 6-6Z" />
    </svg>
  );
}

function IconAgriculture() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-6" /><path d="M12 16c-2.5 0-4.5-2-4.5-4.5V4" /><path d="M7.5 4 12 2l4.5 2" />
      <path d="M12 16c2.5 0 4.5-2 4.5-4.5V4" /><path d="M7.5 8h9" /><path d="M8 12l2 2 4-4" />
    </svg>
  );
}

function IconLivestock() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 6 5 6 8c0 2 1 4 3 5" /><path d="M18 2c2 0 3 2 3 5s-1 5-3 5" />
      <path d="M6 13h12" /><path d="M8 22h8" /><path d="M9 13v6" /><path d="M15 13v6" />
      <path d="M12 2v4" /><path d="M12 18v4" />
    </svg>
  );
}

function IconClimate() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      <path d="M12 8a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5" /><path d="M12 8v8" /><path d="M12 14l2 2" />
    </svg>
  );
}

function IconWash() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5v3" /><path d="M12 18.5v3" /><path d="M4.5 12h-2" /><path d="M21.5 12h-2" />
      <path d="M6.34 6.34 4.93 4.93" /><path d="M19.07 19.07l-1.41-1.41" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" />
      <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5c0 2.5-2.5 5-6.5 8-4-3-6.5-5.5-6.5-8a6.5 6.5 0 0 1 6.5-6.5Z" />
    </svg>
  );
}

function IconGenderYouth() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 12a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

const ICONS = [
  <IconFoodSecurity key="food" />,
  <IconAgriculture key="ag" />,
  <IconLivestock key="livestock" />,
  <IconClimate key="climate" />,
  <IconWash key="wash" />,
  <IconGenderYouth key="gender" />,
];

function slug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

export function FocusAreasSection({ items }: FocusAreasSectionProps) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((area, i) => (
          <AnimateIn key={area.title} animation="fade-in-up" delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 100 : 200}>
            <Link
              href={`/programs#${slug(area.title)}`}
              className="group flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-[var(--logo-green)]/50 hover:shadow-lg sm:p-8"
            >
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--logo-brown-bg)] text-[var(--logo-green-dark)] transition group-hover:bg-[var(--logo-green)]/15 group-hover:text-[var(--logo-green-dark)]">
                {ICONS[i % ICONS.length]}
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                {area.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {area.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--logo-green-dark)] group-hover:underline">
                Learn more →
              </span>
            </Link>
          </AnimateIn>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/programs"
          className="inline-flex rounded-xl border-2 border-[var(--logo-green-dark)] bg-white px-5 py-3 text-sm font-semibold text-[var(--logo-green-dark)] transition hover:bg-[var(--logo-green)] hover:text-white hover:border-[var(--logo-green)]"
        >
          View all programs
        </Link>
      </div>
    </>
  );
}
