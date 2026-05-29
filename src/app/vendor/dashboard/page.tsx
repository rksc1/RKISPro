import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { VendorCapabilityCard } from "@/components/ui/VendorCapabilityCard";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
import { getVendorFromCookie } from "@/lib/auth";
import { normalizeStatus } from "@/lib/status";
import { getVendorById } from "@/services/vendor-service";

export const dynamic = "force-dynamic";

export default async function VendorDashboardPage() {
  const session = await getVendorFromCookie();
  const vendor = session ? await getVendorById(session.id) : null;
  const vendorStatus = normalizeStatus(vendor?.status);
  const isEligible = vendorStatus === "approved";
  const profileItems = [
    { label: "Verification Status", value: vendor?.verificationStatus ?? "pending", note: "Approval controls curated RFQ access" },
    { label: "Profile Completeness", value: vendor?.services && vendor?.machinery && vendor?.capacity ? "Ready" : "Needs details", note: "Services, machinery, capacity, and location" },
    { label: "Approved Service Categories", value: vendor?.services || "Under review", note: "Used for RFQ eligibility" },
    { label: "RFQ Eligibility", value: isEligible ? "Eligible" : "Pending approval", note: "Curated RFQs require approval" },
    { label: "Pending Quotations", value: 0, note: "Open quotation tasks" },
    { label: "Awarded Work", value: vendor?.completedProjectsCount ?? 0, note: "Completed and awarded project history" },
    { label: "Payout Status", value: "Visible after award", note: "Track payouts from project records" }
  ];

  return (
    <VendorLayout title="Verified Vendor Network">
      <Card>
        <h2 className="text-xl font-bold">Verified Vendor Network</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Vendors receive curated RFQs only after approval and category verification.
        </p>
        {!isEligible ? (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Your profile is not eligible for curated RFQs yet. Complete service categories, machinery, capacity, location, and verification details for review.
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
            Your vendor profile is eligible for curated RKISPro requirements in approved categories.
          </div>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profileItems.map((item) => (
          <Card className={item.label === "Verification Status" || item.label === "RFQ Eligibility" ? "border-l-4 border-l-brand-gold" : ""} key={item.label}>
            <span className="text-sm font-semibold text-muted">{item.label}</span>
            <strong className="mt-2 block text-xl text-slate-950">{item.value}</strong>
            <p className="mt-2 text-sm text-muted">{item.note}</p>
          </Card>
        ))}
      </div>

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
    </VendorLayout>
  );
}
