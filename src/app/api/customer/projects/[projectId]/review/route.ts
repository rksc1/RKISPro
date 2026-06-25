import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { submitReview } from "@/services/review-service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  const body = await request.json().catch(() => null);

  const rating = Number(body?.rating);
  const comment = body?.comment?.toString();

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating. Must be between 1 and 5." }, { status: 400 });
  }

  try {
    const review = await submitReview({
      projectId,
      customerId: customer.id,
      rating,
      comment
    });
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit review" },
      { status: 400 }
    );
  }
}
