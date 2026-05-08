import { getSupabase } from "@/lib/db";
import type { MarketplaceRequest, MarketplaceRequestRow } from "@/models/MarketplaceRequest";
import type { MarketplaceRequestStatus } from "@/types/auth";

function mapRequest(row: MarketplaceRequestRow): MarketplaceRequest {
  return {
    id: row.id,
    customerId: row.customer_id,
    projectTitle: row.project_title,
    description: row.description,
    serviceType: row.service_type,
    materialType: row.material_type,
    location: row.location,
    deadline: row.deadline,
    drawingUrls: row.drawing_urls ?? [],
    status: row.status,
    createdAt: row.created_at
  };
}

export async function createMarketplaceRequest(input: {
  customerId: string;
  projectTitle: string;
  description: string;
  serviceType: string;
  materialType: string;
  location: string;
  deadline: string;
  drawingUrls: string[];
}) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("marketplace_requests")
    .insert({
      customer_id: input.customerId,
      project_title: input.projectTitle,
      description: input.description,
      service_type: input.serviceType,
      material_type: input.materialType,
      location: input.location,
      deadline: input.deadline,
      drawing_urls: input.drawingUrls,
      status: "Pending"
    })
    .select("*")
    .single<MarketplaceRequestRow>();

  if (error) throw new Error(error.message);
  return mapRequest(data);
}

export async function getCustomerMarketplaceRequests(customerId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("marketplace_requests")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .returns<MarketplaceRequestRow[]>();

  if (error) throw new Error(error.message);
  return data.map(mapRequest);
}

export async function getMarketplaceRequestById(requestId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("marketplace_requests")
    .select("*")
    .eq("id", requestId)
    .maybeSingle<MarketplaceRequestRow>();

  if (error || !data) return null;
  return mapRequest(data);
}

export async function getMarketplaceRequests(filters: {
  status?: MarketplaceRequestStatus | "";
  location?: string;
  serviceType?: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("marketplace_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.location) query = query.ilike("location", `%${filters.location}%`);
  if (filters.serviceType) query = query.ilike("service_type", `%${filters.serviceType}%`);

  const { data, error } = await query.returns<MarketplaceRequestRow[]>();

  if (error) throw new Error(error.message);
  return data.map(mapRequest);
}

export async function updateMarketplaceRequestStatus(
  requestId: string,
  status: Extract<MarketplaceRequestStatus, "Approved" | "Rejected" | "Distributed" | "awarded">
) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("marketplace_requests")
    .update({ status })
    .eq("id", requestId)
    .select("*")
    .single<MarketplaceRequestRow>();

  if (error) throw new Error(error.message);
  return mapRequest(data);
}
