import { LoginForm } from "@/components/LoginForm";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { loginAction } from "./actions";

type PageProps = { searchParams: Promise<{ state?: string | string[] }> };

export default async function LoginPage({ searchParams }: PageProps) {
  const runtime = getSupabaseRuntimeStatus();
  const state = (await searchParams).state;
  const stateValue = Array.isArray(state) ? state[0] : state;

  return (
    <main>
      <span className="eyebrow">Account gratuito</span>
      <h1>Accedi</h1>
      <p>Statistiche complete, highlights ufficiali e Video Radar senza pagamenti.</p>
      {!runtime.configured && <p className="notice">Modalità safe: Supabase non è configurato e il login è disabilitato.</p>}
      {stateValue === "invalid" && <p className="notice error">Credenziali non valide.</p>}
      {stateValue === "registered" && <p className="notice success">Registrazione ricevuta. Controlla l’email se è richiesta la conferma.</p>}
      <LoginForm action={loginAction} configured={runtime.configured} />
    </main>
  );
}
