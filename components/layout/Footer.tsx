import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/our-team", label: "Our Team" },
  { href: "/programs", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Research & Training" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-flex items-center gap-5 group">
              <span className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2.5 shadow-lg ring-2 ring-white/10 transition-transform group-hover:scale-105">
                <Image
                  src="/lbscentre.png"
                  alt="LBS Centre Logo"
                  width={128}
                  height={128}
                  className="h-full w-full object-contain"
                />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl font-bold text-white tracking-tight leading-none">
                  LBS Centre
                </span>
                <span className="text-xs capitalize tracking-wider text-[var(--logo-green)] font-bold leading-tight">
                  For Social & Agricultural Development.
                </span>
              </div>
            </Link>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
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

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <span className="h-1 w-6 bg-[var(--logo-green-dark)] rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--logo-green)] shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  Makka Al Mukarama Road, Taleh junction.
                  <br />
                  Global Road, Garowe, Pl-Somalia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-5 w-5 text-[var(--logo-green)] shrink-0" />
                <a href="https://wa.me/252907747138" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors" aria-label="WhatsApp">
                  +252 907 747 138
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--logo-green)] shrink-0" />
                <a href="mailto:Info@lbscentre.net" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Info@lbscentre.net
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
          </div>
        </div>
      </div>
    </footer>
  );
}
