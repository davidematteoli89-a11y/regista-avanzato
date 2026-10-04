# Supabase staging apply log

## Contesto

FASE B.4 applicata sul progetto Supabase staging esistente chiamato `Regista Avanzato`.

Non sono stati usati produzione, provider reali, Apify, scraping, deploy Vercel o dati reali. `.env.local` non e' stato letto o stampato.

## Pre-flight

- Branch locale: `preview`.
- Progetto locale: `Regista Avanzato/Progetto Definitivo`.
- Migrazioni presenti: `0001`-`0006`.
- `.env.local`: presente, non letto.
- Supabase CLI: usata tramite `npx supabase@latest`.
- Progetto Supabase target verificato come `Regista Avanzato`.
- Progetti non target visti nella lista CLI: `aidady-business-os`, `quiz-live`.
- Database prima della migrazione: 0 tabelle public, 0 view public, 0 utenti Auth.

## Migrazioni applicate

- `0001_base_schema.sql`: applicata senza errori.
- `0002_admin_rbac.sql`: applicata senza errori.
- `0003_rls_policies.sql`: applicata senza errori.
- `0004_public_views.sql`: applicata senza errori.
- `0005_search_usage_rpc.sql`: applicata senza errori.
- `0006_seed_base_data.sql`: applicata senza errori.

## Verifiche dopo ogni fase

- Dopo `0001`: 38 tabelle base, 11 enum, RLS attiva su 38 tabelle, trigger utente presenti.
- Dopo `0002`: 4 funzioni RBAC/Auth, trigger `auth.users` presente, `admin_audit_logs` presente.
- Dopo `0003`: 72 policy, 26 view admin, 0 grant diretti ad `anon` su tabelle base.
- Dopo `0004`: 11 view pubbliche allowlist, 5 view authenticated, 11 grant SELECT ad anon sulle sole view pubbliche.
- Dopo `0005`: 2 RPC ricerca, 2 grant EXECUTE ad authenticated, 0 grant EXECUTE ad anon.
- Dopo `0006`: seed base applicato.

## Stato finale staging

- Tabelle public: 39.
- View public: 42.
- Enum public: 11.
- Tabelle con RLS attiva: 39.
- Policy public: 72.
- Provider seedati: 6.
- Provider esterni attivi: 0.
- Competizioni seedate: 43.
- Competizioni pubblicate: 0.
- Config provider/competizione: 100.
- Import abilitati: 0.
- Utenti Auth: 0.
- Funzioni principali presenti: `has_role`, `is_admin`, `is_editor_or_admin`, `increment_user_search_usage`, `get_user_search_usage_status`.
- View pubbliche principali presenti: 11.
- `admin_audit_logs`: presente.

## Test RLS minimi

- `anon` su `data_providers`: permission denied, esito corretto.
- `anon` su `public_competitions`: query consentita, 0 righe perche' seed draft/private.
- `authenticated` con claim utente fittizio ma senza profilo approved su `increment_user_search_usage()`: errore `Active profile required`, esito corretto.
- `user_search_usage`: 0 righe dopo il test RPC.

## Controlli assenza dati reali

- `auth.users`: 0.
- `newsletter_subscribers`: 0.
- `public_articles`: 0.
- `generated_content`: 0.
- `apify_usage_logs`: 0.
- `api_usage_logs`: 0.
- Provider con `base_url` configurato: 0.

## Non fatto

- Nessun database reset.
- Nessun utente reale creato.
- Nessuna password o token inseriti.
- Nessuna policy modificata dopo applicazione.
- Nessun collegamento Vercel.
- Nessun provider reale, Apify o scraping.
