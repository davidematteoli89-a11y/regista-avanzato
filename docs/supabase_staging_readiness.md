# Supabase staging readiness audit

Data audit: 25 agosto 2026. Questo documento descrive lo stato del repository; non applica SQL, migrazioni, seed o policy.

## Esito

Lo schema è una buona base **deny-by-default**, ma richiede modifiche prima di essere usato dallo staging. Può essere eseguito solo su un database vuoto e, nello stato attuale, creerebbe tabelle con RLS attiva ma senza policy: anon e utenti autenticati non potrebbero leggere o scrivere nulla. Il blocco è sicuro, ma rende inutilizzabili Auth, preferenze, quota e reader pubblici.

Non collegare ancora le variabili Supabase a Vercel Preview.

## Inventario verificato

- 1 estensione: `pgcrypto`.
- 10 enum: `content_status`, `content_visibility`, `tracking_level`, `provider_type`, `data_confidence`, `import_run_status`, `budget_status`, `match_status`, `highlight_status`, `newsletter_subscription_status`.
- 35 tabelle applicative.
- 129 indici espliciti, oltre a indici creati da primary key e unique constraint.
- 103 riferimenti FK dichiarati e 85 espressioni `check`.
- Trigger `updated_at` predisposto per tutte le 35 tabelle tramite `set_updated_at()`.
- RLS abilitata su tutte le 35 tabelle; zero policy e zero RPC applicative.

Copertura presente:

| Dominio | Oggetti principali | Stato |
| --- | --- | --- |
| Utenti | `users_profile`, `user_preferences`, `user_search_usage`, `user_saved_items` | Base presente; policy e bootstrap profilo assenti |
| Calcio | `competitions`, `teams`, `players`, `matches`, `match_events`, `standings` | Base presente |
| Statistiche | quattro tabelle match/season per team/player | Base presente; accesso pubblico/free da progettare |
| Provider/import | `data_providers`, `provider_competition_config`, log API/import/Apify e budget | Presente, solo privato operativo |
| Editoriale | trend, candidati, news archive, story library, highlight, Video Radar, generated content, articoli, newsletter/Substack | Copertura parziale |
| Admin | `admin_notes` | Non equivale a un audit log immutabile |

## Problemi da correggere prima della migrazione

### Bloccanti per l'app staging

1. **Policy RLS assenti.** È corretto non avere policy permissive, ma login, creazione profilo, preferenze, preferiti, quota e reader falliranno appena l'app userà Supabase.
2. **RPC quota assente.** `lib/auth/searchUsage.ts` esegue read-then-write; l'update condizionale riduce ma non elimina race e il ramo insert può collidere. Serve una sola RPC atomica.
3. **Bootstrap profilo non garantito.** La registrazione crea il profilo solo quando `signUp()` restituisce una sessione. Con conferma email attiva la sessione può essere assente e `users_profile` non viene creato.
4. **Admin mock aperto.** `lib/admin/adminAccess.ts` restituisce sempre accesso consentito. Non configurare Supabase/Vercel staging condiviso finché il layout admin non applica Auth e ruolo server-side.
5. **Nessun contratto pubblico a colonne sicure.** RLS filtra righe, non colonne. Policy dirette sulle tabelle editoriali esporrebbero anche `internal_notes`, `source_payload`, score, warning o metadati operativi. Servono view pubbliche con allowlist di colonne o reader server-side con proiezioni esplicite.

### Mismatch tra payload TypeScript e schema

| Area | Contratto TypeScript | Schema | Decisione richiesta |
| --- | --- | --- | --- |
| Competizioni | provider configurati come ID logici, mapper li risolve in UUID | tre FK UUID | Seed/writer deve risolvere `provider_key -> id`; mai persistere l'ID logico nella FK |
| Squadre | dry-run ammette `competition_id = null` | schema lo ammette | Valido per staging parziale, ma il writer reale dovrebbe richiedere competizione risolta |
| Match | `competition_id`, `home_team_id`, `away_team_id` sono nullable nel payload dry-run | tutti `NOT NULL` | Il writer reale deve saltare il record finché le FK non sono risolte; non allentare il modello per nascondere errori |
| Eventi | `match_id` nullable nel dry-run | `NOT NULL` | Stessa guardia prima dell'upsert |
| Stats | FK principali nullable nei payload dry-run | FK principali `NOT NULL` | Stessa guardia; payload dry-run non è direttamente scrivibile |
| Stats estese | xG/xA, key pass, duelli, cartellini e altri campi finiscono in `extra_stats` | alcune metriche non sono colonne dedicate | Coerente come prima fase, ma documentare/versionare le chiavi JSON prima di query reali |
| Nomi utente | codice e schema usano `users_profile` | il piano prodotto spesso dice `profiles` | Nessun errore runtime; scegliere un nome canonico prima di generare tipi DB |
| Apify log | TypeScript usa `providerId` | colonna SQL `provider` | Il writer dovrà mappare esplicitamente; consigliato uniformare a `provider_id` in una migrazione pre-staging |

### Vincoli e deduplica

- Le unique key che includono `source_provider_id` nullable non deduplicano righe con provider `NULL`, perché PostgreSQL considera i `NULL` distinti. In import reale il provider dovrebbe essere obbligatorio oppure vanno aggiunti indici parziali/fallback deterministici.
- `players.slug` è unico globalmente: omonimie o cambi di nome potrebbero collidere. Preferire deduplica provider + external ID e uno slug disambiguato.
- `teams` è unica per competition + slug: la stessa squadra in più competizioni/stagioni produrrebbe duplicati di identità. Valutare una tabella team canonica e una relazione competition/season.
- Gli array UUID in preferenze, Video Radar e coda Substack non hanno FK elemento-per-elemento. Per integrità e query RLS robuste sono preferibili tabelle ponte; non è un blocco per una demo privata.
- `apify_budget_status.remaining_budget_eur` è scritto manualmente ma vincolato all'uguaglianza esatta. Meglio colonna generata o aggiornamento atomico tramite funzione.
- `api_usage_logs` non ha una chiave di aggregazione univoca. Definire se ogni riga è evento o aggregato; solo nel secondo caso aggiungere unique su provider/data/endpoint/script/competizione.

### Moduli senza persistenza completa

- Manca un vero `admin_audit_logs` append-only con attore, azione, entità, before/after, request/correlation ID e timestamp.
- `news_archive` non rappresenta tutti i campi di News Radar: fonti multiple, reliability, signal, score, priority, review status, warning e deduplica.
- `story_matches` non rappresenta l'intero Historical Echo: trigger, breakdown score, comparison points, fonti, warning e review.
- Daily Radar e Weekly Digest non hanno tabelle di run/snapshot/candidati/sezioni. `trend_signals`, `content_candidates` e `newsletter_issues` coprono solo una parte.
- I tipi mock usano stati/visibility (`candidate`, `pending_review`, `public_full`, `login_required`, ecc.) che non coincidono sempre con gli enum SQL. Serve una mappa canonica prima della persistenza.

Queste lacune non impediscono un primo Auth/read test se quei moduli restano mock; impediscono però di dichiarare lo schema completo rispetto all'MVP.

## Nullability consigliata

- Mantenere nullable gli external ID, i riferimenti provider, kickoff, stats opzionali, contenuti non ancora prodotti e riferimenti editoriali parziali.
- Mantenere `NOT NULL` le identità e le FK necessarie a record reali (`matches` e stats). I mapper dry-run possono usare `null`, ma il futuro writer deve trasformarlo in `skip`, non in insert.
- Valutare `country`, `continent` e `update_frequency` di competition: sono sempre presenti nella config corrente, quindi non bloccano il seed. Non allentarli senza un caso reale.
- Non rendere nullable `users_profile.id`, `user_search_usage.user_id/period_*` o gli stati di sicurezza.

## Indici da valutare prima del traffico

- Indici parziali pubblici su `(published_at)` per righe `status = 'published'` e visibility pubblica.
- Indici per le subquery RLS delle stats attraverso match/competition.
- Unique partial su external ID quando `source_provider_id` e ID esterno sono entrambi non null.
- Indice su `users_profile(role)` utile per amministrazione, non necessario per il primo utente.
- Indici/unique delle future tabelle ponte e dell'audit log.

## Sequenza operativa sicura

1. Correggere schema e contratti elencati, poi convertirli in migrazioni versionate.
2. Creare un progetto Supabase staging separato e vuoto.
3. Salvare URL e anon key soltanto in locale ignorato; conservare la service role solo server-side e fuori da Vercel finché non serve.
4. Applicare schema con RLS deny-by-default in staging.
5. Applicare policy, helper admin e RPC quota nella stessa finestra controllata, prima di esporre l'app.
6. Verificare oggetti e constraint mediante introspezione.
7. Applicare seed minimo idempotente.
8. Creare un utente Auth di test, verificare il bootstrap profilo e promuovere manualmente un solo admin staging.
9. Testare una matrice anon / free / admin / service role con casi positivi e negativi.
10. Solo dopo, aggiungere a Vercel Preview URL e anon key; non aggiungere la service role finché nessun job autorizzato la richiede.

## Variabili staging

- `NEXT_PUBLIC_SUPABASE_URL`: pubblica, necessaria al browser e al client SSR.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: pubblica per definizione; la sicurezza dipende da RLS.
- `SUPABASE_SERVICE_ROLE_KEY`: segreta, solo server/job amministrativi; non deve essere importata da client component, loggata o configurata in Preview in questa fase.

Le prime due possono essere aggiunte a Vercel Preview soltanto dopo i test RLS. Nessun valore reale va inserito nei file versionati.
