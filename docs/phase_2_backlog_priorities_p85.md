# Phase 2 Backlog & Priorities — P85

## Scope

- planning only;
- no code change;
- no deploy;
- no DB write;
- no provider/import;
- no Apify.

## Current baseline

| Item | Value |
| --- | --- |
| Production URL | `https://regista-avanzato-rouge.vercel.app/` |
| MVP Production status | `production_release_verified=true`, `mvp_production_freeze=true` |
| Production routes | `/`, `/competitions`, `/competitions/manual-serie-a` all HTTP 200 |
| Public data | `public_competitions_count=1`, `public_teams_count=2`, `public_standings_count=2`, `public_bundle_status=ready` |
| Monitoring | `production_monitoring_ready=true` |
| Provider/import | `provider_import_enabled=false` |
| Apify | `apify_enabled=false` |
| DB writes | `db_write_additional=false` |
| Rollback | `rollback_executed=false` |

## Backlog areas

### 1. Public product polish

Obiettivo: rendere il sito più credibile, leggibile e utile per un utente reale.

Item:

- homepage più editoriale;
- hero più chiaro;
- spiegazione “cos’è Regista Avanzato”;
- CTA verso newsletter/Substack;
- pagina `/competitions` più curata;
- dettaglio competizione più prodotto vero;
- microcopy su MVP/dati demo;
- stato dati trasparente;
- miglioramento responsive;
- SEO base.

### 2. Editorial content

Obiettivo: iniziare a trasformare il sito da demo tecnica a prodotto editoriale.

Item:

- prime storie calcistiche;
- rubriche ricorrenti;
- “Talento della settimana”;
- “Il calcio si ripete”;
- radar video/highlights;
- newsletter free;
- contenuti Substack;
- piano editoriale 4 settimane.

### 3. Login/free quota

Obiettivo: attivare il modello free/premium leggero già previsto.

Item:

- login utente;
- 3 ricerche free;
- sblocco highlights/statistiche con login;
- area account base;
- tracking quota;
- messaggi UX per utente non loggato;
- nessun pagamento/Stripe per ora.

### 4. Admin workflow

Obiettivo: rendere semplice gestire contenuti e stato dati.

Item:

- dashboard stato dati;
- dashboard provider off/on;
- checklist import manuale;
- stato public/private visibility;
- strumenti read-only;
- log operativi;
- nessuna write action senza gate.

### 5. Manual data expansion

Obiettivo: espandere il contenuto senza ancora attivare provider reali.

Item:

- aggiungere altri campionati manuali;
- dataset leggero per Olanda/Belgio/Portogallo/Turchia;
- fixture manuali;
- squadre/classifiche minime;
- documentare import manuale;
- evitare provider automatici.

### 6. Future providers

Obiettivo: preparare ma non attivare provider.

Item:

- TheStatsAPI solo quando entitlement attivo;
- Apify/SofaScore solo con budget;
- probe gated;
- import dry-run;
- writer guards;
- nessuna fetch reale senza autorizzazione;
- nessuna DB write provider senza gate.

## Prioritization table

| Rank | Area | Item | Impact | Effort | Risk | Why now |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Public product polish | Homepage più forte e spiegazione chiara del prodotto | High | Medium | Low | È la prima impressione Production e può migliorare credibilità senza DB write. |
| 2 | Public product polish | CTA newsletter/Substack | High | Low | Low | Trasforma traffico iniziale in contatto/lead, senza pagamenti o provider. |
| 3 | Public product polish | `/competitions` e dettaglio più editoriali | High | Medium | Low | Le route principali sono già live; migliorarle aumenta valore percepito. |
| 4 | Public product polish | Microcopy dati demo/MVP e stato dati trasparente | Medium | Low | Low | Riduce ambiguità sui dati pubblici attuali e protegge aspettative utente. |
| 5 | Editorial content | Piano contenuti 4 settimane | High | Medium | Low | Serve continuità editoriale prima di espandere funzioni complesse. |
| 6 | Login/free quota | UX login/free quota leggera | Medium | Medium/High | Medium | Utile, ma conviene dopo una proposta pubblica più chiara. |
| 7 | Manual data expansion | Altri campionati manuali | Medium | High | Medium | Aumenta contenuto ma introduce governance dati; dopo polish e piano editoriale. |
| 8 | Future providers | Probe/import provider gated | High future | High | High | Restano off finché non c’è nuova autorizzazione e budget/entitlement chiari. |

## Sprint 1 recommendation

Sprint 1 post-MVP consigliato: Public product polish.

Perché ora:

- il MVP è già online e verificato;
- le route pubbliche funzionano;
- migliorare percezione, chiarezza e CTA è ad alto impatto e basso rischio;
- non richiede DB write, provider/import o Apify.

Scope:

- homepage più forte;
- CTA newsletter/Substack;
- `/competitions` più chiara;
- dettaglio competizione più leggibile;
- microcopy dati demo;
- nessuna DB write;
- nessun provider;
- nessun deploy Production automatico senza gate.

Out of scope:

- provider reali;
- Apify;
- Stripe/pagamenti;
- import automatici;
- modifiche Supabase schema;
- nuove DB write;
- admin write actions.

Expected next points:

- P86 — Public product polish plan;
- P87 — Implement public product polish;
- P88 — Production polish release gate.

## Provider policy

Provider/import/Apify restano off fino ad autorizzazione esplicita futura.

Non sono consentiti:

- chiamate TheStatsAPI/API-Football;
- chiamate Apify/SofaScore;
- fetch provider;
- import automatici;
- DB write provider;
- writer reali senza gate esplicito.

## Decision

- `point_85_phase_2_backlog_completed=true`
- `phase_2_backlog_created=true`
- `sprint_1_recommended=public_product_polish`
- `no_code_change=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
