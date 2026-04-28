import { Helmet } from "react-helmet-async"
import type { Lang } from "@/i18n/lang"

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
}: SeoProps) {
  const fullTitle = bare ? title : `${title} | PALSEC AGCY`
  const canonicalUrl = `${BASE_URL}${path}`
  const ogImage = image ?? DEFAULT_OG_IMAGE

  const langs: Lang[] = ["ca", "en", "es"]

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
    </Helmet>
  )
}
