import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "How it works" },
  { href: "/contact", label: "Contact" },
  { href: "/vendor/register", label: "For vendors" }
];

export function StickyNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 shadow-md shadow-slate-950/35 backdrop-blur-md [background:linear-gradient(90deg,#0b1120_0%,#111827_50%,#0b1120_100%)]">
      <div className="page-shell flex min-h-[72px] items-center justify-between gap-4 py-2 lg:min-h-20">
        <div className="flex flex-[1_1_20%] items-center">
          <Logo className="drop-shadow-[0_0_8px_rgba(34,211,238,0.14)]" priority size="md" variant="light" />
        </div>

        <nav aria-label="Main navigation" className="hidden flex-[1_1_50%] items-center justify-center gap-6 text-sm font-semibold text-white/80 lg:flex">
          {navLinks.map((link) => (
            <Link
              className="group relative rounded-md px-1 py-2 transition-colors duration-300 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              href={link.href}
              key={link.href}
            >
              {link.label}
              <span className="absolute inset-x-1 -bottom-0.5 h-px scale-x-0 bg-teal-400 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden flex-[1_1_30%] items-center justify-end gap-3 md:flex">
          <Link
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/80 transition-colors duration-300 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            href="/customer/login"
          >
            Login
          </Link>
          <Link
            className="inline-flex min-h-9 items-center justify-center rounded-xl bg-teal-500 px-4 text-sm font-bold text-white shadow-md shadow-teal-950/25 ring-1 ring-teal-300/25 transition-all duration-300 hover:-translate-y-px hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            href="/customer/request/new"
          >
            Post Requirement
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white shadow-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
            <span className="sr-only">Open navigation menu</span>
            <span className="grid gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:translate-y-2 group-open:rotate-45" />
              <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:opacity-0" />
              <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:-translate-y-2 group-open:-rotate-45" />
            </span>
          </summary>
          <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-slate-950/60 ring-1 ring-teal-300/10">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navLinks.map((link) => (
                <Link className="rounded-xl px-3 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-teal-300" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-white/10" />
              <Link className="rounded-xl px-3 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-teal-300" href="/customer/login">
                Login
              </Link>
              <Link className="mt-1 inline-flex min-h-10 items-center justify-center rounded-xl bg-teal-500 px-4 text-sm font-black text-white shadow-md shadow-teal-950/30 transition hover:bg-teal-400" href="/customer/request/new">
                Post Requirement
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
