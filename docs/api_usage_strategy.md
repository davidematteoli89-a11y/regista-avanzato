# Strategia operativa utilizzo API

## Principio

Il provider stabile serve esclusivamente le competizioni `full_official` tramite script server-side programmati. Il sito pubblico e Video Radar leggono soltanto l'ultimo dato valido presente in Supabase.

```text
script → controllo budget → provider → log → validazione → Supabase → sito
```

Non è consentito chiamare provider in React client component, route aperte dall'utente o fallback live.

## Moduli safe

- `checkDailyBudget.ts`: controlla consumo giornaliero/mensile. Se le env mancano o non sono valide restituisce `safe_mock` e blocca chiamate reali.
- `usageLogger.ts`: produce record compatibili con `api_usage_logs`; senza writer Supabase scrive solo un log locale.
- `getImportPriority.ts`: decide `full_official`, Apify P1/P2, `trigger` o `skip`, sempre limitando l'operazione all'ultimo turno.

I moduli non contengono client HTTP, URL reali o credenziali.

## Sequenza futura di uno script FULL_OFFICIAL

1. Leggere consumo corrente da `api_usage_logs`.
2. Eseguire `checkDailyBudget` prima di qualsiasi richiesta.
3. Se `safe_mock` o limite raggiunto, terminare senza chiamate.
4. Se consentito, importare soltanto il perimetro pianificato.
5. Registrare ogni chiamata con `logApiUsage`.
6. Validare e scrivere un nuovo snapshot in Supabase.
7. Pubblicare il nuovo snapshot solo dopo successo completo.
8. In caso di errore, conservare il dato valido precedente.

## Budget provider stabile

Le env sono:

- `STABLE_PROVIDER_DAILY_BUDGET_REQUESTS`;
- `STABLE_PROVIDER_MONTHLY_BUDGET_REQUESTS`.

Restano vuote finché non viene scelto il piano reale. Il numero rappresenta richieste, non euro. Endpoint con costi diversi potranno richiedere pesi o quote separate.

## Logging e persistenza

`ApiUsageLogWriter` è un'interfaccia minima per un futuro adapter Supabase server-side. Se l'adapter manca o fallisce, il logger restituisce `persisted: false` e un errore leggibile. Prima della produzione bisognerà decidere se un errore di logging debba bloccare la chiamata successiva.

## Cache

Supabase è il cache/store operativo obbligatorio. Ogni snapshot futuro dovrà avere fonte, timestamp, confidenza e stato di validazione. “Caching” non significa risposta live memorizzata dopo una visita: l'import deve essere indipendente dal traffico utente.

## Non implementato

Provider reale, adapter Supabase, conteggio query, scheduler, retry, circuit breaker, snapshot publishing e alert.
