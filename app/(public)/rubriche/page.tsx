import Link from "next/link";

export const metadata = {
  title: "Rubriche | Regista Avanzato",
  description:
    "Le rubriche editoriali iniziali di Regista Avanzato: campionati nel radar, talenti, mappe del weekend e storie fuori dal mainstream.",
};

const columns = [
  {
    name: "Campionati nel radar",
    voice: "Regista + Radar",
    description:
      "Schede e racconti sui campionati che meritano attenzione prima di entrare nel racconto mainstream.",
  },
  {
    name: "Talento della settimana",
    voice: "Scout",
    description:
      "Una scheda narrativa per osservare un giocatore emergente senza cedere all’hype facile.",
  },
  {
    name: "La mappa del weekend",
    voice: "Radar",
    description:
      "Tre partite, due giocatori e una storia da seguire per orientarsi nel calcio fuori dal mainstream.",
  },
  {
    name: "Il calcio si ripete",
    voice: "Archivio",
    description:
      "Storie, ricorrenze e parallelismi per capire come il passato continua a lasciare impronte nel presente.",
  },
  {
    name: "Video Radar",
    voice: "Social/Video + Radar",
    description:
      "Segnalazioni di video ufficiali, contenuti propri e spunti visivi, sempre nel rispetto dei diritti.",
  },
  {
    name: "Storie fuori dal mainstream",
    voice: "Regista + Archivio",
    description:
      "Club, città, allenatori, tifoserie e percorsi che meritano un racconto più profondo.",
  },
] as const;

export default function RubrichePage() {
  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Rubriche</span>
        <h1>Le voci editoriali di Regista Avanzato</h1>
        <p>
          Le rubriche servono a trasformare dati essenziali, contesto e
          osservazione in percorsi leggibili: meno rumore, più criterio.
        </p>
        <div className="actions">
          <Link className="button-link" href="/manifesto">
            Leggi il manifesto
          </Link>
          <Link href="/competitions">Esplora i campionati</Link>
        </div>
      </header>

      <section className="public-stats-grid" aria-label="Rubriche editoriali">
        {columns.map((column) => (
          <article className="public-stat-card" key={column.name}>
            <span className="stats-badge">{column.voice}</span>
            <h2>{column.name}</h2>
            <p>{column.description}</p>
          </article>
        ))}
      </section>

      <aside className="notice">
        <strong>Nota video e diritti.</strong> Regista Avanzato usa solo video
        ufficiali, embed permessi o contenuti propri. Niente clip non
        autorizzate.
      </aside>

      <section className="preview-block" aria-labelledby="rubriche-method-title">
        <span className="stats-badge">Metodo</span>
        <h2 id="rubriche-method-title">Ogni rubrica resta una scelta editoriale</h2>
        <p>
          Le rubriche non attivano import automatici, provider o pubblicazioni
          esterne. Ogni contenuto richiede revisione manuale, verifica delle
          fonti se cita dati aggiornati e distinzione tra fatti, opinioni e
          ipotesi.
        </p>
      </section>
    </main>
  );
}
