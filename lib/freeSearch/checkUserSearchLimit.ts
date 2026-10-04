import { getSearchPeriod } from "./getSearchPeriod";
import { FREE_MONTHLY_ADVANCED_SEARCH_LIMIT, type SearchLimitStatus } from "./searchLimitTypes";
import { getUserSearchUsage } from "@/lib/auth/searchUsage";

export const FREE_SEARCH_LIMIT_MESSAGE =
  "Hai usato le 3 ricerche gratuite del mese. Per ricevere report completi, Talent Radar e contenuti extra, iscriviti alla newsletter su Substack.";

export type CheckUserSearchLimitInput = {
  userId?: string | null;
  mockUsedCount?: number;
  now?: Date;
};

/**
 * Controllo safe: prepara il contratto per `user_search_usage`, ma non esegue query.
 * `mockUsedCount` è solo un'iniezione per test/server preview e non arriva dal browser.
 */
export async function checkUserSearchLimit(input: CheckUserSearchLimitInput = {}): Promise<SearchLimitStatus> {
  if (input.userId && input.mockUsedCount === undefined) {
    const usage = await getUserSearchUsage(input.userId);
    return {
      mode: usage.mode,
      user_id: usage.userId,
      allowed: usage.canSearch,
      used_count: usage.used,
      search_limit: usage.limit,
      remaining: usage.remaining,
      period_start: usage.periodStart,
      period_end: usage.periodEnd,
      reason: usage.message,
      persisted: usage.persisted,
    };
  }

  const period = getSearchPeriod(input.now);
  const used = Math.min(FREE_MONTHLY_ADVANCED_SEARCH_LIMIT, Math.max(0, Math.floor(input.mockUsedCount ?? 0)));
  const remaining = FREE_MONTHLY_ADVANCED_SEARCH_LIMIT - used;
  return {
    mode: "safe_mock",
    user_id: input.userId ?? null,
    allowed: Boolean(input.userId) && remaining > 0,
    used_count: used,
    search_limit: FREE_MONTHLY_ADVANCED_SEARCH_LIMIT,
    remaining,
    period_start: period.period_start,
    period_end: period.period_end,
    reason: !input.userId
      ? "Login gratuito richiesto per eseguire la ricerca avanzata."
      : remaining > 0
        ? `${remaining} ${remaining === 1 ? "ricerca avanzata gratuita disponibile" : "ricerche avanzate gratuite disponibili"} nel periodo corrente.`
        : FREE_SEARCH_LIMIT_MESSAGE,
    persisted: false,
  };
}
