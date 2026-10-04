import "server-only";

import { createSupabaseServerClient } from "../supabase/server";
import { getCurrentUser } from "./access";
import { getSupabaseRuntimeStatus } from "./config";
import type { UserSearchUsage } from "./types";

export const FREE_ADVANCED_SEARCH_LIMIT = 3 as const;
export const SEARCH_LIMIT_MESSAGE =
  "Hai usato le 3 ricerche gratuite del mese. Per ricevere report completi e contenuti extra, iscriviti alla newsletter su Substack.";

type SearchUsageStatusRow = {
  allowed: boolean;
  used_count: number;
  search_limit: number;
  remaining: number;
  period_start: string;
  period_end: string;
  reason: string;
};

type SearchUsageIncrementRow = SearchUsageStatusRow & {
  incremented: boolean;
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
  periodStart?: string;
  periodEnd?: string;
  message?: string;
  canSearch?: boolean;
  lastIncremented?: boolean;
}): UserSearchUsage {
  const fallbackPeriod = currentUtcPeriod();
  const periodStart = input.periodStart ?? fallbackPeriod.periodStart;
  const periodEnd = input.periodEnd ?? fallbackPeriod.periodEnd;
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
    canSearch: input.canSearch ?? remaining > 0,
    persisted: input.persisted,
    lastIncremented: input.lastIncremented,
    message: input.message ?? (remaining > 0 ? `${remaining} ricerche avanzate gratuite disponibili questo mese.` : SEARCH_LIMIT_MESSAGE),
  };
}

function mapRpcStatus(userId: string | null, row: SearchUsageStatusRow, incremented?: boolean): UserSearchUsage {
  return buildUsage({
    userId,
    used: row.used_count,
    persisted: true,
    mode: "supabase",
    periodStart: row.period_start,
    periodEnd: row.period_end,
    canSearch: row.allowed,
    lastIncremented: incremented,
    message: row.reason,
  });
}

export async function getUserSearchUsage(userId?: string): Promise<UserSearchUsage> {
  const runtime = getSupabaseRuntimeStatus();
  const user = userId ? null : await getCurrentUser();
  const targetUserId = userId ?? user?.id ?? null;

  if (!runtime.configured || !targetUserId) {
    return buildUsage({ userId: targetUserId, used: 0, persisted: false, mode: "safe_mock" });
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("get_user_search_usage_status").maybeSingle();
    if (error || !data) return buildUsage({ userId: targetUserId, used: 0, persisted: false, mode: "safe_mock" });
    return mapRpcStatus(targetUserId, data as SearchUsageStatusRow);
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
    const { data, error } = await supabase.rpc("increment_user_search_usage").maybeSingle();
    if (error || !data) return getUserSearchUsage(targetUserId);
    const row = data as SearchUsageIncrementRow;
    return mapRpcStatus(targetUserId, row, row.incremented);
  } catch {
    return getUserSearchUsage(targetUserId);
  }
}
