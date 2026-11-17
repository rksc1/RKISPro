import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { IndustrialCostEstimator } from "@/components/ui/IndustrialCostEstimator";
import { getCustomerFromCookie } from "@/lib/auth";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerEstimatorPage() {
  const customer = await getCustomerFromCookie();
  if (!customer) return null;

  return (
    <CustomerLayout title="Cost & Lead-Time Estimator">
      <div className="grid gap-6">
        {/* Interactive Estimator Widget */}
        <IndustrialCostEstimator />

        {/* Estimation Guide & FAQ Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900">Escrow Price Lock</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                When a contractor quote is accepted, your mobilization advance is held in our nodal escrow account and only released as milestones pass your inspection sign-off.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <CheckCircle2 className="size-4" />
              Zero Financial Risk
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Zap className="size-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900">3–5 Competitive Bids</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                RKISPro engineers distribute your requirement to 3–5 pre-screened local contractors with audited machinery, ensuring competitive market pricing.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <CheckCircle2 className="size-4" />
              24-Hour Turnaround Target
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900">What Influences Final Quotes?</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Drawing tolerances, MTC (Mill Test Certificate) requirements, surface painting thickness (DFT), and delivery transport impact the vendor&apos;s formal quote.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <CheckCircle2 className="size-4" />
              Transparent Bill of Materials
            </div>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
