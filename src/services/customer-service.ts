import { getSupabase } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import type { CustomerProfile, CustomerRow } from "@/models/Customer";

function mapCustomer(row: CustomerRow): CustomerProfile {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    companyName: row.company_name,
    location: row.location,
    createdAt: row.created_at
  };
}

export async function createCustomer(input: {
  name: string;
  phone: string;
  email: string;
  password: string;
  companyName: string;
  location: string;
}) {
  const supabase = getSupabase();
  const email = input.email.toLowerCase();

  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) throw new Error("Customer already exists");

  const { data, error } = await supabase
    .from("customers")
    .insert({
      name: input.name,
      phone: input.phone,
      email,
      password: await hashPassword(input.password),
      company_name: input.companyName,
      location: input.location
    })
    .select("*")
    .single<CustomerRow>();

  if (error) throw new Error(error.message);
  return mapCustomer(data);
}

export async function authenticateCustomer(email: string, password: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle<CustomerRow>();

  if (error || !data || !(await verifyPassword(password, data.password))) return null;
  return mapCustomer(data);
}

export async function getCustomerById(id: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle<CustomerRow>();

  if (error || !data) return null;
  return mapCustomer(data);
}
