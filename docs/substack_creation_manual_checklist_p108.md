# Substack Creation Manual Checklist — P108

## Scope

- manual Substack creation planning only;
- no automatic creation;
- no publishing;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P108 prepara la creazione manuale della pubblicazione Substack di Regista Avanzato. Non crea l’account, non pubblica newsletter, non invia email e non inventa URL.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P107 commit | `97684cb630b9b97c7f1421f9643d10631cc30be8` |
| Editorial manual | `ready` |
| Social/reel launch pack | `ready_for_manual_execution` |
| Newsletter zero | `ready_for_manual_loading_after_substack_creation` |
| Assets status | `not_generated` |
| Publishing status | `not_started` |

## Publication identity

### Publication name

Regista Avanzato

### Short subtitle

Calcio fuori dal mainstream, raccontato con dati, storie e contesto.

### Short description

Regista Avanzato racconta campionati, talenti e storie che spesso restano fuori dal cono di luce del calcio mainstream.

### Long description

Regista Avanzato è un osservatorio narrativo sul calcio fuori dal mainstream.

Nasce per raccontare campionati, squadre, talenti e storie che spesso restano fuori dal centro della conversazione, ma che possono aiutare a capire meglio il calcio che arriva prima del rumore.

La newsletter sarà il luogo più diretto del progetto: una voce periodica per seguire cosa stiamo osservando, perché lo stiamo osservando e quali segnali meritano attenzione. Non vuole sostituire il sito, ma accompagnarlo: il sito raccoglie Manifesto, Rubriche e percorsi pubblici; la newsletter costruisce relazione, ritmo e continuità editoriale.

Qui troverai mappe di campionati meno illuminati, talenti da osservare senza trasformarli in hype, storie fuori dal mainstream, radar video basati solo su fonti ufficiali o materiali permessi, e contenuti pensati per guardare meglio il calcio, non per inseguire ogni notifica.

Regista Avanzato non è un servizio di pronostici, non parla di quote, non produce consigli betting, non promette scouting certificato e non trasforma ogni giocatore in “nuovo fenomeno”. I dati servono ad aprire una porta: verso una storia, un contesto, una domanda, un percorso da seguire.

Se ti interessa il calcio che spesso arriva prima in silenzio, questa newsletter è il posto giusto.

## Slug and URL policy

### Slug options to verify manually

1. `registaavanzato`
2. `regista-avanzato`
3. `registaavanzatofootball`
4. `registaavanzatocalcio`
5. `registaavanzato.substack.com` only as expected format, not confirmed URL.

### Rule

No Substack URL is real until manually created, opened, verified and copied from Substack.

Do not write a placeholder as if it were real. Do not integrate the URL into the site before P109.

### Fields to fill after manual creation

- `substack_url_real=`
- `substack_publication_id_if_visible=`
- `substack_owner_account=`
- `substack_creation_date=`
- `substack_url_verified=true/false`

## About page draft

### Cos’è Regista Avanzato

Regista Avanzato è un osservatorio narrativo sul calcio fuori dal mainstream.

Racconta campionati, squadre, talenti e storie che spesso restano fuori dal cono di luce del calcio più seguito, ma che possono dire molto sul gioco, sui percorsi dei club, sulla crescita dei giocatori e sulle direzioni che il calcio prende prima di diventare ovvio.

Il progetto nasce da un’idea semplice: il calcio interessante non vive solo dove guardano tutti.

Non vogliamo coprire ogni risultato. Non vogliamo inseguire ogni notizia. Non vogliamo trasformare ogni partita in un pronostico. Vogliamo costruire una mappa: dati essenziali, storie, contesto, memoria calcistica, scouting narrativo e radar video.

### Cosa troverai

Nella newsletter troverai:

- Campionati nel radar: leghe, squadre e contesti da osservare oltre il centro della conversazione.
- Talento della settimana: profili sobri e anti-hype, pensati per capire meglio un giocatore senza incoronarlo troppo presto.
- La mappa del weekend: una bussola pratica, non una schedina.
- Storie fuori dal mainstream: club, città, tifoserie, percorsi e modelli sportivi.
- Il calcio si ripete: memoria, ricorrenze e parallelismi tra passato e presente.
- Video Radar: segnalazioni basate solo su video ufficiali, embed permessi o contenuti propri.

### Cosa non troverai

Non troverai:

- pronostici;
- quote;
- consigli scommesse;
- “giocate del giorno”;
- hype facile;
- paragoni forzati;
- clip non autorizzate;
- dati inventati;
- notizie spacciate per certe senza fonti.

“Da guardare” non significa “da scommettere”.

### Da dove partire

Il sito è la casa del progetto:

- Home: https://regista-avanzato-rouge.vercel.app/
- Manifesto: https://regista-avanzato-rouge.vercel.app/manifesto
- Rubriche: https://regista-avanzato-rouge.vercel.app/rubriche
- Competizioni: https://regista-avanzato-rouge.vercel.app/competitions

La newsletter è la voce più diretta: il luogo in cui trasformare osservazioni, segnali e storie in un appuntamento leggibile.

Se vuoi seguire calcio prima che entri nel rumore, benvenuto in Regista Avanzato.

## Welcome email draft

### Subject

Benvenuto su Regista Avanzato

### Preview text

Il calcio fuori dal mainstream, raccontato con dati, storie e contesto.

### Body

Ciao,

benvenuto in Regista Avanzato.

Questa newsletter nasce per seguire il calcio che spesso resta fuori dal centro della conversazione: campionati meno illuminati, squadre che costruiscono lontano dal rumore, talenti da osservare senza trasformarli subito in hype, storie che spiegano qualcosa del gioco prima ancora del risultato.

Regista Avanzato non è un sito di pronostici, non parla di quote e non promette certezze da scouting certificato. Qui il dato serve ad aprire una porta, non a chiudere il racconto. Una classifica può portare a una storia. Una partita può portare a un giocatore. Un video ufficiale può portare a una domanda.

Quello che puoi aspettarti:

- mappe editoriali su campionati e squadre da osservare;
- profili talento sobri e anti-hype;
- storie fuori dal mainstream;
- rubriche ricorrenti;
- link e video solo quando ufficiali, permessi o prodotti internamente;
- un tono curioso, competente e accessibile.

Non promettiamo di guardare tutto. Promettiamo di scegliere con criterio.

Per iniziare:

- Leggi il Manifesto: https://regista-avanzato-rouge.vercel.app/manifesto
- Scopri le Rubriche: https://regista-avanzato-rouge.vercel.app/rubriche
- Esplora i campionati: https://regista-avanzato-rouge.vercel.app/competitions

Grazie per essere qui.

Regista Avanzato

## Recommended settings

### Identity

- [ ] Publication name: `Regista Avanzato`.
- [ ] Subtitle: `Calcio fuori dal mainstream, raccontato con dati, storie e contesto.`
- [ ] Short description inserted.
- [ ] Long description inserted.
- [ ] Category: Sport / Football / Soccer, depending on Substack available options.
- [ ] Sender name: `Regista Avanzato`.
- [ ] Reply-to: decide manually using an account with clear access and privacy rules.

### Branding

- [ ] Logo/temporary image only if available and authorized.
- [ ] If no logo is available, use a temporary text-first identity.
- [ ] Social preview consistent with site tone.
- [ ] No unauthorized club/player images.
- [ ] No match TV stills or re-uploaded clips.

### Publishing and monetization

- [ ] Paid: disabled at launch.
- [ ] Frequency: one newsletter/week as initial target.
- [ ] Chat/community: not priority at launch.
- [ ] Referral/ambassador: not priority at launch.
- [ ] Import email list only with clear consent.
- [ ] Analytics: monitor without over-optimizing early.

### Comments and privacy

- [ ] Comments: open or moderated, to decide before first post.
- [ ] Moderation policy clear: no betting spam, no abuse, no copyrighted material in comments.
- [ ] Privacy settings reviewed.
- [ ] Footer/editorial info reviewed.

### About and welcome

- [ ] About page pasted and previewed.
- [ ] Welcome email pasted and previewed.
- [ ] Welcome email test sent only manually if available.
- [ ] No accidental publication.

## Newsletter zero loading checklist

- [ ] Choose final newsletter zero version from P95/P101/P104.
- [ ] Check subject.
- [ ] Check preview text.
- [ ] Check intro.
- [ ] Check CTA.
- [ ] Check site links.
- [ ] Check images/assets, if any.
- [ ] Preview desktop.
- [ ] Preview mobile.
- [ ] Send test email if available.
- [ ] Do not publish until explicit authorization.
- [ ] Do not send automatically.
- [ ] Do not insert fake Substack URLs.

## Manual creation checklist

1. Open Substack manually.
2. Create a publication.
3. Insert publication name: `Regista Avanzato`.
4. Choose an available slug from the proposed options.
5. Copy the real URL only after creation.
6. Insert short description.
7. Insert long description.
8. Fill the About page.
9. Configure welcome email.
10. Check paid settings: keep disabled at launch.
11. Check comments settings.
12. Check branding.
13. Save.
14. Open public URL.
15. Verify the URL is reachable.
16. Copy the real URL into docs only in the next gate.
17. Do not integrate the URL into the site before P109.

## After real URL is available

When the real Substack URL is available, do not modify the site immediately.

Next step:

P109 — Substack URL integration gate.

P109 must:

- verify the real URL;
- decide where to insert it;
- update docs;
- prepare possible site links;
- modify code only if explicitly authorized;
- avoid Production deploy without a dedicated gate.

## Stop conditions

Stop if:

- publication name is already occupied and no alternative is approved;
- slug is unavailable and no alternative is approved;
- URL is not verifiable;
- Substack asks for paid settings not desired;
- email consent status is unclear;
- About or welcome email are not approved;
- logo/assets are unavailable and launch should wait;
- any placeholder URL appears;
- there is risk of accidental publication.

## Safety

- no automatic creation;
- no automatic publishing;
- no invented Substack URL;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- provider/import off;
- Apify off.

## Decision

- `point_108_substack_creation_manual_checklist_completed=true`
- `substack_creation_manual_checklist_ready=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_auto_published=false`
- `social_auto_published=false`
- `assets_generated=false`
- `p109_recommended=substack_url_integration_gate_after_real_url`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
