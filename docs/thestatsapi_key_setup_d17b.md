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

## D.17-C — Script gated preparato

Lo script TheStatsAPI gated è stato preparato per la futura probe, ma resta disabilitato di default:

- comando previsto: `npm run probe:thestatsapi:gated`;
- default `THESTATSAPI_PROBE_ENABLED=false`;
- richiede anche `REAL_PROVIDER_PROBE_ENABLED=true` per qualunque futura fetch;
- massimo 1 richiesta futura;
- nessuna lettura token in modalità disabled;
- nessuna fetch provider in modalità disabled;
- nessuna scrittura DB;
- nessuna attivazione provider/import.

## D.17-D — Checklist pre-real-call

La checklist finale prima della prima eventuale richiesta TheStatsAPI è stata preparata.

Conferme:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- endpoint ancora candidato e da confermare;
- D.17-E richiede conferma esplicita utente.

## D.17-E0 — Endpoint verificato da documentazione

D.17-E0 ha verificato da documentazione pubblica TheStatsAPI:

- base URL candidata confermata;
- auth Bearer confermata;
- endpoint Serie A standings candidato individuato;
- nessuna real-call;
- nessun token letto/stampato;
- nessuna fetch provider;
- nessuna scrittura DB.

La key resta solo locale e non va mai riportata in chat/docs/commit.

## D.17-E/F — Uso key nella probe reale

Durante la probe reale controllata:

- `token_read=true` solo durante l'esecuzione con gate espliciti;
- `token_printed=false`;
- nessun valore, prefisso, suffisso, hash o lunghezza della key è stato stampato;
- `.env.local` non è stato committato;
- nessuna scrittura DB.
