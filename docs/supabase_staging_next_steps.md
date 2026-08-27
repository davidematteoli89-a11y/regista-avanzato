# Supabase staging next steps

## Stato attuale

Supabase staging e Vercel Preview sono collegati e funzionanti per Auth, account, preferenze, ricerca quota e admin protetto.

Completato:

- Trigger/profilo utente verificato.
- RPC quota ricerca verificata fino al limite 3/3.
- RLS anon/free user testata senza leakage noto.
- Utente test promosso admin in staging e helper RBAC verificati.
- UI locale e Preview online testate su login, account, preferenze, ricerca, admin e logout.
- Provider reali e Apify restano spenti.

## Migration history risk

Le migrazioni `0001`-`0006` sono state applicate manualmente via `db query --file`.

Questo significa che `supabase_migrations.schema_migrations` potrebbe non essere allineata allo stato reale del database.

Regole fino a decisione:

- Non usare `supabase db push`.
- Non usare `supabase db reset`.
- Non rilanciare migrazioni già applicate.
- Non creare nuove migrazioni senza piano di tracking.

## Opzioni migration tracking

### Opzione A — Continuare manualmente nello staging attuale

Lasciare staging così com'è e applicare eventuali fix SQL mirati con query controllate.

Pro:

- Rischio basso sullo staging già funzionante.
- Non richiede reset.

Contro:

- Tracking migrazioni non standard.
- Richiede disciplina manuale.

### Opzione B — Allineare `schema_migrations`

Inserire/registrare con procedura controllata le migrazioni già applicate, dopo verifica esatta dello stato database.

Pro:

- Porta lo staging verso flusso Supabase più ordinato.

Contro:

- Va fatto con estrema prudenza.
- Rischio mismatch se una migrazione è stata applicata con piccole differenze manuali.

### Opzione C — Ricreare staging in futuro

Creare un nuovo staging vuoto e applicare le migrazioni con flusso Supabase corretto.

Pro:

- Stato pulito e riproducibile.

Contro:

- Richiede rifare seed, utente test e configurazioni.

## Prossima fase consigliata

FASE C:

1. Public readers Supabase per competitions/teams/matches.
2. Seed demo pubblicato e controllato.
3. Admin editorial content reale manuale.
4. Provider stable solo in dry-run.
5. Primo import reale solo dopo conferma.
6. Apify ancora spento fino a test budget.
7. Substack CTA finale.

## Cose da non fare ancora

- Non fare deploy production.
- Non inserire env su Production.
- Non attivare provider reali.
- Non chiamare TheStatsAPI, API-Football o Apify.
- Non importare dati reali.
- Non pubblicare contenuti reali.
- Non rimuovere Deployment Protection dal Preview.
