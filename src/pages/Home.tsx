import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { publicUrl } from '@/utils/publicUrl'
import { useLang } from '@/i18n/useLang'
import { t } from '@/i18n/strings'
import { Seo } from '@/components/Seo'
import { SiteFooter } from '@/components/SiteFooter'
import { getCommercialPages } from '@/content/commercialPages'
import { SITE_COPY } from '@/content/siteCopy'
import { HOME_META, PROJECT_META, type ProjectSlug } from '@/lib/seoMeta'
import { INQUIRY_LABELS, useInquiry } from '@/components/Inquiry'

export function Home() {
  const lang = useLang()
  const openInquiry = useInquiry()
  const inquiry = INQUIRY_LABELS[lang]
  const { pathname } = useLocation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const copy = SITE_COPY[lang]
  const services = getCommercialPages(lang)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (paused) el.pause()
    else void el.play().catch(() => {})
  }, [paused])
  const projects: ProjectSlug[] = ['el-xiringuito', 'gent-gran-de-calonge-i-sant-antoni', 'vira']

  return <div className="h-full w-full overflow-y-auto bg-black text-white">
    <Seo title={HOME_META[lang].title} bare description={HOME_META[lang].description} path={pathname} lang={lang} isHome />
    <section className="relative min-h-[100svh] bg-black">
      <div className="hero-home absolute inset-0" aria-hidden />
      <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" poster={publicUrl('/hero-home-poster.webp')} autoPlay muted loop playsInline preload="metadata" aria-label="PALSEC showreel">
        <source src={publicUrl('/hero-home-720.mp4')} media="(max-width: 768px)" type="video/mp4" />
        <source src={publicUrl('/hero-home.mp4')} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" aria-hidden />
      <div className="absolute bottom-[110px] left-6 right-6 max-w-[850px]">
        <p className="mb-3 text-nav uppercase tracking-nav text-white/60">PALSEC AGCY · GIRONA / COSTA BRAVA</p>
        <h1 className="max-w-[760px] font-normal normal-case leading-[1.15]" style={{fontSize: 'clamp(25px, 4vw, 48px)', letterSpacing: '-.025em'}}>{copy.headline}</h1>
        <nav aria-label={copy.services} className="mt-5 flex flex-wrap gap-2">
          {services.map(service => <Link key={service.id} to={service.path} className="rounded-full border border-white/35 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-nav backdrop-blur-[4px] hover:border-white">{service.label}</Link>)}
        </nav>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={() => openInquiry('audit')} className="inline-flex min-h-12 max-w-full items-center justify-center rounded-full bg-white px-5 py-3 text-[12px] font-normal text-black transition-colors hover:bg-white/90">{inquiry.audit} ↗</button>
          <button type="button" onClick={() => openInquiry('quote')} className="text-[12px] underline underline-offset-4">{inquiry.quote} →</button>
        </div>
      </div>
      <button type="button" aria-pressed={paused} aria-label={paused ? t(lang,'home.play') : t(lang,'home.pause')} onClick={() => setPaused(value => !value)} className="absolute top-5 right-6 min-h-12 min-w-12 text-[11px] uppercase tracking-nav text-white/80">{paused ? t(lang,'home.play') : t(lang,'home.pause')}</button>
    </section>
    <div className="mx-auto max-w-[1120px] px-6 pt-14 pb-28 normal-case md:pt-20">
      <p className="max-w-[800px] text-[18px] leading-[1.65] md:text-[23px]">{copy.intro}</p>
      <section className="mt-16 border-t border-white/20 pt-8">
        <h2 className="text-[25px] leading-tight">{copy.services}</h2>
        <p className="mt-4 max-w-[760px] text-[14px] leading-[1.8] text-white/70">{copy.serviceIntro}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map(service => <Link key={service.id} to={service.path} className="block border-t border-white/20 pt-5 hover:text-white/75">
            <h3 className="text-[18px]">{service.label} →</h3>
            <p className="mt-3 text-[13px] leading-[1.8] text-white/65">{service.description}</p>
          </Link>)}
        </div>
      </section>
      <section className="mt-16 border-t border-white/20 pt-8">
        <h2 className="text-[25px]">{copy.projects}</h2>
        <p className="mt-4 max-w-[800px] text-[14px] leading-[1.8] text-white/70">{copy.proof}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{projects.map(slug => <Link key={slug} to={`/${lang}/project/${slug}`}>
          <img src={publicUrl(PROJECT_META[slug].firstImage!.replace(/\.png$/, '.720.webp'))} alt={PROJECT_META[slug].displayTitle} width="720" height="540" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          <h3 className="mt-3 text-[13px]">{PROJECT_META[slug].displayTitle} →</h3>
        </Link>)}</div>
        <Link to={`/${lang}/projects`} className="mt-6 inline-block text-[12px] underline underline-offset-4">{copy.allProjects}</Link>
      </section>
      <section className="mt-16 border-t border-white/20 pt-8">
        <h2 className="text-[25px]">{copy.process}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">{copy.steps.map(([title, body], index) => <div key={title}>
          <span className="text-[11px] text-white/60">0{index + 1}</span><h3 className="mt-3 text-[17px]">{title}</h3><p className="mt-3 text-[13px] leading-[1.8] text-white/65">{body}</p>
        </div>)}</div>
      </section>
      <section className="mt-16 border-t border-white/20 pt-8">
        <h2 className="text-[25px]">{copy.local}</h2>
        <p className="mt-4 max-w-[800px] text-[14px] leading-[1.8] text-white/70">{copy.localBody}</p>
        <Link to={`/${lang}/about-us`} className="mt-5 inline-block text-[12px] underline underline-offset-4">{copy.about}</Link>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={() => openInquiry('audit')} className="inline-flex min-h-12 max-w-full items-center justify-center rounded-full bg-white px-5 py-3 text-[12px] font-normal text-black transition-colors hover:bg-white/90">{inquiry.audit} ↗</button>
          <button type="button" onClick={() => openInquiry('quote')} className="text-[12px] underline underline-offset-4">{inquiry.quote} →</button>
        </div>
      </section>
      <SiteFooter />
    </div>
  </div>
}
