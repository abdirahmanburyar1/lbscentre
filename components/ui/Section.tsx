import { type ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  title?: string;
  subtitle?: string;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  title,
  subtitle,
}: SectionProps) {
  return (
    <section id={id} className={`py-12 sm:py-16 md:py-24 lg:py-28 ${className}`}>
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="mb-10 text-center sm:mb-14">
            {title && (
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--logo-brown)] sm:text-3xl md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 max-w-2xl mx-auto text-base text-stone-600 sm:mt-3 sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
