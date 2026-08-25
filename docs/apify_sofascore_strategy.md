# Strategia Apify / SofaScore

## Ambito consentito

Apify/SofaScore serve esclusivamente ad arricchire le competizioni `apify_light_plus_p1` e `apify_light_plus_p2`. Non sostituisce il provider stabile e non può essere usato per `full_official`. Le competizioni `trigger` restano escluse finché non verrà approvato un override specifico.

Il provider è disattivato per default. Il router lo seleziona solo se sono veri entrambi gli interruttori: provider globale attivo e competizione `apify_enabled`.

## Budget e priorità

- budget mensile massimo: 30 €;
- warning: 24 €;
- hard stop: 30 €;
- P1 pianificate sempre prima delle P2;
- da 24 € sono ammesse soltanto P1 essenziali;
- a 30 € ogni nuova run è bloccata;
- P2 eseguite soltanto se il costo delle P1 lascia budget sufficiente.

Ogni futura run dovrà essere preceduta dalla lettura affidabile del budget contabilizzato e da una prenotazione atomica del costo stimato. Il piano placeholder attuale non rappresenta una prenotazione reale.

## Frequenza e perimetro

È prevista una sola run settimanale dopo la giornata. L'input actor impone `latest_round`, esclude storico massivo, live scraping e download video. Non devono esistere run avviate da pagine, componenti client o richieste utente.

```text
scheduler server-side → controllo budget → P1 → eventuale P2 → actor → validazione → Supabase
Supabase → sito pubblico / Video Radar
```

Il sito e Video Radar leggeranno esclusivamente dati salvati in Supabase. Se una run fallisce, l'errore verrà loggato senza cancellare il precedente snapshot valido.

## Mapping e disponibilità variabile

I mapper accettano payload `unknown` e scartano record incompleti. Player stats e match stats sono opzionali: la loro assenza non genera dati inventati e non rende necessariamente invalido tutto il turno. Prima della persistenza serviranno mapping verificati per ID, stagioni, turni, playoff, timezone e formati locali.

## Video e highlights

Apify non scarica video e non effettua reupload di highlights. Eventuali link devono puntare a fonti ufficiali, rispettare termini e licenze e passare dalla revisione editoriale manuale.

## Script settimanale placeholder

`scripts/runWeeklyApifyLightImport.ts` costruisce un piano leggibile usando `checkApifyMonthlyBudget()` e `getApifyImportPriority()`: valuta prima tutte le P1, poi le P2 sul budget residuo simulato. Restituisce sempre zero run, zero chiamate esterne e zero scritture. Il dettaglio operativo è in [weekly_apify_import.md](./weekly_apify_import.md). Diventerà reale soltanto dopo una nuova approvazione esplicita.

## Rischi

- termini d'uso, licenze, robots e diritti di riutilizzo dei dati da verificare;
- variazioni del markup o del payload dell'actor;
- ID instabili, duplicati, gare rinviate e turni incompleti;
- timezone e formati stagionali differenti;
- costi run variabili e race condition sul budget;
- copertura non uniforme di eventi e statistiche avanzate.

## Cosa manca per l'attivazione

Verifica legale/contrattuale, actor definitivo, token server-side, mapping reali, dataset parser, test con fixture, stima costi, lock budget, logging persistente, upsert Supabase idempotente, retention raw, retry controllato, alert e scheduler. Nessuno di questi elementi è attivo in questo step.
