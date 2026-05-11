import { getSupabase } from "@/lib/db";
import type { Role } from "@/types/auth";

type ProfileInput = {
  authUserId: string;
  role: Role;
  fullName: string;
  companyName?: string;
  phone: string;
  city: string;
  state: string;
  status?: string;
  isApproved?: boolean;
};

export async function createSupabaseAuthUser(input: {
  email: string;
  password: string;
  role: Role;
  fullName: string;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      role: input.role,
      full_name: input.fullName
    }
  });

  if (error) {
    if (error.message.toLowerCase().includes("already")) return null;
    const canFallbackToSignup = /not allowed|service|permission|jwt/i.test(error.message);
    if (!canFallbackToSignup) throw new Error(error.message);

    const fallback = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          role: input.role,
          full_name: input.fullName
        }
      }
    });

    if (fallback.error) throw new Error(fallback.error.message);
    return fallback.data.user;
  }

  return data.user;
}

export async function verifySupabasePassword(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return null;
  return data.user;
}

export async function upsertAuthProfile(input: ProfileInput) {
  const supabase = getSupabase();
  const client = supabase as unknown as {
    from: (table: string) => {
      upsert: (value: Record<string, unknown>, options?: Record<string, unknown>) => {
        select: (columns: string) => {
          maybeSingle: () => Promise<{ error: { message: string } | null }>;
        };
      };
    };
  };

  const { error } = await client
    .from("profiles")
    .upsert({
      id: input.authUserId,
      role: input.role,
      full_name: input.fullName,
      company_name: input.companyName ?? null,
      phone: input.phone,
      city: input.city,
      state: input.state,
      is_verified: false,
      is_approved: input.isApproved ?? input.role === "customer",
      status: input.status ?? (input.role === "vendor" ? "pending" : "active"),
      updated_at: new Date().toISOString()
    }, { onConflict: "id" })
    .select("id")
    .maybeSingle();

  if (error) throw new Error(error.message);
}
