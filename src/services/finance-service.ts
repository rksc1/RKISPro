import { getSupabase } from "@/lib/db";
import type { CustomerRow } from "@/models/Customer";
import type { MarketplaceRequestRow } from "@/models/MarketplaceRequest";
import type { Payment, PaymentRow } from "@/models/Payment";
import type { Project, ProjectRow } from "@/models/Project";
import type { ProjectFinancial, ProjectFinancialRow } from "@/models/ProjectFinancial";
import type { VendorRow } from "@/models/Vendor";
import type { PaymentDirection, PaymentStatus, PaymentType, Role } from "@/types/auth";
import type { Json } from "@/types/supabase";

function mapPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    projectId: row.project_id,
    customerId: row.customer_id,
    vendorId: row.vendor_id,
    paymentType: row.payment_type,
    paymentDirection: row.payment_direction,
    amount: row.amount,
    status: row.status,
    paymentMethod: row.payment_method,
    referenceNumber: row.reference_number,
    notes: row.notes,
    razorpayOrderId: row.razorpay_order_id,
    razorpayPaymentId: row.razorpay_payment_id,
    razorpaySignature: row.razorpay_signature,
    razorpayStatus: row.razorpay_status,
    failureReason: row.failure_reason,
    gatewayResponse: row.gateway_response,
    createdByRole: row.created_by_role,
    createdById: row.created_by_id,
    paidAt: row.paid_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapFinancial(row: ProjectFinancialRow): ProjectFinancial {
  return {
    id: row.id,
    projectId: row.project_id,
    projectValue: row.project_value,
    advanceReceived: row.advance_received,
    totalReceived: row.total_received,
    vendorPaid: row.vendor_paid,
    commissionPercentage: row.commission_percentage,
    commissionAmount: row.commission_amount,
    pendingCustomerBalance: row.pending_customer_balance,
    pendingVendorPayout: row.pending_vendor_payout,
    profitAmount: row.profit_amount,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

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

export async function ensureProjectFinancial(project: Project) {
  const supabase = getSupabase();
  const projectValue = Number(project.projectValue);
  const commissionPercentage = Number(project.commissionPercentage || 3);
  const commissionAmount = Number(project.commissionAmount || projectValue * (commissionPercentage / 100));

  const { data, error } = await supabase
    .from("project_financials")
    .upsert(
      {
        project_id: project.id,
        project_value: projectValue,
        commission_percentage: commissionPercentage,
        commission_amount: commissionAmount,
        pending_customer_balance: projectValue,
        pending_vendor_payout: Math.max(projectValue - commissionAmount, 0),
        profit_amount: commissionAmount,
        updated_at: new Date().toISOString()
      },
      { onConflict: "project_id" }
    )
    .select("*")
    .single<ProjectFinancialRow>();

  if (error) throw new Error(error.message);
  return mapFinancial(data);
}

export async function recalculateProjectFinancial(projectId: string) {
  const supabase = getSupabase();
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single<ProjectRow>();

  if (projectError) throw new Error(projectError.message);

  const { data: payments, error: paymentError } = await supabase
    .from("payments")
    .select("*")
    .eq("project_id", projectId)
    .eq("status", "paid")
    .returns<PaymentRow[]>();

  if (paymentError) throw new Error(paymentError.message);

  const projectValue = Number(project.project_value);
  const commissionPercentage = Number(project.commission_percentage || 3);
  const commissionAmount = Number(project.commission_amount || projectValue * (commissionPercentage / 100));
  const receivedPayments = payments.filter((payment) =>
    payment.payment_direction === "customer_to_platform" || payment.payment_direction === "customer_to_vendor"
  );
  const totalReceived = receivedPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const advanceReceived = receivedPayments
    .filter((payment) => payment.payment_type === "advance")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const vendorPaid = payments
    .filter((payment) => payment.payment_direction === "platform_to_vendor")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const pendingCustomerBalance = Math.max(projectValue - totalReceived, 0);
  const pendingVendorPayout = Math.max(projectValue - commissionAmount - vendorPaid, 0);
  const profitAmount = Math.max(totalReceived - vendorPaid - pendingCustomerBalance, 0);

  const { data, error } = await supabase
    .from("project_financials")
    .upsert(
      {
        project_id: projectId,
        project_value: projectValue,
        advance_received: advanceReceived,
        total_received: totalReceived,
        vendor_paid: vendorPaid,
        commission_percentage: commissionPercentage,
        commission_amount: commissionAmount,
        pending_customer_balance: pendingCustomerBalance,
        pending_vendor_payout: pendingVendorPayout,
        profit_amount: profitAmount,
        updated_at: new Date().toISOString()
      },
      { onConflict: "project_id" }
    )
    .select("*")
    .single<ProjectFinancialRow>();

  if (error) throw new Error(error.message);
  return mapFinancial(data);
}

export async function createPayment(input: {
  projectId: string;
  paymentType: PaymentType;
  paymentDirection: PaymentDirection;
  amount: number;
  status: PaymentStatus;
  paymentMethod?: string | null;
  referenceNumber?: string | null;
  notes?: string | null;
  createdByRole: Role;
  createdById?: string | null;
  razorpayOrderId?: string | null;
}) {
  const supabase = getSupabase();
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", input.projectId)
    .single<ProjectRow>();

  if (projectError) throw new Error(projectError.message);

  const { data, error } = await supabase
    .from("payments")
    .insert({
      project_id: project.id,
      customer_id: project.customer_id,
      vendor_id: project.vendor_id,
      payment_type: input.paymentType,
      payment_direction: input.paymentDirection,
      amount: input.amount,
      status: input.status,
      payment_method: input.paymentMethod || null,
      reference_number: input.referenceNumber || null,
      notes: input.notes || null,
      razorpay_order_id: input.razorpayOrderId ?? null,
      created_by_role: input.createdByRole,
      created_by_id: input.createdById ?? null,
      paid_at: input.status === "paid" ? new Date().toISOString() : null
    })
    .select("*")
    .single<PaymentRow>();

  if (error) throw new Error(error.message);
  await recalculateProjectFinancial(project.id);
  return mapPayment(data);
}

export async function updatePaymentRazorpayOrder(input: {
  paymentId: string;
  projectId: string;
  razorpayOrderId: string;
  gatewayResponse?: Json | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .update({
      razorpay_order_id: input.razorpayOrderId,
      gateway_response: input.gatewayResponse ?? null,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.paymentId)
    .eq("project_id", input.projectId)
    .select("*")
    .single<PaymentRow>();

  if (error) throw new Error(error.message);
  return mapPayment(data);
}

export async function markPaymentPaid(input: {
  paymentId: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  razorpayStatus?: string | null;
  gatewayResponse?: Json | null;
}) {
  const supabase = getSupabase();
  const { data: current, error: currentError } = await supabase
    .from("payments")
    .select("*")
    .eq("id", input.paymentId)
    .maybeSingle<PaymentRow>();

  if (currentError) throw new Error(currentError.message);
  if (!current) throw new Error("Payment not found");

  if (current.status === "paid") {
    return {
      payment: mapPayment(current),
      changed: false
    };
  }

  const { data, error } = await supabase
    .from("payments")
    .update({
      status: "paid",
      razorpay_order_id: input.razorpayOrderId ?? current.razorpay_order_id,
      razorpay_payment_id: input.razorpayPaymentId ?? current.razorpay_payment_id,
      razorpay_signature: input.razorpaySignature ?? current.razorpay_signature,
      razorpay_status: input.razorpayStatus ?? "captured",
      gateway_response: input.gatewayResponse ?? current.gateway_response,
      failure_reason: null,
      paid_at: current.paid_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", current.id)
    .neq("status", "paid")
    .select("*")
    .maybeSingle<PaymentRow>();

  if (error) throw new Error(error.message);
  if (!data) {
    const { data: refreshed, error: refreshedError } = await supabase
      .from("payments")
      .select("*")
      .eq("id", current.id)
      .single<PaymentRow>();
    if (refreshedError) throw new Error(refreshedError.message);
    return { payment: mapPayment(refreshed), changed: false };
  }

  await recalculateProjectFinancial(data.project_id);
  return {
    payment: mapPayment(data),
    changed: true
  };
}

export async function markPaymentFailed(input: {
  paymentId: string;
  failureReason: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  gatewayResponse?: Json | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .update({
      status: "failed",
      failure_reason: input.failureReason,
      razorpay_order_id: input.razorpayOrderId ?? undefined,
      razorpay_payment_id: input.razorpayPaymentId ?? undefined,
      razorpay_status: "failed",
      gateway_response: input.gatewayResponse ?? null,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.paymentId)
    .neq("status", "paid")
    .select("*")
    .maybeSingle<PaymentRow>();

  if (error) throw new Error(error.message);
  return data ? mapPayment(data) : null;
}

export async function getPendingRazorpayPayment(input: {
  customerId: string;
  projectId: string;
  paymentType: PaymentType;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("customer_id", input.customerId)
    .eq("project_id", input.projectId)
    .eq("payment_type", input.paymentType)
    .eq("payment_method", "razorpay")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<PaymentRow>();

  if (error) throw new Error(error.message);
  return data ? mapPayment(data) : null;
}

export async function getPaymentForCustomer(input: {
  paymentId: string;
  customerId: string;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("id", input.paymentId)
    .eq("customer_id", input.customerId)
    .maybeSingle<PaymentRow>();

  if (error) throw new Error(error.message);
  return data ? mapPayment(data) : null;
}

export async function getPaymentByRazorpayOrderId(orderId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("razorpay_order_id", orderId)
    .maybeSingle<PaymentRow>();

  if (error) throw new Error(error.message);
  return data ? mapPayment(data) : null;
}

export async function updatePaymentStatus(input: {
  paymentId: string;
  projectId: string;
  status: PaymentStatus;
  paymentMethod?: string | null;
  referenceNumber?: string | null;
  notes?: string | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .update({
      status: input.status,
      payment_method: input.paymentMethod || null,
      reference_number: input.referenceNumber || null,
      notes: input.notes || null,
      paid_at: input.status === "paid" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.paymentId)
    .eq("project_id", input.projectId)
    .select("*")
    .single<PaymentRow>();

  if (error) throw new Error(error.message);
  await recalculateProjectFinancial(input.projectId);
  return mapPayment(data);
}

export async function updatePaymentNotes(input: {
  paymentId: string;
  projectId: string;
  notes?: string | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("payments")
    .update({
      notes: input.notes || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.paymentId)
    .eq("project_id", input.projectId)
    .select("*")
    .single<PaymentRow>();

  if (error) throw new Error(error.message);
  return mapPayment(data);
}

export async function getProjectFinanceForRole(input: {
  projectId: string;
  role: "admin" | "customer" | "vendor";
  userId: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("projects")
    .select("*, vendors(*), customers(*), marketplace_requests(*)")
    .eq("id", input.projectId);

  if (input.role === "customer") query = query.eq("customer_id", input.userId);
  if (input.role === "vendor") query = query.eq("vendor_id", input.userId);

  const { data: project, error: projectError } = await query.maybeSingle<
    ProjectRow & { vendors: VendorRow | null; customers: CustomerRow | null; marketplace_requests: MarketplaceRequestRow | null }
  >();

  if (projectError || !project) return null;

  const [financialResult, paymentsResult] = await Promise.all([
    supabase.from("project_financials").select("*").eq("project_id", input.projectId).maybeSingle<ProjectFinancialRow>(),
    supabase.from("payments").select("*").eq("project_id", input.projectId).order("created_at", { ascending: false }).returns<PaymentRow[]>()
  ]);

  if (financialResult.error) throw new Error(financialResult.error.message);
  if (paymentsResult.error) throw new Error(paymentsResult.error.message);

  return {
    project: {
      ...mapProject(project),
      vendor: project.vendors
        ? { id: project.vendors.id, companyName: project.vendors.company_name, location: project.vendors.location }
        : null,
      customer: project.customers
        ? { id: project.customers.id, name: project.customers.name, companyName: project.customers.company_name }
        : null,
      request: project.marketplace_requests
        ? { id: project.marketplace_requests.id, projectTitle: project.marketplace_requests.project_title, serviceType: project.marketplace_requests.service_type }
        : null
    },
    financial: financialResult.data ? mapFinancial(financialResult.data) : await ensureProjectFinancial(mapProject(project)),
    payments: paymentsResult.data.map(mapPayment)
  };
}

export async function getAdminFinance(filters: {
  projectId?: string;
  status?: PaymentStatus | "";
  paymentType?: PaymentType | "";
  dateFrom?: string;
  dateTo?: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("payments")
    .select("*, projects(*, marketplace_requests(*), customers(*), vendors(*))")
    .order("created_at", { ascending: false });

  if (filters.projectId) query = query.eq("project_id", filters.projectId);
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.paymentType) query = query.eq("payment_type", filters.paymentType);
  if (filters.dateFrom) query = query.gte("created_at", filters.dateFrom);
  if (filters.dateTo) query = query.lte("created_at", filters.dateTo);

  const { data, error } = await query.returns<Array<PaymentRow & { projects: (ProjectRow & { marketplace_requests: MarketplaceRequestRow | null; customers: CustomerRow | null; vendors: VendorRow | null }) | null }>>();
  if (error) throw new Error(error.message);

  const { data: financialRows, error: financialError } = await supabase
    .from("project_financials")
    .select("*")
    .returns<ProjectFinancialRow[]>();

  if (financialError) throw new Error(financialError.message);

  const payments = data.map((row) => ({
    ...mapPayment(row),
    project: row.projects
      ? {
          id: row.projects.id,
          title: row.projects.marketplace_requests?.project_title ?? "Project",
          customer: row.projects.customers?.company_name ?? "Customer",
          vendor: row.projects.vendors?.company_name ?? "Vendor"
        }
      : null
  }));
  const financials = financialRows.map(mapFinancial);

  return {
    payments,
    stats: {
      totalProjectValue: financials.reduce((sum, item) => sum + Number(item.projectValue), 0),
      totalAdvances: financials.reduce((sum, item) => sum + Number(item.advanceReceived), 0),
      totalCommissions: financials.reduce((sum, item) => sum + Number(item.commissionAmount), 0),
      pendingVendorPayouts: financials.reduce((sum, item) => sum + Number(item.pendingVendorPayout), 0),
      revenueAnalytics: financials.reduce((sum, item) => sum + Number(item.profitAmount), 0),
      completedPayments: payments.filter((payment) => payment.status === "paid").length,
      pendingPayments: payments.filter((payment) => payment.status === "pending").length
    }
  };
}
