import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with LBS Centre for Social & Agricultural Development.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--logo-brown)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl text-base text-stone-200 sm:mt-4 sm:text-lg">
            We would love to hear from you. Send a message using the form below.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold text-slate-900 sm:text-xl">Get in Touch</h2>
            <p className="mt-4 text-slate-600">
              LBS Centre for Social & Agricultural Development
            </p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>
                <strong className="text-slate-800 block mb-1">Address</strong>
                Makka Al Mukarama Road, Taleh junction. first<br />
                Global Road, Garowe, Pl-Somalia
              </li>
              <li>
                <strong className="text-slate-800 block mb-1">WhatsApp</strong>
                <a href="https://wa.me/252907747138" target="_blank" rel="noopener noreferrer" className="text-[var(--logo-green-dark)] hover:underline">
                  +252 907 747 138
                </a>
              </li>
              <li>
                <strong className="text-slate-800 block mb-1">Email</strong>
                <a href="mailto:Info@lbscentre.net" className="text-[var(--logo-green-dark)] hover:underline">
                  Info@lbscentre.net
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            <h2 className="font-display text-lg font-semibold text-slate-900 mb-4 sm:text-xl sm:mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
