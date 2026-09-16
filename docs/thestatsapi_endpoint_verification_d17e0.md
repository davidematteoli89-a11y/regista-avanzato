# D.17-E0 — Verifica endpoint TheStatsAPI

Stato: verifica documentale completata, nessuna real-call.

## Contesto

TheStatsAPI è stato scelto come provider candidato dopo la sospensione di API-Football.

D.17-E0 verifica solo endpoint, auth e parametri prima della futura prima real-call D.17-E.

Conferme:

- nessuna real-call TheStatsAPI;
- nessuna fetch verso endpoint API TheStatsAPI;
- nessuna real-call API-Football;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `service_role`;
- nessun `db push/reset`;
- provider/import spenti;
- Apify spento;
- Production non toccata.

## Fonti documentali controllate

Pagine pubbliche TheStatsAPI consultate senza premere pulsanti `Try it`, `Run`, `Execute` o simili:

- `https://www.thestatsapi.com/football-api`
- `https://www.thestatsapi.com/use-cases/football-dashboard-api`
- `https://www.thestatsapi.com/football/league/serie-a/standings`
- `https://www.thestatsapi.com/`

Non sono stati copiati token e non sono state eseguite richieste API reali.

## Risultato verifica

- Base URL confermata: sì.
- Base URL candidata: `https://api.thestatsapi.com/api`.
- Auth confermata: sì.
- Auth candidata: `Authorization: Bearer <token>`.
- Header aggiuntivo consigliato: `Accept: application/json`.
- Endpoint più leggero confermato: parziale.
- Endpoint candidate leggero: `GET /football/competitions`.
- Endpoint Serie A confermato: sì, da pagina pubblica Serie A standings.
- Endpoint candidato finale per D.17-E: `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`.
- Parametri Serie A confermati: sì, come path params `competition_id` e `season_id`.
- Parametri/path candidati:
  - `competition_id=comp_5840`;
  - `season_id=sn_6199313`.
- Paginazione presente: sì per diversi endpoint collection; non chiaro/da confermare per lo standings specifico.
- Rischio payload pesante: basso/medio per standings Serie A, perché atteso come tabella singola; più alto per matches/fixtures se non limitati.

## Decisione endpoint per D.17-E

Opzione A — endpoint confermato e pronto per preparare una prima real-call controllata.

Endpoint scelto:

- metodo: `GET`;
- base URL: `https://api.thestatsapi.com/api`;
- path: `/football/competitions/comp_5840/seasons/sn_6199313/standings`;
- auth: `Authorization: Bearer <token>`;
- header: `Accept: application/json`;
- requests massimo: 1.

Condizione: prima di D.17-E va ricontrollato in dashboard/documentazione che `sn_6199313` sia ancora la stagione corretta per Serie A corrente.

## Script aggiornato

Aggiornato solo:

- endpoint candidato;
- costanti `competition_id` / `season_id`;
- header `Accept`;
- output descrittivo sanificato della futura real-call.

Non è stata eseguita la real-call.

## Checklist D.17-E

Prima della real-call:

- [ ] `THESTATSAPI_PROBE_ENABLED=false` fino al momento esatto.
- [ ] `REAL_PROVIDER_PROBE_ENABLED=false` fino al momento esatto.
- [ ] Entrambi i gate abilitati solo per la singola esecuzione autorizzata.
- [ ] Massimo 1 richiesta.
- [ ] Nessun retry.
- [ ] Nessun loop.
- [ ] Nessuna paginazione.
- [ ] Nessuna fetch multipla.
- [ ] Nessuna scrittura DB.
- [ ] Nessun import.
- [ ] Nessun provider activation.
- [ ] Nessun `service_role`.
- [ ] Nessun deploy.
- [ ] Production non toccata.
- [ ] Output solo summary sanificato.
- [ ] `token_printed=false`.
- [ ] Response completa non stampata.
- [ ] API-Football sospeso/no retry.
- [ ] Apify spento.

## Criteri di stop

Fermarsi se:

- key assente;
- errore `401`/`403`;
- endpoint/stagione non confermati;
- payload inatteso;
- rate limit/licenza non chiari;
- qualsiasi tentativo di seconda fetch;
- qualsiasi tentativo di DB write;
- qualsiasi stampa token o parti di token;
- qualsiasi dubbio su Production/env.

## Prossimo step consigliato

D.17-E — prima real-call TheStatsAPI controllata, una sola richiesta read-only, solo dopo conferma esplicita dell'utente.

## D.17-E/F — Esito probe reale

La probe reale controllata è stata eseguita con gate attivi e stop sicuro:

- `/football/competitions`: HTTP `404`;
- `requests_executed=1`;
- standings Serie A non eseguito;
- nessun retry;
- nessuna response completa salvata;
- nessun token stampato;
- nessuna scrittura DB.

Conclusione: l'endpoint `/football/competitions` non è valido nella forma testata o richiede path/versione differente. Prima di ulteriori real-call serve revisione manuale della dashboard/documentazione TheStatsAPI.
