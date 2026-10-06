# PALSEC: revisió i execució SEO — 6 octubre 2026

## Paraules clau verificades a Semrush

Consulta i exportació des de la interfície autenticada amb Computer Use, sense connector. Projecte 31405022, campanya 5558011, Google Espanya, escriptori, castellà. Última dada: 5 octubre; comparació: 29 setembre–5 octubre. Es conserven les 46 consultes i l'històric.

Visibilitat: 9,4571% (+3,4 punts segons la interfície). 18 resultats orgànics convencionals al top 100, 4 presències etiquetades `ai overview`, 24 sense resultat al top 100. Cap resultat convencional al top 10. Les posicions 1 de palsec, palsec agency, palsec agcy i identidad visual girona són AI Overviews; no acrediten quatre primers llocs orgànics convencionals. Les tres consultes de marca representen aproximadament el 69% de la visibilitat total.

| Consulta | Posició convencional | Canvi des del 29/9 | Volum Semrush |
|---|---:|---:|---:|
| identitat visual girona | 12 | -4 | no disponible |
| branding girona | 16 | +5 | 390 |
| estudio de branding girona | 16 | +29 | no disponible |
| estudio de diseño gráfico girona | 21 | +3 | no disponible |
| desenvolupament web girona | 22 | -3 | no disponible |
| diseño gráfico girona | 35 | -8 | 70 |
| desarrollo web girona | 48 | -5 | 390 |
| disseny gràfic girona | 49 | -12 | 70 |
| diseño web girona | 66 | -12 | 880 |
| disseny web girona | fora del top 100 | — | 880 |

Volums estimats de Semrush dins d'aquest informe; `n/a` no significa zero. La campanya estatal en castellà no acredita rendiment local de Girona ni mòbil i limita la lectura de consultes catalanes. Cal afegir segments diferenciats si la quota ho permet; no substituir l'històric.

El [mapa complet](keyword-map.csv) assigna una pàgina principal a cada consulta. Revisar tres desajustos: `estudio de branding girona` mostra /es; `desarrollo web girona` mostra /es/diseno-web-girona; `agència branding girona` mostra /es/branding-girona. Això és un senyal per revisar enllaçat i contingut, no prova per si mateix canibalització. No basar-se en la pantalla de demostració de canibalització del paywall.

## Canvis del web implementats

- Catàlegs de metadades generats des del contingut original: els textos complets de totes les guies i serveis deixen de viatjar al JavaScript inicial.
- Fonts llatines de les mateixes famílies i CSS de la demostració AiBrain carregat només a AI Lab.
- Recursos de ruta, font i imatge principal en HTML; prioritat d'imatge davant del codi de galeria. El vídeo de portada s'activa després del pòster.
- Les 12 pàgines comercials mostren context dels projectes, abast acreditat, orientació per començar i guies relacionades. CTA obre el formulari amb servei preseleccionat.
- Portada, qui som, projectes i Weboteca inclouen context pràctic i enllaços als serveis relacionats, mantenint la direcció visual i els tres idiomes.

Validació local: build amb TypeScript, 95/95 rutes sense diferències entre HTML i React, metadades/hreflang/esquemes coherents; 51 comprovacions de formulari, consentiment i disposició mòbil/escriptori. Les proves de lliurament intercepten l'API: no s'han enviat correus de prova. Es comprova que un error no registra lead, un rebut correcte en registra un i l'analítica no incorpora camps personals.

JS inicial comprimit: 197,65 KB → 131,16 KB; CSS comprimit: aproximadament 14 KB → 9,09 KB. Les mesures Lighthouse locals són de laboratori, no dades de camp ni resultats de posicionament.

## Dependències i feina pendent

- GA4: el compte arnautxu no mostra la propietat de PALSEC. El codi apunta a G-1KHW7BDQV0; proves locals de consentiment i esdeveniments no acrediten recepció al compte ni conversions reals. Cal accés a aquesta propietat.
- Google Business: Pal Sec Agcy., Calonge, identificador 00538045319712170391. Sessió arnautxu confirmada; verificació requerida. Google demana vídeo del lloc, equipament i prova de gestió: el titular l'ha de gravar.
- Enllaços: exportació completa del 6/10 de 137 dominis (247 enllaços, 132 dominis amb AS ≤10, 16 a la IP 195.20.19.178) i classificació inicial a [refdomains-review.csv](refdomains-review.csv), conservant puntuació, IP, volum i dates. Cal completar la verificació de les pàgines d’origen i el context editorial; la classificació per dades de domini no confirma qualitat ni toxicitat. No s'ha enviat outreach ni disavow. Prioritzar crèdits legítims de clients i referències de disseny acreditades; revisar cada pàgina d'origen abans de contactar.
- Seguiment: lectures al cap de 30/60/90 dies després de publicar. Mesurar GSC marca/no marca i mòbil/escriptori, consultes comercials de Semrush, URLs detectades i contactes realment rebuts. Cap millora de rànquing s'atribueix als canvis sense dades posteriors.

Baseline GSC llegida el 5/10: 11 clics, 1.638 impressions, CTR aproximat 0,7%, posició mitjana 29,9 (5/9–2/10). Els filtres de consulta ometen dades anònimes i no se sumen com si fossin totals exhaustius. Indexació: 47 indexades, 13 no indexades; sense dades CWV de camp.

La publicació es registra separadament amb URL de deployment i verificació del domini. Aquest document no acredita verificació GBP, recepció GA4, nous enllaços ni posicionament posterior.

## Versió preparada per publicar

Commit de codi: `9e9bc391d9736e38eb73ae5e681607bc36413272`. Deployment READY: `dpl_Gq3nzNJoByhMgq1nnXESdzxdoiAt`, https://pal-sec-agcy-f9pfrf9yr-arnautxus-projects.vercel.app. La API de Vercel confirma aquest SHA. Set documents autenticats (portada, branding, desenvolupament ES, disseny gràfic EN, projectes, VIRA i sitemap) coincideixen byte a byte amb el build validat. La protecció de preview es manté; accés mitjançant `vercel curl`. Verificació completa del domini públic després de promocionar.

LCP mòbil local final a VIRA, tres execucions Lighthouse amb throttling devtools: 1,929 / 1,821 / 1,823 s; mediana 1,823 s. La mostra anterior només tenia una execució comparable (1,762 s), de manera que no es presenta com una millora demostrada. Les dades de camp de GSC encara no estan disponibles.
