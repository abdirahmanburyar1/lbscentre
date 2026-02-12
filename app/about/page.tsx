import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Background, history, structure, vision, mission, goals and objectives of LBS Centre for Social and Agricultural Development.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">About LBS Centre</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            Our background, structure, vision, and mission.
          </p>
        </div>
      </section>

      <Section title="Background" containerClassName="max-w-3xl">
        <p className="text-earth-600 leading-relaxed">
          LBS Centre for Social and Agricultural Development is a local non-governmental organization (LNGO) operating in Somalia. We focus on strengthening communities through integrated programs in food security, sustainable agriculture, livestock, climate resilience, WASH, and youth and gender empowerment.
        </p>
      </Section>

      <Section title="Historical Overview" className="bg-earth-50" containerClassName="max-w-3xl">
        <p className="text-earth-600 leading-relaxed">
          Founded to address the interconnected challenges of food insecurity, environmental stress, and limited livelihoods in the region, LBS Centre has evolved to deliver evidence-based, community-centred interventions. Our work is grounded in local partnerships and long-term commitment to the areas we serve.
        </p>
      </Section>

      <Section title="Organizational Structure" containerClassName="max-w-3xl">
        <p className="text-earth-600 leading-relaxed">
          We operate with a lean, program-focused structure. Our teams are organized around program areas and field operations, with support functions for finance, monitoring and evaluation, and communications. This allows us to remain responsive to community needs while maintaining accountability and transparency.
        </p>
      </Section>

      <Section title="Management Structure" className="bg-earth-50" containerClassName="max-w-3xl">
        <p className="text-earth-600 leading-relaxed">
          Leadership is provided by an experienced management team with expertise in agriculture, development, and humanitarian response. Day-to-day operations are led by a Country Director, with program managers responsible for each thematic area. Governance and strategic direction are provided by a board committed to our mission.
        </p>
      </Section>

      <Section title="Vision" containerClassName="max-w-3xl">
        <p className="text-earth-600 leading-relaxed text-lg">
          A Somalia where every community has access to food security, sustainable livelihoods, and resilience to climate and conflict.
        </p>
      </Section>

      <Section title="Mission" className="bg-earth-50" containerClassName="max-w-3xl">
        <p className="text-earth-600 leading-relaxed text-lg">
          To strengthen social and agricultural development through evidence-based programs, capacity building, and partnerships that empower communities and promote inclusive growth.
        </p>
      </Section>

      <Section title="Goals" containerClassName="max-w-3xl">
        <ul className="list-disc list-inside space-y-2 text-earth-600">
          <li>Improve food security and nutrition outcomes in target communities</li>
          <li>Promote sustainable agriculture and natural resource management</li>
          <li>Strengthen livelihoods and agribusiness opportunities</li>
          <li>Build resilience to climate change and shocks</li>
          <li>Enhance access to water, sanitation, and hygiene</li>
          <li>Advance gender equality and youth empowerment</li>
        </ul>
      </Section>

      <Section title="Objectives" className="bg-earth-50" containerClassName="max-w-3xl">
        <ul className="list-disc list-inside space-y-2 text-earth-600">
          <li>Deliver high-impact, scalable programs aligned with national and local priorities</li>
          <li>Build capacity of local institutions and community groups</li>
          <li>Generate and use evidence for learning and program improvement</li>
          <li>Foster partnerships with government, NGOs, and private sector</li>
          <li>Ensure accountability to beneficiaries and donors</li>
        </ul>
      </Section>
    </>
  );
}
