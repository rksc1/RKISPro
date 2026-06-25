import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | RKISPro Marketplace",
  description: "Cookie Policy explaining how RKISPro pvt Ltd uses cookies to improve your marketplace experience.",
};

export default function CookiesPage() {
  const lastUpdated = "June 25, 2026";

  return (
    <div className="grid gap-8">
      <header className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-white">Cookie Policy</h1>
        <p className="mt-2 text-sm text-navy-100">Last updated: {lastUpdated}</p>
      </header>

      <div className="prose-legal">
        <section className="grid gap-4">
          <p className="text-sm leading-relaxed text-navy-100/80">
            RKISPro pvt Ltd ("we", "our", or "us") uses cookies and similar tracking technologies on our platform to ensure security, understand usage patterns, and improve the user experience for both buyers and contractors.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">1. What are Cookies?</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            Cookies are small text files placed on your device when you visit our website. They help the platform remember your preferences, keep your session secure while you review jobs, and help us understand which features are most useful.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">2. Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-navy-100/80 space-y-2">
            <li><strong>Essential Cookies:</strong> Strictly necessary for the platform to function. These include authentication cookies that keep you logged in while reviewing contractor quotes or posting jobs.</li>
            <li><strong>Performance & Analytics:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our platform. They help us know which pages are the most and least popular.</li>
            <li><strong>Functional Cookies:</strong> Used to remember your preferences (such as your location or dashboard settings) to provide a more personalized experience.</li>
          </ul>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">3. Managing Your Cookies</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            You can control and/or delete cookies as you wish through your browser settings. However, please note that disabling essential cookies will prevent you from logging into your RKISPro dashboard, posting jobs, or submitting quotations.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">4. Updates to this Policy</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            We may update this Cookie Policy occasionally to reflect changes in our technology or legal requirements. We encourage you to review this page periodically.
          </p>
        </section>
      </div>
    </div>
  );
}
