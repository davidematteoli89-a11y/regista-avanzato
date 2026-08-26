export const FREE_MONTHLY_ADVANCED_SEARCH_LIMIT = 3 as const;

export type SearchUsagePeriod = {
  timezone: "server";
  period_start: string;
  period_end: string;
};

export type SearchLimitStatus = {
  mode: "safe_mock" | "supabase";
  user_id: string | null;
  allowed: boolean;
  used_count: number;
  search_limit: 3;
  remaining: number;
  period_start: string;
  period_end: string;
  reason: string;
  persisted: boolean;
};

export type SearchUsageAction =
  | "advanced"
  | "view_stats"
  | "view_highlights"
  | "view_video_radar"
  | "view_player_profile"
  | "view_team_profile"
  | "view_match_page";

export type SearchUsageIncrementResult = {
  mode: "safe_mock" | "supabase";
  action: SearchUsageAction;
  eligibleForIncrement: boolean;
  incremented: boolean;
  persisted: boolean;
  used_count: number;
  preview_used_count: number;
  search_limit: 3;
  remaining: number;
  requiresAtomicRpc: boolean;
  reason: string;
};
