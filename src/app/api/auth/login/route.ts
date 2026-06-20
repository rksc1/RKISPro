import { NextResponse, type NextRequest } from "next/server";
import { setRoleCookie } from "@/lib/auth";
import { getSupabaseAuthClient } from "@/lib/db";
import { redirectPathByRole } from "@/lib/auth/redirect-by-role";
import { getProfileById, isBlockedProfile, resolveRoleAccount, syncProfile } from "@/services/auth-service";
import type { Role } from "@/types/auth";

function validRole(value: unknown): value is Role {
  return value === "admin" || value === "customer" || value === "vendor";
}

function confirmedAt(user: { email_confirmed_at?: string | null; confirmed_at?: string | null }) {
  return user.email_confirmed_at ?? user.confirmed_at ?? "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const supabase = getSupabaseAuthClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      const needsConfirmation = /confirm/i.test(error?.message ?? "");
      return NextResponse.json({
        error: needsConfirmation ? "Please confirm your email before logging in." : "Invalid credentials",
        needsConfirmation
      }, { status: 401 });
    }

    const emailConfirmedAt = confirmedAt(data.user);
    if (!emailConfirmedAt) {
      await supabase.auth.signOut();
      return NextResponse.json({
        error: "Please confirm your email before logging in.",
        needsConfirmation: true
      }, { status: 403 });
    }

    let profile = await getProfileById(data.user.id);
    const metadataRole = data.user.user_metadata?.role;

    if (!profile && validRole(metadataRole)) {
      profile = await syncProfile({
        authUserId: data.user.id,
        email,
        role: metadataRole,
        fullName: String(data.user.user_metadata?.full_name ?? email),
        status: metadataRole === "vendor" ? "pending" : "active",
        isApproved: metadataRole !== "vendor"
      });
    }

    if (!profile) {
      return NextResponse.json({ error: "No RKISPro profile is linked to this account" }, { status: 403 });
    }

    if (isBlockedProfile(profile)) {
      return NextResponse.json({ error: "This account is not active. Please contact RKISPro support." }, { status: 403 });
    }

    const account = await resolveRoleAccount(profile);
    if (!account) {
      return NextResponse.json({ error: "Role account setup is incomplete. Please contact RKISPro support." }, { status: 403 });
    }

    await setRoleCookie({
      id: account.id,
      role: profile.role,
      name: account.name,
      email: account.email,
      emailConfirmedAt
    });

    return NextResponse.json({
      ok: true,
      role: profile.role,
      redirectTo: redirectPathByRole(profile.role)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected login error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
