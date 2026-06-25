import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@rkispro.com" },
  { icon: MapPin, label: "Location", value: "India" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
];

export default function ContactPage() {
  return (
    <div style={{ background: "#060E14", minHeight: "100vh" }}>
      <Header />

      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Left: Info */}
          <div className="grid gap-8">
            <div className="grid gap-4">
              <span className="section-label">Contact Us</span>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-white">
                Let&apos;s talk about your project.
              </h1>
              <p className="text-base leading-relaxed text-navy-100">
                Have a question about posting a job, becoming a verified contractor,
                or how RKISPro works? We&apos;re here to help.
              </p>
            </div>

            <div className="grid gap-3">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-xl p-4"
                  style={{ background: "rgba(14,30,39,0.8)", border: "1px solid rgba(30,52,68,0.8)" }}
                >
                  <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ background: "rgba(0,196,204,0.1)", border: "1px solid rgba(0,196,204,0.2)" }}
                  >
                    <Icon className="size-4 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-500">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(14, 30, 39, 0.85)",
              border: "1px solid rgba(0, 196, 204, 0.12)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <h2 className="font-display text-xl font-bold text-white mb-6">Send us a message</h2>
            <form className="grid gap-5">
              <Input label="Your Name" name="name" placeholder="e.g. Rajesh Kumar" required />
              <Input label="Email Address" name="email" type="email" placeholder="you@company.com" required />
              <Input label="Phone Number" name="phone" type="tel" placeholder="+91 98XXX XXXXX" />
              <Textarea label="Message" name="message" rows={5} placeholder="Tell us what you need help with..." required />
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
