# D.17-B2 — Verifica setup locale key TheStatsAPI

Data: 2026-09-15  
Stato: completata localmente, senza real-call.

## Obiettivo

Verificare che il setup locale per la futura probe TheStatsAPI sia predisposto in modo sicuro, senza mostrare valori segreti, senza chiamare provider e senza scrivere su Supabase.

## Risultato verifica locale

- `.env.local` è ignorato da Git.
- `.env.local` non è staged.
- `THESTATSAPI_API_KEY_PRESENT=true`.
- `THESTATSAPI_BASE_URL_PRESENT=true`.
- `THESTATSAPI_PROBE_ENABLED=false`.
- `token_printed=false`.
- `external_fetch=false`.
- `db_write=false`.

La verifica ha controllato solo la presenza dei nomi variabile e il flag safe, senza stampare API key, base URL, prefissi, suffissi, hash o lunghezze.

## Stato sicurezza

- Nessuna real-call TheStatsAPI.
- Nessuna real-call API-Football.
- API-Football resta sospeso/no retry.
- Nessuna fetch provider.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- Production non toccata.

## Gate ancora chiuso

La presenza della key locale non autorizza chiamate reali.

Prima di D.17-C restano obbligatori:

- script TheStatsAPI separato dagli import;
- default gated/disabled;
- massimo una richiesta futura solo dopo conferma esplicita;
- output sanificato;
- token mai stampato;
- nessuna scrittura DB;
- provider/import ancora spenti;
- Production esclusa.

## Prossimo step consigliato

D.17-C — preparare lo script TheStatsAPI probe gated, ma non eseguirlo in modalità real-call.
