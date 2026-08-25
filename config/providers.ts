export const PROVIDER_TYPES = [
  "mock",
  "official_api",
  "apify_actor",
  "manual",
] as const;

export type ProviderType = (typeof PROVIDER_TYPES)[number];

export type ProviderConfig = {
  id:
    | "mock_provider"
    | "stable_provider"
    | "the_stats_api"
    | "api_football"
    | "apify_sofascore"
    | "manual_provider";
  name: string;
  type: ProviderType;
  active: boolean;
  priority: number;
  monthly_budget_eur: number | null;
  warning_budget_eur: number | null;
  hard_stop_budget_eur: number | null;
  notes: string;
};

export type ProviderId = ProviderConfig["id"];

export const PROVIDERS = [
  {
    id: "mock_provider",
    name: "Mock Provider",
    type: "mock",
    active: true,
    priority: 100,
    monthly_budget_eur: 0,
    warning_budget_eur: 0,
    hard_stop_budget_eur: 0,
    notes: "Provider locale per sviluppo e test. Non rappresenta dati reali.",
  },
  {
    id: "stable_provider",
    name: "Stable Provider",
    type: "official_api",
    active: false,
    priority: 10,
    monthly_budget_eur: null,
    warning_budget_eur: null,
    hard_stop_budget_eur: null,
    notes:
      "Alias del futuro provider stabile. Rimane disattivato fino alla scelta del fornitore, del piano e alla configurazione server-side.",
  },
  {
    id: "the_stats_api",
    name: "TheStatsAPI",
    type: "official_api",
    active: false,
    priority: 20,
    monthly_budget_eur: null,
    warning_budget_eur: null,
    hard_stop_budget_eur: null,
    notes:
      "Candidato da identificare e valutare con precisione prima dell'uso: copertura, licenza, SLA, costi e diritti di pubblicazione sono da confermare.",
  },
  {
    id: "api_football",
    name: "API-Football",
    type: "official_api",
    active: false,
    priority: 30,
    monthly_budget_eur: null,
    warning_budget_eur: null,
    hard_stop_budget_eur: null,
    notes:
      "Provider candidato. Attivazione subordinata a verifica di piano, copertura, rate limit, licenza e credenziali server-side.",
  },
  {
    id: "apify_sofascore",
    name: "Apify / SofaScore",
    type: "apify_actor",
    active: false,
    priority: 40,
    monthly_budget_eur: 30,
    warning_budget_eur: 24,
    hard_stop_budget_eur: 30,
    notes:
      "Solo import batch programmati per campionati minori. Disattivato fino alla configurazione del token e alla verifica dei termini; mai chiamato durante una visita utente.",
  },
  {
    id: "manual_provider",
    name: "Manual Admin Provider",
    type: "manual",
    active: true,
    priority: 90,
    monthly_budget_eur: 0,
    warning_budget_eur: 0,
    hard_stop_budget_eur: 0,
    notes:
      "Inserimento editoriale controllato, soprattutto per link ufficiali agli highlights. Non scarica, copia o ospita video.",
  },
] as const satisfies readonly ProviderConfig[];

export function getProviderById(id: ProviderId): ProviderConfig | undefined {
  return PROVIDERS.find((provider) => provider.id === id);
}
