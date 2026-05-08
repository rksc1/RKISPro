import { Button } from "@/components/ui/Button";

export function VendorCTA() {
  return (
    <section className="bg-canvas py-20">
      <div className="page-shell overflow-hidden rounded-3xl bg-[linear-gradient(120deg,rgba(2,6,23,.94),rgba(15,23,42,.72)),url('https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center p-8 text-white sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-center">
          <div className="grid gap-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Vendor Growth</p>
            <h2 className="text-3xl font-black sm:text-4xl">Grow Your Industrial Business with RKISPro</h2>
            <p className="max-w-2xl text-slate-300">Get qualified RFQs from manufacturers, factories, builders, and procurement teams looking for industrial work partners.</p>
            <Button href="/vendor/register">Join as Vendor</Button>
          </div>
          <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            {["Verified business profile", "Location and capability matching", "Quote workflow visibility", "Better lead quality"].map((item) => (
              <span className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold" key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
