import { getSupabase } from "@/lib/db";
import type { CustomerRow } from "@/models/Customer";
import type { QuickBooking, QuickBookingRow } from "@/models/QuickBooking";
import type { VendorRow } from "@/models/Vendor";
import type { QuickBookingServiceType, QuickBookingStatus, QuickBookingUrgency } from "@/types/auth";

export const quickBookingServiceTypes: QuickBookingServiceType[] = [
  "welder",
  "mechanic",
  "repair",
  "installer",
  "maintenance",
  "electrician",
  "plumber",
  "helper"
];

export const quickBookingUrgencies: QuickBookingUrgency[] = ["normal", "urgent", "emergency"];
export const quickBookingStatuses: QuickBookingStatus[] = ["pending", "assigned", "accepted", "in_progress", "completed", "cancelled"];

export function mapQuickBooking(row: QuickBookingRow): QuickBooking {
  return {
    id: row.id,
    customerId: row.customer_id,
    serviceType: row.service_type,
    title: row.title,
    description: row.description,
    location: row.location,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    urgency: row.urgency,
    budget: row.budget,
    images: row.images ?? [],
    status: row.status,
    assignedVendorId: row.assigned_vendor_id,
    assignedWorkerName: row.assigned_worker_name,
    assignedWorkerPhone: row.assigned_worker_phone,
    adminNotes: row.admin_notes,
    vendorNotes: row.vendor_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function withRelations(row: QuickBookingRow & { customers?: CustomerRow | null; vendors?: VendorRow | null }) {
  return {
    ...mapQuickBooking(row),
    customer: row.customers
      ? { id: row.customers.id, name: row.customers.name, companyName: row.customers.company_name, phone: row.customers.phone, email: row.customers.email }
      : null,
    vendor: row.vendors
      ? { id: row.vendors.id, companyName: row.vendors.company_name, ownerName: row.vendors.owner_name, phone: row.vendors.phone, location: row.vendors.location }
      : null
  };
}

export async function createQuickBooking(input: {
  customerId: string;
  serviceType: QuickBookingServiceType;
  title: string;
  description?: string | null;
  location: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  urgency: QuickBookingUrgency;
  budget?: number | null;
  images: string[];
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("quick_bookings")
    .insert({
      customer_id: input.customerId,
      service_type: input.serviceType,
      title: input.title,
      description: input.description || null,
      location: input.location,
      preferred_date: input.preferredDate || null,
      preferred_time: input.preferredTime || null,
      urgency: input.urgency,
      budget: input.budget ?? null,
      images: input.images,
      status: "pending"
    })
    .select("*")
    .single<QuickBookingRow>();

  if (error) throw new Error(error.message);
  return mapQuickBooking(data);
}

export async function getCustomerQuickBookings(customerId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("quick_bookings")
    .select("*, vendors(*)")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .returns<Array<QuickBookingRow & { vendors: VendorRow | null }>>();

  if (error) throw new Error(error.message);
  return data.map(withRelations);
}

export async function getQuickBookingForRole(input: {
  bookingId: string;
  role: "customer" | "vendor" | "admin";
  userId: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("quick_bookings")
    .select("*, customers(*), vendors(*)")
    .eq("id", input.bookingId);

  if (input.role === "customer") query = query.eq("customer_id", input.userId);
  if (input.role === "vendor") query = query.eq("assigned_vendor_id", input.userId);

  const { data, error } = await query.maybeSingle<QuickBookingRow & { customers: CustomerRow | null; vendors: VendorRow | null }>();
  if (error || !data) return null;
  return withRelations(data);
}

export async function getAdminQuickBookings(filters: {
  status?: QuickBookingStatus | "";
  serviceType?: QuickBookingServiceType | "";
  urgency?: QuickBookingUrgency | "";
  location?: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("quick_bookings")
    .select("*, customers(*), vendors(*)")
    .order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.serviceType) query = query.eq("service_type", filters.serviceType);
  if (filters.urgency) query = query.eq("urgency", filters.urgency);
  if (filters.location) query = query.ilike("location", `%${filters.location}%`);

  const { data, error } = await query.returns<Array<QuickBookingRow & { customers: CustomerRow | null; vendors: VendorRow | null }>>();
  if (error) throw new Error(error.message);
  return data.map(withRelations);
}

export async function getVendorQuickBookings(vendorId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("quick_bookings")
    .select("*, customers(*), vendors(*)")
    .eq("assigned_vendor_id", vendorId)
    .order("created_at", { ascending: false })
    .returns<Array<QuickBookingRow & { customers: CustomerRow | null; vendors: VendorRow | null }>>();

  if (error) throw new Error(error.message);
  return data.map(withRelations);
}

export async function updateQuickBookingAssignment(input: {
  bookingId: string;
  status: QuickBookingStatus;
  assignedVendorId?: string | null;
  assignedWorkerName?: string | null;
  assignedWorkerPhone?: string | null;
  adminNotes?: string | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("quick_bookings")
    .update({
      status: input.status,
      assigned_vendor_id: input.assignedVendorId || null,
      assigned_worker_name: input.assignedWorkerName || null,
      assigned_worker_phone: input.assignedWorkerPhone || null,
      admin_notes: input.adminNotes || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.bookingId)
    .select("*")
    .single<QuickBookingRow>();

  if (error) throw new Error(error.message);
  return mapQuickBooking(data);
}

export async function updateQuickBookingStatus(input: {
  bookingId: string;
  status: QuickBookingStatus;
  vendorId?: string;
  vendorNotes?: string | null;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("quick_bookings")
    .update({
      status: input.status,
      ...(input.vendorNotes !== undefined ? { vendor_notes: input.vendorNotes || null } : {}),
      updated_at: new Date().toISOString()
    })
    .eq("id", input.bookingId);

  if (input.vendorId) query = query.eq("assigned_vendor_id", input.vendorId);

  const { data, error } = await query.select("*").single<QuickBookingRow>();
  if (error) throw new Error(error.message);
  return mapQuickBooking(data);
}
