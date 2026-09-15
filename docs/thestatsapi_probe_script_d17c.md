# D.17-C — Script TheStatsAPI probe gated

Stato: preparato localmente, default disabled, nessuna real-call.

## Obiettivo

Preparare lo script tecnico per una futura prima probe reale TheStatsAPI, mantenendolo completamente bloccato finché non vengono attivati esplicitamente i gate.

## Script

File:

- `scripts/provider/theStatsApiProbe.ts`

Comando:

```bash
npm run probe:thestatsapi:gated
```

## Comportamento default

Con configurazione safe/default:

- `THESTATSAPI_PROBE_ENABLED=false`;
- `REAL_PROVIDER_PROBE_ENABLED` non attivo;
- nessuna lettura token;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessuna attivazione provider/import.

Output atteso:

```text
mode=thestatsapi_probe
provider=the_stats_api
competition_slug=serie-a
enabled=false
blocked_reason=THESTATSAPI_PROBE_DISABLED
external_fetch=false
db_write=false
token_read=false
token_printed=false
requests_planned=1
requests_executed=0
```

## Gate futuri

La futura real-call può avvenire solo se entrambi i gate sono impostati a `true` in modo esplicito e temporaneo:

- `THESTATSAPI_PROBE_ENABLED=true`;
- `REAL_PROVIDER_PROBE_ENABLED=true`.

In assenza di questi flag, lo script si ferma prima di leggere `.env.local` e prima di qualsiasi fetch.

## Lettura env

Solo dopo gate attivi lo script può leggere in modo mirato:

- `THESTATSAPI_API_KEY`;
- `THESTATSAPI_BASE_URL`.

Non legge variabili Supabase, non carica env non necessarie e non usa `service_role`.

## Output sanificato

Anche nella futura modalità reale, lo script deve stampare solo:

- status HTTP;
- top-level keys;
- conteggio elementi;
- campi del primo item;
- compatibilità mapping teorica.

Vietato stampare:

- API key;
- prefisso/suffisso/hash/lunghezza della key;
- response completa;
- payload sensibili.

## Limiti

- Massimo 1 richiesta futura.
- Nessun retry.
- Nessun loop.
- Nessuna paginazione.
- Nessuna scrittura DB.
- Nessun import.
- Nessun provider attivato.
- Nessun Apify.
- Nessuna Production.

## Nota endpoint

Lo script contiene un endpoint candidato per calcio/standings, da confermare contro la documentazione ufficiale TheStatsAPI prima di qualunque real-call.

Se l'endpoint non è confermato o il piano/licenza non sono chiari, non attivare i gate.

## D.17-D — Checklist pre-real-call

Checklist dedicata:

- `docs/thestatsapi_pre_real_call_checklist_d17d.md`.

Audit statico confermato:

- endpoint candidato: `/football/standings`;
- metodo candidato: `GET`;
- header/auth candidato: `Authorization: Bearer <token>`;
- parametro candidato: `competition=serie-a`;
- endpoint ancora da confermare da documentazione/dashboard TheStatsAPI;
- nessuna real-call eseguita;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB.

## Prossimo step consigliato

D.17-E solo dopo conferma esplicita, endpoint verificato e gate abilitati temporaneamente per una sola richiesta read-only.
