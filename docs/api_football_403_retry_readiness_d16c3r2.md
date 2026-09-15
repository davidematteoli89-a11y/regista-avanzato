# D.16-C3-R2 — Readiness retry 403 API-Football

Stato: analisi/preparazione, nessuna seconda real-call.

Data/ora locale: 2026-09-15 15:35:12 CEST.

## Contesto

D.16-C3-R1 ha eseguito una sola richiesta reale controllata verso API-Football Free:

- provider: API-Football;
- endpoint: standings Serie A;
- richieste eseguite: 1;
- HTTP status: `403`;
- `api_errors_count=2`;
- `standings_groups_count=0`;
- `standings_rows_count=0`;
- mapping teorico non possibile;
- nessun retry automatico;
- nessuna seconda richiesta;
- nessuna scrittura DB.

## Audit script senza fetch

File analizzato:

- `scripts/provider/apiFootballProbe.ts`.

Risultato audit:

- base URL default: `https://v3.football.api-sports.io`;
- endpoint: `/standings`;
- parametri previsti:
  - `league=135`;
  - `season=2026`;
- header previsto: `x-apisports-key`;
- richieste pianificate: 1;
- una sola chiamata `fetch`;
- nessun retry automatico;
- nessun loop;
- nessuna paginazione;
- nessun client Supabase;
- nessun `service_role`;
- nessun writer DB;
- nessun output payload completo;
- output sanificato;
- token non stampabile.

Nota: D.16-C3-R2 non verifica online la documentazione provider e non esegue fetch esterne. La correttezza di piano/key/abilitazione va controllata manualmente nella dashboard/API provider.

## Possibili cause HTTP 403

Cause da verificare manualmente, senza condividere token:

- account/email API-SPORTS non confermata;
- piano Free non attivo;
- API Football v3 non abilitata;
- key non valida o non rigenerata correttamente;
- key non copiata correttamente in `.env.local`;
- header errato o non accettato;
- base URL errata o non consentita dal piano;
- endpoint/parametri non ammessi dal piano Free;
- restrizioni IP/domain;
- quota o accesso Free esauriti/non disponibili;
- season/league non disponibili per la sottoscrizione corrente.

## Checklist manuale prima di eventuale R2

Prima di autorizzare una nuova richiesta reale:

- [ ] email/account API-SPORTS confermati;
- [ ] dashboard API-SPORTS mostra piano Free attivo;
- [ ] API Football v3 attiva per la key;
- [ ] key nuova e non esposta;
- [ ] key inserita solo in `.env.local`;
- [ ] nessuna key in chat/docs/commit;
- [ ] nessuna restrizione IP/domain oppure IP locale autorizzato;
- [ ] header confermato: `x-apisports-key`;
- [ ] base URL confermata: `https://v3.football.api-sports.io`;
- [ ] endpoint confermato: `/standings`;
- [ ] parametri confermati per Serie A: `league=135`, `season=2026`;
- [ ] massimo 1 request;
- [ ] nessun retry;
- [ ] nessuna paginazione;
- [ ] nessun DB write;
- [ ] nessun import;
- [ ] nessun deploy;
- [ ] Production non toccata.

## Criteri per eventuale R2

Un eventuale R2 deve essere una fase separata e confermata esplicitamente.

Limiti:

- massimo una richiesta;
- solo API-Football;
- solo endpoint concordato;
- nessun retry automatico;
- output solo summary sanificato;
- nessuna response completa;
- nessuna scrittura DB;
- nessun provider/import attivato;
- Apify spento;
- TheStatsAPI non chiamato;
- Production non toccata.

## Conferme D.16-C3-R2

- Nessuna seconda real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.
