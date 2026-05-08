"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function ConfirmDialog({
  title,
  description,
  actionLabel,
  children
}: {
  title: string;
  description: string;
  actionLabel: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button type="button" onClick={() => dialogRef.current?.showModal()}>
        {actionLabel}
      </Button>
      <dialog className="w-[min(420px,calc(100vw-32px))] rounded-2xl border border-line p-0 shadow-2xl" ref={dialogRef}>
        <div className="grid gap-4 p-5">
          <div>
            <h3 className="text-xl font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => dialogRef.current?.close()}>
              Cancel
            </Button>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
