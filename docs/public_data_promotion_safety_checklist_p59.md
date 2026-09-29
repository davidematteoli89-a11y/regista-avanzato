# Public Data Promotion Safety Checklist — P59

## Before promotion dry-run

- [x] Candidate scope definito.
- [x] Promotion order definito.
- [x] Rollback plan definito.
- [x] Post-verification plan definito.
- [x] No Production.
- [x] No deploy.
- [x] No provider/import.
- [x] No Apify.
- [x] Exact row scope atteso noto: 1/2/2.

## Before real promotion

- [ ] Autorizzazione esplicita ricevuta.
- [ ] SQL/rewrite scope controllato.
- [ ] Expected count 1/2/2 confermato.
- [ ] Rollback pronto.
- [ ] Post-verification pronta.
- [ ] Browser no-auth pronto.
- [ ] Admin verification pronta.
- [ ] Nessun deploy automatico.

## After real promotion

- [ ] Admin visibility verificata.
- [ ] Public readers 1/2/2 verificati.
- [ ] Public routes verificate.
- [ ] No extra `private_admin` exposure.
- [ ] Rollback non eseguito salvo necessità.
- [ ] Docs aggiornate.

## Current P59 status

- `public_data_promotion_mode=plan_only`
- `public_data_promotion_executed=false`
- `visibility_changed=false`
- `point_59_db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`


## P60 checklist update

- [x] Dry-run tecnico no-apply creato.
- [x] Scope 1/2/2 confermato da fixture locali.
- [x] Promotion SQL/manual instructions preparate solo no-apply.
- [x] Rollback SQL/manual instructions preparate solo no-apply.
- [x] Post-promotion verification plan preparato solo no-apply.
- [x] Nessuna DB write.
- [x] Nessun cambio visibility.
- [x] Nessun provider/import.
- [x] Nessun deploy.
- [x] Nessuna Production.
