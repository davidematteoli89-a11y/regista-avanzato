"use server";

import { redirect } from "next/navigation";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData): Promise<void> {
  if (!getSupabaseRuntimeStatus().configured) redirect("/login?state=safe_mock");

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login?state=invalid");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?state=invalid");
  redirect("/account");
}
