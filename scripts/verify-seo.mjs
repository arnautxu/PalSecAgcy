import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIST = path.join(ROOT, "dist")
const EXPECTED_ROUTES = 48
const EXPECTED_JSON_LD = 81
const SERVICE_SLUGS = [
  "brand-strategy",
  "branding-visual-identity",
  "web-design-digital-products",
]
const LANGS = ["ca", "es", "en"]

const baseArg = process.argv.find((arg) => arg.startsWith("--base-url="))
const baseUrl = baseArg?.split("=").slice(1).join("=").replace(/\/$/, "") ?? null
const issues = []
const titles = new Map()
const descriptions = new Map()
let jsonLdCount = 0

function decode(value = "") {
  return value.replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim()
}

function first(html, pattern) {
  return decode(html.match(pattern)?.[1] ?? "")
}

function textWordCount(html) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return text ? text.split(" ").length : 0
}

async function readText(target) {
  if (!baseUrl) return fs.readFileSync(target, "utf8")
  const response = await fetch(target, { redirect: "follow" })
  if (!response.ok) throw new Error(`${response.status} ${target}`)
  return response.text()
}

function localRouteFile(url) {
  return path.join(DIST, new URL(url).pathname.replace(/^\//, ""), "index.html")
}

async function routeHtml(url) {
  return readText(baseUrl ? url : localRouteFile(url))
}

function recordUnique(store, value, pathname, label) {
  if (store.has(value)) issues.push(`${pathname}: duplicate ${label} with ${store.get(value)}`)
  else store.set(value, pathname)
}

async function run() {
  const sitemapText = await readText(baseUrl ? `${baseUrl}/sitemap.xml` : path.join(DIST, "sitemap.xml"))
  const urls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  if (urls.length !== EXPECTED_ROUTES) issues.push(`sitemap: expected ${EXPECTED_ROUTES} URLs, found ${urls.length}`)

  const serviceWords = {}

  for (const url of urls) {
    const pathname = new URL(url).pathname
    let html
    try {
      html = await routeHtml(baseUrl ? `${baseUrl}${pathname}` : url)
    } catch (error) {
      issues.push(`${pathname}: ${error.message}`)
      continue
    }

    const title = first(html, /<title>([^<]+)<\/title>/i)
    const description = first(html, /<meta name="description" content="([^"]+)"/i)
    const canonical = first(html, /<link rel="canonical" href="([^"]+)"/i)
    const hreflang = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/gi)].map((match) => match[1])

    if ((html.match(/<h1\b/gi) ?? []).length !== 1) issues.push(`${pathname}: expected exactly one H1`)
    if (canonical !== url) issues.push(`${pathname}: canonical is ${canonical || "missing"}`)
    if (new Set(hreflang).size !== 4 || ![...LANGS, "x-default"].every((lang) => hreflang.includes(lang))) {
      issues.push(`${pathname}: invalid hreflang set`)
    }
    if (title.length < 30 || title.length > 65) issues.push(`${pathname}: title length ${title.length}`)
    if (description.length < 110 || description.length > 165) issues.push(`${pathname}: description length ${description.length}`)
    recordUnique(titles, title, pathname, "title")
    recordUnique(descriptions, description, pathname, "description")

    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(match[1])
        jsonLdCount += 1
      } catch {
        issues.push(`${pathname}: invalid JSON-LD`)
      }
    }

    const serviceMatch = pathname.match(/^\/(ca|es|en)\/services\/(brand-strategy|branding-visual-identity|web-design-digital-products)$/)
    if (serviceMatch) {
      const [, lang, slug] = serviceMatch
      const main = html.match(/<main>([\s\S]*?)<\/main>/i)?.[1] ?? ""
      const words = textWordCount(main)
      serviceWords[slug] ??= {}
      serviceWords[slug][lang] = words
      if (words < 800) issues.push(`${pathname}: service content has ${words} words; expected at least 800`)
    }

    if (!baseUrl) {
      for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/gi)) {
        const ref = match[1].split(/[?#]/)[0]
        if (!ref || ref.startsWith("//") || ref.startsWith("/api/")) continue
        const target = /^\/(ca|es|en)(?:\/|$)/.test(ref)
          ? path.join(DIST, ref.replace(/^\//, ""), "index.html")
          : path.join(DIST, ref.replace(/^\//, ""))
        if (!fs.existsSync(target)) issues.push(`${pathname}: broken internal reference ${ref}`)
      }
    }
  }

  if (jsonLdCount !== EXPECTED_JSON_LD) issues.push(`JSON-LD: expected ${EXPECTED_JSON_LD} blocks, found ${jsonLdCount}`)

  const result = {
    target: baseUrl ?? DIST,
    routes: urls.length,
    jsonLd: jsonLdCount,
    uniqueTitles: titles.size,
    uniqueDescriptions: descriptions.size,
    serviceWords,
    issues: [...new Set(issues)],
  }
  console.log(JSON.stringify(result, null, 2))
  if (issues.length) process.exitCode = 1
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
