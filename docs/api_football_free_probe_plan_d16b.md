# D.16-B — API-Football Free probe plan

Stato: piano documentale preparato, nessuna real-call eseguita.

D.16-B registra la decisione strategica di usare `api_football` con piano Free per la prima futura probe read-only. La probe reale non viene eseguita in questa fase e resta demandata a D.16-C, solo dopo conferma esplicita.

## Decisione

- Provider scelto per la prima futura probe: `api_football`.
- Piano iniziale: Free.
- Scopo del piano Free: test tecnico controllato, non import reale.
- Alternativa mantenuta: `the_stats_api`.

## Motivazione

Partire dal piano Free:

- riduce il rischio economico;
- consente una prima verifica tecnica su endpoint, auth e payload;
- evita abbonamenti prematuri;
- mantiene aperto il confronto con `the_stats_api` se copertura, costi o licenza risultano migliori.

Il passaggio a un piano a pagamento potrà essere valutato solo dopo:

- probe riuscita;
- payload compatibile con mapper e schema Supabase;
- limiti chiari;
- licenza, caching e pubblicazione confermati;
- costi sostenibili;
- nessun problema di sicurezza;
- nessuna necessità di attivare import reali lato utente.

## Piano futura probe D.16-C

La futura probe dovrà rispettare questi vincoli:

- provider: `api_football`;
- piano: Free;
- competizione: `serie-a`;
- endpoint candidato: `standings` oppure `fixtures`;
- numero richieste: massimo 1;
- modalità: read-only;
- output: console sanificato;
- token: solo da env sicura, mai stampato;
- DB write: `false`;
- import: `false`;
- provider attivo in DB: `false`;
- Apify: `false`;
- Production: `false`.

La probe dovrà essere separata da:

- script dry-run;
- writer provider;
- import reali;
- UI admin;
- pagine pubbliche;
- cron job;
- Apify.

## Criteri di successo

- API risponde correttamente.
- Payload leggibile.
- Mapping teorico possibile verso Supabase.
- Nessun token stampato.
- Nessuna scrittura DB.
- Nessun provider/import attivato.
- Quota/costo sotto controllo.
- Output sanificato e non persistito.

## Criteri di fallimento

- Token assente.
- Errore `401`/`403`.
- Rate limit o quota non chiari.
- Payload non compatibile o non documentato.
- Licenza/caching/pubblicazione non chiari.
- Qualunque tentativo di scrittura DB.
- Qualunque fetch multipla non autorizzata.
- Qualunque attivazione provider/import.
- Qualunque uso di Production.

## Gate prima di D.16-C

Prima della vera probe devono essere completati:

- account/API-Football Free creato manualmente dall’utente;
- token/API key disponibile solo in env sicura;
- token non committato;
- token non stampato;
- repo GitHub confermato Private;
- service role Supabase ruotata/confermata;
- Vercel env limitate a Preview se usate;
- script probe separato da import;
- massimo 1 richiesta;
- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- provider/import ancora spenti;
- `realWritesEnabled=false`;
- `real_provider_probe_enabled=false` fino ad autorizzazione esplicita;
- `/admin/imports` resta read-only;
- Production non toccata;
- conferma esplicita utente prima della real-call.

## Cosa non viene fatto in D.16-B

- Nessuna chiamata API-Football.
- Nessuna chiamata TheStatsAPI.
- Nessuna chiamata Apify.
- Nessuna chiamata SofaScore.
- Nessuna fetch provider esterna.
- Nessuno scraping.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `db push/reset`.
- Nessun provider attivato.
- Nessun import attivato.
- Nessun deploy.
- Production non toccata.

## Stato operativo dopo D.16-B

- `api_football` è il provider scelto per la prima probe futura.
- `the_stats_api` resta alternativa.
- La probe resta disabilitata.
- I writer restano disabilitati.
- Provider, Apify e import restano spenti.
- Il prossimo step consigliato è D.16-C, solo con conferma esplicita e con massimo una richiesta read-only.

## D.16-C1 — Preparazione sicura API key

Documento aggiunto:

- `docs/api_football_key_setup_d16c1.md`.

D.16-C1 prepara solo i nomi env futuri:

- `API_FOOTBALL_API_KEY`;
- `API_FOOTBALL_BASE_URL`;
- `API_FOOTBALL_PROBE_ENABLED=false`.

La chiave non viene creata, letta, stampata o salvata. La futura real-call resta bloccata finché non verrà autorizzata una fase separata.
