/**
 * postbuild head-only prerender script
 *
 * Reads dist/index.html (Vite output), then for every known route emits a
 * per-route static HTML file in dist/ with the correct <html lang>, <title>,
 * <meta name="description">, canonical, hreflang alternates, OG, Twitter,
 * and JSON-LD blocks injected into <head>.
 *
 * The <body> (including the <div id="root"> and all Vite asset <script> tags)
 * is left exactly as Vite emitted it — the SPA still bootstraps normally.
 *
 * Run via: node scripts/prerender.mjs
 * (Node >= 18, no external deps beyond the built-in fs/path modules)
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DIST = path.join(ROOT, "dist")

// ─── Inline metadata (mirrors src/lib/seoMeta.ts — no TS loading at build time) ──

const BASE_URL = "https://www.palsec.agency"
const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.svg`
const LANGS = ["ca", "en", "es"]

const PROJECT_SLUGS = [
  "vira",
  "arkuos",
  "galeon",
  "el-xiringuito",
  "enteza",
  "gent-gran-de-calonge-i-sant-antoni",
  "logoteca",
  "cms",
  "estudi-dental-carrera",
]

const HOME_META = {
  en: {
    title: "PALSEC AGCY — Strategic Design Studio",
    description:
      "Palsec Agcy is a design-led studio based in Costa Brava. Brand strategy, branding, web design, and visual systems for brands that need to execute.",
  },
  ca: {
    title: "PALSEC AGCY — Estudi de Disseny Estratègic",
    description:
      "Palsec Agcy és un estudi de disseny a la Costa Brava. Estratègia de marca, branding, disseny web i sistemes visuals per a marques que necessiten executar.",
  },
  es: {
    title: "PALSEC AGCY — Estudio de Diseño Estratégico",
    description:
      "Palsec Agcy es un estudio de diseño en la Costa Brava. Estrategia de marca, branding, diseño web y sistemas visuales para marcas que necesitan ejecutar.",
  },
}

const PROJECTS_META = {
  en: {
    title: "PROJECTS | PALSEC AGCY",
    description:
      "Selected projects by Palsec Agcy: branding, digital product design, and visual systems. Each project built with precision and strategic intent.",
  },
  ca: {
    title: "PROJECTES | PALSEC AGCY",
    description:
      "Projectes seleccionats de Palsec Agcy: branding, disseny de producte digital i sistemes visuals. Cada projecte construït amb precisió i intenció estratègica.",
  },
  es: {
    title: "PROYECTOS | PALSEC AGCY",
    description:
      "Proyectos seleccionados de Palsec Agcy: branding, diseño de producto digital y sistemas visuales. Cada proyecto construido con precisión e intención estratégica.",
  },
}

const SERVICES_META = {
  en: {
    title: "SERVICES | PALSEC AGCY",
    description:
      "Palsec Agcy services: brand strategy, branding, web design, motion graphics, and creative direction. From definition to execution.",
  },
  ca: {
    title: "SERVEIS | PALSEC AGCY",
    description:
      "Serveis de Palsec Agcy: estratègia de marca, branding, disseny web, motion graphics i direcció creativa. De la definició a l'execució.",
  },
  es: {
    title: "SERVICIOS | PALSEC AGCY",
    description:
      "Servicios de Palsec Agcy: estrategia de marca, branding, diseño web, motion graphics y dirección creativa. De la definición a la ejecución.",
  },
}

const ABOUT_META = {
  en: {
    title: "ABOUT US | PALSEC AGCY",
    description:
      "Palsec Agcy is a design-led studio based in Costa Brava, working globally on brand strategy, digital products, and visual systems.",
  },
  ca: {
    title: "SOBRE NOSALTRES | PALSEC AGCY",
    description:
      "Palsec Agcy és un estudi de disseny a la Costa Brava que treballa globalment en estratègia de marca, productes digitals i sistemes visuals.",
  },
  es: {
    title: "SOBRE NOSOTROS | PALSEC AGCY",
    description:
      "Palsec Agcy es un estudio de diseño en la Costa Brava que trabaja globalmente en estrategia de marca, productos digitales y sistemas visuales.",
  },
}

const PROJECT_META = {
  vira: {
    displayTitle: "VIRA",
    firstImage: "/media/projects/vira/01.png",
    descriptions: {
      en: "VIRA IS AN APP DESIGNED TO HELP ADDRESS THE MAIN CHALLENGES FACED BY TEENAGERS WITH ADHD.",
      ca: "VIRA ÉS UNA APP DISSENYADA PER AJUDAR A SOLVENTAR ELS PRINCIPALS PROBLEMES DELS ADOLESCENTS AMB TDAH.",
      es: "VIRA ES UNA APP DISEÑADA PARA AYUDAR A RESOLVER LOS PRINCIPALES RETOS DE LOS ADOLESCENTES CON TDAH.",
    },
    client: "PALSEC",
    year: "2026",
  },
  arkuos: {
    displayTitle: "ARKUOS",
    firstImage: "/media/projects/arkuos/1.png",
    descriptions: {
      en: "ARKUOS IS A SOCIO-EDUCATIONAL ACTION SPACE AND A CREATIVE ENVIRONMENT FOR CHILDREN, TEENAGERS, AND YOUNG PEOPLE TO CREATE, EXPERIMENT, AND LEARN.",
      ca: "ARKUOS ÉS UN ESPAI D'ACCIÓ SOCIO-EDUCATIVA I UN ENTORN DE CREACIÓ, EXPERIMENTACIÓ I APRENENTATGE PER A INFANTS, ADOLESCENTS I JOVES.",
      es: "ARKUOS ES UN ESPACIO DE ACCIÓN SOCIOEDUCATIVA Y UN ENTORNO DE CREACIÓN, EXPERIMENTACIÓN Y APRENDIZAJE PARA NIÑOS, ADOLESCENTES Y JÓVENES.",
    },
    client: "PALSEC",
    year: "2026",
  },
  galeon: {
    displayTitle: "GALEÓN",
    firstImage: "/media/projects/galeon/01.png",
    descriptions: {
      en: "GALEÓN IS AN INTERACTIVE APPLICATION THAT ALLOWS YOU TO TRAVEL THROUGH THE HISTORY OF THE SPANISH MONARCHY VIA THE ROYAL COLLECTIONS.",
      ca: "GALEÓN ÉS UNA APLICACIÓ INTERACTIVA QUE PERMET RECÓRRER LA HISTÒRIA DE LA MONARQUIA ESPANYOLA A TRAVÉS DE LES COL·LECCIONS REIALS.",
      es: "GALEÓN ES UNA APLICACIÓN INTERACTIVA QUE PERMITE RECORRER LA HISTORIA DE LA MONARQUÍA ESPAÑOLA A TRAVÉS DE LAS COLECCIONES REALES.",
    },
    client: "PALSEC",
    year: "2026",
  },
  "el-xiringuito": {
    displayTitle: "EL XIRINGUITO",
    firstImage: "/media/projects/el-xiringuito/1.png",
    descriptions: {
      en: "EL XIRINGUITO IS A COMPLETE IDENTITY FOR A COASTAL RESTAURANT, DESIGNED TO CONVEY A LIGHT, BRIGHT MEDITERRANEAN AESTHETIC.",
      ca: "EL XIRINGUITO ÉS UNA IDENTITAT COMPLETA PER A UN RESTAURANT DE COSTA, PENSADA PER TRANSMETRE UNA ESTÈTICA MEDITERRÀNIA, LLEUGERA I LLUMINOSA.",
      es: "EL XIRINGUITO ES UNA IDENTIDAD COMPLETA PARA UN RESTAURANTE DE COSTA, PENSADA PARA TRANSMITIR UNA ESTÉTICA MEDITERRÁNEA, LIGERA Y LUMINOSA.",
    },
    client: "PALSEC",
    year: "2026",
  },
  enteza: {
    displayTitle: "ENTEZA",
    firstImage: "/media/projects/enteza/1.png",
    descriptions: {
      en: "ENTEZA IS A BRAND FOCUSED ON FURNITURE AND TABLEWARE RENTALS FOR EVENTS, WITH AN EMPHASIS ON DESIGN, ELEGANCE, AND QUALITY.",
      ca: "ENTEZA ÉS UNA MARCA ORIENTADA A LLOGUER DE MOBILIARI I PARAMENT PER A ESDEVENIMENTS, AMB UN ENFOC EN DISSENY, ELEGÀNCIA I QUALITAT.",
      es: "ENTEZA ES UNA MARCA ORIENTADA AL ALQUILER DE MOBILIARIO Y MENAJE PARA EVENTOS, CON UN ENFOQUE EN DISEÑO, ELEGANCIA Y CALIDAD.",
    },
    client: "PALSEC",
    year: "2026",
  },
  "gent-gran-de-calonge-i-sant-antoni": {
    displayTitle: "GENT GRAN DE CALONGE I SANT ANTONI",
    firstImage: "/media/projects/gent-gran/01.png",
    descriptions: {
      en: "A PROJECT DEVELOPED FOR THE MUNICIPAL SOCIAL SERVICES DEPARTMENT, AIMED AT GIVING VISIBILITY AND COHESION TO ACTIVITIES FOR OLDER ADULTS.",
      ca: "PROJECTE DESENVOLUPAT PER A LA REGIDORIA DE SERVEIS SOCIALS DEL MUNICIPI, AMB L'OBJECTIU DE DONAR VISIBILITAT I COHESIÓ A LES ACTIVITATS ADREÇADES A LES PERSONES GRANS.",
      es: "PROYECTO DESARROLLADO PARA LA CONCEJALÍA DE SERVICIOS SOCIALES DEL MUNICIPIO, CON EL OBJETIVO DE DAR VISIBILIDAD Y COHESIÓN A LAS ACTIVIDADES DIRIGIDAS A LAS PERSONAS MAYORES.",
    },
    client: "PALSEC",
    year: "2026",
  },
  logoteca: {
    displayTitle: "LOGOTECA",
    firstImage: "/media/projects/logoteca/algo_2-01.jpg",
    descriptions: {
      en: "LOGOTECA — a curated collection of logo design work by PALSEC AGCY.",
      ca: "LOGOTECA — una col·lecció de dissenys de logotips de PALSEC AGCY.",
      es: "LOGOTECA — una colección de diseños de logotipos de PALSEC AGCY.",
    },
    client: "PALSEC",
    year: "2026",
  },
  cms: {
    // comingSoon: true in projects.ts. ProjectDetail.tsx redirects this to /:lang/projects.
    // We still emit a static file because the SPA carousel links here, but mark it noindex
    // so search engines don't waste budget on a redirect target.
    displayTitle: "PALSEC AI LAB",
    firstImage: "/media/projects/ai-lab/thumb.jpg",
    descriptions: {
      en: "PALSEC AI LAB — work in progress. See current projects at palsec.agency/en/projects.",
      ca: "PALSEC AI LAB — en construcció. Mira els projectes actuals a palsec.agency/ca/projects.",
      es: "PALSEC AI LAB — en construcción. Mira los proyectos actuales en palsec.agency/es/projects.",
    },
    client: "PALSEC",
    year: "2026",
    noindex: true,
  },
  "estudi-dental-carrera": {
    displayTitle: "ESTUDI DENTAL CARRERA",
    firstImage: null,
    descriptions: {
      en: "ESTUDI DENTAL CARRERA — brand identity and visual system for a dental practice.",
      ca: "ESTUDI DENTAL CARRERA — identitat de marca i sistema visual per a una clínica dental.",
      es: "ESTUDI DENTAL CARRERA — identidad de marca y sistema visual para una clínica dental.",
    },
    client: "PALSEC",
    year: "2026",
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function swapLang(urlPath, newLang) {
  const parts = urlPath.split("/").filter(Boolean)
  if (parts.length === 0) return `/${newLang}`
  parts[0] = newLang
  return `/${parts.join("/")}`
}

const OG_LOCALE = { ca: "ca_ES", en: "en_US", es: "es_ES" }

const HOME_LABEL = { ca: "Inici", en: "Home", es: "Inicio" }
const PROJECTS_LABEL = { ca: "Projectes", en: "Projects", es: "Proyectos" }

function buildHeadBlock(route) {
  const {
    path: urlPath,
    lang,
    kind,
    slug,
    title,
    description,
    canonicalUrl,
    ogImage,
  } = route

  const escapedTitle = escapeHtml(title)
  const escapedDesc = escapeHtml(description)
  const escapedCanonical = escapeHtml(canonicalUrl)
  const escapedOgImage = escapeHtml(ogImage)

  // Hreflang
  const hreflangLines = LANGS.map(
    (l) =>
      `  <link rel="alternate" hrefLang="${l}" href="${escapeHtml(`${BASE_URL}${swapLang(urlPath, l)}`)}">`,
  ).join("\n")
  const xDefaultHref = escapeHtml(`${BASE_URL}${swapLang(urlPath, "en")}`)

  // JSON-LD: Organization (always)
  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PALSEC AGCY",
    url: BASE_URL,
    email: "info@palsec.agency",
    logo: `${BASE_URL}/favicon.svg`,
    sameAs: [],
  })

  // JSON-LD: WebSite (home only)
  const webSiteSchema =
    kind === "home"
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "PALSEC AGCY",
          url: BASE_URL,
          inLanguage: ["ca", "en", "es"],
        })
      : null

  // JSON-LD: BreadcrumbList
  let breadcrumbSchema = null
  if (kind === "projects") {
    breadcrumbSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: HOME_LABEL[lang], item: `${BASE_URL}/${lang}` },
        {
          "@type": "ListItem",
          position: 2,
          name: PROJECTS_LABEL[lang],
          item: canonicalUrl,
        },
      ],
    })
  } else if (kind === "project" && slug) {
    const meta = PROJECT_META[slug]
    breadcrumbSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: HOME_LABEL[lang], item: `${BASE_URL}/${lang}` },
        {
          "@type": "ListItem",
          position: 2,
          name: PROJECTS_LABEL[lang],
          item: `${BASE_URL}/${lang}/projects`,
        },
        { "@type": "ListItem", position: 3, name: meta.displayTitle, item: canonicalUrl },
      ],
    })
  }

  // JSON-LD: CreativeWork/VisualArtwork (project detail)
  let creativeWorkSchema = null
  if (kind === "project" && slug) {
    const meta = PROJECT_META[slug]
    const image = meta.firstImage ? `${BASE_URL}${meta.firstImage}` : DEFAULT_OG_IMAGE
    creativeWorkSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VisualArtwork",
      name: meta.displayTitle,
      url: canonicalUrl,
      image,
      description,
      inLanguage: lang,
      creator: { "@type": "Organization", name: "PALSEC AGCY" },
      sourceOrganization: { "@type": "Organization", name: meta.client },
      dateCreated: meta.year,
    })
  }

  const ogType = kind === "project" ? "article" : "website"

  const robotsTag = route.noindex
    ? `\n  <meta name="robots" content="noindex,follow">`
    : ""

  return `  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDesc}">${robotsTag}
  <link rel="canonical" href="${escapedCanonical}">
${hreflangLines}
  <link rel="alternate" hrefLang="x-default" href="${xDefaultHref}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDesc}">
  <meta property="og:url" content="${escapedCanonical}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:locale" content="${OG_LOCALE[lang]}">
  <meta property="og:image" content="${escapedOgImage}">
  <meta property="og:site_name" content="PALSEC AGCY">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedDesc}">
  <meta name="twitter:image" content="${escapedOgImage}">
  <script type="application/ld+json">${orgSchema}</script>${
    webSiteSchema ? `\n  <script type="application/ld+json">${webSiteSchema}</script>` : ""
  }${
    breadcrumbSchema ? `\n  <script type="application/ld+json">${breadcrumbSchema}</script>` : ""
  }${
    creativeWorkSchema
      ? `\n  <script type="application/ld+json">${creativeWorkSchema}</script>`
      : ""
  }`
}

// ─── Route list ───────────────────────────────────────────────────────────────

function buildAllRoutes() {
  const routes = []

  for (const lang of LANGS) {
    routes.push({
      path: `/${lang}`,
      distPath: `${lang}/index.html`,
      lang,
      kind: "home",
      title: HOME_META[lang].title,
      description: HOME_META[lang].description,
      canonicalUrl: `${BASE_URL}/${lang}`,
      ogImage: DEFAULT_OG_IMAGE,
    })

    routes.push({
      path: `/${lang}/services`,
      distPath: `${lang}/services/index.html`,
      lang,
      kind: "services",
      title: SERVICES_META[lang].title,
      description: SERVICES_META[lang].description,
      canonicalUrl: `${BASE_URL}/${lang}/services`,
      ogImage: DEFAULT_OG_IMAGE,
    })

    routes.push({
      path: `/${lang}/projects`,
      distPath: `${lang}/projects/index.html`,
      lang,
      kind: "projects",
      title: PROJECTS_META[lang].title,
      description: PROJECTS_META[lang].description,
      canonicalUrl: `${BASE_URL}/${lang}/projects`,
      ogImage: DEFAULT_OG_IMAGE,
    })

    routes.push({
      path: `/${lang}/about-us`,
      distPath: `${lang}/about-us/index.html`,
      lang,
      kind: "about-us",
      title: ABOUT_META[lang].title,
      description: ABOUT_META[lang].description,
      canonicalUrl: `${BASE_URL}/${lang}/about-us`,
      ogImage: DEFAULT_OG_IMAGE,
    })

    for (const slug of PROJECT_SLUGS) {
      const meta = PROJECT_META[slug]
      const desc = meta.descriptions[lang] ?? meta.descriptions["en"]
      const ogImage = meta.firstImage ? `${BASE_URL}${meta.firstImage}` : DEFAULT_OG_IMAGE
      routes.push({
        path: `/${lang}/project/${slug}`,
        distPath: `${lang}/project/${slug}/index.html`,
        lang,
        kind: "project",
        slug,
        title: `${meta.displayTitle} | PALSEC AGCY`,
        description: desc,
        canonicalUrl: `${BASE_URL}/${lang}/project/${slug}`,
        ogImage,
        noindex: meta.noindex === true,
      })
    }
  }

  return routes
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function injectHead(template, route) {
  const headBlock = buildHeadBlock(route)
  // Replace <html lang="..."> attribute
  let html = template.replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${route.lang}"`)
  // Remove the old generic <title> tag from the template (if present)
  html = html.replace(/<title>[^<]*<\/title>\n?/, "")
  // Inject our head block right after <head>
  html = html.replace(/(<head[^>]*>)/, `$1\n${headBlock}`)
  return html
}

function run() {
  const templatePath = path.join(DIST, "index.html")
  if (!fs.existsSync(templatePath)) {
    console.error(`[prerender] ERROR: ${templatePath} not found. Run vite build first.`)
    process.exit(1)
  }

  const template = fs.readFileSync(templatePath, "utf-8")
  const routes = buildAllRoutes()

  let emitted = 0
  const errors = []

  for (const route of routes) {
    try {
      const outPath = path.join(DIST, route.distPath)
      const outDir = path.dirname(outPath)

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true })
      }

      const html = injectHead(template, route)
      fs.writeFileSync(outPath, html, "utf-8")
      emitted++
      console.log(`[prerender] ✓ ${route.distPath}`)
    } catch (err) {
      errors.push({ route: route.distPath, err })
      console.error(`[prerender] ✗ ${route.distPath}:`, err.message)
    }
  }

  console.log(`\n[prerender] Done — ${emitted} files emitted, ${errors.length} errors.`)
  if (errors.length > 0) process.exit(1)
}

run()
