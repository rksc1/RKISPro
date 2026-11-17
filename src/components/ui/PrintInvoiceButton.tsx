"use client";

import { Printer } from "lucide-react";

export function PrintInvoiceButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700 active:scale-95 print:hidden"
    >
      <Printer className="size-4" />
      <span>Print / Save as PDF</span>
    </button>
  );
}
