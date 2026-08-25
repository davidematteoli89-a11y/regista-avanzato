import type { ProviderId } from "./providers";

export const TRACKING_LEVELS = [
  "full_official",
  "apify_light_plus_p1",
  "apify_light_plus_p2",
  "trigger",
] as const;

export type TrackingLevel = (typeof TRACKING_LEVELS)[number];
export type DataConfidence = "high" | "medium" | "medium_low" | "low";
export type ApifyPriority = 1 | 2 | null;

export type CompetitionConfig = {
  id: string;
  name: string;
  country: string;
  continent: "Europe" | "North America" | "South America" | "Asia" | "Africa" | "Oceania";
  tracking_level: TrackingLevel;
  primary_provider: ProviderId;
  secondary_provider: ProviderId | null;
  enrichment_provider: ProviderId | null;
  provider_priority: readonly ProviderId[];
  update_frequency:
    | "daily_and_post_match"
    | "weekly_after_matchday"
    | "weekly_if_budget_available"
    | "strong_events_only";
  weekly_import_day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" | null;
  import_fixtures: boolean;
  import_results: boolean;
  import_standings: boolean;
  import_player_stats: boolean;
  import_team_stats: boolean;
  import_match_stats: boolean;
  import_highlight_links: boolean;
  manual_highlights_enabled: boolean;
  public_stats_enabled: boolean;
  login_required_for_full_stats: boolean;
  video_radar_enabled: boolean;
  apify_enabled: boolean;
  apify_priority: ApifyPriority;
  data_confidence: DataConfidence;
  notes: string;
};

type CompetitionIdentity = Pick<CompetitionConfig, "id" | "name" | "country" | "continent" | "notes">;
type CompetitionDefaults = Omit<CompetitionConfig, keyof CompetitionIdentity>;

const FULL_OFFICIAL_DEFAULTS: CompetitionDefaults = {
  tracking_level: "full_official",
  primary_provider: "stable_provider",
  secondary_provider: "api_football",
  enrichment_provider: "manual_provider",
  provider_priority: ["stable_provider", "the_stats_api", "api_football", "manual_provider", "mock_provider"],
  update_frequency: "daily_and_post_match",
  weekly_import_day: null,
  import_fixtures: true,
  import_results: true,
  import_standings: true,
  import_player_stats: true,
  import_team_stats: true,
  import_match_stats: true,
  import_highlight_links: true,
  manual_highlights_enabled: true,
  public_stats_enabled: true,
  login_required_for_full_stats: true,
  video_radar_enabled: true,
  apify_enabled: false,
  apify_priority: null,
  data_confidence: "high",
};

const APIFY_PRIORITY_ONE_DEFAULTS: CompetitionDefaults = {
  tracking_level: "apify_light_plus_p1",
  primary_provider: "apify_sofascore",
  secondary_provider: "manual_provider",
  enrichment_provider: "apify_sofascore",
  provider_priority: ["apify_sofascore", "manual_provider", "mock_provider"],
  update_frequency: "weekly_after_matchday",
  weekly_import_day: null,
  import_fixtures: true,
  import_results: true,
  import_standings: true,
  import_player_stats: true,
  import_team_stats: false,
  import_match_stats: true,
  import_highlight_links: true,
  manual_highlights_enabled: true,
  public_stats_enabled: true,
  login_required_for_full_stats: true,
  video_radar_enabled: true,
  apify_enabled: true,
  apify_priority: 1,
  data_confidence: "medium",
};

const APIFY_PRIORITY_TWO_DEFAULTS: CompetitionDefaults = {
  tracking_level: "apify_light_plus_p2",
  primary_provider: "apify_sofascore",
  secondary_provider: "manual_provider",
  enrichment_provider: "apify_sofascore",
  provider_priority: ["apify_sofascore", "manual_provider", "mock_provider"],
  update_frequency: "weekly_if_budget_available",
  weekly_import_day: null,
  import_fixtures: true,
  import_results: true,
  import_standings: true,
  import_player_stats: false,
  import_team_stats: false,
  import_match_stats: false,
  import_highlight_links: false,
  manual_highlights_enabled: true,
  public_stats_enabled: true,
  login_required_for_full_stats: false,
  video_radar_enabled: true,
  apify_enabled: true,
  apify_priority: 2,
  data_confidence: "medium_low",
};

// Pronto per competizioni future non seguite regolarmente. Nessuna competizione
// TRIGGER è stata aggiunta perché il brief non ne specifica i nomi.
export const TRIGGER_DEFAULTS: CompetitionDefaults = {
  tracking_level: "trigger",
  primary_provider: "manual_provider",
  secondary_provider: null,
  enrichment_provider: null,
  provider_priority: ["manual_provider", "mock_provider"],
  update_frequency: "strong_events_only",
  weekly_import_day: null,
  import_fixtures: false,
  import_results: true,
  import_standings: false,
  import_player_stats: false,
  import_team_stats: false,
  import_match_stats: false,
  import_highlight_links: false,
  manual_highlights_enabled: true,
  public_stats_enabled: false,
  login_required_for_full_stats: false,
  video_radar_enabled: true,
  apify_enabled: false,
  apify_priority: null,
  data_confidence: "low",
};

function createCompetition(defaults: CompetitionDefaults, identity: CompetitionIdentity): CompetitionConfig {
  return { ...defaults, ...identity };
}

export const COMPETITIONS = [
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "serie-a", name: "Serie A", country: "Italy", continent: "Europe", notes: "Campionato principale italiano; copertura completa prevista." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "premier-league", name: "Premier League", country: "England", continent: "Europe", notes: "Copertura completa prevista tramite provider stabile." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "la-liga", name: "LaLiga", country: "Spain", continent: "Europe", notes: "Copertura completa prevista tramite provider stabile." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "bundesliga", name: "Bundesliga", country: "Germany", continent: "Europe", notes: "Copertura completa prevista tramite provider stabile." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "ligue-1", name: "Ligue 1", country: "France", continent: "Europe", notes: "Copertura completa prevista tramite provider stabile." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "uefa-champions-league", name: "UEFA Champions League", country: "Europe", continent: "Europe", notes: "Competizione UEFA internazionale; stagioni e fasi richiedono mapping dedicato." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "uefa-europa-league", name: "UEFA Europa League", country: "Europe", continent: "Europe", notes: "Competizione UEFA internazionale; stagioni e fasi richiedono mapping dedicato." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "copa-libertadores", name: "Copa Libertadores", country: "South America", continent: "South America", notes: "Competizione CONMEBOL internazionale; copertura provider da verificare." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "brasileirao-serie-a", name: "Brasileirão Série A", country: "Brazil", continent: "South America", notes: "Copertura completa prevista; mantenere ID distinto da altre divisioni brasiliane." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "argentina-primera-division", name: "Argentina Primera División", country: "Argentina", continent: "South America", notes: "Formato stagionale e denominazione commerciale richiedono mapping per stagione." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "eredivisie", name: "Eredivisie", country: "Netherlands", continent: "Europe", notes: "Copertura completa prevista tramite provider stabile." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "belgian-pro-league", name: "Jupiler Pro League", country: "Belgium", continent: "Europe", notes: "Gestire playoff e denominazioni commerciali per stagione." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "primeira-liga", name: "Primeira Liga", country: "Portugal", continent: "Europe", notes: "Copertura completa prevista tramite provider stabile." }),
  createCompetition(FULL_OFFICIAL_DEFAULTS, { id: "turkish-super-lig", name: "Süper Lig", country: "Turkey", continent: "Europe", notes: "Copertura completa prevista; timezone e caratteri locali da preservare." }),

  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "swiss-super-league", name: "Swiss Super League", country: "Switzerland", continent: "Europe", notes: "Import settimanale P1; giorno esatto da confermare in base al calendario." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "austrian-bundesliga", name: "Austrian Bundesliga", country: "Austria", continent: "Europe", notes: "Import settimanale P1; gestire la fase playoff." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "danish-superliga", name: "Danish Superliga", country: "Denmark", continent: "Europe", notes: "Import settimanale P1; gestire le fasi post regular season." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "allsvenskan", name: "Allsvenskan", country: "Sweden", continent: "Europe", notes: "Import settimanale P1; calendario su anno solare." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "eliteserien", name: "Eliteserien", country: "Norway", continent: "Europe", notes: "Import settimanale P1; calendario su anno solare." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "polish-ekstraklasa", name: "Ekstraklasa", country: "Poland", continent: "Europe", notes: "Import settimanale P1; priorità a giovani e collegamenti Italia." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "croatian-hnl", name: "HNL", country: "Croatia", continent: "Europe", notes: "Import settimanale P1; priorità a giovani ed ex Serie A." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "serbian-superliga", name: "Serbian SuperLiga", country: "Serbia", continent: "Europe", notes: "Import settimanale P1; priorità a giovani e collegamenti Italia." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "j1-league", name: "J1 League", country: "Japan", continent: "Asia", notes: "Import settimanale P1; calendario su anno solare e timezone locale." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "k-league-1", name: "K League 1", country: "South Korea", continent: "Asia", notes: "Import settimanale P1; calendario su anno solare e fasi finali da mappare." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "major-league-soccer", name: "Major League Soccer", country: "United States", continent: "North America", notes: "Import settimanale P1; conference, playoff e più timezone richiedono mapping dedicato." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "uruguay-primera-division", name: "Uruguayan Primera División", country: "Uruguay", continent: "South America", notes: "Import settimanale P1; formato Apertura/Clausura da verificare per stagione." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "colombia-primera-a", name: "Categoría Primera A", country: "Colombia", continent: "South America", notes: "Import settimanale P1; fasi e gruppi finali richiedono mapping." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "chile-primera-division", name: "Chilean Primera División", country: "Chile", continent: "South America", notes: "Import settimanale P1; priorità a risultati, giovani e trigger editoriali." }),
  createCompetition(APIFY_PRIORITY_ONE_DEFAULTS, { id: "ligue-2", name: "Ligue 2", country: "France", continent: "Europe", notes: "Import settimanale P1; priorità a giovani, ex Serie A e promozione." }),

  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "greek-super-league", name: "Super League Greece", country: "Greece", continent: "Europe", notes: "Import P2 soltanto con budget residuo; highlight tramite link manuali ufficiali." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "czech-first-league", name: "Czech First League", country: "Czech Republic", continent: "Europe", notes: "Import P2 soltanto con budget residuo; formato finale da mappare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "ukrainian-premier-league", name: "Ukrainian Premier League", country: "Ukraine", continent: "Europe", notes: "Import P2 soltanto con budget residuo e previa verifica disponibilità dati." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "romanian-liga-1", name: "Liga I", country: "Romania", continent: "Europe", notes: "Import P2 soltanto con budget residuo; playoff/playout da mappare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "hungarian-nb-i", name: "Nemzeti Bajnokság I", country: "Hungary", continent: "Europe", notes: "Import P2 soltanto con budget residuo." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "slovak-super-liga", name: "Slovak Super Liga", country: "Slovakia", continent: "Europe", notes: "Import P2 soltanto con budget residuo; fasi finali da mappare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "slovenian-prva-liga", name: "Slovenian PrvaLiga", country: "Slovenia", continent: "Europe", notes: "Import P2 soltanto con budget residuo." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "bosnia-premier-league", name: "Premier League of Bosnia and Herzegovina", country: "Bosnia and Herzegovina", continent: "Europe", notes: "Import P2 soltanto con budget residuo; denominazione e formato per stagione da verificare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "bulgarian-first-league", name: "Bulgarian First League", country: "Bulgaria", continent: "Europe", notes: "Import P2 soltanto con budget residuo; fasi finali da mappare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "peru-liga-1", name: "Liga 1", country: "Peru", continent: "South America", notes: "Import P2 soltanto con budget residuo; torneo Apertura/Clausura da verificare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "paraguay-primera-division", name: "Paraguayan Primera División", country: "Paraguay", continent: "South America", notes: "Import P2 soltanto con budget residuo; Apertura/Clausura da mappare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "venezuela-primera-division", name: "Venezuelan Primera División", country: "Venezuela", continent: "South America", notes: "Import P2 soltanto con budget residuo e disponibilità dati." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "bolivia-division-profesional", name: "Bolivian División Profesional", country: "Bolivia", continent: "South America", notes: "Import P2 soltanto con budget residuo; formato per stagione da verificare." }),
  createCompetition(APIFY_PRIORITY_TWO_DEFAULTS, { id: "russian-premier-league", name: "Russian Premier League", country: "Russia", continent: "Europe", notes: "Import P2 soltanto con budget residuo e previa verifica di disponibilità, termini e copertura." }),
] as const satisfies readonly CompetitionConfig[];

export function getCompetitionById(id: string): CompetitionConfig | undefined {
  return COMPETITIONS.find((competition) => competition.id === id);
}

export function getCompetitionsByTrackingLevel(trackingLevel: TrackingLevel): CompetitionConfig[] {
  return COMPETITIONS.filter((competition) => competition.tracking_level === trackingLevel);
}

export function getCompetitionsByProvider(providerId: ProviderId): CompetitionConfig[] {
  return COMPETITIONS.filter(
    (competition) =>
      competition.primary_provider === providerId ||
      competition.secondary_provider === providerId ||
      competition.enrichment_provider === providerId ||
      competition.provider_priority.includes(providerId),
  );
}

export function getApifyPriorityOneCompetitions(): CompetitionConfig[] {
  return getCompetitionsByTrackingLevel("apify_light_plus_p1");
}

export function getApifyPriorityTwoCompetitions(): CompetitionConfig[] {
  return getCompetitionsByTrackingLevel("apify_light_plus_p2");
}

export function getFullOfficialCompetitions(): CompetitionConfig[] {
  return getCompetitionsByTrackingLevel("full_official");
}

export function isApifyCompetition(competition: CompetitionConfig): boolean {
  return competition.apify_enabled && competition.apify_priority !== null;
}

export function isFullOfficialCompetition(competition: CompetitionConfig): boolean {
  return competition.tracking_level === "full_official";
}
