import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, id, className = "", error, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-1.5 text-sm font-semibold text-navy-100" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={`min-h-11 rounded-xl border px-4 text-sm font-normal text-white outline-none transition-all duration-200 placeholder:text-navy-300 focus:ring-2 focus:ring-teal-500/30 ${
          error
            ? "border-red-500/50 bg-red-950/20"
            : "border-navy-400 bg-navy-700 focus:border-teal-500"
        } ${className}`}
        style={{
          background: error ? undefined : "rgba(14, 30, 39, 0.9)",
        }}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-400">{error}</span>}
    </label>
  );
}
