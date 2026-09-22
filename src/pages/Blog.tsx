import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageFrame } from '@/components/PageFrame'
import { Seo } from '@/components/Seo'
import { SiteFooter } from '@/components/SiteFooter'
import { getBuyingGuides, type GuideCategory } from '@/content/buyingGuides'
import { BLOG_META } from '@/lib/seoMeta'
import { NotFound } from './NotFound'

const COPY = {
  ca: { home: 'Inici', title: 'Idees per decidir millor.', intro: 'Guies sobre marca, webs a mida i aplicacions. Per entendre què necessita el teu negoci, preparar un encàrrec i prendre decisions amb criteri.', all: 'Totes', branding: 'Branding', web: 'Webs a mida', apps: 'Aplicacions', filter: 'Filtra els articles per tema', articles: 'Articles', empty: 'Encara no hi ha articles en aquesta categoria.' },
  es: { home: 'Inicio', title: 'Ideas para decidir mejor.', intro: 'Guías sobre marca, webs a medida y aplicaciones. Para entender qué necesita tu negocio, preparar un encargo y tomar decisiones con criterio.', all: 'Todas', branding: 'Branding', web: 'Webs a medida', apps: 'Aplicaciones', filter: 'Filtra los artículos por tema', articles: 'Artículos', empty: 'Todavía no hay artículos en esta categoría.' },
} as const

export function Blog() {
  const { lang } = useParams()
  const [category, setCategory] = useState<GuideCategory | 'all'>('all')
  if (lang !== 'ca' && lang !== 'es') return <NotFound />
  const copy = COPY[lang]
  const guides = getBuyingGuides(lang).filter(guide => category === 'all' || guide.category === category)
  const meta = BLOG_META[lang]

  return <PageFrame>
    <Seo title={meta.title} bare description={meta.description} path={`/${lang}/blog`} lang={lang} />
    <div className="h-full overflow-y-auto px-5 pb-16 pt-[108px] normal-case md:px-8">
      <div className="mx-auto max-w-[1040px]">
        <nav aria-label={lang === 'ca' ? 'Fil d’Ariadna' : 'Ruta de navegación'} className="mb-8 flex gap-3 text-[12px] text-ink/60"><Link to={`/${lang}`} className="underline underline-offset-4">{copy.home}</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>
        <header className="max-w-[800px]"><p className="mb-4 text-[12px] uppercase tracking-nav text-ink/65">PALSEC · Blog</p><h1 className="text-[32px] font-normal leading-[1.12] tracking-[-0.025em] md:text-[48px]">{copy.title}</h1><p className="mt-7 max-w-[760px] text-[17px] leading-[1.85] text-ink/75">{copy.intro}</p></header>
        <div role="group" aria-label={copy.filter} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-frame py-3">{(['all', 'branding', 'web', 'apps'] as const).map(value => <button key={value} type="button" onClick={() => setCategory(value)} aria-pressed={category === value} className={`min-h-11 text-[12px] ${category === value ? 'underline underline-offset-4' : 'text-ink/55 hover:text-ink'}`}>{copy[value]}</button>)}</div>
        <section aria-label={copy.articles}>
          {guides.map(guide => <article key={guide.id} className="grid gap-3 border-b border-frame py-7 md:grid-cols-[170px_1fr] md:gap-8 md:py-9">
            <div className="text-[11px] leading-[1.8] text-ink/60"><p className="uppercase tracking-nav">{copy[guide.category]}</p><time dateTime={guide.publishedAt}>{new Intl.DateTimeFormat(lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${guide.publishedAt}T00:00:00Z`))}</time></div>
            <div><h2 className="max-w-[780px] text-[22px] font-normal leading-[1.4] tracking-[-0.02em] md:text-[25px]"><Link to={guide.path} className="hover:underline hover:underline-offset-4">{guide.title} <span aria-hidden="true">↗</span></Link></h2><p className="mt-3 max-w-[740px] text-[13px] leading-[1.9] text-ink/65">{guide.description}</p></div>
          </article>)}
          {!guides.length && <p className="py-8 text-[14px] text-ink/65">{copy.empty}</p>}
        </section>
        <SiteFooter />
      </div>
    </div>
  </PageFrame>
}
