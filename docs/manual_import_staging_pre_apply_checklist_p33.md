# Punto 33 — Staging pre-apply checklist no-apply

Checklist futura da completare prima di un eventuale apply staging.

Stato attuale:

- no apply;
- no DB write;
- no `service_role`;
- no provider/API/Apify;
- no Production;
- `next_write_allowed=false`.

## Pre-apply checklist

- Migration draft revisionata.
- `blocking_issues_count=0`.
- `needs_review_count=3` risolti o accettati esplicitamente.
- File ancora fuori da `supabase/migrations` fino allo step autorizzato.
- Ambiente staging confermato.
- Production esclusa.
- Backup checklist completata.
- Rollback checklist completata.
- Autorizzazione esplicita utente ricevuta.
- Provider/API/Apify spenti.
- Import reali spenti.
- Nessun `service_role` nell’app.
- Nessun deploy Production.
- Dry-run passati.
- Typecheck passato.
- Writer guards confermati.
- `next_write_allowed=false` fino allo step di apply autorizzato.

## Decisione corrente

La checklist non è un’autorizzazione. Punto 33 prepara il gate, non lo attraversa.

## Punto 34 gate

Punto 34 ha formalizzato che:

- `explicit_user_authorization_received=false`;
- `point_35_blocked_without_explicit_authorization=true`;
- `ready_for_apply=false`;
- `next_write_allowed=false`.

Frasi generiche come “procedi”, “ok” o “continua” non autorizzano apply.

## Punto 35 follow-up

Autorizzazione esplicita ricevuta e checklist rivista.

Esito:

- real migration created: `true`;
- apply not executed: `true`;
- reason: `db push/reset vietato`;
- `next_write_allowed=false`.
