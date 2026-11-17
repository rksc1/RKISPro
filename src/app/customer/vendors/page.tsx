/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
import { getCustomerFromCookie } from "@/lib/auth";
import { getDirectoryVendors } from "@/services/vendor-service";
import type { VendorType } from "@/types/auth";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
  Wrench,
  Zap
} from "lucide-react";

export const dynamic = "force-dynamic";

const popularServices = [
  "All",
  "Fabrication",
  "Welding",
  "CNC",
  "Machining",
  "Repair",
  "Electrical",
  "Maintenance"
];

const popularCities = ["All Cities", "Bilaspur", "Raipur", "Korba", "Durg", "Pune", "Bengaluru"];

export default async function CustomerVendorsDirectoryPage({
  searchParams
}: {
  searchParams: Promise<{
    q?: string;
    city?: string;
    type?: string;
    service?: string;
  }>;
}) {
  const customer = await getCustomerFromCookie();
  if (!customer) return null;

  const params = await searchParams;
  const searchTerm = params.q?.trim() || "";
  const selectedCity = params.city && params.city !== "All Cities" ? params.city : "";
  const selectedType = (params.type === "company" || params.type === "individual" ? params.type : "") as VendorType | "";
  const selectedService = params.service && params.service !== "All" ? params.service : "";

  const vendors = await getDirectoryVendors({
    search: searchTerm,
    city: selectedCity,
    vendorType: selectedType,
    service: selectedService
  });

  return (
    <CustomerLayout title="Verified Contractor Network">
      <div className="grid gap-6">
        {/* Hero Banner with Trust Proposition */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 p-6 text-white shadow-xl sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/20">
              <ShieldCheck className="size-3.5 text-teal-400" />
              100% Verified Industrial Facilities
            </span>
            <h1 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">
              Audited Fabricators, CNC Centers & Specialists
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed sm:text-base">
              Browse pre-screened manufacturing workshops with inspected machinery, verified GST, and audited technical workforce. Every engagement is protected by RKISPro milestone escrow.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-teal-400" />
                Physical Shop-Floor Verification
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-teal-400" />
                Verified GSTIN & MSME
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-teal-400" />
                Milestone Escrow Clearance
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <Card className="p-4 sm:p-5">
          <form method="get" className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-12">
              {/* Keyword Search */}
              <div className="relative sm:col-span-6">
                <Search className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
                <input
                  type="text"
                  name="q"
                  defaultValue={searchTerm}
                  placeholder="Search by company name, machinery (e.g. CNC, Laser), or skill..."
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm font-normal text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                />
              </div>

              {/* City Filter */}
              <div className="sm:col-span-3">
                <select
                  name="city"
                  defaultValue={selectedCity || "All Cities"}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  {popularCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contractor Type Filter */}
              <div className="sm:col-span-3">
                <select
                  name="type"
                  defaultValue={selectedType || ""}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  <option value="">All Contractor Types</option>
                  <option value="company">Industrial Companies & Plants</option>
                  <option value="individual">Individual Specialists & Techs</option>
                </select>
              </div>
            </div>

            {/* Quick Service Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
                <Filter className="size-3" />
                Category:
              </span>
              {popularServices.map((service) => {
                const isActive = (service === "All" && !selectedService) || selectedService === service;
                return (
                  <button
                    key={service}
                    type="submit"
                    name="service"
                    value={service === "All" ? "" : service}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                      isActive
                        ? "bg-teal-600 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {service}
                  </button>
                );
              })}

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-teal-700 transition"
                >
                  Apply Filters
                </button>
                {(searchTerm || selectedCity || selectedType || selectedService) && (
                  <Link
                    href="/customer/vendors"
                    className="text-xs font-semibold text-slate-500 hover:text-red-600 transition"
                  >
                    Clear All
                  </Link>
                )}
              </div>
            </div>
          </form>
        </Card>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Showing {vendors.length} verified contractor(s)</span>
          <span>Sorted by Trust Score & Track Record</span>
        </div>

        {/* Vendors Grid */}
        {vendors.length === 0 ? (
          <Card className="text-center py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Building2 className="size-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">No Matching Contractors Found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 leading-relaxed">
              We couldn&apos;t find verified vendors matching your exact filters. Try broadening your search or post your requirement directly so our engineering team can source matching vendors.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/customer/vendors"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                Reset Filters
              </Link>
              <Button href="/customer/request/new" className="gap-2">
                <span>Post Requirement Instead</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {vendors.map((vendor) => {
              const displayName = vendor.vendorType === "individual" ? vendor.fullName || vendor.ownerName : vendor.companyName;
              const locationStr = [vendor.city, vendor.state].filter(Boolean).join(", ") || vendor.location;
              const images = vendor.workshopImages?.length > 0 ? vendor.workshopImages : vendor.factoryImages ?? [];
              const isVerified = vendor.verificationStatus === "verified" || vendor.status === "Approved";

              return (
                <Card
                  key={vendor.id}
                  className="flex flex-col justify-between transition hover:border-teal-500/50 hover:shadow-md"
                >
                  <div className="grid gap-4">
                    {/* Top Row: Avatar, Identity, Verification */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-teal-50 to-slate-100 text-xl font-black text-teal-800 shadow-2xs">
                          {displayName?.charAt(0).toUpperCase() || "V"}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <VendorTypeBadge type={vendor.vendorType} />
                            {isVerified && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 border border-emerald-200">
                                <ShieldCheck className="size-3 text-emerald-600" />
                                Verified Facility
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/customer/vendors/${vendor.id}`}
                            className="mt-1 block text-lg font-bold text-slate-900 hover:text-teal-600 transition"
                          >
                            {displayName}
                          </Link>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="size-3 text-teal-600" />
                            {locationStr}
                          </span>
                        </div>
                      </div>

                      {/* Trust Score Badge */}
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                          <Zap className="size-3 text-teal-600" />
                          <span>Trust: {vendor.trustScore || 80}/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-2.5 text-center text-xs">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Rating</span>
                        <div className="mt-0.5 flex items-center justify-center gap-1 font-bold text-slate-900">
                          <Star className="size-3.5 fill-amber-400 text-amber-500" />
                          <span>{vendor.rating > 0 ? vendor.rating.toFixed(1) : "4.8"}</span>
                        </div>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Completed</span>
                        <div className="mt-0.5 font-bold text-slate-900">
                          {vendor.completedProjectsCount || 6}+ Jobs
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Team</span>
                        <div className="mt-0.5 font-bold text-slate-900 flex items-center justify-center gap-1">
                          <Users className="size-3 text-slate-500" />
                          <span>{vendor.workerCount || 4} Staff</span>
                        </div>
                      </div>
                    </div>

                    {/* Machinery / Capability Chips */}
                    {vendor.machineryList?.length > 0 && (
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Key Machinery & Equipment:
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {vendor.machineryList.slice(0, 4).map((machine) => (
                            <span
                              key={machine}
                              className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200 shadow-3xs"
                            >
                              <Wrench className="size-3 text-teal-600" />
                              {machine}
                            </span>
                          ))}
                          {vendor.machineryList.length > 4 && (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                              +{vendor.machineryList.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Services Chips */}
                    {vendor.serviceList?.length > 0 && (
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Specializations:
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {vendor.serviceList.slice(0, 4).map((service) => (
                            <span
                              key={service}
                              className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800 border border-teal-100"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Workshop Images Strip */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {images.slice(0, 3).map((img, i) => (
                          <div
                            key={i}
                            className="aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                          >
                            <img
                              src={img}
                              alt={`${displayName} workshop view ${i + 1}`}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <Link
                      href={`/customer/vendors/${vendor.id}`}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 transition"
                    >
                      View Full Facility Details →
                    </Link>

                    <div className="flex items-center gap-2">
                      {vendor.availableForQuickBooking && (
                        <Button href="/customer/quick-booking/new" variant="secondary" className="text-xs py-1.5 px-3">
                          Book Visit
                        </Button>
                      )}
                      <Button href="/customer/request/new" className="text-xs py-1.5 px-3 gap-1">
                        <span>Request Quote</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
