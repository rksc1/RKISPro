"use client";

import { Phone } from "lucide-react";

export function cleanIndianPhone(rawPhone?: string | null): string {
  if (!rawPhone) return "";
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
}

export function WhatsAppQuickAction({
  phone,
  recipientName,
  bookingTitle,
  bookingId,
  location,
  role = "customer",
  size = "md"
}: {
  phone?: string | null;
  recipientName?: string | null;
  bookingTitle?: string;
  bookingId?: string;
  location?: string;
  role?: "customer" | "vendor" | "admin";
  size?: "sm" | "md";
}) {
  if (!phone) return null;

  const cleanPhone = cleanIndianPhone(phone);
  if (!cleanPhone || cleanPhone.length < 10) return null;

  // Contextual pre-filled WhatsApp message
  let message = "";
  const shortId = bookingId ? `#${bookingId.slice(0, 8)}` : "Booking";

  if (role === "customer") {
    message = `Hello ${recipientName || "Sir"}, I am reaching out regarding RKISPro Service Visit ${shortId} (${bookingTitle || "Service Job"}) at ${location || "our plant"}. Could you please confirm your expected arrival time?`;
  } else if (role === "vendor") {
    message = `Hello ${recipientName || "Sir"}, this is from the technical team assigned via RKISPro for ${shortId} (${bookingTitle || "Site Visit"}). I am reaching out to coordinate site entry, machine access, and timing.`;
  } else {
    message = `Hello ${recipientName || "Sir"}, RKISPro Operations Desk here regarding Service Visit ${shortId} (${bookingTitle || "Site Visit"}).`;
  }

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  const telUrl = `tel:+${cleanPhone}`;

  const isSmall = size === "sm";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 rounded-xl font-bold text-white transition shadow-sm hover:opacity-95 active:scale-95 ${
          isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-xs sm:text-sm"
        }`}
        style={{ backgroundColor: "#25D366" }}
        title={`Chat with ${recipientName || "Contact"} on WhatsApp`}
      >
        <svg
          className={isSmall ? "size-3.5 fill-current" : "size-4 fill-current"}
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span>WhatsApp</span>
      </a>

      {/* Direct Call Button */}
      <a
        href={telUrl}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 transition shadow-2xs hover:bg-slate-50 active:scale-95 ${
          isSmall ? "px-2.5 py-1 text-xs" : "px-3 py-2 text-xs sm:text-sm"
        }`}
        title={`Call ${recipientName || "Contact"} at +${cleanPhone}`}
      >
        <Phone className={isSmall ? "size-3.5 text-teal-600" : "size-4 text-teal-600"} />
        <span>Call</span>
      </a>
    </div>
  );
}
