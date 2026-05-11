import Link from "next/link";
import { Clock3, ShieldCheck } from "lucide-react";
import { AuthBackground } from "@/components/ui/AuthBackground";

export default function VendorPendingPage() {
  return (
    <AuthBackground>
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.07] p-8 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-300/20">
          <Clock3 className="size-8" />
        </div>
        <h1 className="mt-6 text-3xl font-black text-white">Vendor account under review</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Your vendor account is under review by RKISPro admin team. You will be able to access RFQs and submit quotations after approval.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-left text-sm leading-6 text-slate-300">
          <div className="flex gap-2 font-semibold text-teal-300">
            <ShieldCheck className="mt-0.5 size-4" />
            Approval unlocks RFQs, quotations, invoices, milestones, and payout tracking.
          </div>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-teal-500 px-5 text-sm font-black text-white hover:bg-teal-400" href="/vendor/login">
            Go to vendor login
          </Link>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 px-5 text-sm font-bold text-white/80 hover:text-teal-300" href="/">
            Back to home
          </Link>
        </div>
      </div>
    </AuthBackground>
  );
}
