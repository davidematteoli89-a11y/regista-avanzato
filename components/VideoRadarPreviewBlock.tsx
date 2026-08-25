import { LoginRequiredBlock } from "./LoginRequiredBlock";

export function VideoRadarPreviewBlock({ fullAccess = false }: { fullAccess?: boolean }) {
  return (
    <section className="preview-block">
      <span className="eyebrow">Video Radar</span>
      <h2>{fullAccess ? "Video Radar completo" : "Anteprima Video Radar"}</h2>
      <p>Analisi originale, grafiche e commento basati su dati già salvati.</p>
      {fullAccess ? <p className="muted">Contenuti video reali ancora placeholder.</p> : <LoginRequiredBlock />}
    </section>
  );
}
