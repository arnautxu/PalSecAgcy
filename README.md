# PALSEC AGCY

Multilingual React / TypeScript / Vite portfolio with static HTML generated from the same React tree that is hydrated in the browser.

## Work locally

```sh
npm ci
npm run dev
npm run build
npm run seo:rendered
npm run preview
```

Browser checks require `npx playwright install chromium`. The build checks TypeScript, converts images, renders all pages and runs the static SEO crawl. `seo:rendered` checks initial HTML against the hydrated DOM on every sitemap URL, including metadata, H1, main copy and structured data.

## Content and routes

- Existing pages and seven case studies: Catalan, Spanish, English.
- Four commercial service pages in each language, with translated slugs.
- Six buying guides in Spanish. Only existing translations are declared in hreflang.
- 66 indexable sitemap URLs. Existing service URLs remain available for process and discipline detail.
- Unknown paths return a real 404 on Vercel.

Content sources: `src/content/commercialPages.ts`, `projectCases.ts`, `buyingGuides.ts`, `siteCopy.ts`, `servicePages.ts`. Metadata and route generation: `src/lib/seoMeta.ts`. Rendering: `src/entry-server.tsx` and `scripts/prerender.mjs`.

## Production validation

```sh
npm run seo:verify -- --base-url=https://www.palsec.agency
npm run seo:rendered -- --base-url=https://www.palsec.agency
```

The Vercel project is `pal-sec-agcy`, connected to `arnautxu/PalSecAgcy`. Production is published from `main`. Confirm deployment SHA and public-domain checks; a local build alone is not deployment proof.

Google Analytics remains consent-gated. Contact clicks include the language, contact page and initial landing path. A click is an intent signal, not a confirmed enquiry.

See `docs/SEO-OPERATIONS.md`, `docs/seo-keywords.csv` and `docs/SEO-BASELINE-2026-09-22.md` for external work and measurement. Sector-specific pages require relevant evidence; there are no invented testimonials, prices, client results or storefront details.
