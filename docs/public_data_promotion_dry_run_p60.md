# Public Data Promotion Dry-Run No-Apply — P60

## Scope

Punto 60 è un dry-run tecnico **no-apply** per la futura promozione della fixture `manual-serie-a` da `private_admin` a `public`.

- Nessuna promotion eseguita.
- Nessun cambio `visibility`.
- Nessuna DB write.
- Nessun provider/import.
- Nessun Apify.
- Nessun deploy.
- Nessuna Production.

## Dry-run source

Lo scope è stato calcolato leggendo solo fixture locali versionate:

- `fixtures/provider/manual/competitions.sample.json`
- `fixtures/provider/manual/teams.sample.json`
- `fixtures/provider/manual/standings.sample.json`

Il comando usato è:

```bash
npm run dry-run:public-data-promotion-scope
```

Il comando non usa Supabase, non usa service role, non legge `.env.local`, non fa fetch e non scrive DB.

## Scope result

| Item | Expected | Dry-run result | Status |
|---|---:|---:|---|
| Competition | 1 | 1 | Pass |
| Teams | 2 | 2 | Pass |
| Standings | 2 | 2 | Pass |

Candidate:

- `candidate_slug=manual-serie-a`
- `scope_matches_expected=true`
- `references_valid=true`
- `mapping_theoretical_possible=true`

## Promotion order

Ordine futuro obbligatorio:

1. Competition.
2. Teams.
3. Standings.

Motivo: teams e standings devono restare coerenti con la competition pubblica; le standings non devono essere pubbliche senza team pubblici.

## No-apply manual SQL instructions

```text
NO_APPLY_SQL_PLAN_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED
NO VISIBILITY CHANGE AUTHORIZED
```

Istruzioni logiche future, non eseguibili in Punto 60:

```text
1. Verificare su staging, non Production, che lo scope sia esattamente:
   - competition: manual-serie-a = 1
   - linked teams = 2
   - linked standings = 2

2. Solo dopo autorizzazione esplicita Punto 61, preparare SQL reviewed per:
   - impostare visibility public_free sulla competition candidata;
   - impostare visibility public_free sui teams collegati;
   - impostare visibility public_free sulle standings collegate.

3. Non usare wildcard non verificate.
4. Non toccare altre competition/team/standing.
5. Non attivare provider/import.
6. Non toccare Production.
```

## No-apply rollback instructions

```text
ROLLBACK_PLAN_ONLY
DO NOT APPLY
DO NOT RUN
NO DB WRITE AUTHORIZED
```

Rollback logico futuro:

1. Riportare le standings candidate da `public` a `private_admin`.
2. Riportare i teams candidati da `public` a `private_admin`.
3. Riportare la competition candidata da `public` a `private_admin`.

Rollback order:

```text
standings → teams → competition
```

## No-apply post-verification instructions

Dopo una futura promotion reale autorizzata:

Admin:

- verificare `visibility=public_free` su 1/2/2;
- verificare che i dati siano ancora leggibili in admin.

Public readers:

- `public_competitions_count=1`;
- `public_teams_count=2`;
- `public_standings_count=2`;
- `public_bundle_status=ready`.

Public routes:

- `/competitions` mostra la competition pubblica;
- `/competitions/manual-serie-a` mostra dettaglio pubblico;
- nessun dato extra `private_admin` visibile;
- nessun admin link;
- nessun debug/raw payload;
- nessun bottone operativo.

## Authorization gate

La promotion reale resta bloccata.

Richiederà una frase esplicita separata simile a:

```text
Autorizzo il Punto 61: promuovi a public la fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.
```

Qualsiasi generico “procedi”, “vai”, “continua”, “ok” non autorizza la DB write.

## Result markers

- `point_60_public_data_promotion_dry_run_created=true`
- `public_data_promotion_mode=dry_run_no_apply`
- `public_data_promotion_executed=false`
- `candidate_slug=manual-serie-a`
- `expected_competitions_count=1`
- `expected_teams_count=2`
- `expected_standings_count=2`
- `candidate_competitions_count=1`
- `candidate_teams_count=2`
- `candidate_standings_count=2`
- `scope_matches_expected=true`
- `promotion_sql_no_apply_prepared=true`
- `rollback_sql_no_apply_prepared=true`
- `post_promotion_verification_no_apply_prepared=true`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`

## P63 final pre-apply checklist

Punto 63 conferma lo stesso scope P60/P61/P62, ancora senza apply.

- `point_63_public_data_promotion_final_pre_apply_checklist_completed=true`
- `public_data_promotion_mode=final_pre_apply_no_write`
- `promotion_candidate=manual-serie-a`
- `expected_promotion_competitions_count=1`
- `expected_promotion_teams_count=2`
- `expected_promotion_standings_count=2`
- `current_public_competitions_count=0`
- `current_public_teams_count=0`
- `current_public_standings_count=0`
- `current_public_bundle_status=not_found`
- `public_routes_current_state=empty_not_found`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `service_role_used=false`


## P61 SQL/manual pack result

Punto 61 ha preparato il pack SQL/manuale finale, solo no-apply.

- `point_61_public_data_promotion_sql_manual_pack_created=true`
- `promotion_sql_pack_mode=no_apply`
- `promotion_sql_outline_prepared=true`
- `rollback_sql_outline_prepared=true`
- `post_verification_sql_outline_prepared=true`
- `requires_explicit_p62_authorization=true`
- `generic_proceed_authorizes_write=false`
- `public_data_promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`

Nessuna promotion è stata eseguita.

## P62 authorization review

Punto 62 ha chiuso la revisione autorizzativa per la futura promotion reale, senza eseguire SQL e senza DB write.

- `point_62_public_data_promotion_authorization_review_completed=true`
- `public_data_promotion_mode=authorization_review_no_write`
- `promotion_candidate=manual-serie-a`
- `expected_promotion_competitions_count=1`
- `expected_promotion_teams_count=2`
- `expected_promotion_standings_count=2`
- `explicit_authorization_required=true`
- `generic_proceed_authorizes_write=false`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
