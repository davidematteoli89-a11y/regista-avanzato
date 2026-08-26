# Admin protection todo

## Stato attuale

La dashboard admin resta mock/dry-run sul piano dei dati operativi, ma il codice applica ora un blocco server-side Supabase Auth/RBAC.

## Protezione minima staging

- Mantenere Vercel Authentication attiva sui deployment Preview.
- Non collegare provider reali, Apify o dati sensibili.
- Non inserire `SUPABASE_SERVICE_ROLE_KEY` in ambienti client.
- Mostrare chiaramente stato mock/non produttivo nelle pagine admin.

## Protezione applicativa futura

- In `app/admin/layout.tsx`, la sessione e il ruolo vengono verificati prima di renderizzare sidebar/contenuti.
- Accesso consentito a `admin`, `super_admin` ed `editor`.
- Profilo mancante, non approved o ruolo insufficiente viene bloccato server-side.
- Non leggere dati admin da componenti client.
- Continuare a sostituire i reader mock con view `admin_*` e RPC server-side.

## Promozione admin

- Creare l'utente con Supabase Auth.
- Lasciare che il trigger crei il profilo `free_user`.
- Promuovere manualmente con SQL controllato in staging.
- Registrare la promozione in `admin_audit_logs` quando sara' disponibile il flusso audit operativo.
- Non usare metadata client per decidere il ruolo.

## Esito test staging

- L'utente test e' stato promosso ad `admin` dopo conferma.
- `is_admin()` e `is_editor_or_admin()` risultano true.
- `has_role('editor')` resta false, come atteso per un ruolo admin non editor.
- La lettura dei contenuti operativi admin passa da view `admin_*`, non da SELECT diretto sulle tabelle base.

## Test da fare

- Utente anon: `/admin` bloccato prima del render, verificato localmente come 404.
- Utente free_user: `/admin` bloccato.
- Utente editor: accesso solo alle aree editoriali previste.
- Utente admin: accesso alle aree operative via helper server-side e view `admin_*`, verificato localmente.
- Logout: `/admin` bloccato dopo uscita, verificato localmente.
- Nessun log, costo, provider config o source payload visibile fuori da admin.
