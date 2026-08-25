import Link from "next/link";
import type { PublicArticleView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { ContentStatusBadge } from "./ContentStatusBadge";
import { EditorialBadge } from "./EditorialBadge";

export function ArticleCard({ article }: { article: PublicArticleView }) {
  return <article className="article-card"><div className="stats-badge-row"><EditorialBadge category={article.category} /><ContentStatusBadge status={article.status} /></div><p className="muted">{article.kicker}</p><h2>{article.title}</h2><p>{article.summary}</p><div className="article-meta"><span>{article.format}</span><span>{article.readingMinutes} min</span></div><Link href={`/articoli/${article.slug}`}>{article.visibility === "public_full" ? "Leggi" : "Apri l’anteprima"}</Link></article>;
}
