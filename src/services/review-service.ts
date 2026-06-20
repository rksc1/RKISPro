import { getSupabase } from "@/lib/db";
import type { Review, ReviewRow } from "@/models/Review";

function mapReview(row: ReviewRow): Review {
  return {
    id: row.id,
    projectId: row.project_id,
    customerId: row.customer_id,
    vendorId: row.vendor_id,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at
  };
}

export async function submitReview(input: {
  projectId: string;
  customerId: string;
  rating: number;
  comment?: string;
}) {
  const supabase = getSupabase();

  // Validate that the project exists, belongs to the customer, and is completed
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, status, vendor_id")
    .eq("id", input.projectId)
    .eq("customer_id", input.customerId)
    .single();

  if (projectError || !project) {
    throw new Error("Project not found");
  }

  if (project.status !== "completed") {
    throw new Error("Only completed projects can be reviewed");
  }

  // Insert the review
  const { data: review, error: reviewError } = await supabase
    .from("reviews")
    .insert({
      project_id: input.projectId,
      customer_id: input.customerId,
      vendor_id: project.vendor_id,
      rating: input.rating,
      comment: input.comment || null
    })
    .select("*")
    .single<ReviewRow>();

  if (reviewError) {
    if (reviewError.code === "23505") {
      throw new Error("You have already reviewed this project");
    }
    throw new Error(reviewError.message);
  }

  // Recalculate vendor stats
  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("vendor_id", project.vendor_id);

  if (reviewsError) throw new Error("Failed to recalculate vendor stats");

  const completedProjectsCount = reviews.length; // Approximate, assumes 1 review per completed project
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (completedProjectsCount || 1);

  // Simple trust score logic: Base 50 + (Rating * 5) + (Projects * 2), capped at 100
  let trustScore = 50 + (avgRating * 5) + (completedProjectsCount * 2);
  if (trustScore > 100) trustScore = 100;

  // Update vendor
  const { error: updateError } = await supabase
    .from("vendors")
    .update({
      rating: avgRating,
      completed_projects_count: completedProjectsCount,
      trust_score: trustScore
    })
    .eq("id", project.vendor_id);

  if (updateError) throw new Error("Failed to update vendor trust score");

  return mapReview(review);
}

export async function getReviewForProject(projectId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("project_id", projectId)
    .maybeSingle<ReviewRow>();

  if (error) return null;
  return data ? mapReview(data) : null;
}

export async function getVendorReviews(vendorId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      project_id,
      customer_id,
      vendor_id,
      rating,
      comment,
      created_at,
      customers (
        name,
        company_name
      )
    `)
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) return [];
  
  return data.map((row: {
    id: string;
    project_id: string;
    customer_id: string;
    vendor_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    customers: { name: string; company_name: string } | null;
  }) => ({
    id: row.id,
    projectId: row.project_id,
    customerId: row.customer_id,
    vendorId: row.vendor_id,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
    customer: {
      name: row.customers?.name,
      companyName: row.customers?.company_name
    }
  }));
}
