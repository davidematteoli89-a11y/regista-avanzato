# Manual Import Point 57 Decision — P56

Punto 56 è passato con:

- `public_routes_browser_verification_result=passed_no_auth_empty_state`;
- `/competitions` empty;
- `/competitions/manual-serie-a` not found/empty;
- nessun dato `private_admin` esposto;
- nessuna DB write;
- nessun provider/import;
- Apify off;
- Production non toccata;
- deploy non eseguito.

## Opzione A — Punto 57 Public routes UI polish

Obiettivo:

- migliorare layout/stile/testi delle route pubbliche empty-state;
- mantenere solo public reader filtrati `visibility='public'`;
- nessun cambio dati;
- nessuna DB write;
- nessun provider/import;
- nessun deploy.

Consigliata se si vuole rifinire l’esperienza pubblica prima di esporre dati reali.

## Opzione B — Punto 57 Public data promotion plan only

Obiettivo:

- pianificare come promuovere dati da `private_admin` a `public`;
- definire gate, rollback, audit e responsabilità;
- non eseguire promotion;
- non cambiare visibility;
- non scrivere DB.

Consigliata se si vuole preparare il primo dato pubblico reale senza autorizzare ancora alcuna scrittura.

## Opzione C — Punto 57 Repeat admin browser verification

Obiettivo:

- ripetere verifica admin reale se sessione admin verificabile è disponibile;
- non modificare dati;
- non fare deploy.

## Decisione consigliata

Opzione A se l’obiettivo immediato è migliorare le route pubbliche empty-state.

Opzione B se si vuole iniziare a pianificare la prima promotion controllata verso `visibility='public'`.
