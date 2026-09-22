import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { tsImport } from "tsx/esm/api"

const { buildAllRoutes } = await tsImport("../src/lib/seoMeta.ts", import.meta.url)
const manifest = buildAllRoutes()
const manifestByPath = new Map(manifest.map(route => [route.path, route]))

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIST = path.join(ROOT, "dist")
const EXPECTED_ROUTES = manifest.length
const LANGUAGES = { ca: "ca-ES", es: "es-ES", en: "en" }
const EXPECTED_ALTERNATES = [...Object.values(LANGUAGES), "x-default"].sort()
const isGuide = (pathname) => /^\/(?:ca\/guies|es\/guias)\/[^/]+$/.test(pathname)
const isEditorial = (pathname) => isGuide(pathname) || /^\/(ca|es)\/blog$/.test(pathname)
const expectedAlternatesFor = (pathname) => isEditorial(pathname) ? ["ca-ES", "es-ES", "x-default"] : EXPECTED_ALTERNATES
const baseArg = process.argv.find((arg) => arg.startsWith("--base-url="))
const baseUrl = baseArg?.slice("--base-url=".length).replace(/\/$/, "") ?? null
const issues = []
const titles = new Map()
const descriptions = new Map()
const pages = new Map()
let jsonLdCount = 0

function decode(value = "") {
  return value.replace(/&(#(?:x[\da-f]+|\d+)|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) => {
    if (entity[0] === "#") {
      const numeric = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return numeric <= 0x10ffff ? String.fromCodePoint(numeric) : ""
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[entity.toLowerCase()]
  }).trim()
}

function attributes(tag) {
  const output = {}
  for (const match of tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    output[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4])
  }
  return output
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => attributes(match[0]))
}

function normalText(html) {
  return decode(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim()
}

async function readText(target) {
  if (!baseUrl) return fs.readFileSync(target, "utf8")
  const response = await fetch(target, { redirect: "manual", signal: AbortSignal.timeout(30000) })
  if (response.status !== 200) throw new Error(`expected HTTP 200, received ${response.status} ${target}`)
  if (response.headers.get("x-robots-tag")?.includes("noindex")) issues.push(`${target}: noindex HTTP header`)
  return response.text()
}

function recordUnique(store, value, pathname, label) {
  if (!value) return issues.push(`${pathname}: missing ${label}`)
  if (store.has(value)) issues.push(`${pathname}: duplicate ${label} with ${store.get(value)}`)
  else store.set(value, pathname)
}

function schemaTypes(value, output = new Set()) {
  if (!value || typeof value !== "object") return output
  const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]]
  for (const type of types) if (type) output.add(type)
  for (const child of Object.values(value)) {
    if (Array.isArray(child)) child.forEach((item) => schemaTypes(item, output))
    else if (child && typeof child === "object") schemaTypes(child, output)
  }
  return output
}

function expectedTypes(pathname) {
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 1) return ["Organization", "WebSite"]
  if (parts[1] === "about-us") return ["Organization", "AboutPage"]
  if (parts[1] === "projects") return ["BreadcrumbList"]
  if (parts[1] === "project") return ["BreadcrumbList", "CreativeWork", "WebPage"]
  if (parts[1] === "guias" || parts[1] === "guies") return ["BreadcrumbList", "Article"]
  if (parts[1] === "blog") return ["BreadcrumbList", "CollectionPage", "ItemList"]
  if (parts[1] === "services") return parts.length === 2 ? ["BreadcrumbList", "OfferCatalog"] : ["BreadcrumbList", "Service", "WebPage"]
  if (parts[1].endsWith("-girona")) return ["BreadcrumbList", "Service", "WebPage"]
  return []
}

async function run() {
  const sitemapText = await readText(baseUrl ? `${baseUrl}/sitemap.xml` : path.join(DIST, "sitemap.xml"))
  const entries = [...sitemapText.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)].map((match) => ({
    url: decode(match[1].match(/<loc\b[^>]*>([^<]+)<\/loc>/i)?.[1] ?? ""),
    alternates: tags(match[1], "xhtml:link").filter((tag) => tag.rel === "alternate"),
  }))
  const urls = entries.map(({ url }) => url)
  const sitemapUrls = new Set(urls)
  if (urls.length !== EXPECTED_ROUTES) issues.push(`sitemap: expected ${EXPECTED_ROUTES} URLs, found ${urls.length}`)
  if (sitemapUrls.size !== urls.length) issues.push("sitemap: duplicate URLs")
  if (manifestByPath.size !== manifest.length) issues.push("route manifest: duplicate paths")
  for (const route of manifest) if (!sitemapUrls.has(route.canonicalUrl)) issues.push(`sitemap: route manifest URL missing: ${route.canonicalUrl}`)
  for (const url of sitemapUrls) if (!manifest.some(route => route.canonicalUrl === url)) issues.push(`sitemap: URL absent from route manifest: ${url}`)
  for (const lang of ["ca", "es"]) {
    const expectedGuides = manifest.filter(route => route.kind === "guide" && route.lang === lang).length
    const guideCount = urls.filter((url) => { try { const pathname = new URL(url).pathname; return isGuide(pathname) && pathname.startsWith(`/${lang}/`) } catch { return false } }).length
    if (!expectedGuides || guideCount !== expectedGuides) issues.push(`sitemap: expected ${expectedGuides} ${lang} guides, found ${guideCount}`)
    if (!sitemapUrls.has(`https://www.palsec.agency/${lang}/blog`)) issues.push(`sitemap: missing ${lang} blog index`)
  }
  const serviceWords = {}

  for (const { url, alternates: sitemapAlternates } of entries) {
    let address
    try { address = new URL(url) } catch { issues.push(`sitemap: invalid URL ${url}`); continue }
    const { pathname } = address
    if (address.origin !== "https://www.palsec.agency" || address.search || address.hash || pathname.endsWith("/")) issues.push(`${url}: sitemap must use the clean HTTPS canonical URL`)
    let html
    try { html = await readText(baseUrl ? `${baseUrl}${pathname}` : path.join(DIST, pathname.slice(1), "index.html")) }
    catch (error) { issues.push(`${pathname}: ${error.message}`); continue }

    const metas = tags(html, "meta")
    const links = tags(html, "link")
    const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)]
    const title = decode(titleMatches[0]?.[1] ?? "")
    const descriptionTags = metas.filter((tag) => tag.name === "description")
    const description = descriptionTags[0]?.content ?? ""
    const canonicals = links.filter((tag) => tag.rel === "canonical")
    const alternates = links.filter((tag) => tag.rel === "alternate" && tag.hreflang)
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    const language = pathname.split("/")[1]
    const expectedAlternates = expectedAlternatesFor(pathname)
    const defaultLanguage = isEditorial(pathname) ? "es" : "en"
    if (/^\/(ca\/guias|es\/guies|en\/(guias|guies|blog))(?:\/|$)/.test(pathname)) issues.push(`${pathname}: invalid editorial language path`)

    if (titleMatches.length !== 1) issues.push(`${pathname}: expected exactly one title`)
    if (descriptionTags.length !== 1) issues.push(`${pathname}: expected exactly one description`)
    if (h1s.length !== 1 || !normalText(h1s[0]?.[1] ?? "")) issues.push(`${pathname}: expected exactly one nonempty H1`)
    if (canonicals.length !== 1 || canonicals[0].href !== url) issues.push(`${pathname}: canonical must equal ${url}`)
    if (tags(html, "html")[0]?.lang?.split("-")[0] !== language) issues.push(`${pathname}: HTML language differs from URL language`)
    if (metas.some((tag) => /^(robots|googlebot)$/i.test(tag.name ?? "") && /noindex/i.test(tag.content ?? ""))) issues.push(`${pathname}: noindex on sitemap page`)
    if (title.length < 30 || title.length > 75) issues.push(`${pathname}: title length ${title.length}, expected 30–75`)
    if (description.length < 100 || description.length > 180) issues.push(`${pathname}: description length ${description.length}, expected 100–180`)
    recordUnique(titles, title, pathname, "title")
    recordUnique(descriptions, description, pathname, "description")
    const route = manifestByPath.get(pathname)
    if (route && title !== route.title) issues.push(`${pathname}: title differs from route manifest`)
    if (route && description !== route.description) issues.push(`${pathname}: description differs from route manifest`)
    for (const [property, expected] of [["og:title", title], ["og:description", description], ["og:url", url]]) {
      const matching = metas.filter((tag) => tag.property === property)
      if (matching.length !== 1 || matching[0].content !== expected) issues.push(`${pathname}: inconsistent ${property}`)
    }

    const alternateMap = Object.fromEntries(alternates.map(({ hreflang, href }) => [hreflang, href]))
    if (JSON.stringify(alternates.map((tag) => tag.hreflang).sort()) !== JSON.stringify(expectedAlternates)) issues.push(`${pathname}: invalid hreflang set`)
    if (alternateMap[LANGUAGES[language]] !== url) issues.push(`${pathname}: hreflang does not include self`)
    if (alternateMap["x-default"] !== alternateMap[LANGUAGES[defaultLanguage]]) issues.push(`${pathname}: x-default must target ${defaultLanguage} equivalent`)
    for (const [locale, href] of Object.entries(alternateMap)) {
      if (!sitemapUrls.has(href)) issues.push(`${pathname}: alternate absent from sitemap: ${href}`)
      const targetLang = locale === "x-default" ? defaultLanguage : locale.split("-")[0]
      try { if (new URL(href).pathname.split("/")[1] !== targetLang) issues.push(`${pathname}: ${locale} alternate has wrong URL language`) }
      catch { issues.push(`${pathname}: invalid alternate URL ${href}`) }
    }
    const xmlMap = Object.fromEntries(sitemapAlternates.map(({ hreflang, href }) => [hreflang, href]))
    if (sitemapAlternates.length !== expectedAlternates.length || expectedAlternates.some((locale) => xmlMap[locale] !== alternateMap[locale])) issues.push(`${pathname}: sitemap and HTML hreflang differ`)
    pages.set(url, { pathname, alternates: alternateMap })

    const types = new Set()
    const schemas = []
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (attributes(match[1]).type !== "application/ld+json") continue
      try { const schema = JSON.parse(match[2]); schemas.push(schema); schemaTypes(schema, types); jsonLdCount += 1 }
      catch { issues.push(`${pathname}: invalid JSON-LD`) }
    }
    for (const type of expectedTypes(pathname)) if (!types.has(type)) issues.push(`${pathname}: missing ${type} schema`)
    if (isGuide(pathname)) {
      const article = schemas.find(schema => schema["@type"] === "Article")
      const publishedAt = manifestByPath.get(pathname)?.publishedAt
      if (!publishedAt || article?.datePublished !== publishedAt || article?.dateModified !== publishedAt) issues.push(`${pathname}: Article dates differ from the content manifest`)
      if (article?.inLanguage !== language || article?.url !== url || article?.mainEntityOfPage !== url) issues.push(`${pathname}: Article language or URL differs from the page`)
      if (article?.headline !== normalText(h1s[0]?.[1] ?? "")) issues.push(`${pathname}: Article headline differs from the H1`)
      if (!tags(html, "time").some(tag => tag.datetime === publishedAt)) issues.push(`${pathname}: publication date is not visible in time markup`)
    }
    const serviceMatch = pathname.match(/^\/(ca|es|en)\/services\/(brand-strategy|branding-visual-identity|web-design-digital-products)$/)
    if (serviceMatch) {
      const [, lang, slug] = serviceMatch
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? ""
      const words = normalText(main).split(/\s+/).filter(Boolean).length
      serviceWords[slug] ??= {}
      serviceWords[slug][lang] = words
      if (words < 700) issues.push(`${pathname}: service content has ${words} words; expected at least 700`)
    }
    for (const tag of [...tags(html, "a"), ...tags(html, "img"), ...tags(html, "video"), ...tags(html, "source")]) {
      for (const ref of [tag.href, tag.src, tag.poster].filter(Boolean)) {
        if (/^(#|mailto:|tel:|data:|blob:)/i.test(ref)) continue
        let targetUrl
        try { targetUrl = new URL(ref, url) } catch { issues.push(`${pathname}: invalid link ${ref}`); continue }
        if (targetUrl.origin !== address.origin) continue
        const targetPath = targetUrl.pathname
        if (targetPath === "/" || targetPath.startsWith("/api/")) continue
        if (/^\/(ca|es|en)(\/|$)/.test(targetPath)) {
          if (!sitemapUrls.has(`${address.origin}${targetPath}`)) issues.push(`${pathname}: internal page absent from sitemap ${targetPath}`)
        } else if (!baseUrl && !fs.existsSync(path.join(DIST, decodeURIComponent(targetPath).replace(/^\//, "")))) issues.push(`${pathname}: broken internal asset ${targetPath}`)
      }
    }
  }
  for (const { pathname, alternates } of pages.values()) {
    for (const href of new Set(Object.values(alternates))) {
      const target = pages.get(href)
      if (target && expectedAlternatesFor(pathname).some((locale) => target.alternates[locale] !== alternates[locale])) issues.push(`${pathname}: nonreciprocal hreflang with ${target.pathname}`)
    }
  }
  console.log(JSON.stringify({ target: baseUrl ?? DIST, routes: urls.length, jsonLd: jsonLdCount, uniqueTitles: titles.size, uniqueDescriptions: descriptions.size, serviceWords, issues: [...new Set(issues)] }, null, 2))
  if (issues.length) process.exitCode = 1
}
run().catch((error) => { console.error(error); process.exitCode = 1 })
