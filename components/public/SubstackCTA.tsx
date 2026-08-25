import { getSubstackConfig } from "@/lib/substack/substackConfig";
import type { SubstackCtaLabel } from "@/lib/substack/substackTypes";

export function SubstackCTA({ label = "Leggi su Substack", compact = false }: { label?: SubstackCtaLabel; compact?: boolean }) {
  const config = getSubstackConfig();
  return (
    <aside className={compact ? "substack-cta compact" : "access-box substack-cta"}>
      {!compact && <><span className="eyebrow">Canale editoriale esterno</span><h2>Regista Avanzato su Substack</h2><p>Newsletter e report restano esterni al sito. Nessun pagamento o premium interno è attivo.</p></>}
      {config.configured && config.url
        ? <a className="button-link" href={config.url} target="_blank" rel="noreferrer">{label}</a>
        : <span className="button-link disabled-link" aria-disabled="true" title={config.reason}>{label}</span>}
      {!config.configured && <p className="muted">CTA non attiva: configurare `SUBSTACK_URL` server-side.</p>}
    </aside>
  );
}
