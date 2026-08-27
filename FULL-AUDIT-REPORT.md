# Auditoria SEO completa — PALSEC AGCY

Data: 27 d'agost de 2026
Web: https://www.palsec.agency
Abast: producció pública, 48 URLs del sitemap i implementació local pendent de publicar.

## Resultat

- **SEO tècnic i on-page de la build local: 100/100.**
- **Preparació global per créixer orgànicament: 91/100.**
- Baseline inicial: 55/100.
- Auditoria intermèdia: 67/100.

El 100 tècnic està verificat: les 48 URLs crawlables compleixen tots els controls locals i Lighthouse dona SEO 100 a home, servei i projecte. El 91 global no es pot convertir honestament en 100 només amb codi: falten publicació, indexació confirmada a Search Console, dades de camp, ressenyes/prova externa i backlinks verificables.

| Àrea | Pes | Estat local | Evidència |
|---|---:|---:|---|
| SEO tècnic | 22% | 100/100 | 48/48 URLs, zero errors de crawl |
| Contingut i E-E-A-T | 23% | 78/100 | Serveis i casos ampliats; falta prova externa i credencials completes |
| On-page i SXO | 20% | 92/100 | Intenció local, CTA i enllaçat resolts; falta validar conversió real |
| Dades estructurades | 10% | 100/100 | 81 JSON-LD vàlids |
| Rendiment i CWV de laboratori | 10% | 98/100 | LCP 1,8–2,1 s, CLS 0, TBT 0 ms |
| GEO/cerca amb IA | 10% | 85/100 | HTML complet, schema, llms.txt i entitat; falta autoritat/citacions |
| Imatges i multimèdia | 5% | 100/100 | Dimensions, WebP responsive i vídeo optimitzat |

## Què s'ha resolt

### Crawl i indexabilitat

- 48/48 URLs del sitemap generen HTML inicial complet.
- 48/48 tenen `200`, canonical propi, hreflang `ca`, `es`, `en` i `x-default`, un H1, title i meta description únics i dins dels llindars auditats.
- Zero enllaços o recursos interns trencats a les rutes del sitemap.
- 81 blocs JSON-LD vàlids, sense errors de parseig.
- `Organization`, `WebSite`, `AboutPage`, `WebPage`, `Service`, `OfferCatalog`, `BreadcrumbList`, `CreativeWork` i `VisualArtwork` connectats amb identificadors canònics.
- Redirecció directa de l'apex root a `https://www.palsec.agency/en` preparada a `vercel.json`.
- `robots.txt`, sitemap i `llms.txt` accessibles i coherents.

### Contingut i intenció

- React i prerender comparteixen la mateixa font per a projectes i textos legals.
- Els set projectes publicats tenen cinc blocs: context, resposta de disseny, sistema, aplicació i resultat, més abast i enllaç al servei relacionat.
- Les fitxes de projecte han passat de 26–57 paraules a 110–150 aproximadament en l'HTML inicial.
- Les pàgines de servei expliquen públic, decisions, procés, entregables, pressupost/abast, FAQ i casos relacionats.
- Les tres fitxes de servei superen les 800 paraules útils en català, castellà i anglès, dins de les rutes existents i sense alterar-ne la plantilla visual.
- Les consultes sobre cost, abast, web a mida o plantilla, continguts, multilingüisme, migració SEO, arxius i propietat s'han integrat a les fitxes existents; no s'han creat pàgines de recursos ni URLs addicionals.
- Titles de serveis orientats a `Girona` i `Costa Brava`, mantenint la ubicació real de l'estudi a Costa Brava.
- FAQs específiques per servei; s'han eliminat respostes genèriques repetides.
- Titles i descriptions específics per projecte i idioma.
- About identifica la fundació el 2025 i l'equip públic verificable: Arnau Piñol Olabegoya i Guillem Ferrando Codina.
- `llms.txt` declara data de revisió i evita atribuir mètriques o resultats no verificats.

### Rendiment sense canvi de disseny

Mostra Lighthouse mòbil local contra HTML prerenderitzat real:

| Ruta | Performance | SEO | LCP | CLS | TBT | Transferència |
|---|---:|---:|---:|---:|---:|---:|
| `/en` | 98 | 100 | 2,1 s | 0 | 0 ms | 856 KiB |
| `/es/services/web-design-digital-products` | 99 | 100 | 1,8 s | 0 | 0 ms | 153 KiB |
| `/en/project/enteza` | 99 | 100 | 1,9 s | 0 | 0 ms | 225 KiB |

Canvis principals:

- 149 dimensions intrínseques generades des dels fitxers reals.
- 140 variants WebP responsive de 160, 720 i 1280 px.
- `srcset` i `sizes` tant al prerender com al React.
- Miniatures de vídeo carregades només a prop del viewport.
- Versions de vídeo de 160 px per al filmstrip.
- Vídeos Galeón + Gent Gran reduïts de 5,85 MB a 248 KB combinats.
- Animació Logoteca servida en MP4 de 120 KB i variant petita de 16 KB.
- Hero mòbil reduït d'1,12 MB a 670 KB i poster de 143 KB a 50 KB.
- No s'han canviat layout, jerarquia visual, components de navegació ni sistema d'estils.

## Diagnòstic de trànsit orgànic

La mostra pública actual no retorna resultats per `"PALSEC AGCY"` ni `site:palsec.agency`. Això és un senyal de descobriment/indexació deficient, però no substitueix Search Console. Els resultats locals per disseny web i branding a Girona mostren competidors amb:

- Landing pages explícites per Girona.
- Contingut sobre preu, abast i procés.
- Equip, anys d'experiència, projectes, testimonis o mètriques.
- En alguns casos, contingut editorial recurrent.

La build local ja cobreix ubicació, servei, abast, procés, pressupost i casos. El diferencial que falta és autoritat verificable, no una altra capa de metatags.

Common Crawl Web Graph (`cc-main-2026-jan-feb-mar`) no troba encara `palsec.agency`: no hi ha PageRank, centralitat ni dominis referents disponibles en aquesta font pública. La dada té confiança limitada i no equival a una auditoria completa de backlinks, però reforça el diagnòstic d'autoritat externa insuficient.

## E-E-A-T i autoritat

Senyals incorporats:

- Entitat `Organization` estable i connectada al web.
- Data de fundació i membres públics.
- Perfil de LinkedIn d'empresa i perfil públic d'Arnau vinculats a schema.
- Metodologia, criteris i casos visibles.
- Cap testimoni, premi, client, mètrica o resultat inventat.

Senyals encara absents o no verificables:

- Rols, biografies, trajectòria i credencials aprovades per a cada membre.
- Titularitat legal completa si s'ha de publicar.
- Testimonis o resultats amb permís.
- Google Business Profile verificat com a negoci d'àrea de servei.
- Citacions locals i backlinks editorials.
- El camp web del LinkedIn corporatiu apunta actualment a Instagram, no al domini canònic.

## Limitacions que impedeixen certificar un 100 global

1. Els canvis encara no són a producció.
2. No hi ha accés verificat a Google Search Console, GA4 o Google Business Profile.
3. La cerca pública no és una prova exhaustiva d'indexació; Search Console és l'autoritat.
4. No hi ha dades CrUX/INP de camp.
5. No hi ha font de backlinks completa configurada.
6. Visites i posicions no es poden garantir des d'una auditoria ni abans que Google rastregi i reavaluï les URLs.
7. Lighthouse Accessibility queda en 95–96 per contrast baix en alguns textos i controls existents. No s'ha alterat perquè l'encàrrec exclou canvis de disseny; no afecta la puntuació SEO 100.

## Conclusió

La build local ja no té un problema tècnic de SEO: té SEO 100, contingut prerenderitzat complet, rendiment fort i intenció local explícita. El següent salt no és més codi. És publicar, sol·licitar indexació, mesurar consultes i conversions i construir prova externa real. Sense aquests passos, declarar 100 global o prometre visites seria fals.
