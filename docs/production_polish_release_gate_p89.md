# Production Polish Release Gate — P89

## Scope

- release gate only;
- no merge;
- no deploy;
- no Production touch;
- no code change;
- no DB write;
- no provider/import;
- no Apify;
- no rollback.

## Candidate release

| Item | Value |
| --- | --- |
| Source branch | `preview` |
| Candidate preview commit | `8ec5be6b8087cacb559ed85796c30d17e4637f9f` |
| Current main commit | `690742762615b6cd5dcd434d1635968269a9dacd` |
| Scope | Public product polish |
| Change type | UI/copy pubblico |
| Routes involved | `/`, `/competitions`, `/competitions/manual-serie-a` |
| Data behavior | lettura pubblica invariata |
| Provider/import | `provider_import_enabled=false` |
| Apify | `apify_enabled=false` |
| DB write | `db_write_additional=false` |
| Production status | not touched in P89 |

## Production baseline

| Route | Current expected status | Notes |
| --- | --- | --- |
| `/` | HTTP 200 | Baseline verified in P83/P84 monitoring context. |
| `/competitions` | HTTP 200 | Public MVP route already working in Production before polish release. |
| `/competitions/manual-serie-a` | HTTP 200 | Public detail route already working in Production before polish release. |

Production attuale è stabile e il MVP Production resta congelato. Il public product polish non è ancora rilasciato in Production da P89. P90 richiede autorizzazione esplicita separata.

## P90 plan

P90 potrà essere eseguito solo dopo autorizzazione esplicita.

1. Preflight:
   - confermare `candidate_preview_commit=8ec5be6b8087cacb559ed85796c30d17e4637f9f`;
   - confermare current `main`;
   - confermare working tree pulito.
2. Merge controllato:
   - checkout `main`;
   - `git pull --ff-only origin main`;
   - merge controllato da `preview` o dal commit candidato;
   - se ci sono conflitti rischiosi, fermarsi.
3. Verifiche su `main`:
   - `npm run dry-run:final-env-checklist`;
   - `npm run dry-run:full-public-path-verification`;
   - `npm run audit:providers`;
   - `npm run dry-run:provider-writer-guards`;
   - `npm run lint`;
   - `npm run typecheck`;
   - `npm run build`.
4. Push `main`:
   - push su `origin main` solo se tutto passa.
5. Verifica Production:
   - attendere deploy Vercel automatico/controllato;
   - controllare `https://regista-avanzato-rouge.vercel.app/`;
   - controllare `https://regista-avanzato-rouge.vercel.app/competitions`;
   - controllare `https://regista-avanzato-rouge.vercel.app/competitions/manual-serie-a`.
6. Post-check:
   - dati visibili;
   - nessun `private_admin`;
   - nessun admin link;
   - nessun debug/raw payload;
   - nessun bottone operativo;
   - provider/import off;
   - Apify off;
   - nessuna DB write aggiuntiva.
7. Rollback:
   - nessun rollback automatico;
   - rollback solo con autorizzazione esplicita separata.

## Stop conditions

| Condition | Action |
| --- | --- |
| Candidate preview commit diverso | Fermarsi e richiedere nuova conferma. |
| `main` diverso da baseline non spiegata | Documentare valore reale e fermarsi prima del merge. |
| Working tree non pulito | Fermarsi prima del merge. |
| Conflitti merge rischiosi | Fermarsi, non risolvere automaticamente. |
| Build/verifiche falliscono | Non pushare `main`. |
| Vercel non deploya | Fermarsi e documentare. |
| Dominio Production non punta al deploy corretto | Fermarsi e documentare. |
| Route Production 404 | Fermarsi e documentare. |
| Dati non visibili | Fermarsi e documentare. |
| `private_admin`, admin, debug/raw o bottoni operativi visibili | Fermarsi e documentare. |
| Provider/import si attivano | Fermarsi e documentare. |
| DB write inattese | Fermarsi e documentare. |

## Required authorization

Testo richiesto per autorizzare P90:

```text
Autorizzo il Punto 90: esegui il merge controllato di preview su main e il deploy Production del public product polish di Regista Avanzato dal commit preview 8ec5be6b8087cacb559ed85796c30d17e4637f9f, senza attivare provider/import, senza Apify, senza DB write aggiuntive, senza modificare configurazioni Vercel, senza modificare env, senza modificare Root Directory e senza toccare dati fuori scope.
```

Note:

- “procedi”, “vai”, “continua” o “ok” non bastano per P90;
- serve autorizzazione esplicita con commit e scope;
- senza autorizzazione P90 non deve essere eseguito.

## Decision

- `point_89_production_polish_release_gate_completed=true`
- `production_polish_release_gate_ready=true`
- `p90_requires_explicit_authorization=true`
- `candidate_preview_commit=8ec5be6b8087cacb559ed85796c30d17e4637f9f`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `no_code_change=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
