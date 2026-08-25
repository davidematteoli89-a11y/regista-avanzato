import "server-only";

import { createSupabaseServerClient } from "../supabase/server";
import { getCurrentUser } from "./access";
import { getSupabaseRuntimeStatus } from "./config";
import type { SafeWriteResult, UserPreferences } from "./types";

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  locale: "it",
  timezone: "Europe/Rome",
  newsletterOptIn: false,
  favoriteCompetitionIds: [],
  favoriteTeamIds: [],
};

type PreferencesRow = {
  locale: string;
  timezone: string;
  newsletter_opt_in: boolean;
  favorite_competition_ids: string[] | null;
  favorite_team_ids: string[] | null;
};

function mapPreferences(row: PreferencesRow): UserPreferences {
  return {
    locale: row.locale,
    timezone: row.timezone,
    newsletterOptIn: row.newsletter_opt_in,
    favoriteCompetitionIds: row.favorite_competition_ids ?? [],
    favoriteTeamIds: row.favorite_team_ids ?? [],
  };
}

export async function getUserPreferences(userId?: string): Promise<UserPreferences> {
  const runtime = getSupabaseRuntimeStatus();
  const user = userId ? null : await getCurrentUser();
  const targetUserId = userId ?? user?.id;
  if (!runtime.configured || !targetUserId) return DEFAULT_USER_PREFERENCES;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("user_preferences")
      .select("locale, timezone, newsletter_opt_in, favorite_competition_ids, favorite_team_ids")
      .eq("user_id", targetUserId)
      .maybeSingle();
    if (error || !data) return DEFAULT_USER_PREFERENCES;
    return mapPreferences(data as PreferencesRow);
  } catch {
    return DEFAULT_USER_PREFERENCES;
  }
}

export async function saveUserPreferences(
  preferences: Partial<UserPreferences>,
  userId?: string,
): Promise<SafeWriteResult<UserPreferences>> {
  const runtime = getSupabaseRuntimeStatus();
  const user = userId ? null : await getCurrentUser();
  const targetUserId = userId ?? user?.id;
  const current = await getUserPreferences(targetUserId);
  const next: UserPreferences = { ...current, ...preferences };

  if (!runtime.configured || !targetUserId) {
    return {
      ok: true,
      mode: "safe_mock",
      persisted: false,
      data: next,
      message: "Preferenze disponibili solo in anteprima: Supabase non configurato.",
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("user_preferences")
      .upsert(
        {
          user_id: targetUserId,
          locale: next.locale,
          timezone: next.timezone,
          newsletter_opt_in: next.newsletterOptIn,
          favorite_competition_ids: next.favoriteCompetitionIds,
          favorite_team_ids: next.favoriteTeamIds,
        },
        { onConflict: "user_id" },
      )
      .select("locale, timezone, newsletter_opt_in, favorite_competition_ids, favorite_team_ids")
      .single();

    if (error) {
      return { ok: false, mode: "supabase", persisted: false, data: next, message: "Preferenze non salvate." };
    }

    return {
      ok: true,
      mode: "supabase",
      persisted: true,
      data: mapPreferences(data as PreferencesRow),
      message: "Preferenze salvate.",
    };
  } catch {
    return { ok: false, mode: "supabase", persisted: false, data: next, message: "Preferenze non salvate." };
  }
}
