# D.16-A — Verifica manuale provider, costi e licenze

Stato: checklist manuale preparata, nessuna real-call eseguita.

Questa fase serve a scegliere in modo prudente tra `api_football` e `the_stats_api` prima di qualunque probe reale. Tutti i dati commerciali, legali e tecnici aggiornati devono essere verificati manualmente sui siti/documenti ufficiali dei provider: in D.16-A non viene fatta web search automatica, non vengono chiamate API e non vengono letti token.

## Confini di sicurezza

- Nessuna chiamata API-Football.
- Nessuna chiamata TheStatsAPI.
- Nessuna chiamata Apify.
- Nessuna chiamata SofaScore.
- Nessuno scraping.
- Nessuna fetch esterna.
- Nessun token letto o stampato.
- Nessuna scrittura DB.
- Nessun `db push/reset`.
- Nessun provider attivato.
- Nessun `import_enabled=true`.
- `real_provider_probe_enabled=false`.
- `realWritesEnabled=false`.
- Production non toccata.

## Decisione provvisoria

Provider preferito provvisorio:

- `api_football`

Motivo della preferenza provvisoria:

- è già indicato come candidato concreto per la futura probe read-only;
- è modellato nel progetto come provider candidato separato dal wrapper `stable_provider`;
- può essere confrontato con `the_stats_api` senza cambiare configurazione live.

Condizione:

- la preferenza resta provvisoria finché copertura, prezzo, rate limit, licenza, caching e possibilità di pubblicazione non sono verificati manualmente.

Alternativa:

- `the_stats_api`, da mantenere come opzione valida se copertura, costi, payload o termini risultano migliori.

## Checklist comparativa manuale

Compilare solo dopo verifica manuale su documentazione/siti ufficiali provider. Non inventare dati e non usare valori trovati in fonti non ufficiali senza conferma.

| Campo da verificare | API-Football | TheStatsAPI |
| --- | --- | --- |
| URL documentazione ufficiale verificata manualmente | da verificare manualmente | da verificare manualmente |
| Piano/prezzo necessario per staging | da verificare manualmente | da verificare manualmente |
| Costo stimato prima probe singola | da verificare manualmente | da verificare manualmente |
| Rate limit piano scelto | da verificare manualmente | da verificare manualmente |
| Limiti giornalieri/mensili | da verificare manualmente | da verificare manualmente |
| Copertura Serie A corrente | da verificare manualmente | da verificare manualmente |
| Calendario/fixtures Serie A | da verificare manualmente | da verificare manualmente |
| Risultati partite | da verificare manualmente | da verificare manualmente |
| Classifiche/standings | da verificare manualmente | da verificare manualmente |
| Statistiche squadre | da verificare manualmente | da verificare manualmente |
| Statistiche giocatori | da verificare manualmente | da verificare manualmente |
| Eventi partita | da verificare manualmente | da verificare manualmente |
| Storico stagioni supportato | da verificare manualmente | da verificare manualmente |
| Licenza pubblicazione su sito | da verificare manualmente | da verificare manualmente |
| Regole caching/storage | da verificare manualmente | da verificare manualmente |
| Obblighi attribuzione fonte | da verificare manualmente | da verificare manualmente |
| Endpoint più sicuro per prima probe | da verificare manualmente, preferenza `standings` o `fixtures` | da verificare manualmente, preferenza `standings` o `fixtures` |
| Auth richiesta | da verificare manualmente | da verificare manualmente |
| Formato payload | da verificare manualmente | da verificare manualmente |
| Gestione errori/rate-limit | da verificare manualmente | da verificare manualmente |
| Compatibilità con `provider_import_runs` | compatibile in teoria via `provider_key`, `batch_id`, `import_run_id`; da verificare su payload reale | compatibile in teoria via `provider_key`, `batch_id`, `import_run_id`; da verificare su payload reale |
| Compatibilità schema Supabase attuale | da verificare dopo payload sample read-only | da verificare dopo payload sample read-only |
| Rischi principali | prezzo/licenza/rate limit/payload da verificare | prezzo/licenza/rate limit/payload da verificare |
| Note operative | candidato provvisorio | alternativa |
| Esito | preferred provvisorio | alternative provvisoria |

## Gate prima di D.16-B

Non procedere con una vera probe finché tutti i punti seguenti non sono completati:

- provider scelto manualmente;
- prezzo/piano verificato;
- rate limit verificato;
- licenza, caching, storage e pubblicazione verificati;
- endpoint scelto e documentato;
- token creato solo se necessario e conservato in env sicura, mai committato;
- token non inserito in Production;
- token non stampato;
- repository GitHub confermato Private;
- service role Supabase ruotata/confermata dopo esposizione accidentale;
- Vercel env Supabase limitate a Preview, non Production/All;
- provider ancora disattivati in `data_providers`;
- nessun `import_enabled=true`;
- `real_provider_probe_enabled=false` fino a nuova autorizzazione esplicita;
- `realWritesEnabled=false`;
- nessuna scrittura DB;
- nessun insert in `provider_import_runs`;
- `/admin/imports` resta read-only;
- Production non toccata.

## Forma ammessa per D.16-B

D.16-B, se autorizzata, dovrà essere una probe separata:

- massimo una richiesta;
- solo locale o Preview staging;
- nessuna scrittura DB;
- nessun provider attivato;
- nessun import;
- nessun Apify;
- output sanificato;
- niente payload completo se contiene metadata o campi non ancora classificati;
- stop immediato su costo, licenza, auth o rate limit non chiari.

## Dati ancora da verificare manualmente

- Prezzo/piano effettivo.
- Rate limit effettivo.
- Copertura Serie A.
- Endpoint più sicuro per `fixtures` o `standings`.
- Possibilità di caching/storage.
- Possibilità di pubblicazione sul sito.
- Obblighi di attribuzione.
- Formato auth.
- Formato errori/rate limit.
- Compatibilità payload con mapper e schema Supabase.

## Conferme D.16-A

- Nessuna real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `db push/reset`.
- Provider/Apify/import spenti.
- Production non toccata.

## D.16-B — Decisione API-Football Free

Documento aggiunto:

- `docs/api_football_free_probe_plan_d16b.md`.

Decisione utente:

- usare `api_football` come provider scelto per la prima futura probe read-only;
- partire dal piano Free;
- mantenere `the_stats_api` come alternativa.

La scelta del piano Free serve solo a ridurre rischio economico e validare tecnicamente auth, endpoint e payload. Non abilita import, writer o attivazioni provider.

Prima di un eventuale piano a pagamento restano da confermare:

- probe riuscita;
- payload compatibile;
- rate limit chiari;
- licenza/caching/pubblicazione confermati;
- costi sostenibili;
- nessun problema di sicurezza.

D.16-B non esegue real-call e sposta l’eventuale prima richiesta reale a D.16-C, solo dopo conferma esplicita.
