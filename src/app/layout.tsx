import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "RKISPro | Industrial RFQ Marketplace",
  description: "India-focused B2B industrial marketplace for fabricators, manufacturers, welders, mechanics, and machine shops.",
  icons: {
    icon: "/logo/favicon.png",
    shortcut: "/logo/favicon.png",
    apple: "/logo/icon.png"
  },
  openGraph: {
    title: "RKISPro | Industrial RFQ Marketplace",
    description: "India's Managed Industrial RFQ Marketplace for buyers, vendors, projects, and payments.",
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
