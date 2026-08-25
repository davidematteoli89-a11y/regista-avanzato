import { ArticleGrid } from "@/components/public/ArticleGrid";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { getPublicArticles } from "@/lib/publicWebsite/getPublicArticles";

export default async function ArticlesPage() {
  const data = await getPublicArticles();
  return <main className="stack"><header><span className="eyebrow">Magazine</span><h1>Articoli</h1><p>Storie, talenti, numeri e segnali trasformati in contenuti originali o rielaborati e revisionati.</p></header><ArticleGrid articles={data.items} /><NewsletterCTA /><p className="notice">{data.message} Leggere e navigare non consuma ricerche avanzate.</p></main>;
}
