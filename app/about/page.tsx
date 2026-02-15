import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Background, history, structure, goals and objectives of LBS Centre for Social & Agricultural Development.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About LBS Centre"
        description="Our background, structure, goals and objectives."
      />

      <Section title="Background" containerClassName="max-w-3xl">
        <p className="text-slate-600 leading-relaxed">
          LBS Centre for Social & Agricultural Development is a local non-governmental organization (LNGO) operating in Somalia. We focus on strengthening communities through integrated programs in food security, sustainable agriculture, livestock, climate resilience, WASH, and youth and gender empowerment.
        </p>
      </Section>

      <Section title="Historical Overview" className="bg-white" containerClassName="max-w-3xl">
        <p className="text-slate-600 leading-relaxed">
          Founded to address the interconnected challenges of food insecurity, environmental stress, and limited livelihoods in the region, LBS Centre has evolved to deliver evidence-based, community-centred interventions. Our work is grounded in local partnerships and long-term commitment to the areas we serve.
        </p>
      </Section>

      <Section title="Organizational Structure" containerClassName="max-w-3xl">
        <p className="text-slate-600 leading-relaxed">
          We operate with a lean, program-focused structure. Our teams are organized around program areas and field operations, with support functions for finance, monitoring and evaluation, and communications. This allows us to remain responsive to community needs while maintaining accountability and transparency.
        </p>
      </Section>

      <Section title="Management Structure" className="bg-white" containerClassName="max-w-5xl">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Board of Trustees */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--logo-brown)]/30">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--logo-brown)] rounded-r-full" />
            <div className="pl-4">
              <h3 className="font-display text-xl font-bold text-[var(--logo-brown)] mb-3">
                Board of Trustees
              </h3>
              <p className="text-slate-600 leading-relaxed">
                LBS Centre&apos;s Board of Trustees brings experience and insight to drive mission-focused governance.
              </p>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--logo-green)]/40">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--logo-green)] rounded-r-full" />
            <div className="pl-4">
              <h3 className="font-display text-xl font-bold text-[var(--logo-green-dark)] mb-3">
                Leadership Team of LBS
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The Team brings together dynamic leaders from across Economic development, Agriculture, environmental science, research and corporate services, working tirelessly to drive the Centre&apos;s everyday operations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Goals & Objectives" className="bg-white" containerClassName="max-w-5xl">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Goals */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--logo-green)]/40">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--logo-green)] rounded-r-full" />
            <div className="pl-4">
              <h3 className="font-display text-xl font-bold text-[var(--logo-green-dark)] mb-5">
                Goals
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-green)]" />
                  <span>Improve food security and nutrition outcomes in target communities</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-green)]" />
                  <span>Promote sustainable agriculture and natural resource management</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-green)]" />
                  <span>Strengthen livelihoods and agribusiness opportunities</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-green)]" />
                  <span>Build resilience to climate change and shocks</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-green)]" />
                  <span>Enhance access to water, sanitation, and hygiene</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-green)]" />
                  <span>Advance gender equality and youth empowerment</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Objectives */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--logo-brown)]/30">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--logo-brown)] rounded-r-full" />
            <div className="pl-4">
              <h3 className="font-display text-xl font-bold text-[var(--logo-brown)] mb-5">
                Objectives
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-brown)]" />
                  <span>Deliver high-impact, scalable programs aligned with national and local priorities</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-brown)]" />
                  <span>Build capacity of local institutions and community groups</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-brown)]" />
                  <span>Generate and use evidence for learning and program improvement</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-brown)]" />
                  <span>Foster partnerships with government, NGOs, and private sector</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--logo-brown)]" />
                  <span>Ensure accountability to beneficiaries and donors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
