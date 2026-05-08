import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorAssignedRfqs } from "@/services/vendor-notification-service";

export const dynamic = "force-dynamic";

const statusClasses = {
  Sent: "bg-amber-100 text-amber-800",
  Viewed: "bg-blue-100 text-blue-800",
  Quoted: "bg-emerald-100 text-emerald-800",
  awarded: "bg-indigo-100 text-indigo-800"
};

export default async function VendorRfqsPage() {
  const vendor = await getVendorFromCookie();
  const rfqs = vendor ? await getVendorAssignedRfqs(vendor.id) : [];

  return (
    <VendorLayout title="Assigned RFQs">
      <div className="grid gap-4">
        {rfqs.map((notification) => (
          <Card key={notification.id}>
            <div className="grid gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{notification.request.projectTitle}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {notification.request.serviceType} | {notification.request.materialType} | {notification.request.location}
                  </p>
                </div>
                <span className={`w-max rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[notification.status]}`}>
                  {notification.status}
                </span>
              </div>

              <p className="text-sm text-muted">{notification.request.description}</p>

              <div className="grid gap-2 text-sm md:grid-cols-3">
                <span><strong>Deadline:</strong> {notification.request.deadline}</span>
                <span><strong>Request status:</strong> {notification.request.status}</span>
                <span><strong>Files:</strong> {notification.request.drawingUrls.length}</span>
              </div>

              {notification.request.drawingUrls.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {notification.request.drawingUrls.map((url, index) => (
                    <a
                      className="rounded-md border border-line px-3 py-2 text-xs font-bold text-brand hover:border-brand"
                      href={url}
                      key={url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Download drawing {index + 1}
                    </a>
                  ))}
                </div>
              ) : null}

              {notification.status === "Sent" ? (
                <form action={`/api/vendor/rfqs/${notification.id}/view`} method="post">
                  <Button type="submit" variant="secondary">Mark as Viewed</Button>
                </form>
              ) : null}

              <div>
                <Button href={`/vendor/rfqs/${notification.id}/quote`}>
                  {notification.status === "Quoted" ? "Submit Another Quote" : "Submit Quotation"}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {rfqs.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">No RFQs have been assigned to your vendor account yet.</p>
          </Card>
        ) : null}
      </div>
    </VendorLayout>
  );
}
