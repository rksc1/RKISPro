import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ManagedRFQForm } from "@/components/ui/ManagedRFQForm";
import { Textarea } from "@/components/ui/Textarea";
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

export default function NewCustomerRequestPage() {
  return (
    <CustomerLayout title="Post Requirement">
      <Card className="max-w-4xl">
        <div className="mb-6 rounded-lg border border-brand/15 bg-brand/5 p-4">
          <p className="text-sm font-semibold leading-6 text-ink">
            RKISPro reviews every requirement before sharing it with shortlisted vendors.
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Add the details you have today. Optional fields help RKISPro match vendors more accurately.
          </p>
        </div>

        <ManagedRFQForm>
          <Section title="1. Project Scope" helper="Describe what needs to be fabricated, repaired, machined, installed, or coordinated.">
            <Input label="Project title" name="projectTitle" required />
            <Textarea label="Description" name="description" rows={5} required />
            <Input label="Service type" name="serviceType" required />
          </Section>

          <Section title="2. Technical Requirements" helper="Mention dimensions, tolerances, standards, process notes, or technical constraints if available.">
            <Textarea label="Technical requirements (optional)" name="technicalRequirements" rows={4} />
          </Section>

          <Section title="3. Quantity & Material" helper="Quantity and material details help vendors assess capacity and procurement needs.">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Material type" name="materialType" required />
              <Input label="Quantity (optional)" name="quantity" />
            </div>
          </Section>

          <Section title="4. Site Location" helper="Use workshop/site city or delivery location so nearby capability can be considered.">
            <Input label="Location" name="location" required />
          </Section>

          <Section title="5. Timeline Requirement" helper="Select the expected completion or delivery target.">
            <Input label="Expected deadline" name="expectedDeadline" type="date" required />
          </Section>

          <Section title="6. Quality Expectations" helper="Add inspection, finishing, test, tolerance, or acceptance expectations.">
            <Textarea label="Quality expectations (optional)" name="qualityExpectations" rows={3} />
          </Section>

          <Section title="7. Drawings/Documents Upload" helper="Upload drawings, photos, BOQs, spreadsheets, or technical notes if available.">
            <Input
              label="Drawings / files (optional)"
              name="drawings"
              type="file"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf"
              multiple
            />
          </Section>

          <Section title="8. Budget Range Optional" helper="Budget range is private intake context and is not used for public bidding.">
            <Input label="Budget range" name="budgetRange" placeholder="Optional" />
          </Section>

          <Section title="9. Inspection Requirement" helper="Mention site inspection, third-party inspection, sample approval, or dispatch checks.">
            <Textarea label="Inspection requirement (optional)" name="inspectionRequirement" rows={3} />
          </Section>

          <Section title="10. GST Requirement" helper="Tell RKISPro whether GST invoice support is required for this requirement.">
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input className="size-4 rounded border-line text-brand" name="gstRequirement" type="checkbox" value="true" />
              GST invoice required
            </label>
          </Section>
        </ManagedRFQForm>
      </Card>
    </CustomerLayout>
  );
}
