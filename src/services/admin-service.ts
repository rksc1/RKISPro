import { getSupabase } from "@/lib/db";
import type { AdminRow } from "@/models/Admin";
import type { MarketplaceRequestStatus, PaymentStatus, ProjectStatus, VendorQuoteStatus, VendorStatus } from "@/types/auth";

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

async function countMarketplaceRequests(status: MarketplaceRequestStatus) {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("marketplace_requests")
    .select("id", { count: "exact", head: true })
    .eq("status", status);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function countVendorQuotes(status: VendorQuoteStatus) {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("vendor_quotes")
    .select("id", { count: "exact", head: true })
    .eq("status", status);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function countProjects(status: ProjectStatus) {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("status", status);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function countPayments(status: PaymentStatus) {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("payments")
    .select("id", { count: "exact", head: true })
    .eq("status", status);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function getAdminDashboardStats() {
  const [
    totalCustomers,
    totalVendors,
    pendingVendorApprovals,
    rfqIntakeQueue,
    vendorMatchingQueue,
    quoteReviewQueue,
    projectRiskQueue,
    paymentQueue
  ] = await Promise.all([
    countCustomers(),
    countVendors(),
    countVendors("Pending"),
    countMarketplaceRequests("Pending"),
    countMarketplaceRequests("Approved"),
    countVendorQuotes("pending"),
    countProjects("on_hold"),
    countPayments("pending")
  ]);

  return {
    totalCustomers,
    totalVendors,
    pendingVendorApprovals,
    rfqIntakeQueue,
    vendorMatchingQueue,
    quoteReviewQueue,
    vendorVerificationQueue: pendingVendorApprovals,
    projectRiskQueue,
    paymentQueue
  };
}

export async function getAdmins() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("admins").select("*").returns<AdminRow[]>();

  if (error) throw new Error(error.message);
  return data;
}
