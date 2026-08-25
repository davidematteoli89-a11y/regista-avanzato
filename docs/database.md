# Database PostgreSQL / Supabase

## Stato

`supabase/schema.sql` definisce 35 tabelle, tipi enum, vincoli, foreign key, indici, trigger `updated_at` e attivazione RLS. È uno schema iniziale non ancora applicato a un progetto Supabase.

## Domini

| Dominio | Tabelle |
|---|---:|
| Core Stats | 10 |
| Provider e Apify | 5 |
| Content | 12 |
| Auth/User | 5 |
| Admin | 3 |

La creazione è ordinata per dipendenze, non per numero del brief. `data_providers` precede `competitions`; `users_profile` precede le foreign key editoriali verso gli approvatori.

## Identità e stagioni

Le chiavi primarie sono UUID. `competitions.internal_key` è l'identità editoriale stabile, mentre la combinazione con `season` identifica l'edizione. Gli ID esterni sono attributi del provider e dovranno essere mantenuti soprattutto in `provider_competition_config`.

Squadre e giocatori hanno un riferimento al contesto corrente, mentre partite e statistiche preservano competizione, stagione e provider. Trasferimenti e partecipazioni multiple potranno richiedere future tabelle `team_competitions` e `player_team_periods`.

## Workflow editoriale

Gli enum condivisi sono:

- `content_status`: draft, review_needed, approved, published, archived, rejected;
- `content_visibility`: private_admin, public_free, public_login_required, public_preview, substack_free, substack_paid;
- `tracking_level`, `provider_type`, `data_confidence`;
- stati separati per match, import, budget, highlight e newsletter.

I campi `status`, `visibility`, `login_required`, `published_at`, `reviewed_at`, `approved_by` e `internal_notes` sono presenti dove hanno significato editoriale o amministrativo. I log tecnici usano stati operativi dedicati.

## Integrità e indici

- Foreign key indicizzate nei percorsi di query principali.
- Unicità su slug editoriali, mapping provider/competizione, run Apify e snapshot statistici.
- Check su budget, punteggi, percentuali, limiti mensili e coerenza Apify.
- `updated_at` aggiornato da un trigger comune su tutte le 35 tabelle.
- Le liste UUID in preferenze, Video Radar e Substack sono array e non hanno foreign key elemento-per-elemento: sono un compromesso temporaneo.

## Sicurezza Supabase

RLS è abilitata su tutte le tabelle, ma non sono presenti policy permissive. Questo è intenzionale: dopo l'applicazione dello schema, utenti `anon` e `authenticated` non potranno leggere o scrivere finché non verranno definite policy esplicite.

`users_profile.id` fa riferimento a `auth.users(id)`, quindi lo schema è progettato per Supabase e non è direttamente eseguibile su un PostgreSQL privo dello schema `auth`.

## Ordine futuro di applicazione

1. Creare un progetto Supabase non produttivo.
2. Revisionare lo schema e convertirlo in migrazione versionata.
3. Applicare la migrazione in staging.
4. Inserire seed non sensibili per provider e competizioni.
5. Definire RLS, ruoli e funzioni server-side.
6. Eseguire test di integrità, permessi e rollback.

Nessuno di questi passaggi è stato eseguito.
