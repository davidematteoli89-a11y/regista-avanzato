# Manual Import Point 107 Decision — P106

## Context

P106 ha preparato la checklist manuale per la prima pubblicazione editoriale di Regista Avanzato.

Sono stati definiti strategia di pubblicazione, checklist pre-pubblicazione, checklist Substack, checklist social, scenari operativi e monitoraggio post-pubblicazione.

Non sono stati pubblicati contenuti, non sono stati generati asset, non sono stati inseriti URL Substack inventati e non sono state fatte modifiche codice, merge, deploy, DB write, provider/import o Apify.

`substack_url_status=not_created_or_not_confirmed`.

## Opzioni P107

### A. P107 — Canva asset generation prompt pack

Obiettivo: preparare prompt/brief finali per creare gli asset grafici in Canva/Figma.

Usare se gli asset non sono ancora prodotti.

### B. P107 — Substack URL integration gate

Obiettivo: se l’URL Substack reale è disponibile, preparare integrazione link dal sito/social.

Usare solo quando l’URL reale Substack è disponibile e verificato.

### C. P107 — Manual publication execution checklist

Obiettivo: preparare la checklist finale di esecuzione manuale della pubblicazione, da usare il giorno stesso.

Usare se asset e URL sono già pronti e si vuole pubblicare.

### D. P107 — Monitoring only

Obiettivo: fermarsi e monitorare.

## Decisione consigliata

Decisione consigliata: A — P107 Canva asset generation prompt pack, se gli asset non sono ancora prodotti.

Alternativa: B — Substack URL integration gate, solo se l’URL reale Substack è disponibile.

## Safety marker

- `p107_recommended=substack_url_or_canva_asset_generation_gate`
- `substack_url_status=not_created_or_not_confirmed`
- `assets_generated=false`
- `social_auto_published=false`
- `substack_auto_published=false`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
