# Limite free della ricerca avanzata

## Regola

Ogni utente autenticato free dispone di tre ricerche avanzate per periodo mensile. La quota riguarda esclusivamente l'invio intenzionale del form di ricerca avanzata.

Consumano quota, in futuro:

- una ricerca trasversale su giocatori, squadre, competizioni o partite;
- una ricerca su storie, articoli, highlights, Video Radar, Historical Echo o News Radar;
- una nuova esecuzione con testo o filtri diversi.

Non consumano quota:

- apertura di statistiche complete;
- schede giocatore e squadra;
- schede partita e riepiloghi;
- apertura di link highlights ufficiali;
- visualizzazione Video Radar;
- navigazione, classifiche, risultati, preferiti e account.

La differenza è quindi tra consultare una risorsa già individuata e chiedere al motore di eseguire una ricerca avanzata.

## Stato safe/mock

`checkUserSearchLimit()` restituisce `allowed`, `used_count`, limite 3, residue e periodo, ma non interroga `user_search_usage`. `incrementUserSearchUsage()` riconosce soltanto l'azione `advanced`; tutte le azioni `view_*` restano non consumanti. In questo step restituisce una preview e non salva né incrementa nulla.

Il periodo è calcolato con il calendario e la timezone del processo server. Prima della produzione bisognerà scegliere e fissare la timezone applicativa per evitare reset mensili ambigui.

## RPC atomica futura

Una sequenza “leggi, incrementa, cerca” non è sicura: due richieste concorrenti potrebbero usare la stessa quota. Servirà una RPC PostgreSQL atomica che, nella stessa transazione:

1. identifichi utente e periodo;
2. verifichi che il conteggio sia inferiore a 3;
3. incrementi una sola volta con chiave idempotente;
4. restituisca la quota confermata;
5. impedisca l'esecuzione della ricerca se la reservation fallisce.

Saranno inoltre necessarie RLS per riga utente e protezioni anti-retry/anti-abuso.

## Limite raggiunto

Al terzo utilizzo la ricerca avanzata viene bloccata fino al periodo successivo. Statistiche, schede, highlights e Video Radar rimangono accessibili secondo le normali regole free.

Il messaggio mostrato è:

> Hai usato le 3 ricerche gratuite del mese. Per ricevere report completi, Talent Radar e contenuti extra, iscriviti alla newsletter su Substack.

La CTA porta alla pagina Substack esterna. Non esistono premium, pagamenti o abbonamenti interni.
