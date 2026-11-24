import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { getLatestVendorAudit, saveVendorAudit } from "@/services/vendor-audit-service";
import { getVendorById } from "@/services/vendor-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: vendorId } = await params;
  const vendor = await getVendorById(vendorId);
  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  const audit = await getLatestVendorAudit(vendorId);

  return NextResponse.json({
    vendor: {
      id: vendor.id,
      name: vendor.vendorType === "individual" ? vendor.fullName : vendor.companyName,
      verifiedBadge: vendor.verifiedBadge ?? "none",
      auditScore: vendor.auditScore ?? 0,
      auditedAt: vendor.auditedAt ?? null
    },
    latestAudit: audit
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: vendorId } = await params;
  const vendor = await getVendorById(vendorId);
  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { auditorName, responses, notes } = body;

    if (!auditorName || typeof auditorName !== "string" || !auditorName.trim()) {
      return NextResponse.json({ error: "Auditor name is required." }, { status: 400 });
    }

    if (!responses || typeof responses !== "object") {
      return NextResponse.json({ error: "Checkpoint responses are required." }, { status: 400 });
    }

    const { evaluation, audit } = await saveVendorAudit({
      vendorId,
      auditorName: auditorName.trim(),
      auditorId: admin.id,
      responses,
      notes: notes?.trim() ?? null
    });

    return NextResponse.json({
      success: true,
      message: `Vendor audit completed. Verified badge '${evaluation.badge.toUpperCase()}' awarded.`,
      evaluation,
      audit
    });
  } catch (error) {
    console.error("Error saving vendor audit:", error);
    return NextResponse.json(
      { error: "Failed to process audit submission." },
      { status: 500 }
    );
  }
}
