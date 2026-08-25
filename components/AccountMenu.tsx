import Link from "next/link";

export function AccountMenu({
  email,
  logoutAction,
}: {
  email: string | null;
  logoutAction: () => Promise<void>;
}) {
  return (
    <nav className="account-menu" aria-label="Menu account">
      <span>{email ?? "Account free"}</span>
      <Link href="/account">Riepilogo</Link>
      <Link href="/account/preferenze">Preferenze</Link>
      <form action={logoutAction}><button type="submit" className="button-secondary">Esci</button></form>
    </nav>
  );
}
