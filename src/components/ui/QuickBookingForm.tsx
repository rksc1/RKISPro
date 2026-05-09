import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { quickBookingServiceTypes, quickBookingUrgencies } from "@/services/quick-booking-service";

export function QuickBookingForm() {
  return (
    <form action="/api/customer/quick-bookings" className="grid gap-4" encType="multipart/form-data" method="post">
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        Service type
        <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand" name="serviceType" required>
          {quickBookingServiceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <Input label="Job title" name="title" required />
      <Textarea label="Description" name="description" rows={5} />
      <Input label="Location" name="location" required />
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Preferred date" name="preferredDate" type="date" />
        <Input label="Preferred time" name="preferredTime" />
        <label className="grid gap-1.5 text-sm font-semibold text-ink">
          Urgency
          <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand" name="urgency">
            {quickBookingUrgencies.map((urgency) => <option key={urgency} value={urgency}>{urgency}</option>)}
          </select>
        </label>
      </div>
      <Input label="Budget" name="budget" min="0" type="number" />
      <Input label="Images" name="images" type="file" accept="image/*" multiple />
      <Button type="submit">Create Quick Booking</Button>
    </form>
  );
}
