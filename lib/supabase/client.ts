"use client";

import { createBrowserClient } from "@supabase/ssr";

function requirePublicEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Configurazione Supabase pubblica incompleta: manca ${name}.`);
  }

  return value;
}

/** Client browser con sole variabili pubbliche e permessi regolati da RLS. */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}

export const createClient = createSupabaseBrowserClient;
