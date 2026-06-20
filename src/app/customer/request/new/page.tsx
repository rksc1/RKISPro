import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ManagedRFQForm } from "@/components/ui/ManagedRFQForm";
import { Textarea } from "@/components/ui/Textarea";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

function Section({ title, helper, children }: { title: string; helper: string; children: ReactNode }) {
  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{helper}</p>
      </div>
      <div className="grid gap-4">
        {children}
      </div>
    </section>
  );
}

export default function NewCustomerRequestPage() {
  return (
    <CustomerLayout title="Post Requirement">
      <Card className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-lg border border-brand/15 bg-brand/5 p-4">
          <p className="text-sm font-semibold leading-6 text-ink">
            RKISPro reviews every requirement before sharing it with shortlisted vendors.
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Add the core details to get started quickly. Optional technical specs can be added below.
          </p>
        </div>

        <ManagedRFQForm>
          <div className="grid gap-8">
            <Section title="Core Requirements" helper="The essential details needed to find the right vendors.">
              <Input label="Project title" name="projectTitle" placeholder="e.g. 500L SS Storage Tank" required />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Service type" name="serviceType" placeholder="e.g. Fabrication, Machining" required />
                <Input label="Material type" name="materialType" placeholder="e.g. SS 304, Mild Steel" required />
              </div>

              <Textarea label="Description" name="description" placeholder="Describe what needs to be made or repaired..." rows={4} required />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Delivery location" name="location" placeholder="City or Pincode" required />
                <Input label="Expected deadline" name="expectedDeadline" type="date" required />
              </div>
            </Section>

            <details className="group rounded-lg border border-line bg-slate-50/50">
              <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-slate-950 hover:bg-slate-50">
                <span>Advanced Specifications (Optional)</span>
                <ChevronDown className="size-5 text-muted transition-transform group-open:-rotate-180" />
              </summary>
              <div className="grid gap-6 border-t border-line bg-canvas p-4 sm:p-6">
                <Input label="Quantity" name="quantity" placeholder="e.g. 5 units" />
                <Textarea label="Technical requirements" name="technicalRequirements" placeholder="Dimensions, tolerances, process notes..." rows={3} />
                <Textarea label="Quality expectations" name="qualityExpectations" placeholder="Testing, finishing, or acceptance criteria..." rows={3} />
                <Textarea label="Inspection requirement" name="inspectionRequirement" placeholder="Site inspection, 3rd party checks..." rows={2} />
                <Input label="Budget range" name="budgetRange" placeholder="e.g. ₹50,000 - ₹1,00,000 (Kept private from vendors)" />
                
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-950">Drawings / Documents</label>
                  <Input
                    name="drawings"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf"
                    multiple
                  />
                  <p className="mt-1 text-xs text-muted">Upload .dwg, .pdf, or images</p>
                </div>

                <label className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <input className="size-4 rounded border-line text-brand" name="gstRequirement" type="checkbox" value="true" />
                  GST invoice strictly required
                </label>
              </div>
            </details>
          </div>
        </ManagedRFQForm>
      </Card>
    </CustomerLayout>
  );
}
