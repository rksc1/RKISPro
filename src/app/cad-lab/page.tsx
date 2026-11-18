import { CadPartViewer } from "@/components/3d/CadPartViewer";
import { StickyNavbar } from "@/components/landing/StickyNavbar";
import { FooterSection } from "@/components/landing/FooterSection";
import Link from "next/link";
import { ArrowLeft, Box, Cpu, FileCheck } from "lucide-react";

export const metadata = {
  title: "3D CAD & Metrology Lab | RKISPro",
  description: "Interactive WebGL 3D CAD Inspector and GD&T tolerance verification engine.",
};

export default function CadLabPage() {
  return (
    <>
      <StickyNavbar />
      <main className="min-h-screen bg-slate-950 text-white py-12 sm:py-16">
        <div className="page-shell">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 mb-2"
              >
                <ArrowLeft className="size-3.5" />
                Back to Marketplace
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Interactive 3D CAD &amp; Metrology Inspector
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Inspect 3D geometry, check critical GD&amp;T datum points, and test alloy shaders.
              </p>
            </div>
            <Link
              href="/customer/request/new?serviceType=Machining"
              className="btn-primary text-xs font-bold px-4 py-2.5"
            >
              Upload Your STEP / CAD File
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-2xl">
            <CadPartViewer />
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
