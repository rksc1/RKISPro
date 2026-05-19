import { NextResponse, type NextRequest } from "next/server";
import { setRoleCookie } from "@/lib/auth";
import { getSupabase } from "@/lib/db";
import { redirectPathByRole } from "@/lib/auth/redirect-by-role";
import { getProfileById, isBlockedProfile, resolveRoleAccount, syncProfile } from "@/services/auth-service";
import type { Role } from "@/types/auth";

function validRole(value: unknown): value is Role {
  return value === "admin" || value === "customer" || value === "vendor";
}

function confirmedAt(user: { email_confirmed_at?: string | null; confirmed_at?: string | null }) {
  return user.email_confirmed_at ?? user.confirmed_at ?? "";
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectUrl = new URL("/auth?mode=login", request.url);

  if (!code) {
    redirectUrl.searchParams.set("message", "confirm-email");
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    redirectUrl.searchParams.set("message", "confirm-email");
    return NextResponse.redirect(redirectUrl);
  }

  const emailConfirmedAt = confirmedAt(data.user);
  if (!emailConfirmedAt) {
    redirectUrl.searchParams.set("message", "confirm-email");
    redirectUrl.searchParams.set("email", data.user.email ?? "");
    return NextResponse.redirect(redirectUrl);
  }

  const email = data.user.email?.toLowerCase() ?? "";
  const metadataRole = data.user.user_metadata?.role;
  let profile = await getProfileById(data.user.id);

  if (!profile) {
    profile = await syncProfile({
      authUserId: data.user.id,
      email,
      role: validRole(metadataRole) ? metadataRole : "customer",
      fullName: String(data.user.user_metadata?.full_name ?? email),
      status: metadataRole === "vendor" ? "pending" : "active",
      isApproved: metadataRole !== "vendor"
    });
  }

  if (!profile || isBlockedProfile(profile)) {
    redirectUrl.searchParams.set("message", "account-blocked");
    return NextResponse.redirect(redirectUrl);
  }

  const account = await resolveRoleAccount(profile);
  if (!account) {
    redirectUrl.searchParams.set("message", "profile-incomplete");
    return NextResponse.redirect(redirectUrl);
  }

  await setRoleCookie({
    id: account.id,
    role: profile.role,
    name: account.name,
    email: account.email,
    emailConfirmedAt
  });

  return NextResponse.redirect(new URL(redirectPathByRole(profile.role), request.url));
}
