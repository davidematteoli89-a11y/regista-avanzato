# Punto 25 — DB read-only schema/data lookup check

Data: 2026-09-18  
Modalità: DB read-only, no-write, no service role.

## Scopo

Il Punto 25 prova il primo check read-only su Supabase staging per verificare se i blocker rimasti dal Punto 24 possono essere risolti senza scritture.

## Client usato

È stato usato uno script dedicato:

- `scripts/provider/manualDbReadOnlySchemaCheck.ts`
- comando: `npm run dry-run:manual-db-schema-check`

Il client usa solo configurazione pubblica Supabase se disponibile:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Nessun valore è stato stampato o documentato.

Non è stato usato:

- `SUPABASE_SERVICE_ROLE_KEY`;
- Supabase admin client;
- RPC di scrittura;
- insert/update/delete/upsert.

## Letture effettuate

Lo script ha tentato solo select read-only limitate:

- `competitions` con colonne target note;
- `teams` con colonne target note;
- `standings` con colonne target note;
- lookup fixture su `api_competition_id`;
- lookup fixture su `api_team_id`;
- public views `public_competitions`, `public_teams`, `public_standings`.

Output sanificato:

- payload completo non stampato;
- sample rows non stampati;
- chiavi/token non stampati;
- errori non stampati come payload;
- solo count/status/codici sanificati.

## Risultato script

```text
mode=manual_db_read_only_schema_check
external_fetch=false
provider_fetch=false
db_read=true
db_write=false
service_role_used=false
token_printed=false
public_env_present=true
tables_checked=competitions,teams,standings
competitions_table_confirmed=false
teams_table_confirmed=false
standings_table_confirmed=false
base_table_read_blocked_count=0
public_views_confirmed_count=0
public_view_columns_confirmed_count=0
competitions_columns_confirmed_count=0
teams_columns_confirmed_count=0
standings_columns_confirmed_count=0
db_confirmed_tables_count=0
db_confirmed_columns_count=0
missing_columns_count=0
fixture_competition_lookup_matches=0
fixture_team_lookup_matches=0
fk_or_reference_confidence=blocked
dedup_key_confidence=blocked
competitions_db_status=blocked
teams_db_status=blocked
standings_db_status=blocked
sample_rows_read_count=0
payload_printed=false
next_write_allowed=false
blocked_real_execution=true
```

Nota: `missing_columns_count=0` non significa schema confermato; significa che lo script non ha ricevuto una conferma sanificata di colonna mancante. Le tabelle/viste non sono state confermate dal client anon/pubblico.

## Competitions

| Voce | Risultato |
|---|---|
| table confirmed | false |
| columns confirmed | 0 |
| unresolved fields | `provider_competition_id`, `category/status`, dedup `internal_key/slug/season` |
| dedup key confidence | blocked |
| FK/reference confidence | blocked |
| final status | blocked |
| reason | Il client anon/pubblico non ha confermato la tabella né lookup fixture. Nessuna write consentita. |

## Teams

| Voce | Risultato |
|---|---|
| table confirmed | false |
| columns confirmed | 0 |
| unresolved fields | `provider_team_id`, `competition reference` |
| dedup key confidence | blocked |
| FK/reference confidence | blocked |
| final status | blocked |
| reason | Il client anon/pubblico non ha confermato la tabella né lookup fixture. Nessuna write consentita. |

## Standings

| Voce | Risultato |
|---|---|
| table confirmed | false |
| columns confirmed | 0 |
| unresolved fields | `provider_competition_id`, `provider_team_id`, `season/stage/matchday`, `goal_difference` |
| dedup key confidence | blocked |
| FK/reference confidence | blocked |
| final status | blocked |
| reason | Il client anon/pubblico non ha confermato tabella o view. Nessuna write consentita. |

## Sicurezza

Confermato:

- nessuna scrittura DB;
- nessun provider;
- nessun Apify;
- nessun service role;
- nessun payload completo salvato;
- nessuna migrazione;
- nessun deploy;
- Production non toccata;
- `next_write_allowed=false`.

## Interpretazione

Punto 25 non risolve i blocker: li porta da `needs_review` a `blocked` per write readiness, perché il check read-only non conferma schema/dati target con client anon/pubblico.

Prossimo step consigliato: Punto 26-A, ancora no-write, per investigare accesso read-only corretto o preparare query manuali SELECT da SQL Editor staging.
