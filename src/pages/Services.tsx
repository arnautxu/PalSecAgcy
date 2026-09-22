import { Link, useLocation } from 'react-router-dom'
import { PageFrame } from '@/components/PageFrame'
import { SiteFooter } from '@/components/SiteFooter'
import { mailtoProjectInquiryHref } from '@/constants/contact'
import { useLang } from '@/i18n/useLang'
import { Seo } from '@/components/Seo'
import { getAllServicePages } from '@/content/servicePages'
import { getCommercialPages } from '@/content/commercialPages'
import { SITE_COPY } from '@/content/siteCopy'
import { SERVICES_META } from '@/lib/seoMeta'

export function Services() {
  const lang = useLang()
  const { pathname } = useLocation()
  const copy = SITE_COPY[lang]
  return <PageFrame>
    <Seo title={SERVICES_META[lang].title} bare description={SERVICES_META[lang].description} path={pathname} lang={lang} isServicesList />
    <div className="h-full overflow-y-auto px-5 pt-[108px] pb-20 normal-case md:px-8">
      <div className="mx-auto max-w-[1040px]">
        <h1 className="max-w-[820px] text-[32px] leading-[1.1] md:text-[52px]">{copy.hubTitle}</h1>
        <p className="mt-6 max-w-[800px] text-[16px] leading-[1.8] text-ink/75">{copy.hubIntro}</p>
        <a href={mailtoProjectInquiryHref(lang)} className="mt-5 inline-block text-[13px] underline underline-offset-4">{copy.cta} →</a>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {getCommercialPages(lang).map((service, index) => <Link key={service.id} to={service.path} className="border border-frame p-6 hover:border-ink">
            <span className="text-[11px] text-ink/65">0{index + 1}</span><h2 className="mt-4 text-[22px]">{service.label} →</h2><p className="mt-4 text-[14px] leading-[1.8] text-ink/70">{service.description}</p>
          </Link>)}
        </div>
        <section className="mt-14 border-t border-frame pt-8">
          <h2 className="text-[25px]">{copy.choose}</h2>
          <div className="mt-7 grid gap-8 md:grid-cols-2">{copy.choices.map(([title, body]) => <div key={title}><h3 className="text-[18px]">{title}</h3><p className="mt-3 text-[14px] leading-[1.85] text-ink/70">{body}</p></div>)}</div>
        </section>
        {[[copy.disciplines, copy.disciplinesBody], [copy.scope, copy.scopeBody], [copy.local, copy.localBody]].map(([title, body]) => <section key={title} className="mt-12 border-t border-frame pt-7"><h2 className="text-[23px]">{title}</h2><p className="mt-4 max-w-[840px] text-[14px] leading-[1.85] text-ink/70">{body}</p></section>)}
        <section className="mt-12 border-t border-frame pt-7"><h2 className="text-[23px]">{copy.established}</h2><nav className="mt-5 flex flex-wrap gap-5">{getAllServicePages(lang).map(service => <Link key={service.slug} to={`/${lang}/services/${service.slug}`} className="text-[13px] underline underline-offset-4">{service.title}</Link>)}</nav></section>
        <Link to={`/${lang}/projects`} className="mt-8 inline-block text-[13px] underline underline-offset-4">{copy.allProjects}</Link>
        <a href={mailtoProjectInquiryHref(lang)} className="mt-10 block text-[26px] underline underline-offset-8">{copy.cta} →</a>
        <SiteFooter />
      </div>
    </div>
  </PageFrame>
}
