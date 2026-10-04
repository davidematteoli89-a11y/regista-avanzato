# D.16-C2-B — Script probe API-Football gated

Stato: script preparato, non eseguito.

D.16-C2-B introduce lo script tecnico per una futura prima probe reale API-Football, ma lo lascia bloccato di default. Questa fase non esegue chiamate esterne, non legge/stampa token e non scrive nel database.

## File creati/modificati

- `scripts/provider/apiFootballProbe.ts`;
- `package.json`.

Comando preparato:

```bash
npm run probe:api-football:gated
```

Nota: il comando non è stato eseguito in D.16-C2-B.

## Gate dello script

Lo script può procedere verso una futura real-call solo se entrambi i gate sono esplicitamente veri:

- `API_FOOTBALL_PROBE_ENABLED=true`;
- `REAL_PROVIDER_PROBE_ENABLED=true`.

Con i default attuali:

- `API_FOOTBALL_PROBE_ENABLED=false`;
- `real_provider_probe_enabled=false`;
- nessuna fetch viene eseguita;
- nessuna key viene letta;
- nessuna scrittura DB viene tentata.

## Output disabled previsto

Quando bloccato, lo script deve fermarsi subito e produrre solo output sanificato:

```text
mode=api_football_probe
enabled=false
blocked_reason=API_FOOTBALL_PROBE_DISABLED
external_fetch=false
db_write=false
token_read=false
token_printed=false
requests_planned=1
requests_executed=0
```

## Futura probe, non eseguita ora

La futura real-call, se autorizzata in una fase separata, dovrà essere:

- provider: `api_football`;
- competizione: `serie-a`;
- endpoint candidato: `standings` oppure `fixtures`;
- richieste massime: 1;
- modalità: read-only;
- output: summary sanificato;
- nessun payload completo stampato se contiene metadata non classificati;
- nessuna scrittura DB;
- nessun insert in `provider_import_runs`;
- nessun import;
- nessuna attivazione provider;
- nessun Apify;
- Production esclusa.

## Sicurezza token

- La API key incollata accidentalmente in chat resta considerata esposta.
- Non copiarla.
- Non usarla.
- Non inserirla nei docs.
- Non stamparla.
- Prima di qualunque real-call futura, rigenerare/ruotare la key e sostituirla manualmente in `.env.local`.
- La key futura non deve essere inserita in Production.

Lo script, nella modalità disabled, non legge `API_FOOTBALL_API_KEY`.

In una futura modalità abilitata, lo script potrà verificare solo presenza/assenza della key e non dovrà stampare valore, lunghezza, prefisso, suffisso, hash o porzioni della key.

## Cosa non viene fatto in D.16-C2-B

- Nessuna esecuzione dello script reale.
- Nessuna chiamata API-Football.
- Nessuna chiamata TheStatsAPI.
- Nessuna chiamata Apify/SofaScore.
- Nessuna fetch provider.
- Nessuno scraping.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `db push/reset`.
- Nessun provider/import attivato.
- Nessun bottone UI aggiunto.
- Nessun deploy.
- Production non toccata.

## Prossimo step consigliato

D.16-C2-C — eseguire solo la modalità disabled dello script per verificare l’output di blocco, ancora senza real-call.

Solo dopo, una D.16-C3 separata potrà valutare una singola real-call, con conferma esplicita e key rigenerata.

## D.16-C2-C — Checklist finale pre-real-call

Documento aggiunto:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Endpoint consigliato per D.16-C3:

- standings Serie A.

Motivo:

- payload più semplice e stabile;
- utile per verificare mapping verso classifiche/Supabase;
- minore rischio rispetto a endpoint più ampi.

La real-call resta non autorizzata:

- `enabled=false`;
- `blocked_reason=API_FOOTBALL_PROBE_DISABLED`;
- `requests_executed=0`;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB.

## D.16-C3 — Tentativo real-call bloccato prima della fetch

Documento risultato:

- `docs/api_football_first_real_call_result_d16c3.md`.

Esito:

- comando avviato con gate temporanei abilitati;
- real-call non eseguita;
- `requests_executed=0`;
- blocco sanificato: `API_FOOTBALL_API_KEY_MISSING`;
- nessuna key stampata;
- nessuna response completa stampata;
- nessuna scrittura DB;
- provider/import ancora spenti.

Motivo:

- la key è presente solo in `.env.local`, ma la fase vieta a Codex di leggere/caricare `.env.local`;
- lo script legge solo variabili già disponibili nel process environment.

Aggiornamento sicurezza script:

- output futuro allineato a D.16-C3 con `endpoint=standings`, `plan=free`, `api_errors_count`, conteggi standings e campi campione solo per nome campo;
- nessun Supabase client;
- nessun writer DB;
- nessun service role;
- nessun retry/loop/paginazione.

## D.16-C3-R1 — Lettura mirata `.env.local` e prima risposta provider

Lo script è stato aggiornato per supportare una lettura locale mirata, solo dopo gate attivi, senza usare `dotenv` generico.

Variabili consentite dalla lettura mirata:

- `API_FOOTBALL_API_KEY`;
- `API_FOOTBALL_BASE_URL`.

Comportamento:

- se i gate sono false, la key non viene letta;
- se i gate sono true, la key può essere letta da process env o da `.env.local`;
- nessun valore viene stampato;
- nessun prefisso/suffisso/hash/lunghezza viene stampato;
- nessuna variabile Supabase viene letta.

Retry D.16-C3-R1:

- real-call eseguita una sola volta;
- endpoint: standings Serie A;
- `requests_executed=1`;
- `http_status=403`;
- `api_errors_count=2`;
- `standings_rows_count=0`;
- `mapping_theoretical_possible=false`;
- nessun payload completo stampato;
- nessuna scrittura DB;
- provider/import non attivati.

## D.16-C3-R2 — Audit script senza fetch

Audit locale effettuato senza chiamate provider.

Conferme:

- base URL default: `https://v3.football.api-sports.io`;
- endpoint: `/standings`;
- parametri Serie A: `league=135`, `season=2026`;
- header: `x-apisports-key`;
- hard limit operativo: una sola chiamata `fetch` nello script;
- nessun retry;
- nessun loop;
- nessuna paginazione;
- nessun Supabase client;
- nessun writer DB;
- nessun `service_role`;
- output solo summary sanificato.

D.16-C3-R2 non esegue nessuna seconda real-call.

## D.16-C3-R2 manual check — Nessuna modifica script

La fase manual check non modifica lo script.

Valori statici da verificare contro dashboard/provider:

- base URL: `https://v3.football.api-sports.io`;
- endpoint: `/standings`;
- header: `x-apisports-key`;
- parametri: `league=135`, `season=2026`.

Possibile scelta futura:

- mantenere `season=2026`;
- oppure preparare fase dedicata per `season=2025`, se la dashboard indica che il piano Free non espone ancora la stagione 2026.
