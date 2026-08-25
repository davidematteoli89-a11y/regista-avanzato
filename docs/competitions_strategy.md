# Strategia Competizioni

## Fonte di configurazione

Il catalogo applicativo è in `config/competitions.ts`. Contiene 43 competizioni:

- 14 `full_official`;
- 15 `apify_light_plus_p1`;
- 14 `apify_light_plus_p2`;
- 0 `trigger`, perché il brief definisce i criteri ma non indica campionati specifici.

Gli ID sono interni, stabili e indipendenti dagli ID dei provider. I mapping esterni dovranno essere gestiti separatamente per provider e stagione.

## FULL_OFFICIAL

Serie A, Premier League, LaLiga, Bundesliga, Ligue 1, Champions League, Europa League, Copa Libertadores, Brasileirão Série A, Argentina Primera División, Eredivisie, Jupiler Pro League, Primeira Liga e Süper Lig.

Copertura prevista: calendario, risultati, classifica, squadre, giocatori, statistiche giocatori e squadre, match stats, player stats, link highlight, candidati contenuto e story matches. La fonte principale è `stable_provider`; nessun dato è però disponibile finché il provider reale non viene scelto e attivato.

Le statistiche pubbliche sono abilitate, mentre la visualizzazione completa richiede login. Apify è disabilitato per questo livello.

## APIFY_LIGHT_PLUS_PRIORITY_1

Svizzera, Austria, Danimarca, Svezia, Norvegia, Polonia, Croazia, Serbia, Giappone, Corea del Sud, USA, Uruguay, Colombia, Cile e Ligue 2.

Una run settimanale dopo la giornata può acquisire calendario, risultati, classifica, eventi e statistiche partita base quando disponibili. Il focus editoriale comprende partite pazze, giovani interessanti, ex Serie A e collegamenti Italia.

Il campo `weekly_import_day` è intenzionalmente `null`: il giorno operativo deve essere deciso in base a timezone e calendario, senza assumere che tutti i campionati giochino nel weekend.

## APIFY_LIGHT_PLUS_PRIORITY_2

Grecia, Repubblica Ceca, Ucraina, Romania, Ungheria, Slovacchia, Slovenia, Bosnia, Bulgaria, Perù, Paraguay, Venezuela, Bolivia e Russia.

Sono eleggibili per import soltanto con budget residuo dopo P1. La configurazione richiede risultati e tenta calendario/classifica quando disponibili, senza promettere statistiche profonde. Gli highlight sono solo link ufficiali inseriti manualmente.

## TRIGGER

Il preset `TRIGGER_DEFAULTS` usa dati minimi e monitoraggio editoriale per:

- risultati 5-4 o 4-4;
- goleade;
- triplette o poker;
- under 21 decisivi;
- ex Serie A protagonisti;
- club italiani citati;
- record o eventi storici.

Non esiste ancora una lista di competizioni trigger. Il rilevamento automatico non è implementato e dovrà usare dati già importati o segnalazioni editoriali, mai chiamate live provocate dall'utente.

## Regole comuni

- Le pagine pubbliche leggono soltanto dati normalizzati in Supabase.
- Nessuna pagina chiama direttamente provider, SofaScore o actor Apify.
- `data_confidence` descrive l'affidabilità attesa del livello, non certifica ogni singolo record.
- Funzioni e formati stagionali complessi devono avere mapping e test dedicati.
- Dati incompleti o non aggiornati devono mostrare fonte e timestamp.
- Link highlight manuali devono puntare a pubblicazioni ufficiali autorizzate.
- Non si scaricano, copiano o caricano video di partite.

## Decisioni ancora necessarie

Provider stabile reale, ID esterni, stagioni iniziali, timezone canoniche, giorno di import per ogni campionato Apify, ordine P1 interno, disponibilità delle singole metriche e competizioni da inserire nel livello `trigger`.
