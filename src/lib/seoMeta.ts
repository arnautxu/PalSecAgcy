/**
 * Pure metadata generation — no React, no browser APIs.
 * Used by both the client-side <Seo> component (via Seo.tsx)
 * and the postbuild prerender script (scripts/prerender.mjs).
 */

import { getAllServicePages, type ServiceSlug } from "../content/servicePages"

export type Lang = "en" | "ca" | "es"

export const LANGS: readonly Lang[] = ["ca", "en", "es"] as const

export const BASE_URL = "https://www.palsec.agency"
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og/palsec-og.png`

// ─── Page slugs that have a detail page ──────────────────────────────────────
export const PROJECT_SLUGS = [
  "vira",
  "arkuos",
  "galeon",
  "el-xiringuito",
  "enteza",
  "gent-gran-de-calonge-i-sant-antoni",
  "logoteca",
] as const

export type ProjectSlug = (typeof PROJECT_SLUGS)[number]

export function isPublishedProjectSlug(slug: string): slug is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(slug)
}

// ─── Localised titles & descriptions per page ────────────────────────────────

type PageMeta = { title: string; description: string }

export const HOME_META: Record<Lang, PageMeta> = {
  en: {
    title: "Strategic Design Agency in Girona & Costa Brava | PALSEC",
    description:
      "Palsec Agcy is a strategic design studio in Costa Brava serving Girona and global teams across brand strategy, branding, web design, and visual systems.",
  },
  ca: {
    title: "Agència de disseny a Girona i Costa Brava | PALSEC",
    description:
      "Palsec Agcy és un estudi de disseny de la Costa Brava que treballa a Girona i globalment en estratègia de marca, branding, disseny web i sistemes visuals.",
  },
  es: {
    title: "Agencia de diseño en Girona y Costa Brava | PALSEC",
    description:
      "Palsec Agcy es un estudio de diseño de la Costa Brava que trabaja en Girona y globalmente en estrategia de marca, branding, diseño web y sistemas visuales.",
  },
}

export const PROJECTS_META: Record<Lang, PageMeta> = {
  en: {
    title: "Branding, Web & UX/UI Projects | PALSEC AGCY",
    description:
      "Selected projects by Palsec Agcy: branding, digital product design, and visual systems. Each project built with precision and strategic intent.",
  },
  ca: {
    title: "Projectes de branding, web i UX/UI | PALSEC AGCY",
    description:
      "Projectes seleccionats de Palsec Agcy: branding, disseny de producte digital i sistemes visuals. Cada projecte construït amb precisió i intenció estratègica.",
  },
  es: {
    title: "Proyectos de branding, web y UX/UI | PALSEC AGCY",
    description:
      "Proyectos de Palsec Agcy: branding, producto digital y sistemas visuales desarrollados con precisión, coherencia e intención estratégica.",
  },
}

export const SERVICES_META: Record<Lang, PageMeta> = {
  en: {
    title: "Strategic Design Agency Services | PALSEC AGCY",
    description:
      "Palsec Agcy services: brand strategy, branding, web design, motion graphics, and creative direction. From definition to execution.",
  },
  ca: {
    title: "Serveis d'agència de disseny | PALSEC AGCY",
    description:
      "Agència de disseny estratègic a la Costa Brava: branding, identitat visual, disseny web, motion graphics i direcció creativa.",
  },
  es: {
    title: "Servicios de agencia de diseño | PALSEC AGCY",
    description:
      "Servicios de Palsec Agcy: estrategia de marca, branding, diseño web, motion graphics y dirección creativa. De la definición a la ejecución.",
  },
}

export const ABOUT_META: Record<Lang, PageMeta> = {
  en: {
    title: "Strategic Design Studio in Costa Brava | PALSEC AGCY",
    description:
      "Palsec Agcy is a design-led studio based in Costa Brava, working globally on brand strategy, digital products, and visual systems.",
  },
  ca: {
    title: "Estudi de disseny a la Costa Brava | PALSEC AGCY",
    description:
      "Palsec Agcy és un estudi de disseny a la Costa Brava que treballa globalment en estratègia de marca, productes digitals i sistemes visuals.",
  },
  es: {
    title: "Estudio de diseño en Costa Brava | PALSEC AGCY",
    description:
      "Palsec Agcy es un estudio de diseño en la Costa Brava que trabaja globalmente en estrategia de marca, productos digitales y sistemas visuales.",
  },
}

export const ABOUT_TEAM_COPY: Record<Lang, string> = {
  ca: "PALSEC AGCY es va fundar el 2025. L'equip públic de l'estudi està format per Arnau Piñol Olabegoya i Guillem Ferrando Codina.",
  en: "PALSEC AGCY was founded in 2025. The studio's public team includes Arnau Piñol Olabegoya and Guillem Ferrando Codina.",
  es: "PALSEC AGCY se fundó en 2025. El equipo público del estudio está formado por Arnau Piñol Olabegoya y Guillem Ferrando Codina.",
}

export const ABOUT_APPROACH = {
  ca: {
    approach: "COM TREBALLEM",
    body: "Connectem estratègia, identitat i producte digital perquè cada decisió formi part del mateix sistema. Comencem pel context i els objectius, definim criteris compartits i desenvolupem les aplicacions necessàries per executar amb coherència.",
    principles: ["Context abans que forma", "Sistemes abans que peces aïllades", "Claredat per decidir i executar"],
    follow: "TROBA'NS",
    legal: "AVÍS LEGAL",
    privacy: "PRIVACITAT",
  },
  en: {
    approach: "HOW WE WORK",
    body: "We connect strategy, identity, and digital product so every decision belongs to the same system. We begin with context and objectives, define shared criteria, and develop the applications needed for coherent execution.",
    principles: ["Context before form", "Systems before isolated assets", "Clarity to decide and execute"],
    follow: "FIND US",
    legal: "LEGAL NOTICE",
    privacy: "PRIVACY",
  },
  es: {
    approach: "CÓMO TRABAJAMOS",
    body: "Conectamos estrategia, identidad y producto digital para que cada decisión forme parte del mismo sistema. Empezamos por el contexto y los objetivos, definimos criterios compartidos y desarrollamos las aplicaciones necesarias para ejecutar con coherencia.",
    principles: ["Contexto antes que forma", "Sistemas antes que piezas aisladas", "Claridad para decidir y ejecutar"],
    follow: "ENCUÉNTRANOS",
    legal: "AVISO LEGAL",
    privacy: "PRIVACIDAD",
  },
} as const

export const LEGAL_META: Record<"privacy" | "legal-notice", Record<Lang, PageMeta>> = {
  privacy: {
    ca: { title: "Política de privacitat i dades | PALSEC AGCY", description: "Consulta com PALSEC AGCY tracta les dades personals, gestiona el consentiment d'analítica i permet exercir els drets de privacitat al web." },
    en: { title: "Privacy and Data Policy | PALSEC AGCY", description: "Learn how PALSEC AGCY processes personal data, manages analytics consent, retains information, and supports privacy rights on this website." },
    es: { title: "Política de privacidad y datos | PALSEC AGCY", description: "Consulta cómo PALSEC AGCY trata los datos personales, gestiona el consentimiento de analítica y permite ejercer los derechos de privacidad en la web." },
  },
  "legal-notice": {
    ca: { title: "Avís legal i condicions d'ús | PALSEC AGCY", description: "Consulta la titularitat, les condicions d'ús, la propietat intel·lectual, els enllaços externs i les vies de contacte del web de PALSEC AGCY." },
    en: { title: "Legal Notice and Website Terms | PALSEC AGCY", description: "Review the website ownership, terms of use, intellectual property, external link policy, responsibilities, and contact details for PALSEC AGCY." },
    es: { title: "Aviso legal y condiciones de uso | PALSEC AGCY", description: "Consulta la titularidad, las condiciones de uso, la propiedad intelectual, los enlaces externos y las vías de contacto de la web de PALSEC AGCY." },
  },
}

// ─── Project copy (first body paragraph → SEO description) ───────────────────
// Matches the copy functions in ProjectDetail.tsx — only first para used for desc.

export const PROJECT_META: Record<
  ProjectSlug,
  {
    displayTitle: string
    firstImage: string | null // relative public path
    descriptions: Record<Lang, string>
    client: string
    year: string
  }
> = {
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
}

const PROJECT_SEO: Record<ProjectSlug, Record<Lang, PageMeta>> = {
  vira: {
    ca: { title: "VIRA — UX/UI i identitat per a una app TDAH | PALSEC", description: "Cas VIRA: disseny UX/UI, identitat i sistema visual per a una aplicació que transforma hàbits i regulació emocional en microaccions clares." },
    en: { title: "VIRA — ADHD App UX/UI & Identity | PALSEC", description: "VIRA case study: UX/UI, identity, and a visual system for an app that turns habits and emotional regulation into clear, approachable micro-actions." },
    es: { title: "VIRA — UX/UI e identidad para una app TDAH | PALSEC", description: "Caso VIRA: diseño UX/UI, identidad y sistema visual para una app que convierte hábitos y regulación emocional en microacciones claras y cercanas." },
  },
  arkuos: {
    ca: { title: "ARKUOS — Identitat per a un espai educatiu | PALSEC", description: "Cas ARKUOS: aplicació de marca, sistema visual i peces de comunicació per a un espai socioeducatiu de creació, experimentació i aprenentatge." },
    en: { title: "ARKUOS — Identity for a Creative Learning Space | PALSEC", description: "ARKUOS case study: brand application, visual system, and communication assets for a socio-educational space focused on making and learning." },
    es: { title: "ARKUOS — Identidad para un espacio educativo | PALSEC", description: "Caso ARKUOS: aplicación de marca, sistema visual y piezas de comunicación para un espacio socioeducativo de creación, experimentación y aprendizaje." },
  },
  galeon: {
    ca: { title: "GALEÓN — UX/UI per explorar patrimoni | PALSEC", description: "Cas GALEÓN: disseny de producte, UX/UI i narrativa visual per explorar edificis, espais naturals i col·leccions històriques de Patrimonio Nacional." },
    en: { title: "GALEÓN — Heritage Product Design & UX/UI | PALSEC", description: "GALEÓN case study: product design, UX/UI, and visual storytelling for exploring historic buildings, natural spaces, and the Royal Collections." },
    es: { title: "GALEÓN — UX/UI para explorar patrimonio | PALSEC", description: "Caso GALEÓN: diseño de producto, UX/UI y narrativa visual para explorar edificios, espacios naturales y colecciones históricas de Patrimonio Nacional." },
  },
  "el-xiringuito": {
    ca: { title: "EL XIRINGUITO — Branding mediterrani | PALSEC", description: "Cas El Xiringuito: identitat, sistema gràfic, menús, senyalística i peces digitals per a un restaurant de costa amb una expressió mediterrània coherent." },
    en: { title: "EL XIRINGUITO — Mediterranean Restaurant Branding | PALSEC", description: "El Xiringuito case study: identity, graphic system, menus, signage, and digital assets for a coastal restaurant with a coherent Mediterranean expression." },
    es: { title: "EL XIRINGUITO — Branding mediterráneo | PALSEC", description: "Caso El Xiringuito: identidad, sistema gráfico, menús, señalética y piezas digitales para un restaurante de costa con una expresión mediterránea coherente." },
  },
  enteza: {
    ca: { title: "ENTEZA — Branding per a esdeveniments | PALSEC", description: "Cas ENTEZA: identitat, sistema de catàleg, disseny digital i presentació de producte per a una marca de lloguer de mobiliari i parament per a esdeveniments." },
    en: { title: "ENTEZA — Event Rental Brand System | PALSEC", description: "ENTEZA case study: identity, catalogue structure, digital design, and product presentation for an event furniture and tableware rental brand." },
    es: { title: "ENTEZA — Branding para eventos | PALSEC", description: "Caso ENTEZA: identidad, sistema de catálogo, diseño digital y presentación de producto para una marca de alquiler de mobiliario y menaje para eventos." },
  },
  "gent-gran-de-calonge-i-sant-antoni": {
    ca: { title: "GENT GRAN — Identitat pública accessible | PALSEC", description: "Cas Gent Gran de Calonge i Sant Antoni: identitat i sistema de comunicació accessible per donar cohesió a activitats municipals adreçades a persones grans." },
    en: { title: "GENT GRAN — Accessible Public Identity | PALSEC", description: "Gent Gran de Calonge i Sant Antoni case study: an accessible identity and communication system for municipal activities created for older adults." },
    es: { title: "GENT GRAN — Identidad pública accesible | PALSEC", description: "Caso Gent Gran de Calonge i Sant Antoni: identidad y sistema de comunicación accesible para cohesionar actividades municipales dirigidas a personas mayores." },
  },
  logoteca: {
    ca: { title: "LOGOTECA — Disseny de logotips i marques | PALSEC", description: "Logoteca de PALSEC AGCY: una selecció de dissenys de logotip que explora tipografia, símbol, proporció i contrast per crear identitats recognoscibles." },
    en: { title: "LOGOTECA — Logo & Brand System Design | PALSEC", description: "PALSEC AGCY Logoteca: selected logo design work exploring typography, symbol, proportion, and contrast to build recognizable brand identities." },
    es: { title: "LOGOTECA — Diseño de logotipos y marcas | PALSEC", description: "Logoteca de PALSEC AGCY: una selección de diseños de logotipo que explora tipografía, símbolo, proporción y contraste para crear identidades reconocibles." },
  },
}

const PROJECT_PRIMARY_SERVICE: Record<ProjectSlug, ServiceSlug> = {
  vira: "web-design-digital-products",
  arkuos: "branding-visual-identity",
  galeon: "web-design-digital-products",
  "el-xiringuito": "branding-visual-identity",
  enteza: "branding-visual-identity",
  "gent-gran-de-calonge-i-sant-antoni": "branding-visual-identity",
  logoteca: "branding-visual-identity",
}

export function getProjectSeoMeta(slug: ProjectSlug, lang: Lang): PageMeta {
  return PROJECT_SEO[slug][lang]
}

export function getProjectPrimaryServiceSlug(slug: ProjectSlug): ServiceSlug {
  return PROJECT_PRIMARY_SERVICE[slug]
}

// ─── Route descriptor ─────────────────────────────────────────────────────────

export type RouteKind = "home" | "services" | "service" | "projects" | "about-us" | "privacy" | "legal-notice" | "project"

export interface RouteMeta {
  /** URL path, e.g. /ca/services */
  path: string
  /** dist/ output path, e.g. ca/services/index.html */
  distPath: string
  lang: Lang
  kind: RouteKind
  slug?: ProjectSlug
  serviceSlug?: ServiceSlug
  title: string
  description: string
  canonicalUrl: string
  /** First image for OG / JSON-LD */
  ogImage: string
}

export function swapLang(path: string, newLang: Lang): string {
  const parts = path.split("/").filter(Boolean)
  if (parts.length === 0) return `/${newLang}`
  parts[0] = newLang
  return `/${parts.join("/")}`
}

export function buildAllRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = []

  for (const lang of LANGS) {
    // Home
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

    for (const service of getAllServicePages(lang)) {
      routes.push({
        path: `/${lang}/services/${service.slug}`,
        distPath: `${lang}/services/${service.slug}/index.html`,
        lang,
        kind: "service",
        serviceSlug: service.slug,
        title: service.seoTitle,
        description: service.description,
        canonicalUrl: `${BASE_URL}/${lang}/services/${service.slug}`,
        ogImage: DEFAULT_OG_IMAGE,
      })
    }

    // Services
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
      path: `/${lang}/privacy`,
      distPath: `${lang}/privacy/index.html`,
      lang,
      kind: "privacy",
      title: LEGAL_META.privacy[lang].title,
      description: LEGAL_META.privacy[lang].description,
      canonicalUrl: `${BASE_URL}/${lang}/privacy`,
      ogImage: DEFAULT_OG_IMAGE,
    })

    routes.push({
      path: `/${lang}/legal-notice`,
      distPath: `${lang}/legal-notice/index.html`,
      lang,
      kind: "legal-notice",
      title: LEGAL_META["legal-notice"][lang].title,
      description: LEGAL_META["legal-notice"][lang].description,
      canonicalUrl: `${BASE_URL}/${lang}/legal-notice`,
      ogImage: DEFAULT_OG_IMAGE,
    })

    // Projects list
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

    // About
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

    // Projects
    for (const slug of PROJECT_SLUGS) {
      const meta = PROJECT_META[slug]
      const seo = getProjectSeoMeta(slug, lang)
      const ogImage = meta.firstImage ? `${BASE_URL}${meta.firstImage}` : DEFAULT_OG_IMAGE
      routes.push({
        path: `/${lang}/project/${slug}`,
        distPath: `${lang}/project/${slug}/index.html`,
        lang,
        kind: "project",
        slug,
        title: seo.title,
        description: seo.description,
        canonicalUrl: `${BASE_URL}/${lang}/project/${slug}`,
        ogImage,
      })
    }
  }

  return routes
}

// ─── JSON-LD builders (plain objects, no React) ───────────────────────────────

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "PALSEC AGCY",
    alternateName: ["Palsec Agency", "Palsec Agència de Disseny"],
    url: `${BASE_URL}/`,
    description: "Strategic design studio based in Costa Brava, working across brand strategy, branding, web design, digital products, motion graphics, and creative direction.",
    foundingDate: "2025",
    email: "info@palsec.agency",
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: `${BASE_URL}/brand/palsec-positive.jpg`,
      contentUrl: `${BASE_URL}/brand/palsec-positive.jpg`,
      width: 1722,
      height: 705,
    },
    sameAs: [
      "https://www.linkedin.com/company/palsec-agency",
      "https://www.instagram.com/palsec.agency/",
    ],
    member: [
      {
        "@type": "Person",
        name: "Arnau Piñol Olabegoya",
        sameAs: "https://es.linkedin.com/in/arnau-pi%C3%B1ol-olabegoya-722329158",
      },
      {
        "@type": "Person",
        name: "Guillem Ferrando Codina",
      },
    ],
    areaServed: ["Girona, Spain", "Costa Brava, Spain", "Worldwide"],
    knowsAbout: ["Brand strategy", "Branding and visual identity", "Web design", "Digital product design", "UX/UI design", "Motion graphics", "Creative direction"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "project enquiries",
      email: "info@palsec.agency",
      availableLanguage: ["ca", "en", "es"],
    },
  }
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "PALSEC AGCY",
    alternateName: "Palsec Agency",
    url: `${BASE_URL}/`,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: ["ca", "en", "es"],
  }
}

export function buildAboutPageSchema(lang: Lang, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: ABOUT_META[lang].title,
    description: ABOUT_META[lang].description,
    inLanguage: lang,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
  }
}

export function buildServiceSchema(opts: {
  serviceSlug: ServiceSlug
  lang: Lang
  canonicalUrl: string
}) {
  const service = getAllServicePages(opts.lang).find((item) => item.slug === opts.serviceSlug)!
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${opts.canonicalUrl}#webpage`,
        url: opts.canonicalUrl,
        name: service.seoTitle,
        description: service.description,
        inLanguage: opts.lang,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${opts.canonicalUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${opts.canonicalUrl}#service`,
        name: service.title,
        description: service.description,
        url: opts.canonicalUrl,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: ["Girona, Spain", "Costa Brava, Spain", "Worldwide"],
        serviceType: service.title,
      },
    ],
  }
}

export function buildServicesCatalogSchema(lang: Lang, canonicalUrl: string) {
  const services = getAllServicePages(lang)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: SERVICES_META[lang].title,
        description: SERVICES_META[lang].description,
        inLanguage: lang,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: { "@id": `${canonicalUrl}#catalog` },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${canonicalUrl}#catalog`,
        name: servicesLabel(lang),
        itemListElement: services.map((service) => ({
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${BASE_URL}/${lang}/services/${service.slug}`,
          provider: { "@id": `${BASE_URL}/#organization` },
        })),
      },
    ],
  }
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildCreativeWorkSchema(opts: {
  slug: ProjectSlug
  lang: Lang
  canonicalUrl: string
  description: string
}) {
  const { slug, lang, canonicalUrl, description } = opts
  const meta = PROJECT_META[slug]
  const seo = getProjectSeoMeta(slug, lang)
  const image = meta.firstImage ? `${BASE_URL}${meta.firstImage}` : DEFAULT_OG_IMAGE
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description,
        inLanguage: lang,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: { "@id": `${canonicalUrl}#work` },
      },
      {
        "@type": ["CreativeWork", "VisualArtwork"],
        "@id": `${canonicalUrl}#work`,
        name: meta.displayTitle,
        url: canonicalUrl,
        image,
        description,
        inLanguage: lang,
        creator: { "@id": `${BASE_URL}/#organization` },
        dateCreated: meta.year,
      },
    ],
  }
}

export function homeLabel(lang: Lang): string {
  return lang === "ca" ? "Inici" : lang === "es" ? "Inicio" : "Home"
}

export function projectsLabel(lang: Lang): string {
  return lang === "ca" ? "Projectes" : lang === "es" ? "Proyectos" : "Projects"
}

export function servicesLabel(lang: Lang): string {
  return lang === "ca" ? "Serveis" : lang === "es" ? "Servicios" : "Services"
}
