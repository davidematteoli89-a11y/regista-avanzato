import Link from "next/link";
import type { PublicArticleView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { EditorialBadge } from "./EditorialBadge";

export function FeaturedArticleCard({ article }: { article: PublicArticleView }) {
  return <article className="featured-article-card"><EditorialBadge category={article.category} /><p className="muted">{article.kicker}</p><h2>{article.title}</h2><p>{article.summary}</p><Link href={`/articoli/${article.slug}`}>Apri {article.visibility === "public_full" ? "l’articolo" : "l’anteprima"}</Link></article>;
}
