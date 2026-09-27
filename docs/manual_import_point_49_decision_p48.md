# Punto 49 — Decision after Punto 48

## Recommended option

### A. Punto 49 — Repeat browser admin verification after UX polish

Obiettivo:

- ripetere la verifica browser/admin su Preview o localhost;
- confermare che `/admin/imports` mostri sia il link `/admin/data` sia il link `/admin/data/competitions`;
- verificare che `/admin/data`, `/admin/data/competitions` e `/admin/data/competitions/manual-serie-a` restino read-only;
- confermare che non compaiano bottoni operativi `Run`, `Import`, `Execute`, `Sync`, `Save`, `Apply` o equivalenti;
- confermare che i dati `private_admin` non siano esposti pubblicamente.

Vincoli:

- nessun provider/import;
- nessun deploy;
- nessuna Production;
- nessuna DB write;
- nessun service_role;
- nessuna modifica ruoli/utenti.

## Alternatives

### B. Punto 49-PublicPolicyPlan

Solo piano per futura esposizione pubblica, senza cambiare `visibility` e senza pubblicare dati `private_admin`.

### C. Punto 49-AdminMorePolish

Ulteriori migliorie UI read-only, senza nuove azioni operative e senza scritture.

## Decisione Punto 48

Punto 48 chiude il polish minimo richiesto:

- link diretto `/admin/data` aggiunto in `/admin/imports`;
- link `/admin/data/competitions` confermato;
- voce `Manual Data` aggiunta alla navigazione admin;
- nessuna DB write;
- provider/import/Apify spenti;
- Production non toccata.

## Esito Punto 49

Punto 49 è stato eseguito come tentativo di verifica post-polish, ma non può essere chiuso come pass admin:

- `admin_session_available=false`;
- `browser_admin_verification_result=pending_no_admin_session`;
- `admin_imports_data_hub_link_verified=false` perché non osservato con sessione admin;
- `admin_sidebar_manual_data_verified=false` perché non osservato con sessione admin;
- `incognito_result=redirect_login_vercel`;
- `public_exposure_enabled=false`.

La verifica non autenticata su Preview ha mostrato `Login – Vercel`, quindi non sono stati osservati dati `private_admin` pubblici.
