"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, Factory, HardHat } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const customerFeatures = [
  "Post RFQs",
  "Compare vendor quotations",
  "Manage projects",
  "Track invoices/payments",
  "Communicate with vendors"
];

const vendorFeatures = [
  "Receive RFQs",
  "Submit quotations",
  "Upload invoices",
  "Manage milestones",
  "Track payments",
  "Manage industrial services"
];

export function RoleSelection({ mode = "register" }: { mode?: "login" | "register" }) {
  const customerHref = mode === "login" ? "/auth?mode=login" : "/customer/register";
  const vendorHref = mode === "login" ? "/auth?mode=login" : "/vendor/register";

  return (
    <div className="w-full max-w-5xl">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mb-7 flex justify-center">
          <Logo variant="light" size="md" priority />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal-300">Industrial Marketplace Onboarding</p>
        <h1 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">Join RKISPro</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Are you looking to hire industrial vendors or offer industrial services?
        </p>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <RoleCard
          buttonLabel="Continue as Customer"
          description="I want to post RFQs, compare quotations, and hire verified industrial vendors."
          features={customerFeatures}
          href={customerHref}
          icon={<Building2 className="size-7" />}
          title="Customer"
        />
        <RoleCard
          buttonLabel="Continue as Vendor"
          description="I want to receive RFQs, submit quotations, manage projects, and grow my industrial business."
          features={vendorFeatures}
          href={vendorHref}
          icon={<Factory className="size-7" />}
          title="Vendor / Service Provider"
        />
      </div>
    </div>
  );
}

function RoleCard({
  title,
  description,
  features,
  buttonLabel,
  href,
  icon
}: {
  title: string;
  description: string;
  features: string[];
  buttonLabel: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
      initial="hidden"
      transition={{ duration: 0.4 }}
      variants={cardVariants}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileInView="visible"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start gap-4">
        <div className="grid size-14 place-items-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-300/20">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {features.map((feature) => (
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200" key={feature}>
            <CheckCircle2 className="size-4 text-teal-300" />
            {feature}
          </div>
        ))}
      </div>
      <Link
        className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 text-sm font-black text-white shadow-lg shadow-teal-950/30 transition hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200"
        href={href}
      >
        <HardHat className="size-4" />
        {buttonLabel}
        <ArrowRight className="size-4" />
      </Link>
    </motion.article>
  );
}
