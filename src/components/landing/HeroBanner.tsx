import { Button } from "@/components/ui/Button";
import { SearchRFQBar } from "@/components/landing/SearchRFQBar";

const trustBadges = ["Verified vendors", "Fast RFQ routing", "Industrial categories", "Admin-reviewed leads"];

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,.96),rgba(15,23,42,.76)),url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas to-transparent" />
      <div className="page-shell relative grid gap-10 py-16 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:py-24">
        <div className="grid gap-7">
          <div className="flex flex-wrap gap-2">
            {trustBadges.map((badge) => (
              <span className="animate-rise rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur" key={badge}>
                {badge}
              </span>
            ))}
          </div>
          <div className="grid gap-5">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-gold">B2B Industrial RFQ Marketplace</p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              India&apos;s Smart Industrial Marketplace for Fabricators & Manufacturers
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Connect with verified welders, mechanics, fabricators, machine shops, and industrial vendors near you.
            </p>
          </div>
          <SearchRFQBar />
          <div className="flex flex-wrap gap-3">
            <Button href="/customer/register">Post Requirement</Button>
            <Button href="/vendor/register" variant="secondary">Become a Vendor</Button>
          </div>
        </div>
        <div className="grid gap-4 lg:justify-self-end">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="aspect-[4/3] rounded-2xl bg-[url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 text-slate-950">
                <strong className="text-2xl">4.8x</strong>
                <p className="text-xs font-bold text-slate-500">Faster vendor discovery</p>
              </div>
              <div className="rounded-2xl bg-brand-gold p-4 text-slate-950">
                <strong className="text-2xl">24h</strong>
                <p className="text-xs font-bold">RFQ review target</p>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4">
                <strong className="text-2xl">360</strong>
                <p className="text-xs font-bold text-slate-400">Industrial services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
