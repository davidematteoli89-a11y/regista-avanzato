import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/access";
import { REGISTA_AVANZATO_SUBSTACK_URL, SUBSTACK_EXTERNAL_LINK_PROPS } from "@/lib/substack/publicSubstack";

const links = [
  ["Home", "/"],
  ["Manifesto", "/manifesto"],
  ["Rubriche", "/rubriche"],
  ["Competitions", "/competitions"],
] as const;

export async function PublicNavigation() {
  const user = await getCurrentUser();

  return (
    <nav className="public-navigation" aria-label="Navigazione principale">
      <Link className="public-brand" href="/">
        <Image alt="" aria-hidden="true" className="public-brand-logo" height={42} src="/regista-avanzato-logo.png" width={42} />
        <span className="public-brand-copy">
          <strong>Regista Avanzato</strong>
          <small>Dati, storie, calcio</small>
        </span>
      </Link>
      <div className="public-navigation-links">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <a href={REGISTA_AVANZATO_SUBSTACK_URL} {...SUBSTACK_EXTERNAL_LINK_PROPS}>Newsletter</a>
      </div>
      {user ? (
        <Link className="button-link" href="/account">Account</Link>
      ) : (
        <div className="public-auth-actions">
          <a className="button-link" href="/login">Accedi</a>
          <a href="/registrati">Registrati gratis</a>
        </div>
      )}
    </nav>
  );
}
