# C phase progress

## C.1 — Public readers Supabase

Stato: implementazione minima completata in locale.

Collegato:

- reader public competitions;
- detail competition da public view se presente;
- reader public teams;
- reader public matches;
- reader public standings;
- empty state `/competizioni` per public views vuote.

Resta mock:

- profilo squadra completo;
- dettaglio partita completo;
- statistiche profonde;
- player profiles;
- highlights completi;
- contenuti editoriali generati;
- provider/import.

## Regole ancora attive

- Provider reali spenti.
- Apify spento.
- Nessun deploy Production.
- Nessun import automatico.
- Nessuna pubblicazione massiva delle 43 competizioni.

## Prossimo passo

C.2 — seed demo pubblicato controllato.

Proposta:

- pubblicare solo una competizione demo o una competizione reale selezionata;
- aggiungere poche squadre e partite;
- verificare public views online;
- mantenere provider e Apify spenti.

## C.2 — Seed demo pubblicato controllato

Stato: completato in staging.

Esito verifica:

- `public_competitions`: 0 righe.
- `public_teams`: 0 righe.
- `public_matches`: 0 righe.
- `public_standings`: 0 righe.
- anon continua a non leggere tabelle sensibili.

Causa probabile: mismatch stagione. Il seed manuale iniziale usava `2026`, mentre `serie-a` nello staging seedato usa `2026/27`.

Correzione locale:

- `supabase/manual/demo_seed_c2.sql` aggiornato per `2026/27`.
- `ON CONFLICT` rimosso dalla sezione seed dopo errore su constraint non presente nello staging reale.
- Idempotenza ottenuta con delete preventivo delle sole righe demo e insert pulito.

Prossimo passo: applicare manualmente solo la SEZIONE 1 corretta, poi verificare con la SEZIONE 2.

Verifica finale:

- `public_competitions`: 1.
- `public_teams`: 4.
- `public_matches`: 2.
- `public_standings`: 4.
- `active_providers`: 0.
- `enabled_imports`: 0.

Pagine locali verificate:

- `/competizioni`.
- `/competizioni/serie-a`.
- `/competizioni/serie-a/squadre`.
- `/competizioni/serie-a/partite`.
- `/competizioni/serie-a/classifica`.

Le pagine leggono dati demo da Supabase public views. Restano mock/dry-run provider, Apify, statistiche profonde, profili dettagliati e contenuti editoriali automatici.

## C.2.1 — Preview online verificata

Stato: completato.

Deployment verificato:

- Vercel Preview: Ready.
- Branch: `preview`.
- Commit: `bb9f8dd`.
- Environment: Preview.
- Production non toccata.

Pagine online verificate:

- `/competizioni`.
- `/competizioni/serie-a`.
- `/competizioni/serie-a/squadre`.
- `/competizioni/serie-a/partite`.
- `/competizioni/serie-a/classifica`.

Esito:

- le pagine online mostrano i dati demo persistiti in Supabase staging;
- i public readers C.1 risultano validati anche su Vercel Preview;
- il dataset C.2 resta limitato e controllato;
- provider reali spenti;
- Apify spento;
- nessun import automatico attivato;
- nessun deploy Production eseguito.
