/** Render the actual React pages so crawlers and visitors receive identical content. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildAllRoutes, BASE_URL, alternateLinks } from '../src/lib/seoMeta.ts'
import { renderPage } from '../src/entry-server.tsx'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const routes = buildAllRoutes()
for (const route of routes) {
  const { body, head } = renderPage(route.path)
  const html = template
    .replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${route.lang}"`)
    .replace(/<title>[^<]*<\/title>\s*/, '')
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  const output = path.join(DIST, route.distPath)
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, html)
}
const entries = routes.map(route => {
  const links = alternateLinks(route.path)
  return `<url><loc>${route.canonicalUrl}</loc>${links.map(({ lang, path: href }) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${href}"/>`).join('')}</url>`
}).join('\n')
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml)
fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml)
console.log(`[prerender] ${routes.length} React-rendered routes and reciprocal language sitemap emitted.`)
