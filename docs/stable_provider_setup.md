# Setup provider stabile

## Scopo

Il provider stabile è la fonte futura per le competizioni `full_official`, dove servono calendario, risultati, classifiche, squadre, giocatori, eventi e statistiche con aggiornamenti regolari. Il layer resta provider-agnostic: `StableFootballProvider` implementa il contratto comune e può scegliere TheStatsAPI oppure API-Football senza modificare gli importatori a valle.

## TheStatsAPI e API-Football

Entrambi sono soltanto candidati. In questo step non viene assunta una copertura o una struttura payload definitiva:

- `TheStatsApiProvider` contiene endpoint descrittivi placeholder e un punto di preparazione delle richieste;
- `ApiFootballProvider` contiene endpoint descrittivi placeholder coerenti con il possibile adapter futuro;
- nessuno dei due contiene un client HTTP o esegue `fetch`;
- prezzi, copertura, licenza, rate limit, SLA e diritti di redistribuzione devono essere confrontati prima della scelta.

## Flusso dati obbligatorio

```text
script server-side → StableFootballProvider → adapter → mapper → validazione → Supabase
Supabase → sito pubblico
```

Il sito pubblico legge solo Supabase. Non deve interrogare provider live lato utente: evita l'esposizione delle chiavi, rende prevedibili costi e rate limit, riduce la latenza e conserva l'ultimo dato valido se un provider è indisponibile.

## Stato sicuro attuale

`the_stats_api`, `api_football` e `stable_provider` restano disattivati in `config/providers.ts`. La configurazione runtime richiede contemporaneamente:

- provider attivo nel catalogo;
- credenziali dichiarate disponibili dal futuro bootstrap server-side;
- mapping approvati;
- rete abilitata esplicitamente.

In assenza di uno solo di questi requisiti, il wrapper usa `mockProvider` e allega un errore controllato. Gli adapter non leggono direttamente `process.env`, non stampano segreti, non usano la service role e non scrivono su Supabase.

## Variabili future

`.env.example` documenta:

```text
STABLE_PROVIDER_NAME=
STATSAPI_KEY=
STATSAPI_BASE_URL=
API_FOOTBALL_KEY=
API_FOOTBALL_BASE_URL=
```

Non usare il prefisso `NEXT_PUBLIC_`: chiavi, URL operativi e scelta del provider appartengono esclusivamente agli script server-side. I valori reali andranno inseriti in `.env.local` o nel secret manager del deploy, mai nei file versionati.

## Mapping degli ID esterni

Ogni provider assegna ID propri a competizioni, squadre, giocatori e partite. I tipi `ExternalCompetitionMapping`, `ExternalTeamMapping`, `ExternalPlayerMapping` ed `ExternalMatchMapping` collegano questi ID agli ID interni stabili.

I mapper accettano `unknown`, verificano soltanto un payload intermedio minimo e restituiscono `null` se mancano campi essenziali. Non inventano entità incomplete. Prima dell'attivazione serviranno mapper specifici per il payload reale scelto e una strategia di riconciliazione per trasferimenti, fusioni, cambi di nome e correzioni retroattive.

## Procedura futura di attivazione

1. Confrontare TheStatsAPI e API-Football su copertura FULL_OFFICIAL, qualità, licenza e costo.
2. Bloccare versione API ed endpoint reali.
3. Creare mapping e fixture di test da payload anonimizzati.
4. Implementare un transport server-side con timeout, retry limitato e usage logging.
5. Collegare gli script di import a Supabase con upsert idempotenti.
6. Testare budget, fallback e conservazione dell'ultimo snapshot valido in staging.
7. Solo dopo i test, attivare un provider in `config/providers.ts` e configurare i segreti.

## Non implementato

Nessuna chiamata reale, credenziale, dipendenza aggiuntiva, importazione, scrittura database, dashboard o collegamento Supabase è presente in questo step.
