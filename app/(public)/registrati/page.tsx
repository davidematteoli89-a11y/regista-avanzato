import { RegisterForm } from "@/components/RegisterForm";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { registerAction } from "./actions";

type PageProps = { searchParams: Promise<{ state?: string | string[] }> };

export default async function RegisterPage({ searchParams }: PageProps) {
  const runtime = getSupabaseRuntimeStatus();
  const state = (await searchParams).state;
  const stateValue = Array.isArray(state) ? state[0] : state;

  return (
    <main>
      <span className="eyebrow">Account gratuito</span>
      <h1>Registrati gratis</h1>
      <p>Nessun pagamento e nessun abbonamento premium interno.</p>
      {!runtime.configured && <p className="notice">Modalità safe: Supabase non è configurato e la registrazione è disabilitata.</p>}
      {stateValue === "invalid" && <p className="notice error">Inserisci un’email valida e una password di almeno 8 caratteri.</p>}
      {stateValue === "error" && <p className="notice error">Registrazione non completata.</p>}
      <RegisterForm action={registerAction} configured={runtime.configured} />
    </main>
  );
}
