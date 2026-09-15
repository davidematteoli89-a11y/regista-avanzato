# D.16-C2-C — Checklist finale pre-real-call API-Football

Stato: checklist finale preparata, nessuna real-call eseguita.

Questa fase chiude il gate documentale prima della prima vera chiamata API-Football Free. Non legge token, non stampa chiavi, non chiama provider e non scrive nel database.

## Decisione

- Prima real-call futura: API-Football Free.
- Endpoint consigliato per D.16-C3: standings Serie A.
- Motivo: payload più semplice, stabile e utile per verificare il mapping verso classifiche/Supabase.
- Endpoint alternativo: fixtures Serie A, solo se standings non è disponibile nel piano Free o non è adatto.

## Checklist obbligatoria prima di D.16-C3

La real-call D.16-C3 può partire solo se tutti i punti seguenti sono confermati.

### 1. Key sicurezza

- [ ] Key incollata in chat considerata esposta.
- [ ] Key esposta rigenerata/ruotata manualmente.
- [ ] Nuova key inserita solo in `.env.local`.
- [ ] Nuova key non incollata in chat.
- [ ] Nuova key non stampata.
- [ ] Nuova key non committata.
- [ ] Nuova key non documentata.

### 2. Env locali

- [ ] `.env.local` ignorato da Git.
- [ ] `API_FOOTBALL_API_KEY` presente solo localmente.
- [ ] `API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io` verificato localmente senza stampare valori.
- [ ] `API_FOOTBALL_PROBE_ENABLED=false` fino al momento esatto della probe.
- [ ] `REAL_PROVIDER_PROBE_ENABLED=false` fino al momento esatto della probe, se usato dallo script.

### 3. Gate script

- [ ] Script separato dagli import.
- [ ] Script non usa writer DB.
- [ ] Script non usa Supabase client admin.
- [ ] Script non usa service role.
- [ ] Massimo 1 richiesta.
- [ ] Output sanificato.
- [ ] Token non stampabile.
- [ ] Response completa non stampata.
- [ ] Solo summary: status, count, campi top-level, mapping teorico.

### 4. DB/Supabase

- [ ] Nessuna scrittura DB.
- [ ] Nessun insert/update/delete/upsert.
- [ ] Nessun write su `provider_import_runs`.
- [ ] Nessun write su `api_usage_logs`.
- [ ] Nessun write su `provider_import_logs`.
- [ ] Nessun write su `import_logs`.
- [ ] Provider/import ancora spenti.
- [ ] `realWritesEnabled=false`.

### 5. Ambiti vietati

- [ ] No Apify.
- [ ] No SofaScore.
- [ ] No TheStatsAPI.
- [ ] No scraping.
- [ ] No deploy.
- [ ] No Vercel Production.
- [ ] No Vercel env Production.
- [ ] No provider activation.
- [ ] No import activation.

### 6. Limite richiesta

- [ ] Max 1 request.
- [ ] Niente retry automatici.
- [ ] Niente loop.
- [ ] Niente paginazione.
- [ ] Niente fetch multiple.
- [ ] Niente chiamate lato utente.

### 7. Criteri successo D.16-C3

- [ ] HTTP status leggibile.
- [ ] Payload ricevuto.
- [ ] Count elementi principali calcolabile.
- [ ] Campi top-level elencati.
- [ ] Mapping teorico verso Supabase valutabile.
- [ ] Quota/costo sotto controllo.
- [ ] `token_printed=false`.
- [ ] `db_write=false`.
- [ ] `requests_executed=1` massimo.

### 8. Criteri stop/fallimento

- [ ] Key assente.
- [ ] Key non ruotata.
- [ ] Errore `401`/`403`.
- [ ] Rate limit.
- [ ] Payload inatteso.
- [ ] Script tenta fetch multipla.
- [ ] Script tenta DB write.
- [ ] Script stampa token o parti di token.
- [ ] Qualunque dubbio su Production/env.

## Stato verificato in D.16-C2-C

- `npm run probe:api-football:gated` eseguito solo in modalità disabled.
- `enabled=false`.
- `blocked_reason=API_FOOTBALL_PROBE_DISABLED`.
- `external_fetch=false`.
- `db_write=false`.
- `token_read=false`.
- `token_printed=false`.
- `requests_executed=0`.
- API-Football off.
- TheStatsAPI off.
- Apify off.
- Import off.
- `realWritesEnabled=false`.
- `write_attempt_blocked=true`.

## Conferme

- Nessuna real-call provider.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun service role usato.
- Nessun `db push/reset`.
- Provider/Apify/import spenti.
- Production non toccata.

## Prossimo step consigliato

D.16-C3 — prima real-call API-Football Free su standings Serie A, solo dopo conferma esplicita, key rigenerata e gate completato.

## D.16-C3 — Esito prima esecuzione controllata

La prima esecuzione controllata è stata bloccata prima della richiesta reale.

Risultato:

- `requests_executed=0`;
- `error=API_FOOTBALL_API_KEY_MISSING`;
- nessuna fetch completata;
- nessun token stampato;
- nessun payload completo stampato;
- nessuna scrittura DB.

Nota importante:

- la key non deve essere letta/caricata da `.env.local` da Codex;
- per una futura riprova, la key deve essere disponibile nel process environment in modo sicuro e senza essere stampata.

## D.16-C3-R1 — Checklist retry eseguita

La riprova ha autorizzato una lettura mirata da `.env.local` limitata a:

- `API_FOOTBALL_API_KEY`;
- `API_FOOTBALL_BASE_URL`.

La lettura avviene solo dopo gate attivi. Con gate default false resta confermato:

- `enabled=false`;
- `blocked_reason=API_FOOTBALL_PROBE_DISABLED`;
- `token_read=false`;
- `requests_executed=0`.

La real-call R1 ha eseguito una sola richiesta:

- endpoint: standings Serie A;
- `http_status=403`;
- `api_errors_count=2`;
- `requests_executed=1`;
- `token_printed=false`;
- `db_write=false`;
- nessuna response completa stampata.

La fase non autorizza retry automatici o seconda richiesta.

## D.16-C3-R2 — Checklist retry 403

Checklist dettagliata creata:

- `docs/api_football_403_retry_readiness_d16c3r2.md`.

Prima di un eventuale R2 verificare manualmente:

- account/email confermati;
- piano Free attivo;
- API Football v3 abilitata;
- key corretta e non esposta;
- eventuali restrizioni IP/domain;
- header `x-apisports-key`;
- base URL `https://v3.football.api-sports.io`;
- endpoint `/standings`;
- parametri `league=135`, `season=2026`;
- massimo una richiesta;
- nessun retry;
- nessun DB write;
- nessun import;
- nessun deploy;
- Production esclusa.

D.16-C3-R2 non esegue fetch e non legge/stampa token.
