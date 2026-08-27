# Production Readiness

## Verdetto

Regista Avanzato non è ancora pronto per produzione reale.

È pronto per staging/Preview protetto, con Supabase Auth/RLS e admin server-side funzionanti, ma non per utenti o dati reali non controllati.

## Stato dopo FASE B

Pronto per staging/Preview protetto:

- UI mock/staging online.
- Supabase Auth collegato a Preview.
- Account, preferenze, quota ricerca e admin protetto verificati.
- Vercel Authentication attiva.
- Provider reali spenti.
- Apify spento.

Non pronto per Production:

- Dati calcistici reali non ancora importati.
- Public readers Supabase non ancora completati per tutte le entità.
- Admin operativo ancora parzialmente mock/dry-run.
- Migration tracking Supabase da decidere.
- Security hardening finale non automatizzato in CI.
- Repo privacy da confermare manualmente.
- Env Production non configurate per Supabase staging, correttamente.

## Gate di rilascio Production

| Area | Stato B.9 | Gate obbligatorio |
|---|---|---|
| Build | Lint/typecheck/build verdi | Verifica CI su branch dedicato |
| GitHub | Da confermare Private | Repository privato o politica di pubblicazione esplicita |
| Vercel | Preview funzionante | Production Branch `production`, env separate, niente promozioni accidentali |
| Supabase | Staging funzionante | Migration tracking deciso e test RLS ripetibili |
| Auth | Login/account ok | Recovery, email policy e utenti reali testati |
| Admin | Protetto server-side | Ruoli, audit log e blocchi su ogni azione reale |
| Ricerca | RPC quota ok | Test concorrenza e anti-abuso |
| Provider | Spenti | Dry-run, budget, logging, licenza e fallback |
| Apify | Spento | Budget hard stop e test latest-round only |
| Contenuti | Mock/manuali | Workflow review, publish state e takedown |

## Checklist prima della Production

- [ ] Repository GitHub confermato Private.
- [ ] Production Branch confermato `production`.
- [ ] Deployment Protection/Access Control definito per ambienti non Production.
- [ ] Service role ruotata e mai esposta nel client.
- [ ] Tipi Supabase generati o validati.
- [ ] RLS test automatizzati per anon/free/editor/admin.
- [ ] Public views controllate per leakage colonne interne.
- [ ] Admin protetto server-side su ogni route sensibile.
- [ ] Seed demo pubblicato controllato.
- [ ] Provider reali ancora disattivati fino a dry-run approvato.
- [ ] Apify ancora disattivato fino a test budget approvato.
- [ ] Backup/restore e procedura incidenti definiti.
- [ ] Test e2e principali su Preview.

## Vietato prima della readiness

- `vercel --prod`.
- Promozione manuale Preview a Production.
- Token provider reali in Production.
- Token Apify in Production.
- Import automatici.
- Pubblicazione dati non verificati.
- Download/reupload highlights video.
