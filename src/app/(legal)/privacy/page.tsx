import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RKISPro Marketplace",
  description: "Privacy Policy for RKISPro pvt Ltd. Learn how we collect, use, and protect your data on our industrial marketplace.",
};

export default function PrivacyPage() {
  const lastUpdated = "June 25, 2026";

  return (
    <div className="grid gap-8">
      <header className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy-100">Last updated: {lastUpdated}</p>
      </header>

      <div className="prose-legal">
        <section className="grid gap-4">
          <p className="text-sm leading-relaxed text-navy-100/80">
            At RKISPro pvt Ltd ("RKISPro", "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and share your personal information when you use our website, platform, and services (the "Platform"). This Policy complies with the Information Technology Act, 2000, and the Digital Personal Data Protection Act (DPDP), 2023 of India.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">1. Information We Collect</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            When you register as a buyer or a contractor, we collect the following types of information:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-navy-100/80 space-y-2">
            <li><strong>Business Details:</strong> Company name, GSTIN, PAN, workshop location, and machinery/capability details.</li>
            <li><strong>Contact Information:</strong> Names, email addresses, phone numbers, and physical addresses.</li>
            <li><strong>Job Data:</strong> Job descriptions, technical drawings, specifications, and timelines submitted by buyers.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our Platform, IP addresses, browser types, and device information.</li>
          </ul>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">2. How We Use Your Information</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-navy-100/80 space-y-2">
            <li>To match buyer job requirements with verified contractors.</li>
            <li>To facilitate communication, quotation sharing, and execution tracking between buyers and contractors.</li>
            <li>To verify the legitimacy and capability of contractors during onboarding.</li>
            <li>To improve Platform features, security, and user experience.</li>
            <li>To comply with applicable Indian laws and regulatory obligations.</li>
          </ul>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">3. Information Sharing</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            RKISPro acts as a facilitator. To enable the marketplace, we share limited information:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-navy-100/80 space-y-2">
            <li><strong>With Matched Users:</strong> Relevant job details (including drawings) are shared with shortlisted contractors. Contractor profiles are shared with buyers after quotation.</li>
            <li><strong>With Service Providers:</strong> Third-party services (e.g., cloud hosting, email delivery) necessary for operating the Platform.</li>
            <li><strong>Legal Requirements:</strong> If required by law, court order, or government authority.</li>
          </ul>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">4. Data Security</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">5. Your Rights</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            Under the DPDP Act, you have the right to access, correct, or request deletion of your personal data. You may withdraw consent for data processing at any time, though this may limit your ability to use the Platform. Contact us at the email below to exercise these rights.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">6. Contact Us</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            If you have any questions or grievances regarding this Privacy Policy, please contact our Grievance Officer at:<br/><br/>
            <strong>RKISPro pvt Ltd</strong><br/>
            Email: legal@rkispro.com
          </p>
        </section>
      </div>
    </div>
  );
}
