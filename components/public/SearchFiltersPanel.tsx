import type { SearchFilters } from "@/lib/search/searchTypes";

export function SearchFiltersPanel({ filters, disabled = false }: { filters: SearchFilters; disabled?: boolean }) {
  return (
    <fieldset className="search-filters" disabled={disabled}>
      <legend>Filtri</legend>
      <label>Paese<input name="country" defaultValue={filters.countries[0] ?? ""} placeholder="es. Italia" /></label>
      <label>Campionato<input name="competition" defaultValue={filters.competitionIds[0] ?? ""} placeholder="es. serie-a" /></label>
      <label>Stagione<input name="season" defaultValue={filters.season ?? ""} placeholder="es. 2026" /></label>
      <label>Dal<input name="dateFrom" type="date" defaultValue={filters.dateFrom ?? ""} /></label>
      <label>Al<input name="dateTo" type="date" defaultValue={filters.dateTo ?? ""} /></label>
      <label className="checkbox-row"><input name="highlights" type="checkbox" value="1" defaultChecked={filters.onlyWithHighlights} /> Solo con highlights</label>
      <label className="checkbox-row"><input name="videoRadar" type="checkbox" value="1" defaultChecked={filters.onlyVideoRadar} /> Solo Video Radar</label>
    </fieldset>
  );
}
