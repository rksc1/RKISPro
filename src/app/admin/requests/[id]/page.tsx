import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getMarketplaceRequestById } from "@/services/marketplace-request-service";
import { getRequestNotificationVendorIds } from "@/services/vendor-notification-service";
import { getApprovedVendors } from "@/services/vendor-service";

export const dynamic = "force-dynamic";

export default async function AdminRequestDistributionPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ location?: string; services?: string; machinery?: string; capacity?: string }>;
}) {
  const [{ id }, filters] = await Promise.all([params, searchParams]);
  const [request, vendors, notifiedVendorIds] = await Promise.all([
    getMarketplaceRequestById(id),
    getApprovedVendors(filters),
    getRequestNotificationVendorIds(id)
  ]);

  if (!request) notFound();

  const canDistribute = request.status === "Approved" || request.status === "Distributed";

  return (
    <AdminLayout title="Distribute RFQ">
      <Card>
        <div className="grid gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link className="text-sm font-semibold text-brand" href="/admin/requests">
                Back to RFQs
              </Link>
              <h2 className="mt-2 text-2xl font-bold">{request.projectTitle}</h2>
              <p className="mt-1 text-sm text-muted">
                {request.serviceType} | {request.materialType} | {request.location}
              </p>
            </div>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-sm text-muted">{request.description}</p>
          <div className="grid gap-2 text-sm md:grid-cols-3">
            <span><strong>Deadline:</strong> {request.deadline}</span>
            <span><strong>Files:</strong> {request.drawingUrls.length}</span>
            <span><strong>Notified vendors:</strong> {notifiedVendorIds.length}</span>
          </div>
          {request.drawingUrls.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {request.drawingUrls.map((url, index) => (
                <a
                  className="rounded-md border border-line px-3 py-2 text-xs font-bold text-brand hover:border-brand"
                  href={url}
                  key={url}
                  rel="noreferrer"
                  target="_blank"
                >
                  View file {index + 1}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Card>

      <Card>
        <form className="grid gap-4 md:grid-cols-5" action={`/admin/requests/${request.id}`}>
          <Input label="Location" name="location" defaultValue={filters.location ?? ""} />
          <Input label="Services" name="services" defaultValue={filters.services ?? ""} />
          <Input label="Machinery" name="machinery" defaultValue={filters.machinery ?? ""} />
          <Input label="Capacity" name="capacity" defaultValue={filters.capacity ?? ""} />
          <div className="flex items-end">
            <Button type="submit" className="w-full">Filter</Button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="grid gap-4">
          <div>
            <h2 className="text-xl font-bold">Approved vendors</h2>
            <p className="mt-1 text-sm text-muted">
              Only approved vendors can receive RFQs.
            </p>
          </div>

          {!canDistribute ? (
            <p className="rounded-md border border-line bg-canvas p-4 text-sm font-semibold text-muted">
              Approve this RFQ before distributing it to vendors.
            </p>
          ) : null}

          <form className="grid gap-4" action={`/api/admin/requests/${request.id}/distribute`} method="post">
            <div className="grid gap-3">
              {vendors.map((vendor) => (
                <label
                  className="grid gap-3 rounded-md border border-line p-4 text-sm sm:grid-cols-[auto_1fr]"
                  htmlFor={`vendor-${vendor.id}`}
                  key={vendor.id}
                >
                  <input
                    className="mt-1"
                    defaultChecked={notifiedVendorIds.includes(vendor.id)}
                    disabled={!canDistribute}
                    id={`vendor-${vendor.id}`}
                    name="vendorIds"
                    type="checkbox"
                    value={vendor.id}
                  />
                  <span className="grid gap-1">
                    <strong>{vendor.companyName}</strong>
                    <span className="text-muted">{vendor.ownerName} | {vendor.location}</span>
                    <span className="text-muted">{vendor.services}</span>
                    <span className="text-muted">{vendor.machinery} | Capacity: {vendor.capacity}</span>
                  </span>
                </label>
              ))}
              {vendors.length === 0 ? (
                <p className="text-sm text-muted">No approved vendors match the selected filters.</p>
              ) : null}
            </div>
            <Button disabled={!canDistribute || vendors.length === 0} type="submit">
              Send RFQ to Selected Vendors
            </Button>
          </form>
        </div>
      </Card>
    </AdminLayout>
  );
}
