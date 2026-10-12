# First Publication Manual Checklist — P106

## Scope

- manual publication planning only;
- no publishing;
- no social publishing;
- no Substack publishing;
- no asset generation;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P105 commit | `17f390fddff872cb9c7576745c191f11fd955a9d` |
| Assets status | `not_generated` |
| Publishing status | `not_started` |
| Production status | `stable_not_touched` |

## Publication strategy

### Flow without Substack URL

Usare questo flusso finché `substack_url_status=not_created_or_not_confirmed`.

1. Pubblicare manualmente il post lancio progetto sui canali social scelti.
2. Pubblicare stories con link a Manifesto/Rubriche.
3. Pubblicare Reel Manifesto solo se asset/video sono pronti e verificati.
4. Preparare Substack manualmente senza linkarlo pubblicamente.
5. Non inserire URL Substack finché non è reale e confermato.
6. Preparare P107 per URL Substack o produzione asset, in base allo stato operativo.

### Flow with confirmed Substack URL

Usare questo flusso solo quando l’URL reale Substack è disponibile e verificato.

1. Verificare URL Substack reale.
2. Pubblicare newsletter zero manualmente.
3. Copiare URL reale del post e URL reale della pubblicazione.
4. Pubblicare post social di annuncio.
5. Pubblicare stories con link Substack reale.
6. Preparare gate separato per eventuale integrazione sito/social permanente.

## General pre-publication checklist

### Contenuti

- [ ] Titolo controllato.
- [ ] Testo revisionato.
- [ ] CTA chiara.
- [ ] Tono coerente con Regista Avanzato.
- [ ] Nessun dato live inventato.
- [ ] Nessuna promessa eccessiva.
- [ ] Nessun riferimento a giocatori/partite non verificato.
- [ ] Nessun claim da scouting professionale certificato.
- [ ] Nessun contenuto betting/pronostici.
- [ ] Nessun “nuovo fenomeno” o paragone non supportato.

### Link

- [ ] Homepage testata: `https://regista-avanzato-rouge.vercel.app/`.
- [ ] Manifesto testato: `https://regista-avanzato-rouge.vercel.app/manifesto`.
- [ ] Rubriche testato: `https://regista-avanzato-rouge.vercel.app/rubriche`.
- [ ] Competitions testato: `https://regista-avanzato-rouge.vercel.app/competitions`.
- [ ] URL Substack non inserito se non confermato.
- [ ] Nessun placeholder rimasto.

### Asset

- [ ] Formati corretti.
- [ ] Export corretti.
- [ ] Leggibilità mobile verificata.
- [ ] Safe area stories/reel verificata.
- [ ] Naming file corretto.
- [ ] Versione editabile archiviata.
- [ ] Export finale archiviato.
- [ ] Asset marcati `ready_for_manual_review`, non `published`.

### Diritti

- [ ] Nessuna clip partita non autorizzata.
- [ ] Nessuna immagine giocatore/club senza licenza.
- [ ] Nessun logo club non autorizzato.
- [ ] Screenshot sito ok.
- [ ] Grafiche testuali ok.
- [ ] B-roll solo autorizzato/proprio.
- [ ] Audio reel autorizzato o interno/piattaforma.

## Substack manual checklist

### Prima

- [ ] Account creato.
- [ ] Nome pubblicazione corretto: `Regista Avanzato`.
- [ ] Descrizione corretta.
- [ ] About page pronta.
- [ ] Welcome email pronta.
- [ ] Impostazioni commenti decise.
- [ ] Paid non attivo salvo decisione futura.
- [ ] URL reale copiato e verificato.

### Newsletter

- [ ] Subject controllato.
- [ ] Preview text controllato.
- [ ] Corpo controllato.
- [ ] Link sito controllati.
- [ ] Immagini caricate se disponibili.
- [ ] Nessun URL placeholder.
- [ ] Nessun dato non verificato.
- [ ] Nessun asset senza diritti.

### Prima di premere publish

- [ ] Anteprima desktop.
- [ ] Anteprima mobile.
- [ ] Invio test se disponibile.
- [ ] Controllo link.
- [ ] Controllo footer.
- [ ] Controllo CTA.
- [ ] Stop se URL o contenuto non sono verificati.

### Dopo pubblicazione

- [ ] Copiare URL reale del post.
- [ ] Copiare URL reale Substack.
- [ ] Aggiornare docs in un punto successivo.
- [ ] Preparare post social di annuncio.
- [ ] Non aggiornare sito senza gate dedicato.

## Social manual checklist

### Instagram feed

- [ ] Copy selezionato.
- [ ] Carousel/asset selezionato.
- [ ] Caption controllata.
- [ ] Hashtag controllati.
- [ ] Link in bio/CTA coerente.
- [ ] Nessun link Substack se non confermato.
- [ ] Alt text se disponibile.

### Stories

- [ ] Ordine frame corretto.
- [ ] Link sticker a Manifesto/Rubriche o Substack reale se confermato.
- [ ] Safe area controllata.
- [ ] CTA chiara.
- [ ] Nessun placeholder.

### Reel

- [ ] Cover corretta.
- [ ] Hook chiaro.
- [ ] Sottotitoli/testo a schermo leggibili.
- [ ] Audio autorizzato.
- [ ] Nessuna clip match non autorizzata.
- [ ] Caption controllata.
- [ ] CTA coerente.

### LinkedIn/Facebook

- [ ] Tono coerente.
- [ ] Link funzionanti.
- [ ] Immagine/carosello corretto.
- [ ] CTA chiara.
- [ ] Nessun claim eccessivo.

## Operational order

### Scenario A — Substack non ancora creato

1. Pubblica post lancio progetto.
2. Pubblica stories Manifesto/Rubriche.
3. Pubblica Reel Manifesto.
4. Crea Substack manualmente.
5. Non inserire URL Substack finché non confermato.
6. Prepara gate P107 per URL Substack o asset generation.

### Scenario B — Substack creato ma non pubblicato

1. Verifica URL Substack.
2. Completa About/welcome email.
3. Carica newsletter zero.
4. Fai test/preview.
5. Pubblica newsletter zero manualmente.
6. Pubblica social di annuncio.
7. Prepara gate integrazione link.

### Scenario C — Asset non ancora prodotti

1. Produrre asset da P105.
2. Controllare asset.
3. Preparare bozze post.
4. Solo dopo procedere alla pubblicazione manuale.

## Post-publication monitoring

### Prime 2 ore

- [ ] Link funzionanti.
- [ ] Nessun errore visual.
- [ ] Nessun refuso evidente.
- [ ] Commenti/messaggi monitorati.
- [ ] Screenshot archivio pubblicazione.

### Prime 24 ore

- [ ] Salvare metriche base.
- [ ] Salvare note qualitative dai commenti.
- [ ] Capire quale CTA ha funzionato.
- [ ] Preparare eventuale follow-up.

### Prime 48 ore

- [ ] Decidere se spingere Reel/Stories.
- [ ] Preparare secondo contenuto.
- [ ] Se Substack attivo, valutare iscrizioni/click.
- [ ] Non modificare sito senza gate.

### Metriche base

- visite sito se disponibili;
- click link;
- impression;
- salvataggi;
- condivisioni;
- commenti;
- iscrizioni newsletter se URL Substack reale.

## Risks and stop conditions

Fermarsi se:

- URL non verificato;
- asset non pronti;
- link rotti;
- contenuti con dati non verificati;
- clip/immagini non autorizzate;
- claim eccessivi;
- Substack URL placeholder;
- errore grave in anteprima;
- dubbio su diritti audio/video;
- presenza di token/cookie/header in screenshot o asset.

## Safety

- `automatic_publishing=false`
- `social_auto_published=false`
- `substack_auto_published=false`
- `assets_generated=false`
- `invented_substack_url=false`
- `unauthorized_match_clips=false`
- `live_data_invented=false`
- `provider_calls=false`
- `code_change=false`
- `merge_executed=false`
- `deploy_executed=false`
- `db_write=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`

## Decision

- `point_106_first_publication_manual_checklist_completed=true`
- `first_publication_manual_checklist_ready=true`
- `assets_generated=false`
- `social_auto_published=false`
- `substack_auto_published=false`
- `substack_url_status=not_created_or_not_confirmed`
- `p107_recommended=substack_url_or_canva_asset_generation_gate`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
