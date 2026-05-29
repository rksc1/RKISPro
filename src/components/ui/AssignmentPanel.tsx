import { Button } from "@/components/ui/Button";
import type { VendorProfile } from "@/models/Vendor";
import { quickBookingStatuses } from "@/services/quick-booking-service";
import type { QuickBooking } from "@/models/QuickBooking";

export function AssignmentPanel({
  booking,
  vendors
}: {
  booking: QuickBooking;
  vendors: VendorProfile[];
}) {
  return (
    <form action={`/api/admin/quick-bookings/${booking.id}`} className="grid gap-4" method="post">
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        Status
        <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal" name="status" defaultValue={booking.status}>
          {quickBookingStatuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        Approved vendor
        <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal" name="assignedVendorId" defaultValue={booking.assignedVendorId ?? ""}>
          <option value="">No vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.vendorType === "individual" ? vendor.fullName ?? vendor.ownerName : vendor.companyName} - {vendor.city ?? vendor.location} ({vendor.vendorType})
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-ink">
          Worker name
          <input className="min-h-11 rounded-md border border-line px-3" name="assignedWorkerName" defaultValue={booking.assignedWorkerName ?? ""} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-ink">
          Worker phone
          <input className="min-h-11 rounded-md border border-line px-3" name="assignedWorkerPhone" defaultValue={booking.assignedWorkerPhone ?? ""} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        Admin notes
        <textarea className="min-h-24 rounded-md border border-line px-3 py-2" name="adminNotes" defaultValue={booking.adminNotes ?? ""} />
      </label>
      <Button type="submit">Update Dispatch</Button>
    </form>
  );
}
