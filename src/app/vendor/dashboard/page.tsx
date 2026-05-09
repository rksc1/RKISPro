import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { VendorCapabilityCard } from "@/components/ui/VendorCapabilityCard";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
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
            <div className="flex flex-wrap gap-2">
              {vendor ? <VendorTypeBadge type={vendor.vendorType} /> : null}
              {vendor ? <StatusBadge status={vendor.status} /> : null}
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <span><strong>{vendor?.vendorType === "individual" ? "Name" : "Company"}:</strong> {vendor?.vendorType === "individual" ? vendor.fullName : vendor?.companyName}</span>
            <span><strong>Owner:</strong> {vendor?.ownerName}</span>
            <span><strong>Email:</strong> {vendor?.email}</span>
            <span><strong>Phone:</strong> {vendor?.phone}</span>
            <span><strong>GST:</strong> {vendor?.gstNumber}</span>
            <span><strong>City:</strong> {vendor?.city ?? vendor?.location}</span>
            <span><strong>State:</strong> {vendor?.state ?? "Not set"}</span>
            <span><strong>Verification:</strong> {vendor?.verificationStatus}</span>
            <span><strong>Capacity:</strong> {vendor?.capacity}</span>
            <span><strong>Workers:</strong> {vendor?.workerCount}</span>
            <span><strong>Experience:</strong> {vendor?.experienceYears} years</span>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <span><strong>Services:</strong> {vendor?.services}</span>
            <span><strong>Machinery:</strong> {vendor?.machinery}</span>
          </div>
        </Card>
        {vendor ? <VendorCapabilityCard vendor={vendor} /> : null}
      </div>
      <Card>
        <h2 className="text-xl font-bold">
          {vendor?.vendorType === "individual" ? "Quick Booking Workbench" : "RFQ & Project Workbench"}
        </h2>
        <p className="mt-3 text-sm text-muted">
          {vendor?.vendorType === "individual"
            ? "Assigned urgent service jobs and field work updates are available from Quick Bookings."
            : "Approved company vendors receive RFQs, submit quotations, and manage awarded projects from the RFQ and Projects menus."}
        </p>
      </Card>
    </VendorLayout>
  );
}
