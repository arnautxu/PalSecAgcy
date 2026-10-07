import { useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { publicUrl } from '@/utils/publicUrl'
import { useLang } from '@/i18n/useLang'
import { t } from '@/i18n/strings'
import { Seo } from '@/components/Seo'
import { SiteFooter } from '@/components/SiteFooter'
import { getCommercialSummaries as getCommercialPages } from '@/content/serviceCatalog'
import { EDITORIAL } from '@/content/editorialCopy'
import { EDITORIAL_CONTEXT } from '@/content/editorialContext'
import { Arrow, Reveal, WorkStrip } from '@/components/Editorial'
import { HOME_META } from '@/lib/seoMeta'
import { useInquiry } from '@/components/Inquiry'

export function Home() {
  const lang = useLang()
  const openInquiry = useInquiry()
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const copy = EDITORIAL[lang]
  const context = EDITORIAL_CONTEXT[lang]
  const services = getCommercialPages(lang)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (paused) el.pause()
    else void el.play().catch(() => {})
  }, [paused, videoReady])
  // Keep the initial client tree identical to the prerendered HTML.
  useEffect(() => { if (reduced) setPaused(true) }, [reduced])
  useEffect(() => {
    if (reduced) return
    let cancelled = false
    let idle: number | undefined
    const poster = new Image()
    const activate = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(() => { if (!cancelled) setVideoReady(true) }, { timeout: 2000 })
      else idle = window.setTimeout(() => { if (!cancelled) setVideoReady(true) }, 800)
    }
    poster.onload = activate
    poster.onerror = activate
    poster.src = publicUrl('/hero-home-poster.webp')
    return () => { cancelled = true; if (idle !== undefined) { if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle); else window.clearTimeout(idle) } }
  }, [reduced])
  const projects = ['pocket-voice', 'el-xiringuito']

  return <div className="h-full w-full overflow-y-auto bg-black text-white normal-case">
    <Seo title={HOME_META[lang].title} bare description={HOME_META[lang].description} path={pathname} lang={lang} isHome />
    <Helmet><link rel="preload" as="image" href={publicUrl('/hero-home-poster.webp')} /></Helmet>
    <section className="relative min-h-[100dvh] bg-black">
      <div className="hero-home absolute inset-0" aria-hidden />
      <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" poster={publicUrl('/hero-home-poster.webp')} autoPlay={videoReady && !paused} muted loop playsInline preload="metadata" aria-label="PALSEC showreel">
        {videoReady && <source src={publicUrl('/hero-home-720.mp4')} media="(max-width: 768px)" type="video/mp4" />}
        {videoReady && <source src={publicUrl('/hero-home.mp4')} type="video/mp4" />}
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" aria-hidden />
      <div className="absolute bottom-[110px] left-6 right-6 max-w-[850px]">
        <p className="mb-3 text-nav uppercase tracking-nav text-white/60">PALSEC AGCY · GIRONA / COSTA BRAVA</p>
        <h1 className="editorial-title whitespace-pre-line" style={{fontSize: 'clamp(38px, 6vw, 84px)'}}>{copy.headline}</h1>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link to={`/${lang}/projects`} className="editorial-cta !bg-white !text-black">{copy.all}<Arrow /></Link>
          <button type="button" onClick={() => openInquiry('quote')} className="min-h-12 text-[13px] underline underline-offset-4">{copy.cta}</button>
        </div>
      </div>
      <button type="button" aria-pressed={paused} aria-label={paused ? t(lang,'home.play') : t(lang,'home.pause')} onClick={() => { setVideoReady(true); setPaused(value => !value) }} className="absolute top-5 right-6 min-h-12 min-w-12 text-[11px] uppercase tracking-nav text-white/80">{paused ? t(lang,'home.play') : t(lang,'home.pause')}</button>
    </section>
    <div className="editorial-wrap px-6 pb-24 normal-case">
      <Reveal className="editorial-section editorial-split">
        <div><span className="editorial-eyebrow">PALSEC AGCY</span><p className="editorial-heading">{copy.intro}</p><p className="editorial-lead">{context.home}</p></div>
        <div className="self-end md:pl-20"><Link to={`/${lang}/about-us`} className="inline-flex min-h-12 items-center gap-6 text-[13px]">{copy.more}<Arrow /></Link></div>
      </Reveal>
      <Reveal className="editorial-section">
        <span className="editorial-eyebrow">01 / {copy.selected}</span>
        <h2 className="editorial-heading">{copy.work}</h2>
        <p className="editorial-lead mb-8">{context.selected}</p>
        <WorkStrip slugs={projects} lang={lang} />
        <Link to={`/${lang}/projects`} className="mt-10 inline-flex min-h-12 items-center gap-6 text-[13px]">{copy.all}<Arrow /></Link>
      </Reveal>
      <Reveal className="editorial-section editorial-split">
        <div><span className="editorial-eyebrow">02 / {copy.scope}</span><h2 className="editorial-heading whitespace-pre-line">{copy.services}</h2></div>
        <div>{services.map((service, index) => <Link key={service.id} to={service.path} className="editorial-service-row"><span className="text-[11px] opacity-50">0{index + 1}</span><div><h3>{service.label}</h3><p>{context.services[service.id]}</p></div><Arrow /></Link>)}</div>
      </Reveal>
      <Reveal className="editorial-section"><h2 className="editorial-title">{copy.contact}</h2><p className="editorial-lead">{lang === "ca" ? "Per començar, explica’ns què fa la teva empresa, a qui es dirigeix i què vols canviar. Indica si parteixes d’una marca o una web existent, quins materials tens i quan necessites publicar. Amb aquest context podem ordenar les prioritats i definir l’abast del projecte." : lang === "es" ? "Para empezar, cuéntanos qué hace tu empresa, a quién se dirige y qué quieres cambiar. Indica si partes de una marca o una web existente, qué materiales tienes y cuándo necesitas publicar. Con ese contexto podemos ordenar las prioridades y definir el alcance del proyecto." : "To get started, tell us what your business does, who it serves and what you want to change. Let us know whether you have an existing brand or website, which materials are ready and when you need to launch. That context helps us agree on priorities and define the project’s scope."}</p><button type="button" onClick={() => openInquiry('quote')} className="editorial-cta mt-8 !bg-white !text-black">{copy.cta}<Arrow /></button></Reveal>
      <SiteFooter />
    </div>
  </div>
}
