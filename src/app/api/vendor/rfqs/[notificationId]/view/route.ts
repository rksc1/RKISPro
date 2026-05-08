import { NextResponse, type NextRequest } from "next/server";
import { getVendorFromCookie } from "@/lib/auth";
import { createActivityLog } from "@/services/notification-service";
import { markVendorRfqViewed } from "@/services/vendor-notification-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  const vendor = await getVendorFromCookie();

  if (!vendor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notificationId } = await params;
  const vendorNotification = await markVendorRfqViewed(notificationId, vendor.id);
  if (vendorNotification) {
    await createActivityLog({
      actorRole: "vendor",
      actorId: vendor.id,
      entityType: "rfq",
      entityId: vendorNotification.requestId,
      action: "viewed",
      description: `${vendor.name} viewed an assigned RFQ.`
    });
  }

  return NextResponse.redirect(new URL("/vendor/rfqs", request.url), 303);
}
