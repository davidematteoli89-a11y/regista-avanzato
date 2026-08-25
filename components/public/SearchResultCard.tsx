import Link from "next/link";
import type { SearchResult } from "@/lib/search/searchTypes";

export function SearchResultCard({ result, preview = false }: { result: SearchResult; preview?: boolean }) {
  return (
    <article className={`search-result-card${preview ? " preview-blur" : ""}`}>
      <span className="eyebrow">{result.entityType.replaceAll("_", " ")}</span>
      <h3>{result.title}</h3>
      <p>{result.summary}</p>
      <div className="search-result-meta">
        {result.country && <span>{result.country}</span>}
        {result.season && <span>Stagione {result.season}</span>}
        {result.hasOfficialHighlights && <span>Highlights ufficiali</span>}
        {result.hasVideoRadar && <span>Video Radar</span>}
      </div>
      {!preview && <Link href={result.href}>Apri scheda</Link>}
    </article>
  );
}
