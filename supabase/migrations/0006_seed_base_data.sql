-- Regista Avanzato — migrazione 0006: seed configurazione staging.
-- Nessun token, password, utente Auth o contenuto reale. Tutte le competizioni
-- restano draft/private_admin e tutti i provider esterni restano disattivati.

insert into public.data_providers (
  provider_key, name, provider_type, is_active, priority,
  monthly_budget_eur, warning_budget_eur, hard_stop_budget_eur, notes
)
values
  ('mock_provider', 'Mock Provider', 'mock', true, 100, 0, 0, 0,
   'Provider locale per sviluppo e test; nessun dato reale.'),
  ('stable_provider', 'Stable Provider', 'official_api', false, 10, null, null, null,
   'Alias disattivato fino alla scelta del provider reale.'),
  ('the_stats_api', 'TheStatsAPI', 'official_api', false, 20, null, null, null,
   'Adapter futuro; token, licenza e mapping non configurati.'),
  ('api_football', 'API-Football', 'official_api', false, 30, null, null, null,
   'Adapter futuro; token, licenza e mapping non configurati.'),
  ('apify_sofascore', 'Apify / SofaScore', 'apify_actor', false, 40, 30, 24, 30,
   'Solo batch settimanale campionati minori; disattivato fino a verifica termini e token.'),
  ('manual_provider', 'Manual Admin Provider', 'manual', true, 90, 0, 0, 0,
   'Inserimento editoriale controllato; nessun download o reupload video.')
on conflict (provider_key) do update
set
  name = excluded.name,
  provider_type = excluded.provider_type,
  is_active = excluded.is_active,
  priority = excluded.priority,
  monthly_budget_eur = excluded.monthly_budget_eur,
  warning_budget_eur = excluded.warning_budget_eur,
  hard_stop_budget_eur = excluded.hard_stop_budget_eur,
  notes = excluded.notes;

-- Stagioni esplicite: 2026/27 per tornei a cavallo d'anno, 2026 per tornei
-- annuali. Verificarle prima di ogni nuovo seed stagionale.
with competition_seed (
  internal_key, name, country, continent, season, tracking_level,
  primary_provider_key, secondary_provider_key, enrichment_provider_key,
  update_frequency, public_stats_enabled, login_required_for_full_stats,
  manual_highlights_enabled, video_radar_enabled, apify_enabled,
  apify_priority, data_confidence
) as (
  values
    ('serie-a', 'Serie A', 'Italy', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('premier-league', 'Premier League', 'England', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('la-liga', 'LaLiga', 'Spain', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('bundesliga', 'Bundesliga', 'Germany', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('ligue-1', 'Ligue 1', 'France', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('uefa-champions-league', 'UEFA Champions League', 'Europe', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('uefa-europa-league', 'UEFA Europa League', 'Europe', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('copa-libertadores', 'Copa Libertadores', 'South America', 'South America', '2026', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('brasileirao-serie-a', 'Brasileirão Série A', 'Brazil', 'South America', '2026', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('argentina-primera-division', 'Argentina Primera División', 'Argentina', 'South America', '2026', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('eredivisie', 'Eredivisie', 'Netherlands', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('belgian-pro-league', 'Jupiler Pro League', 'Belgium', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('primeira-liga', 'Primeira Liga', 'Portugal', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),
    ('turkish-super-lig', 'Süper Lig', 'Turkey', 'Europe', '2026/27', 'full_official', 'stable_provider', 'api_football', 'manual_provider', 'daily_and_post_match', true, true, true, true, false, null, 'high'),

    ('swiss-super-league', 'Swiss Super League', 'Switzerland', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('austrian-bundesliga', 'Austrian Bundesliga', 'Austria', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('danish-superliga', 'Danish Superliga', 'Denmark', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('allsvenskan', 'Allsvenskan', 'Sweden', 'Europe', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('eliteserien', 'Eliteserien', 'Norway', 'Europe', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('polish-ekstraklasa', 'Ekstraklasa', 'Poland', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('croatian-hnl', 'HNL', 'Croatia', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('serbian-superliga', 'Serbian SuperLiga', 'Serbia', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('j1-league', 'J1 League', 'Japan', 'Asia', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('k-league-1', 'K League 1', 'South Korea', 'Asia', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('major-league-soccer', 'Major League Soccer', 'United States', 'North America', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('uruguay-primera-division', 'Uruguayan Primera División', 'Uruguay', 'South America', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('colombia-primera-a', 'Categoría Primera A', 'Colombia', 'South America', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('chile-primera-division', 'Chilean Primera División', 'Chile', 'South America', '2026', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),
    ('ligue-2', 'Ligue 2', 'France', 'Europe', '2026/27', 'apify_light_plus_p1', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_after_matchday', true, true, true, true, true, 1, 'medium'),

    ('greek-super-league', 'Super League Greece', 'Greece', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('czech-first-league', 'Czech First League', 'Czech Republic', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('ukrainian-premier-league', 'Ukrainian Premier League', 'Ukraine', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('romanian-liga-1', 'Liga I', 'Romania', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('hungarian-nb-i', 'Nemzeti Bajnokság I', 'Hungary', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('slovak-super-liga', 'Slovak Super Liga', 'Slovakia', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('slovenian-prva-liga', 'Slovenian PrvaLiga', 'Slovenia', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('bosnia-premier-league', 'Premier League of Bosnia and Herzegovina', 'Bosnia and Herzegovina', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('bulgarian-first-league', 'Bulgarian First League', 'Bulgaria', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('peru-liga-1', 'Liga 1', 'Peru', 'South America', '2026', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('paraguay-primera-division', 'Paraguayan Primera División', 'Paraguay', 'South America', '2026', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('venezuela-primera-division', 'Venezuelan Primera División', 'Venezuela', 'South America', '2026', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('bolivia-division-profesional', 'Bolivian División Profesional', 'Bolivia', 'South America', '2026', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low'),
    ('russian-premier-league', 'Russian Premier League', 'Russia', 'Europe', '2026/27', 'apify_light_plus_p2', 'apify_sofascore', 'manual_provider', 'apify_sofascore', 'weekly_if_budget_available', true, false, true, true, true, 2, 'medium_low')
), resolved as (
  select
    seed.*,
    primary_provider.id as primary_provider_id,
    secondary_provider.id as secondary_provider_id,
    enrichment_provider.id as enrichment_provider_id
  from competition_seed seed
  join public.data_providers primary_provider
    on primary_provider.provider_key = seed.primary_provider_key
  left join public.data_providers secondary_provider
    on secondary_provider.provider_key = seed.secondary_provider_key
  left join public.data_providers enrichment_provider
    on enrichment_provider.provider_key = seed.enrichment_provider_key
)
insert into public.competitions (
  internal_key, slug, name, country, continent, season, tracking_level,
  primary_provider, secondary_provider, enrichment_provider, update_frequency,
  weekly_import_day, public_stats_enabled, login_required_for_full_stats,
  manual_highlights_enabled, video_radar_enabled, apify_enabled,
  apify_priority, data_confidence, coverage_notes,
  status, visibility, login_required
)
select
  internal_key, internal_key, name, country, continent, season,
  tracking_level::public.tracking_level,
  primary_provider_id, secondary_provider_id, enrichment_provider_id,
  update_frequency, null, public_stats_enabled,
  login_required_for_full_stats, manual_highlights_enabled,
  video_radar_enabled, apify_enabled, apify_priority,
  data_confidence::public.data_confidence,
  'Seed staging da config/competitions.ts; verificare stagione e mapping esterni.',
  'draft', 'private_admin', login_required_for_full_stats
from resolved
on conflict (internal_key, season) do update
set
  name = excluded.name,
  country = excluded.country,
  continent = excluded.continent,
  tracking_level = excluded.tracking_level,
  primary_provider = excluded.primary_provider,
  secondary_provider = excluded.secondary_provider,
  enrichment_provider = excluded.enrichment_provider,
  update_frequency = excluded.update_frequency,
  public_stats_enabled = excluded.public_stats_enabled,
  login_required_for_full_stats = excluded.login_required_for_full_stats,
  manual_highlights_enabled = excluded.manual_highlights_enabled,
  video_radar_enabled = excluded.video_radar_enabled,
  apify_enabled = excluded.apify_enabled,
  apify_priority = excluded.apify_priority,
  data_confidence = excluded.data_confidence,
  coverage_notes = excluded.coverage_notes;

-- Una sola riga per provider/competition; quando primary ed enrichment
-- coincidono (Apify light), i flag vengono aggregati nella stessa riga.
-- In staging il seed prepara i mapping ma lascia ogni import disattivato.
with seeded_competitions as (
  select *
  from public.competitions
  where internal_key = any(array[
    'serie-a', 'premier-league', 'la-liga', 'bundesliga', 'ligue-1',
    'uefa-champions-league', 'uefa-europa-league', 'copa-libertadores',
    'brasileirao-serie-a', 'argentina-primera-division', 'eredivisie',
    'belgian-pro-league', 'primeira-liga', 'turkish-super-lig',
    'swiss-super-league', 'austrian-bundesliga', 'danish-superliga',
    'allsvenskan', 'eliteserien', 'polish-ekstraklasa', 'croatian-hnl',
    'serbian-superliga', 'j1-league', 'k-league-1', 'major-league-soccer',
    'uruguay-primera-division', 'colombia-primera-a',
    'chile-primera-division', 'ligue-2', 'greek-super-league',
    'czech-first-league', 'ukrainian-premier-league', 'romanian-liga-1',
    'hungarian-nb-i', 'slovak-super-liga', 'slovenian-prva-liga',
    'bosnia-premier-league', 'bulgarian-first-league', 'peru-liga-1',
    'paraguay-primera-division', 'venezuela-primera-division',
    'bolivia-division-profesional', 'russian-premier-league'
  ]::text[])
), provider_roles as (
  select id as competition_id, primary_provider as provider_id, true as is_primary, false as is_secondary, false as is_enrichment
  from seeded_competitions where primary_provider is not null
  union all
  select id, secondary_provider, false, true, false
  from seeded_competitions where secondary_provider is not null
  union all
  select id, enrichment_provider, false, false, true
  from seeded_competitions where enrichment_provider is not null
), grouped_roles as (
  select
    competition_id,
    provider_id,
    bool_or(is_primary) as is_primary,
    bool_or(is_secondary) as is_secondary,
    bool_or(is_enrichment) as is_enrichment
  from provider_roles
  group by competition_id, provider_id
)
insert into public.provider_competition_config (
  provider_id, competition_id, is_primary, is_secondary, is_enrichment,
  import_enabled, priority, data_confidence
)
select
  roles.provider_id,
  roles.competition_id,
  roles.is_primary,
  roles.is_secondary,
  roles.is_enrichment,
  false,
  provider.priority,
  competition.data_confidence
from grouped_roles roles
join public.data_providers provider on provider.id = roles.provider_id
join public.competitions competition on competition.id = roles.competition_id
on conflict (provider_id, competition_id) do update
set
  is_primary = excluded.is_primary,
  is_secondary = excluded.is_secondary,
  is_enrichment = excluded.is_enrichment,
  import_enabled = excluded.import_enabled,
  priority = excluded.priority,
  data_confidence = excluded.data_confidence;

-- Nessun admin viene seedato. Creare prima l'utente in Supabase Auth, lasciare
-- che il trigger generi il profilo free_user e promuoverlo manualmente tramite
-- una sessione amministrativa controllata e auditata.
