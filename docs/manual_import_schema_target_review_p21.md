# Punto 21 — Schema target review locale

Stato: review locale completata, senza interrogare Supabase live.

Fonti usate:

- `supabase/migrations/0001_base_schema.sql`;
- fixture locali;
- piano mapping Punto 20.

Nessun DB live interrogato. Nessuna migrazione modificata.

## Competitions

- Target table candidata: `public.competitions`.
- Colonne confermate da schema locale:
  - `id`;
  - `internal_key`;
  - `api_competition_id`;
  - `slug`;
  - `name`;
  - `country`;
  - `continent`;
  - `season`;
  - `tracking_level`;
  - `update_frequency`;
  - `status`;
  - `visibility`;
  - `internal_notes`;
  - `created_at`;
  - `updated_at`.
- Colonne non confermate: nessuna colonna fixture extra.
- Campi fixture mappabili:
  - `provider_competition_id` → candidate `api_competition_id` o `internal_key`;
  - `name` → `name`;
  - `country` → `country`;
  - `category/status` → mapping enum da confermare.
- Campi fixture non mappabili direttamente:
  - `continent`;
  - `season`;
  - `tracking_level`;
  - `update_frequency`;
  - `slug`.
- Chiave deduplica consigliata:
  - `internal_key + season` oppure `slug + season`.
- Stato: `needs review`.

## Teams

- Target table candidata: `public.teams`.
- Colonne confermate da schema locale:
  - `id`;
  - `competition_id`;
  - `source_provider_id`;
  - `api_team_id`;
  - `slug`;
  - `name`;
  - `short_name`;
  - `country`;
  - `city`;
  - `status`;
  - `visibility`;
  - `internal_notes`;
  - `created_at`;
  - `updated_at`.
- Colonne non confermate: nessuna colonna fixture extra.
- Campi fixture mappabili:
  - `provider_team_id` → `api_team_id`;
  - `provider_competition_id` → lookup verso `competition_id`;
  - `name` → `name`;
  - `country` → `country`.
- Campi fixture non mappabili direttamente:
  - `slug`;
  - `competition_id` senza lookup;
  - `source_provider_id` se manual provider DB id non confermato.
- Chiave deduplica consigliata:
  - `competition_id + slug` oppure `source_provider_id + api_team_id` se provider manuale confermato.
- Stato: `needs review`.

## Standings

- Target table candidata: `public.standings`.
- Colonne confermate da schema locale:
  - `id`;
  - `competition_id`;
  - `team_id`;
  - `source_provider_id`;
  - `season`;
  - `stage`;
  - `matchday`;
  - `rank`;
  - `played`;
  - `won`;
  - `drawn`;
  - `lost`;
  - `goals_for`;
  - `goals_against`;
  - `goal_difference`;
  - `points`;
  - `status`;
  - `visibility`;
  - `created_at`;
  - `updated_at`.
- Colonne non confermate: nessuna colonna fixture extra.
- Campi fixture mappabili:
  - `provider_competition_id` → lookup verso `competition_id`;
  - `provider_team_id` → lookup verso `team_id`;
  - `rank` → `rank`;
  - `played` → `played`;
  - `wins` → `won`;
  - `draws` → `drawn`;
  - `losses` → `lost`;
  - `goals_for` → `goals_for`;
  - `goals_against` → `goals_against`;
  - `points` → `points`.
- Campi fixture non mappabili direttamente:
  - `season`;
  - `stage`;
  - `matchday`;
  - `goal_difference`, calcolabile ma da confermare.
- Chiave deduplica consigliata:
  - `competition_id + season + stage + matchday + team_id`.
- Stato: `needs review`.

## Conclusione

Le tabelle candidate esistono nello schema locale, ma il futuro import manuale resta bloccato finché non vengono confermati:

- valori default per campi obbligatori non presenti in fixture;
- deduplica esatta;
- lookup manual provider;
- ambiente staging;
- backup/rollback;
- autorizzazione esplicita alla scrittura.
