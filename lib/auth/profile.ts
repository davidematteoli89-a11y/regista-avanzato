import "server-only";

import { createSupabaseServerClient } from "../supabase/server";
import { getCurrentUser } from "./access";
import { getSupabaseRuntimeStatus } from "./config";
import type { SafeWriteResult, UserProfile } from "./types";

type ProfileRow = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: UserProfile["role"];
  status: UserProfile["status"];
  created_at: string | null;
  updated_at: string | null;
};

function mapProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const PROFILE_SELECT = "id, display_name, avatar_url, role, status, created_at, updated_at";

export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  if (!getSupabaseRuntimeStatus().configured) return null;
  const currentUser = userId ? null : await getCurrentUser();
  const targetUserId = userId ?? currentUser?.id;
  if (!targetUserId) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("users_profile")
      .select(PROFILE_SELECT)
      .eq("id", targetUserId)
      .maybeSingle();

    if (error || !data) return null;
    return mapProfile(data as ProfileRow);
  } catch {
    return null;
  }
}

export async function createUserProfile(input: {
  userId: string;
  displayName?: string | null;
}): Promise<SafeWriteResult<UserProfile | null>> {
  const runtime = getSupabaseRuntimeStatus();
  if (!runtime.configured) {
    return {
      ok: true,
      mode: "safe_mock",
      persisted: false,
      data: null,
      message: "Profilo non persistito: Supabase non configurato.",
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("users_profile")
      .update({ display_name: input.displayName ?? null })
      .eq("id", input.userId)
      .select(PROFILE_SELECT)
      .maybeSingle();

    if (data) {
      return {
        ok: true,
        mode: "supabase",
        persisted: true,
        data: mapProfile(data as ProfileRow),
        message: "Profilo aggiornato.",
      };
    }

    if (error) return { ok: false, mode: "supabase", persisted: false, data: null, message: "Profilo non aggiornato." };

    const fallback = await getUserProfile(input.userId);
    if (fallback) return { ok: true, mode: "supabase", persisted: true, data: fallback, message: "Profilo letto." };

    const { data: inserted, error: insertError } = await supabase
      .from("users_profile")
      .insert({ id: input.userId, display_name: input.displayName ?? null })
      .select(PROFILE_SELECT)
      .maybeSingle();

    if (insertError || !inserted) {
      return {
        ok: false,
        mode: "supabase",
        persisted: false,
        data: null,
        message: "Profilo non disponibile: attendere il trigger Auth e riprovare.",
      };
    }

    return { ok: true, mode: "supabase", persisted: true, data: mapProfile(inserted as ProfileRow), message: "Profilo inizializzato." };
  } catch {
    return { ok: false, mode: "supabase", persisted: false, data: null, message: "Profilo non salvato." };
  }
}
