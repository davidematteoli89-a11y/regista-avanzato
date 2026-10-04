# Supabase staging test plan

## Obiettivo

Validare le migrazioni su un progetto Supabase staging vuoto, senza provider reali, senza Apify, senza dati sensibili e senza deploy production.

## Pre-flight

- Creare un progetto Supabase staging separato.
- Non inserire ancora env in Vercel Production.
- Applicare le migrazioni in ordine da `0001` a `0006`.
- Non usare dati reali, token provider, token Apify o service role nel client.
- Tenere una copia delle query di verifica eseguite.

## Test schema

- Verificare che tutte le tabelle siano create.
- Verificare che RLS sia attiva sulle tabelle `public`.
- Verificare che i trigger `updated_at` esistano sulle tabelle previste.
- Verificare FK, unique constraint, check constraint e generated columns.
- Verificare che i seed creino 6 provider e 43 competizioni draft/private.

## Test anon

- `anon` non deve leggere tabelle base come `data_providers`, `api_usage_logs`, `import_logs`, `apify_usage_logs`, `admin_audit_logs`.
- `anon` deve poter leggere solo view pubbliche allowlist.
- `anon` non deve vedere draft, private_admin, pending, rejected.
- `anon` non deve vedere URL completi highlights, script Video Radar o statistiche profonde.
- `anon` non deve eseguire `increment_user_search_usage()`.

## Test authenticated free_user

- Un utente autenticato deve leggere e aggiornare solo il proprio profilo/preferenze.
- Non deve potersi auto-promuovere modificando `role`.
- Deve poter leggere view autenticate pubblicate dove previsto.
- Deve poter eseguire `get_user_search_usage_status()`.
- Deve poter eseguire `increment_user_search_usage()` al massimo 3 volte nel mese UTC.
- La quarta chiamata deve restituire `allowed = false` senza incrementare.

## Test concorrenza RPC

- Lanciare piu' chiamate concorrenti a `increment_user_search_usage()` per lo stesso utente.
- Verificare che `advanced_search_count` finale sia massimo 3.
- Verificare che solo tre risposte abbiano `incremented = true`.
- Verificare che non esistano duplicati per `(user_id, period_start)`.

## Test editor/admin

- Promuovere manualmente un utente a `editor` o `admin` solo da SQL controllato.
- `editor` deve poter gestire contenuti operativi ma non infrastruttura/costi.
- `admin` deve poter gestire provider, log, budget e audit.
- `admin_audit_logs` deve essere append-only per i client.

## Test view pubbliche

- Verificare che le view non espongano `raw_data`, `source_payload`, `provider_id`, `internal_score`, `internal_notes`, `internal_warnings`, `review_notes`, costi o log.
- Verificare che entita' figlie non escano se la competizione padre non e' pubblicata/leggibile.
- Verificare che contenuti login-required non mostrino corpo completo ad anon.

## Test Auth

- Provare registrazione free con conferma email abilitata.
- Provare registrazione free con conferma email disabilitata, se scelta per staging.
- Verificare creazione profilo via trigger `auth.users`.
- Verificare che la server action futura non inserisca `role` manualmente.

## Test applicativi dopo env staging

- Login e registrazione non devono rompere la preview.
- `/account` deve gestire profilo reale.
- `/ricerca` deve usare la RPC invece del mock quando verra' collegata.
- `/admin` deve bloccare server-side gli utenti non admin prima del render.
- Nessun bundle client deve contenere `SUPABASE_SERVICE_ROLE_KEY`.

## Criteri di uscita

Lo staging e' accettabile quando anon, free_user, editor e admin hanno accessi coerenti; la RPC quota supera test sequenziale e concorrente; le view non espongono colonne interne; nessun token o dato reale e' presente.
