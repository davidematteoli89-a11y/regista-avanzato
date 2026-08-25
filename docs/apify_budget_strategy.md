# Strategia operativa budget Apify

## Soglie

| Spesa stimata mensile | Decisione |
|---:|---|
| `< 24 €` | P1, poi P2 solo se resta budget |
| `>= 24 €` e `< 30 €` | solo P1 essenziali |
| `>= 30 €` | hard stop, nessuna run |

Ogni costo proposto viene sommato alla spesa corrente. Una run viene esclusa se il totale proiettato supererebbe 30 €.

## Moduli safe

- `checkApifyMonthlyBudget.ts`: calcola fascia, residuo e permessi P1/P2.
- `getApifyImportPriority.ts`: restituisce `run_priority_1`, `run_priority_2`, `skip_due_to_budget` o `hard_stop`.
- `logApifyRun.ts`: prepara log compatibili con `apify_usage_logs` tramite writer opzionale.
- `apifyClient.ts`: placeholder che restituisce sempre `started: false`, anche se rileva configurazione.

Nessuno di questi moduli chiama Apify o SofaScore.

## Sequenza settimanale futura

1. Leggere `apify_budget_status` e sommare run non ancora contabilizzate.
2. Calcolare stato budget.
3. Pianificare P1 essenziali per l'ultima giornata.
4. Stimare il costo di ogni run prima di autorizzarla.
5. Solo sotto warning, rivalutare P2 dopo i costi P1.
6. Avviare una run server-side programmata, mai lato utente.
7. Scrivere sempre l'esito in `apify_usage_logs`.
8. Validare il dataset prima dell'upsert.
9. Se fallisce, registrare errore e mantenere gli snapshot precedenti.

## Scope dati

È consentito soltanto `latest_round`: ultima giornata/ultimo turno. Sono esclusi storico completo massivo, backfill automatici e aggiornamenti live. Gare rinviate o turni incompleti richiederanno una regola esplicita prima dell'automazione.

## Dati per Video Radar

Video Radar usa dati già validati e salvati in Supabase. Non può innescare una run Apify. Lo stesso vale per pagine competizione, ricerca e schede partita.

## Variabili

- `APIFY_MONTHLY_BUDGET_EUR=30`
- `APIFY_WARNING_BUDGET_EUR=24`
- `APIFY_HARD_STOP_EUR=30`

I valori safe sono disponibili come default nel codice, ma token e actor restano necessari solo per un futuro client reale.

## Limiti attuali

La spesa viene fornita come input: non è letta dal database. Le decisioni non riservano budget in modo atomico; due job concorrenti potrebbero approvare insieme costi incompatibili. Prima dell'uso reale serviranno lock/transazione, policy, scheduler e alert.
