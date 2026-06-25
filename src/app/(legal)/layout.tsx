import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#060E14", minHeight: "100vh" }}>
      <Header />
      <div className="page-shell py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="bento-card p-8 sm:p-12">
            {children}
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
