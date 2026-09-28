# Public Exposure Policy Plan — P50

## Scope

Questo documento è solo un piano di policy per una futura esposizione pubblica dei dati manuali/staging.

Punto 50 non esegue:

- nessuna esposizione pubblica;
- nessun cambio `visibility`;
- nessuna DB write;
- nessun deploy;
- nessuna modifica Production;
- nessun provider/import;
- nessuna attivazione Apify;
- nessuna route pubblica operativa;
- nessun public reader operativo.

I dati con `visibility='private_admin'` restano non pubblici.

## Current state

- Dati manuali disponibili in staging:
  - competitions: `1`;
  - teams: `2`;
  - standings: `2`.
- Visibility corrente: `private_admin`.
- Public exposure: `disabled`.
- Admin read-only surface implementata:
  - `/admin/data`;
  - `/admin/data/competitions`;
  - `/admin/data/competitions/[slug]`;
  - link read-only da `/admin/imports`.
- Browser admin verification: ancora `pending_no_admin_session`.
- Incognito/non autenticato su Preview: `Login – Vercel`.
- Provider/import: spenti.
- Apify: off.
- Production: non toccata.

## Visibility levels

| Visibility | Meaning | Public readable | Admin readable | Notes |
|---|---|---:|---:|---|
| `private_admin` | Dato interno/staging visibile solo in admin. | no | yes | Mai letto da route pubbliche. |
| `draft` | Dato editoriale/manuale in preparazione. | no | yes | Visibile solo ad admin/editor secondo policy applicativa. |
| `public_preview` | Dato candidato a pubblicazione, visibile solo in preview protetta. | no, salvo preview protetta | yes | Non indicizzato; mai fallback verso `private_admin`. |
| `public` | Dato approvato per route pubbliche. | yes | yes | Unico stato ammesso da reader pubblici non protetti. |

## Public exposure principles

1. Nessun dato `private_admin` può essere letto da route pubbliche.
2. Le route pubbliche devono filtrare esplicitamente `visibility='public'`.
3. Le route preview pubbliche future devono filtrare `visibility in ('public_preview', 'public')`, mai `private_admin`.
4. Nessun fallback deve mostrare dati admin se il filtro visibility fallisce.
5. Gli empty state pubblici devono mostrare “nessun dato disponibile”, non dati privati.
6. Il passaggio a `public` deve essere intenzionale, documentato e verificato.
7. I dati provenienti da provider/import devono passare da review prima di diventare pubblici.
8. Video/highlights devono restare link ufficiali/own content; niente clip caricate da partite.

## Route policy matrix

| Route type | Example route | Allowed visibility | Auth required | Current status |
|---|---|---|---|---|
| Admin data hub | `/admin/data` | `private_admin`, `draft`, `public_preview`, `public` | admin required | implemented |
| Admin competitions | `/admin/data/competitions` | all admin data | admin required | implemented |
| Public competition page | `/competitions/[slug]` or future equivalent | `public` only | no auth | planned only |
| Public team page | future | `public` only | no auth | planned only |
| Public standings page | future | `public` only | no auth | planned only |
| Preview public route | future | `public_preview`, `public` only | auth or protected preview | planned only |

## Reader policy

### Admin readers

- Possono leggere `private_admin`.
- Vivono in `lib/manual-data/readers.ts` o in area admin.
- Sono usati solo da `/admin/*`.
- Non devono essere importati da route pubbliche.

### Public readers

Futuri public reader devono:

- vivere in file separato, ad esempio `lib/public-data/readers.ts`;
- filtrare sempre `visibility='public'`;
- non avere fallback su admin reader;
- non usare `service_role`;
- non leggere dati `private_admin`;
- non chiamare provider;
- non attivare import;
- restituire empty state sicuri quando non ci sono dati pubblicabili.

## Promotion policy

Percorso futuro:

```text
private_admin → draft → public_preview → public
```

Regole:

- ogni passaggio deve essere esplicito;
- serve verifica admin;
- serve controllo route pubbliche;
- serve controllo incognito;
- nessun provider/import automatico;
- serve eventuale migration/action dedicata solo dopo autorizzazione esplicita.

Nel Punto 50 non viene eseguita nessuna promotion.

## Public route acceptance criteria

Una futura route pubblica potrà essere considerata sicura solo se:

- legge solo `visibility='public'`;
- in incognito mostra solo dati public;
- con dati `private_admin` mostra empty state;
- non usa admin reader;
- non usa `service_role`;
- non contiene bottoni operativi;
- non chiama provider;
- non attiva import;
- passa `lint`, `typecheck`, `build`;
- passa security scan.

## Failure modes

| Risk | Example | Required behavior |
|---|---|---|
| `private_admin` leaked publicly | una route pubblica legge reader admin | bloccare release e rimuovere import/filtro errato |
| fallback unsafe | se non trova `public`, mostra `private_admin` | mostrare empty state |
| public reader imports admin reader | `lib/public-data` importa `lib/manual-data/readers.ts` | fallire review |
| missing visibility filter | query senza `.eq('visibility', 'public')` | bloccare merge |
| provider fetch triggered from public route | route pubblica chiama API esterna | bloccare merge |
| stale preview route exposed | preview protetta diventa pubblica | bloccare deploy e disabilitare route |
| `service_role` used in public code | Supabase admin client in route pubblica | bloccare merge/deploy |

## P51 recommendation

Opzione consigliata:

- P51 — public reader design dry-run.

Alternativa:

- P51 — repeat admin browser verification with real session, se una sessione admin reale è disponibile.

## P51 result

Punto 51 ha eseguito il ramo “public reader design dry-run”.

Esito:

- design documentato in `docs/public_reader_design_dry_run_p51.md`;
- nessun public reader operativo;
- nessuna route pubblica creata;
- nessun collegamento a pagine pubbliche reali;
- `private_admin` non esposto;
- `visibility_changed=false`;
- `public_exposure_enabled=false`.

## P52 result

Punto 52 ha creato solo contratti TypeScript e audit statico:

- `lib/public-data/contracts.ts`;
- `scripts/provider/auditPublicReaderContracts.ts`;
- nessun reader operativo;
- nessuna route pubblica operativa;
- nessuna query Supabase;
- nessun dato `private_admin` esposto;
- nessun cambio visibility;
- nessuna DB write.
