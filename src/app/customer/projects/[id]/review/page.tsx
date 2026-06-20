import { notFound, redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getCustomerFromCookie } from "@/lib/auth";
import { getProjectDetailForRole } from "@/services/project-service";
import { getReviewForProject } from "@/services/review-service";

export const dynamic = "force-dynamic";

export default async function CustomerProjectReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const project = await getProjectDetailForRole({ projectId: id, role: "customer", userId: customer.id });
  
  if (!project) notFound();

  if (project.status !== "completed") {
    return (
      <CustomerLayout title="Leave a Review">
        <Card>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-950">Project Not Completed</h2>
            <p className="mt-2 text-muted">You can only leave a review for completed projects.</p>
            <div className="mt-4">
              <Button href={`/customer/projects/${project.id}`}>Back to Project</Button>
            </div>
          </div>
        </Card>
      </CustomerLayout>
    );
  }

  const existingReview = await getReviewForProject(project.id);

  return (
    <CustomerLayout title="Leave a Review">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-950">Review Vendor: {project.vendor?.companyName || "Vendor"}</h2>
          <Button href={`/customer/projects/${project.id}`} variant="secondary">Back to Project</Button>
        </div>

        <Card>
          {existingReview ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-950">Review Submitted</h3>
              <p className="mt-2 text-sm text-muted">Thank you for leaving a review! Your feedback helps us maintain a high-quality vendor network.</p>
              
              <div className="mt-6 rounded-md border border-line bg-canvas p-4 text-left">
                <div className="flex text-brand-gold text-2xl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < existingReview.rating ? "text-brand-gold" : "text-line"}>★</span>
                  ))}
                </div>
                {existingReview.comment ? (
                  <p className="mt-3 text-sm text-slate-700">{existingReview.comment}</p>
                ) : null}
              </div>
            </div>
          ) : (
            <form action={`/api/customer/projects/${project.id}/review`} method="post" className="grid gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-950">Rate your experience</label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="cursor-pointer">
                      <input type="radio" name="rating" value={rating} className="peer sr-only" required />
                      <div className="rounded-md border border-line px-4 py-2 text-center text-xl peer-checked:border-brand-gold peer-checked:bg-amber-50 peer-checked:text-brand-gold hover:bg-canvas">
                        {rating} ★
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-950" htmlFor="comment">
                  Review Comment (Optional)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-line px-3 py-2 text-sm placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="Share details of your experience with this vendor..."
                />
              </div>

              <div>
                <Button type="submit" className="w-full">Submit Review</Button>
              </div>
              
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.currentScript.parentElement.addEventListener('submit', async (e) => {
                      e.preventDefault();
                      const form = e.target;
                      const button = form.querySelector('button[type="submit"]');
                      const originalText = button.textContent;
                      button.disabled = true;
                      button.textContent = 'Submitting...';
                      
                      try {
                        const formData = new FormData(form);
                        const rating = parseInt(formData.get('rating'));
                        const comment = formData.get('comment');
                        
                        const res = await fetch(form.action, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ rating, comment })
                        });
                        
                        if (!res.ok) {
                          const error = await res.json();
                          throw new Error(error.error || 'Failed to submit review');
                        }
                        
                        window.location.reload();
                      } catch (err) {
                        alert(err.message);
                        button.disabled = false;
                        button.textContent = originalText;
                      }
                    });
                  `
                }}
              />
            </form>
          )}
        </Card>
      </div>
    </CustomerLayout>
  );
}
