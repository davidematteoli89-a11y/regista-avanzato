# Data Provider

Contratto astratto e modello normalizzato per gli script di importazione. Sono disponibili provider mock e manuale; gli adapter stabili e Apify/SofaScore sono placeholder senza trasporto HTTP e ricadono sul mock o su un errore controllato finché non vengono configurati e approvati.

Questa cartella non va importata dalle pagine pubbliche per interrogare fonti esterne: la UI dovrà leggere esclusivamente i dati salvati in Supabase.
