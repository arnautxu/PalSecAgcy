import { Link, useLocation, useParams } from 'react-router-dom'
import { PageFrame } from '@/components/PageFrame'
import { Seo } from '@/components/Seo'
import { SiteFooter } from '@/components/SiteFooter'
import { getBuyingGuides, getBuyingGuide } from '@/content/buyingGuides'
import { getCommercialSummary as getCommercialPage, getServiceSummaries } from '@/content/serviceCatalog'
import { SERVICE_DISCIPLINES } from '@/content/serviceOrientation'
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
  const disciplines = getServiceSummaries(lang).filter(service => guide.relatedService.some(id => SERVICE_DISCIPLINES[id].includes(service.slug)))
  const related = getBuyingGuides(lang).filter(item => item.id !== guide.id).sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category)).slice(0, 4)
  const published = new Intl.DateTimeFormat(lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${guide.publishedAt}T00:00:00Z`))

  return <PageFrame>
    <Seo title={guide.seoTitle} bare description={guide.description} path={guide.path} lang={lang} type="article" />
    <div className="h-full overflow-y-auto px-5 pb-16 pt-[108px] normal-case md:px-8">
      <div className="mx-auto max-w-[1040px]">
        <nav aria-label={copy.route} className="mb-8 flex flex-wrap gap-x-3 gap-y-2 text-[12px] text-ink/60"><Link to={`/${lang}`} className="underline underline-offset-4">{copy.home}</Link><span aria-hidden="true">/</span><Link to={`/${lang}/blog`} className="underline underline-offset-4">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{copy[guide.category]}</span></nav>
        <article className="mx-auto max-w-[720px]">
          <header>
            <p className="mb-4 text-[12px] uppercase tracking-nav text-ink/65">{copy.guide} · {copy[guide.category]}</p>
            <p className="mb-4 text-[12px] text-ink/70"><Link to={`/${lang}/about-us`} className="underline underline-offset-4">{lang === 'ca' ? 'Redacció: PALSEC AGCY' : 'Redacción: PALSEC AGCY'}</Link> · <time dateTime={guide.publishedAt}>{published}</time></p>
            <h1 className="editorial-title !text-[clamp(34px,4.8vw,64px)]">{guide.title}</h1>
            <p className="mt-7 text-[17px] leading-[1.85] text-ink/75">{guide.intro}</p>
          </header>
          <div className="mt-16 space-y-16">{guide.sections.map(section => <section key={section.title} className="pt-4"><h2 className="mb-4 text-[23px] font-normal leading-[1.35]">{section.title}</h2><div className="space-y-4 text-[17px] leading-[1.85] text-ink/75">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <ul className="list-disc space-y-2 pl-5">{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}</div></section>)}</div>
          {guide.category !== 'apps' && <aside className="mt-10 border-t border-frame pt-7">
            <h2 className="mb-3 text-[21px] font-normal">{lang === 'ca' ? 'Un exemple del portafolis' : 'Un ejemplo del portafolio'}</h2>
            <p className="text-[15px] leading-[1.85] text-ink/75">{guide.category === 'branding'
              ? (lang === 'ca' ? 'PocketVoice permet veure què concreta un sistema d’identitat: símbol, versions del logotip, paleta, tipografia, manual i aplicacions de comunicació.' : 'PocketVoice permite ver cómo se concreta un sistema de identidad: símbolo, versiones del logotipo, paleta, tipografía, manual y aplicaciones de comunicación.')
              : (lang === 'ca' ? 'A Weboteca pots comparar cinc webs en escriptori i mòbil. Les captures i els enllaços ajuden a posar exemples concrets a la conversa sobre estructura, contingut i comportament responsive.' : 'En Weboteca puedes comparar cinco webs en escritorio y móvil. Las capturas y los enlaces aportan ejemplos concretos a la conversación sobre estructura, contenido y comportamiento responsive.')}</p>
            <Link to={`/${lang}/project/${guide.category === 'branding' ? 'pocket-voice' : 'weboteca'}`} className="mt-3 inline-block text-[13px] underline underline-offset-4">{guide.category === 'branding' ? 'PocketVoice' : 'Weboteca'} →</Link>
          </aside>}
          <section className="mt-11 border-t border-frame pt-7">
            <h2 className="text-[25px] font-normal leading-[1.3]">{guide.ctaTitle}</h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-ink/75">{guide.ctaText}</p>
            <button type="button" onClick={() => guide.category === 'branding' ? openInquiry('audit') : openInquiry('quote', guide.category === 'apps' ? 'apps' : 'web')} className="mt-5 inline-flex min-h-12 items-center rounded-full border border-ink/20 px-5 py-3 text-[12px] underline underline-offset-4 transition-colors hover:bg-ink hover:text-white">{guide.category === 'branding' ? copy.audit : copy.quote} →</button>
            {!!guide.relatedService.length && <nav aria-label={copy.related} className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-frame pt-5 text-[13px]">{guide.relatedService.map(id => { const service = getCommercialPage(id, lang); return <Link key={id} to={service.path} className="underline underline-offset-4">{service.label}</Link> })}</nav>}
            {!!disciplines.length && <nav aria-label={lang === 'ca' ? 'Disciplines del projecte' : 'Disciplinas del proyecto'} className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-[13px]">{disciplines.map(service => <Link key={service.slug} to={`/${lang}/services/${service.slug}`} className="underline underline-offset-4">{service.title}</Link>)}</nav>}
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
