# Manual Import Point 64 Decision — P63

Punto 63 non autorizza nessuna scrittura. La decisione per Punto 64 resta esplicita e separata.

## Option A — Real public data promotion apply, staging only

Obiettivo: eseguire davvero la promotion della fixture `manual-serie-a` in Supabase staging.

Condizioni obbligatorie:

- autorizzazione esplicita completa dell’utente;
- scope limitato a 1 competition / 2 teams / 2 standings;
- nessuna Production;
- nessun provider/import;
- nessun deploy;
- rollback e post-verification pronti;
- nessun service role lato app.

Frase richiesta:

> Autorizzo il Punto 64: esegui la promotion a public della fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.

## Option B — Continue public UI/product polish without promotion

Obiettivo: rimandare la promotion e continuare prodotto/UI mantenendo i dati `private_admin`.

Questa opzione mantiene:

- `promotion_executed=false`;
- `visibility_changed=false`;
- `db_write=false`;
- route pubbliche empty/not_found.

## Option C — Repeat admin browser verification

Obiettivo: ripetere la verifica browser admin reale se è disponibile una sessione admin.

Questa opzione non richiede:

- DB write;
- provider/import;
- deploy;
- Production.

## Recommended decision

Opzione A solo se arriva autorizzazione esplicita completa.

Opzione B se si vuole restare senza DB write.

Opzione C se si vuole chiudere prima il residuo browser/admin.

## P63 decision markers

- `point_63_public_data_promotion_final_pre_apply_checklist_completed=true`
- `explicit_authorization_required=true`
- `generic_proceed_authorizes_write=false`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
