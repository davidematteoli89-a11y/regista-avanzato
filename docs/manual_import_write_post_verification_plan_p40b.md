# Punto 40-B — Manual import post-write verification plan no-apply

## Scope

Piano di verifica futura post-write, solo read-only. Non autorizza write, provider/import, deploy o Production.

## Verifiche future

Dopo un eventuale futuro write autorizzato, verificare solo con controlli read-only:

- competition creata: `1`;
- teams create: `2`;
- standings create: `2`;
- relazioni competition/team/standings coerenti;
- view read-only aggiornate;
- `/admin/imports` mostra conteggi attesi;
- provider/import ancora spenti;
- Apify ancora off;
- Production intatta.

## Query policy

- solo `SELECT`;
- nessun `INSERT`;
- nessun `UPDATE`;
- nessun `DELETE`;
- nessun `UPSERT`;
- nessun `service_role`;
- nessun provider/fetch.

## Expected post-write result futuro

- competitions_rows_created: `1`;
- teams_rows_created: `2`;
- standings_rows_created: `2`;
- total_rows_created: `5`;
- conflict_count: `0`;
- unresolved_count: `0`;
- provider_fetch: `false`;
- production_touched: `false`.
