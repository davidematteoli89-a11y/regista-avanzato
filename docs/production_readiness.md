# Production Readiness

## Verdetto

**Non pronto per la produzione.** Il progetto è adatto a demo locale mock e revisione UX/architetturale. L'assenza di una build riproducibile verificata, RLS, protezione admin, test e integrazioni reali impedisce un rilascio con utenti o dati reali.

## Gate di rilascio

| Area | Stato attuale | Gate obbligatorio |
|---|---|---|
| Build | Dipendenze non installate, nessun lockfile | Install pulito, typecheck, lint e build verdi in CI |
| Configurazione | `.env.example` completo; env locale non ispezionato | Validazione env all'avvio e separazione dev/staging/prod |
| Database | Schema locale, nessuna migrazione applicata verificata | Migrazioni versionate, backup/restore e rollback provati |
| RLS | Policy assenti | Policy per tabella con test positivi e negativi |
| Auth | Flusso preparato/safe | Sessioni, logout, errori, profilo e account deletion testati |
| Admin | Mock admin consentito | RBAC reale, middleware e autorizzazione server-side |
| Ricerca free | Contatore mock e duplicato | RPC atomica, rate limit e unica fonte di verità |
| Provider | Solo mock/manual attivi | Contratto, licenza, budget, retry e import idempotente |
| Apify | Disattivato e dry-run | Verifica legale, pilot limitato, lock e hard stop persistente |
| Copyright | Regole solide ma dati mock | Provenance, verifica periodica, takedown e registro approvazioni |
| Editoriale | Human review modellata | Persistenza, versioning, ruoli e audit trail |
| Osservabilità | Log leggibili non persistenti | Error tracking, metriche, alert, job/run ID e retention |
| Qualità | Nessun test automatico | Unit, integration, RLS, E2E e browser/responsive/a11y |
| Compliance | Non verificata | Privacy, cookie, termini, data retention e DPA fornitori |

## Prova di produzione minima

Prima di una beta, completare un percorso verticale:

1. Import server-side di una competizione FULL.
2. Upsert idempotente su Supabase dev/staging.
3. Lettura pubblica solo dalla tabella autorizzata.
4. Login reale e statistiche complete protette da RLS.
5. Admin accessibile solo a un ruolo autorizzato.
6. Monitoraggio di errori, costi e freshness.
7. Rollback o fallback all'ultimo snapshot valido.

## Criteri non funzionali

- Nessun secret nel bundle browser o nei log.
- Nessuna chiamata provider/Apify provocata da una request di pagina pubblica.
- Timeout, retry con backoff e circuit breaker per i job futuri.
- Job idempotenti con lock e chiavi esterne univoche.
- Cache con timestamp di aggiornamento visibile.
- Backup e restore testati.
- Accessibilità WCAG, responsive e performance misurate.
- Processo documentato per incidenti, dati errati e rimozione link.
