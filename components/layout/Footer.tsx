import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-earth-200 bg-earth-900 text-earth-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold">LBS Centre</h3>
            <p className="mt-2 text-sm text-earth-300">
              Centre for Social and Agricultural Development (LNGO – Somalia)
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link href="/about" className="text-earth-300 hover:text-white">About</Link></li>
              <li><Link href="/programs" className="text-earth-300 hover:text-white">Programs</Link></li>
              <li><Link href="/projects" className="text-earth-300 hover:text-white">Projects</Link></li>
              <li><Link href="/contact" className="text-earth-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Contact</h3>
            <p className="mt-2 text-sm text-earth-300">
              Use our <Link href="/contact" className="underline hover:text-white">contact form</Link> to get in touch.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-earth-700 pt-8 text-center text-sm text-earth-400">
          © {year} LBS Centre for Social and Agricultural Development. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
