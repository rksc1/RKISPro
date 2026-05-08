import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { updateMarketplaceRequestStatus } from "@/services/marketplace-request-service";
import { createActivityLog, createNotification } from "@/services/notification-service";

type ReviewStatus = "Approved" | "Rejected";

function isReviewStatus(value: string): value is ReviewStatus {
  return value === "Approved" || value === "Rejected";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  const admin = await getAdminFromCookie();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");

  if (!isReviewStatus(status)) {
    return NextResponse.json({ error: "Invalid RFQ status" }, { status: 400 });
  }

  const { requestId } = await params;
  const marketplaceRequest = await updateMarketplaceRequestStatus(requestId, status);

  await createNotification({
    userRole: "customer",
    userId: marketplaceRequest.customerId,
    title: status === "Approved" ? "RFQ approved" : "RFQ rejected",
    message:
      status === "Approved"
        ? `Your RFQ "${marketplaceRequest.projectTitle}" has been approved by RKISPro.`
        : `Your RFQ "${marketplaceRequest.projectTitle}" was rejected by RKISPro admin.`,
    type: status === "Approved" ? "success" : "warning",
    link: "/customer/dashboard#requests"
  });
  await createActivityLog({
    actorRole: "admin",
    actorId: admin.id,
    entityType: "rfq",
    entityId: marketplaceRequest.id,
    action: status.toLowerCase(),
    description: `${admin.name} marked RFQ "${marketplaceRequest.projectTitle}" as ${status}.`
  });

  return NextResponse.redirect(new URL("/admin/requests", request.url), 303);
}
