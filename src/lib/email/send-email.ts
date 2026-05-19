import { resend, FROM_EMAIL } from "@/lib/email/resend";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not configured. Skipping email.");
    return { skipped: true };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html
  });
}
