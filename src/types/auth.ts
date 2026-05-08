export type Role = "customer" | "vendor" | "admin";

export type SessionPayload = {
  id: string;
  role: Role;
  name: string;
  email: string;
};

export type VendorStatus = "Pending" | "Approved" | "Rejected" | "Inactive";

export type MarketplaceRequestStatus = "Pending" | "Approved" | "Rejected" | "Distributed" | "awarded";

export type VendorNotificationStatus = "Sent" | "Viewed" | "Quoted" | "awarded";

export type VendorQuoteStatus = "pending" | "approved" | "rejected" | "selected" | "not_selected";

export type ProjectStatus = "awarded" | "in_progress" | "on_hold" | "completed" | "cancelled";

export type MilestoneStatus = "pending" | "in_progress" | "completed" | "delayed" | "cancelled";

export type MilestoneCreatorRole = "admin" | "vendor";

export type NotificationType = "info" | "success" | "warning" | "error";

export type ActivityEntityType = "rfq" | "quote" | "project" | "milestone" | "vendor";
