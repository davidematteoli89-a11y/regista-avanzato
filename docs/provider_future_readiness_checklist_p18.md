# Punto 18 — Future provider readiness checklist

Stato: gate prima di qualsiasi nuova real-call/import.

## NO provider reali finché

Prima di qualunque retry o nuovo provider reale devono essere completati:

- account/piano/licenza provider chiariti;
- endpoint/base URL/header confermati da documentazione e dashboard;
- quota e rate limit confermati;
- costo massimo e hard stop definiti;
- una sola request autorizzata esplicitamente;
- output sanificato, senza payload completo;
- nessun token stampato o committato;
- `.env.local` ignorato e non staged;
- provider/import ancora off;
- `realWritesEnabled=false` resta default;
- nessun `service_role`;
- nessun DB write;
- `provider_import_runs` vuota o stato atteso verificato;
- `/admin/imports` read-only;
- rollback/cleanup plan scritto prima di qualunque writer reale;
- Production esclusa.

## Provider specifici

### TheStatsAPI / Stats API

Stato: sospeso. Non fare retry finché account/piano/key/base URL non sono chiariti.

### API-Football

Stato: sospeso/no retry. Resta fallback futuro solo con nuova readiness checklist.

### Apify / SofaScore

Stato: off. Qualunque run richiede budget guard, warning 24 €/mese, hard stop 30 €/mese e conferma dedicata.

## Dati consentiti

Fino a nuova decisione:

- manual data;
- mock data;
- fixture locali;
- dry-run senza fetch e senza DB write.
