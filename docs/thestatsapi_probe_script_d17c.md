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

- endpoint candidato iniziale: `/football/standings`;
- metodo candidato: `GET`;
- header/auth candidato: `Authorization: Bearer <token>`;
- parametro candidato: `competition=serie-a`;
- endpoint ancora da confermare da documentazione/dashboard TheStatsAPI;
- nessuna real-call eseguita;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB.

## D.17-E0 — Endpoint aggiornato da documentazione

La verifica documentale D.17-E0 ha aggiornato lo script al candidato documentato per Serie A standings:

- `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`;
- base URL `https://api.thestatsapi.com/api`;
- auth `Authorization: Bearer <token>`;
- header `Accept: application/json`.

Lo script resta disabled di default e non ha eseguito real-call.

## Prossimo step consigliato

D.17-E solo dopo conferma esplicita, endpoint verificato e gate abilitati temporaneamente per una sola richiesta read-only.

## D.17-E/F — Probe reale controllata

Lo script è stato aggiornato per due target massimi:

1. `/football/competitions`;
2. `/football/competitions/comp_5840/seasons/sn_6199313/standings`, solo se il primo target riesce.

Esito:

- target 1 HTTP `404`;
- `requests_executed=1`;
- target 2 non eseguito;
- `stopped_after=competitions_error`;
- nessun token stampato;
- nessun DB write.

## D.17-G — Fix URL composition

Lo script ora usa `joinUrl(baseUrl, endpoint)` invece di `new URL(endpoint, baseUrl)` per preservare il segmento `/api` del base URL.

Output disabled sanificato aggiunto:

- `base_url_shape`;
- `competitions_path`;
- `competitions_url_shape`;
- `standings_path`;
- `standings_url_shape`;
- `possible_double_api`;
- `possible_double_slash`.

Nessuna nuova real-call eseguita.

## D.17-H — Script limitato a competitions

Lo script è stato reso compatibile con D.17-H:

- `THESTATSAPI_PROBE_TARGET=competitions`;
- `requests_planned=1`;
- hard stop a una sola fetch;
- standings non eseguito in questa fase;
- output solo summary sanificato;
- nessun token, header completo o payload completo stampato.

Risultato real-call D.17-H:

- `requests_executed=1`;
- `http_status=403`;
- `token_read=true`;
- `token_printed=false`;
- `db_write=false`.

## D.17-J — Audit statico script

Audit statico completato senza fetch.

Confermato:

- doppio gate richiesto;
- token letto solo dopo gate;
- token non stampato;
- `requests_planned=1`;
- target `competitions`;
- standings non eseguito in questa fase;
- nessun retry/loop/paginazione;
- nessun Supabase client;
- nessun `service_role`;
- nessun DB writer;
- output sanificato.

## D.17-K — Implicazione per lo script

La verifica documentale pubblica indica che lo script potrebbe dover supportare anche:

- `THESTATSAPI_BASE_URL=https://stats-api.com/api/v1`;
- endpoint competitions con query opzionale `limit=10`.

Nessuna modifica codice è stata applicata in D.17-K.
Qualunque aggiornamento deve avvenire in uno step separato, con probe default disabled e senza real-call.
