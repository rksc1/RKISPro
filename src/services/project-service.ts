import { getSupabase } from "@/lib/db";
import type { CustomerRow } from "@/models/Customer";
import type { MarketplaceRequestRow } from "@/models/MarketplaceRequest";
import type { Project, ProjectRow } from "@/models/Project";
import type { VendorRow } from "@/models/Vendor";
import type { VendorQuoteRow } from "@/models/VendorQuote";
import { ensureProjectFinancial } from "@/services/finance-service";
import { getProjectMilestones } from "@/services/project-milestone-service";
import { setVendorNotificationAwarded } from "@/services/vendor-notification-service";
import type { ProjectStatus } from "@/types/auth";

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    requestId: row.request_id,
    customerId: row.customer_id,
    vendorId: row.vendor_id,
    quoteId: row.quote_id,
    status: row.status,
    startDate: row.start_date,
    expectedDeliveryDate: row.expected_delivery_date,
    actualDeliveryDate: row.actual_delivery_date,
    projectValue: row.project_value,
    commissionPercentage: row.commission_percentage,
    commissionAmount: row.commission_amount,
    adminNotes: row.admin_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapProjectWithRelations(
  row: ProjectRow & {
    vendors: VendorRow | null;
    customers: CustomerRow | null;
    marketplace_requests: MarketplaceRequestRow | null;
  }
) {
  return {
    ...mapProject(row),
    vendor: row.vendors
      ? {
          id: row.vendors.id,
          companyName: row.vendors.company_name,
          ownerName: row.vendors.owner_name,
          location: row.vendors.location
        }
      : null,
    customer: row.customers
      ? {
          id: row.customers.id,
          name: row.customers.name,
          companyName: row.customers.company_name,
          location: row.customers.location
        }
      : null,
    request: row.marketplace_requests
      ? {
          id: row.marketplace_requests.id,
          projectTitle: row.marketplace_requests.project_title,
          serviceType: row.marketplace_requests.service_type,
          location: row.marketplace_requests.location
        }
      : null
  };
}

function mapProjectDetail(
  row: ProjectRow & {
    vendors: VendorRow | null;
    customers: CustomerRow | null;
    marketplace_requests: MarketplaceRequestRow | null;
    vendor_quotes: VendorQuoteRow | null;
  }
) {
  return {
    ...mapProjectWithRelations(row),
    quote: row.vendor_quotes
      ? {
          id: row.vendor_quotes.id,
          amount: row.vendor_quotes.amount,
          timeline: row.vendor_quotes.timeline,
          notes: row.vendor_quotes.notes,
          attachmentUrl: row.vendor_quotes.attachment_url,
          status: row.vendor_quotes.status
        }
      : null
  };
}

export async function awardProject(input: {
  customerId: string;
  requestId: string;
  quoteId: string;
}) {
  const supabase = getSupabase();

  const { data: request, error: requestError } = await supabase
    .from("marketplace_requests")
    .select("*")
    .eq("id", input.requestId)
    .eq("customer_id", input.customerId)
    .maybeSingle<MarketplaceRequestRow>();

  if (requestError || !request) throw new Error("RFQ not found");
  if (request.status === "awarded") throw new Error("This RFQ is already awarded");

  const { data: existingProject } = await supabase
    .from("projects")
    .select("id")
    .eq("request_id", input.requestId)
    .maybeSingle();

  if (existingProject) throw new Error("This RFQ is already awarded");

  const { data: quote, error: quoteError } = await supabase
    .from("vendor_quotes")
    .select("*")
    .eq("id", input.quoteId)
    .eq("request_id", input.requestId)
    .eq("status", "approved")
    .maybeSingle<VendorQuoteRow>();

  if (quoteError || !quote) throw new Error("Approved quote not found");

  const commissionPercentage = 3;
  const commissionAmount = Number(quote.amount) * 0.03;

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      request_id: input.requestId,
      customer_id: input.customerId,
      vendor_id: quote.vendor_id,
      quote_id: quote.id,
      status: "awarded",
      project_value: quote.amount,
      commission_percentage: commissionPercentage,
      commission_amount: commissionAmount
    })
    .select("*")
    .single<ProjectRow>();

  if (projectError) throw new Error(projectError.message);

  await supabase.from("vendor_quotes").update({ status: "selected", updated_at: new Date().toISOString() }).eq("id", quote.id);
  await supabase
    .from("vendor_quotes")
    .update({ status: "not_selected", updated_at: new Date().toISOString() })
    .eq("request_id", input.requestId)
    .eq("status", "approved")
    .neq("id", quote.id);
  await supabase.from("marketplace_requests").update({ status: "awarded" }).eq("id", input.requestId);
  await setVendorNotificationAwarded(input.requestId, quote.vendor_id);

  const mappedProject = mapProject(project);
  await ensureProjectFinancial(mappedProject);

  return mappedProject;
}

export async function getCustomerProjects(customerId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*, vendors(*), customers(*), marketplace_requests(*)")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .returns<Array<ProjectRow & { vendors: VendorRow | null; customers: CustomerRow | null; marketplace_requests: MarketplaceRequestRow | null }>>();

  if (error) throw new Error(error.message);
  return data.map(mapProjectWithRelations);
}

export async function getVendorProjects(vendorId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*, vendors(*), customers(*), marketplace_requests(*)")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false })
    .returns<Array<ProjectRow & { vendors: VendorRow | null; customers: CustomerRow | null; marketplace_requests: MarketplaceRequestRow | null }>>();

  if (error) throw new Error(error.message);
  return data.map(mapProjectWithRelations);
}

export async function getAdminProjects(status?: ProjectStatus | "") {
  const supabase = getSupabase();
  let query = supabase
    .from("projects")
    .select("*, vendors(*), customers(*), marketplace_requests(*)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query.returns<
    Array<ProjectRow & { vendors: VendorRow | null; customers: CustomerRow | null; marketplace_requests: MarketplaceRequestRow | null }>
  >();

  if (error) throw new Error(error.message);
  return data.map(mapProjectWithRelations);
}

export async function updateProject(input: {
  projectId: string;
  status: ProjectStatus;
  expectedDeliveryDate?: string | null;
  actualDeliveryDate?: string | null;
  adminNotes?: string | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("projects")
    .update({
      status: input.status,
      expected_delivery_date: input.expectedDeliveryDate || null,
      actual_delivery_date: input.actualDeliveryDate || null,
      admin_notes: input.adminNotes || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.projectId)
    .select("*")
    .single<ProjectRow>();

  if (error) throw new Error(error.message);
  return mapProject(data);
}

export async function getProjectDetailForRole(input: {
  projectId: string;
  role: "customer" | "vendor" | "admin";
  userId: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("projects")
    .select("*, vendors(*), customers(*), marketplace_requests(*), vendor_quotes(*)")
    .eq("id", input.projectId);

  if (input.role === "customer") query = query.eq("customer_id", input.userId);
  if (input.role === "vendor") query = query.eq("vendor_id", input.userId);

  const { data, error } = await query
    .maybeSingle<
      ProjectRow & {
        vendors: VendorRow | null;
        customers: CustomerRow | null;
        marketplace_requests: MarketplaceRequestRow | null;
        vendor_quotes: VendorQuoteRow | null;
      }
    >();

  if (error || !data) return null;

  const [milestones] = await Promise.all([getProjectMilestones(input.projectId)]);
  return {
    ...mapProjectDetail(data),
    milestones
  };
}
