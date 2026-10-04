# Supabase staging issues

## Errori bloccanti

Nessun errore bloccante nelle migrazioni `0001`-`0006`.

## Warning e note operative

- La Supabase CLI non era installata globalmente; e' stata usata via `npx supabase@latest`.
- `supabase link` ha creato `supabase/.temp/`. La cartella e' locale e non va versionata; e' stata aggiunta a `.gitignore`.
- Un primo controllo trigger via `information_schema.triggers` ha restituito 0, ma il controllo corretto via `pg_trigger` ha confermato 43 trigger utente.
- Una query di verifica post-RLS aveva una colonna inesistente (`table_type` dentro `information_schema.table_privileges`); la migrazione era corretta e il controllo e' stato rilanciato con query corretta.
- Le migrazioni sono state applicate una alla volta con `db query --file`, quindi la cronologia `supabase_migrations.schema_migrations` non e' stata creata/aggiornata.

## Rischi residui

- E' stato creato un utente test controllato e il trigger profilo funziona; manca ancora il test completo via UI/app.
- La RPC quota funziona con profilo approved in test sequenziale; manca ancora il test concorrente.
- Le view pubbliche sono state testate solo su dataset draft/private; manca test con dati published controllati.
- `/admin` resta mock/non produttivo finche' il codice non blocca server-side per ruolo.
- Il progetto staging contiene ora lo schema Regista Avanzato: non e' piu' vuoto.
- Un futuro `supabase db push` potrebbe tentare di riapplicare migrazioni gia' eseguite se la cronologia non viene allineata.

## Nessun problema trovato su

- Provider esterni: tutti disattivati.
- Apify: nessun log, nessuna run, nessun import abilitato.
- Seed: nessun utente, nessuna password, nessun token, nessun contenuto reale.
- Grant anon: nessun SELECT diretto su tabelle base sensibili.
- Test RLS anon/free_user di base: nessun leakage rilevato.
