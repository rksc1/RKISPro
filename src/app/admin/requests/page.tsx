import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getMarketplaceRequests } from "@/services/marketplace-request-service";
import type { MarketplaceRequestStatus } from "@/types/auth";

export const dynamic = "force-dynamic";

function isRequestStatus(value?: string): value is MarketplaceRequestStatus {
  return value === "Pending" || value === "Approved" || value === "Rejected" || value === "Distributed";
}

export default async function AdminRequestsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; location?: string; serviceType?: string }>;
}) {
  const filters = await searchParams;
  const status = isRequestStatus(filters.status) ? filters.status : "";
  const requests = await getMarketplaceRequests({
    status,
    location: filters.location,
    serviceType: filters.serviceType
  });

  return (
    <AdminLayout title="RFQ review">
      <Card>
        <form className="grid gap-4 md:grid-cols-4" action="/admin/requests">
          <label className="grid gap-1.5 text-sm font-semibold text-ink" htmlFor="status">
            Status
            <select
              className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand"
              defaultValue={status}
              id="status"
              name="status"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Distributed">Distributed</option>
            </select>
          </label>
          <Input label="Location" name="location" defaultValue={filters.location ?? ""} />
          <Input label="Service type" name="serviceType" defaultValue={filters.serviceType ?? ""} />
          <div className="flex items-end">
            <Button type="submit" className="w-full">Filter</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <div className="grid gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{request.projectTitle}</h2>
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
                <span><strong>Created:</strong> {new Date(request.createdAt).toLocaleDateString()}</span>
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

              <div className="flex flex-wrap gap-2">
                <Button href={`/admin/requests/${request.id}`} variant="secondary">
                  View RFQ
                </Button>
                <form action={`/api/admin/requests/${request.id}/status`} method="post">
                  <input type="hidden" name="status" value="Approved" />
                  <Button type="submit">Approve</Button>
                </form>
                <form action={`/api/admin/requests/${request.id}/status`} method="post">
                  <input type="hidden" name="status" value="Rejected" />
                  <Button type="submit" variant="danger">Reject</Button>
                </form>
                {request.status === "Approved" ? (
                  <span className="flex items-center text-sm font-semibold text-muted">
                    Ready for vendor distribution.
                  </span>
                ) : null}
              </div>
            </div>
          </Card>
        ))}

        {requests.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">No RFQs match the selected filters.</p>
          </Card>
        ) : null}
      </div>
    </AdminLayout>
  );
}
