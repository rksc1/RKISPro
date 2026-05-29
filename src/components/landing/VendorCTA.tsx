import { Button } from "@/components/ui/Button";

export function VendorCTA() {
  return (
    <section className="bg-canvas py-14 sm:py-16 lg:py-20">
      <div className="page-shell overflow-hidden rounded-lg bg-[linear-gradient(120deg,rgba(2,6,23,.94),rgba(15,23,42,.72)),url('https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center p-6 text-white sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-center">
          <div className="grid gap-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Verified Vendor Network</p>
            <h2 className="text-3xl font-black sm:text-4xl">Apply as a Verified Industrial Vendor</h2>
            <p className="max-w-2xl text-slate-300">Vendors receive curated RFQs only after approval and category verification, with clearer scope, documents, timelines, and execution expectations.</p>
            <Button href="/vendor/register">Apply as Verified Vendor</Button>
          </div>
          <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            {["Verified business profile", "Category approval", "Capability-based RFQ matching", "Quotation and payout visibility"].map((item) => (
              <span className="rounded-lg bg-white/10 px-4 py-3 text-sm font-bold" key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
