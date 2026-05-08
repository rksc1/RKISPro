import { getSupabase } from "@/lib/db";
import type { VendorNotification, VendorNotificationRow } from "@/models/VendorNotification";
import type { MarketplaceRequestRow } from "@/models/MarketplaceRequest";
import { getApprovedVendorIds } from "@/services/vendor-service";

function mapNotification(row: VendorNotificationRow): VendorNotification {
  return {
    id: row.id,
    vendorId: row.vendor_id,
    requestId: row.request_id,
    status: row.status,
    quoteAmount: row.quote_amount,
    quoteNotes: row.quote_notes,
    quoteFileUrls: row.quote_file_urls ?? [],
    createdAt: row.created_at
  };
}

function mapAssignedRfq(row: VendorNotificationRow & { marketplace_requests: MarketplaceRequestRow }) {
  return {
    ...mapNotification(row),
    request: {
      id: row.marketplace_requests.id,
      customerId: row.marketplace_requests.customer_id,
      projectTitle: row.marketplace_requests.project_title,
      description: row.marketplace_requests.description,
      serviceType: row.marketplace_requests.service_type,
      materialType: row.marketplace_requests.material_type,
      location: row.marketplace_requests.location,
      deadline: row.marketplace_requests.deadline,
      drawingUrls: row.marketplace_requests.drawing_urls ?? [],
      status: row.marketplace_requests.status,
      createdAt: row.marketplace_requests.created_at
    }
  };
}

export async function distributeRequestToVendors(requestId: string, vendorIds: string[]) {
  const approvedVendorIds = await getApprovedVendorIds([...new Set(vendorIds)]);

  if (approvedVendorIds.length === 0) {
    throw new Error("Select at least one approved vendor");
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_notifications")
    .upsert(
      approvedVendorIds.map((vendorId) => ({
        vendor_id: vendorId,
        request_id: requestId,
        status: "Sent" as const
      })),
      { onConflict: "vendor_id,request_id" }
    )
    .select("*")
    .returns<VendorNotificationRow[]>();

  if (error) throw new Error(error.message);
  return data.map(mapNotification);
}

export async function getRequestNotificationVendorIds(requestId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_notifications")
    .select("vendor_id")
    .eq("request_id", requestId)
    .returns<{ vendor_id: string }[]>();

  if (error) throw new Error(error.message);
  return data.map((notification) => notification.vendor_id);
}

export async function getVendorAssignedRfqs(vendorId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_notifications")
    .select("*, marketplace_requests(*)")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false })
    .returns<Array<VendorNotificationRow & { marketplace_requests: MarketplaceRequestRow }>>();

  if (error) throw new Error(error.message);
  return data.map(mapAssignedRfq);
}

export async function getVendorNotificationById(notificationId: string, vendorId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendor_notifications")
    .select("*")
    .eq("id", notificationId)
    .eq("vendor_id", vendorId)
    .maybeSingle<VendorNotificationRow>();

  if (error || !data) return null;
  return mapNotification(data);
}

export async function markVendorRfqViewed(notificationId: string, vendorId: string) {
  const supabase = getSupabase();

  const { data: current, error: currentError } = await supabase
    .from("vendor_notifications")
    .select("status")
    .eq("id", notificationId)
    .eq("vendor_id", vendorId)
    .maybeSingle<{ status: string }>();

  if (currentError) throw new Error(currentError.message);
  if (!current || current.status !== "Sent") return null;

  const { data, error } = await supabase
    .from("vendor_notifications")
    .update({ status: "Viewed" })
    .eq("id", notificationId)
    .eq("vendor_id", vendorId)
    .select("*")
    .single<VendorNotificationRow>();

  if (error) throw new Error(error.message);
  return mapNotification(data);
}

export async function submitVendorQuotation(input: {
  notificationId: string;
  vendorId: string;
  quoteAmount: number;
  quoteNotes: string;
  quoteFileUrls: string[];
}) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendor_notifications")
    .update({
      status: "Quoted",
      quote_amount: input.quoteAmount,
      quote_notes: input.quoteNotes,
      quote_file_urls: input.quoteFileUrls
    })
    .eq("id", input.notificationId)
    .eq("vendor_id", input.vendorId)
    .select("*")
    .single<VendorNotificationRow>();

  if (error) throw new Error(error.message);
  return mapNotification(data);
}

export async function setVendorNotificationQuoted(notificationId: string, vendorId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendor_notifications")
    .update({ status: "Quoted" })
    .eq("id", notificationId)
    .eq("vendor_id", vendorId)
    .select("*")
    .single<VendorNotificationRow>();

  if (error) throw new Error(error.message);
  return mapNotification(data);
}

export async function setVendorNotificationAwarded(requestId: string, vendorId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendor_notifications")
    .update({ status: "awarded" })
    .eq("request_id", requestId)
    .eq("vendor_id", vendorId)
    .select("*")
    .maybeSingle<VendorNotificationRow>();

  if (error) throw new Error(error.message);
  return data ? mapNotification(data) : null;
}
