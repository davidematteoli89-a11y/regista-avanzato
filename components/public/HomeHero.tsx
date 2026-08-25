import Link from "next/link";
import type { PublicArticleView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { EditorialBadge } from "./EditorialBadge";

export function HomeHero({ article }: { article: PublicArticleView }) {
  return <section className="home-hero"><div><span className="eyebrow">Magazine calcistico</span><h1>Dove i numeri incontrano le storie</h1><p>Regista Avanzato osserva partite, talenti e segnali per trasformarli in contenuti verificati e leggibili.</p><div className="actions"><Link className="button-link" href={`/articoli/${article.slug}`}>Leggi la storia di copertina</Link><Link href="/radar">Apri il Radar</Link></div></div><article className="hero-feature"><EditorialBadge category={article.category} /><p className="muted">{article.kicker}</p><h2>{article.title}</h2><p>{article.summary}</p><span>{article.readingMinutes} minuti · {article.authorLabel}</span></article></section>;
}
