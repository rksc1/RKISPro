import type { MarketplaceRequestStatus } from "@/types/auth";

export type MarketplaceRequestRow = {
  id: string;
  customer_id: string;
  project_title: string;
  description: string;
  service_type: string;
  material_type: string;
  location: string;
  deadline: string;
  drawing_urls: string[];
  status: MarketplaceRequestStatus;
  created_at: string;
};

export type MarketplaceRequest = {
  id: string;
  customerId: string;
  projectTitle: string;
  description: string;
  serviceType: string;
  materialType: string;
  location: string;
  deadline: string;
  drawingUrls: string[];
  status: MarketplaceRequestStatus;
  createdAt: string;
};
