# Substack Manual Launch Checklist — P101

## Scope

- manual launch preparation only;
- no automatic publishing;
- no code change;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

## Current production baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Final Production commit | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| Production status | `stable` |
| Substack URL status | `not_created_or_not_confirmed` |
| Substack URL placeholder | `da_definire_manualmente` |

## Substack positioning

### Nome pubblicazione

Regista Avanzato

### Sottotitolo breve

Calcio fuori dal mainstream, raccontato con dati, storie e contesto.

### Descrizione breve

Regista Avanzato è una newsletter per seguire il calcio che arriva prima del rumore: campionati meno raccontati, squadre, talenti, storie e dati essenziali.

### Descrizione lunga

Regista Avanzato è un osservatorio narrativo sul calcio fuori dal mainstream. Racconta campionati, squadre, talenti e storie che spesso restano fuori dal centro della conversazione, ma che possono spiegare molto del calcio che verrà.

Non è una newsletter di pronostici, non è un clone di database e non è un aggregatore automatico. I dati servono ad aprire una porta: verso una squadra da capire, un giocatore da osservare, una storia da seguire, un campionato da rimettere nella mappa.

Il sito è la casa del progetto. La newsletter è la voce più diretta: il luogo in cui spiegare cosa stiamo osservando, perché lo stiamo osservando e quali segnali meritano attenzione nelle settimane successive.

### Tono

- competente;
- narrativo;
- curioso;
- internazionale;
- accessibile;
- non urlato;
- anti-hype.

### Cosa è

- canale editoriale newsletter;
- estensione del sito;
- spazio per newsletter zero, rubriche, storie lunghe e aggiornamenti settimanali;
- possibile ponte verso monetizzazione futura, non forzata al lancio.

### Cosa non è

- sostituto del sito;
- servizio pronostici;
- feed automatico;
- archivio dati freddo;
- contenitore di clip non autorizzate;
- canale paid-first.

## Manual setup checklist

- [ ] Creare o aprire account Substack.
- [ ] Impostare nome pubblicazione: `Regista Avanzato`.
- [ ] Impostare sottotitolo: `Calcio fuori dal mainstream, raccontato con dati, storie e contesto.`
- [ ] Impostare categoria: Sport / Football / Soccer, in base alle opzioni disponibili.
- [ ] Inserire descrizione breve.
- [ ] Inserire descrizione lunga.
- [ ] Caricare asset grafici solo se disponibili e proprietari/autorizzati.
- [ ] Se mancano asset grafici, segnare: `asset grafici da caricare manualmente`.
- [ ] Compilare About page.
- [ ] Compilare welcome email.
- [ ] Impostare footer editoriale.
- [ ] Verificare impostazioni commenti: aperti o moderati.
- [ ] Tenere paid non attivo al lancio, salvo decisione futura.
- [ ] Confermare frequenza iniziale: una newsletter a settimana più contenuto breve extra quando c’è una storia forte.
- [ ] Non inserire URL Substack interno finché l’URL reale non è confermato.
- [ ] Non pubblicare automaticamente.

## About page draft

### Cos’è Regista Avanzato

Regista Avanzato è un osservatorio narrativo sul calcio fuori dal mainstream.

Nasce per raccontare campionati, squadre, talenti e storie che spesso restano fuori dal centro della conversazione, ma che possono spiegare molto del calcio che verrà. Non tutto ciò che merita attenzione arriva subito nei trend. A volte una squadra costruisce bene per mesi prima che qualcuno se ne accorga. A volte un talento cresce lontano dai riflettori. A volte un campionato diventa laboratorio prima ancora di diventare racconto.

Regista Avanzato prova a stare lì: nel momento in cui una storia non è ancora ovvia, ma ha già qualcosa da dire.

### Perché esiste

Il calcio è pieno di dati, video, risultati e notifiche. Ma non sempre tutto questo aiuta a capire meglio. Una classifica racconta una posizione, non sempre il percorso. Un highlight accende la curiosità, non sempre spiega il contesto. Una notizia informa, ma spesso dura pochissimo.

Regista Avanzato nasce per unire dato e racconto. Per costruire mappe, non rumore. Per dare al lettore un motivo chiaro per osservare un campionato, una squadra, una partita o un giocatore.

### Cosa riceverai

- Campionati nel radar: perché osservare alcune leghe meno raccontate.
- Talento della settimana: profili sobri, senza hype gratuito.
- La mappa del weekend: una bussola pratica per scegliere cosa guardare.
- Storie e contesto: club, cicli, territori, memoria calcistica.
- Radar video: solo contenuti propri, ufficiali o utilizzabili con permesso.

### Cosa non troverai

Non troverai pronostici. Non troverai promesse facili. Non troverai “nuovi Messi” costruiti per attirare clic. Non troverai un clone di database o un aggregatore automatico.

Quando useremo dati, dovranno essere verificati. Quando faremo ipotesi, saranno trattate come ipotesi. Quando mancheranno informazioni aggiornate, lo diremo.

### Link utili

- Sito: `https://regista-avanzato-rouge.vercel.app/`
- Manifesto: `https://regista-avanzato-rouge.vercel.app/manifesto`
- Rubriche: `https://regista-avanzato-rouge.vercel.app/rubriche`

### CTA iscrizione

Se ti interessa il calcio che arriva un passo prima del rumore, iscriviti a Regista Avanzato.

## Welcome email draft

Oggetto consigliato: Benvenuto in Regista Avanzato

Testo:

Benvenuto in Regista Avanzato.

Questa newsletter nasce per seguire il calcio fuori dal mainstream: campionati meno raccontati, squadre laboratorio, talenti ancora fuori dall’hype, storie e segnali da osservare prima che diventino ovvi.

Non troverai pronostici, promesse facili o contenuti automatici senza revisione. Troverai mappe editoriali, dati essenziali, contesto e una voce pensata per aiutarti a guardare meglio.

Per iniziare:

- leggi il manifesto: `https://regista-avanzato-rouge.vercel.app/manifesto`
- scopri le rubriche: `https://regista-avanzato-rouge.vercel.app/rubriche`
- esplora i primi dati pubblici: `https://regista-avanzato-rouge.vercel.app/competitions`

Meno rumore, più contesto.

A presto,
Regista Avanzato

## Newsletter zero final draft

### Regista Avanzato: perché guardare dove gli altri non guardano

Sottotitolo: Una newsletter per raccontare il calcio fuori dal mainstream, tra dati, storie, talenti e contesto.

Ci sono partite che arrivano ovunque e partite che devi andare a cercare. Ci sono campionati che entrano nella conversazione solo quando un talento è già diventato caro, quando una squadra ha già sorpreso tutti, quando una storia è già stata raccolta da qualcun altro.

Regista Avanzato nasce per stare un passo prima.

Non per inseguire tutto. Non per coprire ogni risultato. Non per trasformare il calcio in una sequenza infinita di notifiche. Nasce per costruire un osservatorio: un luogo in cui dati essenziali, storie, contesto e radar video aiutano a capire cosa vale la pena guardare prima che diventi ovvio.

Il calcio interessante non vive solo nei campionati più illuminati. Vive anche dove il racconto mainstream arriva tardi: in una squadra che lavora bene lontano dal rumore, in un campionato che forma giocatori, in una tifoseria che spiega un territorio, in un talento che non ha ancora un’etichetta, in una partita che non finisce nei trend ma lascia un segnale.

Regista Avanzato nasce per cercare quei segnali.

Non è un sito di pronostici. Qui non troverai promesse facili, percentuali usate come scorciatoia o partite trasformate in scommessa. Non è un clone di database. I dati sono importanti, ma non bastano: una tabella dice dove sei, non sempre racconta perché ci sei arrivato. Non è un aggregatore automatico. Ogni contenuto deve avere una voce, una selezione, una ragione editoriale.

L’idea è semplice: il dato deve aprire una porta, non chiuderla. Una classifica può portare a una storia. Una partita può portare a un giocatore. Un video può portare a una domanda. Una squadra può portare a un modello. Il compito di Regista Avanzato è mettere in fila queste tracce e trasformarle in una mappa leggibile.

In questa fase il progetto è ancora un MVP. I primi dati sono manuali, limitati e verificati dentro un perimetro chiaro. È una scelta precisa: partire piccoli, non pubblicare automaticamente import o contenuti, non inventare aggiornamenti che non sono stati controllati. Prima viene la struttura, poi la frequenza. Prima viene la fiducia, poi la scala.

La newsletter sarà il luogo più diretto per seguire questo percorso.

Qui troverai Campionati nel radar: storie e coordinate per capire perché alcune leghe meritano attenzione anche quando non occupano le prime pagine. Troverai Talento della settimana: profili brevi, sobri, anti-hype, pensati per osservare meglio un giocatore senza trasformarlo subito in paragone. Troverai La mappa del weekend: una bussola pratica, non una lista infinita, per scegliere cosa guardare. Più avanti arriveranno anche memoria calcistica, rubriche storiche, radar video e contenuti più conversazionali.

Il sito sarà la casa del progetto: pagine, schede, percorsi, contenuti pubblici. La newsletter sarà la voce più diretta: il posto in cui spiegare cosa stiamo osservando, perché lo stiamo osservando e cosa potrebbe meritare attenzione nelle settimane successive.

Non promettiamo di guardare tutto. Sarebbe impossibile. Promettiamo di scegliere con criterio. Di distinguere fatti, opinioni e ipotesi. Di dire quando un dato manca. Di non trasformare ogni giovane in “nuovo qualcosa”. Di non usare clip non autorizzate. Di non confondere curiosità con hype.

Regista Avanzato nasce perché il calcio fuori dal mainstream non è una nicchia decorativa. È spesso il luogo in cui le cose cominciano: idee, percorsi, giocatori, modelli, domande. A volte il futuro arriva con il rumore. Molto più spesso arriva piano.

Se ti interessa il calcio che arriva un passo prima del rumore, questa newsletter è il posto giusto.

CTA:

- Leggi il manifesto: `https://regista-avanzato-rouge.vercel.app/manifesto`
- Scopri le rubriche: `https://regista-avanzato-rouge.vercel.app/rubriche`
- Esplora i campionati: `https://regista-avanzato-rouge.vercel.app/competitions`
- Segui la newsletter quando sarà attiva.

Nota operativa: non inserire link Substack interno finché l’URL reale non è confermato.

## First 3 issues plan

| Issue | Title | Purpose | Status |
|---|---|---|---|
| Invio 0 | Regista Avanzato: perché guardare dove gli altri non guardano | Presentare progetto, promessa e rubriche. | `ready_for_manual_review` |
| Invio 1 | La mappa del weekend | Prima uscita utile e concreta, con 3 partite / 2 giocatori / 1 storia. | `template_to_compile_with_verified_data` |
| Invio 2 | Talento della settimana | Prima scheda narrativa su un giocatore emergente. | `template_to_compile_with_verified_player` |

### Invio 1 template — La mappa del weekend

- Tre partite da seguire: da compilare solo con calendario verificato.
- Due giocatori da osservare: da compilare solo con profili verificati.
- Una storia di contesto: da selezionare con fonti affidabili.
- Nota: non inventare partite, orari, trasmissioni o dati live.

### Invio 2 template — Talento della settimana

- Nome giocatore: da definire dopo verifica.
- Club/campionato: da verificare.
- Perché interessa: scrivere solo dopo osservazione/fonte.
- Cosa evitare: paragoni facili, hype, “nuovo Messi”.
- Nota: non scegliere giocatore reale senza verifica successiva.

## Pre-publication checklist

- [ ] Account Substack creato.
- [ ] Nome pubblicazione corretto.
- [ ] Sottotitolo corretto.
- [ ] Descrizione corretta.
- [ ] About page compilata.
- [ ] Welcome email controllata.
- [ ] Newsletter zero incollata.
- [ ] Link manifesto testato.
- [ ] Link rubriche testato.
- [ ] Link competitions testato.
- [ ] Immagini/cover controllate.
- [ ] Nessun URL placeholder.
- [ ] Nessun link rotto.
- [ ] Nessuna promessa paid se paid non è attivo.
- [ ] Nessun contenuto spacciato come già pubblicato.
- [ ] Nessun dato non verificato.
- [ ] Nessuna clip/video non autorizzata.
- [ ] Test email inviato manualmente.
- [ ] Rilettura mobile completata.

## Post-publication checklist

- [ ] Copiare URL Substack reale.
- [ ] Aggiornare docs con URL reale in un punto successivo.
- [ ] Solo dopo URL confermato valutare link dal sito.
- [ ] Preparare post social di annuncio.
- [ ] Annotare metriche base.
- [ ] Nessun automatismo.

## Safety

- `substack_auto_published=false`
- `invented_substack_url=false`
- `substack_url_status=not_created_or_not_confirmed`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`

## Decision

- `point_101_substack_manual_launch_checklist_completed=true`
- `substack_manual_launch_ready=true`
- `substack_auto_published=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_placeholder=da_definire_manualmente`
- `p102_recommended=social_reel_launch_pack`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
