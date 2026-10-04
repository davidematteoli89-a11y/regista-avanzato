# Manual Import Point 58 Decision — P57

Punto 57 ha applicato polish UI alle route pubbliche empty-state senza cambiare comportamento dati.

## Opzione A — Punto 58 Public data promotion plan only

Obiettivo:

- pianificare come promuovere una fixture da `private_admin` a `public`;
- definire gate, audit, rollback e responsabilità;
- non eseguire promotion;
- non cambiare visibility;
- non fare DB write.

Consigliata se si vuole iniziare a preparare il primo dato pubblico reale.

## Opzione B — Punto 58 Public homepage/navigation polish

Obiettivo:

- collegare meglio le route pubbliche alla homepage/navigation;
- mantenere empty-state e public reader;
- nessun cambio dati;
- nessuna DB write.

Consigliata se si vuole rendere più visibile la nuova sezione pubblica senza esporre dati reali.

## Opzione C — Punto 58 Browser verification after UI polish

Obiettivo:

- ripetere verifica browser no-auth dopo il polish UI;
- confermare empty-state e assenza dati `private_admin`;
- non fare deploy.

Consigliata se le modifiche UI devono essere validate visualmente prima di qualunque passo successivo.

## Decisione consigliata

Opzione C se si vuole chiudere il polish con evidenza browser.

Opzione A se il polish è considerato minimo e si vuole passare alla pianificazione del primo dato pubblico reale.
