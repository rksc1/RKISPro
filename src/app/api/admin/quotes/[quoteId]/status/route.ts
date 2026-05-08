import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createActivityLog, createNotification } from "@/services/notification-service";
import { getVendorQuoteWithRequest, updateVendorQuoteReview } from "@/services/vendor-quote-service";

function isReviewStatus(value: string): value is "approved" | "rejected" {
  return value === "approved" || value === "rejected";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ quoteId: string }> }
) {
  const admin = await getAdminFromCookie();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");

  if (!isReviewStatus(status)) {
    return NextResponse.json({ error: "Invalid quote status" }, { status: 400 });
  }

  const { quoteId } = await params;
  const reviewedQuote = await updateVendorQuoteReview({
    quoteId,
    status,
    adminId: admin.id,
    adminNotes: String(formData.get("adminNotes") ?? "").trim()
  });
  const quoteWithRequest = await getVendorQuoteWithRequest(quoteId);

  if (status === "approved" && quoteWithRequest?.request?.customerId) {
    await createNotification({
      userRole: "customer",
      userId: quoteWithRequest.request.customerId,
      title: "Quote approved for comparison",
      message: `A verified quote is ready for "${quoteWithRequest.request.projectTitle}".`,
      type: "success",
      link: `/customer/requests/${reviewedQuote.requestId}/quotes`
    });
  }

  if (status === "rejected") {
    await createNotification({
      userRole: "vendor",
      userId: reviewedQuote.vendorId,
      title: "Quote rejected",
      message: `Your quote${quoteWithRequest?.request ? ` for "${quoteWithRequest.request.projectTitle}"` : ""} was rejected by RKISPro admin.`,
      type: "warning",
      link: "/vendor/rfqs"
    });
  }

  await createActivityLog({
    actorRole: "admin",
    actorId: admin.id,
    entityType: "quote",
    entityId: reviewedQuote.id,
    action: status,
    description: `${admin.name} ${status} a vendor quote.`,
    metadata: { requestId: reviewedQuote.requestId, vendorId: reviewedQuote.vendorId }
  });

  return NextResponse.redirect(new URL("/admin/quotes", request.url), 303);
}
