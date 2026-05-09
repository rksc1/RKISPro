import { Card } from "@/components/ui/Card";
import type { VendorProfile } from "@/models/Vendor";

export function VendorCapabilityCard({ vendor }: { vendor: VendorProfile }) {
  return (
    <Card>
      <h3 className="text-lg font-black text-slate-950">Capabilities</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {vendor.serviceList.map((service) => (
          <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-brand-dark" key={service}>{service}</span>
        ))}
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <span><strong>Quick booking:</strong> {vendor.availableForQuickBooking ? "Enabled" : "Disabled"}</span>
        <span><strong>Large work:</strong> {vendor.availableForLargeWork ? "Enabled" : "Disabled"}</span>
        <span><strong>Trust score:</strong> {vendor.trustScore}</span>
        <span><strong>Completed jobs:</strong> {vendor.completedProjectsCount}</span>
      </div>
    </Card>
  );
}
