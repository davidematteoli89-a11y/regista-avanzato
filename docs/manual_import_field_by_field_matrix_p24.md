# Punto 24 — Field-by-field fixture → schema matrix

Data: 2026-09-17  
Modalità: review locale, no-write.

Status ammessi: `ready`, `needs_review`, `blocked`, `not_mapped`.

## Competitions

| Fixture field | Target table | Target column | Confirmed locally | Transform needed | Required | Dedup/FK role | Status | Notes |
|---|---|---|---:|---|---:|---|---|---|
| `provider_competition_id` | `competitions` | `api_competition_id` | sì | copia diretta | no | riferimento provider, non dedup primaria | `needs_review` | La colonna esiste, ma la dedup reale è `(internal_key, season)` e `(slug, season)`. Serve policy per internal key/slug/season. |
| `name` | `competitions` | `name` | sì | copia diretta | sì | nessuno | `ready` | Campo e colonna confermati. |
| `country` | `competitions` | `country` | sì | copia diretta | sì | nessuno | `ready` | Campo e colonna confermati. |
| `category/status` | `competitions` | `status`, `visibility`, `tracking_level` | sì | mapping enum/editoriale | sì | policy editoriale | `needs_review` | `status` fixture non coincide automaticamente con `content_status`; `category` aiuta la policy ma non è colonna diretta. |

## Teams

| Fixture field | Target table | Target column | Confirmed locally | Transform needed | Required | Dedup/FK role | Status | Notes |
|---|---|---|---:|---|---:|---|---|---|
| `provider_team_id` | `teams` | `api_team_id` | sì | copia diretta | no | riferimento provider, non dedup primaria | `needs_review` | La dedup reale è `(competition_id, slug)`. Serve policy slug e provider manuale. |
| `name` | `teams` | `name` | sì | copia diretta | sì | base slug | `ready` | Campo e colonna confermati. |
| `competition reference` | `teams` | `competition_id` | sì | lookup da `provider_competition_id` | sì | FK verso `competitions.id` | `needs_review` | Serve decidere lookup locale/live: `api_competition_id`, `provider_competition_config`, `slug/season` o mapping manuale controllato. |
| `country` | `teams` | `country` | sì | copia diretta | no | nessuno | `ready` | Campo e colonna confermati; colonna nullable. |

## Standings

| Fixture field | Target table | Target column | Confirmed locally | Transform needed | Required | Dedup/FK role | Status | Notes |
|---|---|---|---:|---|---:|---|---|---|
| `provider_competition_id` | `standings` | `competition_id` | sì | lookup UUID | sì | FK e parte dedup | `needs_review` | Serve stessa policy lookup competizione usata per teams. |
| `provider_team_id` | `standings` | `team_id` | sì | lookup UUID | sì | FK e parte dedup | `needs_review` | Serve lookup team entro competizione. |
| `rank` | `standings` | `rank` | sì | copia numerica | sì | valore classifica | `ready` | Colonna confermata con check `rank > 0`. |
| `played` | `standings` | `played` | sì | copia numerica | sì | valore classifica | `ready` | Colonna confermata. |
| `wins` | `standings` | `won` | sì | rename `wins` → `won` | sì | valore classifica | `ready` | Naming mismatch deterministico e documentabile. |
| `draws` | `standings` | `drawn` | sì | rename `draws` → `drawn` | sì | valore classifica | `ready` | Naming mismatch deterministico e documentabile. |
| `losses` | `standings` | `lost` | sì | rename `losses` → `lost` | sì | valore classifica | `ready` | Naming mismatch deterministico e documentabile. |
| `goals_for` | `standings` | `goals_for` | sì | copia numerica | sì | valore classifica | `ready` | Colonna confermata. |
| `goals_against` | `standings` | `goals_against` | sì | copia numerica | sì | valore classifica | `ready` | Colonna confermata. |
| `points` | `standings` | `points` | sì | numero → numeric | sì | valore classifica | `ready` | Colonna confermata come `numeric(8, 2)`. |

## Campo derivato non presente in fixture

| Derived field | Target table | Target column | Confirmed locally | Transform needed | Required | Dedup/FK role | Status | Notes |
|---|---|---|---:|---|---:|---|---|---|
| `goals_for - goals_against` | `standings` | `goal_difference` | sì | calcolo deterministico | sì | valore classifica | `needs_review` | Calcolo plausibile, ma serve conferma documentale prima di write. |
| default manuale | `standings` | `season`, `stage`, `matchday` | sì | default/policy | sì | parte dedup | `needs_review` | La dedup include questi campi; la fixture non li contiene. |

## Conteggi Punto 24

- Campi fixture pronti: `12`.
- Campi fixture/derivati in `needs_review`: `6`.
- Campi `blocked`: `0`.
- Campi `not_mapped`: `0`.

Conclusione: nessun problema reale di tabella/colonna è emerso localmente. Il blocco alla write resta su lookup FK, dedup key, default stagione/stage/matchday e policy editoriale.
