# Production Editorial Pages Release Gate — P98

## Scope

P98 prepara il gate di rilascio Production per le pagine editoriali pubbliche di Regista Avanzato.

Questo punto è solo documentale/no-apply:

- nessun merge `preview` → `main`;
- nessun deploy Production;
- nessuna modifica codice;
- nessuna modifica DB;
- nessun provider/import;
- nessun Apify;
- nessuna modifica Vercel config/env/root directory;
- nessuna pubblicazione automatica Substack.

## Candidate release

| Campo | Valore |
|---|---|
| Source branch | `preview` |
| Candidate preview commit | `750ab823056c4e63b258a7014637899e8578fcc0` |
| Current main commit | `4a0b4f190e9e118bb770545742b9ad56cf295789` |
| Pagine editoriali incluse | `/manifesto`, `/rubriche` |
| Route pubbliche già verificate in P97 | `/`, `/manifesto`, `/rubriche`, `/competitions`, `/competitions/manual-serie-a` |
| DB write aggiuntive | `false` |
| Provider/import | `off` |
| Apify | `off` |
| Substack auto-publish | `false` |

## Production baseline

Production attuale resta stabile e non viene toccata in P98:

- URL Production: `https://regista-avanzato-rouge.vercel.app`;
- `/` già operativo;
- `/competitions` già operativo con dati pubblici visibili;
- `/competitions/manual-serie-a` già operativo con dati pubblici visibili;
- `/manifesto` e `/rubriche` non vengono rilasciate in Production da P98.

## Release readiness decision

P98 dichiara pronto il gate per P99, ma non autorizza P99.

P99 potrà iniziare solo con autorizzazione esplicita testuale esatta:

```text
Autorizzo il Punto 99: esegui il merge controllato di preview su main e il deploy Production delle pagine editoriali di Regista Avanzato dal commit preview 750ab823056c4e63b258a7014637899e8578fcc0, senza attivare provider/import, senza Apify, senza DB write aggiuntive, senza modificare configurazioni Vercel, senza modificare env, senza modificare Root Directory, senza pubblicare automaticamente su Substack e senza toccare dati fuori scope.
```

Qualunque risposta generica come `procedi`, `vai`, `continua` o `ok` non autorizza merge/deploy Production.

## P99 controlled release outline

Se e solo se autorizzato esplicitamente:

1. verificare branch `preview`, working tree pulito e commit candidato;
2. rieseguire verifiche locali obbligatorie;
3. passare a `main`, aggiornare con `git pull --ff-only origin main`;
4. fare merge controllato del commit candidato da `preview`;
5. rieseguire verifiche su `main`;
6. pushare `main`;
7. attendere/verificare deploy Production automatico o procedura autorizzata;
8. verificare Production su `/`, `/manifesto`, `/rubriche`, `/competitions`, `/competitions/manual-serie-a`;
9. fermarsi se emerge qualunque mismatch, segreto, route 404 inattesa, provider/import attivo o differenza Vercel non autorizzata.

## Stop conditions

Fermarsi prima di P99 se:

- branch o commit candidato non corrispondono;
- working tree non pulito;
- `main` diverge in modo non previsto;
- verifiche locali falliscono;
- compare `.env.local`, `.vercel`, token, cookie o header auth staged;
- emergono provider/import attivi;
- emergono DB write non autorizzate;
- viene richiesta qualunque modifica Vercel config/env/root directory;
- autorizzazione esplicita P99 non corrisponde al testo richiesto.

## Markers

- `point_98_production_editorial_pages_release_gate_completed=true`
- `production_editorial_pages_release_gate_ready=true`
- `p99_requires_explicit_authorization=true`
- `candidate_preview_commit=750ab823056c4e63b258a7014637899e8578fcc0`
- `current_main_commit=4a0b4f190e9e118bb770545742b9ad56cf295789`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `no_code_change=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `substack_auto_published=false`
