import Link from "next/link";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ManagedRFQForm } from "@/components/ui/ManagedRFQForm";
import { Textarea } from "@/components/ui/Textarea";
import { Calculator, Camera, ChevronDown, MessageSquare, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import type { ReactNode } from "react";

function Section({ title, helper, children }: { title: string; helper: string; children: ReactNode }) {
  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-xs sm:text-sm text-slate-500">{helper}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

export default async function NewCustomerRequestPage({
  searchParams,
}: {
  searchParams?: Promise<{
    serviceType?: string;
    materialType?: string;
    quantity?: string;
    budgetRange?: string;
    description?: string;
    projectTitle?: string;
    category?: string;
  }>;
}) {
  const params = searchParams ? await searchParams : {};
  const hasPreFilledBudget = Boolean(params.budgetRange || params.quantity);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  return (
    <CustomerLayout title="Post Metal Work Requirement">
      <Card className="mx-auto max-w-3xl">
        {/* Quick Helper Banner */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-teal-500/25 bg-teal-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
              <Camera className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-teal-900">
                <Sparkles className="size-3 text-teal-600" />
                Hand-Drawn Sketches &amp; Mobile Photos Accepted
              </div>
              <p className="mt-0.5 text-xs text-teal-800">
                No CAD drawings? Just snap a photo of your sketch or an existing part. We connect you with verified local workshops.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%20RKISPro%2C%20I%20have%20a%20metal%20fabrication%20requirement%20and%20want%20a%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <MessageSquare className="size-3.5" />
            <span>Send on WhatsApp</span>
          </a>
        </div>

        <ManagedRFQForm>
          <div className="grid gap-8">
            <Section
              title="1. What Do You Need Fabricated?"
              helper="Tell us what you want to make. Plain language is completely fine!"
            >
              <Input
                label="What are you making? (Title)"
                name="projectTitle"
                defaultValue={params.projectTitle || ""}
                placeholder="e.g. Iron Main Gate / SS Balcony Railing / Factory Roof Shed / Storage Trolley"
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Category of Work"
                  name="serviceType"
                  defaultValue={params.serviceType || "Fabrication"}
                  placeholder="e.g. Home Gate, Railing, Shed, Machining, Welding"
                  required
                />
                <Input
                  label="Metal Type (if known)"
                  name="materialType"
                  defaultValue={params.materialType || "Mild Steel (Iron)"}
                  placeholder="e.g. Mild Steel (Iron), Stainless Steel (SS), Aluminum"
                  required
                />
              </div>

              <Textarea
                label="Description & Rough Dimensions"
                name="description"
                defaultValue={params.description || ""}
                placeholder="Describe approx height, length, design style, or intended use. (e.g., 10ft wide sliding gate with wooden finish inserts, or 50ft of SS staircase railing)..."
                rows={4}
                required
              />

              {/* Front and Center File Upload */}
              <div className="rounded-2xl border-2 border-dashed border-teal-500/40 bg-teal-50/30 p-5 text-center">
                <UploadCloud className="mx-auto size-8 text-teal-600 mb-2" />
                <p className="text-sm font-bold text-slate-800">
                  Upload Photos, Sketches or Drawings
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Attach photos taken with your mobile, hand-drawn paper sketches, PDFs, or CAD files (.jpg, .png, .pdf, .dwg)
                </p>
                <div className="mt-3 max-w-sm mx-auto">
                  <Input
                    label="Choose Files or Photos"
                    name="drawings"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.step,.stp"
                    multiple
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Your City / Area / Pincode"
                  name="location"
                  placeholder="e.g. Bilaspur / Raipur / Pune MIDC"
                  required
                />
                <Input label="Expected Completion Date" name="expectedDeadline" type="date" required />
              </div>
            </Section>

            {/* Optional Advanced Details */}
            <details className="group rounded-xl border border-slate-200 bg-slate-50/40" open={hasPreFilledBudget}>
              <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-slate-900 hover:bg-slate-100/50">
                <div className="flex items-center gap-2">
                  <span>Additional Details &amp; Budget (Optional)</span>
                  {hasPreFilledBudget && (
                    <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                      Estimate Attached
                    </span>
                  )}
                </div>
                <ChevronDown className="size-5 text-slate-400 transition-transform group-open:-rotate-180" />
              </summary>
              <div className="grid gap-5 border-t border-slate-200 bg-white p-4 sm:p-6 rounded-b-xl">
                <Input
                  label="Quantity / Number of Pieces"
                  name="quantity"
                  defaultValue={params.quantity || ""}
                  placeholder="e.g. 1 Unit / 10 Units / 50 sq.ft"
                />
                <Input
                  label="Approximate Budget (Optional)"
                  name="budgetRange"
                  defaultValue={params.budgetRange || ""}
                  placeholder="e.g. ₹20,000 – ₹50,000"
                />
                <Textarea
                  label="Paint / Finishing or Quality Details"
                  name="qualityExpectations"
                  placeholder="e.g. Red oxide primer + black enamel paint, or mirror polish for SS..."
                  rows={2}
                />
                <Textarea
                  label="Special Requirements (Optional)"
                  name="technicalRequirements"
                  placeholder="e.g. Need on-site installation, welding at my shop/house..."
                  rows={2}
                />
                <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <input
                    className="size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    name="gstRequirement"
                    type="checkbox"
                    value="true"
                  />
                  GST tax invoice required (check if purchasing for a business)
                </label>
              </div>
            </details>

            {/* Safe trust banner */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
              <ShieldCheck className="size-5 shrink-0 text-teal-600" />
              <span>
                <strong>Your Contact Information is Safe.</strong> Only 2–3 verified local fabricators matching your specific work and city are contacted. No spam calls.
              </span>
            </div>
          </div>
        </ManagedRFQForm>
      </Card>
    </CustomerLayout>
  );
}
