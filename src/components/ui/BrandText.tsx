const titleSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl"
};

export function BrandText({
  size = "md",
  variant = "dark",
  tagline = "India's Managed Industrial RFQ Marketplace",
  showTagline = true
}: {
  size?: keyof typeof titleSizes;
  variant?: "dark" | "light";
  tagline?: string;
  showTagline?: boolean;
}) {
  const titleColor = variant === "light" ? "text-white" : "text-slate-950";
  const taglineColor = variant === "light" ? "text-slate-300" : "text-muted";

  return (
    <span className="grid min-w-0 leading-tight">
      <strong className={`${titleSizes[size]} font-black tracking-normal ${titleColor}`}>RKISPro</strong>
      {showTagline ? (
        <span className={`hidden text-xs font-semibold tracking-normal ${taglineColor} sm:block`}>{tagline}</span>
      ) : null}
    </span>
  );
}
