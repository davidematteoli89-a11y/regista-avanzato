# D.16-C1 — Preparazione sicura API-Football Free key

Stato: preparazione documentale, nessuna chiave inserita e nessuna real-call eseguita.

D.16-C1 prepara la gestione futura della chiave API-Football Free per una probe read-only. Non crea token, non legge `.env.local`, non stampa valori e non chiama API-Football.

## Stato di partenza

- Ultimo commit di riferimento: `967c09bba3b407487a71e6443554dc67ffc55e2e`.
- Provider scelto per prima futura probe: `api_football`.
- Piano scelto: Free.
- Alternativa: `the_stats_api`.
- Probe corrente: disabilitata.
- `real_provider_probe_enabled=false`.
- `external_fetch=false`.
- `token_read=false`.
- `db_write=false`.
- `realWritesEnabled=false`.
- Provider/import/Apify spenti.
- `/admin/imports` read-only.
- Production non toccata.

## File env

File controllati:

- `.gitignore`;
- `.env.example`;
- `package.json`;
- `scripts/provider/*`;
- documentazione provider D.13–D.16.

Risultato:

- `.env.local` è ignorato e non è stato letto;
- `.env*` è ignorato con eccezione esplicita per `.env.example`;
- `.vercel/` è ignorato;
- `.env.example` è presente ed è il posto corretto dove documentare solo nomi variabili e placeholder non segreti.

## Nomi env futuri

Variabili da usare per una futura D.16-C2/D.16-C, senza inserirle ora:

```env
API_FOOTBALL_API_KEY=
API_FOOTBALL_BASE_URL=
API_FOOTBALL_PROBE_ENABLED=false
```

Note:

- `API_FOOTBALL_API_KEY` è il nome preferito per la chiave futura.
- `API_FOOTBALL_BASE_URL` resta configurabile ma non contiene segreti.
- `API_FOOTBALL_PROBE_ENABLED=false` è il default sicuro.
- `API_FOOTBALL_KEY` resta nel template solo come placeholder legacy/compatibilità documentale finché il codice della probe reale non definirà il nome definitivo.

## Dove inserire la chiave in futuro

Quando autorizzato:

- solo in `.env.local` locale oppure env Vercel Preview dedicata;
- mai in chat;
- mai nei docs;
- mai in `.env.example`;
- mai in Production;
- mai in All Environments;
- mai nel client;
- mai stampata in console.

La futura probe dovrà leggere la chiave solo server-side/script-side e dovrà interrompersi se rischia di stamparla.

## Checklist manuale account/API key

Prima di qualunque real-call:

- [ ] Account API-Football Free creato manualmente dall’utente.
- [ ] Piano Free confermato.
- [ ] Limiti/rate limit del piano Free confermati.
- [ ] Endpoint `standings` o `fixtures` confermato come disponibile nel piano Free.
- [ ] Costo della singola probe confermato come nullo o accettabile.
- [ ] Licenza/caching/pubblicazione verificati.
- [ ] Token/API key creato manualmente dall’utente.
- [ ] Token salvato solo in env sicura.
- [ ] Token non incollato in chat.
- [ ] Token non committato.
- [ ] Token non stampato.
- [ ] Production esclusa.

## Gate prima di D.16-C2

Non procedere alla fase successiva finché:

- account/API-Football Free non è pronto;
- nome env definitivo confermato;
- token disponibile solo in env sicura;
- `API_FOOTBALL_PROBE_ENABLED=false` resta default;
- `real_provider_probe_enabled=false` resta vero fino ad autorizzazione esplicita;
- script probe reale non è ancora creato o resta separato da import/writer;
- massimo una richiesta futura;
- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- provider/import ancora spenti;
- `realWritesEnabled=false`;
- `/admin/imports` resta read-only;
- Production non toccata.

## Cosa non viene fatto in D.16-C1

- Nessuna chiave creata.
- Nessuna chiave salvata.
- Nessuna chiave letta.
- Nessuna chiave stampata.
- Nessuna chiamata API-Football.
- Nessuna chiamata TheStatsAPI.
- Nessuna chiamata Apify/SofaScore.
- Nessuna fetch provider.
- Nessuno scraping.
- Nessuna scrittura DB.
- Nessun `db push/reset`.
- Nessun provider attivato.
- Nessun import attivato.
- Nessun deploy.
- Production non toccata.

## Prossimo step consigliato

D.16-C2 — preparare lo script della probe reale in modalità ancora disabilitata, con guardia esplicita su `API_FOOTBALL_PROBE_ENABLED=false`, senza eseguire la real-call.

## D.16-C2-A — Verifica setup locale senza stampare token

Stato: verifica locale completata senza mostrare valori.

Nota sicurezza:

- una API key condivisa accidentalmente in chat deve essere considerata esposta;
- non deve essere riutilizzata;
- deve essere rigenerata manualmente dall’utente;
- non deve essere copiata nei docs;
- non deve essere committata;
- non deve essere incollata di nuovo in chat.

Verifiche locali consentite:

- `.env.local` esiste;
- `.env.local` è ignorato da Git;
- `.env.example` contiene solo placeholder/default safe;
- i nomi env risultano presenti in `.env.local` senza stampare valori:
  - `API_FOOTBALL_API_KEY`;
  - `API_FOOTBALL_BASE_URL`;
  - `API_FOOTBALL_PROBE_ENABLED`;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- `token_printed=false`.

Conferme:

- nessun valore della key letto o mostrato;
- nessuna real-call API-Football;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun `db push/reset`;
- provider/import/Apify spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-C2-B — preparare uno script di probe reale ancora gated/disabilitato, senza eseguirlo.

## D.16-C2-B — Script gated preparato

Documento aggiunto:

- `docs/api_football_probe_script_d16c2b.md`.

Script preparato:

- `scripts/provider/apiFootballProbe.ts`;
- comando npm: `probe:api-football:gated`.

Lo script resta bloccato di default:

- `API_FOOTBALL_PROBE_ENABLED=false`;
- `REAL_PROVIDER_PROBE_ENABLED` non abilitato;
- nessuna fetch;
- nessuna key letta in modalità disabled;
- nessun token stampato;
- nessuna scrittura DB.

D.16-C2-B non esegue lo script e non effettua real-call.

## D.16-C2-C — Checklist finale key/probe

Documento:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Prima di D.16-C3:

- key accidentalmente condivisa in chat da considerare esposta;
- key da rigenerare/ruotare manualmente;
- nuova key solo in `.env.local`;
- `API_FOOTBALL_PROBE_ENABLED=false` fino al momento esatto della probe;
- `REAL_PROVIDER_PROBE_ENABLED=false` fino al momento esatto della probe;
- nessun token in chat, docs, commit o Production.

D.16-C2-C non legge `.env.local` e non legge/stampa token.

## D.16-C3 — Key non disponibile nel process environment

L'utente ha confermato la rigenerazione/rotazione della key, ma il primo tentativo D.16-C3 si è fermato prima della real-call perché `API_FOOTBALL_API_KEY` non era disponibile nel process environment ereditato.

La decisione di sicurezza resta:

- non leggere/caricare `.env.local` da Codex;
- non stampare valori;
- non stampare prefisso/suffisso/hash/lunghezza key;
- non copiare la key nei docs;
- non abbassare il gate dello script.

Per una futura riprova, la key deve essere resa disponibile al processo in modo sicuro dall'utente, senza essere mostrata a Codex o stampata in terminale.

## D.16-C3-R1 — Lettura mirata autorizzata

Per il retry D.16-C3-R1 è stata autorizzata una lettura mirata da `.env.local` solo per le variabili API-Football strettamente necessarie:

- `API_FOOTBALL_API_KEY`;
- `API_FOOTBALL_BASE_URL`.

Garanzie mantenute:

- la key non viene stampata;
- non vengono stampati prefisso/suffisso/hash/lunghezza;
- non vengono lette variabili Supabase;
- non viene usato `dotenv` generico;
- la key viene letta solo se entrambi i gate della probe sono true.

La prova ha raggiunto il provider, ma ha ricevuto HTTP `403`. Il token resta segreto e non è stato inserito nei docs.
