import Link from "next/link";

export const metadata = {
  title: "Manifesto | Regista Avanzato",
  description:
    "Perché nasce Regista Avanzato: il calcio fuori dal mainstream, letto con dati, storie e contesto.",
};

const manifestoParagraphs = [
  "Il calcio non vive soltanto dove arrivano prima le telecamere, i trend e le grafiche in tempo reale. Esiste un’altra parte del gioco: campionati meno raccontati, squadre che lavorano lontano dal centro, talenti che non sono ancora diventati slogan, città e tifoserie che spiegano qualcosa del calcio prima ancora del risultato.",
  "Regista Avanzato nasce per stare lì. Non per inseguire ogni notizia. Non per copiare un database. Non per trasformare ogni partita in un pronostico. Nasce per costruire un osservatorio calcistico narrativo: un luogo in cui dati essenziali, contesto, storie e radar video aiutano a capire perché vale la pena guardare qualcosa prima che diventi ovvio.",
  "Il punto non è sapere tutto. È scegliere meglio cosa osservare. Ci sono campionati che funzionano come laboratori: per i talenti, per le idee tattiche, per i modelli sportivi, per il rapporto tra club e territorio. Ci sono squadre che, anche senza dominare il mainstream, raccontano una direzione.",
  "Il dato serve, ma non basta. Una classifica racconta dove sei; non sempre racconta perché ci sei arrivato. Un highlight accende la curiosità; non sempre spiega il contesto. Una news informa; non sempre lascia qualcosa dopo. Qui il dato deve diventare una porta d’ingresso, non una gabbia.",
  "Regista Avanzato non è un sito di pronostici, non è un clone di database e non è un aggregatore automatico. Ogni contenuto deve avere una voce, una selezione e una ragione editoriale. Se un dato manca, va dichiarato. Se un’ipotesi è un’ipotesi, va trattata come tale.",
  "In questa fase MVP, i primi dati sono iniziali e curati manualmente. È una scelta di metodo: partire piccoli, verificare il percorso pubblico, non pubblicare automaticamente contenuti o import finché non esistono criteri chiari. Regista Avanzato crescerà con newsletter, rubriche, scouting narrativo, radar video e, in futuro, podcast e interviste con chi osserva il calcio da dentro.",
  "Non cerchiamo il “nuovo Messi”. Cerchiamo storie che meritano attenzione. Non promettiamo certezze. Proviamo a costruire contesto. Il calcio interessante spesso arriva prima in silenzio. Regista Avanzato nasce per ascoltarlo.",
];

export default function ManifestoPage() {
  return (
    <main className="stack article-detail">
      <header>
        <span className="eyebrow">Manifesto</span>
        <h1>Perché nasce Regista Avanzato</h1>
        <p>
          Il calcio interessante non vive solo nei campionati più illuminati.
        </p>
        <div className="actions">
          <Link className="button-link" href="/competitions">
            Esplora i campionati
          </Link>
          <Link href="/rubriche">Scopri le rubriche</Link>
        </div>
      </header>

      <article className="article-body">
        {manifestoParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <section className="preview-block" aria-labelledby="manifesto-next-title">
        <span className="stats-badge">Prossimo passo editoriale</span>
        <h2 id="manifesto-next-title">Newsletter in preparazione</h2>
        <p>
          La newsletter sarà il luogo più diretto per seguire il progetto:
          mappe, rubriche, appunti editoriali e segnali da osservare senza
          automatismi o contenuti non verificati.
        </p>
        <div className="actions">
          <Link href="/rubriche">Leggi le rubriche</Link>
          <Link href="/competitions">Vai alle competizioni pubbliche</Link>
        </div>
      </section>
    </main>
  );
}
