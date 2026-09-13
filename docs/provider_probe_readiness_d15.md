# D.15 — Provider probe readiness gate

## Stato attuale

D.15 prepara il gate finale prima di una futura probe provider reale.

Stato:

- probe disabilitata presente;
- comando: `npm run probe:stable-provider:disabled`;
- provider provvisorio: `api_football`;
- provider alternativo: `the_stats_api`;
- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- `provider_activated=false`;
- `import_enabled=false`;
- `provider_import_runs_count` atteso ancora 0;
- `/admin/imports` read-only;
- provider/Apify/import spenti;
- Production non toccata.

## Gate obbligatorio prima di D.16 / prima real-call

Prima di qualunque real-call provider devono essere completati:

- scegliere provider definitivo;
- verificare manualmente prezzo;
- verificare manualmente rate limit;
- verificare manualmente licenza/caching/pubblicazione;
- confermare repository GitHub Private;
- confermare service role Supabase ruotata;
- confermare Vercel env limitate a Preview;
- creare token provider solo in env sicura;
- non committare token;
- non stampare token;
- una sola request;
- nessuna scrittura DB;
- nessun `import_enabled=true`;
- provider in `data_providers` ancora off;
- `realWritesEnabled=false`;
- `/admin/imports` read-only;
- `provider_import_runs_count = 0` prima della probe;
- Production non toccata.

## Prima probe futura

La prima probe reale dovrà essere un nuovo step separato.

Forma richiesta:

- script separato;
- endpoint candidate: standings o fixtures;
- `competition_slug=serie-a`;
- massimo 1 richiesta;
- timeout breve;
- output sanificato;
- solo shape summary;
- non stampare payload completo se contiene metadata sensibili;
- nessun dato salvato;
- nessuna scrittura DB;
- nessun import;
- nessun Apify.

Stop immediato se:

- token assente;
- token rischia di essere stampato;
- rate limit incerto;
- costo incerto;
- licenza incerta;
- endpoint non documentato;
- qualsiasi codice tenta DB write.

## Criteri di successo

- Risposta ricevuta.
- Payload comprensibile.
- Nessun token stampato.
- Nessuna scrittura DB.
- Costo/rate limit sotto controllo.
- Mapping possibile verso Supabase.
- Provider/import restano spenti.
- Production non toccata.

## Criteri di fallimento

- `401`/`403`.
- Rate limit o quota non chiara.
- Payload non documentato.
- Costo/licenza non chiari.
- Endpoint non adatto.
- Qualsiasi tentativo di scrittura DB.
- Qualsiasi tentativo di attivare provider/import.

## Prossimo step consigliato

Opzione A:

- D.16-A — verifica manuale provider/costi/licenze.

Opzione B:

- D.15-B — completare test utenti staging `free_user`/`editor` prima della probe reale.

## Conferme D.15

- Nessuna real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun db push/reset.
- Provider/Apify/import spenti.
- Production non toccata.

## D.16-A — Checklist manuale provider/costi/licenze

Documento aggiunto:

- `docs/provider_manual_verification_checklist_d16a.md`.

D.16-A non apre la probe reale: prepara solo la verifica manuale aggiornata di provider, prezzo, rate limit, licenza, caching, pubblicazione e copertura.

Decisione provvisoria:

- provider preferito provvisorio: `api_football`;
- alternativa: `the_stats_api`;
- scelta finale subordinata a verifica manuale su fonti ufficiali.

Gate aggiornato prima di D.16-B:

- provider scelto manualmente;
- prezzo/piano verificato;
- rate limit verificato;
- licenza/caching/pubblicazione verificati;
- endpoint scelto;
- token creato solo in env sicura, mai committato e mai stampato;
- GitHub repo Private confermato;
- service role Supabase ruotata/confermata;
- env Supabase solo Preview;
- provider ancora off;
- nessun `import_enabled=true`;
- `real_provider_probe_enabled=false` fino a conferma esplicita;
- `realWritesEnabled=false`;
- nessuna scrittura DB;
- Production non toccata.

Conferme D.16-A:

- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/Apify/import spenti.
