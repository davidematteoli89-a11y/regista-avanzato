# D.16-C3-R2 manual check — Dashboard API-SPORTS/API-Football

Stato: checklist operativa manuale, nessuna chiamata provider.

Data/ora locale: 2026-09-15 15:41:00 CEST.

## Contesto

- R1 ha eseguito una sola richiesta reale.
- Provider: API-Football.
- Endpoint R1: standings Serie A.
- Risultato R1: HTTP `403`.
- Nessuna seconda richiesta è stata eseguita in questa fase.
- Nessuna scrittura DB.
- Nessun import.
- Nessun Apify.
- TheStatsAPI non chiamato.
- Production non toccata.

## Audit statico script

File analizzato:

- `scripts/provider/apiFootballProbe.ts`.

Valori statici attesi:

- base URL default: `https://v3.football.api-sports.io`;
- endpoint: `/standings`;
- header: `x-apisports-key`;
- parametri attuali:
  - `league=135`;
  - `season=2026`.

Conferme statiche:

- una sola chiamata `fetch`;
- nessun retry automatico;
- nessun loop;
- nessuna paginazione;
- nessun client Supabase;
- nessun `service_role`;
- nessun DB writer;
- output sanificato;
- token non stampabile.

## Checklist dashboard API-SPORTS/API-Football

L'utente deve controllare manualmente nella dashboard API-SPORTS/API-Football, senza condividere token.

### 1. Account

- [ ] Email confermata.
- [ ] Account attivo.
- [ ] Nessun blocco account visibile.

### 2. Piano

- [ ] Piano Free attivo.
- [ ] Quota Free disponibile.
- [ ] Nessun limite giornaliero già raggiunto.

### 3. API abilitata

- [ ] API Football / Football v3 attiva nell'account.
- [ ] Non solo account API-SPORTS generico.
- [ ] Subscription Free associata proprio a Football.

### 4. Key

- [ ] Key precedente esposta non usata.
- [ ] Key rigenerata.
- [ ] Nuova key copiata correttamente.
- [ ] Nuova key presente solo in `.env.local`.
- [ ] Nuova key non incollata in chat.
- [ ] Nuova key non committata.

### 5. Restrizioni

- [ ] Nessuna restrizione IP attiva oppure IP locale autorizzato.
- [ ] Nessuna restrizione dominio attiva per chiamate locali.
- [ ] Nessuna whitelist che blocca localhost/terminal.

### 6. Endpoint

- [ ] Base URL diretto API-SPORTS confermato: `https://v3.football.api-sports.io`.
- [ ] Endpoint confermato: `/standings`.
- [ ] Header confermato: `x-apisports-key`.
- [ ] Parametri confermati:
  - `league=135`;
  - `season=2026`.

### 7. Stagione

- [ ] Verificare se Serie A `season=2026` è già supportata nel piano Free.
- [ ] Se non supportata, valutare R2 con `season=2025`.
- [ ] Non cambiare lo script senza fase dedicata.

### 8. Piano B

Se il `403` resta anche con dashboard corretta:

- [ ] valutare un endpoint più semplice, per esempio `/status`, solo se disponibile e ammesso;
- [ ] valutare league/season supportata dalla dashboard;
- [ ] contattare supporto API-SPORTS;
- [ ] confrontare TheStatsAPI solo dopo chiusura debug API-Football.

## Decisione richiesta prima di R2 reale

Prima di qualunque seconda real-call l'utente deve confermare manualmente:

- email confermata;
- piano Free attivo;
- API Football v3 attiva;
- quota disponibile;
- key rigenerata e corretta;
- restrizioni IP/domain controllate;
- scelta esplicita tra:
  - ritentare `season=2026`;
  - cambiare a `season=2025`;
- autorizzazione esplicita a una sola seconda richiesta.

## Conferme D.16-C3-R2 manual check

- Nessuna seconda real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessun prefisso/suffisso/hash/lunghezza key stampato.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.
