# Manual Import Point 90 Decision — from P89

## Options

### A. P90 — Merge preview to main + Production polish deploy

Obiettivo: rilasciare in Production il public product polish, solo dopo autorizzazione esplicita.

### B. P90 — More public polish on preview

Obiettivo: rimandare Production e fare un altro giro UI/copy.

### C. P90 — Editorial content plan

Obiettivo: pianificare i primi contenuti editoriali.

### D. P90 — Continue monitoring only

Obiettivo: fermarsi e continuare monitoraggio.

## Recommended decision

Decisione consigliata: A, solo se l’utente autorizza esplicitamente con commit e scope.

Frase richiesta:

```text
Autorizzo il Punto 90: esegui il merge controllato di preview su main e il deploy Production del public product polish di Regista Avanzato dal commit preview 8ec5be6b8087cacb559ed85796c30d17e4637f9f, senza attivare provider/import, senza Apify, senza DB write aggiuntive, senza modificare configurazioni Vercel, senza modificare env, senza modificare Root Directory e senza toccare dati fuori scope.
```

## Safety markers

- `point_89_production_polish_release_gate_completed=true`
- `p90_requires_explicit_authorization=true`
- `production_deploy_authorized=false`
- `merge_authorized=false`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
