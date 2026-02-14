"use client";

import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function WelcomeSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image Side (Left) */}
          <AnimateIn animation="fade-in-up">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-slate-100 shadow-xl lg:max-w-none">
              <Image
                src="/images/1.jpg" // Placeholder - likely needs to be the co-founder's image
                alt="Co-founder of LBS Centre"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
          </AnimateIn>

          {/* Text Side (Right) */}
          <AnimateIn animation="fade-in-up" delay={100}>
            <div className="flex flex-col space-y-6">
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Welcome Message
                </h2>
                <div className="h-1.5 w-20 rounded-full bg-[var(--logo-green)]" />
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base font-serif">
                <p>
                  It is with great pleasure and delight that I welcome you to LBS Centre for Social and Agricultural Development, an initiative on the mission to empower Community as an engine to get the farmers of Somalia out of poverty and to a good nutrition standard through various agriculture training programs, skills development, innovative environmental projects and focused livelihood programs that are targeting smallholder farmers, women and marginalized communities.
                </p>
                <p>
                  Our vision was to develop a sustainable community by working with partners, donors, and the government agencies to build climate resilience, and strengthen local economies.
                </p>
                <p>
                  As a Co-founder, despite the many challenges we are faced with as a not-for-profit organization, the vision still remains clear in sight and we continually do our best to ensure the implementation of a significant development program which focuses on sustainable phenomenal results.
                </p>
                <p>
                  We can already document great results in this very short period of our existence, thanks to those that have taken part. We have a “One Team” attitude and approach to work.
                </p>
                <p>
                  I welcome you on this journey and look forward to your continued support and contribution to this noble cause.
                </p>
              </div>

              <div className="pt-4">
                <p className="font-display text-lg font-bold text-slate-900">
                  Dr. Jama Ali Ahmed
                </p>
                <p className="text-sm font-medium text-[var(--logo-green-dark)]">
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
