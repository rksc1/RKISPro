import Link from "next/link";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ManagedRFQForm } from "@/components/ui/ManagedRFQForm";
import { Textarea } from "@/components/ui/Textarea";
import { Calculator, ChevronDown, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

function Section({ title, helper, children }: { title: string; helper: string; children: ReactNode }) {
  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{helper}</p>
      </div>
      <div className="grid gap-4">
        {children}
      </div>
    </section>
  );
}

export default async function NewCustomerRequestPage({
  searchParams
}: {
  searchParams?: Promise<{
    serviceType?: string;
    materialType?: string;
    quantity?: string;
    budgetRange?: string;
    description?: string;
    projectTitle?: string;
  }>;
}) {
  const params = searchParams ? await searchParams : {};
  const hasPreFilledBudget = Boolean(params.budgetRange || params.quantity);

  return (
    <CustomerLayout title="Post Requirement">
      <Card className="mx-auto max-w-3xl">
        {/* Estimator Integration Banner */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-teal-500/20 bg-teal-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-2xs">
              <Calculator className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-teal-900">
                <Sparkles className="size-3 text-teal-600" />
                Unsure about cost or timeline?
              </div>
              <p className="mt-0.5 text-xs text-teal-800">
                Calculate live material, fabrication, and CNC machining benchmarks before posting.
              </p>
            </div>
          </div>
          <Link
            href="/customer/estimator"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-teal-600 bg-white px-3.5 py-2 text-xs font-bold text-teal-700 shadow-2xs transition hover:bg-teal-50"
          >
            Launch Cost Estimator
          </Link>
        </div>

        <div className="mb-8 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
          <p className="text-sm font-semibold leading-6 text-slate-800">
            RKISPro engineers vet your requirement before distributing it to 3–5 matched, verified vendors.
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Fill in the core specifications below. Technical drawings (.dwg, .pdf) can be attached for precision quotations.
          </p>
        </div>

        <ManagedRFQForm>
          <div className="grid gap-8">
            <Section title="Core Requirements" helper="The essential details needed to find the right vendors.">
              <Input
                label="Project title"
                name="projectTitle"
                defaultValue={params.projectTitle || ""}
                placeholder="e.g. 500L SS Storage Tank / Machine Base Frame"
                required
              />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Service type"
                  name="serviceType"
                  defaultValue={params.serviceType || ""}
                  placeholder="e.g. Fabrication, CNC Machining, Lathe"
                  required
                />
                <Input
                  label="Material type"
                  name="materialType"
                  defaultValue={params.materialType || ""}
                  placeholder="e.g. Mild Steel (IS 2062), SS 304, Aluminum"
                  required
                />
              </div>

              <Textarea
                label="Description"
                name="description"
                defaultValue={params.description || ""}
                placeholder="Describe dimensions, intended application, welding requirements, or machining operations..."
                rows={4}
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Delivery location" name="location" placeholder="Plant location / City / Pincode" required />
                <Input label="Expected deadline" name="expectedDeadline" type="date" required />
              </div>
            </Section>

            <details className="group rounded-xl border border-slate-200 bg-slate-50/40" open={hasPreFilledBudget}>
              <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-slate-900 hover:bg-slate-100/50">
                <div className="flex items-center gap-2">
                  <span>Advanced Specifications & Budget (Optional)</span>
                  {hasPreFilledBudget && (
                    <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                      Estimate Applied
                    </span>
                  )}
                </div>
                <ChevronDown className="size-5 text-slate-400 transition-transform group-open:-rotate-180" />
              </summary>
              <div className="grid gap-6 border-t border-slate-200 bg-white p-4 sm:p-6 rounded-b-xl">
                <Input
                  label="Quantity"
                  name="quantity"
                  defaultValue={params.quantity || ""}
                  placeholder="e.g. 5 units / 1200 kg"
                />
                <Textarea label="Technical requirements" name="technicalRequirements" placeholder="Tolerances (e.g. ±0.1mm), sheet thickness, weld testing..." rows={3} />
                <Textarea label="Quality expectations" name="qualityExpectations" placeholder="Finishing, primer / epoxy coat, MTC certificate..." rows={3} />
                <Textarea label="Inspection requirement" name="inspectionRequirement" placeholder="Pre-dispatch inspection (PDI), 3rd party QA, hydrostatic test..." rows={2} />
                <Input
                  label="Budget range (Private from vendors)"
                  name="budgetRange"
                  defaultValue={params.budgetRange || ""}
                  placeholder="e.g. ₹50,000 - ₹1,00,000"
                />
                
                <div>
                  <Input
                    label="Drawings / Documents"
                    name="drawings"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf"
                    multiple
                  />
                  <p className="mt-1 text-xs text-slate-500">Attach CAD drawings (.dwg, .dxf), 3D models, or PDF specifications</p>
                </div>

                <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <input className="size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" name="gstRequirement" type="checkbox" value="true" defaultChecked />
                  GST tax invoice strictly required
                </label>
              </div>
            </details>
          </div>
        </ManagedRFQForm>
      </Card>
    </CustomerLayout>
  );
}
