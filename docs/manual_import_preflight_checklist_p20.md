# Punto 20 — Manual import preflight checklist

Stato: checklist futura, non eseguita.

Prima di qualunque futuro import manuale devono essere veri tutti questi punti:

- [ ] Fixture validate.
- [ ] `references_valid=true`.
- [ ] `mapping_theoretical_possible=true`.
- [ ] Schema target confermato su staging.
- [ ] Ambiente staging confermato.
- [ ] Production esclusa.
- [ ] Backup pronto.
- [ ] Rollback pronto.
- [ ] Audit log pronto.
- [ ] RLS verificata.
- [ ] Utente approvatore identificato.
- [ ] Operazioni pianificate confermate.
- [ ] Nessun provider reale coinvolto.
- [ ] Nessun Apify/SofaScore.
- [ ] Nessuna real-call.
- [ ] Scrittura DB autorizzata esplicitamente.
- [ ] Dry-run import plan passato.
- [ ] Secret scan passato.
- [ ] `.env.local` non staged.
- [ ] Nessun token stampato.
- [ ] Nessun `service_role` lato UI.

## Comando dry-run da eseguire prima del futuro import

```bash
npm run dry-run:manual-import-plan
```

Il comando deve restituire:

- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `blocked_real_execution=true`;
- `requires_explicit_approval=true`;
- `requires_staging_environment=true`;
- `requires_backup_plan=true`;
- `requires_rollback_plan=true`.

## Stop immediato se

- mapping non confermato;
- fixture non valida;
- ambiente non è staging;
- backup/rollback non pronto;
- qualunque provider reale viene coinvolto;
- qualunque codice tenta scritture DB senza autorizzazione.
