import { LoginRequiredBlock } from "./LoginRequiredBlock";

export function HighlightLinksPreviewBlock({ fullAccess = false }: { fullAccess?: boolean }) {
  return (
    <section className="preview-block">
      <span className="eyebrow">Highlights</span>
      <h2>{fullAccess ? "Link highlights ufficiali" : "Highlights disponibili"}</h2>
      {fullAccess ? (
        <p className="muted">Nessun link reale inserito. Saranno mostrati solo URL ufficiali verificati.</p>
      ) : (
        <LoginRequiredBlock />
      )}
    </section>
  );
}
