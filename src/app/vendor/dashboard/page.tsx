import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorById } from "@/services/vendor-service";

export const dynamic = "force-dynamic";

export default async function VendorDashboardPage() {
  const session = await getVendorFromCookie();
  const vendor = session ? await getVendorById(session.id) : null;

  return (
    <VendorLayout title="Vendor dashboard">
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="profile" className="text-xl font-bold">Profile</h2>
            {vendor ? <StatusBadge status={vendor.status} /> : null}
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <span><strong>Company:</strong> {vendor?.companyName}</span>
            <span><strong>Owner:</strong> {vendor?.ownerName}</span>
            <span><strong>Email:</strong> {vendor?.email}</span>
            <span><strong>Phone:</strong> {vendor?.phone}</span>
            <span><strong>GST:</strong> {vendor?.gstNumber}</span>
            <span><strong>Location:</strong> {vendor?.location}</span>
            <span><strong>Capacity:</strong> {vendor?.capacity}</span>
            <span><strong>Workers:</strong> {vendor?.workerCount}</span>
            <span><strong>Experience:</strong> {vendor?.experienceYears} years</span>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <span><strong>Services:</strong> {vendor?.services}</span>
            <span><strong>Machinery:</strong> {vendor?.machinery}</span>
          </div>
        </Card>
        <Card>
          <h2 id="rfqs" className="text-xl font-bold">Future RFQs</h2>
          <p className="mt-3 text-sm text-muted">Approved vendors will receive RFQs after the RFQ engine is built.</p>
        </Card>
      </div>
    </VendorLayout>
  );
}
