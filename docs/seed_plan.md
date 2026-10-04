# Seed base staging preparato

`0006_seed_base_data.sql` è idempotente per le chiavi logiche ma non è stato applicato.

## Provider

Inserisce/upserta sei provider:

- mock e manual active;
- stable, TheStatsAPI e API-Football inactive;
- Apify/SofaScore inactive con 30 EUR, warning 24, hard stop 30.

Nessun token, base URL segreto o credenziale.

## Competizioni

Inserisce/upserta le 43 competition di `config/competitions.ts`:

- 14 FULL_OFFICIAL;
- 15 Apify P1;
- 14 Apify P2;
- nessuna trigger, perché la config non ne contiene.

Le stagioni sono esplicite: `2026/27` per tornei a cavallo d'anno e `2026` per tornei annuali. Vanno verificate prima dell'applicazione. Ogni riga resta `draft/private_admin`; l'upsert non sovrascrive successivamente status o visibility editoriali.

Il seed risolve provider key in UUID e costruisce `provider_competition_config`. Provider disattivato significa `import_enabled=false`, anche se la competition è eleggibile in futuro.

I tracking level sono enum e non necessitano seed separato.

## Admin

Nessun utente o password viene creato. Procedura futura:

1. creare manualmente l'utente con Supabase Auth;
2. verificare profilo automatico `free_user`;
3. promuovere manualmente l'ID a admin con operazione controllata;
4. registrare la promozione nell'audit log.

## Assert post-seed

- Esattamente 6 provider attesi e 43 competition per il batch iniziale.
- Tutti i provider esterni inactive.
- FULL non usa Apify.
- P1/P2 hanno priorità 1/2 coerente.
- Nessuna competition published.
- Nessuna credenziale, subscriber o contenuto reale.

Il seed demo editoriale rimane fuori da questa migrazione.
