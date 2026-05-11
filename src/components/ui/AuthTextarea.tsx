import type { TextareaHTMLAttributes } from "react";

type AuthTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function AuthTextarea({ label, id, className = "", ...props }: AuthTextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-100" htmlFor={textareaId}>
      {label}
      <textarea
        id={textareaId}
        className={`rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm font-normal text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20 ${className}`}
        {...props}
      />
    </label>
  );
}
