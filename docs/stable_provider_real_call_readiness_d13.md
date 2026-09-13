# D.13 — Stable provider real-call readiness plan

## Stato

D.13 prepara il piano di readiness per una futura prima chiamata reale read-only a un provider stabile, senza eseguire chiamate reali.

Stato operativo:

- branch `preview`;
- D.12-B chiuso e committato;
- test ruoli `free_user`/`editor` pianificati ma non ancora eseguiti;
- `provider_import_runs` presente su staging;
- `/admin/imports` read-only funzionante;
- provider reali spenti;
- TheStatsAPI spento;
- API-Football spento;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- `write_attempt_blocked=true`;
- Production non toccata.

## Audit adapter/provider esistenti

File e aree analizzate:

- `config/providers.ts`;
- `config/competitions.ts`;
- `lib/provider/*`;
- `lib/import/*`;
- `scripts/provider/*`;
- `package.json`;
- documentazione provider/readiness esistente.

Risultati:

- `stable_provider` esiste come wrapper/alias astratto e resta `active=false`;
- `the_stats_api` esiste come provider candidato in config e resta `active=false`;
- `api_football` esiste come provider candidato in config e resta `active=false`;
- non esistono adapter real-call dedicati a TheStatsAPI;
- non esistono adapter real-call dedicati ad API-Football;
- non esistono script che facciano fetch esterne provider;
- gli script `audit:providers`, `dry-run:stable-provider`, `dry-run:provider-logging` e `dry-run:provider-writer-guards` usano solo file locali;
- `lib/provider/providerWriteGuards.ts` mantiene `realWritesEnabled=false`;
- `lib/provider/providerImportWriter.ts` produce preview/log shape senza scrivere DB;
- `lib/import/importGuards.ts` blocca scritture Supabase, provider reali, Apify, scraping live e download video.

## Dove inserire una futura real-call

La prima real-call non deve essere inserita in UI, pagine pubbliche o admin action.

Punto di ingresso consigliato:

- nuovo script separato, ad esempio `scripts/provider/realCallStableProviderProbe.ts`;
- esecuzione locale/manuale controllata;
- nessun import DB;
- massimo una richiesta;
- output console sanificato;
- token letto solo da env locale sicuro, mai stampato;
- `realWritesEnabled=false`;
- nessun uso service role.

Il codice import/writer reale deve restare separato dalla probe read-only.

## Variabili env future, solo nomi

Nomi possibili, da confermare quando si sceglie il provider:

- `THE_STATS_API_KEY`;
- `THE_STATS_API_BASE_URL`;
- `API_FOOTBALL_KEY`;
- `API_FOOTBALL_BASE_URL`;
- eventuale `PROVIDER_REAL_CALL_ENABLED`, default `false`.

Questi nomi sono solo placeholder progettuali. D.13 non legge env e non definisce valori.

## Confronto provider candidati

Non è stata eseguita web search automatica e non sono state chiamate API. Prezzi, rate limit, licenze e copertura aggiornata devono essere verificati manualmente prima della scelta finale.

| Criterio | TheStatsAPI | API-Football |
| --- | --- | --- |
| Copertura Serie A | Da verificare manualmente | Probabile candidato forte, ma da verificare manualmente |
| Fixtures/results | Da verificare | Da verificare |
| Standings | Da verificare | Da verificare |
| Team/player stats | Da verificare | Da verificare |
| Rate limit | Non noto localmente | Non noto localmente |
| Costo mensile | Non noto localmente | Non noto localmente |
| Documentazione API | Da verificare | Da verificare |
| Semplicità adapter | Da stimare dopo lettura docs | Da stimare dopo lettura docs |
| Affidabilità/SLA | Da verificare | Da verificare |
| Lock-in | Da valutare su schema payload | Da valutare su schema payload |
| Compatibilità Supabase | Buona se payload mappa su teams/matches/standings | Buona se payload mappa su teams/matches/standings |
| Compatibilità `provider_import_runs` | Compatibile tramite `provider_key`, `batch_id`, `import_run_id` | Compatibile tramite `provider_key`, `batch_id`, `import_run_id` |
| Dry-run read-only | Possibile con script probe separato | Possibile con script probe separato |
| Error/rate-limit logging | Da modellare in output sanificato | Da modellare in output sanificato |
| Log costi | Richiede costo per richiesta/piano noto | Richiede costo per richiesta/piano noto |

Provider preferito provvisorio:

- `api_football`, solo provvisoriamente, perché è già modellato come candidato ufficiale, ha nome specifico in config e può essere usato come adapter concreto dietro `stable_provider`.

Provider alternativo:

- `the_stats_api`, da mantenere come fallback se copertura, costi o termini risultano migliori.

Questa preferenza non autorizza alcuna chiamata reale.

## Dati mancanti prima della scelta finale

Da verificare manualmente:

- copertura Serie A corrente;
- endpoint disponibili per fixtures, results, standings, team stats e player stats;
- formato payload e identificatori esterni;
- rate limit;
- costo mensile e costo per richiesta;
- licenza di pubblicazione e caching dei dati;
- SLA/affidabilità;
- limiti su dati storici;
- policy retry/backoff;
- modalità corretta di autenticazione;
- eventuali restrizioni su Preview/staging.

## Piano prima real-call futura

Procedura futura, non eseguita in D.13:

1. Confermare provider scelto.
2. Confermare repo GitHub Private.
3. Confermare service role Supabase ruotata e non usata nel probe.
4. Salvare token provider solo in env locale/Preview sicuro, mai Production.
5. Creare script probe separato, senza import writer.
6. Limitare la probe a `competition_slug=serie-a`.
7. Usare endpoint meno rischioso: standings oppure fixtures, preferendo standings se documentazione e costo sono chiari.
8. Eseguire massimo una richiesta.
9. Timeout breve.
10. Nessuna scrittura DB.
11. Nessun `provider_import_runs` insert.
12. Nessun frontend pubblico.
13. Nessuna chiamata lato utente.
14. Output console sanificato:
    - status HTTP;
    - numero elementi;
    - chiavi top-level;
    - esempi ridotti senza token;
    - nessuna risposta completa se contiene metadata sensibili.
15. Scrivere solo log preview in console, non DB.
16. Fermarsi dopo la prima risposta.

## Criteri di successo

- una sola richiesta effettuata;
- risposta valida;
- token non stampato;
- costo/rate limit rispettato;
- payload mappabile almeno a una delle entità:
  - standings;
  - fixtures/matches;
  - teams;
- nessuna scrittura DB;
- provider/import restano spenti nel database;
- Production non toccata.

## Criteri di fallimento e stop

Fermarsi se:

- endpoint/costo/rate limit non sono chiari;
- autenticazione fallisce;
- provider risponde errore;
- risposta contiene dati non previsti o troppo ampia;
- payload non è mappabile;
- compare rischio di licenza/pubblicazione;
- script tenta più di una richiesta;
- qualunque parte tenta scrittura DB;
- qualunque token viene stampato.

## Checklist obbligatoria prima della real-call

Prima di qualunque real-call devono essere veri:

- repo GitHub confermato Private;
- service role key Supabase già esposta ruotata/rigenerata;
- env Supabase Vercel limitate a Preview, non Production/All;
- token provider salvato solo in env locale sicuro o Preview dedicata, mai committato;
- `.env.local` ignorato e mai stampato;
- script real-call separato da script import;
- real-call limitata a una sola richiesta;
- nessuna scrittura DB;
- nessun provider attivato in `data_providers`;
- nessun `import_enabled=true`;
- `realWritesEnabled=false`;
- `/admin/imports` resta read-only;
- Apify ancora off;
- Production non toccata;
- decidere se completare test ruoli `free_user`/`editor` prima della probe;
- piano rollback documentato anche se la probe è read-only.

## Prossimo step consigliato

D.14 — scegliere il provider candidato dopo verifica manuale di documentazione, prezzi, rate limit e licenza, poi preparare uno script probe read-only non eseguito.

In alternativa, completare prima D.12-C con utenti staging `free_user`/`editor`.

## Conferme D.13

- Nessuna chiamata provider reale.
- Nessuna fetch esterna.
- Nessun token letto o stampato.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun `db push/reset`.
- Provider/Apify/import non attivati.
- Production non toccata.

## D.14-A — Probe provider disabilitata

Preparato lo script:

- `scripts/provider/disabledStableProviderProbe.ts`.

Comando:

```bash
npm run probe:stable-provider:disabled
```

La probe resta disabilitata:

- provider provvisorio: `api_football`;
- alternativa: `the_stats_api`;
- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- `provider_activated=false`;
- `import_enabled=false`;
- blocco atteso: `REAL_PROVIDER_PROBE_DISABLED`.

D.14-A non esegue nessuna real-call e non legge token.
