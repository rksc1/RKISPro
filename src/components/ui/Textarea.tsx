import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-1.5 text-sm font-semibold text-ink" htmlFor={textareaId}>
      {label}
      <textarea
        id={textareaId}
        className={`rounded-md border border-line bg-white px-3 py-2 text-sm font-normal outline-none focus:border-brand ${className}`}
        {...props}
      />
    </label>
  );
}
