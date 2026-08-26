# Auth/RLS test log

## Stato test

FASE B.5, Step 4 e Step 5 completati su Supabase staging `Regista Avanzato`.

Non sono stati creati altri utenti, non sono stati promossi admin, non sono stati letti o stampati valori `.env.local`, non sono stati collegati Vercel, provider o Apify.

## Contesto

- Utente test: 1.
- Profilo test: creato dal trigger Auth.
- Ruolo profilo iniziale: `free_user`.
- Ruolo profilo dopo Step 5: `admin`.
- Stato profilo: `approved`.
- Quota ricerca: 1 riga, count finale 3 dopo Step 3.
- Nessun altro utente creato.

## Test anon

Anon e' stato bloccato sulle tabelle sensibili richieste:

- `data_providers`: bloccato.
- `api_usage_logs`: bloccato.
- `apify_usage_logs`: bloccato.
- `import_logs`: bloccato.
- `admin_audit_logs`: bloccato.
- `users_profile`: bloccato.
- `user_search_usage`: bloccato.
- `generated_content`: bloccato.

Anon puo' leggere le view pubbliche allowlist, tutte con 0 righe perche' il seed e' draft/private:

- `public_competitions`: 0.
- `public_teams`: 0.
- `public_players`: 0.
- `public_matches`: 0.
- `public_articles_published`: 0.
- `public_news_published`: 0.
- `public_stories_published`: 0.
- `public_historical_echoes`: 0.
- `public_highlight_links_approved`: 0.
- `public_video_radar_approved`: 0.

Le view pubbliche non espongono colonne con nomi sensibili riconducibili a provider id, raw payload, score interni, note interne, warning, review notes, costi, log, token o config.

## Test authenticated free_user

Il free_user test:

- legge il proprio profilo: 1 riga.
- non legge profili altrui con claim diverso: 0 righe.
- legge la propria quota: 1 riga, count 3.
- non puo' fare update diretto su `user_search_usage`.
- non puo' fare insert diretto su `user_search_usage`.
- non puo' fare delete diretto su `user_search_usage`.
- non legge contenuti draft/private_admin dalle tabelle base `competitions`, `public_articles`, `generated_content`.
- non e' admin: `is_admin() = false`.
- non e' editor/admin: `is_editor_or_admin() = false`.

Sulle tabelle infrastrutturali con grant ma policy admin-only, il free_user riceve 0 righe:

- `data_providers`: 0.
- `api_usage_logs`: 0.
- `apify_usage_logs`: 0.
- `import_logs`: 0.
- `admin_audit_logs`: 0.

Su `generated_content` il free_user non ha grant diretto e viene bloccato.

## View autenticate

Il free_user puo' interrogare le view autenticate consentite, ma il risultato e' 0 righe perche' non ci sono dati pubblicati:

- `authenticated_match_events`: 0.
- `authenticated_team_match_stats`: 0.
- `authenticated_player_match_stats`: 0.
- `authenticated_team_season_stats`: 0.
- `authenticated_player_season_stats`: 0.

Le view autenticate non espongono colonne con nomi sensibili riconducibili a provider id, raw payload, score interni, note interne, warning, review notes, costi, log, token o config.

## Esito

Nessun leakage rilevato nei test anon/free_user di base. Restano da testare dati `published` controllati e concorrenza RPC.

## Step 5 admin

L'unico utente test e' stato promosso ad `admin` dopo conferma esplicita.

Helper RBAC:

- `has_role('admin') = true`.
- `is_admin() = true`.
- `is_editor_or_admin() = true`.
- `has_role('editor') = false`.

Letture admin riuscite su:

- `data_providers`: 6.
- `provider_competition_config`: 100.
- `api_usage_logs`: 0.
- `apify_usage_logs`: 0.
- `import_logs`: 0.
- `admin_audit_logs`: 0.
- `admin_competitions`: 43 draft/private.
- `admin_generated_content`: 0.

Le tabelle base dei contenuti non espongono SELECT diretto: per lettura operativa admin si usano le view `admin_*`.
