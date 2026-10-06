import Link from "next/link";
import type { PublicArticleView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { EditorialBadge } from "./EditorialBadge";

export function HomeHero({ article }: { article: PublicArticleView }) {
  return (
    <section className="home-hero">
      <div>
        <span className="eyebrow">Osservatorio calcistico narrativo</span>
        <h1>Regista Avanzato</h1>
        <p>
          Il calcio fuori dal mainstream, letto con dati, storie e contesto.
          Un osservatorio narrativo per seguire campionati, squadre e talenti
          meno raccontati: statistiche essenziali, percorsi, radar video e
          spunti editoriali in un unico spazio.
        </p>
        <div className="actions">
          <Link className="button-link" href="/competitions">
            Esplora le competizioni
          </Link>
          <Link href="/newsletter">Segui la newsletter</Link>
          <Link href={`/articoli/${article.slug}`}>Scopri il progetto</Link>
        </div>
        <p className="notice">
          MVP pubblico: i primi dati sono curati manualmente per validare
          struttura, esperienza e racconto.
        </p>
      </div>
      <article className="hero-feature">
        <EditorialBadge category={article.category} />
        <p className="muted">{article.kicker}</p>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <span>{article.readingMinutes} minuti · {article.authorLabel}</span>
      </article>
    </section>
  );
}
