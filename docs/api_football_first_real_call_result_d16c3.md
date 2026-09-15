# D.16-C3 — Prima real-call API-Football Free controllata

Stato: bloccata prima della richiesta reale.

Data/ora locale prova: 2026-09-15 13:13:32 CEST.

## Esito

La prima real-call API-Football Free non è stata eseguita.

Il comando è stato avviato con i gate temporanei abilitati, ma lo script si è fermato prima di qualsiasi fetch perché la API key non era disponibile nel process environment ereditato.

Output sanificato registrato:

```text
mode=api_football_probe
enabled=true
external_fetch=unknown
db_write=false
token_printed=false
requests_planned=1
requests_executed=0
error=API_FOOTBALL_API_KEY_MISSING
output_sanitized=true
```

## Endpoint previsto

- Provider: API-Football Free.
- Endpoint previsto: standings Serie A.
- Richieste pianificate: 1.
- Richieste eseguite: 0.

## Motivo blocco

La key è stata dichiarata dall'utente come rigenerata e presente in `.env.local`, ma la regola di sicurezza della fase impedisce a Codex di leggere/caricare `.env.local`.

Lo script legge solo variabili già disponibili nel process environment e non carica file env locali. Questa scelta evita di trattare direttamente valori segreti durante la sessione Codex.

## Sicurezza confermata

- Nessuna real-call provider completata.
- Nessuna fetch provider completata.
- Nessuna response completa stampata.
- Nessun payload completo salvato.
- Nessun token stampato.
- Nessuna API key copiata nei docs.
- Nessuna scrittura DB.
- Nessun write su `provider_import_runs`.
- Nessun write su `api_usage_logs`.
- Nessun write su `provider_import_logs`.
- Nessun write su `import_logs`.
- Nessun `service_role` usato.
- Nessun `db push/reset`.
- Provider/import ancora spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

## D.16-C3-R2 — Readiness retry 403

Documento creato:

- `docs/api_football_403_retry_readiness_d16c3r2.md`.

Esito:

- nessuna seconda real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB.

La fase analizza solo il `403` ricevuto in R1 e prepara una checklist manuale prima di un eventuale R2.

Audit script:

- base URL default: `https://v3.football.api-sports.io`;
- endpoint: `/standings`;
- parametri: `league=135`, `season=2026`;
- header: `x-apisports-key`;
- una sola `fetch`;
- nessun retry/loop/paginazione;
- nessun Supabase client;
- nessun `service_role`;
- nessun writer DB.

Prima di un eventuale retry, verificare manualmente account, piano Free, API Football v3, restrizioni IP/domain, quota e abilitazione endpoint.

## Script safety update

Prima della chiamata, lo script `scripts/provider/apiFootballProbe.ts` è stato allineato al report richiesto da D.16-C3:

- endpoint esplicito `standings`;
- plan esplicito `free`;
- output `token_read=true` solo nella modalità in cui la key viene letta;
- conteggio errori API sanificato;
- conteggio gruppi/righe standings;
- lista campi campione solo per nome campo, non payload;
- `mapping_theoretical_possible` derivato dai conteggi.

Lo script resta senza Supabase client, senza writer DB, senza service role, senza retry, senza loop e senza paginazione.

## Prossimo passo sicuro

Per completare davvero D.16-C3 senza leggere `.env.local`, eseguire una nuova prova solo quando la key è resa disponibile al processo in modo sicuro, ad esempio da una shell locale dell'utente con variabili già esportate, senza stamparne il valore.

La real-call deve restare:

- una sola richiesta;
- solo API-Football;
- solo standings Serie A;
- output sanificato;
- nessuna scrittura DB;
- nessun import;
- nessun deploy;
- nessuna Production.

## D.16-C3-R1 — Retry con lettura mirata da `.env.local`

Data/ora locale retry: 2026-09-15 15:25:00 CEST.

### Correzione applicata allo script

Lo script è stato corretto per leggere in modo mirato da `.env.local` solo quando entrambi i gate sono già attivi:

- `API_FOOTBALL_PROBE_ENABLED=true`;
- `REAL_PROVIDER_PROBE_ENABLED=true`.

La lettura locale è limitata a due soli nomi:

- `API_FOOTBALL_API_KEY`;
- `API_FOOTBALL_BASE_URL`.

Tutte le altre variabili vengono ignorate. Non vengono caricati valori Supabase, non viene usato `dotenv` generico e non vengono stampati valore, prefisso, suffisso, hash o lunghezza della key.

### Verifica disabled dopo fix

Con flag default false:

```text
enabled=false
blocked_reason=API_FOOTBALL_PROBE_DISABLED
external_fetch=false
db_write=false
token_read=false
token_printed=false
requests_executed=0
```

La key non viene letta quando i gate sono false.

### Esito real-call controllata

La real-call è stata eseguita una sola volta verso API-Football, endpoint standings Serie A.

Output sanificato:

```text
mode=api_football_probe
provider=api_football
plan=free
endpoint=standings
competition=serie-a
enabled=true
external_fetch=true
db_write=false
token_read=true
token_printed=false
requests_planned=1
requests_executed=1
http_status=403
api_errors_count=2
response_top_level_keys=get,parameters,errors,results,paging,response
response_items_count=0
response_entry_keys=none
standings_groups_count=0
standings_rows_count=0
sample_fields_only=none
mapping_theoretical_possible=false
output_sanitized=true
provider_activated=false
import_enabled=false
warnings=0
production=false
```

### Interpretazione

La richiesta ha raggiunto API-Football, ma la risposta HTTP è `403`.

La risposta non viene salvata integralmente e non viene stampato il payload completo. Con `standings_rows_count=0`, il mapping teorico verso Supabase non è valutabile in questa prova.

Possibili cause da verificare manualmente nel pannello/API-Football senza condividere token:

- piano Free non abilitato per l'endpoint/league/season scelti;
- key non autorizzata sul provider o account non attivo;
- quota/permessi del piano;
- base URL/header da confermare con la documentazione provider.

Non riprovare automaticamente: qualunque retry deve essere una nuova fase autorizzata.

### Conferme sicurezza R1

- Una sola richiesta eseguita.
- Nessun retry.
- Nessun loop.
- Nessuna paginazione.
- Nessuna seconda richiesta.
- Nessun token stampato.
- Nessun payload completo stampato.
- Nessuna scrittura DB.
- Nessun `service_role` usato.
- Nessun `db push/reset`.
- Provider/import ancora spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.
