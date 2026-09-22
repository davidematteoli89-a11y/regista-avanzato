# Punto 34 — Apply authorization language

## Scopo

Questo documento definisce la sola forma valida per autorizzare in futuro un vero apply staging delle view read-only di manual import.

## Frasi non valide

Le seguenti frasi NON autorizzano apply, DB write, creazione migration reale o modifiche in `supabase/migrations`:

- “procedi”
- “vai”
- “continua”
- “ok”
- “fai tu”
- “applica”
- “facciamo”
- qualsiasi conferma generica o ambigua

## Frase valida futura

L’unica autorizzazione valida dovrà essere esplicita e simile a:

> Autorizzo il Punto 35: crea la migration reale in supabase/migrations e applicala solo in Supabase staging, non Production, seguendo backup e rollback checklist. Confermo che provider/import restano spenti.

## Ulteriori vincoli

Anche con una frase esplicita:

- il sistema deve fare un ultimo check;
- Production resta esclusa;
- provider/import restano spenti;
- backup e rollback devono essere pronti;
- se c’è dubbio, fermarsi;
- `next_write_allowed` resta `false` fino allo step autorizzato.

