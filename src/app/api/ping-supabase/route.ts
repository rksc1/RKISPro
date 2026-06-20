import { NextResponse } from "next/server";
import { getSupabaseAuthClient } from "@/lib/db";

export async function GET() {
  const steps: string[] = ["Started GET"];
  try {
    steps.push("Calling getSupabaseAuthClient");
    const supabase = getSupabaseAuthClient();
    
    steps.push("Supabase URL: " + process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    steps.push("Calling signInWithPassword...");
    const promise = supabase.auth.signInWithPassword({ email: "test@test.com", password: "password" });
    
    const timeout = new Promise((resolve) => setTimeout(() => resolve("TIMEOUT"), 3000));
    const result = await Promise.race([promise, timeout]);
    
    if (result === "TIMEOUT") {
      steps.push("signInWithPassword TIMED OUT after 3s!");
      return NextResponse.json({ steps, error: "HUNG" });
    }
    
    steps.push("signInWithPassword completed!");
    return NextResponse.json({ steps, result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    steps.push("CAUGHT ERROR: " + message);
    return NextResponse.json({ steps, error: message }, { status: 500 });
  }
}
