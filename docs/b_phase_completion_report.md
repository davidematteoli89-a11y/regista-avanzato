# FASE B completion report

Data di chiusura: 2026-08-27

## Stato finale

La FASE B ha portato Regista Avanzato da MVP mock locale a staging protetto con Supabase Auth/RLS e Vercel Preview collegati.

Stato confermato:

- Vercel Preview online e funzionante.
- Environment Vercel: Preview.
- Branch: `preview`.
- Commit applicativo: `b5327ba` (`Connect Supabase staging auth and admin protection`).
- Supabase staging collegato al codice.
- Auth online funzionante.
- Area account online funzionante.
- Preferenze utente funzionanti via RLS.
- Ricerca avanzata collegata a RPC quota, con limite 3/3 funzionante.
- `/admin` protetto server-side da sessione e ruolo.
- Utente test admin funzionante in staging.
- Vercel Authentication attiva sul Preview.
- Provider reali disattivati.
- Apify disattivato.
- Production non toccata.

## Cosa funziona ora

- Login e logout tramite Supabase Auth.
- Profilo utente creato e letto da staging.
- Preferenze utente lette/scritte in modo controllato.
- Quota ricerca mensile reale via RPC.
- Blocco ricerca avanzata dopo 3 ricerche/mese.
- Admin accessibile solo a utente autorizzato.
- Protezione Preview tramite Vercel Authentication.

## Cosa resta mock o dry-run

- Dati calcistici pubblici completi.
- Import competizioni/squadre/partite/statistiche.
- Provider stabile TheStatsAPI/API-Football.
- Provider Apify/SofaScore.
- News Radar automatico.
- Article/Newsletter/Reel generator operativo.
- Admin dashboard con azioni reali di import/pubblicazione.
- Contenuti editoriali reali e workflow editoriale completo.
- Substack API o invii automatici.

## Cosa resta vietato attivare

- Deploy Production.
- `vercel --prod`.
- Variabili Supabase staging su Production.
- Token provider reali.
- Token Apify.
- Import automatici.
- Scrittura dati reali via script import.
- Scraping live o chiamate provider lato utente.
- Download/reupload di video partita.

## Sicurezza verificata

- `.env.local`, `.env*`, `.vercel/`, `supabase/.temp/`, `.next/`, `node_modules/` e `*.tsbuildinfo` sono ignorati.
- `AGENTS.md` e `CLAUDE.md` sono ignorati come file locali/tooling.
- Scansione locale su file tracciabili e file agent non tracciati: nessun segreto grezzo rilevato.
- I riferimenti a `SUPABASE_SERVICE_ROLE_KEY` sono nomi/documentazione/server-side, non valori.
- Vercel Preview usa env Supabase staging configurate manualmente solo su Preview.
- Deployment Protection risulta attiva lato Vercel.

## Verifiche da confermare manualmente

- Repository GitHub effettivamente Private.
- Service role key ruotata dopo esposizione accidentale.
- Production Branch impostato a `production`.
- Le tre env Supabase presenti solo in Preview e non in Production.

## Rischi residui

- La cronologia delle migrazioni Supabase potrebbe non essere allineata perché i file `0001`-`0006` sono stati applicati manualmente via `db query --file`.
- Serve decidere una strategia di migration tracking prima di nuove migrazioni.
- Serve test concorrenza RPC ricerca con chiamate parallele.
- Serve generazione/validazione tipi Supabase prima di ampliare query reali.
- Il repo risultava indicato come `public` nei metadati Vercel: verificare su GitHub.

## Prossima fase consigliata

Passare alla FASE C con lettori Supabase pubblici minimi e seed demo controllato, mantenendo provider reali e Apify spenti.
