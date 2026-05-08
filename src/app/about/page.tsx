import { Header } from "@/components/ui/Header";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="page-shell py-12">
        <Card>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">About</p>
          <h1 className="mt-2 text-3xl font-bold">RKISPro organizes industrial sourcing before RFQ automation begins.</h1>
          <p className="mt-3 text-muted">This foundation separates customer, vendor, and admin portals with secure onboarding and approval workflows.</p>
        </Card>
      </main>
    </>
  );
}
