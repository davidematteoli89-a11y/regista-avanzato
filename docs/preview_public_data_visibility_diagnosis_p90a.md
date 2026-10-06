# Preview Public Data Visibility Diagnosis — P90-A

## Scope

- diagnosis only;
- no merge;
- no deploy;
- no Production touch;
- no DB write;
- no provider/import;
- no Apify;
- no rollback;
- no `.env.local` read/printed;
- no token/cookie/header printed.

## Stop condition from P90

P90 è stato fermato prima del merge perché il controllo pre-merge su `preview` ha fallito:

```text
npm run dry-run:full-public-path-verification
```

Risultato osservato nello stop P90:

- `/competitions` → HTTP 200 ma `competitions_page_state=unexpected`;
- `/competitions/manual-serie-a` → HTTP 200 ma `competition_detail_state=unexpected`;
- la pagina locale mostrava 0 competizioni pubbliche;
- il dettaglio `manual-serie-a` mostrava empty/not available.

Nessun merge, push su main, deploy Production, rollback o DB write è stato eseguito.

## Reproduction

| Check | Result | Notes |
| --- | --- | --- |
| `npm run dry-run:full-public-path-verification` senza dev server attivo | reproduced as failing | Output sintetico: `dry_run_pass=false`. |
| `npm run dev` + `npm run dry-run:full-public-path-verification` | passed in P90-A | Route HTTP 200 e `data_visible` su `/competitions` e detail. |
| `/competitions` HTTP locale dopo server attivo | HTTP 200 | Dati pubblici visibili nel run P90-A. |
| `/competitions/manual-serie-a` HTTP locale dopo server attivo | HTTP 200 | Dati pubblici visibili nel run P90-A. |

Output P90-A con dev server attivo:

- `home_http_status=200`;
- `competitions_http_status=200`;
- `competitions_page_state=data_visible`;
- `competitions_links_detail=true`;
- `competition_detail_http_status=200`;
- `competition_detail_state=data_visible`;
- `competition_detail_links_back=true`;
- `dry_run_pass=true`.

## Investigation

### Dry-run script

Script:

- `scripts/provider/fullPublicPathVerificationDryRun.ts`

Package script:

- `dry-run:full-public-path-verification=tsx scripts/provider/fullPublicPathVerificationDryRun.ts`

Comportamento:

- lo script esegue fetch HTTP contro `http://localhost:3000` di default;
- verifica testi visibili e link, non interroga direttamente Supabase;
- se il server locale non è raggiungibile, il catch finale produce solo `dry_run_pass=false`;
- se il server è raggiungibile ma la route rende empty state, il test fallisce perché mancano i testi attesi.

### UI markup/selectors

Controlli richiesti dal dry-run:

- home: `Regista Avanzato`, `Esplora le competizioni`;
- `/competitions`: `Competizioni pubbliche`, `Serie A Manual Sample`, `Public data only`, link `/competitions/manual-serie-a`;
- detail: `Serie A Manual Sample`, `Manual Team One`, `Manual Team Two`, `Classifica pubblica`, `Squadre pubbliche`, `Public data only`.

P87 ha modificato il copy ma ha mantenuto compatibilità con questi marker essenziali.

Evidenza:

- P88 ha passato il dry-run;
- P90-A ha ripassato il dry-run con dev server attivo;
- non sono state trovate modifiche app/components/scripts dopo P88.

### Public readers / visibility

File ispezionati:

- `lib/public-data/readers.ts`;
- `lib/public-data/contracts.ts`;
- `app/(public)/competitions/page.tsx`;
- `app/(public)/competitions/[slug]/page.tsx`.

Esito:

- i reader filtrano ancora `PUBLIC_VISIBILITY`;
- `PUBLIC_VISIBILITY` punta a `PUBLIC_FREE_VISIBILITY`;
- `PUBLIC_FREE_VISIBILITY="public_free"`;
- non è stato reintrodotto il vecchio valore invalido `public`;
- lo slug `manual-serie-a` resta invariato;
- le route usano ancora `getPublicCompetitions()` e `getPublicCompetitionBundleBySlug(slug)`;
- nessun fallback admin/private è stato introdotto.

### P88 to P90 diff

Comandi:

```text
git diff --name-only 8ec5be6b8087cacb559ed85796c30d17e4637f9f..HEAD
git diff --stat 8ec5be6b8087cacb559ed85796c30d17e4637f9f..HEAD
```

Esito:

- solo documentazione P89;
- nessuna modifica a `app/`;
- nessuna modifica a `components/`;
- nessuna modifica a `lib/`;
- nessuna modifica a `scripts/`;
- nessuna modifica a env/Vercel/schema/migration.

File diff P88→HEAD:

- `docs/c_phase_progress.md`;
- `docs/manual_import_point_90_decision_p89.md`;
- `docs/production_polish_release_gate_checklist_p89.md`;
- `docs/production_polish_release_gate_p89.md`;
- `docs/production_readiness.md`;
- `docs/provider_point_89_closure.md`;
- `docs/supabase_staging_next_steps.md`.

### Local fixture/env behavior without printing env

Non è stata letta o stampata `.env.local`.

Evidenze:

- `publicReaderNoRouteDryRun` segnala `live_reader_available=false` quando eseguito direttamente in Node, ma usa valori verificati/documentati per lo stato post-promotion;
- le route pubbliche dipendono dal runtime Next locale e dalla disponibilità del public Supabase runtime;
- quando il dev server è attivo e la lettura pubblica è disponibile, il dry-run passa;
- quando il server non è attivo o la lettura runtime non restituisce dati, il dry-run fallisce o vede empty state.

## Diagnosis

Categoria causa: `fixture/local data not available in this execution`.

Classificazione secondaria: `local runtime dependency / dry-run precondition not explicit`.

Non ci sono evidenze di:

- regressione reale del polish;
- reader/filtro visibility rotto;
- slug/link/detail mismatch;
- modifiche app/components/scripts dopo P88;
- provider/import attivi;
- DB write inattese.

Root cause sintetica:

Il dry-run `full-public-path-verification` dipende da un server locale Next già attivo su `localhost:3000` e dalla disponibilità runtime dei dati pubblici via public readers. Nella prima esecuzione P90 il controllo ha visto empty state/0 data; in P90-A, con dev server attivo e runtime disponibile, lo stesso dry-run è passato senza modifiche codice.

## Recommended fix

P90 resta bloccato finché non si decide come rendere stabile la verifica pre-merge.

Fix consigliato P90-B:

- aggiornare/rafforzare il dry-run per distinguere chiaramente:
  - server locale non avviato;
  - server avviato ma public reader unavailable;
  - server avviato con empty state reale;
  - data visible;
- aggiungere output diagnostico non segreto su:
  - `base_url_reachable`;
  - `route_http_status`;
  - `expected_marker_missing`;
  - `public_data_empty_state_visible`;
  - `reader_runtime_available` se deducibile senza stampare env;
- non cambiare DB/reader/provider;
- non leggere `.env.local`;
- non aggiungere debug/raw payload alle route pubbliche;
- rieseguire `dry-run:full-public-path-verification`;
- poi ripetere P90 solo dopo verifica stabile.

Alternativa minima:

- ripetere P90 con dev server locale avviato e verificato prima del dry-run;
- accettare che il fail P90 fosse una condizione runtime/transitoria.

La raccomandazione più sicura è P90-B dry-run hardening prima di ripetere il merge/deploy.

## Safety

- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `env_local_read=false`
- `token_printed=false`
- `cookies_printed=false`
- `headers_printed=false`

## Decision

- `point_90a_preview_public_data_visibility_diagnosis_completed=true`
- `p90_remains_blocked=true`
- `p90b_recommended=true`
- `diagnosis_category=fixture_local_data_not_available_in_this_execution`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
