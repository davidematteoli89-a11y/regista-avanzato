import Link from "next/link";
import { SearchUsageBox } from "@/components/SearchUsageBox";
import { SubstackCTA } from "@/components/SubstackCTA";
import { AdvancedSearchBox } from "@/components/public/AdvancedSearchBox";
import { SearchFiltersPanel } from "@/components/public/SearchFiltersPanel";
import { SearchLimitBanner } from "@/components/public/SearchLimitBanner";
import { SearchResultCard } from "@/components/public/SearchResultCard";
import { getCurrentUser } from "@/lib/auth/access";
import { checkUserSearchLimit } from "@/lib/freeSearch/checkUserSearchLimit";
import { advancedSearch, getAdvancedSearchPreview } from "@/lib/search/advancedSearch";
import { DEFAULT_SEARCH_FILTERS, isSearchType, normalizeSearchQuery } from "@/lib/search/searchFilters";

const LOGIN_MESSAGE = "Accedi gratis per usare la ricerca avanzata su giocatori, squadre, partite, storie e Video Radar.";
type PageSearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined): string => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export default async function AdvancedSearchPage({ searchParams }: { searchParams?: PageSearchParams | Promise<PageSearchParams> }) {
  const params = await Promise.resolve(searchParams ?? {});
  const user = await getCurrentUser();
  const limitStatus = await checkUserSearchLimit({ userId: user?.id ?? null });
  const rawType = first(params.type);
  const query = normalizeSearchQuery({
    text: first(params.q),
    type: isSearchType(rawType) ? rawType : "all",
    filters: {
      ...DEFAULT_SEARCH_FILTERS,
      countries: first(params.country) ? [first(params.country)] : [],
      competitionIds: first(params.competition) ? [first(params.competition)] : [],
      season: first(params.season) || null,
      dateFrom: first(params.dateFrom) || null,
      dateTo: first(params.dateTo) || null,
      onlyWithHighlights: first(params.highlights) === "1",
      onlyVideoRadar: first(params.videoRadar) === "1",
    },
  });
  const requestedSearch = first(params.search) === "1";
  const response = user && requestedSearch ? await advancedSearch({ query, limitStatus }) : null;
  const preview = getAdvancedSearchPreview();

  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Stats Hub</span>
        <h1>Ricerca avanzata</h1>
        <p>Cerca trasversalmente dati e contenuti. L’accesso è gratuito con tre ricerche avanzate al mese.</p>
      </header>

      {user && <SearchUsageBox usage={{
        mode: "safe_mock", userId: user.id, periodStart: limitStatus.period_start, periodEnd: limitStatus.period_end,
        used: limitStatus.used_count, limit: limitStatus.search_limit, remaining: limitStatus.remaining,
        canSearch: limitStatus.allowed, persisted: false, message: limitStatus.reason,
      }} />}

      <AdvancedSearchBox
        query={query}
        disabled={!user || !limitStatus.allowed}
        filtersPanel={<SearchFiltersPanel filters={query.filters} disabled={!user || !limitStatus.allowed} />}
      />

      {!user && (
        <aside className="access-box locked-block">
          <span className="eyebrow">Login free</span>
          <h2>Tre ricerche avanzate gratuite al mese</h2>
          <p>{LOGIN_MESSAGE}</p>
          <div className="actions"><Link className="button-link" href="/login">Accedi</Link><Link href="/registrati">Registrati gratis</Link></div>
        </aside>
      )}

      {user && !limitStatus.allowed && <><SearchLimitBanner /><SubstackCTA /></>}

      {response && (
        <section className="stack" aria-live="polite">
          <div><span className="eyebrow">Risultati mock</span><h2>{response.totalResults} risultati</h2><p>{response.message}</p></div>
          {response.groups.map((group) => (
            <section className="stack" key={group.entityType}>
              <h2>{group.label}</h2>
              <div className="search-results-grid">{group.results.map((result) => <SearchResultCard key={result.id} result={result} />)}</div>
            </section>
          ))}
          {response.totalResults === 0 && <p className="notice">Nessun risultato mock per i filtri selezionati.</p>}
        </section>
      )}

      {!response && (
        <section className="stack">
          <div><span className="eyebrow">Anteprima</span><h2>Cosa potrai trovare</h2><p>Questi record sono dimostrativi e non consumano quota.</p></div>
          <div className="search-results-grid">{preview.map((result) => <SearchResultCard key={result.id} result={result} preview={!user} />)}</div>
        </section>
      )}
    </main>
  );
}
