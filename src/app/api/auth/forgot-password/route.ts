import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const redirectTo = new URL("/auth?mode=login", request.url).toString();
  const { error } = await getSupabase().auth.resetPasswordForEmail(email, { redirectTo });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Password reset email sent if the account exists." });
}
