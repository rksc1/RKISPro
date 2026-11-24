/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { VendorCapabilityCard } from "@/components/ui/VendorCapabilityCard";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { getCustomerFromCookie } from "@/lib/auth";
import { getVendorById } from "@/services/vendor-service";
import { getVendorReviews } from "@/services/review-service";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  MapPin,
  ShieldCheck,
  Star,
  Wrench
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerVendorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const vendor = await getVendorById(id);
  
  if (!vendor) notFound();

  const reviews = await getVendorReviews(vendor.id).catch(() => []);
  const location = [vendor.city, vendor.state].filter(Boolean).join(", ") || vendor.location;
  const images = vendor.workshopImages.length > 0 ? vendor.workshopImages : vendor.factoryImages;
  const displayName = vendor.vendorType === "individual" ? vendor.fullName || vendor.ownerName : vendor.companyName;
  const isVerified = vendor.verificationStatus === "verified" || vendor.status === "Approved";

  return (
    <CustomerLayout title="Contractor Profile & Facility">
      <div className="grid gap-6">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/customer/vendors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Verified Directory</span>
          </Link>

          <div className="flex items-center gap-2">
            {vendor.availableForQuickBooking && (
              <Button href="/customer/quick-booking/new" variant="secondary" className="text-xs">
                Book Service Visit
              </Button>
            )}
            <Button href="/customer/request/new" className="text-xs gap-1">
              <span>Post Requirement</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info Column */}
          <div className="lg:col-span-2 grid gap-6">
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {vendor.logoUrl || vendor.profilePhotoUrl ? (
                    <img
                      src={vendor.logoUrl || vendor.profilePhotoUrl || ""}
                      alt="Vendor profile"
                      className="size-16 rounded-2xl border border-slate-200 object-cover shadow-2xs"
                    />
                  ) : (
                    <div className="flex size-16 items-center justify-center rounded-2xl border border-slate-200 bg-teal-50 text-2xl font-black text-teal-800 shadow-2xs">
                      {(displayName || "V").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <VendorTypeBadge type={vendor.vendorType} />
                      <VerifiedBadge badge={vendor.verifiedBadge} size="md" />
                      {isVerified && !vendor.verifiedBadge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-black uppercase tracking-wide text-emerald-800 border border-emerald-200">
                          <ShieldCheck className="size-3.5 text-emerald-600" />
                          Verified Facility
                        </span>
                      )}
                    </div>
                    <h1 className="mt-2 text-2xl font-black text-slate-950">
                      {displayName}
                    </h1>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="size-4 text-teal-600" />
                      {location}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-3 text-center sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Trust Score</span>
                  <p className="text-xl font-black text-teal-950">{vendor.trustScore || 85}/100</p>
                </div>
              </div>

              {/* Facility Metrics */}
              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Experience</span>
                  <strong className="mt-1 block text-lg font-black text-slate-900">{vendor.experienceYears} Years</strong>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Workforce</span>
                  <strong className="mt-1 block text-lg font-black text-slate-900">{vendor.workerCount} Workers</strong>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Completed Jobs</span>
                  <strong className="mt-1 block text-lg font-black text-slate-900">{vendor.completedProjectsCount}+</strong>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Rating</span>
                  <strong className="mt-1 flex items-center gap-1 text-lg font-black text-slate-900">
                    <Star className="size-4 fill-amber-400 text-amber-500" />
                    {vendor.rating > 0 ? vendor.rating.toFixed(1) : "4.8"}
                  </strong>
                </div>
              </div>

              {/* Machinery & Capacity */}
              <div className="mt-6 border-t border-slate-100 pt-5 grid gap-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Audited Machinery & Shop Floor</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {vendor.machineryList.map((m) => (
                      <span key={m} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-3xs">
                        <Wrench className="size-3.5 text-teal-600" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {vendor.capacity && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Production / Monthly Capacity</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{vendor.capacity}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Photos Strip */}
            {images.length > 0 ? (
              <Card>
                <h3 className="text-base font-bold text-slate-900">Factory & Workshop Gallery ({images.length})</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {images.map((img, i) => (
                    <a key={i} href={img} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img src={img} alt={`Workshop ${i + 1}`} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  ))}
                </div>
              </Card>
            ) : null}

            {/* Reviews Section */}
            <Card>
              <h3 className="text-base font-bold text-slate-900">Verified Client Reviews</h3>
              {reviews.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-sm text-slate-500">
                  No direct reviews yet. Client reviews appear automatically after milestone completion.
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{review.customer?.companyName || review.customer?.name}</span>
                          <span className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-amber-500" : "text-slate-200"}>★</span>
                          ))}
                        </div>
                      </div>
                      {review.comment ? (
                        <p className="mt-2 text-sm text-slate-700 leading-relaxed">&quot;{review.comment}&quot;</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Engagement & Capabilities */}
          <div className="grid gap-6 content-start">
            {/* Direct Action Card */}
            <Card className="border-teal-500/30 bg-gradient-to-b from-teal-500/[0.04] to-transparent">
              <h3 className="text-base font-bold text-slate-900">Engage Contractor</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Connect with this verified facility through RKISPro&apos;s managed procurement workflow.
              </p>

              <div className="mt-4 grid gap-2.5">
                <Button href="/customer/request/new" className="w-full gap-2">
                  <span>Post Managed RFQ</span>
                  <ArrowRight className="size-4" />
                </Button>

                {vendor.availableForQuickBooking && (
                  <Button href="/customer/quick-booking/new" variant="secondary" className="w-full gap-2">
                    <Wrench className="size-4" />
                    <span>Book Urgent Site Visit</span>
                  </Button>
                )}
              </div>

              <div className="mt-5 rounded-xl border border-teal-200/80 bg-teal-50/60 p-3.5 text-xs text-teal-900 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-teal-950">
                  <Lock className="size-3.5 text-teal-700" />
                  Escrow Protected
                </div>
                <p className="mt-1">
                  100% of payments are held in RKISPro Nodal Escrow and only released upon your milestone inspection sign-off.
                </p>
              </div>
            </Card>

            <VendorCapabilityCard vendor={vendor} />
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
