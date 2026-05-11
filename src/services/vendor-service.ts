import { getSupabase } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSupabaseAuthUser, upsertAuthProfile, verifySupabasePassword } from "@/lib/supabase-auth";
import type { VendorProfile, VendorRow } from "@/models/Vendor";
import type { VendorStatus, VendorType, VendorVerificationStatus } from "@/types/auth";

function list(value: string[] | string | null | undefined) {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapVendor(row: VendorRow): VendorProfile {
  return {
    id: row.id,
    companyName: row.company_name,
    ownerName: row.owner_name,
    phone: row.phone,
    email: row.email,
    gstNumber: row.gst_number,
    location: row.location,
    services: list(row.services).join(", "),
    serviceList: list(row.services),
    machinery: list(row.machinery).join(", "),
    machineryList: list(row.machinery),
    capacity: row.capacity,
    workerCount: row.worker_count,
    experienceYears: row.experience_years,
    logoUrl: row.logo_url,
    factoryImages: row.factory_images ?? [],
    status: row.status,
    vendorType: row.vendor_type ?? "company",
    fullName: row.full_name,
    skillCategories: row.skill_categories ?? [],
    serviceRadiusKm: row.service_radius_km,
    availableForQuickBooking: row.available_for_quick_booking ?? true,
    idProofUrl: row.id_proof_url,
    profilePhotoUrl: row.profile_photo_url,
    workshopAddress: row.workshop_address,
    workshopImages: row.workshop_images ?? [],
    availableForLargeWork: row.available_for_large_work ?? true,
    city: row.city,
    state: row.state,
    verificationStatus: row.verification_status ?? (row.status === "Approved" ? "verified" : row.status === "Rejected" ? "rejected" : "pending"),
    verificationNotes: row.verification_notes,
    rating: row.rating ?? 0,
    completedProjectsCount: row.completed_projects_count ?? 0,
    trustScore: row.trust_score ?? 0,
    createdAt: row.created_at
  };
}

export async function createVendor(input: {
  vendorType?: VendorType;
  companyName: string;
  ownerName: string;
  phone: string;
  email: string;
  password: string;
  gstNumber: string;
  location: string;
  services: string | string[];
  machinery: string | string[];
  capacity: string;
  workerCount: number;
  experienceYears: number;
  logoUrl?: string;
  factoryImages: string[];
  fullName?: string;
  skillCategories?: string[];
  serviceRadiusKm?: number | null;
  availableForQuickBooking?: boolean;
  idProofUrl?: string;
  profilePhotoUrl?: string;
  workshopAddress?: string;
  workshopImages?: string[];
  availableForLargeWork?: boolean;
  city?: string;
  state?: string;
  panNumber?: string;
  agreementAccepted?: boolean;
  agreementAcceptedAt?: string;
}) {
  const supabase = getSupabase();
  const email = input.email.toLowerCase();

  const { data: existing } = await supabase
    .from("vendors")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) throw new Error("Vendor already exists");

  const fullName = input.fullName || input.ownerName || input.companyName;
  const authUser = await createSupabaseAuthUser({
    email,
    password: input.password,
    role: "vendor",
    fullName
  });

  if (authUser) {
    await upsertAuthProfile({
      authUserId: authUser.id,
      role: "vendor",
      fullName,
      companyName: input.companyName,
      phone: input.phone,
      city: input.city || input.location || "",
      state: input.state || "",
      status: "pending",
      isApproved: false
    });
  }

  const { data, error } = await supabase
    .from("vendors")
    .insert({
      company_name: input.companyName,
      owner_name: input.ownerName,
      phone: input.phone,
      email,
      password: await hashPassword(input.password),
      gst_number: input.gstNumber || "",
      location: input.location || input.city || "",
      services: list(input.services),
      machinery: list(input.machinery),
      capacity: input.capacity,
      worker_count: input.workerCount,
      experience_years: input.experienceYears,
      logo_url: input.logoUrl ?? null,
      factory_images: input.factoryImages,
      status: "Pending",
      vendor_type: input.vendorType ?? "company",
      full_name: input.fullName || input.ownerName || input.companyName,
      skill_categories: input.skillCategories ?? list(input.services),
      service_radius_km: input.serviceRadiusKm ?? null,
      available_for_quick_booking: input.availableForQuickBooking ?? true,
      id_proof_url: input.idProofUrl ?? null,
      profile_photo_url: input.profilePhotoUrl ?? null,
      workshop_address: input.workshopAddress || input.location || null,
      workshop_images: input.workshopImages ?? input.factoryImages,
      available_for_large_work: input.availableForLargeWork ?? (input.vendorType !== "individual"),
      city: input.city || input.location || null,
      state: input.state || null,
      verification_status: "pending"
    })
    .select("*")
    .single<VendorRow>();

  if (error) throw new Error(error.message);
  await updateVendorAuthMetadata(data.id, {
    pan_number: input.panNumber || null,
    agreement_accepted: input.agreementAccepted ?? false,
    agreement_accepted_at: input.agreementAcceptedAt ?? new Date().toISOString()
  });
  return mapVendor(data);
}

async function updateVendorAuthMetadata(vendorId: string, values: Record<string, unknown>) {
  const supabase = getSupabase() as unknown as {
    from: (table: string) => {
      update: (payload: Record<string, unknown>) => {
        eq: (column: string, value: string) => Promise<{ error: { message: string } | null }>;
      };
    };
  };

  const { error } = await supabase.from("vendors").update(values).eq("id", vendorId);
  if (error) throw new Error(error.message);
}

export async function authenticateVendor(email: string, password: string) {
  const supabase = getSupabase();
  const authUser = await verifySupabasePassword(email.toLowerCase(), password);

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle<VendorRow>();

  if (error || !data) return null;
  if (!authUser && !(await verifyPassword(password, data.password))) return null;
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
  vendorType?: VendorType | "";
  verificationStatus?: VendorVerificationStatus | "";
  city?: string;
}) {
  const supabase = getSupabase();
  let query = supabase.from("vendors").select("*").order("created_at", { ascending: false });

  if (filters.location) query = query.ilike("location", `%${filters.location}%`);
  if (filters.city) query = query.ilike("city", `%${filters.city}%`);
  if (filters.services) query = query.contains("services", [filters.services]);
  if (filters.machinery) query = query.contains("machinery", [filters.machinery]);
  if (filters.vendorType) query = query.eq("vendor_type", filters.vendorType);
  if (filters.verificationStatus) query = query.eq("verification_status", filters.verificationStatus);

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
    .eq("verification_status", "verified")
    .order("created_at", { ascending: false });

  if (filters.location) query = query.or(`location.ilike.%${filters.location}%,city.ilike.%${filters.location}%`);
  if (filters.services) query = query.contains("services", [filters.services]);
  if (filters.machinery) query = query.contains("machinery", [filters.machinery]);
  if (filters.capacity) query = query.ilike("capacity", `%${filters.capacity}%`);

  const { data, error } = await query.returns<VendorRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapVendor);
}

export async function getQuickBookingAssignableVendors(filters: {
  serviceType?: string;
  location?: string;
}) {
  const vendors = await getVendors({
    services: filters.serviceType,
    city: filters.location,
    verificationStatus: "verified"
  });

  return vendors
    .filter((vendor) => vendor.availableForQuickBooking)
    .sort((a, b) => {
      if (a.vendorType !== b.vendorType) return a.vendorType === "individual" ? -1 : 1;
      return b.trustScore - a.trustScore;
    });
}

export async function getLargeWorkVendors(filters: {
  location?: string;
  services?: string;
  machinery?: string;
  capacity?: string;
}) {
  const vendors = await getApprovedVendors(filters);
  return vendors
    .filter((vendor) => vendor.availableForLargeWork)
    .sort((a, b) => {
      if (a.vendorType !== b.vendorType) return a.vendorType === "company" ? -1 : 1;
      return b.trustScore - a.trustScore;
    });
}

export async function updateVendorStatus(vendorId: string, status: VendorStatus) {
  const supabase = getSupabase();
  const verificationStatus: VendorVerificationStatus =
    status === "Approved" ? "verified" : status === "Rejected" ? "rejected" : "pending";

  const { data, error } = await supabase
    .from("vendors")
    .update({ status, verification_status: verificationStatus })
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
