import { MOCK_ADMIN_PROVIDERS } from "./mockAdminData";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminProvider } from "./adminTypes";

type ProviderRow = {
  provider_key: string;
  name: string;
  provider_type: string;
  is_active: boolean;
  priority: number;
  monthly_budget_eur: number | null;
  notes: string | null;
};

export async function getAdminProviders(): Promise<AdminProvider[]> {
  if (!getSupabaseRuntimeStatus().configured) return MOCK_ADMIN_PROVIDERS.map((item) => ({ ...item }));

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("data_providers")
      .select("provider_key, name, provider_type, is_active, priority, monthly_budget_eur, notes")
      .order("priority", { ascending: true });

    if (error || !data) return MOCK_ADMIN_PROVIDERS.map((item) => ({ ...item }));

    return (data as ProviderRow[]).map((provider) => ({
      id: provider.provider_key as AdminProvider["id"],
      name: provider.name,
      type: provider.provider_type,
      status: provider.is_active ? "active" : "inactive",
      priority: provider.priority,
      monthlyBudgetEur: provider.monthly_budget_eur,
      note: provider.notes ?? "Provider configurato nello staging Supabase.",
      realCalls: 0,
      tokenExposed: false,
    }));
  } catch {
    return MOCK_ADMIN_PROVIDERS.map((item) => ({ ...item }));
  }
}
