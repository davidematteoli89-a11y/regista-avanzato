import Link from "next/link";
import { EditorialBadge } from "@/components/public/EditorialBadge";
import { LoginFreeCTA } from "@/components/public/LoginFreeCTA";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { getPublicArticleDetail } from "@/lib/publicWebsite/getPublicArticleDetail";

type Params = { articleId: string };

export default async function ArticleDetailPage({ params }: { params: Params | Promise<Params> }) {
  const { articleId } = await Promise.resolve(params);
  const detail = await getPublicArticleDetail(articleId);
  if (!detail) return <main><h1>Articolo non disponibile</h1><p>Il contenuto non esiste o non è stato approvato per il pubblico.</p><Link href="/articoli">Torna agli articoli</Link></main>;
  const { article, access } = detail;
  return <main className="stack article-detail"><header><EditorialBadge category={article.category} /><p className="eyebrow">{article.kicker}</p><h1>{article.title}</h1><p>{article.summary}</p><div className="article-meta"><span>{article.authorLabel}</span><span>{article.readingMinutes} minuti</span><span>{article.format}</span></div><Link href="/articoli">Tutti gli articoli</Link></header><p className="article-lead">{article.previewText}</p>{access.canViewFull ? <article className="article-body">{article.bodySections.map((section) => <section key={section.id}>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</article> : <p className="notice">{access.message}</p>}{access.requiresLogin && <LoginFreeCTA />}{access.redirectsToSubstack && <NewsletterCTA />}{!access.canViewFull && !access.requiresLogin && !access.redirectsToSubstack && <p className="notice">Questa è l’anteprima pubblica approvata.</p>}{article.sources.length > 0 && <section className="article-sources"><h2>Fonti pubbliche</h2><ul>{article.sources.map((source) => <li key={source.id}>{source.publicUrl ? <Link href={source.publicUrl}>{source.label}</Link> : source.label}</li>)}</ul></section>}<p className="muted">La lettura dell’articolo non consuma la quota di ricerca avanzata.</p></main>;
}
