import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthBackground } from "@/components/ui/AuthBackground";
import { ForgotPasswordForm } from "@/components/ui/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthBackground>
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.07] p-8 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-300/20">
          <Mail className="size-6" />
        </div>
        <h1 className="mt-5 text-3xl font-black text-white">Forgot password</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Enter your email and RKISPro will send a Supabase Auth password reset link if the account exists.
        </p>
        <ForgotPasswordForm />
        <Link className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-teal-500 px-5 text-sm font-black text-white hover:bg-teal-400" href="/auth?mode=login">
          Back to login
        </Link>
      </div>
    </AuthBackground>
  );
}
