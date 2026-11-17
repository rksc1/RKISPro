import Link from "next/link";
import { redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuickBookingCard } from "@/components/ui/QuickBookingCard";
import { WhatsAppQuickAction } from "@/components/ui/WhatsAppQuickAction";
import { getCustomerFromCookie } from "@/lib/auth";
import { getQuickBookingForRole } from "@/services/quick-booking-service";
import { ArrowLeft, CheckCircle2, Clock, UserCheck } from "lucide-react";

export default async function CustomerQuickBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const booking = await getQuickBookingForRole({ bookingId: id, role: "customer", userId: customer.id });
  if (!booking) redirect("/customer/quick-bookings");

  const technicianPhone = booking.assignedWorkerPhone || booking.vendor?.phone;
  const technicianName = booking.assignedWorkerName || booking.vendor?.ownerName || booking.vendor?.companyName;

  const timelineSteps = [
    { id: "pending", label: "Request Registered", desc: "Awaiting dispatch review" },
    { id: "assigned", label: "Technician Dispatched", desc: "Assigned to vetted contractor" },
    { id: "accepted", label: "Confirmed by Contractor", desc: "Arrival time coordinated" },
    { id: "in_progress", label: "On-Site Work Active", desc: "Diagnostic or repair in progress" },
    { id: "completed", label: "Visit Completed", desc: "Work signed off" }
  ];

  const currentStepIdx = timelineSteps.findIndex((s) => s.id === booking.status);

  return (
    <CustomerLayout title="Service Visit Details">
      <div className="grid gap-6">
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/customer/quick-bookings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition"
          >
            <ArrowLeft className="size-4" />
            <span>Back to My Service Bookings</span>
          </Link>
        </div>

        <QuickBookingCard
          booking={booking}
          viewerRole="customer"
          footer={booking.status === "pending" ? (
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <form action={`/api/customer/quick-bookings/${booking.id}/cancel`} method="post">
                <Button type="submit" variant="danger" className="text-xs">
                  Cancel Booking
                </Button>
              </form>
            </div>
          ) : null}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Dispatch Assignment & Field Communication */}
          <Card>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
                <UserCheck className="size-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Technician Dispatch & Communication</h2>
            </div>

            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 text-xs">Contractor Company</span>
                <span className="font-semibold text-slate-900">{booking.vendor?.companyName ?? "Under Dispatching"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 text-xs">Assigned Technician</span>
                <span className="font-semibold text-slate-900">{technicianName ?? "Matching nearest technician"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 text-xs">Technician Contact</span>
                <span className="font-semibold text-slate-900">{technicianPhone ?? "Will appear upon assignment"}</span>
              </div>
              {booking.adminNotes && (
                <div className="py-1.5">
                  <span className="text-slate-500 text-xs block mb-1">Dispatch Coordinator Notes:</span>
                  <p className="rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700">{booking.adminNotes}</p>
                </div>
              )}
            </div>

            {/* Instant Communication Actions */}
            {technicianPhone ? (
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 p-4">
                <span className="text-xs font-bold text-emerald-950 block mb-1">
                  Direct Field Communication:
                </span>
                <p className="text-xs text-emerald-800 mb-3 leading-relaxed">
                  Call or WhatsApp the technician directly to confirm plant entry gate pass, exact timing, or machine status.
                </p>
                <WhatsAppQuickAction
                  phone={technicianPhone}
                  recipientName={technicianName}
                  bookingTitle={booking.title}
                  bookingId={booking.id}
                  location={booking.location}
                  role="customer"
                />
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-500">
                <Clock className="size-4 text-teal-600 inline mr-1.5" />
                Our dispatch desk is assigning the closest verified specialist in your cluster. Direct contact details will appear here as soon as assigned.
              </div>
            )}
          </Card>

          {/* Visit Lifecycle Stepper */}
          <Card>
            <h2 className="text-base font-bold text-slate-900">Visit Status & Response SLA</h2>
            <div className="mt-4 grid gap-2.5">
              {timelineSteps.map((step, idx) => {
                const isPassed = currentStepIdx >= idx;
                const isCurrent = booking.status === step.id;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between rounded-xl border p-3 transition ${
                      isCurrent
                        ? "border-teal-600 bg-teal-50/40 text-slate-900 ring-1 ring-teal-600/30 font-bold"
                        : isPassed
                        ? "border-slate-200 bg-slate-50/70 text-slate-800"
                        : "border-slate-100 bg-white text-slate-400 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                          isPassed ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold block">{step.label}</span>
                        <span className="text-[11px] font-normal text-slate-500">{step.desc}</span>
                      </div>
                    </div>
                    {isPassed && <CheckCircle2 className="size-4 text-teal-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Uploaded Photos */}
        {booking.images.length > 0 && (
          <Card>
            <h2 className="text-base font-bold text-slate-900">Machine & Problem Photos ({booking.images.length})</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {booking.images.map((image, i) => (
                <a
                  key={image}
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  className="group block aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Breakdown snap ${i + 1}`}
                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
}
