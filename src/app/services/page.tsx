import { Header } from "@/components/ui/Header";
import { Card } from "@/components/ui/Card";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="page-shell grid gap-6 py-12">
        <h1 className="text-3xl font-bold">Industrial Services</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card><h2 className="font-bold">Managed RFQs</h2><p className="mt-2 text-sm text-muted">Structured industrial requirements for fabrication, machining, repair, and project work.</p></Card>
          <Card><h2 className="font-bold">Vendor shortlisting</h2><p className="mt-2 text-sm text-muted">GST, services, machinery, capacity, location, and approval-led vendor matching.</p></Card>
          <Card><h2 className="font-bold">Execution coordination</h2><p className="mt-2 text-sm text-muted">Review, shortlist, distribute, compare, award, track, and settle industrial work.</p></Card>
        </div>
      </main>
    </>
  );
}
