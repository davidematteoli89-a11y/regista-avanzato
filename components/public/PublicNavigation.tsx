import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/access";

const links = [
  ["Radar", "/radar"], ["News", "/news"], ["Articoli", "/articoli"], ["Storie", "/storie"], ["Talenti", "/talenti"], ["Partite pazze", "/partite-pazze"], ["Stats", "/competizioni"], ["Video Radar", "/video-radar"], ["Newsletter", "/newsletter"],
] as const;

export async function PublicNavigation() {
  const user = await getCurrentUser();

  return (
    <nav className="public-navigation" aria-label="Navigazione principale">
      <Link className="public-brand" href="/">
        Regista Avanzato<span>Dati, storie, calcio</span>
      </Link>
      <div className="public-navigation-links">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
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
