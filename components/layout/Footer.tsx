import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/our-team", label: "Our Team" },
  { href: "/programs", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training & Research" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const PROGRAM_LINKS = [
  { href: "/programs/agriculture", label: "Sustainable Agriculture" },
  { href: "/programs/food-security", label: "Food Security" },
  { href: "/programs/wash", label: "WASH Interventions" },
  { href: "/programs/climate", label: "Climate Resilience" },
];

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-flex items-center gap-5 group">
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-lg ring-2 ring-white/10 transition-transform group-hover:scale-105">
                <Image
                  src="/lbscentre.png"
                  alt="LBS Centre Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl font-bold text-white tracking-tight leading-none">
                  LBS Centre
                </span>
                <span className="text-xs uppercase tracking-wider text-[var(--logo-green)] font-bold leading-tight">
                  For Social &<br /> Agricultural Dev.
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Empowering communities in Somalia through sustainable agriculture, food security, and resilience building initiatives since our inception.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-[var(--logo-green)] hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <span className="h-1 w-6 bg-[var(--logo-yellow)] rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-[var(--logo-yellow)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[var(--logo-yellow)]"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <span className="h-1 w-6 bg-[var(--logo-green)] rounded-full"></span>
              Our Focus
            </h3>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-[var(--logo-green)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[var(--logo-green)]"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <span className="h-1 w-6 bg-[var(--logo-green-dark)] rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--logo-green)] shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  Mogadishu, Somalia<br />
                  KM4 Area, Hodan District
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--logo-green)] shrink-0" />
                <a href="tel:+25261xxxxxxx" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +252 61 XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--logo-green)] shrink-0" />
                <a href="mailto:info@lbscentre.org" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@lbscentre.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {year} LBS Centre for Social & Agricultural Development. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
