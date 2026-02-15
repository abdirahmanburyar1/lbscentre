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
  return (
    <section className="w-full bg-white py-12 sm:py-16 border-t border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-2xl font-bold font-display text-[var(--logo-brown)] sm:text-3xl md:text-4xl">
          Why Partner with LBS Centre?
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          LBS Centre is deeply connected at the grassroots of Somali farmers and has a unique ability to navigate the complex social dynamics of Somali community.
        </p>
      </div>

      {partners.length > 0 && (
        <>
          <div className="mb-6 text-center px-4">
            <h3 className="text-xl font-semibold font-display text-slate-800 sm:text-2xl">
              Our Partners
            </h3>
          </div>
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
        </>
      )}
    </section>
  );
}
