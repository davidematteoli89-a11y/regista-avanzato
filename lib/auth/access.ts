import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "../supabase/server";
import { getSupabaseRuntimeStatus } from "./config";
import type { AccessDecision, AuthUser } from "./types";

export const LOGIN_REQUIRED_MESSAGE =
  "Accedi gratis per vedere statistiche complete, link highlights ufficiali e Video Radar.";

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const runtime = getSupabaseRuntimeStatus();
  if (!runtime.configured) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
});

async function requireFreeLogin(feature: string): Promise<AccessDecision> {
  const runtime = getSupabaseRuntimeStatus();
  const user = await getCurrentUser();

  if (!user) {
    return {
      allowed: false,
      mode: runtime.mode,
      loginRequired: true,
      reason: runtime.configured ? LOGIN_REQUIRED_MESSAGE : `${LOGIN_REQUIRED_MESSAGE} Modalità safe attiva.`,
    };
  }

  return {
    allowed: true,
    mode: "supabase",
    loginRequired: false,
    reason: `${feature} disponibile per l'account free autenticato.`,
  };
}

export function requireLoginForFullStats(): Promise<AccessDecision> {
  return requireFreeLogin("Statistiche complete");
}

export function requireLoginForHighlightLinks(): Promise<AccessDecision> {
  return requireFreeLogin("Link highlights ufficiali");
}

export function requireLoginForVideoRadar(): Promise<AccessDecision> {
  return requireFreeLogin("Video Radar completo");
}
