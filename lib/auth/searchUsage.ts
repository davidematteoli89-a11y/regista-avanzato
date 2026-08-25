import "server-only";

import { createSupabaseServerClient } from "../supabase/server";
import { getCurrentUser } from "./access";
import { getSupabaseRuntimeStatus } from "./config";
import type { UserSearchUsage } from "./types";

export const FREE_ADVANCED_SEARCH_LIMIT = 3 as const;
export const SEARCH_LIMIT_MESSAGE =
  "Hai usato le 3 ricerche gratuite del mese. Per ricevere report completi e contenuti extra, iscriviti alla newsletter su Substack.";

type SearchUsageRow = {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  advanced_search_count: number;
};

function currentUtcPeriod(now = new Date()): { periodStart: string; periodEnd: string } {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const periodStart = new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 10);
  const periodEnd = new Date(Date.UTC(year, month + 1, 0)).toISOString().slice(0, 10);
  return { periodStart, periodEnd };
}

function buildUsage(input: {
  userId: string | null;
  used: number;
  persisted: boolean;
  mode: "supabase" | "safe_mock";
}): UserSearchUsage {
  const { periodStart, periodEnd } = currentUtcPeriod();
  const used = Math.min(FREE_ADVANCED_SEARCH_LIMIT, Math.max(0, Math.floor(input.used)));
  const remaining = FREE_ADVANCED_SEARCH_LIMIT - used;

  return {
    mode: input.mode,
    userId: input.userId,
    periodStart,
    periodEnd,
    used,
    limit: FREE_ADVANCED_SEARCH_LIMIT,
    remaining,
    canSearch: remaining > 0,
    persisted: input.persisted,
    message: remaining > 0 ? `${remaining} ricerche avanzate gratuite disponibili questo mese.` : SEARCH_LIMIT_MESSAGE,
  };
}

async function findUsageRow(userId: string): Promise<SearchUsageRow | null> {
  const { periodStart } = currentUtcPeriod();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_search_usage")
    .select("id, user_id, period_start, period_end, advanced_search_count")
    .eq("user_id", userId)
    .eq("period_start", periodStart)
    .maybeSingle();

  if (error || !data) return null;
  return data as SearchUsageRow;
}

export async function getUserSearchUsage(userId?: string): Promise<UserSearchUsage> {
  const runtime = getSupabaseRuntimeStatus();
  const user = userId ? null : await getCurrentUser();
  const targetUserId = userId ?? user?.id ?? null;

  if (!runtime.configured || !targetUserId) {
    return buildUsage({ userId: targetUserId, used: 0, persisted: false, mode: "safe_mock" });
  }

  try {
    const row = await findUsageRow(targetUserId);
    return buildUsage({
      userId: targetUserId,
      used: row?.advanced_search_count ?? 0,
      persisted: Boolean(row),
      mode: "supabase",
    });
  } catch {
    return buildUsage({ userId: targetUserId, used: 0, persisted: false, mode: "safe_mock" });
  }
}

export async function checkUserSearchLimit(userId?: string): Promise<UserSearchUsage> {
  return getUserSearchUsage(userId);
}

/**
 * Consuma quota esclusivamente per una ricerca avanzata realmente avviata.
 * Nessuna pagina, statistica, highlight o Video Radar deve chiamare la funzione.
 */
export async function incrementUserSearchUsage(input: {
  searchType: "advanced";
  userId?: string;
}): Promise<UserSearchUsage> {
  const runtime = getSupabaseRuntimeStatus();
  const user = input.userId ? null : await getCurrentUser();
  const targetUserId = input.userId ?? user?.id ?? null;

  if (!runtime.configured || !targetUserId) {
    return buildUsage({ userId: targetUserId, used: 0, persisted: false, mode: "safe_mock" });
  }

  try {
    const supabase = await createSupabaseServerClient();
    const existing = await findUsageRow(targetUserId);

    if ((existing?.advanced_search_count ?? 0) >= FREE_ADVANCED_SEARCH_LIMIT) {
      return buildUsage({
        userId: targetUserId,
        used: FREE_ADVANCED_SEARCH_LIMIT,
        persisted: true,
        mode: "supabase",
      });
    }

    const { periodStart, periodEnd } = currentUtcPeriod();
    const nextCount = (existing?.advanced_search_count ?? 0) + 1;

    const query = existing
      ? supabase
          .from("user_search_usage")
          .update({ advanced_search_count: nextCount, last_search_at: new Date().toISOString() })
          .eq("id", existing.id)
          .eq("advanced_search_count", existing.advanced_search_count)
      : supabase.from("user_search_usage").insert({
          user_id: targetUserId,
          period_start: periodStart,
          period_end: periodEnd,
          advanced_search_count: 1,
          last_search_at: new Date().toISOString(),
        });

    const { data, error } = await query
      .select("id, user_id, period_start, period_end, advanced_search_count")
      .maybeSingle();

    if (error || !data) return getUserSearchUsage(targetUserId);
    const row = data as SearchUsageRow;
    return buildUsage({ userId: targetUserId, used: row.advanced_search_count, persisted: true, mode: "supabase" });
  } catch {
    return getUserSearchUsage(targetUserId);
  }
}
