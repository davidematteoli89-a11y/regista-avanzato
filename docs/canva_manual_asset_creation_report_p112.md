# Canva Manual Asset Creation Report — P112

## Scope

- manual asset creation report only;
- no automatic asset generation;
- no Canva/Figma file creation through API;
- no publishing;
- no Substack creation;
- no Substack URL invention;
- no code change;
- no site integration;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P112 prepara il report operativo per registrare asset Canva/Figma creati manualmente. In questa esecuzione non sono stati forniti link Canva/Figma o file export reali, quindi il report resta predisposto e vuoto.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P111 commit | `b772f37fb21dbfbea39894c091f0613ffbd45e42` |
| Canva links available | `false` |
| Exports available | `false` |
| Publication ready | `false` |

## Asset report status policy

Se non ci sono link/file reali:

- `assets_generated=false`
- `asset_report_status=prepared_empty`
- `canva_links_available=false`
- `exports_available=false`

Se ci sono alcuni link/file reali:

- `assets_generated=partial_manual`
- `asset_report_status=partial`
- `canva_links_available=true/partial`
- `exports_available=true/partial`

Se tutti gli asset priorità 1 sono creati, revisionati ed esportati:

- `assets_generated=true`
- `asset_report_status=priority_1_complete`
- `canva_links_available=true`
- `exports_available=true`

Non segnare `approved`, `exported`, `partial_manual` o `true` senza link/file reali.

## Asset report table

Stati consentiti:

- `not_started`
- `in_progress`
- `draft_ready`
- `needs_revision`
- `approved`
- `exported`
- `archived`

| ID | Asset | Priorità | Formato | Link editabile | Export disponibile | Stato | Revisione | Diritti OK | Note |
|---|---|---:|---|---|---|---|---|---|---|
| A01 | Carosello Manifesto | 1 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A02 | Carosello Rubriche | 1 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A03 | Cover primo articolo/newsletter | 1 | 1600x900 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A04 | Stories lancio progetto | 1 | 1080x1920 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A05 | Reel cover Manifesto | 1 | 1080x1920 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A06 | Reel cover Rubriche | 1 | 1080x1920 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A07 | Quote card primo articolo | 2 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A08 | Story teaser primo articolo | 2 | 1080x1920 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A09 | Reel cover primo articolo | 2 | 1080x1920 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A10 | Template La mappa del weekend | 2 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A11 | Template Talento della settimana | 2 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A12 | Template Campionati nel radar | 2 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A13 | Template Video Radar | 3 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A14 | Template Il calcio si ripete | 3 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A15 | Template Storie fuori dal mainstream | 3 | 1080x1350 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A16 | Variante LinkedIn/PDF carousel | 3 | PDF / carousel | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A17 | Variante newsletter header | 3 | 1600x900 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |
| A18 | Variante social preview sito | 3 | 1200x675 | non disponibile | no | `not_started` | pending | pending | Nessun link/file reale fornito. |

## Required fields after manual creation

Per ogni asset compilare:

- `link_editabile=`
- `export_folder=`
- `export_files=`
- `created_by=`
- `created_at=`
- `reviewed_by=`
- `reviewed_at=`
- `status=`
- `rights_check=`
- `mobile_check=`
- `notes=`

## Quality review checklist

Per ogni asset:

- [ ] testo coerente con manuale P107;
- [ ] testo senza refusi;
- [ ] leggibilità mobile;
- [ ] contrasto sufficiente;
- [ ] safe area rispettata;
- [ ] formato corretto;
- [ ] export corretto;
- [ ] naming corretto;
- [ ] CTA coerente;
- [ ] link corretti se presenti;
- [ ] nessun URL Substack inventato;
- [ ] nessun claim betting;
- [ ] nessun pronostico;
- [ ] nessun hype eccessivo;
- [ ] nessuna imitazione diretta di persone pubbliche;
- [ ] nessun logo club non autorizzato;
- [ ] nessuna immagine giocatore senza licenza;
- [ ] nessuna clip TV/highlight non autorizzata;
- [ ] nessun watermark di terzi;
- [ ] versione editabile salvata;
- [ ] export archiviato.

## Rights and source checklist

Consentito:

- grafiche astratte;
- campo stilizzato;
- radar;
- mappe semplificate;
- linee tattiche originali;
- taccuino/scouting notebook;
- screenshot del sito se creati internamente;
- elementi Canva/Figma con licenza corretta;
- icone generiche con licenza corretta.

Non consentito:

- loghi club non autorizzati;
- immagini giocatori reali senza licenza;
- frame TV;
- highlights non autorizzati;
- watermark terzi;
- foto prese da Google;
- immagini di agenzie stampa senza licenza;
- musica non autorizzata;
- clip con diritti TV.

## Missing assets

| Asset mancante | Priorità | Motivo | Blocco | Prossima azione |
|---|---:|---|---|---|
| Carosello Manifesto | 1 | da creare | link/export non disponibili | creare manualmente in Canva/Figma. |
| Carosello Rubriche | 1 | da creare | link/export non disponibili | creare manualmente in Canva/Figma. |
| Cover primo articolo/newsletter | 1 | da creare | link/export non disponibili | creare manualmente in Canva/Figma. |
| Stories lancio progetto | 1 | da creare | link/export non disponibili | creare manualmente in Canva/Figma. |
| Reel cover Manifesto | 1 | da creare | link/export non disponibili | creare manualmente in Canva/Figma. |
| Reel cover Rubriche | 1 | da creare | link/export non disponibili | creare manualmente in Canva/Figma. |
| Asset priorità 2 e 3 | 2/3 | da creare | link/export non disponibili | creare dopo priorità 1. |

## Publication readiness

Non si può passare a publication execution se:

- Substack non è creato;
- URL Substack non è verificato;
- asset priorità 1 non sono pronti;
- newsletter zero non è caricata;
- About/welcome email non sono approvati;
- non esiste checklist finale pubblicazione;
- ci sono asset con diritti non chiari.

Stato attuale:

- `publication_ready=false`

## Safety

- no assets automatically generated;
- no automatic publishing;
- no Substack created;
- no invented Substack URL;
- no unauthorized clips/images/logos;
- no provider calls;
- no code change;
- no merge;
- no deploy;
- no DB write;
- provider/import off;
- Apify off.

## Decision

Nessun link/file reale fornito in P112:

- `point_112_canva_manual_asset_creation_report_completed=true`
- `canva_manual_asset_creation_report_ready=true`
- `assets_generated=false`
- `asset_report_status=prepared_empty`
- `canva_links_available=false`
- `exports_available=false`
- `publication_ready=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`
- `social_auto_published=false`
- `substack_auto_published=false`
- `p113_recommended=manual_asset_creation_or_substack_creation_with_real_url`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
