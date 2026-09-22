import { Link, useLocation, useParams } from 'react-router-dom'
import { PageFrame } from '@/components/PageFrame'
import { Seo } from '@/components/Seo'
import { SiteFooter } from '@/components/SiteFooter'
import { getBuyingGuides, getBuyingGuide } from '@/content/buyingGuides'
import { getCommercialPage } from '@/content/commercialPages'
import { useInquiry } from '@/components/Inquiry'
import { NotFound } from '@/pages/NotFound'

const COPY = {
  ca: { home: 'Inici', route: 'Fil d’Ariadna', guide: 'Guia per preparar el teu projecte', related: 'Serveis relacionats', more: 'Continua preparant el teu projecte', audit: 'Demana l’auditoria gratuïta', quote: 'Demana pressupost', all: 'Tots els articles', branding: 'Branding', web: 'Webs a mida', apps: 'Aplicacions' },
  es: { home: 'Inicio', route: 'Ruta de navegación', guide: 'Guía para preparar tu proyecto', related: 'Servicios relacionados', more: 'Sigue preparando tu proyecto', audit: 'Pide la auditoría gratuita', quote: 'Pide presupuesto', all: 'Todos los artículos', branding: 'Branding', web: 'Webs a medida', apps: 'Aplicaciones' },
} as const

export function BuyingGuide() {
  const { guideSlug, lang } = useParams()
  const { pathname } = useLocation()
  const openInquiry = useInquiry()
  if (lang !== 'ca' && lang !== 'es') return <NotFound />
  const guide = guideSlug ? getBuyingGuide(guideSlug, lang) : undefined
  if (!guide || pathname !== guide.path) return <NotFound />
  const copy = COPY[lang]
  const related = getBuyingGuides(lang).filter(item => item.id !== guide.id).sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category)).slice(0, 4)
  const published = new Intl.DateTimeFormat(lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${guide.publishedAt}T00:00:00Z`))

  return <PageFrame>
    <Seo title={guide.seoTitle} bare description={guide.description} path={guide.path} lang={lang} type="article" />
    <div className="h-full overflow-y-auto px-5 pb-16 pt-[108px] normal-case md:px-8">
      <div className="mx-auto max-w-[1040px]">
        <nav aria-label={copy.route} className="mb-8 flex flex-wrap gap-x-3 gap-y-2 text-[12px] text-ink/60"><Link to={`/${lang}`} className="underline underline-offset-4">{copy.home}</Link><span aria-hidden="true">/</span><Link to={`/${lang}/blog`} className="underline underline-offset-4">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{copy[guide.category]}</span></nav>
        <article className="max-w-[820px]">
          <header>
            <p className="mb-4 text-[12px] uppercase tracking-nav text-ink/65">{copy.guide} · {copy[guide.category]}</p>
            <p className="mb-4 text-[12px] text-ink/70">PALSEC AGCY · <time dateTime={guide.publishedAt}>{published}</time></p>
            <h1 className="text-[32px] font-normal leading-[1.12] tracking-[-0.025em] md:text-[48px]">{guide.title}</h1>
            <p className="mt-7 text-[17px] leading-[1.85] text-ink/75">{guide.intro}</p>
          </header>
          <div className="mt-10 space-y-9">{guide.sections.map(section => <section key={section.title} className="border-t border-frame pt-7"><h2 className="mb-4 text-[23px] font-normal leading-[1.35]">{section.title}</h2><div className="space-y-4 text-[15px] leading-[1.9] text-ink/75">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <ul className="list-disc space-y-2 pl-5">{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}</div></section>)}</div>
          <section className="mt-11 border-t border-frame pt-7">
            <h2 className="text-[25px] font-normal leading-[1.3]">{guide.ctaTitle}</h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-ink/75">{guide.ctaText}</p>
            <button type="button" onClick={() => guide.category === 'branding' ? openInquiry('audit') : openInquiry('quote', guide.category === 'apps' ? 'apps' : 'web')} className="mt-5 inline-flex min-h-12 items-center rounded-full border border-ink/20 px-5 py-3 text-[12px] underline underline-offset-4 transition-colors hover:bg-ink hover:text-white">{guide.category === 'branding' ? copy.audit : copy.quote} →</button>
            {!!guide.relatedService.length && <nav aria-label={copy.related} className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-frame pt-5 text-[13px]">{guide.relatedService.map(id => { const service = getCommercialPage(id, lang); return <Link key={id} to={service.path} className="underline underline-offset-4">{service.label}</Link> })}</nav>}
          </section>
        </article>
        <aside className="mt-12 border-t border-frame pt-7" aria-label={copy.more}>
          <h2 className="text-[21px] font-normal">{copy.more}</h2>
          <ul className="mt-5 grid gap-x-8 gap-y-4 text-[13px] leading-[1.6] md:grid-cols-2">{related.map(item => <li key={item.id}><Link to={item.path} className="underline underline-offset-4">{item.title}</Link></li>)}</ul>
          <Link to={`/${lang}/blog`} className="mt-6 inline-block text-[12px] underline underline-offset-4">{copy.all} →</Link>
        </aside>
        <SiteFooter />
      </div>
    </div>
  </PageFrame>
}
