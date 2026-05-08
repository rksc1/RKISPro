import { getSupabase } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import type { VendorProfile, VendorRow } from "@/models/Vendor";
import type { VendorStatus } from "@/types/auth";

function mapVendor(row: VendorRow): VendorProfile {
  return {
    id: row.id,
    companyName: row.company_name,
    ownerName: row.owner_name,
    phone: row.phone,
    email: row.email,
    gstNumber: row.gst_number,
    location: row.location,
    services: row.services,
    machinery: row.machinery,
    capacity: row.capacity,
    workerCount: row.worker_count,
    experienceYears: row.experience_years,
    logoUrl: row.logo_url,
    factoryImages: row.factory_images ?? [],
    status: row.status,
    createdAt: row.created_at
  };
}

export async function createVendor(input: {
  companyName: string;
  ownerName: string;
  phone: string;
  email: string;
  password: string;
  gstNumber: string;
  location: string;
  services: string;
  machinery: string;
  capacity: string;
  workerCount: number;
  experienceYears: number;
  logoUrl?: string;
  factoryImages: string[];
}) {
  const supabase = getSupabase();
  const email = input.email.toLowerCase();

  const { data: existing } = await supabase
    .from("vendors")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) throw new Error("Vendor already exists");

  const { data, error } = await supabase
    .from("vendors")
    .insert({
      company_name: input.companyName,
      owner_name: input.ownerName,
      phone: input.phone,
      email,
      password: await hashPassword(input.password),
      gst_number: input.gstNumber,
      location: input.location,
      services: input.services,
      machinery: input.machinery,
      capacity: input.capacity,
      worker_count: input.workerCount,
      experience_years: input.experienceYears,
      logo_url: input.logoUrl ?? null,
      factory_images: input.factoryImages,
      status: "Pending"
    })
    .select("*")
    .single<VendorRow>();

  if (error) throw new Error(error.message);
  return mapVendor(data);
}

export async function authenticateVendor(email: string, password: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle<VendorRow>();

  if (error || !data || !(await verifyPassword(password, data.password))) return null;
  return mapVendor(data);
}

export async function getVendorById(id: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .maybeSingle<VendorRow>();

  if (error || !data) return null;
  return mapVendor(data);
}

export async function getVendors(filters: {
  location?: string;
  services?: string;
  machinery?: string;
}) {
  const supabase = getSupabase();
  let query = supabase.from("vendors").select("*").order("created_at", { ascending: false });

  if (filters.location) query = query.ilike("location", `%${filters.location}%`);
  if (filters.services) query = query.ilike("services", `%${filters.services}%`);
  if (filters.machinery) query = query.ilike("machinery", `%${filters.machinery}%`);

  const { data, error } = await query.returns<VendorRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapVendor);
}

export async function getApprovedVendors(filters: {
  location?: string;
  services?: string;
  machinery?: string;
  capacity?: string;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("vendors")
    .select("*")
    .eq("status", "Approved")
    .order("created_at", { ascending: false });

  if (filters.location) query = query.ilike("location", `%${filters.location}%`);
  if (filters.services) query = query.ilike("services", `%${filters.services}%`);
  if (filters.machinery) query = query.ilike("machinery", `%${filters.machinery}%`);
  if (filters.capacity) query = query.ilike("capacity", `%${filters.capacity}%`);

  const { data, error } = await query.returns<VendorRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapVendor);
}

export async function updateVendorStatus(vendorId: string, status: VendorStatus) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendors")
    .update({ status })
    .eq("id", vendorId)
    .select("*")
    .single<VendorRow>();

  if (error) throw new Error(error.message);
  return mapVendor(data);
}

export async function isApprovedVendor(vendorId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vendors")
    .select("status")
    .eq("id", vendorId)
    .maybeSingle<{ status: VendorStatus }>();

  return !error && data?.status === "Approved";
}

export async function getApprovedVendorIds(vendorIds: string[]) {
  if (vendorIds.length === 0) return [];

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vendors")
    .select("id")
    .eq("status", "Approved")
    .in("id", vendorIds)
    .returns<{ id: string }[]>();

  if (error) throw new Error(error.message);
  return data.map((vendor) => vendor.id);
}
