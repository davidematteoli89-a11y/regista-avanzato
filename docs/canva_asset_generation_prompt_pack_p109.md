# Canva Asset Generation Prompt Pack — P109

## Scope

- prompt/brief pack only;
- no asset generation;
- no Canva/Figma file creation;
- no publishing;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P109 prepara i prompt e i brief per produrre manualmente asset grafici di Regista Avanzato in Canva/Figma. Nessun asset è stato generato in questa fase.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P108 commit | `a1def9d1ad0e76e1e7c27128b607a92384a1868e` |
| Substack created | `false` |
| Assets generated | `false` |
| Publishing status | `not_started` |

## Visual brief

### Direction

Regista Avanzato deve avere un’identità visuale:

- editoriale;
- calcistica;
- pulita;
- matura;
- non betting;
- non meme page;
- non eccessivamente corporate;
- vicina a una rivista sportiva moderna;
- costruita su dati + racconto + campo + radar.

Mood sintetico:

> rivista calcistica indipendente + osservatorio tattico/narrativo.

### Recommended visual elements

- campo da calcio stilizzato;
- radar e linee di osservazione;
- mappe semplificate;
- taccuino/scouting notebook;
- linee tattiche;
- texture carta leggera;
- griglie editoriali;
- screenshot del sito;
- typography forte;
- box dati semplici.

### Elements to avoid

- loghi club non autorizzati;
- immagini giocatori senza licenza;
- frame TV;
- highlights non autorizzati;
- estetica betting;
- eccesso di neon;
- grafiche confusionarie;
- claim iperbolici;
- URL Substack non confermati.

## Palette and font direction

### Palette

- Base: navy scuro o antracite.
- Testi: bianco o panna per leggibilità.
- Accento principale: verde campo o verde radar.
- Accento secondario: arancio/rosso tenue per highlight.
- Dati secondari: grigio freddo.

### Font direction

- Titolo: sans serif forte, editoriale, leggibile.
- Corpo: sans serif pulito.
- Numeri/dati: mono o semi-mono se disponibile.
- Evitare font troppo sportivi, gaming o betting.

Nota: non distribuire font proprietari. Usare font disponibili in Canva/Figma o equivalenti.

## Canva prompt — Manifesto carousel

### Format

- 1080x1350 px.
- 7 slide.
- Instagram carousel, adattabile LinkedIn.
- Stile: editoriale, scuro, pulito, leggibile mobile.

### Slide plan

| Slide | Main text | Secondary text | Visual | Layout | CTA |
|---|---|---|---|---|---|
| 1 | Perché nasce Regista Avanzato | Il calcio interessante non vive solo dove guardano tutti. | Campo stilizzato + radar centrale | Titolo grande, logo/testo piccolo in basso | — |
| 2 | Guardiamo tutti lo stesso calcio | Il problema non è la scarsità. È la direzione dello sguardo. | Fasci di luce verso pochi punti della mappa | Frase grande + nota laterale | — |
| 3 | Il calcio fuori dal mainstream non è minore | È meno illuminato, non meno interessante. | Mappa semplificata con marker | Due blocchi: tesi + esempio astratto | — |
| 4 | Dati, storie, contesto | Il dato apre una porta, non chiude il racconto. | Box dati + taccuino + linea campo | Tre card verticali | — |
| 5 | No pronostici. No hype facile. | Da guardare non significa da scommettere. | Segnali “no betting/no hype” grafici, non aggressivi | Contrasto alto, messaggio netto | — |
| 6 | Da dove partire | Manifesto, Rubriche, Competizioni. | Screenshot sito o tre card link | Layout a tre riquadri | Leggi sul sito |
| 7 | Guarda dove gli altri arrivano dopo | Regista Avanzato: dati essenziali, storie e contesto. | Radar aperto + campo astratto | Chiusura ampia, CTA centrale | Manifesto / Rubriche |

### Prompt unico

```text
Crea un carosello editoriale 1080x1350 per Regista Avanzato, progetto calcistico narrativo sul calcio fuori dal mainstream. Stile rivista sportiva moderna, pulito, maturo, non betting, non meme page. Palette: navy/antracite, bianco/panna, verde campo/radar, accento arancio tenue, grigi per dati secondari. Usa elementi visuali originali: campo stilizzato, linee radar, mappe semplificate, taccuino scouting, griglie editoriali, box dati semplici. Non usare loghi club, immagini giocatori, frame TV, highlights o clip non autorizzate. Non inserire URL Substack.

Formato: 7 slide 1080x1350.
Slide 1: "Perché nasce Regista Avanzato" / "Il calcio interessante non vive solo dove guardano tutti."
Slide 2: "Guardiamo tutti lo stesso calcio" / "Il problema non è la scarsità. È la direzione dello sguardo."
Slide 3: "Il calcio fuori dal mainstream non è minore" / "È meno illuminato, non meno interessante."
Slide 4: "Dati, storie, contesto" / "Il dato apre una porta, non chiude il racconto."
Slide 5: "No pronostici. No hype facile." / "Da guardare non significa da scommettere."
Slide 6: "Da dove partire" / "Manifesto, Rubriche, Competizioni."
Slide 7: "Guarda dove gli altri arrivano dopo" / "Regista Avanzato: dati essenziali, storie e contesto." CTA: "Leggi Manifesto e Rubriche".

Mantieni testi molto leggibili su mobile, molto spazio negativo, gerarchia tipografica forte e nessun claim iperbolico.
```

## Canva prompt — Rubriche carousel

### Format

- 1080x1350 px.
- 8 slide.
- Stile coerente con Manifesto carousel.

### Slide plan

| Slide | Text | Visual | Layout | CTA |
|---|---|---|---|---|
| 1 | Le rubriche di Regista Avanzato | Griglia editoriale + radar | Cover | — |
| 2 | Campionati nel radar | Leghe e contesti da osservare oltre il centro della conversazione. | Mappa + marker | Card rubrica | — |
| 3 | Talento della settimana | Profili sobri, anti-hype, da osservare senza incoronare. | Taccuino scouting | Card rubrica | — |
| 4 | La mappa del weekend | Una bussola per scegliere cosa guardare. Non una schedina. | Calendario astratto + campo | Card rubrica | — |
| 5 | Il calcio si ripete | Memoria, ricorrenze e tracce del passato nel presente. | Timeline minimale | Card rubrica | — |
| 6 | Video Radar | Solo video ufficiali, embed permessi o contenuti propri. | Player grafico + badge official | Card rubrica | — |
| 7 | Storie fuori dal mainstream | Club, città, tifoserie e percorsi lontani dal rumore. | Mappa/testura carta | Card rubrica | — |
| 8 | Scegli da dove iniziare | Manifesto, Rubriche, Competizioni. | Tre pulsanti/card | Scopri le rubriche |

### Prompt unico

```text
Crea un carosello 1080x1350 in 8 slide per presentare "Le rubriche di Regista Avanzato". Stile editoriale sportivo moderno, pulito, maturo, con palette navy/antracite, panna, verde radar e accento arancio tenue. Usa grafiche originali: mappe semplificate, campo stilizzato, linee tattiche, taccuino scouting, timeline, player video astratto. Non usare loghi club, immagini giocatori, frame TV, clip non autorizzate, estetica betting o URL Substack.

Slide 1: "Le rubriche di Regista Avanzato".
Slide 2: "Campionati nel radar" / "Leghe e contesti da osservare oltre il centro della conversazione."
Slide 3: "Talento della settimana" / "Profili sobri, anti-hype, da osservare senza incoronare."
Slide 4: "La mappa del weekend" / "Una bussola per scegliere cosa guardare. Non una schedina."
Slide 5: "Il calcio si ripete" / "Memoria, ricorrenze e tracce del passato nel presente."
Slide 6: "Video Radar" / "Solo video ufficiali, embed permessi o contenuti propri."
Slide 7: "Storie fuori dal mainstream" / "Club, città, tifoserie e percorsi lontani dal rumore."
Slide 8: "Scegli da dove iniziare" / CTA: "Manifesto · Rubriche · Competizioni".

Mantieni ogni slide leggibile su mobile con titolo forte, sottotitolo breve e un visual ricorrente distintivo.
```

## Canva prompt — First article asset set

Tema: “Dove guardare quando tutti guardano altrove”.

### Asset plan

| Asset | Format | Main text | Secondary text | Visual | CTA | Export |
|---|---:|---|---|---|---|---|
| Cover articolo/newsletter | 1600x900 | Dove guardare quando tutti guardano altrove | Una guida al metodo Regista Avanzato | Campo/mappa/radar | Leggi il contenuto | JPG/PNG |
| Cover social | 1080x1350 | Dove guardare quando tutti guardano altrove | Dati, storie e contesto | Layout magazine | Manifesto/Rubriche | PNG |
| Story teaser | 1080x1920 | Dove guardare quando tutti guardano altrove? | Il primo contenuto editoriale operativo | Mappa verticale + marker | Swipe/link sito | PNG |
| Reel cover | 1080x1920 | Guardiamo tutti lo stesso calcio? | Regista Avanzato | Screenshot sito sfumato + radar | Leggi il Manifesto | PNG |
| Quote card | 1080x1350 | Il dato apre una porta, non chiude il racconto. | Regista Avanzato | Taccuino/lavagna tattica | — | PNG |

### Prompt unico

```text
Crea una serie coordinata di asset per il primo articolo di Regista Avanzato: "Dove guardare quando tutti guardano altrove". Stile: rivista calcistica indipendente, editoriale, pulito, maturo, non betting. Palette: navy/antracite, panna, verde radar/campo, accento arancio tenue, grigi dati. Visual originali: campo stilizzato, radar, mappa astratta, griglia editoriale, taccuino scouting, linee tattiche. Non usare loghi club, giocatori reali, frame TV, highlights, clip o immagini non autorizzate. Non inserire URL Substack.

Genera brief per 5 asset:
1. Cover articolo/newsletter 1600x900: titolo "Dove guardare quando tutti guardano altrove", sottotitolo "Una guida al metodo Regista Avanzato".
2. Cover social 1080x1350: titolo forte, sottotitolo "Dati, storie e contesto".
3. Story teaser 1080x1920: "Dove guardare quando tutti guardano altrove?", visual verticale con mappa/radar, CTA verso sito.
4. Reel cover 1080x1920: hook "Guardiamo tutti lo stesso calcio?", sottotitolo "Regista Avanzato".
5. Quote card 1080x1350: citazione "Il dato apre una porta, non chiude il racconto." con firma Regista Avanzato.

Mantieni coerenza tra asset, testi leggibili su mobile, safe area per stories/reel e nessun claim iperbolico.
```

## Canva prompt — Stories pack

### Format

- 1080x1920 px.
- 6 frame.
- Safe area rispettata.
- Nessun URL Substack.
- Usare solo link sito, Manifesto, Rubriche, Competitions.

### Frame plan

| Frame | Text | Sticker/CTA | Visual | Layout notes |
|---|---|---|---|---|
| 1 | Nasce Regista Avanzato | Visita il sito | Cover verticale con radar | Testo centrale, logo/testo basso |
| 2 | Perché nasce | Guardiamo oltre il centro del racconto | Fasci luce / mappa | Titolo alto, frase breve |
| 3 | Manifesto online | Leggi il Manifesto | Screenshot/cover manifesto | Link sticker a Manifesto |
| 4 | Rubriche online | Scopri le Rubriche | Card rubrica | Link sticker a Rubriche |
| 5 | Newsletter in arrivo | Nessun URL ancora: seguici dal sito | Mockup newsletter senza URL | Evidenziare “in arrivo” |
| 6 | Da dove partire | Manifesto · Rubriche · Competizioni | Tre card link | CTA finale |

### Prompt unico

```text
Crea un pack di 6 stories verticali 1080x1920 per Regista Avanzato. Stile editoriale calcistico moderno: navy/antracite, panna, verde radar, accento arancio tenue. Usa campo stilizzato, linee radar, mappa astratta, screenshot sito se disponibili, card editoriali. Non usare URL Substack, loghi club, immagini giocatori, frame TV, clip non autorizzate o grafica betting. Rispetta safe area per Instagram stories.

Frame 1: "Nasce Regista Avanzato" / CTA "Visita il sito".
Frame 2: "Perché nasce" / "Guardiamo oltre il centro del racconto".
Frame 3: "Manifesto online" / CTA "Leggi il Manifesto".
Frame 4: "Rubriche online" / CTA "Scopri le Rubriche".
Frame 5: "Newsletter in arrivo" / "Nessun URL ancora: seguici dal sito".
Frame 6: "Da dove partire" / "Manifesto · Rubriche · Competizioni".

Mantieni testi brevi, gerarchia chiara, spazio per sticker/link e nessun claim betting o hype.
```

## Canva prompt — Reel cover pack

### Cover plan

| Cover | Format | Hook | Subtitle | Visual | CTA |
|---|---:|---|---|---|---|
| Reel Manifesto | 1080x1920 | Guardiamo tutti lo stesso calcio? | Perché nasce Regista Avanzato | Campo scuro + radar | Leggi il Manifesto |
| Reel Rubriche | 1080x1920 | Sei modi per guardare meglio | Le rubriche di Regista Avanzato | Sei card/minimap | Scopri le Rubriche |
| Reel Primo articolo | 1080x1920 | Dove guardare quando tutti guardano altrove | Dati, storie e contesto | Mappa verticale + marker | Leggi sul sito |

### Prompt unico

```text
Crea 3 cover reel 1080x1920 per Regista Avanzato. Stile editoriale, calcistico, maturo, non betting, non gaming. Palette navy/antracite, panna, verde radar, accento arancio tenue. Usa visual originali: campo stilizzato, radar, linee tattiche, mappe astratte, card editoriali. Non usare clip partita, frame TV, giocatori reali, loghi club o immagini non autorizzate. Lascia safe area centrale leggibile.

Cover 1 Reel Manifesto: hook "Guardiamo tutti lo stesso calcio?", sottotitolo "Perché nasce Regista Avanzato", CTA "Leggi il Manifesto".
Cover 2 Reel Rubriche: hook "Sei modi per guardare meglio", sottotitolo "Le rubriche di Regista Avanzato", CTA "Scopri le Rubriche".
Cover 3 Reel Primo articolo: hook "Dove guardare quando tutti guardano altrove", sottotitolo "Dati, storie e contesto", CTA "Leggi sul sito".
```

## Canva prompt — Future rubric templates

### Template plan

| Template | Main format | Story variant | Fields | Recurring visual |
|---|---:|---:|---|---|
| La mappa del weekend | 1080x1350 | 1080x1920 | titolo, 3 partite da seguire, nota no pronostico, CTA | calendario + campo |
| Talento della settimana | 1080x1350 | 1080x1920 | nome, ruolo, club se autorizzato, cosa osservare, rischio hype | taccuino scouting |
| Campionati nel radar | 1080x1350 | 1080x1920 | campionato, perché ora, squadre/temi, link | mappa + marker |
| Video Radar | 1080x1350 | 1080x1920 | titolo video, fonte ufficiale, perché guardarlo, nota diritti | player grafico |
| Il calcio si ripete | 1080x1350 | 1080x1920 | evento, passato/presente, cosa insegna, fonti | timeline |
| Storie fuori dal mainstream | 1080x1350 | 1080x1920 | titolo storia, luogo, contesto, CTA | texture carta + mappa |

### Prompt unico

```text
Crea un set di template grafici riutilizzabili per le rubriche future di Regista Avanzato. Ogni template deve avere formato principale 1080x1350 e variante story 1080x1920. Stile coerente: rivista calcistica indipendente, pulita, matura, non betting. Palette navy/antracite, panna, verde radar, accento arancio tenue. Usa grafiche originali, campi stilizzati, mappe astratte, taccuini, timeline, player grafici. Non usare loghi club, immagini giocatori, frame TV, highlights o URL Substack.

Template 1: "La mappa del weekend" con campi titolo, 3 partite da seguire, nota "non pronostico", CTA.
Template 2: "Talento della settimana" con campi nome, ruolo, contesto, cosa osservare, rischio hype.
Template 3: "Campionati nel radar" con campi campionato, perché ora, squadre/temi, link.
Template 4: "Video Radar" con campi titolo video, fonte ufficiale, perché guardarlo, nota diritti.
Template 5: "Il calcio si ripete" con campi evento, passato/presente, cosa insegna, fonti.
Template 6: "Storie fuori dal mainstream" con campi titolo, luogo, contesto, CTA.

Ogni template deve essere editabile, leggibile su mobile, con placeholder chiari e nessun dato live inventato.
```

## Export and naming

### Export

Instagram carousel:

- PNG singole slide;
- eventuale PDF per LinkedIn;
- 1080x1350 px.

Stories/Reel:

- PNG/JPG per statiche;
- MP4 H.264 se video;
- 1080x1920 px.

Newsletter/cover:

- PNG/JPG;
- 1600x900 px;
- 1200x675 px come variante social.

### Naming

Formato:

```text
regista-avanzato_<asset>_<tema>_<slide/versione>_<formato>_<data>
```

Esempi:

- `regista-avanzato_carosello_manifesto_s01_1080x1350_2026-10.png`
- `regista-avanzato_story_lancio_s03_1080x1920_2026-10.png`
- `regista-avanzato_reel-cover_rubriche_v01_1080x1920_2026-10.png`
- `regista-avanzato_cover_articolo_dove-guardare_v01_1600x900_2026-10.png`

## Asset review checklist

Prima di usare o pubblicare gli asset:

- [ ] testi corretti;
- [ ] nessun refuso;
- [ ] leggibilità mobile;
- [ ] contrasto sufficiente;
- [ ] safe area rispettata;
- [ ] link corretti;
- [ ] nessun URL Substack inventato;
- [ ] nessun logo club non autorizzato;
- [ ] nessuna immagine giocatore non autorizzata;
- [ ] nessuna clip TV;
- [ ] nessun claim betting/pronostico;
- [ ] nessun hype eccessivo;
- [ ] coerenza visuale;
- [ ] export corretto;
- [ ] file nominati correttamente;
- [ ] versione editabile salvata.

## Safety

- no assets generated;
- no automatic publishing;
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

- `point_109_canva_asset_generation_prompt_pack_completed=true`
- `canva_asset_generation_prompt_pack_ready=true`
- `assets_generated=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `social_auto_published=false`
- `substack_auto_published=false`
- `p110_recommended=canva_asset_generation_or_substack_creation_manual_execution`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
