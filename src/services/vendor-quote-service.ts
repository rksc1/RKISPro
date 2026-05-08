import { getSupabase } from "@/lib/db";
import type { MarketplaceRequestRow } from "@/models/MarketplaceRequest";
import type { VendorRow } from "@/models/Vendor";
import type { VendorQuote, VendorQuoteRow } from "@/models/VendorQuote";
import { getVendorNotificationById, setVendorNotificationQuoted } from "@/services/vendor-notification-service";
import type { VendorQuoteStatus } from "@/types/auth";

function mapQuote(row: VendorQuoteRow): VendorQuote {
  return {
    id: row.id,
    vendorId: row.vendor_id,
    requestId: row.request_id,
    amount: row.amount,
    timeline: row.timeline,
    notes: row.notes,
    attachmentUrl: row.attachment_url,
    status: row.status,
    adminNotes: row.admin_notes,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapQuoteWithRelations(
  row: VendorQuoteRow & { vendors: VendorRow | null; marketplace_requests: MarketplaceRequestRow | null }
) {
  return {
    ...mapQuote(row),
    vendor: row.vendors
      ? {
          id: row.vendors.id,
          companyName: row.vendors.company_name,
          ownerName: row.vendors.owner_name,
          location: row.vendors.location,
          services: row.vendors.services
        }
      : null,
    request: row.marketplace_requests
      ? {
          id: row.marketplace_requests.id,
          customerId: row.marketplace_requests.customer_id,
          projectTitle: row.marketplace_requests.project_title,
          serviceType: row.marketplace_requests.service_type,
          location: row.marketplace_requests.location,
          status: row.marketplace_requests.status
        }
      : null
  };
}

export async function createVendorQuote(input: {
  notificationId: string;
  vendorId: string;
  amount: number;
  timeline: string;
  notes: string;
  attachmentUrl?: string | null;
}) {
  const notification = await getVendorNotificationById(input.notificationId, input.vendorId);

  if (!notification) {
    throw new Error("Assigned RFQ not found");
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_quotes")
    .insert({
      vendor_id: input.vendorId,
      request_id: notification.requestId,
      amount: input.amount,
      timeline: input.timeline,
      notes: input.notes,
      attachment_url: input.attachmentUrl ?? null,
      status: "pending"
    })
    .select("*")
    .single<VendorQuoteRow>();

  if (error) throw new Error(error.message);

  await setVendorNotificationQuoted(input.notificationId, input.vendorId);
  return mapQuote(data);
}

export async function getVendorQuotesForRequests(vendorId: string, requestIds: string[]) {
  if (requestIds.length === 0) return [];

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_quotes")
    .select("*")
    .eq("vendor_id", vendorId)
    .in("request_id", requestIds)
    .order("created_at", { ascending: false })
    .returns<VendorQuoteRow[]>();

  if (error) throw new Error(error.message);
  return data.map(mapQuote);
}

export async function getAdminVendorQuotes(status?: VendorQuoteStatus | "") {
  const supabase = getSupabase();
  let query = supabase
    .from("vendor_quotes")
    .select("*, vendors(*), marketplace_requests(*)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query.returns<
    Array<VendorQuoteRow & { vendors: VendorRow | null; marketplace_requests: MarketplaceRequestRow | null }>
  >();

  if (error) throw new Error(error.message);
  return data.map(mapQuoteWithRelations);
}

export async function getApprovedQuotesForCustomerRequest(requestId: string, customerId: string) {
  const supabase = getSupabase();

  const { data: request, error: requestError } = await supabase
    .from("marketplace_requests")
    .select("*")
    .eq("id", requestId)
    .eq("customer_id", customerId)
    .maybeSingle<MarketplaceRequestRow>();

  if (requestError || !request) return { request: null, quotes: [] };

  const { data, error } = await supabase
    .from("vendor_quotes")
    .select("*, vendors(*)")
    .eq("request_id", requestId)
    .eq("status", "approved")
    .order("amount", { ascending: true })
    .returns<Array<VendorQuoteRow & { vendors: VendorRow | null }>>();

  if (error) throw new Error(error.message);

  return {
    request,
    quotes: data.map((row) => ({
      ...mapQuote(row),
      vendor: row.vendors
        ? {
            id: row.vendors.id,
            companyName: row.vendors.company_name,
            ownerName: row.vendors.owner_name,
            location: row.vendors.location,
            services: row.vendors.services
          }
        : null
    }))
  };
}

export async function updateVendorQuoteReview(input: {
  quoteId: string;
  status: Extract<VendorQuoteStatus, "approved" | "rejected">;
  adminId: string;
  adminNotes?: string;
}) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendor_quotes")
    .update({
      status: input.status,
      admin_notes: input.adminNotes ?? null,
      reviewed_at: new Date().toISOString(),
      reviewed_by: input.adminId,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.quoteId)
    .select("*")
    .single<VendorQuoteRow>();

  if (error) throw new Error(error.message);
  return mapQuote(data);
}

export async function getVendorQuoteWithRequest(quoteId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_quotes")
    .select("*, vendors(*), marketplace_requests(*)")
    .eq("id", quoteId)
    .maybeSingle<
      VendorQuoteRow & { vendors: VendorRow | null; marketplace_requests: MarketplaceRequestRow | null }
    >();

  if (error || !data) return null;
  return mapQuoteWithRelations(data);
}
