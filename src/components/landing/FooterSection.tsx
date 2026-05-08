import Link from "next/link";

const categories = ["Fabrication", "Welding", "CNC", "Lathe", "Repair"];

export function FooterSection() {
  return (
    <footer className="bg-slate-950 py-14 text-white">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr_.9fr_.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-brand-gold font-black text-slate-950">R</span>
            <strong className="text-xl">RKISPro</strong>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            A modern B2B industrial marketplace for RFQs, vendors, quotations, and procurement workflows.
          </p>
        </div>
        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/customer/register">Post Requirement</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Categories</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            {categories.map((category) => <span key={category}>{category}</span>)}
          </div>
        </div>
        <div>
          <h3 className="font-black">Vendors</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/vendor/register">Join as Vendor</Link>
            <Link href="/vendor/login">Vendor Login</Link>
            <span>support@rkispro.com</span>
            <span>India</span>
          </div>
        </div>
      </div>
      <div className="page-shell mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
        © 2026 RKISPro Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
