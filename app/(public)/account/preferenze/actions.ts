"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/access";
import { saveUserPreferences } from "@/lib/auth/preferences";

export async function savePreferencesAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = String(formData.get("locale") ?? "it");
  const timezone = String(formData.get("timezone") ?? "Europe/Rome");
  const newsletterOptIn = formData.get("newsletterOptIn") === "on";

  const result = await saveUserPreferences({ locale, timezone, newsletterOptIn }, user.id);
  redirect(`/account/preferenze?state=${result.ok ? "saved" : "error"}`);
}
