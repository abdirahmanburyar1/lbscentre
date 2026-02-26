"use client";

import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Subtle accent band */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--logo-green)] hidden lg:block" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 lg:pl-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-center">
          {/* Image only – no card, all banner text visible */}
          <AnimateIn animation="fade-in-up" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md w-full lg:max-w-none">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/4.jpg"
                  alt="LBS Centre – For Food Sovereignty. Produce, buy, and eat local."
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                {/* Fade both image sides – transparent using opacity */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,1) 0%, transparent 22%, transparent 78%, rgba(255,255,255,1) 100%), linear-gradient(to right, rgba(255,255,255,1) 0%, transparent 22%, transparent 78%, rgba(255,255,255,1) 100%)",
                  }}
                />
              </div>
            </div>
          </AnimateIn>

          {/* Message – editorial layout, white opacity 0.1 on right */}
          <AnimateIn animation="fade-in-up" delay={100} className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-white/10 pointer-events-none rounded-lg" aria-hidden />
            <div className="relative space-y-6">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--logo-green-dark)]">
                  From the Director
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome
                </h2>
              </div>

              <p className="text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
                It is with great pleasure and delight that I welcome you to LBS Centre for Social and Agricultural Development.
              </p>

              <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>
                  Our initiative is on a mission to empower community as an engine to lift the farmers of Somalia out of poverty and to a good nutrition standard through agriculture training programs, skills development, innovative environmental projects and focused livelihood programs targeting smallholder farmers, women and marginalized communities.
                </p>
                <p>
                  Our vision is to develop a sustainable community by working with partners, donors, and government agencies to build climate resilience and strengthen local economies.
                </p>
                <p>
                  As a Co-founder, despite the many challenges we face as a non-governmental institution, the vision remains clear and we continually do our best to implement development programs that focus on sustainable, measurable results. We have a “One Team” attitude and approach to work.
                </p>
                <p>
                  I welcome you on this journey and look forward to your continued support and contribution to this noble cause.
                </p>
              </div>

              <div className="pt-4">
                <p className="font-display font-semibold text-slate-900">
                  Dr. Jama Ali Ahmed
                </p>
                <p className="text-sm text-[var(--logo-green-dark)]">
                  Director, LBS Centre for Social & Agricultural Development
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
