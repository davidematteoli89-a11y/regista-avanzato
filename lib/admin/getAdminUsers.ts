import { MOCK_ADMIN_USERS } from "./mockAdminData";
import { getCurrentAdmin } from "./requireAdmin";
import { getUserSearchUsage } from "@/lib/auth/searchUsage";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminUser } from "./adminTypes";

type ProfileRow = {
  id: string;
  display_name: string | null;
  role: AdminUser["role"];
  status: string;
};

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (!getSupabaseRuntimeStatus().configured) return MOCK_ADMIN_USERS.map((item) => ({ ...item }));

  try {
    const admin = await getCurrentAdmin();
    if (!admin) return [];
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("users_profile")
      .select("id, display_name, role, status")
      .eq("id", admin.userId)
      .maybeSingle();
    if (error || !data) return [];

    const profile = data as ProfileRow;
    const usage = await getUserSearchUsage(profile.id);
    return [{
      id: profile.id,
      displayName: profile.display_name ?? "Utente admin staging",
      role: profile.role,
      advancedSearchesUsed: usage.used,
      searchLimit: usage.limit,
      paymentStatus: "not_applicable",
      status: profile.status === "approved" ? "active" : "pending_review",
    }];
  } catch {
    return MOCK_ADMIN_USERS.map((item) => ({ ...item }));
  }
}
