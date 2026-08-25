import { FREE_MONTHLY_ADVANCED_SEARCH_LIMIT, type SearchUsageAction, type SearchUsageIncrementResult } from "./searchLimitTypes";

const NON_CONSUMING_ACTIONS: ReadonlySet<SearchUsageAction> = new Set([
  "view_stats", "view_highlights", "view_video_radar", "view_player_profile", "view_team_profile", "view_match_page",
]);

export type IncrementUserSearchUsageInput = {
  searchType: SearchUsageAction;
  currentUsedCount?: number;
};

/**
 * Preview safe della futura RPC atomica. Non scrive e non consuma realmente quota.
 * La RPC futura dovrà verificare limite e incremento nella stessa transazione.
 */
export async function incrementUserSearchUsage(input: IncrementUserSearchUsageInput): Promise<SearchUsageIncrementResult> {
  const used = Math.min(FREE_MONTHLY_ADVANCED_SEARCH_LIMIT, Math.max(0, Math.floor(input.currentUsedCount ?? 0)));
  const eligibleForIncrement = input.searchType === "advanced" && used < FREE_MONTHLY_ADVANCED_SEARCH_LIMIT;
  const previewUsed = eligibleForIncrement ? used + 1 : used;
  const nonConsuming = NON_CONSUMING_ACTIONS.has(input.searchType);
  return {
    mode: "safe_mock",
    action: input.searchType,
    eligibleForIncrement,
    incremented: false,
    persisted: false,
    used_count: used,
    preview_used_count: previewUsed,
    search_limit: FREE_MONTHLY_ADVANCED_SEARCH_LIMIT,
    remaining: FREE_MONTHLY_ADVANCED_SEARCH_LIMIT - used,
    requiresAtomicRpc: true,
    reason: nonConsuming
      ? "Questa visualizzazione non consuma ricerche avanzate."
      : eligibleForIncrement
        ? "Incremento soltanto simulato: servirà una RPC atomica prima della ricerca reale."
        : "Limite mensile raggiunto: nessun incremento consentito.",
  };
}
