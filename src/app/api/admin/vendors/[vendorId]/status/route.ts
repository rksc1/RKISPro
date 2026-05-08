import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { updateVendorStatus } from "@/services/vendor-service";
import type { VendorStatus } from "@/types/auth";

function isVendorStatus(value: string): value is VendorStatus {
  return ["Pending", "Approved", "Rejected", "Inactive"].includes(value);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ vendorId: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");

  if (!isVendorStatus(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const { vendorId } = await params;
  await updateVendorStatus(vendorId, status);

  return NextResponse.redirect(new URL("/admin/vendors", request.url), 303);
}
