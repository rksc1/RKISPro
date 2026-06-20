/* eslint-disable @next/next/no-img-element */
import { notFound, redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { VendorCapabilityCard } from "@/components/ui/VendorCapabilityCard";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
import { getCustomerFromCookie } from "@/lib/auth";
import { getVendorById } from "@/services/vendor-service";
import { getVendorReviews } from "@/services/review-service";

export const dynamic = "force-dynamic";

export default async function CustomerVendorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const vendor = await getVendorById(id);
  
  if (!vendor) notFound();

  // Load reviews using the review-service (which we need to implement/check)
  const reviews = await getVendorReviews(vendor.id).catch(() => []);

  const location = [vendor.city, vendor.state].filter(Boolean).join(", ") || vendor.location;
  const images = vendor.workshopImages.length > 0 ? vendor.workshopImages : vendor.factoryImages;

  return (
    <CustomerLayout title="Vendor Profile">
      <div className="flex justify-end">
        <Button href="javascript:history.back()" variant="secondary">Go Back</Button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                {vendor.logoUrl || vendor.profilePhotoUrl ? (
                  <img
                    src={vendor.logoUrl || vendor.profilePhotoUrl || ""}
                    alt="Vendor profile"
                    className="h-16 w-16 rounded-full border border-line object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-canvas text-xl font-black text-muted">
                    {(vendor.companyName || vendor.fullName || "V").charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <VendorTypeBadge type={vendor.vendorType} />
                    {vendor.verificationStatus === "verified" ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-800">
                        Verified
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    {vendor.vendorType === "individual" ? vendor.fullName : vendor.companyName}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{location}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div className="rounded-lg border border-line p-4">
                <span className="text-xs font-bold uppercase tracking-wide text-muted">Experience</span>
                <strong className="mt-1 block text-lg text-slate-950">{vendor.experienceYears} Years</strong>
              </div>
              <div className="rounded-lg border border-line p-4">
                <span className="text-xs font-bold uppercase tracking-wide text-muted">Workforce</span>
                <strong className="mt-1 block text-lg text-slate-950">{vendor.workerCount} Workers</strong>
              </div>
              {vendor.vendorType === "company" ? (
                <>
                  <div className="rounded-lg border border-line p-4">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted">Machinery</span>
                    <strong className="mt-1 block text-sm text-slate-950">{vendor.machineryList.join(", ")}</strong>
                  </div>
                  <div className="rounded-lg border border-line p-4">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted">Capacity</span>
                    <strong className="mt-1 block text-sm text-slate-950">{vendor.capacity}</strong>
                  </div>
                </>
              ) : null}
            </div>
          </Card>

          {images.length > 0 ? (
            <Card>
              <h3 className="text-lg font-black text-slate-950">Factory & Workshop Photos</h3>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {images.map((img, i) => (
                  <a key={i} href={img} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md border border-line">
                    <img src={img} alt={`Workshop ${i + 1}`} className="aspect-video w-full object-cover transition-transform hover:scale-105" />
                  </a>
                ))}
              </div>
            </Card>
          ) : null}

          <Card>
            <h3 className="text-lg font-black text-slate-950">Customer Reviews</h3>
            {reviews.length === 0 ? (
              <div className="mt-4 rounded-md bg-canvas p-6 text-center text-sm text-muted">
                No reviews yet. Be the first to leave a review after completing a project!
              </div>
            ) : (
              <div className="mt-4 grid gap-3">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-md border border-line p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-950">{review.customer?.companyName || review.customer?.name}</span>
                        <span className="text-xs text-muted">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-brand-gold">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-brand-gold" : "text-line"}>★</span>
                        ))}
                      </div>
                    </div>
                    {review.comment ? (
                      <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div>
          <VendorCapabilityCard vendor={vendor} />
        </div>
      </div>
    </CustomerLayout>
  );
}
