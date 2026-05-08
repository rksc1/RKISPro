import type { VendorStatus } from "@/types/auth";

export type VendorRow = {
  id: string;
  company_name: string;
  owner_name: string;
  phone: string;
  email: string;
  password: string;
  gst_number: string;
  location: string;
  services: string;
  machinery: string;
  capacity: string;
  worker_count: number;
  experience_years: number;
  logo_url: string | null;
  factory_images: string[];
  status: VendorStatus;
  created_at: string;
};

export type VendorProfile = {
  id: string;
  companyName: string;
  ownerName: string;
  phone: string;
  email: string;
  gstNumber: string;
  location: string;
  services: string;
  machinery: string;
  capacity: string;
  workerCount: number;
  experienceYears: number;
  logoUrl: string | null;
  factoryImages: string[];
  status: VendorStatus;
  createdAt: string;
};
