# MVP staging closure report — C.6

Data: 2026-08-29

Stato: MVP staging tecnico chiudibile come demo controllata, non pronto per Production.

## Sintesi

Regista Avanzato ha raggiunto una base staging verificata:

- frontend pubblico attivo su Vercel Preview;
- Supabase staging collegato;
- Auth reale funzionante;
- account e preferenze funzionanti;
- quota ricerca 3/3 funzionante via RPC;
- area `/admin` protetta server-side tramite ruolo;
- dati demo pubblici letti da public views;
- contenuti editoriali demo letti da public views;
- view admin editoriali con colonne esplicite;
- prima Server Action admin reale verificata su Preview;
- audit log scritto correttamente dalla RPC transazionale.

Percentuale stimata MVP staging tecnico: 80%.

## Frontend pubblico

Completo per staging:

- homepage e route pubbliche principali buildano correttamente;
- layout pubblico condiviso attivo;
- navbar auth-aware:
  - utente anonimo: `Accedi` e `Registrati gratis`;
  - utente loggato: `Account`;
- pagine competizioni demo leggono da Supabase public views;
- pagine editoriali demo leggono da Supabase public views.

Resta mock/dry-run:

- dati estesi giocatori;
- dati profondi squadre;
- partite non incluse nel seed demo;
- Video Radar;
- Watchlist;
- News Radar automatico;
- generatori editoriali;
- Substack API.

## Login, registrazione e account

Completo per staging:

- registrazione Supabase funzionante;
- login Supabase funzionante;
- conferma email dipendente dalla corretta configurazione Supabase Auth Site URL/Redirect URL;
- account e preferenze funzionanti;
- logout admin funzionante;
- `/admin` bloccato dopo logout.

Rischi residui:

- verificare sempre che Preview usi URL Supabase Auth coerenti con dominio Preview;
- i link email generati prima del cambio URL possono puntare a URL vecchi;
- Production richiederà redirect URL separati e controllati.

## Admin e ruoli

Completo per staging:

- `/admin` protetto server-side;
- utente non loggato/non admin bloccato o 404;
- admin Supabase test accede correttamente;
- route admin editoriali leggono contenuti da view admin;
- badge/blocchi staging visibili;
- mock/dry-run separati dalle sezioni collegate a Supabase.

Ancora non implementato:

- publish;
- unpublish UI;
- delete;
- create draft;
- editor completo;
- upload;
- workflow editoriale multi-ruolo.

## Dati demo Supabase

Dataset demo controllato disponibile in staging:

- 1 competizione demo pubblicata;
- 4 squadre demo;
- 2 partite demo;
- classifica demo base;
- 1 articolo demo;
- 1 news demo;
- 1 story demo;
- 1 Historical Echo demo.

Conferme:

- provider reali non attivati;
- Apify non attivato;
- import automatici non attivati;
- Production non toccata.

## Public views

Verificate per staging:

- `public_competitions`;
- `public_teams`;
- `public_matches`;
- `public_standings`;
- `public_articles_published`;
- `public_news_published`;
- `public_stories_published`;
- `public_historical_echoes`.

Regola mantenuta:

- le pagine pubbliche leggono solo public views o fallback safe;
- nessuna pagina pubblica chiama provider esterni;
- nessuna pagina pubblica chiama Apify.

## Admin views

Le quattro view admin editoriali sono state ricreate con colonne esplicite nella migrazione `0007_admin_editorial_views_explicit_columns.sql`, applicata manualmente su staging:

- `admin_public_articles`;
- `admin_news_archive`;
- `admin_story_library`;
- `admin_historical_echoes`.

Conferme:

- colonne esplicite verificate;
- filtro interno `is_editor_or_admin()` confermato;
- `SELECT` a `authenticated` accettabile perché free_user non riceve righe;
- anon senza grant.

Rischio residuo:

- eventuali altre view `admin_*` fuori scope editoriale vanno auditate in futuro.

## RPC 0008 e Server Action internal_notes

Migrazione `0008_admin_editorial_transactional_actions.sql` applicata manualmente su Supabase staging.

RPC create:

- `update_editorial_internal_notes`;
- `unpublish_editorial_content`.

Stato:

- `update_editorial_internal_notes` collegata alla Server Action;
- `unpublish_editorial_content` non collegata alla UI e non testata operativamente;
- SQL Editor con `auth.uid() = null` blocca correttamente le chiamate non admin;
- test positivo completato da Preview con sessione admin reale.

Server Action verificata:

- `updateAdminEditorialInternalNotesAction`;
- usa sessione Supabase server-side;
- chiama solo la RPC `update_editorial_internal_notes`;
- non usa service role;
- non scrive direttamente `admin_audit_logs`;
- audit demandato alla RPC transazionale.

Audit log confermato:

- action `update_editorial_internal_notes`;
- `before_data` presente;
- `after_data` presente;
- `metadata` presente;
- `created_at` recente.

## Cosa resta spento

Restano esplicitamente spenti/non collegati:

- provider reale stabile;
- TheStatsAPI;
- API-Football;
- Apify/SofaScore;
- import automatici;
- cron job;
- Substack API;
- AI generation;
- publish;
- unpublish UI;
- delete;
- create draft;
- Production deploy.

## Rischi residui

- confermare che il repository GitHub resti Private;
- confermare che la service role key sia stata ruotata dopo l’esposizione accidentale;
- mantenere env Supabase solo su Vercel Preview finché Production non è pronta;
- migration history manuale: migrazioni applicate via SQL Editor/db query potrebbero non essere allineate con `supabase_migrations.schema_migrations`;
- Supabase Auth Site URL/Redirect URL da distinguere tra localhost, Preview e futura Production;
- altre view `admin_*` fuori scope editoriale da bonificare;
- legal/privacy/cookie ancora da preparare prima di pubblico reale;
- cookie banner e privacy policy non ancora considerati production-ready.

## Readiness produzione

Non pronto per Production.

Manca prima di Production:

- strategia migration tracking definitiva;
- hardening completo RLS e test multi-ruolo;
- policy privacy/cookie;
- gestione errori e logging produzione;
- protezione admin stabile;
- test Production env separato;
- eventuale rollback plan;
- review legale su highlights/link/fonti;
- piano contenuti reali;
- provider activation plan eseguito in dry-run prima di qualsiasi import reale.

## Prossimo piano consigliato

Sequenza prudente:

1. C.5.4 — piano e test controllato per `unpublish_editorial_content`, senza collegarlo subito in modo ampio;
2. C.7 — provider stabile in dry-run, senza chiamate reali;
3. C.8 — contenuti reali manuali minimi e verificati;
4. C.9 — readiness Production tecnico/legale/privacy;
5. solo dopo: primo provider reale con budget e rollback approvati;
6. Apify resta spento fino a test budget dedicato.

## Verifica build C.6

Eseguiti localmente:

- `npm run lint`: ok;
- `npm run typecheck`: ok;
- `npm run build`: ok.

Nessun deploy eseguito.
Nessuna migrazione applicata.
Nessun provider/Apify chiamato.
Production non toccata.
