import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

const categories = ["Fabrication", "Welding", "CNC", "Lathe", "Repair"];

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-16 text-white">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr_.8fr] lg:gap-12">
        <div className="max-w-md">
          <BrandLogo variant="light" size="sm" />
          <p className="mt-4 text-sm font-bold text-slate-100">India&apos;s Managed Industrial RFQ Platform</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Procurement coordination for RFQs, verified vendor shortlisting, structured quotations, project tracking, and payment visibility.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Quick Links</h3>
          <div className="mt-5 grid gap-2.5 text-sm text-slate-400">
            <Link href="/about">How It Works</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/auth">Post Requirement</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Categories</h3>
          <div className="mt-5 grid gap-2.5 text-sm text-slate-400">
            {categories.map((category) => <span key={category}>{category}</span>)}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Vendors</h3>
          <div className="mt-5 grid gap-2.5 text-sm text-slate-400">
            <Link href="/vendor/register">Apply as Verified Vendor</Link>
            <Link href="/vendor/login">Vendor Login</Link>
            <span>support@rkispro.com</span>
            <span>India</span>
          </div>
        </div>
      </div>
      <div className="page-shell mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
        &copy; 2026 RKISPro. All rights reserved.
      </div>
    </footer>
  );
}
