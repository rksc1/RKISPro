import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ServiceModeCard } from "@/components/ui/ServiceModeCard";
import { formatStatus, normalizeStatus } from "@/lib/status";
import { getCustomerFromCookie } from "@/lib/auth";
import { getCustomerById } from "@/services/customer-service";
import { getCustomerMarketplaceRequests } from "@/services/marketplace-request-service";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  const session = await getCustomerFromCookie();
  const [customer, requests] = session
    ? await Promise.all([getCustomerById(session.id), getCustomerMarketplaceRequests(session.id)])
    : [null, []];

  const countByStatus = (statuses: string[]) => requests.filter((request) => statuses.includes(normalizeStatus(request.status))).length;
  const summaryCards = [
    { label: "RFQs Under Review", value: countByStatus(["pending"]), note: "Requirements awaiting RKISPro review" },
    { label: "Vendors Shortlisted", value: countByStatus(["distributed"]), note: "RFQs shared with selected vendors" },
    { label: "Quotes Awaiting Review", value: countByStatus(["approved", "distributed"]), note: "Structured quotations in progress" },
    { label: "Awarded Projects", value: countByStatus(["awarded"]), note: "RFQs converted into projects" },
    { label: "Ongoing Projects", value: countByStatus(["awarded"]), note: "Track execution and milestones" },
    { label: "Pending Payments", value: 0, note: "Payment visibility appears after award" }
  ];

  return (
    <CustomerLayout title="Procurement pipeline">
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <span className="text-sm font-semibold text-muted">{card.label}</span>
            <strong className="mt-2 block text-3xl text-slate-950">{card.value}</strong>
            <p className="mt-2 text-sm text-muted">{card.note}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ServiceModeCard
          icon="QB"
          title="Quick Booking"
          subtitle="For urgent same-day field work such as repair visits, installers, and maintenance helpers."
          examples={["Welding repair", "Machine breakdown", "Installer visit", "Maintenance helper"]}
          cta="Book Now"
          href="/customer/quick-booking/new"
        />
        <ServiceModeCard
          icon="RFQ"
          title="Managed RFQ"
          subtitle="For fabrication, drawings, technical work, project value, and multiple structured quotations."
          examples={["Fabrication project", "CNC machining", "Shed construction", "Heavy fabrication"]}
          cta="Post Requirement"
          href="/customer/request/new"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-xl font-bold">Profile</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <span><strong>Name:</strong> {customer?.name}</span>
            <span><strong>Company:</strong> {customer?.companyName}</span>
            <span><strong>Email:</strong> {customer?.email}</span>
            <span><strong>Phone:</strong> {customer?.phone}</span>
            <span><strong>Location:</strong> {customer?.location}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="requests" className="text-xl font-bold">Managed RFQs</h2>
            <Button href="/customer/request/new">New Managed RFQ</Button>
          </div>
          <div className="mt-4 grid gap-3">
            {requests.map((request) => (
              <div className="rounded-md border border-line p-4" key={request.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{request.projectTitle}</h3>
                    <p className="mt-1 text-sm text-muted">{request.serviceType} | {request.materialType}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                    {formatStatus(request.status)}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted">{request.description}</p>
                <div className="mt-3 grid gap-1 text-sm text-muted">
                  <span>Location: {request.location}</span>
                  <span>Deadline: {request.deadline}</span>
                  <span>Files: {request.drawingUrls.length}</span>
                </div>
                <div className="mt-4">
                  <Button href={`/customer/requests/${request.id}/quotes`} variant="secondary">
                    Compare Structured Quotations
                  </Button>
                </div>
              </div>
            ))}
            {requests.length === 0 ? (
              <p className="text-sm text-muted">No managed RFQs submitted yet.</p>
            ) : null}
          </div>
        </Card>
      </div>
    </CustomerLayout>
  );
}
