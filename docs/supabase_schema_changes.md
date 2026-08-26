# Modifiche schema hardening

Confronto tra `supabase/schema.sql` e la migrazione base non applicata.

## Sicurezza e identità

- Nuovo enum `app_role`: `free_user`, `editor`, `admin`, `super_admin`.
- `users_profile.role` usa l'enum invece di testo con check.
- La scelta resta `users_profile.role`, non una seconda tabella: un'unica riga per utente riduce join e rischio di divergenza. Le promozioni sono server-side e mai ricavate da metadata client.
- Nuovo bootstrap `auth.users -> users_profile` in `0002`, sempre con ruolo free.
- Nuovo `admin_audit_logs` append-only.

## Provider e deduplica

- `apify_usage_logs.provider` diventa `provider_id`, coerente con le altre FK SQL.
- Aggiunti unique index parziali per external ID di team, player, match ed evento.
- Aggiunta identità fallback match su competizione, stagione, squadre e kickoff quando manca l'external ID.
- Le quattro stats richiedono `source_provider_id NOT NULL`: anche mock è un provider seedato. I payload dry-run con FK null restano non scrivibili e il futuro writer dovrà fare `skip`.
- Aggiunta deduplica delle player season stats senza team e dei preferiti per utente/target.

## Budget Apify

`remaining_budget_eur` e `status` diventano colonne generate da budget, soglie e spesa. Non possono più divergere per un aggiornamento parziale.

## Persistenza moduli

- `news_archive` riceve categoria, fonti, segnali, score, priority, review, warning e deduplica. Le colonne operative non entrano nelle view pubbliche.
- Nuova `historical_echoes` con snapshot narrativo e campi operativi separati.
- Nuove `daily_radar_runs` e `weekly_digests`, private per default.
- Tutte le nuove tabelle base ricevono indici, trigger `updated_at` e RLS.

## Enum TypeScript

Non sono stati aggiunti all'enum DB tutti gli stati UI specifici. Il database conserva un workflow editoriale canonico:

- `candidate` e `pending_review` -> `review_needed`;
- `generated` -> `draft` o `review_needed` secondo il modulo;
- `approved`, `published`, `rejected`, `archived` restano equivalenti;
- `used`, `scheduled_external`, `published_external` restano metadata del modulo o vengono mappati a `approved/published/archived` con stato esterno separato.

Questa scelta evita un enum globale accoppiato a ogni macchina a stati UI. Il mapper DB esplicito deve essere creato prima della persistenza reale.

## Campi non allentati

Le FK obbligatorie di match/eventi/stats non sono state rese nullable. Un record reale senza identità parent non è valido. External ID, kickoff e metriche opzionali restano nullable dove la copertura provider può essere parziale.

## Rischi ancora aperti

- Team è ancora legato direttamente a una competition; in futuro può servire una relazione team/competition/season.
- `players.slug` resta unico globalmente e richiede disambiguazione mapper.
- Array UUID di preferenze/Video Radar/Substack non hanno FK elemento-per-elemento.
- Le colonne JSONB dei moduli editoriali necessitano versionamento del payload.
- `schema.sql` non incorpora l'hardening: non deve essere applicato al posto delle migrazioni.
