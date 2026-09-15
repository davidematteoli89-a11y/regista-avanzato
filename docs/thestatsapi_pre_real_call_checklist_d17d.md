# D.17-D — Checklist pre-real-call TheStatsAPI

Stato: checklist preparata, nessuna real-call.

## Decisione

- La prima real-call futura dovrà usare TheStatsAPI, non API-Football.
- API-Football resta sospeso dopo il tentativo R1 con HTTP `403`; nessun retry previsto.
- Apify resta separato per eventuali campionati minori e resta spento.
- Provider/import restano spenti.
- `realWritesEnabled=false` resta il default.
- Production non è stata toccata.

## Audit statico script TheStatsAPI

Script:

- `scripts/provider/theStatsApiProbe.ts`.

Comando:

```bash
npm run probe:thestatsapi:gated
```

Comportamento verificato in modalità disabled:

- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_planned=1`;
- `requests_executed=0`.

Dettagli tecnici previsti per una futura real-call, da confermare prima di abilitarla:

- base URL: letta solo da `THESTATSAPI_BASE_URL` dopo gate attivi;
- endpoint candidato nello script: `/football/standings`;
- metodo HTTP candidato: `GET`;
- auth/header candidato: `Authorization: Bearer <token>`;
- parametro candidato: `competition=serie-a`;
- hard limit: una sola richiesta;
- nessun retry;
- nessun loop;
- nessuna paginazione;
- nessun Supabase client;
- nessun Supabase admin client;
- nessun `service_role`;
- nessun DB writer;
- output sanificato;
- token non stampabile;
- response completa non stampabile.

## Endpoint candidato

L'endpoint TheStatsAPI non è ancora confermato come definitivo.

Non procedere a D.17-E finché endpoint, auth/header e parametri non sono verificati da documentazione/dashboard TheStatsAPI.

Endpoint semplici/read-only preferibili per la prima prova:

- competitions/leagues;
- fixtures;
- standings;
- team/competition metadata.

Da evitare nella prima prova:

- endpoint pesanti;
- endpoint storici massivi;
- endpoint paginati;
- endpoint che richiedono più di una request;
- qualunque endpoint con costo/licenza/rate limit non chiari.

## Checklist obbligatoria prima di D.17-E

### 1. Key sicurezza

- [ ] Key TheStatsAPI inserita solo in `.env.local`.
- [ ] Key non incollata in chat.
- [ ] Key non stampata.
- [ ] Key non committata.
- [ ] Key non documentata.
- [ ] Nessun prefisso/suffisso/hash/lunghezza della key stampato o documentato.

### 2. Env locali

- [ ] `.env.local` ignorato da Git.
- [ ] `.env.local` non staged.
- [ ] `THESTATSAPI_API_KEY` presente solo localmente.
- [ ] `THESTATSAPI_BASE_URL` presente.
- [ ] `THESTATSAPI_PROBE_ENABLED=false` fino al momento esatto della probe.
- [ ] `REAL_PROVIDER_PROBE_ENABLED=false` fino al momento esatto della probe.

### 3. Gate script

- [ ] Script separato dagli import.
- [ ] Script non usa writer DB.
- [ ] Script non usa Supabase client admin.
- [ ] Script non usa `service_role`.
- [ ] Massimo 1 richiesta.
- [ ] Output sanificato.
- [ ] Token non stampabile.
- [ ] Response completa non stampata.
- [ ] Summary consentito solo per status, counts, top-level keys e mapping teorico.

### 4. Endpoint

- [ ] Endpoint confermato da docs/dashboard TheStatsAPI.
- [ ] Base URL confermata.
- [ ] Header/auth confermati.
- [ ] Parametri confermati.
- [ ] Nessun endpoint paginato o pesante.
- [ ] Nessuna richiesta storica massiva.

### 5. DB/Supabase

- [ ] Nessuna scrittura DB.
- [ ] Nessun insert/update/delete/upsert.
- [ ] Nessun write su `provider_import_runs`.
- [ ] Nessun write su `api_usage_logs`.
- [ ] Nessun write su `provider_import_logs`.
- [ ] Nessun write su `import_logs`.
- [ ] Provider/import ancora spenti.
- [ ] `realWritesEnabled=false`.

### 6. Ambiti vietati

- [ ] Nessun retry API-Football.
- [ ] Nessun Apify.
- [ ] Nessun SofaScore.
- [ ] Nessuno scraping.
- [ ] Nessun deploy.
- [ ] Nessuna Vercel Production.
- [ ] Nessuna env Production.
- [ ] Nessuna provider activation.
- [ ] Nessuna import activation.

### 7. Limite richiesta

- [ ] Max 1 request.
- [ ] Nessun retry automatico.
- [ ] Nessun loop.
- [ ] Nessuna paginazione.
- [ ] Nessuna fetch multipla.
- [ ] Nessuna chiamata lato utente.

### 8. Criteri successo D.17-E

- [ ] HTTP status leggibile.
- [ ] Payload ricevuto o errore sanificato.
- [ ] Campi top-level elencabili.
- [ ] Count elementi principali calcolabile, se presente.
- [ ] Mapping teorico verso Supabase valutabile.
- [ ] `token_printed=false`.
- [ ] `db_write=false`.
- [ ] `requests_executed=1` massimo.

### 9. Criteri stop/fallimento

Stop immediato se:

- key assente;
- errore `401`/`403`;
- rate limit non chiaro;
- endpoint non confermato;
- payload inatteso;
- script tenta fetch multipla;
- script tenta DB write;
- script stampa token o parti di token;
- qualunque dubbio su Production/env.

## Conferme D.17-D

- Nessuna real-call TheStatsAPI.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## Prossimo step consigliato

D.17-E potrà essere aperta solo con conferma esplicita dell'utente, endpoint confermato e gate temporanei abilitati per una sola richiesta read-only.
