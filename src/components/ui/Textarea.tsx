import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ label, id, className = "", error, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700" htmlFor={textareaId}>
      {label}
      <textarea
        id={textareaId}
        className={`rounded-xl border px-4 py-3 text-sm font-normal outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand/30 ${
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
