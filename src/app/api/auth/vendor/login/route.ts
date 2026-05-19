import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Vendor login now uses the unified RKISPro login at /auth?mode=login" },
    { status: 410 }
  );
}
