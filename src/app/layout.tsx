import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "RKISPro | Managed Industrial RFQ Platform",
  description: "India-focused procurement coordination for managed RFQs, verified vendor shortlisting, structured quotations, execution tracking, and payment visibility.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "RKISPro | Managed Industrial RFQ Platform",
    description: "India's managed industrial procurement coordination platform for RFQs, verified vendors, projects, and payments.",
    images: ["/logo/logo-dark.svg"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
