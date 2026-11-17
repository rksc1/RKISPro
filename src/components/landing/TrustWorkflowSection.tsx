import {
  FileCheck2,
  Building2,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Layers,
  FileSpreadsheet,
  Truck,
} from "lucide-react";

const trustItems = [
  {
    title: "CBIC GST E-Invoicing & ITC",
    body: "Pre-validated GSTINs and automated SAC 9988 tax invoices ensuring 100% input tax credit compliance for enterprise accounting.",
    icon: FileSpreadsheet,
  },
  {
    title: "Physical Shop-Floor Audits",
    body: "On-site visits verify machine makes, axis travels, crane tonnage, and continuous power backup before any workshop receives drawings.",
    icon: Building2,
  },
  {
    title: "CAD & Technical Drawing Vault",
    body: "Encrypted STEP, DWG, and DXF storage. Proprietary engineering designs are protected and shared strictly with vetted bidders under NDA.",
    icon: Lock,
  },
  {
    title: "Milestone Nodal Escrow",
    body: "Your funds sit securely in escrow. Tranches are disbursed only after you verify dimensional inspection and milestone test certificates.",
    icon: ShieldCheck,
  },
  {
    title: "NABL Mill Test Certificates (MTC)",
    body: "Primary steel traceability (Tata/SAIL/Jindal) with EN 10204 3.1 chemical and mechanical inspection verified before production begins.",
    icon: FileCheck2,
  },
  {
    title: "4-Gate Quality Control Protocol",
    body: "Stage-gate sign-offs: Raw Material MTC → Dimensional Tolerance Check → Weld Structural NDT → Final Surface Finish DFT.",
    icon: CheckCircle2,
  },
  {
    title: "Assigned Industrial Operations Lead",
    body: "Every work order is assigned an RKISPro manufacturing engineer who coordinates clarifications, expedites tooling, and oversees delivery.",
    icon: Layers,
  },
  {
    title: "One-Tap WhatsApp Dispatch Updates",
    body: "Real-time dispatch notifications with transport Lorry Receipt (LR) tracking, gate pass verification, and delivery vehicle numbers.",
    icon: Truck,
  },
];

export function TrustWorkflowSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="page-shell grid gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-teal-600" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
              Enterprise Trust Infrastructure
            </p>
          </div>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Engineered for Accountability at Every Stage
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            From CAD drawing receipt to plant gate delivery, RKISPro embeds institutional risk controls so you never have to chase contractors or worry about rejected scrap.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-500/40 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-3.5 font-bold text-slate-900 text-sm sm:text-base">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
