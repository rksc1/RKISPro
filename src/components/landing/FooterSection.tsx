import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/customer/vendors", label: "Audited Workshop Directory" },
  { href: "/customer/estimator", label: "Cost & Lead-Time Estimator" },
  { href: "/cad-lab", label: "Interactive 3D CAD Lab" },
  { href: "/services", label: "Capabilities & Processes" },
  { href: "/about#how-it-works", label: "How Milestone Payments Work" },
  { href: "/contact", label: "Contact Operations Desk" },
];

const categories = [
  "Main Gates, Railings & Window Grills",
  "Roof Sheds, Trusses & Steel Stairs",
  "Warehouse Racks, Trolleys & Frames",
  "Sheet Metal Enclosures & Tanks",
  "Lathe Turning & Precision Machining",
  "On-Site Welding, Repair & Maintenance",
];

const vendorLinks = [
  { href: "/vendor/register", label: "Apply for Factory Audit" },
  { href: "/about#verification", label: "Vetting Standards & MTC Rules" },
  { href: "/auth?mode=login", label: "Partner Workshop Sign In" },
];

export function FooterSection() {
  return (
    <footer
      className="bg-slate-950 text-slate-300 border-t border-slate-800"
    >
      {/* Main footer */}
      <div className="page-shell py-14 grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
        {/* Brand column */}
        <div className="max-w-xs grid gap-5">
          <BrandLogo variant="light" size="sm" />
          <p className="text-sm font-semibold text-white">
            India&apos;s Industrial Contractor Marketplace
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            Find verified contractors for fabrication, welding, CNC, repairs and more.
            Get comparable price quotes, track the work, and see every payment.
          </p>
          <div className="grid gap-2 text-sm text-slate-400">
            <a
              href="mailto:support@rkispro.com"
              className="flex items-center gap-2 transition hover:text-teal-300"
            >
              <Mail className="size-3.5" />
              support@rkispro.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5" />
              India
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-widest text-teal-400"
          >
            Quick Links
          </h3>
          <ul className="mt-5 grid gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-widest text-teal-400"
          >
            Categories
          </h3>
          <ul className="mt-5 grid gap-2.5">
            {categories.map((category) => (
              <li
                key={category}
                className="text-sm text-slate-400"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Vendors */}
        <div className="grid gap-6 content-start">
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest text-teal-400"
            >
              Vendors
            </h3>
            <ul className="mt-5 grid gap-2.5">
              {vendorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini CTA */}
          <div
            className="rounded-xl p-4 bg-slate-900/90 border border-slate-800"
          >
            <p className="text-xs font-semibold text-white">
              Ready to get started?
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Describe your job and get quotes from verified contractors.
            </p>
            <Link
              href="/auth"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-400 transition hover:text-teal-300"
            >
              Post Your Job
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="page-shell py-5 border-t border-slate-800/80"
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} RKISPro Industrial Technologies Pvt Ltd. CBIC GST &amp; SAC 9988 Compliant.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-xs text-slate-400 transition hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 transition hover:text-white">Terms</Link>
            <Link href="/cookies" className="text-xs text-slate-400 transition hover:text-white">Cookies</Link>
            <Link href="/refunds" className="text-xs text-slate-400 transition hover:text-white">Refunds</Link>
            <span
              className="hidden sm:block size-1.5 rounded-full bg-teal-500"
            />
            <span className="text-xs text-teal-400 font-mono">Pune · Bengaluru · Sanand · Raipur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
