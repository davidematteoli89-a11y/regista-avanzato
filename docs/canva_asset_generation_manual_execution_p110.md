# Canva Asset Generation Manual Execution — P110

## Scope

- manual asset execution planning/tracking only;
- no automatic asset generation;
- no Canva/Figma file creation through API;
- no publishing;
- no Substack creation;
- no Substack URL invention;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P110 prepara il documento operativo per eseguire manualmente la produzione degli asset grafici in Canva/Figma usando i prompt P109. In assenza di link/file reali forniti dall’utente, lo stato resta `assets_generated=false`.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P109 commit | `9b7cc9a220057b3458e0ce07512d82f3cb423342` |
| Canva/Figma files created in P110 | `false` |
| Assets generated in P110 | `false` |
| Publishing status | `not_started` |

## Asset priority plan

### Priorità 1 — Asset fondamentali lancio

1. Carosello Manifesto
2. Carosello Rubriche
3. Cover primo articolo/newsletter
4. Stories lancio progetto
5. Reel cover Manifesto
6. Reel cover Rubriche

### Priorità 2 — Asset supporto

7. Quote card primo articolo
8. Story teaser primo articolo
9. Reel cover primo articolo
10. Template “La mappa del weekend”
11. Template “Talento della settimana”
12. Template “Campionati nel radar”

### Priorità 3 — Asset futuri

13. Template “Video Radar”
14. Template “Il calcio si ripete”
15. Template “Storie fuori dal mainstream”
16. Variante LinkedIn/PDF carousel
17. Variante newsletter header
18. Variante social preview sito

## Tracking table

Stati consentiti:

- `not_started`
- `in_progress`
- `draft_ready`
- `needs_revision`
- `approved`
- `exported`
- `archived`

| ID | Asset | Priorità | Formato | Prompt sorgente | Stato | Link editabile | Export | Revisione | Note |
|---|---|---:|---|---|---|---|---|---|---|
| A01 | Carosello Manifesto | 1 | 7 slide, 1080x1350 | P109 Manifesto carousel | `not_started` | da compilare manualmente | da compilare manualmente | pending | Fondamentale lancio. |
| A02 | Carosello Rubriche | 1 | 8 slide, 1080x1350 | P109 Rubriche carousel | `not_started` | da compilare manualmente | da compilare manualmente | pending | Fondamentale lancio. |
| A03 | Cover primo articolo/newsletter | 1 | 1600x900 + 1200x675 | P109 First article asset set | `not_started` | da compilare manualmente | da compilare manualmente | pending | Tema “Dove guardare quando tutti guardano altrove”. |
| A04 | Stories lancio progetto | 1 | 6 frame, 1080x1920 | P109 Stories pack | `not_started` | da compilare manualmente | da compilare manualmente | pending | Nessun URL Substack. |
| A05 | Reel cover Manifesto | 1 | 1080x1920 | P109 Reel cover pack | `not_started` | da compilare manualmente | da compilare manualmente | pending | No clip partita. |
| A06 | Reel cover Rubriche | 1 | 1080x1920 | P109 Reel cover pack | `not_started` | da compilare manualmente | da compilare manualmente | pending | No loghi club. |
| A07 | Quote card primo articolo | 2 | 1080x1350 | P109 First article asset set | `not_started` | da compilare manualmente | da compilare manualmente | pending | Citazione editoriale. |
| A08 | Story teaser primo articolo | 2 | 1080x1920 | P109 First article asset set | `not_started` | da compilare manualmente | da compilare manualmente | pending | Link solo sito. |
| A09 | Reel cover primo articolo | 2 | 1080x1920 | P109 First article asset set | `not_started` | da compilare manualmente | da compilare manualmente | pending | Safe area obbligatoria. |
| A10 | Template “La mappa del weekend” | 2 | 1080x1350 + 1080x1920 | P109 Future rubric templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Nota “non pronostico”. |
| A11 | Template “Talento della settimana” | 2 | 1080x1350 + 1080x1920 | P109 Future rubric templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Anti-hype. |
| A12 | Template “Campionati nel radar” | 2 | 1080x1350 + 1080x1920 | P109 Future rubric templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Mappa/marker. |
| A13 | Template “Video Radar” | 3 | 1080x1350 + 1080x1920 | P109 Future rubric templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Solo fonti ufficiali/permessi. |
| A14 | Template “Il calcio si ripete” | 3 | 1080x1350 + 1080x1920 | P109 Future rubric templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Timeline. |
| A15 | Template “Storie fuori dal mainstream” | 3 | 1080x1350 + 1080x1920 | P109 Future rubric templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Texture carta/mappa. |
| A16 | Variante LinkedIn/PDF carousel | 3 | PDF / 1080x1350 | P109 carousel prompts | `not_started` | da compilare manualmente | da compilare manualmente | pending | Da generare da caroselli approvati. |
| A17 | Variante newsletter header | 3 | 1600x900 | P109 first article / stories | `not_started` | da compilare manualmente | da compilare manualmente | pending | Nessun Substack URL. |
| A18 | Variante social preview sito | 3 | 1200x675 | P109 first article / templates | `not_started` | da compilare manualmente | da compilare manualmente | pending | Uso futuro. |

## Manual execution workflow

1. Aprire Canva/Figma manualmente.
2. Creare progetto/cartella “Regista Avanzato — Launch Assets”.
3. Inserire palette e font direction da P109.
4. Creare master layout.
5. Creare carosello Manifesto.
6. Duplicare struttura per Rubriche.
7. Creare cover articolo/newsletter.
8. Creare stories.
9. Creare reel covers.
10. Creare template rubriche.
11. Controllare leggibilità mobile.
12. Controllare safe area.
13. Controllare diritti immagini/loghi/clip.
14. Esportare versioni.
15. Compilare tabella tracking con link/file.
16. Non pubblicare nulla.
17. Portare report al prossimo punto.

## Folder structure and naming

Struttura consigliata:

```text
Regista Avanzato — Launch Assets/
├── 00_brand/
├── 01_manifesto_carousel/
├── 02_rubriche_carousel/
├── 03_first_article/
├── 04_stories/
├── 05_reel_covers/
├── 06_rubric_templates/
├── 07_exports/
└── 08_archive/
```

Naming:

```text
regista-avanzato_<asset>_<tema>_<slide/versione>_<formato>_<data>
```

Esempi:

- `regista-avanzato_carosello_manifesto_s01_1080x1350_2026-10.png`
- `regista-avanzato_carosello_rubriche_s04_1080x1350_2026-10.png`
- `regista-avanzato_cover_articolo_dove-guardare_v01_1600x900_2026-10.png`
- `regista-avanzato_story_lancio_s03_1080x1920_2026-10.png`
- `regista-avanzato_reel-cover_manifesto_v01_1080x1920_2026-10.png`
- `regista-avanzato_template_mappa-weekend_v01_1080x1350_2026-10.png`

## Quality checklist

Per ogni asset verificare:

- [ ] testo coerente con P107;
- [ ] niente imitazione diretta di autori/personaggi pubblici;
- [ ] nessun refuso;
- [ ] leggibilità mobile;
- [ ] contrasto sufficiente;
- [ ] safe area rispettata;
- [ ] formato corretto;
- [ ] export corretto;
- [ ] naming corretto;
- [ ] CTA coerente;
- [ ] link sito corretti se presenti;
- [ ] nessun URL Substack inventato;
- [ ] nessun claim betting;
- [ ] nessun pronostico;
- [ ] nessun hype eccessivo;
- [ ] nessun logo club non autorizzato;
- [ ] nessuna immagine giocatore senza licenza;
- [ ] nessuna clip TV o highlight non autorizzata;
- [ ] nessun watermark terzi;
- [ ] versione editabile salvata;
- [ ] export archiviato.

## Prompt usage guide

Per ogni prompt P109:

- copiare il prompt in Canva/Figma/AI design tool;
- mantenere tono editoriale;
- sostituire solo elementi testuali se necessario;
- non aggiungere Substack URL;
- non aggiungere loghi club;
- non aggiungere foto giocatori se non autorizzate;
- preferire grafiche astratte/campo/radar/taccuino;
- controllare ogni testo prima dell’export;
- salvare versione editabile.

Se il tool genera immagini non coerenti:

- rigenerare;
- semplificare il prompt;
- usare layout manuale;
- non accettare elementi illegali, non autorizzati o incoerenti con Regista Avanzato.

## Asset status policy

- `assets_generated=false` se nessun asset reale è stato creato o linkato nel repository/documentazione.
- `assets_generated=partial_manual` solo se vengono forniti link/file reali manuali.
- `assets_generated=true` solo se tutti gli asset priorità 1 sono creati, revisionati ed esportati.

Stato P110:

- `assets_generated=false`

Motivo: nessun link/file reale Canva/Figma è stato fornito o creato in questa esecuzione.

## Stop conditions

Stop se:

- Canva/Figma produce loghi club non autorizzati;
- Canva/Figma produce immagini di giocatori reali senza licenza;
- compaiono clip TV/highlights;
- viene inserito un URL Substack inventato;
- si tenta pubblicazione social;
- si tenta pubblicazione Substack;
- si tenta modifica codice;
- si tenta deploy/merge;
- asset non leggibili da mobile;
- CTA non coerenti;
- mancano approvazioni finali.

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

- `point_110_canva_asset_generation_manual_execution_completed=true`
- `canva_asset_generation_manual_execution_ready=true`
- `assets_generated=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `social_auto_published=false`
- `substack_auto_published=false`
- `p111_recommended=canva_manual_asset_creation_or_substack_creation_manual_execution`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
