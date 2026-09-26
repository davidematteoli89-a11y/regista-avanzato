# Punto 44 — Read-only manual data consumption plan

## Scope

Punto 44 è un piano read-only per decidere come consumare i dati manuali già scritti in Supabase staging.

Ambito e limiti:

- dati manuali già scritti in staging;
- nessuna nuova scrittura DB;
- nessun provider/import;
- nessun Apify;
- nessun deploy;
- nessuna Production;
- nessun `service_role`;
- nessuna Server Action write;
- `next_write_allowed=false`.

## Available manual data

| Entity | Count | Identifier | Status | Visibility | Notes |
| --- | ---: | --- | --- | --- | --- |
| competition | 1 | `manual-serie-a` | `draft` | `private_admin` | `Serie A Manual Sample`, `country=Italy`, `season=2026` |
| teams | 2 | `manual-team-1`, `manual-team-2` | `draft` | `private_admin` | linked to `manual-serie-a` |
| standings | 2 | matchday 1 | `draft` | `private_admin` | rank 1 / 3 pts and rank 2 / 0 pts |

## Existing read surfaces

| Surface | Route/File | Current status | Can consume manual data? | Notes |
| --- | --- | --- | --- | --- |
| Admin imports dashboard | `/admin/imports`, `app/admin/imports/page.tsx` | already_reads_manual_data | partially | shows fixture preview and Point 42/43 state, but not a DB reader for manual rows |
| Manual fixture reader | `lib/provider/manualFixtures.ts` | already_reads_manual_data | local only | reads local fixture files, not staging DB rows |
| Provider import runs reader | `lib/admin/adminProviderImportRuns.ts` | not_relevant | no | read-only for provider import runs, not manual competition/team/standings |
| Admin competitions | `/admin/competitions`, `getAdminCompetitions` | placeholder/static config | can_be_connected_read_only | currently shows config/provider strategy, not manual DB rows |
| Admin teams | `/admin/teams` | placeholder_only | can_be_connected_read_only | currently empty/mock message |
| Admin statistiche | `/admin/statistiche` | placeholder_only | can_be_connected_read_only | candidate for future standings table |
| Public competitions | `/competizioni`, `lib/publicData/supabasePublicViews.ts` | public reader exists | not now | consumes `public_competitions`; manual rows are `private_admin` |
| Public competition detail | `/competizioni/[competitionId]` | public reader exists | not now | public exposure requires visibility/policy decision |
| Public standings | `/competizioni/[competitionId]/classifica` | public reader exists | not now | consumes `public_standings`; manual rows are not public |
| Public team pages | `/squadre/[teamId]` | public reader exists | not now | public exposure requires visibility/policy decision |

## Proposed read-only consumption flow

1. Supabase staging contiene i dati manuali già inseriti dal Punto 42.
2. Le view read-only `manual_import_*_lookup` espongono dati normalizzati per lookup controllati.
3. Admin può vedere lo stato dati/manual import senza azioni di scrittura.
4. Superfici admin future possono mostrare:
   - lista competizioni;
   - dettaglio competition;
   - squadre;
   - classifica.
5. Pagine pubbliche future possono mostrare solo dati con visibilità idonea e dopo decisione esplicita.

## Visibility rule

I dati attuali hanno `visibility=private_admin`.

Conseguenze:

- ok per superfici admin read-only;
- non ok per esposizione pubblica automatica;
- per il pubblico serve una decisione futura su valori e policy, per esempio `public` o equivalente;
- Punto 44 non modifica la visibilità.

## Recommended minimal UI path

Sequenza consigliata no-write:

1. Admin read-only list competitions.
2. Admin competition detail.
3. Admin teams table.
4. Admin standings table.
5. Solo dopo, valutare pagine pubbliche read-only.

## Decision

Punto 44 crea solo piano e documentazione. Non implementa writer, non crea bottoni di import/run/sync/save e non abilita provider.
