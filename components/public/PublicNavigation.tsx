import Link from "next/link";

const links = [
  ["Radar", "/radar"], ["News", "/news"], ["Articoli", "/articoli"], ["Storie", "/storie"], ["Talenti", "/talenti"], ["Partite pazze", "/partite-pazze"], ["Stats", "/competizioni"], ["Video Radar", "/video-radar"], ["Newsletter", "/newsletter"],
] as const;

export function PublicNavigation() {
  return <nav className="public-navigation" aria-label="Navigazione principale"><Link className="public-brand" href="/">Regista Avanzato<span>Dati, storie, calcio</span></Link><div>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div><Link className="button-link" href="/login">Accedi gratis</Link></nav>;
}
