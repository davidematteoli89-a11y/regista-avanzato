# Apify budget safety plan — D.1

Stato: piano preparato, Apify spento.

## Budget

- budget massimo mensile: 30 €;
- warning: 24 €;
- hard stop: 30 €.

## Uso consentito futuro

Apify/SofaScore può essere usato solo per:

- campionati `apify_light_plus_p1`;
- campionati `apify_light_plus_p2`;
- import settimanale/manuale;
- latest round only;
- arricchimento campionati minori.

Vietato:

- FULL_OFFICIAL via Apify;
- live scraping;
- scraping quando un utente apre una pagina;
- storico completo massivo;
- download video;
- reupload highlights;
- chiamate lato client;
- chiamate lato pagina pubblica.

## Stato codice

Moduli già presenti:

- `lib/dataProvider/apifySofaScoreProvider.ts`;
- `lib/apify/checkApifyMonthlyBudget.ts`;
- `lib/apify/getApifyImportPriority.ts`;
- `lib/apify/createWeeklyApifyPlan.ts`;
- `lib/apify/estimateApifyRunCost.ts`;
- `lib/apify/apifyImportGuards.ts`;
- `lib/apify/buildSofaScoreActorInput.ts`;
- `lib/apify/validateApifyInput.ts`;
- `scripts/runWeeklyApifyLightImport.ts`;
- `scripts/importApifyLastMatchday.ts`.

Tutti devono restare dry-run/mock finché non viene approvata una fase dedicata.

## Piano dry-run Apify

1. Lasciare `apify_sofascore` disattivato.
2. Non configurare token in Production.
3. Simulare budget:
   - `< 24 €`: P1 poi P2 se budget residuo;
   - `>= 24 €`: solo P1 essenziali;
   - `>= 30 €`: hard stop.
4. Creare piano weekly senza actor reale.
5. Escludere automaticamente FULL_OFFICIAL.
6. Limitare scope a `latest_round`.
7. Stampare solo riepilogo:
   - competizioni candidate;
   - priorità;
   - costo stimato mock;
   - skip reason;
   - run reali = 0;
   - scritture Supabase = 0.

## Prima vera chiamata futura

Solo dopo conferma esplicita:

1. verificare termini/licenza actor e fonte;
2. configurare token solo server-side in Preview;
3. selezionare una sola competizione piccola P1;
4. impostare budget residuo sicuro;
5. eseguire una run manuale non schedulata;
6. salvare payload raw solo se consentito e redatto;
7. non pubblicare automaticamente;
8. validare mapping;
9. scrivere log Apify;
10. mantenere ultimo dato valido in caso di errore.

## Query read-only staging

```sql
select provider_key, is_active, monthly_budget_eur, warning_budget_eur, hard_stop_budget_eur
from public.data_providers
where provider_key = 'apify_sofascore';

select *
from public.apify_budget_status
order by period_start desc
limit 12;

select c.slug, c.name, c.tracking_level, c.apify_enabled, c.apify_priority, pc.import_enabled
from public.competitions c
left join public.provider_competition_config pc on pc.competition_id = c.id
where c.tracking_level in ('apify_light_plus_p1', 'apify_light_plus_p2')
order by c.tracking_level, c.slug;

select status, count(*) as runs
from public.apify_usage_logs
group by status
order by status;
```

## Hard stop operativo

Se il budget stimato è `>= 30`:

- non costruire actor input operativo;
- non lanciare run;
- loggare skip;
- mantenere dati precedenti;
- non cancellare nulla.

Se il budget stimato è `>= 24`:

- saltare P2;
- importare solo P1 essenziali in futura modalità approvata;
- nessuna promessa di copertura profonda.
