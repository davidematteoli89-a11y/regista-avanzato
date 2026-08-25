import { LoginRequiredBlock } from "./LoginRequiredBlock";

export function StatsPreviewBlock({ fullAccess = false }: { fullAccess?: boolean }) {
  return (
    <section className="preview-block">
      <span className="eyebrow">Statistiche</span>
      <h2>{fullAccess ? "Statistiche complete" : "Anteprima statistiche"}</h2>
      <div className="preview-grid">
        <div><strong>Possesso</strong><span>54%</span></div>
        <div><strong>Tiri</strong><span>14</span></div>
        <div className={fullAccess ? "" : "preview-blur"}><strong>xG e dettagli</strong><span>{fullAccess ? "1.82" : "—"}</span></div>
      </div>
      {!fullAccess && <LoginRequiredBlock />}
      {fullAccess && <p className="muted">Struttura sbloccata; i dati reali arriveranno dagli snapshot Supabase.</p>}
    </section>
  );
}
