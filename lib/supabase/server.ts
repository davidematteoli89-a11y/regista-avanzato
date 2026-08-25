import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function requireServerSessionEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY",
): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Configurazione Supabase SSR incompleta: manca ${name}.`);
  }

  return value;
}

/**
 * Client server-side associato alla sessione dell'utente. Rispetta RLS e non
 * usa mai la service role. Deve essere creato per ogni richiesta.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    requireServerSessionEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireServerSessionEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // I Server Component possono essere read-only per i cookie.
            // Il futuro Proxy/Middleware gestirà il refresh della sessione.
          }
        },
      },
    },
  );
}

export const createClient = createSupabaseServerClient;
