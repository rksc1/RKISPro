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
    color === "teal" ? "#00C4CC" : color === "amber" ? "#F59E0B" : "#8BA5B4";

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: "rgba(14, 30, 39, 0.8)",
        border: `1px solid rgba(30, 52, 68, 0.8)`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-navy-100/60">
            {label}
          </span>
          {icon && (
            <div
              className="flex size-8 items-center justify-center rounded-lg"
              style={{
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}30`,
                color: accentColor,
              }}
            >
              {icon}
            </div>
          )}
        </div>
        <strong
          className="font-display text-3xl font-extrabold"
          style={{ color: accentColor !== "#8BA5B4" ? accentColor : "white" }}
        >
          {value}
        </strong>
        {note && (
          <span className="text-xs text-navy-100/50">{note}</span>
        )}
      </div>
    </div>
  );
}
