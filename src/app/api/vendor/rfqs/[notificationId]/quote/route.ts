import { NextResponse, type NextRequest } from "next/server";
import { getVendorFromCookie } from "@/lib/auth";
import { uploadFile, uploadFolders } from "@/lib/upload-file";
import { getAdmins } from "@/services/admin-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { createVendorQuote } from "@/services/vendor-quote-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  const vendor = await getVendorFromCookie();

  if (!vendor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const amount = Number(formData.get("amount") ?? 0);
  const timeline = String(formData.get("timeline") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (Number.isNaN(amount) || amount <= 0 || !timeline || !notes) {
    return NextResponse.json({ error: "Amount, timeline, and notes are required" }, { status: 400 });
  }

  try {
    const { notificationId } = await params;
    const attachment = formData.get("attachment");
    const upload = attachment instanceof File && attachment.size > 0
      ? await uploadFile(attachment, uploadFolders.quoteDocuments)
      : null;

    const quote = await createVendorQuote({
      notificationId,
      vendorId: vendor.id,
      amount,
      timeline,
      notes,
      attachmentUrl: upload?.secure_url
    });
    const admins = await getAdmins();

    await createNotifications(
      admins.map((admin) => ({
        userRole: "admin",
        userId: admin.id,
        title: "New vendor quote",
        message: `${vendor.name} submitted a quote of Rs. ${amount.toLocaleString("en-IN")}.`,
        type: "info",
        link: "/admin/quotes"
      }))
    );
    await createActivityLog({
      actorRole: "vendor",
      actorId: vendor.id,
      entityType: "quote",
      entityId: quote.id,
      action: "submitted",
      description: `${vendor.name} submitted a quotation.`,
      metadata: { requestId: quote.requestId, amount }
    });

    return NextResponse.redirect(new URL("/vendor/rfqs", request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Quotation submission failed" }, { status: 400 });
  }
}
