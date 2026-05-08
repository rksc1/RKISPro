import { getSupabase } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import type { AdminRow } from "@/models/Admin";
import type { VendorStatus } from "@/types/auth";

export async function authenticateAdmin(email: string, password: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle<AdminRow>();

  if (error || !data || !(await verifyPassword(password, data.password))) return null;
  return data;
}

async function countCustomers() {
  const supabase = getSupabase();
  const { count, error } = await supabase.from("customers").select("id", { count: "exact", head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function countVendors(status?: VendorStatus) {
  const supabase = getSupabase();
  let query = supabase.from("vendors").select("id", { count: "exact", head: true });

  if (status) query = query.eq("status", status);

  const { count, error } = await query;
  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function getAdminDashboardStats() {
  const [totalCustomers, totalVendors, pendingVendorApprovals] = await Promise.all([
    countCustomers(),
    countVendors(),
    countVendors("Pending")
  ]);

  return { totalCustomers, totalVendors, pendingVendorApprovals };
}

export async function getAdmins() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("admins").select("*").returns<AdminRow[]>();

  if (error) throw new Error(error.message);
  return data;
}
