import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { FocusAreasSection } from "@/components/ui/FocusAreasSection";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { VisionMissionValuesSection } from "@/components/ui/VisionMissionCard";
import { WelcomeSection } from "@/components/ui/WelcomeSection";
import { getFeaturedProjects, getProjectCount } from "@/lib/queries/projects";
import { getPartners } from "@/lib/queries/partners";
import { PartnersSection } from "@/components/ui/PartnersSection";

const FOCUS_AREAS = [
  {
    title: "Food Security & Nutrition",
    description: "Improving access to nutritious food and strengthening local food systems.",
  },
  {
    title: "Sustainable Agriculture",
    description: "Promoting climate-smart farming and sustainable practices.",
  },
  {
    title: "Livestock & Agribusiness",
    description: "Supporting pastoralists and agribusiness development.",
  },
  {
    title: "Climate Change Resilience",
    description: "Building community resilience to climate shocks.",
  },
  {
    title: "WASH Interventions",
    description: "Water, sanitation, and hygiene for healthier communities.",
  },
  {
    title: "Gender & Youth Empowerment",
    description: "Inclusive programs for women and young people.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProjects, projectCount, partners] = await Promise.all([
    getFeaturedProjects(3),
    getProjectCount(),
    getPartners(),
  ]);

  return (
    <>
      {/* Hero - overlaps under fixed transparent navbar; scrolling images */}
      <section className="relative -mt-[92px] min-h-[420px] overflow-hidden bg-[var(--logo-brown)] pt-[92px] sm:-mt-[112px] sm:min-h-[480px] sm:pt-[112px] lg:min-h-[520px]">
        <HeroBackground />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(107,66,26,0.82)_0%,rgba(107,66,26,0.78)_50%,rgba(63,124,10,0.22)_100%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:items-start lg:px-8 lg:py-32">
          <div className="animate-fade-in-up max-w-2xl">
            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-tight break-words">
              LBS Centre for Social & Agricultural Development
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-200 sm:mt-6 sm:text-lg">
              Building resilient communities through food security, sustainable agriculture, and inclusive development.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--logo-green)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--logo-green-dark)] active:bg-[var(--logo-green-darker)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Learn About Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-[var(--logo-yellow)] px-6 py-3.5 text-sm font-semibold text-[var(--logo-yellow)] transition hover:bg-[var(--logo-yellow)]/20 active:bg-[var(--logo-yellow)]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are - one row: single image (3.jpg) + text side by side */}
      <Section
        title="Who We Are"
        subtitle="A brief introduction to our mission and work."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
          <AnimateIn animation="fade-in-up">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200 shadow-md lg:max-w-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/3.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-in-up" delay={100}>
            <p className="text-center text-lg leading-relaxed text-slate-600 lg:text-left">
              LBS Centre for Social & Agricultural Development (LNGO – Somalia) works to improve livelihoods and build resilience in communities through integrated programs in agriculture, nutrition, WASH, and youth empowerment. We partner with local stakeholders to deliver sustainable, impact-driven solutions.
            </p>
          </AnimateIn>
        </div>
      </Section>

      {/* Welcome / Co-founder Message */}
      <WelcomeSection />

      {/* Vision, Mission & Values - circular card design */}
      <VisionMissionValuesSection />

      {/* Focus Areas - grid with icons */}
      <Section
        title="Focus Areas"
        subtitle="Our work spans multiple sectors to create lasting impact."
      >
        <FocusAreasSection items={FOCUS_AREAS} />
      </Section>

      {/* Featured Projects */}
      <section className="border-t border-slate-200 bg-slate-50/50 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-base text-slate-600 sm:mt-3 sm:text-lg">
              Latest initiatives making a difference on the ground.
            </p>
          </div>
          {featuredProjects.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, i) => (
                <AnimateIn key={project.id} animation="scale-in" delay={i === 0 ? 0 : i === 1 ? 100 : 200}>
                  <Card
                    title={project.title}
                    description={project.description.slice(0, 160) + (project.description.length > 160 ? "…" : "")}
                    href={`/projects/${project.slug}`}
                    image={project.coverImage}
                    imageAlt={project.title}
                  />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">No projects yet. Check back soon.</p>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl border-2 border-[var(--logo-green-dark)] bg-white px-5 py-3 text-sm font-semibold text-[var(--logo-green-dark)] shadow-sm transition hover:bg-[var(--logo-brown-bg)] hover:border-[var(--logo-green)]"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <PartnersSection partners={partners} />

      {/* Impact */}
      <Section title="Our Impact" subtitle="Numbers that reflect our commitment.">
        <AnimateIn animation="fade-in-up">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-[var(--logo-green-dark)] sm:text-3xl md:text-4xl">{projectCount}+</p>
            <p className="mt-1 text-sm font-medium text-slate-500">Projects</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-[var(--logo-green-dark)] sm:text-3xl md:text-4xl">6</p>
            <p className="mt-1 text-sm font-medium text-slate-500">Program Areas</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold text-[var(--logo-green-dark)] sm:text-2xl md:text-3xl">Somalia</p>
            <p className="mt-1 text-sm font-medium text-slate-500">Focus Region</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-[var(--logo-green-dark)] sm:text-3xl md:text-4xl">LNGO</p>
            <p className="mt-1 text-sm font-medium text-slate-500">Local NGO</p>
          </div>
        </div>
        </AnimateIn>
      </Section>

      {/* CTA */}
      <section className="border-t border-[var(--logo-green-dark)]/30 bg-[var(--logo-brown)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <AnimateIn animation="fade-in">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:mt-4 sm:text-base">
            Partner with us, support our programs, or learn more about our work.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--logo-green)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--logo-green-dark)] active:bg-[var(--logo-green-darker)] sm:mt-8"
          >
            Contact Us
          </Link>
        </div>
        </AnimateIn>
      </section>
    </>
  );
}
