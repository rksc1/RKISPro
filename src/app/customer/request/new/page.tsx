import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function NewCustomerRequestPage() {
  return (
    <CustomerLayout title="Create RFQ">
      <Card className="max-w-3xl">
        <form className="grid gap-4" action="/api/customer/requests" method="post" encType="multipart/form-data">
          <Input label="Project title" name="projectTitle" required />
          <Textarea label="Description" name="description" rows={5} required />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Service type" name="serviceType" required />
            <Input label="Material type" name="materialType" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Location" name="location" required />
            <Input label="Expected deadline" name="expectedDeadline" type="date" required />
          </div>
          <Input
            label="Drawings / files"
            name="drawings"
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf"
            multiple
          />
          <Button type="submit">Submit RFQ</Button>
        </form>
      </Card>
    </CustomerLayout>
  );
}
