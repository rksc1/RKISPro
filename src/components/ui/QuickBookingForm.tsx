import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  formatQuickBookingServiceType,
  quickBookingServiceGroups,
  quickBookingUrgencies
} from "@/services/quick-booking-service";
import type { ReactNode } from "react";

function Section({ title, helper, children }: { title: string; helper: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 rounded-lg border border-line bg-canvas p-4 sm:p-5">
      <div>
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{helper}</p>
      </div>
      {children}
    </section>
  );
}

export function QuickBookingForm() {
  return (
    <form action="/api/customer/quick-bookings" className="grid gap-5" encType="multipart/form-data" method="post">
      <div className="rounded-lg border border-brand/15 bg-brand/5 p-4 text-sm leading-6 text-ink">
        Use Quick Booking for urgent site visits, breakdowns, repair work, installation support, and small service jobs. Use Managed RFQ for fabrication, drawings, project work, bulk requirements, and structured quotations.
      </div>

      <Section title="Service Needed" helper="Choose the closest service category so RKISPro can route the visit to the right technician or vendor.">
        <label className="grid gap-1.5 text-sm font-semibold text-ink">
          Service type
          <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand" name="serviceType" required>
            {quickBookingServiceGroups.map((group) => (
              <optgroup label={group.label} key={group.label}>
                {group.options.map((type) => <option key={type} value={type}>{formatQuickBookingServiceType(type)}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <Input label="Service visit title" name="title" placeholder="Example: AC not cooling in production office" required />
      </Section>

      <Section title="Site / Visit Location" helper="Add the site, workshop, plant, or office location where the service visit is needed.">
        <Input label="Location" name="location" required />
        <Textarea label="Site access notes (optional)" name="siteAccessNotes" rows={3} placeholder="Gate instructions, floor, machine bay, security entry, parking, or access timing" />
      </Section>

      <Section title="Urgency & Preferred Time" helper="Urgency helps RKISPro dispatch and follow up appropriately.">
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
        <Input label="Issue started at (optional)" name="issueStartedAt" placeholder="Example: Today morning, 2 days ago, after power trip" />
      </Section>

      <Section title="Problem Details" helper="Explain the fault, breakdown, installation need, or repair work clearly enough for dispatch.">
        <Input label="Machine / equipment (optional)" name="machineOrEquipment" placeholder="Example: 5TR AC, CNC VMC, compressor, motor panel" />
        <Textarea label="Problem description" name="description" rows={5} />
        <Textarea label="Safety requirements (optional)" name="safetyRequirements" rows={3} placeholder="PPE, shutdown requirement, height work, hot work permit, electrical isolation" />
      </Section>

      <Section title="Photos / Reference Images" helper="Photos help admins and vendors understand the issue before dispatch.">
        <Input label="Images (optional)" name="images" type="file" accept="image/*" multiple />
      </Section>

      <Section title="Budget Optional" helper="Budget is only planning context for RKISPro coordination, not public bidding.">
        <Input label="Budget" name="budget" min="0" type="number" />
      </Section>

      <Section title="Contact Readiness" helper="Add the person available at site if different from the account contact.">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Site contact name (optional)" name="contactName" />
          <Input label="Site contact phone (optional)" name="contactPhone" />
        </div>
      </Section>

      <Button type="submit">Book Service Visit</Button>
    </form>
  );
}
