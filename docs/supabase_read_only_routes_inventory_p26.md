# Punto 26 — Supabase read-only routes inventory

Data: 2026-09-18  
Modalità: inventario locale, no-write.

## Public readers/views

| File/reader | Funzione/route | Tabella/view letta | Auth | Ruolo | Service role | Scrive DB | Usabile per schema confirmation |
|---|---|---|---:|---:|---:|---:|---|
| `lib/publicData/supabasePublicViews.ts` | `readPublicCompetitions` | `public_competitions` | no | no | no | no | parziale |
| `lib/publicData/supabasePublicViews.ts` | `readPublicTeams` | `public_teams` | no | no | no | no | parziale |
| `lib/publicData/supabasePublicViews.ts` | `readPublicStandings` | `public_standings` | no | no | no | no | parziale |
| `lib/publicData/supabasePublicViews.ts` | `readPublicMatches` | `public_matches` | no | no | no | no | no |
| `lib/publicData/supabaseEditorialViews.ts` | editorial public readers | `public_*_published` | no | no | no | no | no |

Limite: le public views sono allowlist per contenuto pubblicato, non per mapping import. Non espongono tutti i campi necessari per dedup/import lookup.

## Admin readers/views

| File/reader | Funzione/route | Tabella/view letta | Richiede admin/editor | Service role | Scrive DB | Usabile da script |
|---|---|---|---:|---:|---:|---|
| `lib/admin/adminProviderImportRuns.ts` | `/admin/imports` | `provider_import_runs` | sì | no | no | forse, ma richiede sessione |
| `lib/admin/getAdminProviders.ts` | admin providers | `data_providers` | sì | no | no | forse, ma richiede sessione |
| `lib/admin/getAdminEditorialContent.ts` | admin editorial readers | `admin_*` views | sì | no | no | no per import schema |
| `lib/admin/getAdminUsers.ts` | users admin | `users_profile` | sì | no | no | no |

Limite: i reader admin sono server-side con cookie/sessione. Non sono adatti a script anon locale senza login applicativo.

## Scripts esistenti

| Script | Read/write | Env richieste | Provider | DB | Service role |
|---|---|---|---:|---:|---:|
| `auditProviderConfig.ts` | read local | no env values | no | no | no |
| `manualFixtureDryRun.ts` | read local | no env values | no | no | no |
| `manualImportPlanDryRun.ts` | read local | no env values | no | no | no |
| `manualImportReadinessDryRun.ts` | read local | no env values | no | no | no |
| `manualSchemaConfirmationDryRun.ts` | read local | no env values | no | no | no |
| `manualDbReadOnlySchemaCheck.ts` | read DB anon/public | public Supabase env only | no | read-only | no |
| `provider writer guards` | dry-run | no env values | no | no | no |

## Conclusione

Il percorso read-only esistente più vicino al bisogno è `manualDbReadOnlySchemaCheck.ts`, ma con anon/public env non conferma import lookup. Per risolvere senza service role serve:

- query manuale `SELECT` controllata da SQL Editor, oppure
- view read-only dedicate con grant/policy esplicita in una fase futura separata.
