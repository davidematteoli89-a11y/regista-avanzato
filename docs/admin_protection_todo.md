# Admin protection todo

## Stato attuale

La dashboard admin resta mock/dry-run sul piano dei dati operativi, ma il codice applica ora un blocco server-side Supabase Auth/RBAC.

## Protezione minima staging

- Mantenere Vercel Authentication attiva sui deployment Preview.
- Non collegare provider reali, Apify o dati sensibili.
- Non inserire `SUPABASE_SERVICE_ROLE_KEY` in ambienti client.
- Mostrare chiaramente stato mock/non produttivo nelle pagine admin.
- Mostrare un tasto `Esci` visibile nell'area admin per chiudere la sessione Supabase senza passare dall'account pubblico.
- La navbar pubblica legge ora la sessione server-side: da non loggato mostra `Accedi` e `Registrati gratis`, da loggato mostra `Account`.

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
- C.4.2: il logout admin deve reindirizzare a `/login` e lasciare `/admin` bloccato per non autenticati.
- Nessun log, costo, provider config o source payload visibile fuori da admin.
- Dopo login Supabase, la navbar pubblica non deve più mostrare `Accedi`/`Registrati gratis`; deve mostrare `Account` senza esporre ruolo o dati admin.

## C.4.3 — Test Preview completato manualmente

La verifica tecnica ha confermato:

- deployment Preview Ready per il branch `preview` e commit `11646dc`;
- Deployment Protection attiva con redirect anonimo a Vercel SSO;
- Production non toccata.

Conferme browser manuali:

- tasto `Esci` visibile in `/admin`;
- click `Esci` con redirect a `/login`;
- `/admin` bloccato dopo logout;
- navbar pubblica `Accedi`/`Registrati gratis` da non loggato;
- navbar pubblica `Account` da loggato.
- registrazione funzionante dopo configurazione corretta degli URL Supabase Auth;
- `/admin` accessibile solo con account admin;
- utenti non loggati/non admin bloccati o 404.

Nota: il test automatico non è stato completato perché la protezione Vercel funziona e il browser agent non è disponibile nella sessione locale. La chiusura è basata su verifica manuale dell'utente.

Checklist aggiornata dopo fix CTA:

- da non loggato, la navbar deve mostrare `Accedi` e `Registrati gratis`;
- `Accedi` deve aprire `/login`;
- `Registrati gratis` deve aprire `/registrati`;
- da loggato, la navbar deve mostrare solo `Account` verso `/account`.

## Supabase Auth URL per Preview

- Per test Preview, `Site URL` e `Redirect URLs` in Supabase Auth devono puntare al dominio Preview usato.
- `localhost` deve restare solo per sviluppo locale.
- Link email già generati prima del cambio URL possono puntare ancora al vecchio URL.
- Dopo cambio URL, rigenerare registrazione/email di conferma.

## Nota performance login/logout

- `force-dynamic` sul layout pubblico è intenzionale per evitare navbar statica non coerente con la sessione.
- `getCurrentUser()` è deduplicata per richiesta con `React.cache`.
- Le letture quota non rileggono la sessione quando ricevono già `userId`.
- Il logout admin resta minimale: `signOut()` Supabase server-side e redirect a `/login`.
- La lentezza percepita su Preview può dipendere da Vercel Authentication, Supabase Auth remoto e cold start Preview.
- Prima di ulteriori ottimizzazioni, misurare nel browser i tempi di:
  - click `Accedi` -> `/login`;
  - submit login -> `/account`;
  - click `Esci` admin -> `/login`.

## Stato C.4

- Le sezioni admin editoriali iniziano a leggere contenuti da Supabase staging con reader server-side.
- Reader collegati:
  - `getAdminEditorialArticles()`;
  - `getAdminNewsItems()`;
  - `getAdminStories()`;
  - `getAdminHistoricalEchoes()`;
  - `getAdminEditorialSummary()`.
- Le query passano da view `admin_*` protette da RLS/RBAC.
- Il client usato è quello server-side della sessione, non `SUPABASE_SERVICE_ROLE_KEY`.
- Le code mock/dry-run restano visibili e chiaramente separate dai blocchi Supabase staging.

## TODO sicurezza per azioni reali

- Aggiungere Server Actions con controllo `requireAdmin()` o helper equivalente.
- Bloccare update massivi senza filtro `id`.
- Registrare ogni scrittura in `admin_audit_logs`.
- Implementare rollback/unpublish prima di delete.
- Testare editor/admin/free_user/anon su ogni azione.

## C.4.4 — Hardening view admin

- Preparata migrazione `0007_admin_editorial_views_explicit_columns.sql`.
- Obiettivo: sostituire le quattro view admin editoriali usate dal codice con versioni a colonne esplicite.
- Nessuna policy RLS viene modificata.
- Nessuna tabella base viene alterata.
- Nessun dato viene cancellato.
- Le colonne interne restano visibili solo dove servono alla UI admin:
  - `internal_notes`;
  - `internal_warnings`;
  - `internal_score`.
- Le public view restano separate e non ricevono score/warning/note interne.

Verifiche obbligatorie prima/dopo applicazione staging:

- applicare manualmente solo la migrazione `0007`;
- verificare che le quattro view esistano;
- verificare grant solo a `authenticated`;
- verificare che anon non legga le view admin;
- verificare che free_user non staff non legga le view admin;
- verificare che admin legga ancora le sezioni editoriali.
