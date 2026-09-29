# Public Data Promotion Plan — P59

## Scope

Punto 59 è **plan only**.

- Nessuna promotion eseguita.
- Nessun cambio `visibility`.
- Nessuna DB write.
- Nessun provider/import.
- Nessun deploy.
- Nessuna Production.
- I dati `private_admin` restano non pubblici.

Questo documento prepara soltanto la policy operativa, l’ordine di promozione, il rollback plan e il post-promotion verification plan per una futura autorizzazione separata.

## Current state

Dati staging/manuali esistenti:

- 1 competition.
- 2 teams.
- 2 standings.
- `visibility` attuale: `private_admin`.

Route pubbliche già create e verificate:

- `/competitions`: empty state.
- `/competitions/manual-serie-a`: not_found/empty state.

I public readers filtrano solo `visibility='public'`. I dati `private_admin` non sono esposti pubblicamente.

## Promotion objective

Obiettivo futuro, solo dopo autorizzazione esplicita separata:

Promuovere una piccola fixture manuale da:

```text
private_admin → public
```

per permettere alle route pubbliche di mostrare:

- una competition pubblica;
- i relativi teams pubblici;
- la standing pubblica.

## Promotion order

Ordine obbligatorio:

1. Competition.
2. Teams collegati alla competition.
3. Standings collegate a competition e teams.

Motivo:

- le standings dipendono da competition e teams;
- la route dettaglio deve avere un bundle coerente;
- bisogna evitare standings pubbliche senza team pubblici.

## Candidate scope

Candidate fixture futura:

Competition:

- slug/internal key/API competition id: `manual-serie-a`
- name: `Serie A Manual Sample`
- season: `2026`
- country: `Italy`

Teams:

- `manual-team-1`
- `manual-team-2`

Standings:

- 2 righe associate alla competition e ai teams.

Questa sezione definisce solo una candidata futura. Non autorizza nessuna modifica.

## Promotion SQL plan, no-apply

In una fase futura autorizzata, un piano SQL/manuale dovrà fare logicamente:

- aggiornare la competition candidata a `visibility='public'`;
- aggiornare i teams collegati alla competition candidata a `visibility='public'`;
- aggiornare le standings collegate alla competition e ai teams candidati a `visibility='public'`.

Punto 59 non include SQL eseguibile.

```text
PROMOTION_PLAN_ONLY
DO NOT APPLY
DO NOT RUN
NO DB WRITE AUTHORIZED
NO VISIBILITY CHANGE AUTHORIZED
```

## Authorization gate

La promozione reale richiederà una frase esplicita di questo tipo:

```text
Autorizzo il Punto 61: promuovi a public la fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.
```

Qualsiasi generico “procedi”, “vai”, “continua”, “ok” non autorizza la DB write.

## Rollback plan

Rollback futuro:

```text
public → private_admin
```

Scope rollback:

- competition `manual-serie-a`;
- linked teams;
- linked standings.

Rollback deve:

- essere eseguito solo con autorizzazione esplicita;
- verificare prima lo scope;
- non toccare altri dati;
- non toccare Production.

## Post-promotion verification plan

Dopo una futura promotion reale, verificare:

Admin:

- dati ancora visibili in admin;
- `visibility=public` su 1/2/2.

Public readers:

- `public_competitions_count=1`;
- `public_teams_count=2`;
- `public_standings_count=2`;
- `public_bundle_status=ready`.

Public routes:

- `/competitions` mostra la competition pubblica;
- `/competitions/manual-serie-a` mostra dettaglio pubblico;
- team e standing visibili;
- nessun dato extra `private_admin` visibile.

No-auth/browser:

- route pubbliche visibili senza login;
- nessun admin link;
- nessun debug payload;
- nessun bottone operativo.

## Safety constraints

| Constraint | Required behavior |
|---|---|
| No Production | Operare solo su staging dopo autorizzazione dedicata |
| No deploy | Nessun deploy richiesto dalla promotion manuale |
| No provider fetch | Nessuna chiamata TheStatsAPI/API-Football/Apify |
| No Apify | Apify resta off |
| No service_role in app | Nessun uso service role lato UI/app |
| No Server Action write | Nessuna Server Action di promotion |
| Explicit authorization required | Serve frase esplicita Punto 61 |
| Exact row scope required | Scope atteso 1/2/2 prima della write |
| Rollback plan required | Rollback pronto prima della promotion |
| Post-verification required | Admin, public readers e browser no-auth da verificare dopo |

## Failure modes

| Risk | Example | Required action |
|---|---|---|
| Competition public but teams private_admin | Dettaglio pubblico senza squadre | Fermare e rollback o completare scope solo se autorizzato |
| Teams public but standings private_admin | Squadre visibili senza classifica | Documentare partial e non procedere oltre senza decisione |
| Standings public without teams | Classifica incoerente | Rollback standings o ripristino scope coerente |
| Public reader sees inconsistent bundle | `public_bundle_status` non ready | Non chiudere come pass |
| Public route shows partial unsafe data | Dati extra o privati visibili | Fail e rollback autorizzato |
| Accidental visibility change beyond scope | Più di 1/2/2 righe modificate | Fermare, documentare, preparare rollback scoped |
| Production touched | Qualsiasi modifica Production | Incident path, stop immediato |
| Provider/import activated | Fetch/import reali partiti | Stop immediato, documentare violazione |

## P60 recommendation

Raccomandato: **P60 — Public data promotion dry-run/no-apply**.

Obiettivo P60:

- creare solo piano operativo/dry-run della promotion;
- calcolare lo scope esatto 1/2/2;
- preparare SQL/manual instructions solo no-apply;
- non eseguire DB write.

## Markers

- `point_59_public_data_promotion_plan_created=true`
- `public_data_promotion_mode=plan_only`
- `public_data_promotion_executed=false`
- `visibility_changed=false`
- `public_routes_current_state=empty_not_found`
- `public_competitions_count=0`
- `public_teams_count=0`
- `public_standings_count=0`
- `future_promotion_candidate=manual-serie-a`
- `future_promotion_expected_competitions_count=1`
- `future_promotion_expected_teams_count=2`
- `future_promotion_expected_standings_count=2`
- `rollback_plan_created=true`
- `post_promotion_verification_plan_created=true`
- `point_59_db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
