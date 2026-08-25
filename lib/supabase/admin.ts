import "server-only";

import { createClient } from "@supabase/supabase-js";

function requireAdminEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Configurazione Supabase admin incompleta: manca ${name}.`);
  }

  return value;
}

/**
 * Client privilegiato: bypassa RLS. Usare soltanto in job, script, Route
 * Handler o Server Action autorizzati; mai importarlo da componenti client.
 */
export function createSupabaseAdminClient() {
  return createClient(
    requireAdminEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireAdminEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}
