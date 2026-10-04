# Public Data Promotion Apply Safety Checklist — P66

- [x] Autorizzazione esplicita ricevuta.
- [x] Staging “Regista Avanzato” confermato.
- [x] Production non selezionata e non toccata.
- [x] Scope `manual-serie-a` confermato.
- [x] Scope 1 competition / 2 teams / 2 standings confermato.
- [x] Enum reale verificato.
- [x] Target corretto `public_free` usato.
- [x] Target invalido `public` abbandonato.
- [x] Apply manuale eseguito da SQL Editor staging.
- [x] Verifica post-apply: 1 / 2 / 2 su `public_free`.
- [x] Nessun provider/import.
- [x] Apify off.
- [x] Nessun deploy.
- [x] Nessun service role lato app.
- [x] Rollback file preparato.
- [x] Rollback non eseguito perché apply riuscito.

## Markers

- `point_66_public_data_promotion_apply_completed=true`
- `public_data_promotion_mode=real_apply_staging_only`
- `corrected_visibility=public_free`
- `old_invalid_visibility=public`
- `enum_verified=true`
- `promotion_executed=true`
- `real_sql_executed=true`
- `visibility_changed=true`
- `db_write=true`
- `rollback_file_created=true`
- `rollback_executed=false`
- `production_touched=false`
- `deploy_executed=false`
