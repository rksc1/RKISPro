import Link from "next/link";
import { AuthBackground } from "@/components/ui/AuthBackground";
import { VendorTypeSelector } from "@/components/ui/VendorTypeSelector";

export default function VendorRegisterPage() {
  return (
    <AuthBackground>
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
        <Link className="text-sm font-semibold text-teal-300 hover:text-teal-200" href="/auth">
          Back to role selection
        </Link>
        <div className="mt-5">
          <h1 className="text-3xl font-black text-white">Vendor onboarding</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">Submit your industrial supplier profile for RKISPro admin approval.</p>
        </div>
        <div className="mt-6">
          <VendorTypeSelector />
        </div>
        <p className="mt-5 text-sm text-slate-300">Already registered? <Link className="font-semibold text-teal-300" href="/auth?mode=login">Login</Link></p>
      </div>
    </AuthBackground>
  );
}
