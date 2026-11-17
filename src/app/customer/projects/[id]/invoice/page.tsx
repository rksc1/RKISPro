import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { PrintInvoiceButton } from "@/components/ui/PrintInvoiceButton";
import { getCustomerFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole } from "@/services/finance-service";
import { getProjectDetailForRole } from "@/services/project-service";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

function numberToWordsINR(num: number): string {
  const a = [
    "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ",
    "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "
  ];
  const b = ["", "", "Twenty ", "Thirty ", "Forty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety "];

  const n = Math.round(num);
  if (n === 0) return "Zero Rupees Only";

  function convertTwoDigits(n: number): string {
    if (n < 20) return a[n];
    return b[Math.floor(n / 10)] + a[n % 10];
  }

  function convertThreeDigits(n: number): string {
    let str = "";
    if (Math.floor(n / 100) > 0) {
      str += a[Math.floor(n / 100)] + "Hundred ";
    }
    const rem = n % 100;
    if (rem > 0) {
      str += convertTwoDigits(rem);
    }
    return str;
  }

  const crore = Math.floor(n / 10000000);
  let remainder = n % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  let result = "";
  if (crore > 0) result += convertTwoDigits(crore) + "Crore ";
  if (lakh > 0) result += convertTwoDigits(lakh) + "Lakh ";
  if (thousand > 0) result += convertTwoDigits(thousand) + "Thousand ";
  if (remainder > 0) result += convertThreeDigits(remainder);

  return `INR ${result.trim()} Only`;
}

export default async function CustomerProjectInvoicePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const [project, finance] = await Promise.all([
    getProjectDetailForRole({ projectId: id, role: "customer", userId: customer.id }),
    getProjectFinanceForRole({ projectId: id, role: "customer", userId: customer.id })
  ]);

  if (!project || !finance) notFound();

  const totalValue = Number(finance.financial.projectValue || project.projectValue || 0);
  const totalReceived = Number(finance.financial.totalReceived || 0);
  const invoiceNumber = `RKIS/2026/INV-${project.id.slice(0, 6).toUpperCase()}`;

  // GST Breakdown: 18% inclusive or standard industrial split
  const isInterstate = false; // standard regional cluster
  const taxableValue = Math.round(totalValue / 1.18);
  const gstTotal = totalValue - taxableValue;
  const cgst = isInterstate ? 0 : Math.round(gstTotal / 2);
  const sgst = isInterstate ? 0 : gstTotal - cgst;

  const successfulPayments = finance.payments.filter((p) => p.status === "paid");
  const latestPayment = successfulPayments[0];

  return (
    <CustomerLayout title="GST Tax Invoice">
      <div className="grid gap-6">
        {/* Print / Navigation Action Bar */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href={`/customer/projects/${id}/payments`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Payments Summary</span>
          </Link>
          <div className="flex items-center gap-3">
            <PrintInvoiceButton />
          </div>
        </div>

        {/* Authentic A4-Structured GST Tax Invoice */}
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-300 bg-white p-6 shadow-xl sm:p-10 text-slate-900 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b-2 border-slate-900 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-black text-slate-900 tracking-tight">
                  RKIS<span className="text-teal-600">PRO</span>
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Tax Invoice
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                RKISPro Industrial Marketplace & Managed Procurement Services
              </p>
              <p className="text-xs text-slate-600">
                GSTIN: <span className="font-bold text-slate-900">22AAACR1234F1Z5</span> · State Code: 22
              </p>
              <p className="text-xs text-slate-500">
                Industrial Cluster Nodal Operations, India · support@rkispro.com
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Original For Recipient
              </span>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">{invoiceNumber}</p>
              <p className="text-xs text-slate-500">
                Invoice Date: <span className="font-semibold text-slate-800">{new Date().toLocaleDateString("en-IN")}</span>
              </p>
              <p className="text-xs text-slate-500">
                Place of Supply: <span className="font-semibold text-slate-800">{project.customer?.location || "India"}</span>
              </p>
            </div>
          </div>

          {/* Buyer & Vendor Details Grid */}
          <div className="mt-6 grid gap-6 border-b border-slate-200 pb-6 sm:grid-cols-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Billed To (Buyer):
              </span>
              <p className="text-sm font-bold text-slate-900">{project.customer?.companyName || project.customer?.name || customer.name}</p>
              <p className="text-xs text-slate-600 mt-0.5">{project.customer?.location || "India"}</p>
              <p className="text-xs text-slate-600 mt-0.5">Contact: {project.customer?.name || customer.name}</p>
              <p className="text-xs text-slate-600">Email: {customer.email}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Executing Contractor (Facility Partner):
              </span>
              <p className="text-sm font-bold text-slate-900">{project.vendor?.companyName ?? "Assigned Contractor"}</p>
              <p className="text-xs text-slate-600 mt-0.5">{project.vendor?.location}</p>
              <p className="text-xs text-slate-600 mt-0.5">Contact: {project.vendor?.ownerName}</p>
              <div className="mt-1 flex items-center justify-start sm:justify-end gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="size-3.5" />
                <span>Verified Facility Audited by RKISPro</span>
              </div>
            </div>
          </div>

          {/* Itemized Deliverables Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-[10px] font-bold uppercase text-slate-500">
                  <th className="py-2.5 px-3">S.No</th>
                  <th className="py-2.5 px-3">Description of Goods / Industrial Services</th>
                  <th className="py-2.5 px-3">HSN / SAC</th>
                  <th className="py-2.5 px-3 text-right">Taxable Value</th>
                  <th className="py-2.5 px-3 text-right">CGST (9%)</th>
                  <th className="py-2.5 px-3 text-right">SGST (9%)</th>
                  <th className="py-2.5 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400">01</td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{project.request?.projectTitle || "Industrial Fabrication Service"}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Service: {project.request?.serviceType} · Site: {project.request?.location}
                    </p>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">9988</td>
                  <td className="py-3 px-3 text-right font-semibold text-slate-900">
                    ₹{taxableValue.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    ₹{cgst.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    ₹{sgst.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    ₹{totalValue.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="mt-6 flex flex-col gap-4 border-t-2 border-slate-200 pt-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Amount in Words:
              </span>
              <p className="text-xs font-bold text-slate-800 italic">
                {numberToWordsINR(totalValue)}
              </p>

              {latestPayment && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-[11px] text-slate-600">
                  <span className="font-bold block text-slate-800">Escrow Payment Clearance Record:</span>
                  <span>Payment Gateway: {latestPayment.paymentMethod?.toUpperCase() || "RAZORPAY"}</span>
                  {latestPayment.referenceNumber && (
                    <span className="block font-mono text-[10px]">Reference / UTR: {latestPayment.referenceNumber}</span>
                  )}
                  {latestPayment.paidAt && (
                    <span className="block">Cleared At: {new Date(latestPayment.paidAt).toLocaleDateString("en-IN")}</span>
                  )}
                </div>
              )}
            </div>

            <div className="w-full sm:max-w-xs grid gap-1.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Taxable Amount:</span>
                <span className="font-semibold text-slate-900">₹{taxableValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>CGST @ 9%:</span>
                <span className="font-semibold text-slate-900">₹{cgst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>SGST @ 9%:</span>
                <span className="font-semibold text-slate-900">₹{sgst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black text-slate-950">
                <span>Gross Invoice Total:</span>
                <span className="text-teal-700">₹{totalValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Total Escrow Received:</span>
                <span className="font-semibold text-slate-800">₹{totalReceived.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer & Signature Stamp */}
          <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-700">Terms & Conditions:</p>
              <ol className="mt-1 list-decimal list-inside text-[11px] text-slate-500 leading-relaxed">
                <li>Goods & fabrication inspected as per agreed CAD tolerances & quality checklists.</li>
                <li>Advance payments secured under RKISPro Escrow Protection.</li>
                <li>Input Tax Credit (ITC) subject to reciprocal GSTR-1 & GSTR-3B filings.</li>
              </ol>
            </div>

            <div className="text-center sm:text-right">
              <div className="inline-block rounded-xl border border-teal-500/30 bg-teal-50/50 px-4 py-3 text-center">
                <ShieldCheck className="mx-auto size-6 text-teal-600" />
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-teal-900">
                  RKISPro Digital Escrow Stamp
                </span>
                <span className="text-[9px] text-teal-700 block">Digitally Verified & Cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
