import { Card } from "@/components/ui/Card";
import type { VendorProfile } from "@/models/Vendor";

export function VendorCapabilityCard({ vendor }: { vendor: VendorProfile }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-950">Capabilities & Trust</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${vendor.verificationStatus === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-canvas text-brand-dark'}`}>
          {vendor.verificationStatus}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {vendor.serviceList.map((service) => (
          <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-brand-dark" key={service}>{service}</span>
        ))}
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <span><strong>Quick booking:</strong> {vendor.availableForQuickBooking ? "Enabled" : "Disabled"}</span>
        <span><strong>Large work:</strong> {vendor.availableForLargeWork ? "Enabled" : "Disabled"}</span>
        <div className="my-2 h-px bg-line" />
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-canvas p-2">
            <span className="block text-xl font-black text-slate-950">{vendor.trustScore}</span>
            <span className="text-xs font-bold uppercase text-muted">Trust Score</span>
          </div>
          <div className="rounded-md bg-canvas p-2">
            <span className="block text-xl font-black text-slate-950">★ {vendor.rating.toFixed(1)}</span>
            <span className="text-xs font-bold uppercase text-muted">Rating</span>
          </div>
          <div className="rounded-md bg-canvas p-2">
            <span className="block text-xl font-black text-slate-950">{vendor.completedProjectsCount}</span>
            <span className="text-xs font-bold uppercase text-muted">Jobs Done</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
