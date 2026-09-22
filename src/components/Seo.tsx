import { BUYING_GUIDES } from "@/content/buyingGuides"
import { getCommercialPageByPath } from "@/content/commercialPages"
import { Helmet } from "react-helmet-async"
import type { Project } from "@/data/projects"
import type { ServicePage } from "@/content/servicePages"
import type { Lang } from "@/i18n/lang"
import {
  BASE_URL,
  alternateLinks,
  buildGuideSchema,
  buildCommercialServiceSchema,
  DEFAULT_OG_IMAGE,
  PROJECT_SLUGS,
  buildBreadcrumbSchema,
  buildAboutPageSchema,
  buildCreativeWorkSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildServicesCatalogSchema,
  buildWebSiteSchema,
  homeLabel,
  projectsLabel,
  servicesLabel,
  type ProjectSlug,
} from "@/lib/seoMeta"

const OG_LOCALE: Record<Lang, string> = {
  ca: "ca_ES",
  en: "en_US",
  es: "es_ES",
}

type SeoProps = {
  title: string
  bare?: boolean
  description: string
  path: string
  lang: Lang
  image?: string
  type?: "website" | "article"
  noindex?: boolean
  isHome?: boolean
  isProjectsList?: boolean
  isServicesList?: boolean
  project?: Project
  service?: ServicePage
}

function isPublishedProjectSlug(slug: Project["slug"]): slug is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(slug)
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
  isServicesList = false,
  project,
  service,
}: SeoProps) {
  const fullTitle = bare ? title : `${title} | PALSEC AGCY`
  path = path.replace(/\/+$/, "") || "/"
  const canonicalUrl = `${BASE_URL}${path}`
  const commercial = getCommercialPageByPath(path)
  const ogImage = image ?? DEFAULT_OG_IMAGE
  const guide = BUYING_GUIDES.find(guide => guide.path === path)

  const organizationJson = isHome || path.endsWith("/about-us")
    ? JSON.stringify(buildOrganizationSchema())
    : null
  const websiteJson = isHome ? JSON.stringify(buildWebSiteSchema()) : null
  const aboutJson = path.endsWith("/about-us")
    ? JSON.stringify(buildAboutPageSchema(lang, canonicalUrl))
    : null

  let breadcrumbJson: string | null = null
  if (guide) {
    breadcrumbJson = JSON.stringify(buildBreadcrumbSchema([
      { name: homeLabel(lang), url: `${BASE_URL}/${lang}` },
      { name: servicesLabel(lang), url: `${BASE_URL}/${lang}/services` },
      { name: guide.title, url: canonicalUrl },
    ]))
  } else if (isProjectsList) {
    breadcrumbJson = JSON.stringify(buildBreadcrumbSchema([
      { name: homeLabel(lang), url: `${BASE_URL}/${lang}` },
      { name: projectsLabel(lang), url: canonicalUrl },
    ]))
  } else if (isServicesList) {
    breadcrumbJson = JSON.stringify(buildBreadcrumbSchema([
      { name: homeLabel(lang), url: `${BASE_URL}/${lang}` },
      { name: servicesLabel(lang), url: canonicalUrl },
    ]))
  } else if (commercial) {
    breadcrumbJson = JSON.stringify(buildBreadcrumbSchema([
      { name: homeLabel(lang), url: `${BASE_URL}/${lang}` },
      { name: servicesLabel(lang), url: `${BASE_URL}/${lang}/services` },
      { name: commercial.title, url: canonicalUrl },
    ]))
  } else if (service) {
    breadcrumbJson = JSON.stringify(buildBreadcrumbSchema([
      { name: homeLabel(lang), url: `${BASE_URL}/${lang}` },
      { name: servicesLabel(lang), url: `${BASE_URL}/${lang}/services` },
      { name: service.title, url: canonicalUrl },
    ]))
  } else if (project && isPublishedProjectSlug(project.slug)) {
    breadcrumbJson = JSON.stringify(buildBreadcrumbSchema([
      { name: homeLabel(lang), url: `${BASE_URL}/${lang}` },
      { name: projectsLabel(lang), url: `${BASE_URL}/${lang}/projects` },
      { name: project.title, url: canonicalUrl },
    ]))
  }

  const serviceJson = service
    ? JSON.stringify(buildServiceSchema({ serviceSlug: service.slug, lang, canonicalUrl }))
    : null
  const faqs = commercial?.faqs ?? service?.faqs
  const faqJson = faqs?.length ? JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${canonicalUrl}#faq`,
    mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  }) : null
  const servicesCatalogJson = isServicesList
    ? JSON.stringify(buildServicesCatalogSchema(lang, canonicalUrl))
    : null
  const creativeJson = project && isPublishedProjectSlug(project.slug)
    ? JSON.stringify(buildCreativeWorkSchema({ slug: project.slug, lang, canonicalUrl, description }))
    : null

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <link rel="canonical" href={canonicalUrl} />
      {alternateLinks(path).map(alternate => (
        <link key={alternate.lang} rel="alternate" hrefLang={alternate.lang} href={`${BASE_URL}${alternate.path}`} />
      ))}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${fullTitle} — PALSEC AGCY`} />
      <meta property="og:site_name" content="PALSEC AGCY" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {faqJson && <script type="application/ld+json">{faqJson}</script>}
      {guide && <script type="application/ld+json">{JSON.stringify(buildGuideSchema(guide))}</script>}
      {commercial && <script type="application/ld+json">{JSON.stringify(buildCommercialServiceSchema(commercial))}</script>}
      {organizationJson && <script type="application/ld+json">{organizationJson}</script>}
      {websiteJson && <script type="application/ld+json">{websiteJson}</script>}
      {aboutJson && <script type="application/ld+json">{aboutJson}</script>}
      {breadcrumbJson && <script type="application/ld+json">{breadcrumbJson}</script>}
      {serviceJson && <script type="application/ld+json">{serviceJson}</script>}
      {servicesCatalogJson && <script type="application/ld+json">{servicesCatalogJson}</script>}
      {creativeJson && <script type="application/ld+json">{creativeJson}</script>}
    </Helmet>
  )
}
