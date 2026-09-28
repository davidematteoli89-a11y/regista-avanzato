# Public Reader Contract Skeleton — P52

## Scope

Punto 52 crea solo uno skeleton tecnico sicuro per futuri public reader.

Sono inclusi:

- contratti TypeScript;
- costanti di sicurezza;
- tipi pubblici futuri;
- marker dry-run;
- audit statico locale.

Sono esclusi:

- reader operativi;
- query Supabase;
- route pubbliche;
- collegamenti a pagine reali;
- DB write;
- cambio visibility;
- provider/import;
- Apify;
- deploy;
- Production.

## File creati

- `lib/public-data/contracts.ts`
- `scripts/provider/auditPublicReaderContracts.ts`

## Contract namespace

Il namespace futuro per dati pubblici è:

```text
lib/public-data/
```

Nel Punto 52 è presente solo:

```text
lib/public-data/contracts.ts
```

Non esiste ancora:

```text
lib/public-data/readers.ts
```

Questo evita che un reader venga importato accidentalmente da una route pubblica prima della review.

## Constants

Costanti definite:

```ts
PUBLIC_VISIBILITY = "public"
PUBLIC_PREVIEW_VISIBILITY = "public_preview"
PRIVATE_ADMIN_VISIBILITY = "private_admin"
PUBLIC_READER_CONTRACT_VERSION = "p52-public-reader-contract-skeleton"
```

Policy:

- `PUBLIC_VISIBILITY` è l’unica visibility ammessa per reader pubblici non protetti;
- `PUBLIC_PREVIEW_VISIBILITY` è solo per eventuali preview future protette;
- `PRIVATE_ADMIN_VISIBILITY` è presente solo come costante di policy, non come valore ammesso dai public reader.

## Types

Tipi definiti:

- `PublicVisibility`;
- `PublicPreviewVisibility`;
- `PrivateAdminVisibility`;
- `PublicReaderVisibility`;
- `PublicPreviewReaderVisibility`;
- `PublicDataSource`;
- `PublicDataListResult<T>`;
- `PublicCompetition`;
- `PublicTeam`;
- `PublicStanding`;
- `PublicCompetitionDetailResult`;
- `PublicReaderContractStatus`.

## No-op contract status

Il contratto esporta uno status statico:

```ts
PUBLIC_READER_CONTRACT_STATUS
```

Con flag:

- `publicReadersImplemented=false`;
- `publicRoutesEnabled=false`;
- `publicReaderConnectedToRoutes=false`;
- `supabaseQueriesImplemented=false`;
- `dbWrite=false`;
- `providerFetch=false`;
- `serviceRoleUsed=false`;
- `privateAdminPubliclyExposed=false`.

## Static audit

Creato comando:

```bash
npm run audit:public-reader-contracts
```

Controlla localmente:

- esistenza del contratto;
- presenza costanti `public` e `public_preview`;
- assenza import admin reader;
- assenza Supabase client/query;
- assenza `fetch`;
- assenza insert/update/delete/upsert;
- assenza `service_role`;
- assenza Server Action;
- assenza `.env.local`.

Non fa:

- fetch;
- DB write;
- lettura env;
- query Supabase;
- provider call.

## Punto 52 status markers

- `point_52_public_reader_contract_skeleton_created=true`
- `public_reader_contract_mode=contract_skeleton_only`
- `public_readers_implemented=false`
- `public_reader_operational=false`
- `public_reader_skeleton_operational=false`
- `public_routes_enabled=false`
- `public_routes_created=false`
- `public_reader_connected_to_routes=false`
- `supabase_queries_implemented=false`
- `admin_reader_imported=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `point_52_db_write=false`
- `provider_fetch=false`
- `external_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

## Next step

Prossimo step possibile, solo con autorizzazione esplicita:

- Punto 53 — public reader implementation no-route, con query ancora non collegate a route;
- oppure ripetere la browser admin verification con sessione admin reale prima di qualsiasi public work operativo.

## P53 result

Punto 53 ha implementato `lib/public-data/readers.ts` in modalità no-route.

Esito:

- public reader reali creati;
- nessuna route pubblica creata;
- nessun collegamento a pagine reali;
- filtro obbligatorio `visibility='public'`;
- nessun import admin reader;
- nessun `service_role`;
- nessuna DB write;
- nessun provider/import;
- `private_admin` non esposto.

## P54 result

Punto 54 rafforza il contratto P52 con audit statico e dry-run assertivo dei public reader no-route.

Esito atteso/verificabile:

- `npm run audit:public-reader-contracts` resta il controllo del contratto skeleton;
- `npm run audit:public-readers-no-route` verifica che i reader pubblici non siano collegati a route operative;
- `npm run dry-run:public-readers` deve restituire `0/0/0` con il dataset attuale `private_admin`;
- nessun fallback verso admin reader;
- nessun import da `lib/manual-data/readers.ts`;
- nessuna route pubblica operativa;
- nessuna query di scrittura;
- nessun provider/import;
- nessun cambio visibility.

## P55 result

Punto 55 usa il contratto P52/P53 per route pubbliche empty-state:

- public reader collegati solo a `/competitions` e `/competitions/[slug]`;
- nessun import admin reader;
- nessun `service_role`;
- nessuna route usa provider/import;
- nessuna DB write;
- dataset `private_admin` continua a produrre 0 risultati pubblici.
