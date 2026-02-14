"use client";

import Image from "next/image";
import Link from "next/link";

type Partner = {
  id: string;
  name: string;
  logo: string;
  website: string | null;
};

export function PartnersSection({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 border-t border-slate-100">
      <div className="mb-8 text-center px-4">
        <h2 className="text-3xl font-bold font-display text-[var(--logo-brown)] sm:text-4xl">
          Our Partners
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
          Collaborating with organizations to maximize our impact.
        </p>
      </div>
      
      {/* Scrollable container */}
      <div className="w-full overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="flex w-max min-w-full items-center px-4 md:justify-center gap-8 sm:gap-12 mx-auto">
           {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center justify-center space-y-3 shrink-0 snap-center group w-48 sm:w-64">
              <div className="relative h-24 w-full sm:h-32 transition-transform duration-300 group-hover:scale-105">
                {partner.website ? (
                   <Link href={partner.website} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                     <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                   </Link>
                ) : (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <p className="text-sm font-medium text-slate-600 text-center line-clamp-2 px-2 group-hover:text-[var(--logo-green-dark)] transition-colors">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
