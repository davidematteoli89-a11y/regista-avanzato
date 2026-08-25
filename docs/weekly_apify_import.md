# Import settimanale Apify light

## Stato attuale

Il modulo è una simulazione `dry_run`: costruisce il piano, applica guard e soglie e produce payload di anteprima. Non legge `APIFY_TOKEN`, non visita SofaScore, non esegue `fetch`, non avvia actor, non usa Supabase e non installa uno scheduler.

## Quando verrà eseguito

In futuro partirà una volta a settimana, server-side, dopo la conclusione della giornata. La cadenza settimanale riduce chiamate e costi ed è coerente con l'obiettivo editoriale sui campionati minori; non è un servizio live.

Il flusso previsto è:

```text
scheduler server-side
  → lettura budget contabilizzato
  → reservation atomica
  → P1 essenziali
  → P2 solo con budget residuo
  → actor latest_round
  → validazione e mapping
  → upsert atomico/versionato in Supabase
  → sito pubblico legge Supabase
```

Nessuna pagina pubblica o azione utente potrà avviare questo flusso.

## Perimetro latest_round

Sono ammesse solo competizioni `apify_light_plus_p1` e `apify_light_plus_p2`, limitate all'ultima giornata o ultimo turno. `full_official` usa il futuro provider stabile; `trigger` resta escluso salvo un override futuro esplicito.

Il piano vieta storico completo, live scraping e download video. Gli identificatori actor correnti sono placeholder controllati e non sono URL visitabili.

## Priorità e budget

Le P1 vengono valutate tutte prima delle P2. Le stime per competizione sono mock e servono esclusivamente a provare le decisioni:

- sotto 24 €: pianificazione P1, poi P2 finché la proiezione resta entro il limite;
- da 24 € e sotto 30 €: soltanto P1 essenziali;
- da 30 €: hard stop, nessuna competizione pianificata;
- limite mensile e hard stop: 30 €.

Il preview budget non aggiorna e non prenota denaro. Prima delle run reali servirà una reservation atomica per impedire che due processi concorrenti superino il limite. I prezzi effettivi possono variare: le cifre mock non sono una previsione commerciale.

## Mapping dry-run

`mapApifyMatchesToSupabase.ts` prepara anteprime per `matches`, `match_events`, `standings`, statistiche squadra base e `content_candidates` quando un trigger forte deriva da dati strutturati. Record incompleti vengono scartati; xG, statistiche, identità e foreign key non vengono inventati. Le FK non risolte restano `null` nel dry-run.

I trigger generano solo candidati privati da revisionare, mai contenuti pubblicati automaticamente.

## Errori e ultimo dato valido

Il futuro import dovrà scrivere un nuovo snapshot solo dopo validazione completa. Se actor, parser o upsert falliscono, verrà registrato l'errore e il precedente dato valido non verrà cancellato. Il sito continuerà quindi a leggere l'ultimo snapshot disponibile da Supabase.

## Cosa manca per l'attivazione

- verifica di termini, licenze, diritto di raccolta e riutilizzo;
- scelta e validazione dell'actor;
- token esclusivamente server-side;
- mapping reali di competizioni, stagioni, turni e ID esterni;
- lettura costi reali e stato budget persistente;
- reservation atomica, logging e idempotenza;
- writer Supabase transazionale e test di rollback;
- retry limitati, alert e osservabilità;
- scheduler server-side approvato.

## Rischi

Copertura incompleta, payload o pagine variabili, gare rinviate, turni non uniformi, duplicati, timezone, costi variabili e concorrenza sul budget. Esistono inoltre rischi contrattuali e di licenza da risolvere prima dell'uso. Nessun video deve essere scaricato o ripubblicato.
