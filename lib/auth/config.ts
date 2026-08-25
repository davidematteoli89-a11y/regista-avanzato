import "server-only";

export type SupabaseRuntimeStatus = {
  configured: boolean;
  mode: "supabase" | "safe_mock";
};

/** Controlla solo la presenza delle env, senza leggerle nei log. */
export function getSupabaseRuntimeStatus(): SupabaseRuntimeStatus {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return {
    configured,
    mode: configured ? "supabase" : "safe_mock",
  };
}
