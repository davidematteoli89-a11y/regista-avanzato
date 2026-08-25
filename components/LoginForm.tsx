import Link from "next/link";

export function LoginForm({
  action,
  configured,
}: {
  action: (formData: FormData) => Promise<void>;
  configured: boolean;
}) {
  return (
    <form action={action} className="stack form-card">
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required disabled={!configured} />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required disabled={!configured} />
      </label>
      <button type="submit" disabled={!configured}>Accedi gratis</button>
      <p>Non hai un account? <Link href="/registrati">Registrati gratuitamente</Link>.</p>
    </form>
  );
}
