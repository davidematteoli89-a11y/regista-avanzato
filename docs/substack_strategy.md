# Strategia Newsletter / Substack

## Ruolo nella monetizzazione

Substack è il canale esterno iniziale per newsletter gratuite e report editoriali a pagamento. Regista Avanzato non gestisce checkout, pagamenti, entitlement, utenti paganti o paywall interno. Questo riduce complessità tecnica, fiscale e operativa mentre il prodotto editoriale viene validato.

Non sono attive API Substack, webhook, automazioni, sincronizzazioni iscritti o invii email.

## Free e paid

La versione free è un'estensione gratuita del sito e include:

- riepilogo settimanale;
- migliori storie;
- tre talenti da seguire;
- tre link a highlights ufficiali;
- una partita pazza;
- un collegamento storico;
- link agli approfondimenti del sito.

La versione paid è dedicata a Talent Radar completo, Italia Radar, campionati minori, Historical Echo esteso, Creator Pack, Watchlist weekend e report mensile scouting.

“Paid” descrive il piano esterno su Substack, non un ruolo o permesso interno. I report sono analisi editoriali: non promettono dati live, copertura totale, risultati futuri o scouting professionale certificato.

## Separazione dei contenuti

Sul sito restano pagine pubbliche, articoli free, preview, statistiche secondo le regole account e CTA editoriali. Su Substack andranno digest e report free/paid preparati e pubblicati manualmente.

Il flusso futuro resta umano:

```text
idea → fonti → bozza → fact-check → controllo diritti → approvazione → pubblicazione manuale su Substack
```

Nessun contenuto viene generato, inviato o pubblicato automaticamente in questo step.

## CTA dal sito

Le CTA ammesse sono “Leggi su Substack”, “Iscriviti gratis” e “Ricevi il report completo”. `SUBSTACK_URL` viene letta soltanto server-side. Se manca o non è un URL HTTP(S) valido, il componente mostra un controllo disabilitato e un messaggio placeholder, senza rompere la pagina.

Per attivare la destinazione sarà sufficiente aggiungere manualmente a `.env.local`:

```text
SUBSTACK_URL=https://nome-pubblicazione.substack.com/
```

Non inserire URL di checkout specifici o token. Dopo la configurazione andranno verificati dominio, pagina di destinazione, copy delle CTA e comportamento analytics/cookie.

## Rischi

- promessa commerciale eccessiva rispetto a frequenza o copertura reale;
- confusione tra analisi editoriale e scouting certificato;
- dipendenza da prezzi, policy e funzionalità della piattaforma esterna;
- diritti su immagini, video, dati e link highlights;
- coerenza tra descrizione del piano e contenuti effettivamente pubblicati;
- privacy e consenso gestiti tra sito e Substack senza sincronizzazione automatica.

Copy, frequenza e contenuti paid dovranno essere approvati prima di promuovere un'offerta commerciale reale.
