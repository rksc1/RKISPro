import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RKISPro | Industrial RFQ Marketplace",
  description: "India-focused B2B industrial marketplace for fabricators, manufacturers, welders, mechanics, and machine shops."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
