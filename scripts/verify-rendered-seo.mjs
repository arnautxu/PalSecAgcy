/** Compare initial HTML and hydrated React content on every sitemap URL. */
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { tsImport } from "tsx/esm/api"

const { buildAllRoutes } = await tsImport("../src/lib/seoMeta.ts", import.meta.url)
const routeManifest = buildAllRoutes()

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIST = path.join(ROOT, "dist")
const args = process.argv.slice(2)
const baseArg = args.find((arg) => arg.startsWith("--base-url="))
const outputArg = args.find((arg) => arg.startsWith("--output="))
const issues = []
const results = []
const EXPECTED_ROUTES = routeManifest.length

async function localServer() {
  const mimeTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".xml": "application/xml", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4", ".woff2": "font/woff2" }
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname)
    let target = path.resolve(DIST, `.${pathname}`)
    if (target !== DIST && !target.startsWith(`${DIST}${path.sep}`)) { response.writeHead(403).end(); return }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html")
    if (!fs.existsSync(target)) { response.writeHead(404).end("Not found"); return }
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(target)] ?? "application/octet-stream" })
    fs.createReadStream(target).pipe(response)
  })
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` }
}

// Serialised into the browser: keep this function self-contained.
function snapshot(html) {
  const source = typeof html === "string" ? new DOMParser().parseFromString(html, "text/html") : document
  const normal = (value) => (value ?? "").replace(/\s+/g, " ").trim()
  const values = (selector, attribute) => [...source.querySelectorAll(selector)].map((element) => attribute ? element.getAttribute(attribute) : normal(element.textContent))
  const main = source.querySelector("main")?.cloneNode(true)
  main?.querySelectorAll("script, style, noscript, button, canvas, [aria-hidden='true'], [data-client-only], [data-seo-ignore]").forEach((element) => element.remove())
  const schemas = [...source.querySelectorAll("script[type='application/ld+json']")].map((element) => {
    try { return JSON.stringify(JSON.parse(element.textContent)) } catch { return "INVALID_JSON_LD" }
  }).sort()
  const inlineHidden = (element) => {
    for (let current = element; current; current = current.parentElement) {
      if (current.hidden || current.style.display === "none" || current.style.visibility === "hidden" || current.style.opacity === "0") return true
    }
    return false
  }
  return {
    lang: source.documentElement.lang,
    title: values("title"),
    description: values("meta[name='description']", "content"),
    canonical: values("link[rel='canonical']", "href"),
    hreflang: [...source.querySelectorAll("link[rel='alternate'][hreflang]")].map((element) => `${element.getAttribute("hreflang")}:${element.getAttribute("href")}`).sort(),
    h1: values("h1"),
    ogTitle: values("meta[property='og:title']", "content"),
    ogDescription: values("meta[property='og:description']", "content"),
    ogImage: values("meta[property='og:image']", "content"),
    schemas,
    mainText: normal(main?.textContent),
    contentInlineHidden: inlineHidden(source.querySelector("main")),
  }
}

async function run() {
  let playwright
  try { playwright = await import("playwright") }
  catch { throw new Error("Browser verification requires playwright and Chromium: npm install -D playwright && npx playwright install chromium") }
  const local = baseArg ? null : await localServer()
  const baseUrl = baseArg?.slice("--base-url=".length).replace(/\/$/, "") ?? local.baseUrl
  let browser
  try {
    const launchOptions = { headless: true, args: ["--enable-unsafe-swiftshader"] }
    if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    browser = await playwright.chromium.launch(launchOptions)
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" })
    const page = await context.newPage()
    const parser = await context.newPage()
    const sitemapResponse = await context.request.get(`${baseUrl}/sitemap.xml`)
    if (sitemapResponse.status() !== 200) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status()}`)
    const sitemap = await sitemapResponse.text()
    const urls = [...sitemap.matchAll(/<loc\b[^>]*>([^<]+)<\/loc>/gi)].map((match) => match[1])
    if (urls.length !== EXPECTED_ROUTES) issues.push(`sitemap: expected ${EXPECTED_ROUTES} URLs, found ${urls.length}`)
    const sitemapUrls = new Set(urls)
    if (sitemapUrls.size !== urls.length) issues.push("sitemap: duplicate URLs")
    for (const route of routeManifest) if (!sitemapUrls.has(route.canonicalUrl)) issues.push(`sitemap: route manifest URL missing: ${route.canonicalUrl}`)
    for (const url of sitemapUrls) if (!routeManifest.some(route => route.canonicalUrl === url)) issues.push(`sitemap: URL absent from route manifest: ${url}`)
    let activeErrors = []
    page.on("pageerror", (error) => activeErrors.push(error.message))
    page.on("console", (message) => { if (message.type() === "error") activeErrors.push(message.text()) })
    for (const canonical of urls) {
      const pathname = new URL(canonical).pathname
      const target = `${baseUrl}${pathname}`
      activeErrors = []
      const routeIssues = []
      try {
        const rawResponse = await context.request.get(target, { maxRedirects: 0 })
        if (rawResponse.status() !== 200) throw new Error(`initial HTML returned HTTP ${rawResponse.status()}`)
        const initial = await parser.evaluate(snapshot, await rawResponse.text())
        const response = await page.goto(target, { waitUntil: "load", timeout: 30000 })
        if (response?.status() !== 200) throw new Error(`browser returned HTTP ${response?.status()}`)
        await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true", undefined, { timeout: 15000 })
        await page.waitForTimeout(650)
        const rendered = await page.evaluate(snapshot)
        for (const key of Object.keys(initial)) {
          if (JSON.stringify(initial[key]) !== JSON.stringify(rendered[key])) routeIssues.push(`raw/rendered ${key} differs`)
        }
        if (!initial.mainText) routeIssues.push("initial main content is empty")
        if (initial.contentInlineHidden) routeIssues.push("initial main content is hidden before JavaScript")
        if (rendered.h1.length !== 1) routeIssues.push(`rendered H1 count ${rendered.h1.length}`)
        const visible = await page.locator("h1").first().evaluate((element) => {
          const rect = element.getBoundingClientRect()
          if (rect.width <= 1 || rect.height <= 1) return false
          for (let current = element; current; current = current.parentElement) {
            const css = getComputedStyle(current)
            if (css.display === "none" || css.visibility === "hidden" || Number(css.opacity) === 0) return false
          }
          return true
        })
        if (!visible) routeIssues.push("rendered H1 is visually hidden")
        if (activeErrors.length) routeIssues.push(...[...new Set(activeErrors)].map((error) => `browser error: ${error}`))
        results.push({ path: pathname, initialWords: initial.mainText.split(/\s+/).length, renderedWords: rendered.mainText.split(/\s+/).length, issues: routeIssues })
      } catch (error) {
        routeIssues.push(error.message)
        results.push({ path: pathname, issues: routeIssues })
      }
      issues.push(...routeIssues.map((issue) => `${pathname}: ${issue}`))
      process.stderr.write(`${routeIssues.length ? "FAIL" : "PASS"} ${pathname}\n`)
    }
    // Stored consent must not cause a different first hydrated tree.
    await page.evaluate(() => localStorage.setItem("palsec-analytics-consent", "denied"))
    activeErrors = []
    await page.goto(`${baseUrl}/ca`, { waitUntil: "load" })
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true")
    await page.waitForTimeout(350)
    if (activeErrors.length) issues.push(...activeErrors.map((error) => `returning visitor: ${error}`))
    const report = { target: baseUrl, routes: results.length, passed: results.filter((route) => route.issues.length === 0).length, results, issues: [...new Set(issues)] }
    if (outputArg) fs.writeFileSync(path.resolve(outputArg.slice("--output=".length)), `${JSON.stringify(report, null, 2)}\n`)
    console.log(JSON.stringify(report, null, 2))
    if (issues.length) process.exitCode = 1
  } finally {
    await browser?.close()
    if (local) await new Promise((resolve) => local.server.close(resolve))
  }
}
run().catch((error) => { console.error(error); process.exitCode = 1 })
