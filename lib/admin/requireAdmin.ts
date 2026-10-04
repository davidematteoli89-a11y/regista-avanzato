import "server-only";

import { notFound, redirect } from "next/navigation";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminAccessState, AdminRole } from "./adminTypes";

type AdminProfileRow = {
  id: string;
  role: "free_user" | AdminRole;
  status: string;
};

function isAdminRole(role: AdminProfileRow["role"]): role is AdminRole {
  return role === "admin" || role === "super_admin" || role === "editor";
}

export async function getCurrentAdmin(): Promise<AdminAccessState | null> {
  if (!getSupabaseRuntimeStatus().configured) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData.user;
    if (userError || !user) return null;

    const { data: profile, error: profileError } = await supabase
      .from("users_profile")
      .select("id, role, status")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) return null;
    const row = profile as AdminProfileRow;
    if (row.status !== "approved" || !isAdminRole(row.role)) return null;

    return {
      isAdminMock: false,
      accessMode: "supabase_rbac",
      allowed: true,
      realProtectionEnabled: true,
      role: row.role,
      userId: row.id,
      warning: "Accesso protetto da Supabase Auth e ruolo users_profile. I dati admin restano mock/dry-run finché i reader reali non vengono collegati.",
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminAccessState> {
  const runtime = getSupabaseRuntimeStatus();
  if (!runtime.configured) notFound();

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=/admin");

  const admin = await getCurrentAdmin();
  if (!admin) notFound();
  return admin;
}
