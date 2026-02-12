import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with LBS Centre for Social and Agricultural Development.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            We would love to hear from you. Send a message using the form below.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-earth-800">Get in Touch</h2>
            <p className="mt-4 text-earth-600">
              LBS Centre for Social and Agricultural Development (LNGO – Somalia)
            </p>
            <ul className="mt-6 space-y-3 text-earth-600">
              <li>
                <strong>Address:</strong> Somalia (details can be updated in admin/content)
              </li>
              <li>
                <strong>Email:</strong> Use the contact form to send us an email.
              </li>
              <li>
                <strong>Phone:</strong> (Update in content/CMS as needed)
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-earth-200 bg-earth-50/50 p-6">
            <h2 className="font-display text-xl font-semibold text-earth-800 mb-4">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
