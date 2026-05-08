import { notFound } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorNotificationById } from "@/services/vendor-notification-service";

export const dynamic = "force-dynamic";

export default async function VendorQuotePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, vendor] = await Promise.all([params, getVendorFromCookie()]);
  const notification = vendor ? await getVendorNotificationById(id, vendor.id) : null;

  if (!notification) notFound();

  return (
    <VendorLayout title="Submit quotation">
      <Card className="max-w-2xl">
        <form className="grid gap-4" action={`/api/vendor/rfqs/${notification.id}/quote`} method="post" encType="multipart/form-data">
          <Input label="Amount" name="amount" type="number" min={0} step="0.01" required />
          <Input label="Timeline" name="timeline" placeholder="Example: 15 working days" required />
          <Textarea label="Notes" name="notes" rows={5} required />
          <Input
            label="Attachment"
            name="attachment"
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          />
          <Button type="submit">Submit Quotation</Button>
        </form>
      </Card>
    </VendorLayout>
  );
}
