import "server-only";

import type { SubstackConfig } from "./substackTypes";

/** Legge soltanto la destinazione pubblica server-side; non usa API, token o Supabase. */
export function getSubstackConfig(): SubstackConfig {
  const value = process.env.SUBSTACK_URL?.trim();
  if (!value) return { configured: false, url: null, state: "missing", reason: "SUBSTACK_URL non configurato: CTA in modalità placeholder." };
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("Protocollo non consentito");
    return { configured: true, url: parsed.toString(), state: "configured", reason: "Destinazione Substack configurata server-side." };
  } catch {
    return { configured: false, url: null, state: "invalid", reason: "SUBSTACK_URL non valido: CTA disabilitata in modalità safe." };
  }
}
