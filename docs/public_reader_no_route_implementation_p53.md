# Public Reader Implementation No-Route — P53

## Scope

Punto 53 implementa public readers reali ma non collegati a route pubbliche.

È consentito:

- creare `lib/public-data/readers.ts`;
- usare il client Supabase server anon/session già esistente;
- eseguire solo query SELECT future con filtro obbligatorio `visibility='public'`;
- aggiornare audit statico e dry-run markers.

Non è consentito:

- creare route pubbliche operative;
- collegare public reader a pagine reali;
- leggere o mostrare dati `private_admin`;
- cambiare visibility;
- scrivere nel DB;
- attivare provider/import;
- chiamare TheStatsAPI/API-Football/Apify/SofaScore;
- fare deploy;
- toccare Production.

## Files

- `lib/public-data/readers.ts`
- `scripts/provider/auditPublicReaderContracts.ts`

## Public reader functions

Funzioni esportate:

```ts
getPublicCompetitions()
getPublicCompetitionBySlug(slug: string)
getPublicTeamsByCompetitionSlug(slug: string)
getPublicStandingsByCompetitionSlug(slug: string)
getPublicCompetitionBundleBySlug(slug: string)
```

## Safety behavior

Ogni query operativa usa filtro:

```ts
.eq("visibility", PUBLIC_VISIBILITY)
```

Il reader:

- non importa `lib/manual-data/readers.ts`;
- non importa admin readers;
- non usa `service_role`;
- non usa provider client;
- non fa fetch esterne;
- non fa insert/update/delete/upsert;
- non crea Server Action;
- non legge `.env.local`;
- non è collegato a route pubbliche.

Con il dataset attuale, tutto `private_admin`, i reader pubblici devono restituire empty state/0 risultati quando verranno invocati in ambiente con RLS adeguata.

## Static audit

Comando:

```bash
npm run audit:public-reader-contracts
```

Controlla:

- contratto P52 presente;
- reader P53 presente;
- export obbligatori presenti;
- filtro visibility presente;
- nessun import admin reader;
- nessuna fetch;
- nessuna DB write operation;
- nessun `service_role`;
- nessuna Server Action;
- nessun provider client.

## No-route functional dry-run

Creato comando:

```bash
npm run dry-run:public-readers
```

Il dry-run chiama:

- `getPublicCompetitions()`;
- `getPublicCompetitionBySlug("manual-serie-a")`;
- `getPublicTeamsByCompetitionSlug("manual-serie-a")`;
- `getPublicStandingsByCompetitionSlug("manual-serie-a")`;
- `getPublicCompetitionBundleBySlug("manual-serie-a")`.

Con dataset attuale `private_admin`, il risultato atteso è:

- `public_competitions_count=0`;
- `public_teams_count=0`;
- `public_standings_count=0`;
- `public_bundle_status=not_found`;
- `private_admin_dataset_hidden=true`.

Nota: il comando package usa `node --experimental-strip-types`, coerente con gli altri script TypeScript del repository, perché `tsx` non è installato nel progetto.

## Punto 53 status markers

- `point_53_public_readers_no_route_implemented=true`
- `public_reader_mode=no_route`
- `public_readers_implemented=true`
- `public_reader_operational=true`
- `public_routes_enabled=false`
- `public_routes_created=false`
- `public_reader_connected_to_routes=false`
- `supabase_queries_implemented=true`
- `supabase_queries_visibility_filtered=true`
- `admin_reader_imported=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `point_53_db_write=false`
- `provider_fetch=false`
- `external_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

## Next step

Prossimo step consigliato:

- Punto 54 — public reader no-route runtime empty-state verification, solo read-only, se autorizzato;
- oppure browser admin verification con sessione admin reale prima di qualunque route pubblica.

## P54 result

Punto 54 ha rafforzato audit e dry-run:

- nuovo audit `npm run audit:public-readers-no-route`;
- dry-run public readers assertivo;
- `public_competitions_count=0`;
- `public_teams_count=0`;
- `public_standings_count=0`;
- `public_bundle_status=not_found`;
- `public_reader_route_wiring_detected=false`;
- `violations_count=0`;
- nessuna route pubblica creata;
- nessun dato `private_admin` esposto.
