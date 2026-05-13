import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      {children}
    </section>
  );
}

export default function NewCustomerRequestPage() {
  return (
    <CustomerLayout title="Post Requirement">
      <Card className="max-w-4xl">
        <form className="grid gap-6" action="/api/customer/requests" method="post" encType="multipart/form-data">
          <p className="text-sm leading-6 text-muted">
            RKISPro reviews every requirement before sharing it with shortlisted vendors.
          </p>

          <Section title="1. Project Scope">
            <Input label="Project title" name="projectTitle" required />
            <Textarea label="Description" name="description" rows={5} required />
            <Input label="Service type" name="serviceType" required />
          </Section>

          <Section title="2. Technical Requirements">
            <Textarea label="Technical requirements" name="technicalRequirements" rows={4} />
          </Section>

          <Section title="3. Quantity & Material">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Material type" name="materialType" required />
              <Input label="Quantity" name="quantity" />
            </div>
          </Section>

          <Section title="4. Site Location">
            <Input label="Location" name="location" required />
          </Section>

          <Section title="5. Timeline Requirement">
            <Input label="Expected deadline" name="expectedDeadline" type="date" required />
          </Section>

          <Section title="6. Quality Expectations">
            <Textarea label="Quality expectations" name="qualityExpectations" rows={3} />
          </Section>

          <Section title="7. Drawings/Documents Upload">
            <Input
              label="Drawings / files"
              name="drawings"
              type="file"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf"
              multiple
            />
          </Section>

          <Section title="8. Budget Range Optional">
            <Input label="Budget range" name="budgetRange" placeholder="Optional" />
          </Section>

          <Section title="9. Inspection Requirement">
            <Textarea label="Inspection requirement" name="inspectionRequirement" rows={3} />
          </Section>

          <Section title="10. GST Requirement">
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input className="size-4 rounded border-line text-brand" name="gstRequirement" type="checkbox" value="true" />
              GST invoice required
            </label>
          </Section>

          <Button type="submit">Submit Industrial Requirement</Button>
        </form>
      </Card>
    </CustomerLayout>
  );
}
