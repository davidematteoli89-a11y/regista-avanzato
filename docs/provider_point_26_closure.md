# Punto 26 — Supabase Read-Only Access Investigation closure

Data: 2026-09-18  
Branch: `preview`

## Decisione finale

```text
Punto 26 completato.
È stata investigata la causa del blocco DB read-only.
Nessuna scrittura DB è stata eseguita.
Nessun service_role è stato usato.
Nessuna migrazione è stata modificata o creata.
Nessun SQL eseguibile è stato generato.
next_write_allowed resta false.
Il prossimo step consigliato è preparare una proposta no-write per view read-only oppure confermare manualmente da dashboard.
```

## Risultato

- direct table lookup result: `unknown`;
- public view lookup result: `unknown`;
- admin view lookup result: `not_attempted`;
- likely blocker: `rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access`;
- recommended resolution: `prepare_dedicated_read_only_lookup_view_proposal_or_manual_dashboard_select_check_no_write`;
- requires new read-only view: `true`;
- requires service role: `false`.

## Conferme sicurezza

- Nessun provider chiamato.
- Nessuna fetch provider.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun service role.
- Nessun Supabase admin client.
- Nessun token stampato.
- Nessun payload completo salvato.
- Nessuna migrazione modificata o creata.
- Nessun deploy.
- Production non toccata.
