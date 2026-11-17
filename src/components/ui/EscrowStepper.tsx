import { CheckCircle2, Clock, Lock, ShieldCheck } from "lucide-react";
import type { ProjectStatus } from "@/types/auth";

type StepStatus = "complete" | "current" | "upcoming";

type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
};

export function EscrowStepper({
  status,
  hasProformaInvoice,
  advancePaid,
  completedMilestones,
  totalMilestones
}: {
  status: ProjectStatus;
  hasProformaInvoice: boolean;
  advancePaid: boolean;
  completedMilestones: number;
  totalMilestones: number;
}) {
  const isAwarded = status === "awarded";
  const isInProgress = status === "in_progress";
  const isCompleted = status === "completed";

  const steps: Step[] = [
    {
      id: "bid_accepted",
      title: "1. Bid Accepted",
      description: hasProformaInvoice ? "Vendor PI Submitted" : "Awaiting Vendor Proforma Invoice",
      status: isAwarded && !hasProformaInvoice ? "current" : "complete"
    },
    {
      id: "escrow_deposit",
      title: "2. Mobilization Escrow",
      description: advancePaid ? "Advance Secured in Escrow" : "Awaiting Advance Clearance",
      status: advancePaid ? "complete" : isAwarded && hasProformaInvoice ? "current" : isAwarded ? "upcoming" : "complete"
    },
    {
      id: "execution",
      title: "3. Fabrication & Execution",
      description: isInProgress ? "Work Active on Shop Floor" : isCompleted ? "Completed" : "Awaiting Advance",
      status: isCompleted ? "complete" : isInProgress ? "current" : "upcoming"
    },
    {
      id: "milestones",
      title: "4. Quality Inspection",
      description: totalMilestones > 0 ? `${completedMilestones}/${totalMilestones} Milestones Approved` : "Milestone verification",
      status: isCompleted ? "complete" : totalMilestones > 0 && completedMilestones === totalMilestones ? "complete" : isInProgress ? "current" : "upcoming"
    },
    {
      id: "handover",
      title: "5. Handover & Payout",
      description: isCompleted ? "Delivered & Funds Settled" : "Final Release Post-Inspection",
      status: isCompleted ? "complete" : "upcoming"
    }
  ];

  return (
    <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-500/[0.04] to-transparent p-5 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
            <ShieldCheck className="size-4" />
          </div>
          <h2 className="text-base font-bold text-slate-900">RKISPro Escrow Protection Lifecycle</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
          <Lock className="size-3.5 text-teal-600" />
          Funds protected in nodal escrow account
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-5">
        {steps.map((step) => {
          const isComplete = step.status === "complete";
          const isCurrent = step.status === "current";

          return (
            <div
              key={step.id}
              className={`relative rounded-xl border p-3.5 transition-all ${
                isComplete
                  ? "border-teal-500/30 bg-teal-50/50 text-teal-950"
                  : isCurrent
                  ? "border-teal-600 bg-white ring-2 ring-teal-600/20 shadow-sm text-slate-900"
                  : "border-slate-200 bg-slate-50/40 text-slate-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle2 className="size-4 shrink-0 text-teal-600" />
                ) : isCurrent ? (
                  <Clock className="size-4 shrink-0 text-amber-600 animate-pulse" />
                ) : (
                  <span className="size-2 rounded-full bg-slate-300" />
                )}
                <h3 className="text-xs font-bold leading-tight">{step.title}</h3>
              </div>
              <p
                className={`mt-1.5 text-[11px] leading-tight ${
                  isCurrent ? "font-semibold text-teal-900" : isComplete ? "text-teal-800" : "text-slate-400"
                }`}
              >
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
