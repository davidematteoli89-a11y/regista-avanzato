# Public readers Supabase plan

## Obiettivo C.1

Collegare gradualmente le pagine pubbliche principali alle public views Supabase già protette da RLS/view allowlist, senza provider reali, Apify, import automatici o dati live.

## Audit reader attuali

Prima di C.1:

- `/competizioni` usava `getPublicCompetitions()` ma il reader leggeva solo `MOCK_PUBLIC_COMPETITIONS`.
- `/competizioni/[competitionId]` usava `getPublicCompetitionDetail()` basato su mock.
- `/competizioni/[competitionId]/partite` usava `getPublicMatches()` basato su mock.
- `/competizioni/[competitionId]/squadre` usava `getPublicTeams()` basato su mock.
- `/competizioni/[competitionId]/classifica` usava `getPublicStandings()` basato su mock.
- `/squadre/[teamId]` e `/partite/[matchId]` restano basate sui profili/dettagli mock specifici.

## Public views disponibili

Presenti nella migrazione `0004_public_views.sql`:

- `public_competitions`
- `public_teams`
- `public_matches`
- `public_standings`

Le view filtrano righe `published` e contenuti leggibili tramite `can_read_published_content()`.

## Reader collegati in C.1

Creato `lib/publicData/supabasePublicViews.ts`, server-only, che:

- usa solo `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`;
- non usa service role;
- non importa provider router;
- non chiama TheStatsAPI, API-Football o Apify;
- legge solo public views;
- converte UUID relazionali interni in slug/internal_key pubblici dove possibile;
- fa fallback mock solo se Supabase non è configurato o la public view non è disponibile;
- mostra empty state se Supabase è configurato ma non ci sono righe pubblicate.

Reader aggiornati:

- `getPublicCompetitions()`
- `getPublicCompetitionDetail()`
- `getPublicTeams()`
- `getPublicMatches()`
- `getPublicStandings()`

## Strategia fallback

- Supabase configurato e view con righe: usa dati Supabase.
- Supabase configurato e view vuota: mostra empty state controllato.
- Supabase non configurato: usa fallback mock demo.
- Errore public view: usa fallback mock demo con warning.

## Campi mancanti o limitazioni

- `public_competitions` non espone `tracking_level` o `data_confidence`; il reader li ricava dalla config locale tramite `internal_key/slug`.
- `public_matches` non espone nomi squadre o nome competizione; il reader li ricostruisce usando solo `public_teams` e `public_competitions`.
- `public_standings` usa `competition_id`/`team_id` UUID; il reader li rimappa verso ID pubblici.
- Le pagine profilo squadra e dettaglio partita restano mock in C.1.

## Zero leakage

I reader pubblici non leggono:

- tabelle base;
- `provider_id`;
- `raw_payload`;
- `internal_score`;
- `internal_notes`;
- `internal_warnings`;
- `review_notes`;
- costi;
- log;
- config provider.

## C.2 consigliata

Pubblicare un seed demo controllato minimo, non massivo:

1. 1-2 competizioni.
2. 2-4 squadre.
3. 1-3 partite.
4. eventuale classifica base.
5. tutto con `status = published`, `visibility = public_free`, `published_at` valorizzato.
6. nessun provider reale attivo.
7. nessun import automatico.

## Verifica C.2

Il primo seed manuale applicato non ha prodotto righe nelle public views perché filtrava `serie-a` con la stagione `2026`, mentre la competizione seedata è `2026/27`.

Il file `supabase/manual/demo_seed_c2.sql` è stato corretto e deve essere riapplicato manualmente dalla SEZIONE 1.

## Esito finale C.2

Il seed corretto è stato applicato manualmente e le public views restituiscono:

- 1 competizione.
- 4 squadre.
- 2 partite.
- 4 righe classifica.

I reader C.1 sono quindi validati con dati persistiti Supabase staging.

Nota UX: la pagina squadre in modalità anon mostra solo la preview prevista dal gating free-login; non è fallback mock.
