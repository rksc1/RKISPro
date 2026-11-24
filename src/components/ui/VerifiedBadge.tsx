import React from "react";
import type { VerifiedBadge as BadgeType } from "@/types/audit";
import { Shield, Award, Star, Hammer } from "lucide-react";

interface VerifiedBadgeProps {
  badge?: BadgeType | null;
  score?: number | null;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
  className?: string;
}

export function VerifiedBadge({
  badge = "none",
  score,
  size = "md",
  showDescription = false,
  className = ""
}: VerifiedBadgeProps) {
  const currentBadge = badge || "none";

  if (currentBadge === "none") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-500 ${className}`}
        title="Physical on-site audit pending"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        Unverified Hub
      </span>
    );
  }

  const config = {
    iron: {
      label: "Iron Verified",
      shortLabel: "Iron",
      description: "Essential Fabrication (Gates, Sheds & Light Structures)",
      icon: Hammer,
      bg: "bg-slate-100",
      text: "text-slate-800",
      border: "border-slate-300",
      accent: "bg-slate-600",
      iconColor: "text-slate-700"
    },
    bronze: {
      label: "Bronze Verified",
      shortLabel: "Bronze",
      description: "Full Bare-Minimum (Industrial Structures & Storage Systems)",
      icon: Award,
      bg: "bg-orange-50",
      text: "text-orange-950",
      border: "border-orange-300",
      accent: "bg-orange-600",
      iconColor: "text-orange-700"
    },
    silver: {
      label: "Silver Verified",
      shortLabel: "Silver",
      description: "Enterprise Material MTC 3.1 & Certified Welding Engineering",
      icon: Shield,
      bg: "bg-sky-50",
      text: "text-sky-950",
      border: "border-sky-300",
      accent: "bg-sky-600",
      iconColor: "text-sky-700"
    },
    gold: {
      label: "Gold Verified",
      shortLabel: "Gold",
      description: "Apex Enterprise Hub (Full Precision CNC, NDT & NABL Dossier)",
      icon: Star,
      bg: "bg-amber-50",
      text: "text-amber-950",
      border: "border-amber-400 shadow-sm",
      accent: "bg-amber-500",
      iconColor: "text-amber-600"
    }
  }[currentBadge];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2"
  }[size];

  const IconComponent = config.icon;

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span
        className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
        title={config.description}
      >
        <IconComponent className={`h-3.5 w-3.5 shrink-0 ${config.iconColor}`} />
        <span>{config.label}</span>
        {typeof score === "number" && score > 0 && (
          <span className="ml-1 rounded-full bg-white/70 px-1.5 py-0.2 text-[10px] font-extrabold text-slate-700 border border-black/5">
            {score}/80
          </span>
        )}
      </span>
      {showDescription && (
        <span className="mt-1 text-[11px] font-medium text-slate-500">
          {config.description}
        </span>
      )}
    </div>
  );
}
