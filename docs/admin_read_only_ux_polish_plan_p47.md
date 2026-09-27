# Punto 47 — Admin read-only UX polish plan

## Scope

Piano di polish UX per la superficie admin read-only:

- `/admin/data`;
- `/admin/data/competitions`;
- `/admin/data/competitions/[slug]`;
- link da `/admin/imports`.

Il Punto 47 è solo piano/read-only:

- nessuna nuova scrittura DB;
- nessun provider/import;
- nessun Apify;
- nessun deploy;
- nessuna Production;
- dati `private_admin` non pubblici;
- verifica browser reale admin ancora `pending_no_admin_session`.

## Current admin surfaces

| Surface | Route | Current purpose | Status | Notes |
| --- | --- | --- | --- | --- |
| Admin data hub | `/admin/data` | entry point read-only verso dati manuali staging | implemented | mostra badge read-only/admin/public disabled |
| Competitions list | `/admin/data/competitions` | lista competition manuali da view read-only | implemented | tabella base con safety status |
| Competition detail | `/admin/data/competitions/[slug]` | dettaglio competition, teams e standings | implemented | summary + teams table + standings table |
| Imports page link | `/admin/imports` | link verso superficie manual data | implemented | link read-only presente nel contesto import |

## UX audit findings

| Area | Finding | Risk | Notes |
| --- | --- | --- | --- |
| titles | chiari ma migliorabili con “staging/manual fixture” | low | aiuterebbe distinguere da import/provider reali |
| read-only state | presente ma può essere più evidente | low | badge già presenti; consigliata card di safety persistente |
| provider/import off | presente in list, meno esplicito in hub/detail | low | aggiungere box uniforme |
| `private_admin` visibility | visibile nei dati, ma può diventare badge | low | evitare confusione con public exposure |
| empty state | presente, ma generico | medium | utile distinguere empty atteso da RLS/env issue |
| error/warning | presente via `result.warning` | low | mantenere messaggi senza segreti |
| navigation | link back/list presenti | low | consigliati breadcrumb coerenti |
| operations | nessun bottone operativo rilevato | pass | mantenere così |
| public exposure | nessuna route pubblica aggiunta | pass | `public_exposure_enabled=false` |
| browser verification | ancora pending | medium | UI deve mostrare che verifica admin reale non è completata |

## UX improvements recommended

| Improvement | Surface | Priority | Read-only safe? | Notes |
| --- | --- | --- | --- | --- |
| Breadcrumb admin | all admin data routes | P1 | yes | `Admin → Manual data → Competitions → Detail` |
| Badge “Read-only” più evidente | all surfaces | P1 | yes | evitare ambiguità operativa |
| Badge `private_admin` | list/detail | P1 | yes | evidenziare che i dati non sono pubblici |
| Box “Provider/import off” | hub/list/detail | P1 | yes | includere Apify off, deploy false, Production untouched |
| Warning “Public exposure disabled” | hub/list/detail | P1 | yes | dati manuali staging non sono route pubbliche |
| Warning “Browser admin verification pending” | hub/list/detail/imports | P1 | yes | non fingere che Punto 46-B/C/E sia passato |
| Summary cards per counts | competitions/detail | P2 | yes | competitions=1, teams=2, standings=2 se reader restituisce dati |
| Empty state più chiaro | list/detail | P2 | yes | spiegare: “nessun dato leggibile / controllare sessione admin o RLS” |
| Error state senza segreti | list/detail | P2 | yes | non mostrare stack/env/query |
| Link “Back to competitions” | detail | already present | yes | può diventare breadcrumb in Punto 48 |
| Standings table più leggibile | detail | P2 | yes | raggruppare punti/rank, evidenziare top row |
| Nota “Manual fixture data / staging” | all surfaces | P1 | yes | evita confusione con provider live |

## Not allowed

Non aggiungere:

- bottoni write/import/sync/save/run;
- form modifica;
- toggle status/visibility;
- edit/publish/delete;
- provider trigger;
- import trigger;
- deploy trigger;
- Server Action write;
- public exposure di dati `private_admin`.

## Recommended next step

Punto 48 — implement admin read-only UX polish, limitato a UI/testi/badge/empty state e senza cambiare reader, auth, RLS, DB o provider.
