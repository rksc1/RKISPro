import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  note?: string;
  icon?: ReactNode;
  color?: "teal" | "amber" | "default";
}

export function StatCard({ label, value, note, icon, color = "default" }: StatCardProps) {
  const accentColor =
    color === "teal" ? "#0D9488" : color === "amber" ? "#D97706" : "#64748B";

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 bg-white border border-slate-200/90 shadow-sm"
    >
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {label}
          </span>
          {icon && (
            <div
              className="flex size-8 items-center justify-center rounded-lg"
              style={{
                background: `${accentColor}14`,
                border: `1px solid ${accentColor}25`,
                color: accentColor,
              }}
            >
              {icon}
            </div>
          )}
        </div>
        <strong
          className="font-display text-3xl font-extrabold text-slate-900"
        >
          {value}
        </strong>
        {note && (
          <span className="text-xs text-slate-500">{note}</span>
        )}
      </div>
    </div>
  );
}
