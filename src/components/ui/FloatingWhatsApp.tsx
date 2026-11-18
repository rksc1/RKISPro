"use client";

import { MessageSquareText } from "lucide-react";

export function FloatingWhatsApp() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 group"
    >
      <div className="hidden sm:flex items-center rounded-2xl border border-emerald-500/30 bg-slate-900/90 px-3.5 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>Send sketch or photo on WhatsApp</span>
      </div>
      <a
        href={`https://wa.me/${phone}?text=Hi%20RKISPro%2C%20I%20have%20a%20metal%20work%20requirement%20and%20need%20a%20quote.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with RKISPro on WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-600/35 transition-all duration-200 hover:scale-105 hover:bg-emerald-400 focus:outline-hidden focus:ring-4 focus:ring-emerald-400/30 active:scale-95"
      >
        <MessageSquareText className="size-6" />
      </a>
    </aside>
  );
}
