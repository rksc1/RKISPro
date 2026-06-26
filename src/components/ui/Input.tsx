import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, id, className = "", error, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={`min-h-11 rounded-xl border px-4 text-sm font-normal outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand/30 ${
          error
            ? "border-red-500 bg-red-50 text-red-900"
            : "border-slate-300 bg-white text-slate-900 focus:border-brand"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}
