import { Button } from "@/components/ui/Button";

const chips = ["Steel fabrication", "CNC machining", "Welding", "Shed construction"];

export function SearchRFQBar() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white p-2 shadow-2xl shadow-slate-950/20">
      <form action="/customer/request/new" className="grid gap-2 md:grid-cols-[1.2fr_.9fr_auto]">
        <input
          className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none focus:border-brand-gold"
          name="q"
          placeholder="What industrial work do you need?"
        />
        <input
          className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none focus:border-brand-gold"
          name="location"
          placeholder="City or industrial area"
        />
        <Button type="submit" className="min-h-12 px-6">Start RFQ</Button>
      </form>
      <div className="flex flex-wrap gap-2 px-2 pb-2 pt-3">
        {chips.map((chip) => (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600" key={chip}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
