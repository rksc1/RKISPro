import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <Header />
      <div className="page-shell py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="bento-card p-8 sm:p-12 bg-white border border-slate-200/90 shadow-sm">
            {children}
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
