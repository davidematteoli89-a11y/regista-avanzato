# D.17-A — Pivot provider da API-Football a TheStatsAPI

Stato: pivot documentale/preparazione, nessuna real-call.

## Decisione

- API-Football è sospeso per ora dopo la prima real-call R1 con HTTP `403`.
- Non è previsto un retry API-Football nel prossimo step.
- TheStatsAPI diventa il provider scelto per la prossima fase di test.
- API-Football resta documentato come tentativo R1 e possibile alternativa/fallback futuro solo se necessario.
- Apify resta separato per campionati minori e resta spento.

## Motivo

Il pivot evita di perdere tempo sul `403` API-Football e consente di testare un provider alternativo potenzialmente più adatto a dati strutturati/editoriali.

Approccio confermato:

1. documentazione;
2. setup key sicuro;
3. script gated/disabilitato;
4. una sola probe read-only solo dopo conferma;
5. valutazione mapping;
6. eventuale import solo in fase successiva, con writer ancora bloccati finché non autorizzati.

## Placeholder env

`.env.example` contiene solo placeholder non segreti:

```env
THESTATSAPI_API_KEY=
THESTATSAPI_BASE_URL=
THESTATSAPI_PROBE_ENABLED=false
```

Nessun valore reale deve essere inserito in docs, chat o commit.

## Stato sicurezza

- Nessuna real-call TheStatsAPI.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- API-Football non richiamato.
- Apify spento.
- Production non toccata.

## Gate prima della futura probe TheStatsAPI

Prima di qualsiasi richiesta reale TheStatsAPI:

- verificare manualmente prezzo/piano/rate limit;
- verificare licenza, caching e diritti di pubblicazione;
- creare/ruotare key solo in env locale sicura;
- non inserire token in chat/docs/commit;
- preparare script separato dagli import;
- default `THESTATSAPI_PROBE_ENABLED=false`;
- massimo una richiesta;
- nessun retry/loop/paginazione;
- output solo summary sanificato;
- nessuna response completa salvata;
- nessuna scrittura DB;
- provider/import spenti;
- `realWritesEnabled=false`;
- Production esclusa.

## Prossimo step consigliato

D.17-B — setup key TheStatsAPI sicuro e documentale, ancora senza real-call.
