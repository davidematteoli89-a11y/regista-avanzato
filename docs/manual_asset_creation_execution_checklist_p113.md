# Manual Asset Creation Execution Checklist — P113

## Scope and safety

- `manual_asset_creation_execution_ready=true`
- `assets_generated=false`
- `asset_execution_status=prepared_no_assets`
- `canva_links_available=false`
- `exports_available=false`
- `priority_1_assets_ready=false`
- `publication_ready=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `social_auto_published=false`
- `substack_auto_published=false`

P113 è chiuso come checklist/esecuzione manuale preparata. Nessun asset reale è stato creato o fornito in questa fase.

## Global checks

| Check | Status | Notes |
|---|---|---|
| Canva/Figma project created manually | `not_verified` | Nessun link reale fornito. |
| Editable links available | `false` | Non inventare link. |
| Exports available | `false` | Nessun PNG/JPG/MP4 reale fornito. |
| Priority 1 assets ready | `false` | Mancano link/export/review. |
| Rights checklist completed | `false` | Da fare dopo asset reali. |
| Publication ready | `false` | Substack non creato/confermato. |
| Social auto-published | `false` | Nessuna pubblicazione automatica. |
| Substack auto-published | `false` | Nessun invio newsletter. |
| Site integration | `false` | Nessun link/asset integrato nel sito. |
| Code changed | `false` | Solo documentazione. |
| Deploy executed | `false` | Nessun deploy. |
| Production touched | `false` | Production non toccata. |
| DB write | `false` | Nessuna scrittura DB. |
| Provider/import enabled | `false` | Provider/import spenti. |
| Apify enabled | `false` | Apify spento. |

## Immediate priority checklist

| ID | Asset | Required before ready | Current status |
|---|---|---|---|
| A01 | Carosello Manifesto | Link editabile reale, export, review mobile, rights check | `not_started` |
| A02 | Carosello Rubriche | Link editabile reale, export, review rubriche, rights check | `not_started` |
| A03 | Cover primo articolo/newsletter | Link editabile reale, export 1600x900, review titolo/visual, rights check | `not_started` |
| A04 | Stories lancio progetto | Link editabile reale, export 1080x1920, safe area, no Substack URL inventato | `not_started` |
| A05 | Reel cover Manifesto | Link editabile reale, export 1080x1920, hook leggibile, rights check | `not_started` |
| A06 | Reel cover Rubriche | Link editabile reale, export 1080x1920, hook leggibile, rights check | `not_started` |

## Second priority checklist

| ID | Asset | Current status |
|---|---|---|
| A07 | Quote card primo articolo | `not_started` |
| A08 | Story teaser primo articolo | `not_started` |
| A09 | Reel cover primo articolo | `not_started` |
| A10 | Template La mappa del weekend | `not_started` |
| A11 | Template Talento della settimana | `not_started` |
| A12 | Template Campionati nel radar | `not_started` |

## Third priority checklist

| ID | Asset | Current status |
|---|---|---|
| A13 | Template Video Radar | `not_started` |
| A14 | Template Il calcio si ripete | `not_started` |
| A15 | Template Storie fuori dal mainstream | `not_started` |
| A16 | Variante LinkedIn/PDF carousel | `not_started` |
| A17 | Variante newsletter header | `not_started` |
| A18 | Variante social preview sito | `not_started` |

## Manual execution guardrails

- Non pubblicare social.
- Non pubblicare Substack.
- Non inviare newsletter.
- Non inserire URL Substack se non reale e verificato.
- Non integrare asset nel sito.
- Non usare immagini giocatori/loghi/TV frame non autorizzati.
- Non usare contenuti betting.
- Non usare prompt o visual che imitano persone pubbliche.
- Non dichiarare `approved` senza review.
- Non dichiarare `exported` senza file export reale.

## P114 recommended next step

`p114_recommended=manual_asset_creation_with_links_or_substack_creation_with_real_url`

P114 può chiudere una delle due cose:

1. asset manuali con link Canva/Figma o export reali;
2. creazione Substack con URL reale e verificato.
