import Image from "next/image";
import Link from "next/link";
import { REGISTA_AVANZATO_SUBSTACK_URL, SUBSTACK_EXTERNAL_LINK_PROPS } from "@/lib/substack/publicSubstack";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-brand">
        <Image alt="" aria-hidden="true" className="public-footer-logo" height={54} src="/regista-avanzato-logo.png" width={54} />
        <div>
          <strong>Regista Avanzato</strong>
          <p>Magazine calcistico editoriale: dati, storie e contesto fuori dal rumore.</p>
        </div>
      </div>
      <nav aria-label="Link principali footer">
        <Link href="/manifesto">Manifesto</Link>
        <Link href="/rubriche">Rubriche</Link>
        <Link href="/competitions">Competitions</Link>
        <Link href="/chi-siamo">Chi siamo</Link>
        <Link href="/metodo">Metodo</Link>
        <a href={REGISTA_AVANZATO_SUBSTACK_URL} {...SUBSTACK_EXTERNAL_LINK_PROPS}>
          Newsletter · Leggi Regista Avanzato su Substack
        </a>
      </nav>
      <p className="muted">
        No betting. No hype facile. Nessun dato live, scouting certificato o
        contenuto pubblicato automaticamente.
      </p>
    </footer>
  );
}
