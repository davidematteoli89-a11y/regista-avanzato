# Manual Asset Creation Execution — P113

## Scope

- manual asset creation execution tracking only;
- no automatic asset generation;
- no Canva/Figma API file creation;
- no publishing;
- no social publishing;
- no Substack publishing;
- no newsletter sending;
- no Substack creation;
- no Substack URL invention;
- no site integration;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P113 prepara l’esecuzione manuale degli asset grafici di Regista Avanzato in Canva/Figma. In questa esecuzione non sono stati forniti link Canva/Figma o file export reali, quindi gli asset restano `not_started` e lo stato resta `prepared_no_assets`.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P112 commit | `9dc9a8d7795253d7267c6e2eb0ae216be231d473` |
| Canva links available | `false` |
| Exports available | `false` |
| Assets generated in P113 | `false` |
| Publication ready | `false` |

## Execution priority

### Immediate priority

1. Carosello Manifesto
2. Carosello Rubriche
3. Cover primo articolo/newsletter
4. Stories lancio progetto
5. Reel cover Manifesto
6. Reel cover Rubriche

### Second priority

7. Quote card primo articolo
8. Story teaser primo articolo
9. Reel cover primo articolo
10. Template La mappa del weekend
11. Template Talento della settimana
12. Template Campionati nel radar

### Third priority

13. Template Video Radar
14. Template Il calcio si ripete
15. Template Storie fuori dal mainstream
16. Variante LinkedIn/PDF carousel
17. Variante newsletter header
18. Variante social preview sito

## Manual workflow

1. Aprire Canva/Figma.
2. Creare cartella/progetto `Regista Avanzato — Launch Assets`.
3. Impostare palette e font direction da P109.
4. Creare un master layout.
5. Creare Carosello Manifesto.
6. Creare Carosello Rubriche.
7. Creare Cover primo articolo/newsletter.
8. Creare Stories lancio progetto.
9. Creare Reel cover Manifesto e Rubriche.
10. Salvare versioni editabili.
11. Esportare PNG/JPG/MP4 solo se necessari.
12. Compilare tabella asset.
13. Non pubblicare nulla.
14. Non integrare link nel sito.
15. Non inserire URL Substack.

## Asset execution status policy

Stati consentiti:

- `not_started`
- `in_progress`
- `draft_ready`
- `needs_revision`
- `approved`
- `exported`
- `archived`

Regole:

- `assets_generated=false` se non esiste almeno un link/file reale.
- `assets_generated=partial_manual` se almeno un asset ha link editabile reale o export reale.
- `assets_generated=true` solo se tutti gli asset priorità 1 sono creati, revisionati ed esportati.
- Non usare `approved` o `exported` senza link editabile reale, export reale, quality review e rights check.

## Asset execution table

| ID | Asset | Priorità | Formato | Stato | Link editabile | Export | Revisione | Diritti | Note |
|---|---|---:|---|---|---|---|---|---|---|
| A01 | Carosello Manifesto | 1 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A02 | Carosello Rubriche | 1 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A03 | Cover primo articolo/newsletter | 1 | 1600x900 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A04 | Stories lancio progetto | 1 | 1080x1920 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A05 | Reel cover Manifesto | 1 | 1080x1920 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A06 | Reel cover Rubriche | 1 | 1080x1920 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A07 | Quote card primo articolo | 2 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A08 | Story teaser primo articolo | 2 | 1080x1920 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A09 | Reel cover primo articolo | 2 | 1080x1920 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A10 | Template La mappa del weekend | 2 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A11 | Template Talento della settimana | 2 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A12 | Template Campionati nel radar | 2 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A13 | Template Video Radar | 3 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A14 | Template Il calcio si ripete | 3 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A15 | Template Storie fuori dal mainstream | 3 | 1080x1350 | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A16 | Variante LinkedIn/PDF carousel | 3 | LinkedIn/PDF carousel | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A17 | Variante newsletter header | 3 | Newsletter header | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |
| A18 | Variante social preview sito | 3 | Social preview | `not_started` | non disponibile | non disponibile | pending | pending | Nessun link/file reale fornito. |

## Priority 1 review checklist

### Carosello Manifesto

- Titolo chiaro.
- Identità del progetto spiegata.
- Nessun betting.
- Nessun hype artificiale.
- CTA coerente.
- Leggibilità mobile verificata.

### Carosello Rubriche

- Rubriche corrette.
- Nessuna promessa non supportata.
- Coerenza con `/rubriche`.
- CTA coerente.

### Cover primo articolo/newsletter

- Titolo `Dove guardare quando tutti guardano altrove` o variante coerente.
- Visual editoriale.
- Nessun giocatore/logo non autorizzato.
- Formato 1600x900.

### Stories lancio progetto

- Safe area rispettata.
- Testo breve.
- Link solo a sito/manifesto/rubriche/competitions.
- Nessun URL Substack se non reale e verificato.

### Reel cover Manifesto/Rubriche

- Hook leggibile.
- Titolo forte.
- Nessuna imitazione di personaggi pubblici.
- Nessun elemento non autorizzato.

## Rights checklist

### Allowed

- Abstract graphics.
- Stylized pitch.
- Radar.
- Original tactical lines.
- Paper texture.
- Notebook.
- Canva/Figma licensed elements.
- Internally produced website screenshots.

### Not allowed

- Real players without license.
- Club logos.
- League logos.
- TV frames.
- Highlights.
- Google images.
- Third-party watermarks.
- Unauthorized music.

## Publication readiness

`publication_ready=false` finché non sono veri tutti questi punti:

- Substack creato.
- URL Substack verificato.
- Asset priorità 1 creati, revisionati ed esportati.
- Newsletter zero caricata.
- About/welcome approvati.
- Checklist finale di pubblicazione presente.

## Markers

- `point_113_manual_asset_creation_execution_completed=true`
- `manual_asset_creation_execution_ready=true`
- `assets_generated=false`
- `asset_execution_status=prepared_no_assets`
- `canva_links_available=false`
- `exports_available=false`
- `priority_1_assets_ready=false`
- `publication_ready=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`
- `social_auto_published=false`
- `substack_auto_published=false`
- `p114_recommended=manual_asset_creation_with_links_or_substack_creation_with_real_url`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

## Stop conditions

Fermarsi e non dichiarare asset generati se:

- non esistono link editabili reali;
- non esistono export reali;
- manca quality review;
- manca rights check;
- l’URL Substack non è creato o verificato;
- serve pubblicare o integrare sul sito.
