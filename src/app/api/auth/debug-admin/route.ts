import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/db";

function isEnabled() {
  return process.env.NODE_ENV !== "production" || process.env.ENABLE_AUTH_DEBUG === "true";
}

export async function GET(request: NextRequest) {
  if (!isEnabled()) {
    return NextResponse.json({ error: "Auth debug is disabled" }, { status: 404 });
  }

  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Email query parameter is required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const [profileResult, adminResult] = await Promise.all([
    supabase.from("profiles").select("id,email,role,full_name,status,is_approved,is_verified").eq("email", email).maybeSingle(),
    supabase.from("admins").select("id,email,role,name").eq("email", email).maybeSingle()
  ]);

  return NextResponse.json({
    supabaseUrlHost: process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host : null,
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAuthSecret: Boolean(process.env.AUTH_SECRET),
    profile: profileResult.data,
    profileError: profileResult.error?.message ?? null,
    admin: adminResult.data,
    adminError: adminResult.error?.message ?? null
  });
}
