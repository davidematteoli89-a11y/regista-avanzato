# Manual Import Point 110 Decision — P109

## Context

P109 ha preparato il Canva asset generation prompt pack di Regista Avanzato.

Il pacchetto contiene brief visuale, direzione palette/font, prompt per caroselli Manifesto/Rubriche, primo articolo, stories, reel cover, template rubriche future, regole export/naming e checklist revisione asset.

Non sono stati generati asset. Substack non è stato creato e non esiste ancora un URL reale confermato.

## P110 options

### A. P110 — Canva asset generation manual execution

Obiettivo: usare manualmente i prompt P109 per creare gli asset in Canva/Figma e documentare output, senza pubblicare.

Usare questa opzione se:

- la priorità è produrre visual per lancio, stories, reel e primi contenuti;
- si vuole restare senza pubblicazione automatica;
- non serve ancora URL Substack reale.

### B. P110 — Substack creation manual execution

Obiettivo: creare manualmente Substack e recuperare URL reale.

Usare questa opzione se:

- la priorità è aprire il canale newsletter;
- si vuole ottenere `substack_url_real`;
- About e welcome email P108 sono approvati.

### C. P110 — Substack URL integration gate

Obiettivo: integrare l’URL Substack reale in docs/sito/social.

Usare questa opzione solo se:

- Substack è già stato creato manualmente;
- l’URL reale è disponibile e verificato;
- l’integrazione è esplicitamente autorizzata.

### D. P110 — First publication execution day checklist

Obiettivo: checklist finale per pubblicare manualmente primo contenuto/newsletter/social.

Usare questa opzione solo se:

- asset pronti;
- Substack pronto o scelta canale alternativa definita;
- autorizzazione esplicita alla pubblicazione manuale.

## Recommended decision

- `p110_recommended=canva_asset_generation_or_substack_creation_manual_execution`

Scelta pratica:

- scegliere A se vuoi produrre prima gli asset;
- scegliere B se vuoi creare prima Substack;
- scegliere C solo se l’URL reale Substack è già disponibile.

## Safety markers

- `point_109_canva_asset_generation_prompt_pack_completed=true`
- `assets_generated=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `social_auto_published=false`
- `substack_auto_published=false`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
