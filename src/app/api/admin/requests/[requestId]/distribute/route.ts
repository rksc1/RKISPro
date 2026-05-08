import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import {
  getMarketplaceRequestById,
  updateMarketplaceRequestStatus
} from "@/services/marketplace-request-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { distributeRequestToVendors } from "@/services/vendor-notification-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  const admin = await getAdminFromCookie();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { requestId } = await params;
  const marketplaceRequest = await getMarketplaceRequestById(requestId);

  if (!marketplaceRequest) {
    return NextResponse.json({ error: "RFQ not found" }, { status: 404 });
  }

  if (marketplaceRequest.status !== "Approved" && marketplaceRequest.status !== "Distributed") {
    return NextResponse.json({ error: "Only approved RFQs can be distributed" }, { status: 400 });
  }

  const formData = await request.formData();
  const vendorIds = formData.getAll("vendorIds").map((vendorId) => String(vendorId));

  try {
    const vendorNotifications = await distributeRequestToVendors(requestId, vendorIds);
    await updateMarketplaceRequestStatus(requestId, "Distributed");
    await createNotifications(
      vendorNotifications.map((notification) => ({
        userRole: "vendor",
        userId: notification.vendorId,
        title: "New RFQ received",
        message: `RKISPro sent you "${marketplaceRequest.projectTitle}" for quotation.`,
        type: "info",
        link: "/vendor/rfqs"
      }))
    );
    await createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "rfq",
      entityId: requestId,
      action: "distributed",
      description: `${admin.name} distributed RFQ "${marketplaceRequest.projectTitle}" to ${vendorNotifications.length} vendor(s).`,
      metadata: { vendorIds: vendorNotifications.map((notification) => notification.vendorId) }
    });
    return NextResponse.redirect(new URL(`/admin/requests/${requestId}`, request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "RFQ distribution failed" }, { status: 400 });
  }
}
