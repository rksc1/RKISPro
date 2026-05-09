import { LogoMark } from "@/components/ui/LogoMark";

export function BrandedLoader({
  label = "Loading RKISPro"
}: {
  label?: string;
}) {
  return (
    <div className="grid place-items-center gap-3 py-10 text-center">
      <div className="animate-logo-pulse rounded-2xl bg-white p-2 shadow-sm ring-1 ring-line">
        <LogoMark size="md" />
      </div>
      <p className="text-sm font-semibold text-muted">{label}</p>
      <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-1/2 animate-loading-bar rounded-full bg-brand-gold" />
      </div>
    </div>
  );
}
