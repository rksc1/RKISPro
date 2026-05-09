import type { VendorType } from "@/types/auth";

export function VendorTypeBadge({ type }: { type: VendorType }) {
  return (
    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase text-white">
      {type === "individual" ? "Individual" : "Company"}
    </span>
  );
}
