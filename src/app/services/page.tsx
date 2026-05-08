import { Header } from "@/components/ui/Header";
import { Card } from "@/components/ui/Card";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="page-shell grid gap-6 py-12">
        <h1 className="text-3xl font-bold">Services</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card><h2 className="font-bold">Customer onboarding</h2><p className="mt-2 text-sm text-muted">Company profiles ready for future requirement submission.</p></Card>
          <Card><h2 className="font-bold">Vendor onboarding</h2><p className="mt-2 text-sm text-muted">GST, services, machinery, capacity, and approval management.</p></Card>
          <Card><h2 className="font-bold">Admin operations</h2><p className="mt-2 text-sm text-muted">Vendor review, filters, and marketplace oversight dashboards.</p></Card>
        </div>
      </main>
    </>
  );
}
