import { Button } from "@/components/ui/Button";
import { SearchRFQBar } from "@/components/landing/SearchRFQBar";

const trustBadges = [
  "Admin-reviewed RFQs",
  "3-5 shortlisted vendors",
  "Structured quotations",
  "Vendor verification",
  "Project tracking",
  "Payment visibility"
];

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,.96),rgba(15,23,42,.76)),url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas to-transparent" />
      <div className="page-shell relative grid gap-8 py-10 sm:py-14 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:py-20">
        <div className="grid gap-6">
          <div className="hidden flex-wrap gap-2 sm:flex">
            {trustBadges.map((badge) => (
              <span className="animate-rise rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur" key={badge}>
                {badge}
              </span>
            ))}
          </div>
          <div className="grid gap-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-gold sm:text-sm">Managed Industrial RFQ Platform</p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.06] sm:text-5xl lg:text-6xl">
              Managed Industrial RFQs. Verified Vendors. Tracked Execution.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              RKISPro helps factories, contractors, warehouses, and industrial businesses submit fabrication and service requirements, receive structured quotations from 3-5 shortlisted vendors, and track execution through completion.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:hidden">
            {trustBadges.slice(0, 3).map((badge) => (
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200" key={badge}>
                {badge}
              </span>
            ))}
          </div>
          <div className="hidden sm:block">
            <SearchRFQBar />
          </div>
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Button href="/auth">Post Requirement</Button>
            <Button href="/vendor/register" variant="secondary">Apply as Verified Vendor</Button>
          </div>
        </div>
        <div className="hidden gap-4 md:grid lg:justify-self-end">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="aspect-[4/3] rounded-2xl bg-[url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-4 text-slate-950">
                <strong className="text-2xl">3-5</strong>
                <p className="text-xs font-bold text-slate-500">Shortlisted vendors</p>
              </div>
              <div className="rounded-lg bg-brand-gold p-4 text-slate-950">
                <strong className="text-2xl">24h</strong>
                <p className="text-xs font-bold">RFQ review target</p>
              </div>
              <div className="rounded-lg bg-slate-900 p-4">
                <strong className="text-2xl">360</strong>
                <p className="text-xs font-bold text-slate-400">Execution checkpoints</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
