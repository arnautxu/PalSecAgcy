/**
 * Static SEO renderer.
 *
 * Vite still ships the interactive React application, while this script adds
 * meaningful, crawlable HTML to every public route. React replaces the static
 * fallback after boot, so users keep the full interactive experience.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import {
  BASE_URL,
  ABOUT_TEAM_COPY,
  ABOUT_APPROACH,
  LANGS,
  PROJECT_META,
  PROJECT_SLUGS,
  buildAllRoutes,
  buildAboutPageSchema,
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildServicesCatalogSchema,
  buildWebSiteSchema,
  homeLabel,
  getProjectPrimaryServiceSlug,
  projectsLabel,
  servicesLabel,
  swapLang,
} from "../src/lib/seoMeta.ts"
import { getAllServicePages, getServicePage } from "../src/content/servicePages.ts"
import { getProjectCopy } from "../src/pages/ProjectDetail.tsx"
import { LEGAL_COPY } from "../src/pages/LegalPage.tsx"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DIST = path.join(ROOT, "dist")
const PUBLIC = path.join(ROOT, "public")

const OG_LOCALE = { ca: "ca_ES", en: "en_US", es: "es_ES" }

const LABELS = {
  ca: { services: "Serveis", projects: "Projectes", about: "Sobre nosaltres", contact: "Parlem del teu projecte", process: "Com treballem", deliverables: "Entregables", related: "Projectes relacionats", scope: "Àmbit del projecte", privacy: "Privacitat", legal: "Avís legal" },
  en: { services: "Services", projects: "Projects", about: "About us", contact: "Discuss your project", process: "How we work", deliverables: "Deliverables", related: "Related projects", scope: "Project scope", privacy: "Privacy", legal: "Legal notice" },
  es: { services: "Servicios", projects: "Proyectos", about: "Sobre nosotros", contact: "Hablemos de tu proyecto", process: "Cómo trabajamos", deliverables: "Entregables", related: "Proyectos relacionados", scope: "Ámbito del proyecto", privacy: "Privacidad", legal: "Aviso legal" },
}

const HOME_COPY = {
  ca: "Agència de disseny estratègic per a marques que necessiten executar. Connectem estratègia, identitat, web i producte digital des de la Costa Brava.",
  en: "Strategic design agency for brands that need to execute. We connect strategy, identity, web, and digital product from Costa Brava.",
  es: "Agencia de diseño estratégico para marcas que necesitan ejecutar. Conectamos estrategia, identidad, web y producto digital desde Costa Brava.",
}

const ABOUT_COPY = {
  ca: ["Palsec Agcy és una agència de disseny a la Costa Brava que treballa en estratègia de marca, identitat, productes digitals i sistemes visuals.", "Comencem pel context i els objectius, definim criteris compartits i desenvolupem les aplicacions necessàries perquè cada decisió formi part del mateix sistema."],
  en: ["Palsec Agcy is a strategic design agency in Costa Brava working across brand strategy, identity, digital products, and visual systems.", "We begin with context and objectives, define shared criteria, and develop the applications needed so every decision belongs to the same system."],
  es: ["Palsec Agcy es una agencia de diseño en Costa Brava que trabaja en estrategia de marca, identidad, productos digitales y sistemas visuales.", "Empezamos por el contexto y los objetivos, definimos criterios compartidos y desarrollamos las aplicaciones necesarias para que cada decisión forme parte del mismo sistema."],
}

const PROJECT_SCOPE = {
  vira: ["UX/UI mobile", "Brand identity", "Visual system", "Design language"],
  arkuos: ["Brand application", "Design system", "Communication pieces", "Visual language"],
  galeon: ["Product design", "UX/UI", "Visual system", "Interactive content"],
  "el-xiringuito": ["Brand identity", "Menu system", "Print and signage", "Digital assets"],
  enteza: ["Brand system", "Catalog structure", "Digital design", "Product presentation"],
  "gent-gran-de-calonge-i-sant-antoni": ["Public sector", "Brand identity", "Communication system", "Print and digital"],
  logoteca: ["Logo design", "Typography", "Visual synthesis", "Brand systems"],
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function jsonScript(value) {
  return `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`
}

function breadcrumbFor(route) {
  const home = { name: homeLabel(route.lang), url: `${BASE_URL}/${route.lang}` }
  if (route.kind === "projects") {
    return buildBreadcrumbSchema([home, { name: projectsLabel(route.lang), url: route.canonicalUrl }])
  }
  if (route.kind === "services") {
    return buildBreadcrumbSchema([home, { name: servicesLabel(route.lang), url: route.canonicalUrl }])
  }
  if (route.kind === "service") {
    const service = getServicePage(route.serviceSlug, route.lang)
    return buildBreadcrumbSchema([
      home,
      { name: servicesLabel(route.lang), url: `${BASE_URL}/${route.lang}/services` },
      { name: service.title, url: route.canonicalUrl },
    ])
  }
  if (route.kind === "project") {
    return buildBreadcrumbSchema([
      home,
      { name: projectsLabel(route.lang), url: `${BASE_URL}/${route.lang}/projects` },
      { name: PROJECT_META[route.slug].displayTitle, url: route.canonicalUrl },
    ])
  }
  return null
}

function buildHead(route) {
  const alternates = LANGS.map((lang) =>
    `<link rel="alternate" hreflang="${lang}" href="${BASE_URL}${swapLang(route.path, lang)}">`,
  ).join("\n")
  const structuredData = []
  if (route.kind === "home" || route.kind === "about-us") structuredData.push(buildOrganizationSchema())
  if (route.kind === "home") structuredData.push(buildWebSiteSchema())
  if (route.kind === "about-us") structuredData.push(buildAboutPageSchema(route.lang, route.canonicalUrl))
  const breadcrumb = breadcrumbFor(route)
  if (breadcrumb) structuredData.push(breadcrumb)
  if (route.kind === "service") {
    structuredData.push(buildServiceSchema({ serviceSlug: route.serviceSlug, lang: route.lang, canonicalUrl: route.canonicalUrl }))
  }
  if (route.kind === "services") {
    structuredData.push(buildServicesCatalogSchema(route.lang, route.canonicalUrl))
  }
  if (route.kind === "project") {
    structuredData.push(buildCreativeWorkSchema({ slug: route.slug, lang: route.lang, canonicalUrl: route.canonicalUrl, description: route.description }))
  }

  return `<title>${escapeHtml(route.title)}</title>
<meta name="description" content="${escapeHtml(route.description)}">
<link rel="canonical" href="${escapeHtml(route.canonicalUrl)}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${BASE_URL}${swapLang(route.path, "en")}">
<meta property="og:title" content="${escapeHtml(route.title)}">
<meta property="og:description" content="${escapeHtml(route.description)}">
<meta property="og:url" content="${escapeHtml(route.canonicalUrl)}">
<meta property="og:type" content="${route.kind === "project" ? "article" : "website"}">
<meta property="og:locale" content="${OG_LOCALE[route.lang]}">
<meta property="og:image" content="${escapeHtml(route.ogImage)}">
<meta property="og:image:alt" content="${escapeHtml(`${route.title} — PALSEC AGCY`)}">
<meta property="og:site_name" content="PALSEC AGCY">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(route.title)}">
<meta name="twitter:description" content="${escapeHtml(route.description)}">
<meta name="twitter:image" content="${escapeHtml(route.ogImage)}">
${structuredData.map(jsonScript).join("\n")}
<style id="seo-static-style">
  .seo-static{box-sizing:border-box;min-height:100%;overflow:auto;padding:32px 24px 120px;background:#fff;color:#282828;font-family:"Geist Mono",ui-monospace,monospace;text-transform:none}
  .seo-static *{box-sizing:border-box}.seo-static__wrap{max-width:1040px;margin:0 auto}.seo-static nav{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:64px}.seo-static a{color:inherit}.seo-static h1{max-width:900px;margin:0;font-size:clamp(32px,7vw,76px);font-weight:400;line-height:1.02;letter-spacing:-.045em}.seo-static h2{margin:42px 0 16px;font-size:13px;letter-spacing:.08em;text-transform:uppercase}.seo-static p{max-width:760px;font-size:16px;line-height:1.7}.seo-static ul,.seo-static ol{padding-left:20px;line-height:1.8}.seo-static__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:36px}.seo-static__card{display:block;border:1px solid #eee;padding:22px;text-decoration:none}.seo-static__card h2{margin:0 0 14px;font-size:18px;text-transform:none;letter-spacing:0}.seo-static__card p{font-size:14px}.seo-static img{display:block;width:min(100%,900px);height:auto;margin:32px 0}.seo-static footer{display:flex;flex-wrap:wrap;gap:16px;margin-top:64px;padding-top:20px;border-top:1px solid #eee;font-size:13px}
</style>`
}

function navigation(lang) {
  const labels = LABELS[lang]
  return `<nav aria-label="Primary"><a href="/${lang}">PALSEC AGCY</a><a href="/${lang}/services">${labels.services}</a><a href="/${lang}/projects">${labels.projects}</a><a href="/${lang}/about-us">${labels.about}</a><a href="mailto:info@palsec.agency">${labels.contact}</a></nav>`
}

function footer(lang) {
  const labels = LABELS[lang]
  return `<footer><a href="https://www.linkedin.com/company/palsec-agency">LinkedIn</a><a href="https://www.instagram.com/palsec.agency/">Instagram</a><a href="/${lang}/privacy">${labels.privacy}</a><a href="/${lang}/legal-notice">${labels.legal}</a><a href="mailto:info@palsec.agency">info@palsec.agency</a></footer>`
}

function servicesBody(lang) {
  return getAllServicePages(lang).map((service) => `<a class="seo-static__card" href="/${lang}/services/${service.slug}"><h2>${escapeHtml(service.title)}</h2><p>${escapeHtml(service.intro)}</p></a>`).join("")
}

function projectCards(lang) {
  return PROJECT_SLUGS.map((slug) => {
    const project = PROJECT_META[slug]
    return `<a class="seo-static__card" href="/${lang}/project/${slug}"><h2>${escapeHtml(project.displayTitle)}</h2><p>${escapeHtml(project.descriptions[lang])}</p></a>`
  }).join("")
}

async function projectImage(project) {
  if (!project.firstImage) return ""

  const relativePath = project.firstImage.replace(/^\//, "")
  const sourcePath = path.join(PUBLIC, relativePath)
  const webpUrl = project.firstImage.replace(/\.(png|jpe?g)$/i, ".webp")
  const webpPath = path.join(PUBLIC, webpUrl.replace(/^\//, ""))

  let size = { width: undefined, height: undefined }
  try {
    const metadata = await sharp(sourcePath).metadata()
    size = { width: metadata.width, height: metadata.height }
  } catch {
    // Keep the crawlable fallback even if optional image metadata is unavailable.
  }

  const dimensions = size.width && size.height
    ? ` width="${size.width}" height="${size.height}"`
    : ""
  const img = `<img src="${project.firstImage}" alt="${escapeHtml(`${project.displayTitle} — selected project image`)}"${dimensions} fetchpriority="high" decoding="async">`

  if (!fs.existsSync(webpPath)) return img

  const responsiveCandidates = [160, 720, 1280]
    .map((width) => ({ width, url: webpUrl.replace(/\.webp$/i, `.${width}.webp`) }))
    .filter(({ url }) => fs.existsSync(path.join(PUBLIC, url.replace(/^\//, ""))))
    .map(({ width, url }) => `${url} ${width}w`)
  if (size.width) responsiveCandidates.push(`${webpUrl} ${size.width}w`)

  const srcset = responsiveCandidates.length ? responsiveCandidates.join(", ") : webpUrl
  return `<picture><source srcset="${srcset}" sizes="(max-width: 767px) calc(100vw - 40px), 600px" type="image/webp">${img}</picture>`
}

function legalBody(route) {
  const content = LEGAL_COPY[route.lang][route.kind]
  return content.sections.map(([title, body]) => `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></section>`).join("")
}

async function buildStaticBody(route) {
  const labels = LABELS[route.lang]
  let main = ""
  if (route.kind === "home") {
    main = `<h1>${escapeHtml(route.title)}</h1><p>${escapeHtml(HOME_COPY[route.lang])}</p><h2>${labels.services}</h2><div class="seo-static__grid">${servicesBody(route.lang)}</div><h2>${labels.projects}</h2><div class="seo-static__grid">${projectCards(route.lang)}</div>`
  } else if (route.kind === "services") {
    main = `<h1>${escapeHtml(labels.services)}</h1><p>${escapeHtml(route.description)}</p><div class="seo-static__grid">${servicesBody(route.lang)}</div>`
  } else if (route.kind === "service") {
    const service = getServicePage(route.serviceSlug, route.lang)
    const related = service.relatedProjects.map((slug) => `<li><a href="/${route.lang}/project/${slug}">${escapeHtml(PROJECT_META[slug].displayTitle)}</a></li>`).join("")
    const budgetLabel = route.lang === "ca" ? "Pressupost i abast" : route.lang === "es" ? "Presupuesto y alcance" : "Budget and scope"
    main = `<h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.intro)}</p><p>${escapeHtml(service.forWhom)}</p>${service.details.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}<h2>${escapeHtml(budgetLabel)}</h2><p>${escapeHtml(service.budget)}</p><h2>${labels.process}</h2><ol>${service.process.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol><h2>${labels.deliverables}</h2><ul>${service.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h2>FAQ</h2>${service.faqs.map((faq) => `<section><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></section>`).join("")}<h2>${labels.related}</h2><ul>${related}</ul>`
  } else if (route.kind === "projects") {
    main = `<h1>${escapeHtml(labels.projects)}</h1><p>${escapeHtml(route.description)}</p><div class="seo-static__grid">${projectCards(route.lang)}</div>`
  } else if (route.kind === "project") {
    const project = PROJECT_META[route.slug]
    const copy = getProjectCopy(route.slug, route.lang)
    const primaryService = getServicePage(getProjectPrimaryServiceSlug(route.slug), route.lang)
    const body = copy?.body ?? [project.descriptions[route.lang]]
    const bullets = copy?.bullets ?? PROJECT_SCOPE[route.slug]
    const sectionLabels = route.lang === "ca"
      ? ["Context", "Resposta de disseny", "Sistema", "Aplicació", "Resultat"]
      : route.lang === "es"
        ? ["Contexto", "Respuesta de diseño", "Sistema", "Aplicación", "Resultado"]
        : ["Context", "Design response", "System", "Application", "Outcome"]
    const sections = body.map((paragraph, index) => `<section><h2>${escapeHtml(sectionLabels[index] ?? labels.scope)}</h2><p>${escapeHtml(paragraph)}</p></section>`).join("")
    const scope = bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    const image = await projectImage(project)
    main = `<article><h1>${escapeHtml(project.displayTitle)}</h1>${sections}${image}<h2>${labels.scope}</h2><ul>${scope}</ul><p><a href="/${route.lang}/services/${primaryService.slug}">${escapeHtml(primaryService.title)}</a> · <a href="/${route.lang}/projects">${labels.projects}</a></p></article>`
  } else if (route.kind === "about-us") {
    const paragraphs = [...ABOUT_COPY[route.lang], ABOUT_TEAM_COPY[route.lang]]
    const approach = ABOUT_APPROACH[route.lang]
    main = `<h1>${escapeHtml(labels.about)}</h1>${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}<h2>${escapeHtml(approach.approach)}</h2><p>${escapeHtml(approach.body)}</p><ul>${approach.principles.map((principle) => `<li>${escapeHtml(principle)}</li>`).join("")}</ul><h2>${labels.services}</h2><div class="seo-static__grid">${servicesBody(route.lang)}</div>`
  } else {
    main = `<h1>${escapeHtml(route.title.replace(/ \| PALSEC AGCY$/, ""))}</h1><p>${escapeHtml(route.description)}</p>${legalBody(route)}`
  }

  return `<div class="seo-static" data-static-prerender><div class="seo-static__wrap">${navigation(route.lang)}<main>${main}</main>${footer(route.lang)}</div></div>`
}

async function render(template, route) {
  let html = template.replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${route.lang}"`)
  html = html.replace(/<title>[^<]*<\/title>\s*/, "")
  html = html.replace(/(<head[^>]*>)/, `$1\n${buildHead(route)}`)
  html = html.replace('<div id="root"></div>', `<div id="root">${await buildStaticBody(route)}</div>`)
  return html
}

function sitemap(routes) {
  const entries = routes.map((route) => {
    const alternates = LANGS.map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${swapLang(route.path, lang)}"/>`).join("")
    return `<url><loc>${route.canonicalUrl}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${swapLang(route.path, "en")}"/></url>`
  }).join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`
}

async function run() {
  const templatePath = path.join(DIST, "index.html")
  if (!fs.existsSync(templatePath)) throw new Error(`${templatePath} not found. Run Vite build first.`)
  const template = fs.readFileSync(templatePath, "utf8")
  const routes = buildAllRoutes()
  for (const route of routes) {
    const output = path.join(DIST, route.distPath)
    fs.mkdirSync(path.dirname(output), { recursive: true })
    fs.writeFileSync(output, await render(template, route), "utf8")
  }
  const xml = sitemap(routes)
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf8")
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), xml, "utf8")
  console.log(`[prerender] ${routes.length} crawlable routes and sitemap emitted.`)
}

await run()
