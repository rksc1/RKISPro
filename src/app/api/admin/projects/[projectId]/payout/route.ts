import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { recordVendorPayout } from "@/services/finance-service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  const body = await request.json().catch(() => null);

  if (!body || !body.vendorId || !body.amount || !body.referenceNumber) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payment = await recordVendorPayout({
      projectId,
      vendorId: body.vendorId,
      amount: Number(body.amount),
      referenceNumber: body.referenceNumber,
      adminId: admin.id
    });
    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to record payout" },
      { status: 400 }
    );
  }
}
