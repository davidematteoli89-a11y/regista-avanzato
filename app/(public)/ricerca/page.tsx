import Link from "next/link";
import { SearchUsageBox } from "@/components/SearchUsageBox";
import { SubstackCTA } from "@/components/SubstackCTA";
import { AdvancedSearchBox } from "@/components/public/AdvancedSearchBox";
import { SearchFiltersPanel } from "@/components/public/SearchFiltersPanel";
import { SearchLimitBanner } from "@/components/public/SearchLimitBanner";
import { SearchResultCard } from "@/components/public/SearchResultCard";
import { getCurrentUser } from "@/lib/auth/access";
import { checkUserSearchLimit } from "@/lib/freeSearch/checkUserSearchLimit";
import { incrementUserSearchUsage } from "@/lib/freeSearch/incrementUserSearchUsage";
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
  const consumedLimitStatus = user && requestedSearch && limitStatus.allowed
    ? await incrementUserSearchUsage({ searchType: "advanced", userId: user.id })
    : null;
  const effectiveLimitStatus = consumedLimitStatus
    ? {
        mode: consumedLimitStatus.mode,
        user_id: user?.id ?? null,
        allowed: consumedLimitStatus.incremented,
        used_count: consumedLimitStatus.used_count,
        search_limit: consumedLimitStatus.search_limit,
        remaining: consumedLimitStatus.remaining,
        period_start: limitStatus.period_start,
        period_end: limitStatus.period_end,
        reason: consumedLimitStatus.reason,
        persisted: consumedLimitStatus.persisted,
      }
    : limitStatus;
  const response = user && requestedSearch ? await advancedSearch({ query, limitStatus: effectiveLimitStatus }) : null;
  const preview = getAdvancedSearchPreview();

  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Stats Hub</span>
        <h1>Ricerca avanzata</h1>
        <p>Cerca trasversalmente dati e contenuti. L’accesso è gratuito con tre ricerche avanzate al mese.</p>
      </header>

      {user && <SearchUsageBox usage={{
        mode: effectiveLimitStatus.mode, userId: user.id, periodStart: effectiveLimitStatus.period_start, periodEnd: effectiveLimitStatus.period_end,
        used: effectiveLimitStatus.used_count, limit: effectiveLimitStatus.search_limit, remaining: effectiveLimitStatus.remaining,
        canSearch: effectiveLimitStatus.allowed, persisted: effectiveLimitStatus.persisted, message: effectiveLimitStatus.reason,
      }} />}

      <AdvancedSearchBox
        query={query}
        disabled={!user || !effectiveLimitStatus.allowed}
        filtersPanel={<SearchFiltersPanel filters={query.filters} disabled={!user || !effectiveLimitStatus.allowed} />}
      />

      {!user && (
        <aside className="access-box locked-block">
          <span className="eyebrow">Login free</span>
          <h2>Tre ricerche avanzate gratuite al mese</h2>
          <p>{LOGIN_MESSAGE}</p>
          <div className="actions"><Link className="button-link" href="/login">Accedi</Link><Link href="/registrati">Registrati gratis</Link></div>
        </aside>
      )}

      {user && !effectiveLimitStatus.allowed && <><SearchLimitBanner /><SubstackCTA /></>}

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
