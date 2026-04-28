import { Helmet } from "react-helmet-async"
import type { Lang } from "@/i18n/lang"
import type { Project } from "@/data/projects"

const BASE_URL = "https://www.palsec.agency"

// TODO: Replace with real per-page OG images once they are created.
const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.svg`

const OG_LOCALE: Record<Lang, string> = {
  ca: "ca_ES",
  en: "en_US",
  es: "es_ES",
}

/** Replace the first path segment (lang code) with the given lang */
function swapLang(path: string, newLang: Lang): string {
  // path is like /ca/services or /ca or /ca/project/slug
  const parts = path.split("/").filter(Boolean)
  if (parts.length === 0) return `/${newLang}`
  parts[0] = newLang
  return `/${parts.join("/")}`
}

// ─── JSON-LD helpers ────────────────────────────────────────────────────────

function organizationSchema() {
  // TODO: add real sameAs entries once social profiles are confirmed
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

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PALSEC AGCY",
    url: BASE_URL,
    inLanguage: ["ca", "en", "es"],
  }
}

function breadcrumbSchema(items: { name: string; url: string }[]) {
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

function creativeWorkSchema(opts: {
  project: Project
  lang: Lang
  canonicalUrl: string
  description: string
}) {
  const { project, lang, canonicalUrl, description } = opts
  const firstSlide = project.localImages?.slides?.[0]
  const image = firstSlide ? `${BASE_URL}${firstSlide}` : `${BASE_URL}/favicon.svg`

  // Pull client + year from INDEX_ROWS if needed — but Project type doesn't carry them.
  // We rely on the INDEX_ROWS import to look up client/year by slug.
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: project.title,
    url: canonicalUrl,
    image,
    description,
    inLanguage: lang,
    creator: {
      "@type": "Organization",
      name: "PALSEC AGCY",
    },
  }
}

// ─── Props ──────────────────────────────────────────────────────────────────

type SeoProps = {
  /** Page title — will be rendered as "{title} | PALSEC AGCY" unless `bare` is true */
  title: string
  /** Set true on Home to avoid the suffix */
  bare?: boolean
  description: string
  /** The canonical path including lang prefix, e.g. /ca/services */
  path: string
  lang: Lang
  /** og:image — absolute URL. Falls back to DEFAULT_OG_IMAGE */
  image?: string
  /** og:type — defaults to "website" */
  type?: "website" | "article"
  /** When true, adds <meta name="robots" content="noindex"> */
  noindex?: boolean
  /** Set true on home page to emit WebSite schema */
  isHome?: boolean
  /** Set true on projects list page to emit breadcrumb */
  isProjectsList?: boolean
  /** Supply on project detail pages for CreativeWork + breadcrumb */
  project?: Project
}

export function Seo({
  title,
  bare = false,
  description,
  path,
  lang,
  image,
  type = "website",
  noindex = false,
  isHome = false,
  isProjectsList = false,
  project,
}: SeoProps) {
  const fullTitle = bare ? title : `${title} | PALSEC AGCY`
  const canonicalUrl = `${BASE_URL}${path}`
  const ogImage = image ?? DEFAULT_OG_IMAGE

  const langs: Lang[] = ["ca", "en", "es"]

  // ── Breadcrumb labels per lang ─────────────────────────────────────────
  const homeLabel = lang === "ca" ? "Inici" : lang === "es" ? "Inicio" : "Home"
  const projectsLabel = lang === "ca" ? "Projectes" : lang === "es" ? "Proyectos" : "Projects"

  // ── Build JSON-LD blocks ───────────────────────────────────────────────
  const orgJson = JSON.stringify(organizationSchema())

  const webSiteJson = isHome ? JSON.stringify(webSiteSchema()) : null

  let breadcrumbJson: string | null = null
  if (isProjectsList) {
    breadcrumbJson = JSON.stringify(
      breadcrumbSchema([
        { name: homeLabel, url: `${BASE_URL}/${lang}` },
        { name: projectsLabel, url: canonicalUrl },
      ]),
    )
  } else if (project) {
    breadcrumbJson = JSON.stringify(
      breadcrumbSchema([
        { name: homeLabel, url: `${BASE_URL}/${lang}` },
        { name: projectsLabel, url: `${BASE_URL}/${lang}/projects` },
        { name: project.title, url: canonicalUrl },
      ]),
    )
  }

  const creativeJson =
    project
      ? JSON.stringify(
          creativeWorkSchema({ project, lang, canonicalUrl, description }),
        )
      : null

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang alternates — x-default points to EN equivalent */}
      {langs.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}${swapLang(path, l)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${swapLang(path, "en")}`}
      />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="PALSEC AGCY" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD: Organization (always) */}
      <script type="application/ld+json">{orgJson}</script>

      {/* JSON-LD: WebSite (home only) */}
      {webSiteJson && (
        <script type="application/ld+json">{webSiteJson}</script>
      )}

      {/* JSON-LD: BreadcrumbList */}
      {breadcrumbJson && (
        <script type="application/ld+json">{breadcrumbJson}</script>
      )}

      {/* JSON-LD: CreativeWork/VisualArtwork (project detail only) */}
      {creativeJson && (
        <script type="application/ld+json">{creativeJson}</script>
      )}
    </Helmet>
  )
}
