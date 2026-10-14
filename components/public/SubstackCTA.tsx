import { REGISTA_AVANZATO_SUBSTACK_URL, SUBSTACK_EXTERNAL_LINK_PROPS } from "@/lib/substack/publicSubstack";
import type { SubstackCtaLabel } from "@/lib/substack/substackTypes";

export function SubstackCTA({ label = "Leggi su Substack", compact = false }: { label?: SubstackCtaLabel; compact?: boolean }) {
  return (
    <aside className={compact ? "substack-cta compact" : "access-box substack-cta"}>
      {!compact && <><span className="eyebrow">Canale editoriale esterno</span><h2>Regista Avanzato su Substack</h2><p>Newsletter e report restano esterni al sito. Nessun pagamento o premium interno è attivo.</p></>}
      <a className="button-link" href={REGISTA_AVANZATO_SUBSTACK_URL} {...SUBSTACK_EXTERNAL_LINK_PROPS}>{label}</a>
    </aside>
  );
}
