import type { PublicArticleView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { ArticleCard } from "./ArticleCard";
import { EmptyPublicState } from "./EmptyPublicState";

export function ArticleGrid({ articles }: { articles: readonly PublicArticleView[] }) {
  return articles.length ? <div className="article-grid">{articles.map((article) => <ArticleCard key={article.id} article={article} />)}</div> : <EmptyPublicState title="Nessun articolo pubblico" />;
}
