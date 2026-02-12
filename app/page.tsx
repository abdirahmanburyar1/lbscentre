import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { getFeaturedProjects, getProjectCount } from "@/lib/queries/projects";

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

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProjects, projectCount] = await Promise.all([
    getFeaturedProjects(3),
    getProjectCount(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-earth-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            LBS Centre for Social and Agricultural Development
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-earth-200">
            Building resilient communities in Somalia through food security, sustainable agriculture, and inclusive development.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/about"
              className="rounded-lg bg-accent px-6 py-3 font-medium text-white hover:opacity-90"
            >
              Learn About Us
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-earth-400 px-6 py-3 font-medium hover:bg-earth-700"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About short */}
      <Section title="Who We Are" subtitle="A brief introduction to our mission and work.">
        <p className="mx-auto max-w-3xl text-center text-lg text-earth-600">
          LBS Centre (LNGO – Somalia) works to improve livelihoods and build resilience in communities through integrated programs in agriculture, nutrition, WASH, and youth empowerment. We partner with local stakeholders to deliver sustainable, impact-driven solutions.
        </p>
      </Section>

      {/* Vision & Mission */}
      <Section className="bg-earth-50">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-earth-800">Our Vision</h3>
            <p className="mt-4 text-earth-600">
              A Somalia where every community has access to food security, sustainable livelihoods, and resilience to climate and conflict.
            </p>
          </div>
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-earth-800">Our Mission</h3>
            <p className="mt-4 text-earth-600">
              To strengthen social and agricultural development through evidence-based programs, capacity building, and partnerships that empower communities and promote inclusive growth.
            </p>
          </div>
        </div>
      </Section>

      {/* Focus Areas */}
      <Section
        title="Focus Areas"
        subtitle="Our work spans multiple sectors to create lasting impact."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FOCUS_AREAS.map((area) => (
            <Card
              key={area.title}
              title={area.title}
              description={area.description}
              href={`/programs#${area.title.toLowerCase().replace(/\s+/g, "-")}`}
            />
          ))}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section
        className="bg-earth-50"
        title="Featured Projects"
        subtitle="Latest initiatives making a difference on the ground."
      >
        {featuredProjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description.slice(0, 160) + (project.description.length > 160 ? "…" : "")}
                href={`/projects/${project.slug}`}
                image={project.coverImage}
                imageAlt={project.title}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-earth-600">No projects yet. Check back soon.</p>
        )}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg border border-earth-300 bg-white px-5 py-2.5 font-medium text-earth-700 hover:bg-earth-50"
          >
            View All Projects
          </Link>
        </div>
      </Section>

      {/* Impact summary */}
      <Section title="Our Impact" subtitle="Numbers that reflect our commitment.">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-accent">{projectCount}+</p>
            <p className="mt-1 text-earth-600">Projects</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-accent">6</p>
            <p className="mt-1 text-earth-600">Program Areas</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-accent">Somalia</p>
            <p className="mt-1 text-earth-600">Focus Region</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-accent">LNGO</p>
            <p className="mt-1 text-earth-600">Local NGO</p>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-earth-800 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-earth-200">
            Partner with us, support our programs, or learn more about our work.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </>
  );
}
