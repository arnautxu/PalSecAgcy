/**
 * Pure metadata generation — no React, no browser APIs.
 * Used by both the client-side <Seo> component (via Seo.tsx)
 * and the postbuild prerender script (scripts/prerender.mjs).
 */

export type Lang = "en" | "ca" | "es"

export const LANGS: readonly Lang[] = ["ca", "en", "es"] as const

export const BASE_URL = "https://www.palsec.agency"
export const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.svg`

// ─── Page slugs that have a detail page ──────────────────────────────────────
export const PROJECT_SLUGS = [
  "vira",
  "arkuos",
  "galeon",
  "el-xiringuito",
  "enteza",
  "gent-gran-de-calonge-i-sant-antoni",
  "logoteca",
  // cms is comingSoon (no slides) → redirects to /projects at runtime.
  // We still emit a static head for it so crawlers get something.
  "cms",
  "estudi-dental-carrera",
] as const

export type ProjectSlug = (typeof PROJECT_SLUGS)[number]

// ─── Localised titles & descriptions per page ────────────────────────────────

type PageMeta = { title: string; description: string }

export const HOME_META: Record<Lang, PageMeta> = {
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

export const PROJECTS_META: Record<Lang, PageMeta> = {
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

export const SERVICES_META: Record<Lang, PageMeta> = {
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

export const ABOUT_META: Record<Lang, PageMeta> = {
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
  cms: {
    displayTitle: "PALSEC AI LAB",
    firstImage: "/media/projects/ai-lab/thumb.jpg",
    descriptions: {
      en: "BON DIA VEÏNAT IS A CIVIC PROJECT FOR THE AJUNTAMENT DE BARCELONA DESIGNED TO IMPROVE COOPERATION BETWEEN NEIGHBORS.",
      ca: "BON DIA VEÏNAT ÉS UN PROJECTE CÍVIC PER A L'AJUNTAMENT DE BARCELONA PENSAT PER MILLORAR LA COOPERACIÓ ENTRE VEÏNS.",
      es: "BON DIA VEÏNAT ES UN PROYECTO CÍVICO PARA EL AJUNTAMENT DE BARCELONA PENSADO PARA MEJORAR LA COOPERACIÓN ENTRE VECINOS.",
    },
    client: "AJUNTAMENT DE BARCELONA",
    year: "2026",
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

// ─── Route descriptor ─────────────────────────────────────────────────────────

export type RouteKind = "home" | "services" | "projects" | "about-us" | "project"

export interface RouteMeta {
  /** URL path, e.g. /ca/services */
  path: string
  /** dist/ output path, e.g. ca/services/index.html */
  distPath: string
  lang: Lang
  kind: RouteKind
  slug?: ProjectSlug
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
      const desc = meta.descriptions[lang]
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
      })
    }
  }

  return routes
}

// ─── JSON-LD builders (plain objects, no React) ───────────────────────────────

export function buildOrganizationSchema() {
  // TODO: add real sameAs once social profiles confirmed
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PALSEC AGCY",
    url: BASE_URL,
    email: "info@palsec.agency",
    logo: `${BASE_URL}/favicon.svg`,
    sameAs: [] as string[],
  }
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PALSEC AGCY",
    url: BASE_URL,
    inLanguage: ["ca", "en", "es"],
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
  const image = meta.firstImage ? `${BASE_URL}${meta.firstImage}` : DEFAULT_OG_IMAGE
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: meta.displayTitle,
    url: canonicalUrl,
    image,
    description,
    inLanguage: lang,
    creator: {
      "@type": "Organization",
      name: "PALSEC AGCY",
    },
    sourceOrganization: {
      "@type": "Organization",
      name: meta.client,
    },
    dateCreated: meta.year,
  }
}

export function homeLabel(lang: Lang): string {
  return lang === "ca" ? "Inici" : lang === "es" ? "Inicio" : "Home"
}

export function projectsLabel(lang: Lang): string {
  return lang === "ca" ? "Projectes" : lang === "es" ? "Proyectos" : "Projects"
}
