import Link from "next/link";

export function PublicFooter() {
  return <footer className="public-footer"><div><strong>Regista Avanzato</strong><p>Magazine calcistico mock: dati, memoria e revisione umana.</p></div><nav><Link href="/chi-siamo">Chi siamo</Link><Link href="/metodo">Metodo</Link><Link href="/newsletter">Newsletter</Link><Link href="/login">Login free</Link></nav><p className="muted">Nessun dato live, scouting certificato o contenuto pubblicato automaticamente.</p></footer>;
}
