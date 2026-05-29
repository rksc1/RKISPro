import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { QuickBookingForm } from "@/components/ui/QuickBookingForm";

export default function NewQuickBookingPage() {
  return (
    <CustomerLayout title="Book Service Visit">
      <Card className="max-w-4xl">
        <QuickBookingForm />
      </Card>
    </CustomerLayout>
  );
}
