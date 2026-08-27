# Línia base SEO de producció — PALSEC AGCY

Captura: 27 d'agost de 2026
Objectiu: comparar la producció actual amb la build SEO preparada abans de publicar-la.

## Producció actual

- Desplegament actiu construït el 25 d'agost de 2026 i servit per Vercel.
- 48 URLs al sitemap i 48 respostes amb HTML inicial complet.
- 75 blocs JSON-LD vàlids.
- 34 titles únics: els 7 projectes repeteixen el mateix title entre idiomes, generant 14 duplicats.
- 48 meta descriptions úniques.
- Diversos titles i descriptions de projectes i pàgines legals queden fora dels llindars auditats.
- Les nou versions de les fitxes de servei tenen entre 150 i 166 paraules.
- `http://palsec.agency/` redirigeix a HTTPS, després a `www` i finalment a `/en` en tres salts.

## Build local preparada

- 48 URLs al sitemap.
- 81 blocs JSON-LD vàlids.
- 48 titles i 48 descriptions úniques.
- Canonical, hreflang `ca`, `es`, `en` i `x-default`, un H1 i HTML inicial complet a 48/48 rutes.
- Les nou versions de les fitxes de servei superen les 800 paraules útils.
- Cap ruta de recursos o article afegida.
- Redirecció de l'apex preparada per reduir la cadena inicial.

## Criteri de validació després del desplegament

Executar:

```sh
npm run seo:verify -- --base-url=https://www.palsec.agency
```

La publicació només supera la verificació si retorna zero incidències, 48 URLs, 81 blocs JSON-LD, 48 titles únics i les nou fitxes de servei per sobre de 800 paraules.

La mateixa verificació forma part de `npm run build`: Vercel no podrà completar una build futura si el resultat local torna a incomplir aquests controls.
