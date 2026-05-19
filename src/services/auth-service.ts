import { getSupabase } from "@/lib/db";
import type { AdminRow } from "@/models/Admin";
import type { CustomerRow } from "@/models/Customer";
import type { VendorRow } from "@/models/Vendor";
import type { Role } from "@/types/auth";

export type AuthProfile = {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  companyName: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  status: string;
  createdAt: string;
};

type ProfileRow = {
  id: string;
  email: string | null;
  role: Role;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  status: string | null;
  created_at: string;
};

const blockedStatuses = new Set(["suspended", "inactive", "rejected"]);

function profileClient() {
  return getSupabase() as unknown as {
    from: (table: string) => {
      select: (columns: string) => {
        eq: (column: string, value: string) => {
          maybeSingle: <T>() => Promise<{ data: T | null; error: { message: string } | null }>;
        };
      };
      upsert: (value: Record<string, unknown>, options?: Record<string, unknown>) => {
        select: (columns: string) => {
          maybeSingle: <T>() => Promise<{ data: T | null; error: { message: string } | null }>;
        };
      };
      insert: (value: Record<string, unknown>) => {
        select: (columns: string) => {
          single: <T>() => Promise<{ data: T; error: { message: string } | null }>;
        };
      };
      update: (value: Record<string, unknown>) => {
        eq: (column: string, value: string) => Promise<{ error: { message: string } | null }>;
      };
    };
  };
}

function mapProfile(row: ProfileRow): AuthProfile {
  return {
    id: row.id,
    email: row.email ?? "",
    role: row.role,
    fullName: row.full_name ?? row.email ?? "RKISPro User",
    companyName: row.company_name,
    phone: row.phone,
    city: row.city,
    state: row.state,
    status: row.status ?? "active",
    createdAt: row.created_at
  };
}

export function isBlockedProfile(profile: AuthProfile) {
  return blockedStatuses.has(profile.status);
}

export async function getProfileById(id: string) {
  const { data, error } = await profileClient()
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle<ProfileRow>();

  if (error || !data) return null;
  return mapProfile(data);
}

export async function getProfileByEmail(email: string) {
  const { data, error } = await profileClient()
    .from("profiles")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle<ProfileRow>();

  if (error || !data) return null;
  return mapProfile(data);
}

export async function syncProfile(input: {
  authUserId: string;
  email: string;
  role: Role;
  fullName: string;
  companyName?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  status?: string;
  isApproved?: boolean;
}) {
  const { data, error } = await profileClient()
    .from("profiles")
    .upsert({
      id: input.authUserId,
      email: input.email.toLowerCase(),
      role: input.role,
      full_name: input.fullName,
      company_name: input.companyName ?? null,
      phone: input.phone ?? null,
      city: input.city ?? null,
      state: input.state ?? null,
      is_verified: false,
      is_approved: input.isApproved ?? input.role === "customer",
      status: input.status ?? (input.role === "vendor" ? "pending" : "active"),
      updated_at: new Date().toISOString()
    }, { onConflict: "id" })
    .select("*")
    .maybeSingle<ProfileRow>();

  if (error) throw new Error(error.message);
  return data ? mapProfile(data) : null;
}

export async function resolveRoleAccount(profile: AuthProfile) {
  const supabase = getSupabase();
  const email = profile.email.toLowerCase();

  if (profile.role === "customer") {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .maybeSingle<CustomerRow>();

    if (error || !data) return null;
    if (!("profile_id" in data) || !data.profile_id) {
      await profileClient().from("customers").update({ profile_id: profile.id }).eq("id", data.id);
    }
    return { id: data.id, name: data.name, email: data.email, role: profile.role } as const;
  }

  if (profile.role === "vendor") {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("email", email)
      .maybeSingle<VendorRow>();

    if (error || !data) return null;
    if (!("profile_id" in data) || !data.profile_id) {
      await profileClient().from("vendors").update({ profile_id: profile.id }).eq("id", data.id);
    }
    return { id: data.id, name: data.full_name ?? data.owner_name ?? data.company_name, email: data.email, role: profile.role } as const;
  }

  return ensureAdminAccount(profile);
}

async function ensureAdminAccount(profile: AuthProfile) {
  const supabase = getSupabase();
  const email = profile.email.toLowerCase();
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .maybeSingle<AdminRow>();

  if (error) throw new Error(error.message);
  if (data) return { id: data.id, name: data.name, email: data.email, role: profile.role } as const;

  const { data: created, error: createError } = await profileClient()
    .from("admins")
    .insert({
      id: profile.id,
      name: profile.fullName,
      email,
      password: "supabase-auth-managed",
      role: "admin"
    })
    .select("*")
    .single<AdminRow>();

  if (createError) throw new Error(createError.message);
  return { id: created.id, name: created.name, email: created.email, role: profile.role } as const;
}
