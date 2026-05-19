import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { VendorCapabilityCard } from "@/components/ui/VendorCapabilityCard";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
import { getAdminFromCookie } from "@/lib/auth";
import { getVendorById } from "@/services/vendor-service";
import type { VendorStatus } from "@/types/auth";

export default async function AdminVendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/auth?mode=login");

  const { id } = await params;
  const vendor = await getVendorById(id);
  if (!vendor) redirect("/admin/vendors");

  return (
    <AdminLayout title="Vendor Detail">
      <div className="flex justify-end">
        <Button href="/admin/vendors" variant="secondary">Back</Button>
      </div>
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <VendorTypeBadge type={vendor.vendorType} />
              <StatusBadge status={vendor.status} />
              <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold uppercase text-brand-dark">{vendor.verificationStatus}</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              {vendor.vendorType === "individual" ? vendor.fullName : vendor.companyName}
            </h2>
            <p className="mt-1 text-sm text-muted">{vendor.city ?? vendor.location}, {vendor.state ?? ""}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["Approved", "Rejected", "Inactive", "Pending"] as VendorStatus[]).map((status) => (
              <form action={`/api/admin/vendors/${vendor.id}/status`} method="post" key={status}>
                <input type="hidden" name="status" value={status} />
                <Button type="submit" variant={status === "Rejected" ? "danger" : "secondary"}>{status}</Button>
              </form>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-black text-slate-950">{vendor.vendorType === "individual" ? "Individual Profile" : "Company Profile"}</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {vendor.vendorType === "individual" ? (
              <>
                <span><strong>Full name:</strong> {vendor.fullName}</span>
                <span><strong>Skills:</strong> {vendor.skillCategories.join(", ")}</span>
                <span><strong>Service radius:</strong> {vendor.serviceRadiusKm ?? "Not set"} km</span>
                <span><strong>ID proof:</strong> {vendor.idProofUrl ? <a className="text-brand" href={vendor.idProofUrl} target="_blank">View</a> : "Not uploaded"}</span>
                <span><strong>Profile photo:</strong> {vendor.profilePhotoUrl ? <a className="text-brand" href={vendor.profilePhotoUrl} target="_blank">View</a> : "Not uploaded"}</span>
              </>
            ) : (
              <>
                <span><strong>Company:</strong> {vendor.companyName}</span>
                <span><strong>Owner:</strong> {vendor.ownerName}</span>
                <span><strong>GST:</strong> {vendor.gstNumber}</span>
                <span><strong>Workshop:</strong> {vendor.workshopAddress ?? vendor.location}</span>
                <span><strong>Machinery:</strong> {vendor.machinery}</span>
                <span><strong>Workshop images:</strong> {vendor.workshopImages.length}</span>
              </>
            )}
            <span><strong>Email:</strong> {vendor.email}</span>
            <span><strong>Phone:</strong> {vendor.phone}</span>
            <span><strong>Notes:</strong> {vendor.verificationNotes ?? "No notes"}</span>
          </div>
        </Card>
        <VendorCapabilityCard vendor={vendor} />
      </div>
    </AdminLayout>
  );
}
