import { redirect } from "next/navigation";

export default function CustomerLoginPage() {
  redirect("/auth?mode=login");
}
