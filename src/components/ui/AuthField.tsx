import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function AuthField({ label, id, className = "", ...props }: AuthFieldProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-100" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={`min-h-11 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-sm font-normal text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20 ${className}`}
        {...props}
      />
    </label>
  );
}
