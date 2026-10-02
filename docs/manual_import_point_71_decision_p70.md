# Manual Import Point 71 Decision — P70

Punto 70 ha migliorato il percorso pubblico locale senza deploy.

## Current public path

- Home -> `/competitions`: presente.
- `/competitions` -> `/competitions/manual-serie-a`: presente.
- `/competitions/manual-serie-a` -> `/competitions`: presente.
- Dati pubblici visibili localmente.
- Preview resta protetta da Vercel Authentication.

## Recommended Point 71

Opzioni consigliate:

1. SEO/copy metadata per Home e route competizioni;
2. verifica Preview autenticata, senza disattivare Vercel Authentication;
3. ulteriore polish visuale locale, senza DB write e senza deploy.

## Do not do automatically

- Non fare deploy manuale.
- Non disattivare Vercel Authentication.
- Non eseguire rollback.
- Non fare nuove DB write.
- Non attivare provider/import.
- Non toccare Production.
