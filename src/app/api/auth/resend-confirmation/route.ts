import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const { error } = await getSupabase().auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Confirmation email sent again." });
}
