import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-1.5 text-sm font-semibold text-ink" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={`min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand ${className}`}
        {...props}
      />
    </label>
  );
}
