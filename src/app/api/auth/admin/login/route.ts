import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Admin login now uses the unified RKISPro login at /auth?mode=login" },
    { status: 410 }
  );
}
