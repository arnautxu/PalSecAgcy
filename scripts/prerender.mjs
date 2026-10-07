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
const manifest = JSON.parse(fs.readFileSync(path.join(DIST, '.vite/manifest.json'), 'utf8'))
const pageModule = { home: 'Home', projects: 'Projects', commercial: 'CommercialLanding', 'about-us': 'AboutUs', services: 'Services', service: 'ServiceDetail', guide: 'BuyingGuide', blog: 'Blog', privacy: 'LegalPage', 'legal-notice': 'LegalPage', project: 'ProjectDetail' }
const font = fs.readdirSync(path.join(DIST, 'assets')).find(name => /^geist-latin-wght-normal-.*\.woff2$/.test(name))
function criticalResources(route, body) {
  const page = route.slug === 'ai-lab' ? 'AiLab' : pageModule[route.kind]
  const seen = new Set()
  const resources = []
  // Let the first project image paint before downloading optional gallery code.
  const picture = body.match(/<picture>.*?<img[^>]*fetchpriority="high"[^>]*>.*?<\/picture>/)
  const source = picture?.[0].match(/<source[^>]*>/)?.[0]
  const srcset = source?.match(/srcSet="([^"]+)"/)?.[1]
  const sizes = source?.match(/sizes="([^"]+)"/)?.[1]
  const type = source?.match(/type="([^"]+)"/)?.[1] ?? 'image/webp'
  const href = srcset?.split(", ").at(-1)?.split(" ")[0]
  if (href) resources.push(`<link rel="preload" as="image" type="${type}" href="${href}" imagesrcset="${srcset}" imagesizes="${sizes ?? '100vw'}" fetchpriority="high"/>`)
  function visit(key) {
    if (seen.has(key)) return
    seen.add(key)
    const chunk = manifest[key]
    if (!chunk) throw new Error(`Missing route chunk: ${key}`)
    if (chunk.file.endsWith(".css")) resources.push(`<link rel="stylesheet" href="/${chunk.file}"/>`)
    else if (route.kind !== "project") resources.push(`<link rel="modulepreload" href="/${chunk.file}" fetchpriority="low"/>`)
    for (const css of chunk.css ?? []) if (!template.includes(`/${css}`)) resources.push(`<link rel="stylesheet" href="/${css}"/>`)
    for (const dependency of chunk.imports ?? []) visit(dependency)
  }
  if (page) visit(`src/pages/${page}.tsx`)
  if (page === "AiLab") visit("src/components/aibrain-demo.css")
  if (font) resources.push(`<link rel="preload" as="font" type="font/woff2" href="/assets/${font}" crossorigin/>`)
  return [...new Set(resources)].join('\n')
}
for (const route of routes) {
  const { body, head } = await renderPage(route.path)
  const html = template
    .replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${route.lang}"`)
    .replace(/<title>[^<]*<\/title>\s*/, '')
    // Responsive image preloads must see the mobile viewport before selecting a candidate.
    .replace(/(<meta name="viewport"[^>]*>)/, `$1\n${criticalResources(route, body)}`)
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
