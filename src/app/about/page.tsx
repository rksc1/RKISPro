import { Header } from "@/components/ui/Header";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="page-shell py-12">
        <div id="how-it-works">
          <Card>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">How It Works</p>
          <h1 className="mt-2 text-3xl font-bold">RKISPro coordinates industrial RFQs from intake to execution tracking.</h1>
          <p className="mt-3 text-muted">Customers submit requirements, RKISPro reviews scope, shortlisted vendors provide structured quotations, and awarded work moves into tracked execution.</p>
          </Card>
        </div>
        <div id="verification" className="mt-6">
          <Card>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Trust & Verification</p>
            <h2 className="mt-2 text-2xl font-bold">Verified Vendor Network</h2>
            <p className="mt-3 text-muted">Vendor approval uses GST/PAN support, workshop details, category review, machinery/capacity checks, and admin coordination before RFQ distribution.</p>
          </Card>
        </div>
      </main>
    </>
  );
}
