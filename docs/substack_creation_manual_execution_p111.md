# Substack Creation Manual Execution — P111

## Scope

- manual Substack creation execution/tracking only;
- no automatic Substack creation;
- no automatic publishing;
- no newsletter sending;
- no Substack URL invention;
- no code change;
- no site integration;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify.

P111 prepara e documenta l’esecuzione manuale della creazione Substack. In questa esecuzione non è stato fornito né verificato alcun URL reale, quindi lo stato resta `substack_created=false`.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Manifesto URL | `https://regista-avanzato-rouge.vercel.app/manifesto` |
| Rubriche URL | `https://regista-avanzato-rouge.vercel.app/rubriche` |
| Competitions URL | `https://regista-avanzato-rouge.vercel.app/competitions` |
| Substack URL status | `not_created_or_not_confirmed` |
| P110 commit | `38863a4e59bb9bef7c4f8255845ec971640d6e39` |
| Substack created in P111 | `false` |
| Newsletter sent in P111 | `false` |
| Site integration in P111 | `false` |

## Manual creation instructions

1. Aprire Substack manualmente.
2. Creare nuova publication.
3. Inserire nome: `Regista Avanzato`.
4. Scegliere uno slug disponibile.
5. Inserire descrizione breve.
6. Inserire descrizione lunga.
7. Inserire About page da P108/P95.
8. Configurare welcome email.
9. Verificare paid disattivato al lancio.
10. Verificare commenti.
11. Verificare impostazioni privacy.
12. Salvare.
13. Aprire URL pubblico.
14. Copiare URL reale.
15. Non pubblicare newsletter.
16. Non inviare email.
17. Non integrare ancora nel sito.

## Publication identity

Nome:

Regista Avanzato

Sottotitolo:

Calcio fuori dal mainstream, raccontato con dati, storie e contesto.

Descrizione breve:

Regista Avanzato racconta campionati, talenti e storie che spesso restano fuori dal cono di luce del calcio mainstream.

Campi da compilare manualmente dopo creazione reale:

- `substack_slug_final=`
- `substack_url_real=`
- `substack_url_verified=true/false`
- `substack_created=true/false`
- `creation_date=`
- `owner_account=`
- `notes=`

Regola: non inserire nessun URL reale se non fornito e verificato.

## Slug policy

Opzioni consigliate:

1. `registaavanzato`
2. `regista-avanzato`
3. `registaavanzatofootball`
4. `registaavanzatocalcio`

Se lo slug preferito è occupato:

- scegliere variante coerente;
- non usare nomi troppo lunghi;
- non usare parole betting;
- non usare “official” se non necessario;
- non usare nomi di club/leghe;
- non usare marchi di terzi.

## About page execution checklist

- [ ] testo About copiato da P108/P95;
- [ ] link sito corretto: `https://regista-avanzato-rouge.vercel.app/`;
- [ ] link Manifesto corretto: `https://regista-avanzato-rouge.vercel.app/manifesto`;
- [ ] link Rubriche corretto: `https://regista-avanzato-rouge.vercel.app/rubriche`;
- [ ] link Competitions corretto: `https://regista-avanzato-rouge.vercel.app/competitions`;
- [ ] nessun URL Substack placeholder;
- [ ] tono coerente con P107;
- [ ] no pronostici;
- [ ] no betting;
- [ ] no hype facile;
- [ ] no scouting certificato promesso;
- [ ] nota video/diritti coerente.

## Welcome email execution checklist

- [ ] subject inserito: `Benvenuto su Regista Avanzato`;
- [ ] preview text inserito: `Il calcio fuori dal mainstream, raccontato con dati, storie e contesto.`;
- [ ] corpo coerente con P108/P95;
- [ ] CTA a Manifesto/Rubriche/Competitions;
- [ ] nessuna promessa di frequenza impossibile;
- [ ] nessun link Substack inventato;
- [ ] nessuna newsletter inviata;
- [ ] invio test solo se autorizzato manualmente dall’utente;
- [ ] pubblicazione disattivata fino ad autorizzazione.

## Settings checklist

- [ ] paid: off al lancio;
- [ ] frequenza: 1 newsletter/settimana;
- [ ] commenti: moderati oppure aperti con controllo;
- [ ] chat/community: non prioritaria;
- [ ] referral: non prioritario;
- [ ] import lista email: solo con consensi chiari;
- [ ] branding: coerente con sito;
- [ ] reply-to: controllare;
- [ ] sender name: `Regista Avanzato`;
- [ ] archive: visibile solo se coerente;
- [ ] privacy: controllata;
- [ ] analytics: monitorare senza ossessione.

## URL verification checklist

- [ ] URL pubblico si apre;
- [ ] nome corretto;
- [ ] descrizione corretta;
- [ ] About visibile;
- [ ] nessun contenuto pubblicato per errore;
- [ ] paid non attivo se non desiderato;
- [ ] nessun post/newsletter inviato;
- [ ] link al sito funzionanti;
- [ ] mobile view ok;
- [ ] desktop view ok.

Solo dopo verifica:

- `substack_url_verified=true`

Se URL non disponibile:

- mantenere `substack_created=false`;
- mantenere `substack_url_status=not_created_or_not_confirmed`.

## Status policy

Se URL reale viene fornito e verificato:

- `substack_created=true`
- `substack_url_status=created_verified`
- `substack_url_real=<URL reale>`
- `substack_auto_published=false`

Se URL reale non viene fornito:

- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_auto_published=false`

Non inventare mai URL.

## Stop conditions

Stop se:

- slug non disponibile e non viene scelta alternativa;
- URL pubblico non verificabile;
- Substack tenta di attivare paid indesiderato;
- viene chiesto import lista email senza consensi;
- parte invio email automatico;
- viene pubblicato un post per errore;
- viene inserito URL placeholder;
- viene richiesto deploy;
- viene richiesta integrazione sito senza P112;
- si tenta modifica codice.

## Safety

- no automatic Substack creation;
- no automatic publishing;
- no newsletter sent;
- no invented Substack URL;
- no site integration;
- no code change;
- no merge;
- no deploy;
- no DB write;
- provider/import off;
- Apify off.

## Decision

URL reale non fornito/verificato in P111:

- `point_111_substack_creation_manual_execution_completed=true`
- `substack_creation_manual_execution_ready=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`
- `substack_auto_published=false`
- `social_auto_published=false`
- `assets_generated=false`
- `p112_recommended=substack_url_integration_gate_after_real_url_or_canva_manual_asset_creation_report`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
