import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
  { href: "/auth", label: "Post Requirement" },
];

const categories = [
  "Fabrication",
  "Welding",
  "CNC Machining",
  "Lathe Work",
  "Repair & Maintenance",
  "Sheet Metal",
];

const vendorLinks = [
  { href: "/vendor/register", label: "Apply as Verified Vendor" },
  { href: "/auth?mode=login", label: "Sign In" },
];

export function FooterSection() {
  return (
    <footer
      style={{
        background: "#020D14",
        borderTop: "1px solid rgba(0,196,204,0.08)",
      }}
    >
      {/* Main footer */}
      <div className="page-shell py-14 grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
        {/* Brand column */}
        <div className="max-w-xs grid gap-5">
          <BrandLogo variant="light" size="sm" />
          <p className="text-sm font-semibold text-white">
            India&apos;s Industrial Contractor Marketplace
          </p>
          <p className="text-sm leading-relaxed text-navy-100/70">
            Find verified contractors for fabrication, welding, CNC, repairs and more.
            Get comparable price quotes, track the work, and see every payment.
          </p>
          <div className="grid gap-2 text-sm text-navy-100/60">
            <a
              href="mailto:support@rkispro.com"
              className="flex items-center gap-2 transition hover:text-teal-400"
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
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#00C4CC" }}
          >
            Quick Links
          </h3>
          <ul className="mt-5 grid gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-navy-100/70 transition hover:text-teal-400"
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
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#00C4CC" }}
          >
            Categories
          </h3>
          <ul className="mt-5 grid gap-2.5">
            {categories.map((category) => (
              <li
                key={category}
                className="text-sm text-navy-100/70"
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
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00C4CC" }}
            >
              Vendors
            </h3>
            <ul className="mt-5 grid gap-2.5">
              {vendorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-100/70 transition hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini CTA */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(0,196,204,0.05)",
              border: "1px solid rgba(0,196,204,0.12)",
            }}
          >
            <p className="text-xs font-semibold text-white">
              Ready to get started?
            </p>
            <p className="mt-1 text-xs text-navy-100/60">
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
        className="page-shell py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-100/40">
            &copy; {new Date().getFullYear()} RKISPro pvt Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-xs text-navy-100/60 transition hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs text-navy-100/60 transition hover:text-white">Terms</Link>
            <Link href="/cookies" className="text-xs text-navy-100/60 transition hover:text-white">Cookies</Link>
            <Link href="/refunds" className="text-xs text-navy-100/60 transition hover:text-white">Refunds</Link>
            <span
              className="hidden sm:block size-1.5 rounded-full"
              style={{ background: "#00C4CC" }}
            />
            <span className="text-xs text-navy-100/40">Built for industrial India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
