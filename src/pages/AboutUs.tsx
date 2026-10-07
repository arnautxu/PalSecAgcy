import { Component, lazy, Suspense, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/SiteFooter"
import { PageFrame } from "@/components/PageFrame"
import { CONTACT_EMAIL, mailtoProjectInquiryHref } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"
import { ABOUT_APPROACH, ABOUT_META } from "@/lib/seoMeta"
import { Link } from "react-router-dom"
import { STUDIO_PROOF } from "@/content/studioProof"
import { EDITORIAL } from "@/content/editorialCopy"
import { EDITORIAL_CONTEXT } from "@/content/editorialContext"
import { Arrow, Reveal, WorkStrip } from "@/components/Editorial"

// Lazy-load Three.js — only pulled in when About Us is visited
const Logo3D = lazy(() =>
  import("@/components/Logo3D").then((m) => ({ default: m.Logo3D }))
)

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Local error boundary that silences Logo3D crashes so the rest of the page renders */
class Logo3DBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err: unknown) { console.error("Logo3D failed to render:", err) }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function AboutUs() {
  const lang = useLang()
  const { pathname } = useLocation()
  const extra = ABOUT_APPROACH[lang]
  const proof = STUDIO_PROOF[lang]
  const copy = EDITORIAL[lang]
  const context = EDITORIAL_CONTEXT[lang]
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <PageFrame className="relative">
      <Seo
        title={ABOUT_META[lang].title}
        bare
        description={ABOUT_META[lang].description}
        path={pathname}
        lang={lang}
      />
      <div className="editorial-scroll"><div className="editorial-wrap">
        <header className="editorial-split items-center">
          <div><span className="editorial-eyebrow">{t(lang, "about.title")}</span><h1 className="editorial-title whitespace-pre-line">{copy.about}</h1><p className="editorial-lead">{copy.aboutBody}</p></div>
          <div className="h-[260px] md:h-[460px]">{mounted && <Logo3DBoundary><Suspense fallback={null}><Logo3D reduced={prefersReducedMotion} /></Suspense></Logo3DBoundary>}</div>
        </header>
        <Reveal className="editorial-section editorial-split"><div><span className="editorial-eyebrow">01 / {extra.approach}</span><h2 className="editorial-heading whitespace-pre-line">{copy.process}</h2></div><ol>{copy.steps.map(([title], index) => <li className="editorial-step" key={title}><span className="text-[11px] opacity-50">0{index + 1}</span><div><h3>{title}</h3><p>{context.steps[index]}</p></div></li>)}</ol></Reveal>
        <Reveal className="editorial-section"><span className="editorial-eyebrow">02 / {proof.title}</span><h2 className="editorial-heading">{copy.work}</h2><p className="editorial-lead">{context.proof}</p><p className="editorial-lead mb-8">{proof.body}</p><WorkStrip slugs={['pocket-voice', 'weboteca']} lang={lang} /></Reveal>
        <section className="editorial-section editorial-split"><h2 className="editorial-heading">{copy.contact}</h2><div><a href={mailtoProjectInquiryHref(lang)} className="editorial-cta">{CONTACT_EMAIL}<Arrow /></a><nav aria-label={extra.follow} className="mt-8 flex gap-6 text-[13px]"><a href="https://www.linkedin.com/company/palsec-agency" rel="me noopener noreferrer" target="_blank">LinkedIn ↗</a><a href="https://www.instagram.com/palsec.agency/" rel="me noopener noreferrer" target="_blank">Instagram ↗</a><Link to={`/${lang}/services`}>{t(lang, "nav.services")}</Link></nav></div></section>
        <aside className="border-t border-frame pt-8 normal-case"><h2 className="text-[20px]">{lang === 'ca' ? 'Referència professional' : lang === 'es' ? 'Referencia profesional' : 'Professional reference'}</h2><p className="mt-3 max-w-[760px] text-[15px] leading-[1.8] text-ink/70">{lang === 'ca' ? 'El directori de professionals d’ADG-FAD inclou Arnau Piñol Olabegoya amb un enllaç al web de PALSEC. Pots consultar aquesta referència i contrastar el treball amb els projectes publicats al portafolis.' : lang === 'es' ? 'El directorio de profesionales de ADG-FAD incluye a Arnau Piñol Olabegoya con un enlace al sitio de PALSEC. Puedes consultar esta referencia y contrastar el trabajo con los proyectos publicados en el portafolio.' : 'The ADG-FAD professional directory lists Arnau Piñol Olabegoya with a link to PALSEC. You can consult this reference and explore the published portfolio projects.'}</p><a href="https://adg-fad.org/socios/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center gap-4 text-[13px] underline underline-offset-4">ADG-FAD<Arrow /></a></aside>
        <SiteFooter />
      </div></div>
    </PageFrame>
  )
}
