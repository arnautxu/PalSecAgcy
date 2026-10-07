import { Link, useLocation } from 'react-router-dom'
import { PageFrame } from '@/components/PageFrame'
import { SiteFooter } from '@/components/SiteFooter'
import { Arrow, Disclosure, Reveal } from '@/components/Editorial'
import { mailtoProjectInquiryHref } from '@/constants/contact'
import { useLang } from '@/i18n/useLang'
import { Seo } from '@/components/Seo'
import { commercialNavLabel, getCommercialSummaries as getCommercialPages, getServiceSummaries as getAllServicePages } from '@/content/serviceCatalog'
import { SITE_COPY } from '@/content/siteCopy'
import { EDITORIAL } from '@/content/editorialCopy'
import { SERVICES_META } from '@/lib/seoMeta'

export function Services() {
  const lang = useLang()
  const { pathname } = useLocation()
  const copy = SITE_COPY[lang]
  const editorial = EDITORIAL[lang]
  return <PageFrame>
    <Seo title={SERVICES_META[lang].title} bare description={SERVICES_META[lang].description} path={pathname} lang={lang} isServicesList />
    <div className="editorial-scroll"><div className="editorial-wrap">
      <header className="editorial-split pb-16 md:pb-24"><div><span className="editorial-eyebrow">PALSEC / {editorial.scope}</span><h1 className="editorial-title whitespace-pre-line">{editorial.services}</h1></div><p className="editorial-lead self-end">{editorial.intro}</p></header>
      <Reveal>{getCommercialPages(lang).map((service, index) => <Link key={service.id} to={service.path} className="editorial-service-row"><span className="text-[11px] opacity-50">0{index + 1}</span><div><h2>{commercialNavLabel(lang, service.id)}</h2><p>{editorial.shortServices[{ branding: 0, "web-design": 1, "web-development": 2, "graphic-design": 3 }[service.id]]}</p></div><Arrow /></Link>)}</Reveal>
      <Reveal className="editorial-section editorial-split"><div><span className="editorial-eyebrow">{copy.established}</span><h2 className="editorial-heading whitespace-pre-line">{editorial.process}</h2></div><div>{getAllServicePages(lang).map(service => <Link key={service.slug} to={`/${lang}/services/${service.slug}`} className="flex min-h-16 items-center justify-between gap-4 py-4 text-[19px]">{service.title}<Arrow /></Link>)}</div></Reveal>
      <section className="editorial-section editorial-split"><h2 className="editorial-heading">{copy.choose}</h2><div>{copy.choices.map(([title, body]) => <Disclosure key={title} title={title}><p>{body}</p></Disclosure>)}<Disclosure title={copy.scope}><p>{copy.scopeBody}</p></Disclosure></div></section>
      <section className="editorial-section"><h2 className="editorial-title">{editorial.contact}</h2><a href={mailtoProjectInquiryHref(lang)} className="editorial-cta mt-8">{editorial.cta}<Arrow /></a></section>
      <SiteFooter />
    </div></div>
  </PageFrame>
}
