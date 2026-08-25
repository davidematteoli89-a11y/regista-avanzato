import type { ArticleDraftGenerationResult } from "@/lib/articleGenerator/articleGeneratorTypes";
import { AdminArticleDraftPreview } from "./AdminArticleDraftPreview";
import { AdminArticleRiskBox } from "./AdminArticleRiskBox";

export function AdminArticleGeneratorPanel({ result }: { result: ArticleDraftGenerationResult }) {
  return <div className="stack"><section className="admin-section-card"><h2>Pannello generazione mock</h2><p>Il pannello esegue una funzione deterministica server-safe con riferimenti mock già selezionati.</p><dl className="admin-metadata"><dt>AI esterne</dt><dd>{result.externalAiCalls}</dd><dt>Rete</dt><dd>{result.networkCalls}</dd><dt>File scritti</dt><dd>{result.filesWritten}</dd><dt>Database</dt><dd>{result.databaseWrites}</dd><dt>Pubblicato</dt><dd>No</dd></dl><h3>Istruzioni interne</h3><pre className="article-prompt-preview">{result.draft.internalPrompt}</pre></section><AdminArticleRiskBox riskLevel={result.draft.riskLevel} risks={result.draft.risks} /><AdminArticleDraftPreview draft={result.draft} /><section className="admin-section-card"><h2>Markdown in memoria</h2><pre className="article-markdown-preview">{result.markdown}</pre><p className="muted">Questa stringa non è stata scritta su disco.</p></section></div>;
}
