import type { ReactNode } from "react";
import { SEARCH_TYPES, type SearchQuery } from "@/lib/search/searchTypes";

const LABELS: Record<(typeof SEARCH_TYPES)[number], string> = {
  all: "Tutto", players: "Giocatori", teams: "Squadre", competitions: "Campionati", matches: "Partite",
  stories: "Storie", articles: "Articoli", highlights: "Highlights", video_radar: "Video Radar",
  historical_echo: "Historical Echo", news: "News Radar",
};

export function AdvancedSearchBox({ query, disabled = false, filtersPanel }: { query: SearchQuery; disabled?: boolean; filtersPanel?: ReactNode }) {
  return (
    <form className="form-card stack" action="/ricerca" method="get">
      <input type="hidden" name="search" value="1" />
      <label>Cerca nell’archivio
        <input name="q" defaultValue={query.text} placeholder="Giocatore, squadra, partita, storia…" disabled={disabled} maxLength={120} />
      </label>
      <label>Tipo
        <select name="type" defaultValue={query.type} disabled={disabled}>
          {SEARCH_TYPES.map((type) => <option key={type} value={type}>{LABELS[type]}</option>)}
        </select>
      </label>
      {filtersPanel}
      <button type="submit" disabled={disabled}>Esegui ricerca avanzata</button>
      <p className="muted">Solo questo pulsante rappresenterà una ricerca avanzata. Aprire schede, statistiche, highlights e Video Radar non consuma quota.</p>
    </form>
  );
}
