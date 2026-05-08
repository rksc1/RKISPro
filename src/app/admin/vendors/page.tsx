import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getVendors } from "@/services/vendor-service";
import type { VendorStatus } from "@/types/auth";

export const dynamic = "force-dynamic";

export default async function AdminVendorsPage({
  searchParams
}: {
  searchParams: Promise<{ location?: string; services?: string; machinery?: string }>;
}) {
  const filters = await searchParams;
  const vendors = await getVendors(filters);

  return (
    <AdminLayout title="Vendor management">
      <Card>
        <form className="grid gap-4 md:grid-cols-4" action="/admin/vendors">
          <Input label="Location" name="location" defaultValue={filters.location ?? ""} />
          <Input label="Services" name="services" defaultValue={filters.services ?? ""} />
          <Input label="Machinery" name="machinery" defaultValue={filters.machinery ?? ""} />
          <div className="flex items-end">
            <Button type="submit" className="w-full">Filter</Button>
          </div>
        </form>
      </Card>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase text-muted">
                <th className="p-3">Vendor</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Capabilities</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr className="border-b border-line align-top" key={vendor.id}>
                  <td className="grid gap-1 p-3">
                    <strong>{vendor.companyName}</strong>
                    <span className="text-muted">{vendor.ownerName}</span>
                    <span className="text-muted">{vendor.location}</span>
                  </td>
                  <td className="grid gap-1 p-3">
                    <span>{vendor.email}</span>
                    <span className="text-muted">{vendor.phone}</span>
                    <span className="text-muted">{vendor.gstNumber}</span>
                  </td>
                  <td className="grid gap-1 p-3">
                    <span>{vendor.services}</span>
                    <span className="text-muted">{vendor.machinery}</span>
                    <span className="text-muted">{vendor.capacity}</span>
                  </td>
                  <td className="p-3"><StatusBadge status={vendor.status} /></td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {(["Approved", "Rejected", "Inactive", "Pending"] as VendorStatus[]).map((status) => (
                        <form action={`/api/admin/vendors/${vendor.id}/status`} method="post" key={status}>
                          <input type="hidden" name="status" value={status} />
                          <button className="rounded-md border border-line bg-white px-3 py-2 text-xs font-bold hover:border-brand" type="submit">
                            {status}
                          </button>
                        </form>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {vendors.length === 0 ? (
                <tr>
                  <td className="p-3 text-muted" colSpan={5}>No vendors found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
