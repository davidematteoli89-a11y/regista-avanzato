# Technical Debt

## Priorità P0 — blocca produzione

| Debito | Evidenza | Azione |
|---|---|---|
| Build non riproducibile | Nessun lockfile/node_modules; versioni `latest` | Fissare versioni, installare, CI con typecheck/lint/build |
| Admin non protetto | Accesso `mock_admin`, nessun middleware/RBAC reale | Auth + ruoli + guard server + RLS |
| RLS assente | Schema esteso senza policy | Disegnare e testare policy deny-by-default |
| Stato DB non versionato | Un solo `schema.sql`, nessuna migration directory | Convertire in migrazioni e testare reset/rollback |
| Quota ricerca non atomica | Due implementazioni, persistenza mock/optimistic | Unificare e creare RPC transazionale |
| Nessun test | Nessun file/config test rilevato | Unit, integration, RLS ed E2E minimi |

## Priorità P1 — prima della beta

| Debito | Evidenza | Azione |
|---|---|---|
| Layout pubblico incoerente | Navigazione/footer inclusi pagina per pagina e non ovunque | Route group/layout pubblico unico |
| Typing da verificare | Possibile `user` nullo e callback cookie non tipizzate | Rieseguire TypeScript con dipendenze e correggere |
| API script potenzialmente obsoleti | `next lint` con Next non fissato | Scegliere versione e adeguare ESLint |
| Log e budget non persistenti | Logger safe/placeholder | Tabelle, transazioni, alert e retention |
| ID mapping incompleto | Provider esterni non scelti | Registry degli ID e test fixture |
| Nessuna osservabilità | Solo riepiloghi leggibili | Error tracking, metrics e run dashboard |
| Stato admin obsoleto | Overview riporta un numero di step precedente | Derivare stato da config o aggiornare manualmente |

## Priorità P2 — maturità del prodotto

- Consolidare modelli e messaggi duplicati tra moduli auth/freeSearch.
- Generare tipi database da Supabase per ridurre drift schema/TypeScript.
- Aggiungere boundary error/loading/empty coerenti.
- Usare allowlist esplicite nei DTO pubblici.
- Sanitizzare Markdown e rich text.
- Definire timezone canonica per match, periodi quota e scheduler.
- Aggiungere localization/formatting coerente per date e numeri.
- Aggiungere test responsive, accessibilità, SEO e performance.
- Definire data retention, backup e restore.
- Documentare ADR per provider, Auth/RBAC, cache e pipeline editoriale.

## Debito intenzionale accettabile nel mock MVP

- Dataset finti e generatori deterministici.
- Adapter provider senza fetch.
- Script dry-run senza Supabase.
- CTA Substack senza API.
- Scheduler e auto-publish disabilitati.

Questi elementi diventano debito bloccante solo quando il prodotto viene presentato come aggiornato, persistente o disponibile a utenti reali.

## Regola di gestione

Ogni attivazione reale deve rimuovere il placeholder corrispondente, aggiungere test e aggiornare documentazione/stato nello stesso cambiamento. Non mantenere contemporaneamente due fonti di verità per la stessa regola operativa.
