import Link from "next/link";

export function RegisterForm({
  action,
  configured,
}: {
  action: (formData: FormData) => Promise<void>;
  configured: boolean;
}) {
  return (
    <form action={action} className="stack form-card">
      <label>
        Nome visualizzato
        <input name="displayName" type="text" autoComplete="name" disabled={!configured} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required disabled={!configured} />
      </label>
      <label>
        Password
        <input name="password" type="password" minLength={8} autoComplete="new-password" required disabled={!configured} />
      </label>
      <button type="submit" disabled={!configured}>Crea account free</button>
      <p>Hai già un account? <Link href="/login">Accedi</Link>.</p>
    </form>
  );
}
