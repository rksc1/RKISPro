import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { QuickBookingForm } from "@/components/ui/QuickBookingForm";

export default function NewQuickBookingPage() {
  return (
    <CustomerLayout title="New Quick Booking">
      <Card className="max-w-3xl">
        <QuickBookingForm />
      </Card>
    </CustomerLayout>
  );
}
