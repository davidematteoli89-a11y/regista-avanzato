# Manual Import Point 109 Decision — P108

## Context

P108 ha preparato la checklist manuale per creare la pubblicazione Substack di Regista Avanzato.

Sono stati definiti identità, descrizioni, opzioni slug, policy URL, About page, welcome email, impostazioni consigliate, checklist caricamento newsletter zero, processo dopo URL reale e stop conditions.

Substack non è stato creato automaticamente. Nessuna newsletter è stata pubblicata o inviata. Nessun URL Substack è stato inventato.

## P109 options

### A. P109 — Substack URL integration gate

Obiettivo: dopo creazione manuale di Substack e URL reale, preparare integrazione link in docs/sito/social.

Usare questa opzione se:

- `substack_url_real` è disponibile;
- l’URL è stato aperto e verificato;
- è chiaro dove inserirlo;
- l’integrazione sito è esplicitamente autorizzata.

### B. P109 — Canva asset generation prompt pack

Obiettivo: preparare prompt e brief finali per creare asset grafici in Canva/Figma.

Usare questa opzione se:

- Substack non viene ancora creato;
- serve prima produrre visual per lancio, stories, reel o newsletter.

### C. P109 — First newsletter zero manual publication checklist

Obiettivo: preparare checklist finale per pubblicare manualmente la newsletter zero.

Usare questa opzione solo dopo:

- Substack creato;
- URL reale verificato;
- About e welcome email configurati;
- newsletter zero caricata in bozza;
- autorizzazione esplicita alla pubblicazione manuale.

### D. P109 — Monitoring only

Obiettivo: fermarsi e monitorare.

## Recommended decision

- `p109_recommended=substack_url_integration_gate_after_real_url`

Se l’URL reale non è ancora disponibile, alternativa consigliata:

- `p109_alternative=canva_asset_generation_prompt_pack`

## Safety markers

- `point_108_substack_creation_manual_checklist_completed=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_auto_published=false`
- `social_auto_published=false`
- `assets_generated=false`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
