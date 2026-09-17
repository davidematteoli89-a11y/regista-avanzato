# Punto 22 — Manual import schema confirmation

Stato: conferma locale preparata, senza DB live.

Fonti usate:

- `supabase/migrations/0001_base_schema.sql`;
- fixture locali;
- mapping/readiness dei Punti 20 e 21.

Nessuna query DB. Nessuna migrazione modificata.

## Competitions

- Tabella target confermata: sì, `public.competitions`.
- Colonne confermate:
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
  - `internal_notes`.
- Colonne mancanti rispetto alle fixture: nessuna.
- Campi fixture mappabili:
  - `provider_competition_id`;
  - `name`;
  - `country`;
  - `category/status`, con mapping enum da rivedere.
- Vincoli/FK rilevanti:
  - unique `internal_key, season`;
  - unique `slug, season`;
  - provider FK opzionali.
- Dedup key teoriche:
  - `internal_key + season`;
  - `slug + season`.
- Conflitti possibili:
  - slug già usato;
  - stagione non definita;
  - mapping `tracking_level` non confermato.
- Stato finale: `needs_review`.

## Teams

- Tabella target confermata: sì, `public.teams`.
- Colonne confermate:
  - `competition_id`;
  - `source_provider_id`;
  - `api_team_id`;
  - `slug`;
  - `name`;
  - `short_name`;
  - `country`;
  - `status`;
  - `visibility`;
  - `internal_notes`.
- Colonne mancanti rispetto alle fixture: nessuna.
- Campi fixture mappabili:
  - `provider_team_id`;
  - `provider_competition_id`, via lookup;
  - `name`;
  - `country`.
- Vincoli/FK rilevanti:
  - `competition_id` FK verso `competitions`;
  - `source_provider_id` FK verso `data_providers`;
  - unique `competition_id, slug`;
  - unique index provider external su `source_provider_id, api_team_id`.
- Dedup key teoriche:
  - `competition_id + slug`;
  - `source_provider_id + api_team_id` se manual provider id è confermato.
- Conflitti possibili:
  - competition lookup non risolto;
  - slug già usato nello stesso scope;
  - manual provider id non confermato.
- Stato finale: `needs_review`.

## Standings

- Tabella target confermata: sì, `public.standings`.
- Colonne confermate:
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
  - `internal_notes`.
- Colonne mancanti rispetto alle fixture: nessuna.
- Campi fixture mappabili:
  - `provider_competition_id`, via lookup;
  - `provider_team_id`, via lookup;
  - `rank`;
  - `played`;
  - `wins` → `won`;
  - `draws` → `drawn`;
  - `losses` → `lost`;
  - `goals_for`;
  - `goals_against`;
  - `points`.
- Vincoli/FK rilevanti:
  - `competition_id` FK verso `competitions`;
  - `team_id` FK verso `teams`;
  - unique `competition_id, season, stage, matchday, team_id`.
- Dedup key teorica:
  - `competition_id + season + stage + matchday + team_id`.
- Conflitti possibili:
  - competition/team lookup non risolti;
  - season/stage/matchday non definiti dalla fixture;
  - `goal_difference` da calcolare e verificare.
- Stato finale: `needs_review`.

## Decisione schema

Le tabelle e colonne principali sono confermate localmente.

Non è ancora `ready` per write perché restano da confermare valori e policy per:

- `season`;
- `slug`;
- `continent`;
- `tracking_level`;
- `update_frequency`;
- manual provider id;
- lookup staging;
- backup/rollback/audit.

Nessuna migrazione è richiesta dal solo schema locale, ma serve conferma staging prima di qualsiasi write.
