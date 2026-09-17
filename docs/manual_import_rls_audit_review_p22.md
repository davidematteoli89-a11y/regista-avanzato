# Punto 22 — Manual import RLS/audit review

Stato: review teorica, senza policy changes e senza DB write.

## Tabelle coinvolte future

Un futuro import manuale staging toccherebbe potenzialmente:

- `competitions`;
- `teams`;
- `standings`;
- `provider_import_logs` o `import_logs`;
- eventualmente `provider_import_runs`, se si decide di collegare batch id.

## Ruoli futuri

Il futuro import dovrebbe essere eseguito solo da percorso admin/staging controllato.

Da verificare prima di qualunque write:

- admin approvato;
- eventuale editor solo read-only o escluso dalle write;
- free_user/non autenticato esclusi.

## Service role

Il `service_role` non deve essere usato nell'app o nella UI.

Qualunque write futura deve avere percorso server-side controllato, auditabile e autorizzato, oppure essere eseguita manualmente con procedura separata esplicitamente approvata.

## Audit richiesto

Registrare almeno:

- batch id;
- approvatore;
- ambiente;
- file fixture usati;
- checksum fixture;
- counts planned/create/update/skip;
- errori;
- rollback reference;
- timestamp;
- conferma no provider reali;
- conferma no Production.

## Blocchi attivi finché non autorizzato

- no Production;
- no provider reali;
- no import button;
- no server action write;
- no sync/save/delete button;
- no DB write;
- no `db push/reset`;
- no migration changes.

## Stato Punto 22

Nessuna RLS/policy viene modificata.

Nessun audit log reale viene scritto.

Questa review serve solo come gate per eventuale Punto 23.
