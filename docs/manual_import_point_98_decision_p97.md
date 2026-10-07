# Manual Import Point 98 Decision — P97

## Context

P97 ha verificato in locale/preview le pagine editoriali statiche implementate in P96:

- `/manifesto`;
- `/rubriche`;
- homepage/navigazione/footer;
- `/competitions`;
- `/competitions/manual-serie-a`.

La verifica è passata senza modifiche codice, deploy, DB write, provider/import o Apify.

## Options

### A. P98 — Production editorial pages release gate

Obiettivo:

- preparare gate Production per portare le pagine editoriali da preview a main.

### B. P98 — More editorial page polish on preview

Obiettivo:

- fare un altro giro di UI/copy prima del release gate.

### C. P98 — Substack manual launch checklist

Obiettivo:

- preparare passaggi manuali finali Substack.

### D. P98 — Social/reel launch pack

Obiettivo:

- preparare contenuti social di lancio.

## Recommended decision

Decisione consigliata: A — Production editorial pages release gate, se P97 passa completamente.

## Markers

- `point_97_editorial_pages_preview_verification_completed=true`
- `p98_recommended=production_editorial_pages_release_gate`
- `generic_proceed_authorizes_deploy=false`
- `generic_proceed_authorizes_db_write=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
