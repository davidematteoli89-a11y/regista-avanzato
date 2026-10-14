import Link from "next/link";
import type { PublicArticleView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { EditorialBadge } from "./EditorialBadge";

export function HomeHero({ article }: { article: PublicArticleView }) {
  return (
    <section className="home-hero">
      <div>
        <span className="eyebrow">Dashboard editoriale calcistica</span>
        <h1>Regista Avanzato</h1>
        <p>
          Il calcio raccontato meglio. Storie, tattica, cultura e attualità
          fuori dal rumore del mainstream.
        </p>
        <div className="actions">
          <Link className="button-link" href="/manifesto">Leggi il Manifesto</Link>
          <Link className="button-secondary" href="/rubriche">Scopri le Rubriche</Link>
          <Link href="/competitions">Esplora i campionati</Link>
        </div>
        <div className="hero-badge-row" aria-label="Principi editoriali">
          <span className="stats-badge">No betting</span>
          <span className="stats-badge">No hype facile</span>
          <span className="stats-badge">Dati, storie, contesto</span>
        </div>
      </div>
      <article className="hero-feature">
        <EditorialBadge category={article.category} />
        <p className="muted">{article.kicker}</p>
        <h2>Control room del calcio laterale</h2>
        <p>
          Campionati nel radar, talenti da osservare, mappe del weekend e video
          ufficiali/contenuti propri in un’unica plancia editoriale.
        </p>
        <div className="dashboard-metric-grid" aria-label="Aree editoriali">
          <span>Campionati nel radar</span>
          <span>Talenti da osservare</span>
          <span>Mappe del weekend</span>
          <span>Video Radar</span>
        </div>
        <small>{article.readingMinutes} minuti · {article.authorLabel}</small>
      </article>
    </section>
  );
}
