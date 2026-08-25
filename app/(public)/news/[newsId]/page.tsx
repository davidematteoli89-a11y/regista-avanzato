import Link from "next/link";
import { LoginFreeCTA } from "@/components/public/LoginFreeCTA";
import { NewsCategoryBadge } from "@/components/public/NewsCategoryBadge";
import { NewsEditorialNotice } from "@/components/public/NewsEditorialNotice";
import { NewsSourceBadge } from "@/components/public/NewsSourceBadge";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { getPublicNewsDetail } from "@/lib/newsRadar/getPublicNewsDetail";

type Params = { newsId: string };

export default async function NewsDetailPage({ params }: { params: Params | Promise<Params> }) {
  const { newsId } = await Promise.resolve(params);
  const detail = await getPublicNewsDetail(newsId);
  if (!detail) return <main><h1>News non disponibile</h1><p>La notizia non esiste oppure non è approvata per il pubblico.</p><Link href="/news">Torna alle news</Link></main>;
  const { news, access } = detail;
  return <main className="stack article-detail"><header><div className="stats-badge-row"><NewsCategoryBadge category={news.category} />{news.sources.map((source) => <NewsSourceBadge key={source.id} source={source} />)}</div><h1>{news.title}</h1><p>{news.summary}</p><Link href="/news">Tutte le news</Link></header><NewsEditorialNotice />{access.canViewFull ? <article className="article-body">{news.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article> : <p className="notice">{access.message}</p>}{access.requiresLogin && <LoginFreeCTA />}{access.redirectsToSubstack && <NewsletterCTA />}{!access.canViewFull && !access.requiresLogin && !access.redirectsToSubstack && <p className="notice">Questa è una preview pubblica approvata.</p>}{news.relatedEntities.length > 0 && <section><h2>Collegamenti</h2><ul>{news.relatedEntities.map((entity) => <li key={`${entity.type}-${entity.id}`}>{entity.href ? <Link href={entity.href}>{entity.label}</Link> : entity.label}</li>)}</ul></section>}<p className="muted">Nessuno score tecnico, warning admin o fonte interna viene mostrato. La lettura non consuma quota ricerca.</p></main>;
}
