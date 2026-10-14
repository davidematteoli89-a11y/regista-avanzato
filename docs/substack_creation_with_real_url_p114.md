# Substack Creation With Real URL — P114

## Scope

- manual Substack creation tracking only;
- no automatic Substack creation;
- no automatic publishing;
- no newsletter sending;
- no social publishing;
- no site integration;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P114 prepara e documenta la creazione manuale reale della pubblicazione Substack di Regista Avanzato. In questa esecuzione non è stato fornito o verificato alcun URL reale, quindi lo stato resta `substack_created=false`.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P113 commit | `0b3e6fa97b52d8bd812bdf67eff06c1d48b34435` |
| Assets generated | `false` |
| Priority 1 assets ready | `false` |
| Publication ready | `false` |

## Manual Substack creation flow

1. Aprire Substack.
2. Creare nuova publication.
3. Nome publication: `Regista Avanzato`.
4. Scegliere slug disponibile.
5. Inserire sottotitolo.
6. Inserire descrizione breve.
7. Inserire About page da P108/P95.
8. Inserire welcome email da P108/P95.
9. Verificare impostazioni paid.
10. Verificare commenti.
11. Verificare privacy.
12. Verificare reply-to/sender.
13. Salvare.
14. Aprire URL pubblico.
15. Verificare URL.
16. Registrare URL reale.
17. Non pubblicare newsletter.
18. Non inviare email.
19. Non integrare nel sito senza P115.

## Publication identity

Nome:

Regista Avanzato

Sottotitolo:

Calcio fuori dal mainstream, raccontato con dati, storie e contesto.

Descrizione breve:

Regista Avanzato racconta campionati, talenti e storie che spesso restano fuori dal cono di luce del calcio mainstream.

Descrizione lunga:

Regista Avanzato è un osservatorio narrativo sul calcio fuori dal mainstream.

Nasce per raccontare campionati, squadre, talenti e storie che spesso restano fuori dal centro della conversazione, ma che possono aiutare a capire meglio il calcio che arriva prima del rumore.

La newsletter sarà il luogo più diretto del progetto: una voce periodica per seguire cosa stiamo osservando, perché lo stiamo osservando e quali segnali meritano attenzione. Non vuole sostituire il sito, ma accompagnarlo: il sito raccoglie Manifesto, Rubriche e percorsi pubblici; la newsletter costruisce relazione, ritmo e continuità editoriale.

Qui troverai mappe di campionati meno illuminati, talenti da osservare senza trasformarli in hype, storie fuori dal mainstream, radar video basati solo su fonti ufficiali o materiali permessi, e contenuti pensati per guardare meglio il calcio, non per inseguire ogni notifica.

Regista Avanzato non è un servizio di pronostici, non parla di quote, non produce consigli betting, non promette scouting certificato e non trasforma ogni giocatore in “nuovo fenomeno”. I dati servono ad aprire una porta: verso una storia, un contesto, una domanda, un percorso da seguire.

Se ti interessa il calcio che spesso arriva prima in silenzio, questa newsletter è il posto giusto.

## Tracking fields

- `substack_slug_final=`
- `substack_url_real=`
- `substack_url_verified=false`
- `substack_created=false`
- `creation_date=`
- `owner_account=`
- `about_page_status=not_verified`
- `welcome_email_status=not_verified`
- `paid_status=not_verified`
- `comments_status=not_verified`
- `notes=`

Regola: non inserire nessun URL reale se non è stato fornito e verificato.

## Slug final policy

Opzioni consigliate:

1. `registaavanzato`
2. `regista-avanzato`
3. `registaavanzatofootball`
4. `registaavanzatocalcio`

Regole:

- preferire slug breve;
- evitare parole betting;
- evitare `official` se non necessario;
- evitare nomi club/leghe;
- evitare marchi terzi;
- evitare slug troppo lungo;
- non dichiarare URL reale se non confermato.

## About page verification

- [ ] About page caricata.
- [ ] Testo coerente con P107.
- [ ] Link sito corretto.
- [ ] Link Manifesto corretto.
- [ ] Link Rubriche corretto.
- [ ] Link Competitions corretto.
- [ ] Nessun URL Substack placeholder.
- [ ] Nessun pronostico.
- [ ] Nessun betting.
- [ ] Nessun hype facile.
- [ ] Nessuno scouting certificato promesso.
- [ ] Nota video/diritti coerente.
- [ ] Desktop view ok.
- [ ] Mobile view ok.

Link da usare:

- `https://regista-avanzato-rouge.vercel.app/`
- `https://regista-avanzato-rouge.vercel.app/manifesto`
- `https://regista-avanzato-rouge.vercel.app/rubriche`
- `https://regista-avanzato-rouge.vercel.app/competitions`

## Welcome email verification

- [ ] Subject inserito.
- [ ] Preview text inserito.
- [ ] Corpo coerente.
- [ ] CTA corrette.
- [ ] Link sito/manifesto/rubriche/competitions corretti.
- [ ] Nessuna promessa di frequenza impossibile.
- [ ] Nessun URL Substack inventato.
- [ ] Nessuna newsletter inviata.
- [ ] Nessun invio automatico non voluto.

Subject consigliato:

Benvenuto su Regista Avanzato

Preview:

Il calcio fuori dal mainstream, raccontato con dati, storie e contesto.

## Settings verification

- [ ] Paid: off al lancio.
- [ ] Frequenza: 1 newsletter/settimana.
- [ ] Commenti: moderati oppure aperti con controllo.
- [ ] Chat/community: non prioritaria.
- [ ] Referral: non prioritario.
- [ ] Import lista email: solo con consensi chiari.
- [ ] Branding: coerente con sito.
- [ ] Reply-to: controllare.
- [ ] Sender name: Regista Avanzato.
- [ ] Archive: coerente.
- [ ] Privacy: controllata.
- [ ] Analytics: attivi ma non centrali.

## URL public verification

- [ ] URL pubblico si apre.
- [ ] Nome publication corretto.
- [ ] Sottotitolo corretto.
- [ ] About page visibile.
- [ ] Nessun contenuto pubblicato per errore.
- [ ] Paid non attivo se non desiderato.
- [ ] Nessuna newsletter inviata.
- [ ] Link al sito funzionanti.
- [ ] Mobile view ok.
- [ ] Desktop view ok.

Solo se tutti i controlli passano:

- `substack_created=true`
- `substack_url_status=created_verified`
- `substack_url_verified=true`

Se URL non viene fornito/verificato:

- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`

## Status decision policy

### URL reale fornito e verificato

- `point_114_substack_creation_with_real_url_completed=true`
- `substack_creation_with_real_url_ready=true`
- `substack_created=true`
- `substack_url_status=created_verified`
- `substack_url_real=<URL reale>`
- `substack_url_verified=true`
- `substack_auto_published=false`
- `social_auto_published=false`
- `newsletter_sent=false`
- `site_integration_done=false`
- `assets_generated=false`
- `priority_1_assets_ready=false`
- `publication_ready=false`
- `p115_recommended=substack_url_integration_gate`

### URL reale non fornito o non verificato

- `point_114_substack_creation_with_real_url_completed=true`
- `substack_creation_with_real_url_ready=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`
- `substack_url_verified=false`
- `substack_auto_published=false`
- `social_auto_published=false`
- `newsletter_sent=false`
- `site_integration_done=false`
- `assets_generated=false`
- `priority_1_assets_ready=false`
- `publication_ready=false`
- `p115_recommended=substack_creation_with_real_url_or_manual_asset_creation_with_links`

## Stop conditions

Stop se:

- slug preferito non disponibile e non viene scelta alternativa;
- URL pubblico non si apre;
- URL non verificabile;
- viene attivato paid per errore;
- viene pubblicato un post/newsletter per errore;
- parte invio email automatico;
- viene richiesto import lista email senza consensi;
- compare URL placeholder;
- viene richiesta integrazione sito senza P115;
- viene richiesto deploy;
- viene richiesta modifica codice.

## Safety

- `automatic_substack_creation=false`
- `automatic_publishing=false`
- `newsletter_sent=false`
- `substack_url_invented=false`
- `site_integration_done=false`
- `code_changed=false`
- `merge_executed=false`
- `deploy_executed=false`
- `db_write=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

## Decision

URL reale non disponibile/verificato in P114:

- `point_114_substack_creation_with_real_url_completed=true`
- `substack_creation_with_real_url_ready=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`
- `substack_url_verified=false`
- `substack_auto_published=false`
- `social_auto_published=false`
- `newsletter_sent=false`
- `site_integration_done=false`
- `assets_generated=false`
- `priority_1_assets_ready=false`
- `publication_ready=false`
- `p115_recommended=substack_creation_with_real_url_or_manual_asset_creation_with_links`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
