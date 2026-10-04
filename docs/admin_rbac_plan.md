# RBAC e admin staging

La migrazione `0002_admin_rbac.sql` è preparata ma non applicata.

## Scelta del modello

Il ruolo resta in `users_profile.role`, ora tipizzato con `app_role`. Una tabella `user_roles` separata sarebbe utile per ruoli multipli o per-tenant, ma oggi aumenterebbe superfici RLS e possibilità di divergenza senza un requisito prodotto.

Ruoli:

- `free_user`: navigazione free e dati propri;
- `editor`: contenuti e operazioni editoriali;
- `admin`: editor più provider, import, costi e utenti operativi;
- `super_admin`: riservato a gestione privilegiata futura.

## Helper

- `has_role(app_role)` verifica `auth.uid()`, ruolo DB e profilo approved.
- `is_admin()` ammette admin/super_admin.
- `is_editor_or_admin()` ammette editor e admin.

Sono `security definer`, con search path fissato e execute soltanto authenticated. I metadata client non vengono letti.

## Creazione profilo

Il trigger `on_auth_user_created` inserisce id e display name, ma forza sempre `free_user`. È idempotente. Questo copre il caso conferma email in cui `signUp()` non restituisce una sessione.

Il codice corrente `createUserProfile()` usa un upsert che include anche `role`. Dopo il trigger, il grant sicuro consente di aggiornare soltanto display name/avatar, quindi quell'upsert non è il writer definitivo. Prima del test Auth reale andrà sostituito con insert idempotente/RPC a campi sicuri oppure il display name andrà passato nei metadata di signup. Non è stato modificato in questa fase.

La promozione admin non è esposta come RPC client. Procedura staging:

1. creare utente tramite Auth;
2. verificare profilo free;
3. promuovere l'UUID con una sessione amministrativa controllata;
4. scrivere audit con before/after;
5. testare e conservare un solo admin necessario.

## Audit

`admin_audit_logs` registra admin, action, entity, before/after, request ID, IP, user agent, metadata e timestamp. Non esistono policy UPDATE/DELETE. IP e user agent vanno impostati solo da un server fidato, mai accettati come prova dal browser.

## `/admin`

Le migrazioni preparano DB/RLS ma non cambiano `lib/admin/adminAccess.ts`, che resta mock. Prima di collegare Preview a Supabase bisogna:

- rendere il controllo async server-side;
- leggere sessione e ruolo DB;
- negare nel layout prima di renderizzare children;
- usare le view `admin_*` per letture complete;
- registrare ogni scrittura significativa nell'audit;
- mantenere Vercel Authentication come protezione staging aggiuntiva.

Nessuna service role deve essere usata per impersonare l'admin.
