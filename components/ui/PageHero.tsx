import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageHeroProps = {
  title: string;
  description?: string;
  parentLink?: {
    href: string;
    label: string;
  };
};

export function PageHero({ title, description, parentLink }: PageHeroProps) {
  return (
    <section className="bg-[var(--logo-brown)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {parentLink && (
          <Link 
            href={parentLink.href}
            className="inline-flex items-center text-sm font-medium text-stone-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {parentLink.label}
          </Link>
        )}
        <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl break-words">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-stone-200 sm:mt-4 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
