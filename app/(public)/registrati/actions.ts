"use server";

import { redirect } from "next/navigation";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createUserProfile } from "@/lib/auth/profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function registerAction(formData: FormData): Promise<void> {
  if (!getSupabaseRuntimeStatus().configured) redirect("/registrati?state=safe_mock");

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();
  if (!email || password.length < 8) redirect("/registrati?state=invalid");

  const supabase = await createSupabaseServerClient();
  const redirectTo = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/account`
    : undefined;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: redirectTo },
  });

  if (error || !data.user) redirect("/registrati?state=error");
  if (data.session) await createUserProfile({ userId: data.user.id, displayName: displayName || null });
  redirect("/login?state=registered");
}
