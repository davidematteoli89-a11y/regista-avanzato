# Punto 34 — No-apply safety lock

Il progetto resta in no-apply mode.

Stato corrente:

- migration draft fuori da `supabase/migrations`;
- nessun DB write autorizzato;
- nessun provider autorizzato;
- nessun import autorizzato;
- nessun deploy Production autorizzato;
- `next_write_allowed=false`;
- `ready_for_apply=false`;
- Punto 35 non parte senza frase esplicita.

| Area | Current lock | Can change without explicit authorization |
|---|---|---|
| database write | blocked | no |
| migration apply | blocked | no |
| supabase/migrations | blocked | no |
| provider activation | blocked | no |
| Apify | blocked | no |
| import reali | blocked | no |
| Production deploy | blocked | no |
| service_role | blocked | no |
| admin write actions | blocked | no |

## Decisione

Il lock resta attivo. Nessuna frase generica sblocca il Punto 35.

## Punto 35 follow-up

Il lock è stato parzialmente aperto solo perché è arrivata la frase esplicita richiesta.

La creazione del file migration reale è avvenuta, ma l’apply DB resta bloccato:

- migration applied: `false`;
- db write: `false`;
- provider/import off;
- Production untouched;
- `next_write_allowed=false`.
