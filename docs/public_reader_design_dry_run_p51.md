# Public Reader Design Dry-Run — P51

## Scope

Punto 51 è solo design tecnico e dry-run.

Non abilita:

- public reader operativi;
- route pubbliche reali;
- lettura pubblica di dati `private_admin`;
- cambio `visibility`;
- DB write;
- provider/import;
- Apify;
- deploy;
- Production.

Il risultato atteso è una separazione architetturale documentata tra reader admin e futuri reader pubblici.

## Current state

- Dati manuali staging presenti:
  - competitions: `1`;
  - teams: `2`;
  - standings: `2`.
- Visibility corrente: `private_admin`.
- Admin reader esistente: `lib/manual-data/readers.ts`.
- Admin surface read-only esistente:
  - `/admin/data`;
  - `/admin/data/competitions`;
  - `/admin/data/competitions/[slug]`;
  - link read-only da `/admin/imports`.
- Public exposure: `disabled`.
- Public readers: non implementati operativamente.
- Public routes nuove: non create.
- Browser admin verification: ancora `pending_no_admin_session`.
- Incognito/non autenticato su Preview: Login Vercel osservato nel Punto 49.
- Provider/import: spenti.
- Apify: off.
- Production: non toccata.

## Reader separation principle

### Admin reader

Il reader admin:

- è usato solo da route `/admin/*`;
- può leggere dati `private_admin`;
- può mostrare `draft`, `private_admin`, `public_preview` e `public` agli admin;
- resta in namespace admin/manuale, oggi `lib/manual-data/readers.ts`;
- non deve essere importato da route pubbliche.

### Public reader

Il futuro reader pubblico:

- deve stare in namespace separato, consigliato `lib/public-data/readers.ts`;
- deve filtrare sempre `visibility='public_free'`;
- non deve importare admin readers;
- non deve avere fallback verso admin readers;
- non deve usare `service_role`;
- non deve chiamare provider;
- non deve scrivere nel DB;
- se non trova dati `public`, deve restituire empty state sicuro.

Nel Punto 51 questo namespace è solo progettato: nessun file operativo viene collegato a route pubbliche.

## Proposed public reader API

API futura proposta, non operativa nel Punto 51:

```ts
getPublicCompetitions()
getPublicCompetitionBySlug(slug: string)
getPublicTeamsByCompetitionSlug(slug: string)
getPublicStandingsByCompetitionSlug(slug: string)
```

Regole minime comuni:

- ogni query deve includere filtro equivalente a `visibility = 'public_free'`;
- nessuna query deve leggere `private_admin`;
- nessuna funzione deve importare `lib/manual-data/readers.ts`;
- nessuna funzione deve usare Supabase admin client o `service_role`;
- nessuna funzione deve creare import, sync, write, upsert o log provider;
- ogni errore deve ritornare uno stato sanificato, senza token, cookie o dettagli auth.

## Proposed result shapes

Risultato lista:

```ts
type PublicDataListResult<T> = {
  source: "public_supabase" | "empty" | "unavailable";
  items: T[];
  warning: string | null;
};
```

Risultato dettaglio competition:

```ts
type PublicCompetitionDetailResult = {
  source: "public_supabase" | "empty" | "unavailable";
  competition: PublicCompetition | null;
  teams: PublicTeam[];
  standings: PublicStanding[];
  warning: string | null;
};
```

Empty state richiesto:

- se non ci sono record `public`, mostrare “nessun dato pubblico disponibile”;
- non usare fallback admin;
- non rivelare che esistono record `private_admin`.

## Public reader query policy

Query futura ammessa solo se contiene i filtri:

- competitions: `visibility='public_free'`;
- teams: `visibility='public_free'` e competition pubblica;
- standings: `visibility='public_free'` e competition/team pubblici;
- ordine deterministico;
- limite esplicito quando utile.

Query futura vietata:

- query senza filtro visibility;
- fallback da public a admin;
- join implicito verso record `private_admin`;
- uso `service_role`;
- chiamate provider/API esterne;
- scritture DB o RPC write.

## Route integration policy

Punto 51 non crea route pubbliche.

Le future route pubbliche potranno essere considerate solo dopo un punto dedicato e dovranno:

- importare solo `lib/public-data/readers.ts`;
- non importare `lib/manual-data/readers.ts`;
- mostrare empty state con dati non public;
- essere verificate in incognito;
- passare scan per `private_admin`, `service_role`, provider fetch, Server Action write;
- non aggiungere bottoni Run/Import/Execute/Sync/Save/Apply.

## Skeleton recommendation

Quando sarà autorizzato un punto implementativo successivo, lo skeleton dovrà essere creato come file separato:

```text
lib/public-data/readers.ts
```

Nel Punto 51 non viene creato come codice operativo per evitare qualsiasi rischio di uso accidentale da route pubbliche.

## Safety gates before implementation

Prima di implementare public readers reali:

- browser admin verification chiusa o esplicitamente rimandata;
- dati `private_admin` ancora non esposti;
- decisione esplicita su quali dati possono diventare `public`;
- eventuale cambio visibility autorizzato in punto separato;
- query public validate da review;
- incognito test definito;
- `lint`, `typecheck`, `build` obbligatori;
- nessun provider/import attivo;
- nessun deploy Production senza checklist dedicata.

## Punto 51 status markers

- `point_51_public_reader_design_dry_run_created=true`
- `public_reader_design_mode=dry_run_only`
- `public_readers_implemented=false`
- `public_reader_skeleton_operational=false`
- `public_routes_enabled=false`
- `public_routes_created=false`
- `public_reader_connected_to_routes=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `point_51_db_write=false`
- `provider_fetch=false`
- `external_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

## Next step

Prossimo step consigliato:

- Punto 52 — public reader skeleton no-route/no-op con test statici, solo se autorizzato;
- oppure ripetere la browser admin verification con sessione admin reale prima di qualsiasi public work operativo.

## P52 result

Punto 52 ha creato solo il contract skeleton:

- `lib/public-data/contracts.ts`;
- nessun `lib/public-data/readers.ts` operativo;
- nessuna query Supabase;
- nessuna route pubblica;
- nessun collegamento a pagine reali;
- audit statico locale `npm run audit:public-reader-contracts`;
- `private_admin` non esposto;
- `visibility_changed=false`;
- `point_52_db_write=false`.

## P53 result

Punto 53 ha creato i public reader no-route:

- `lib/public-data/readers.ts`;
- funzioni pubbliche filtrate su `visibility='public_free'`;
- nessun collegamento a route pubbliche;
- nessun fallback verso admin reader;
- nessun cambio visibility;
- nessuna DB write.
