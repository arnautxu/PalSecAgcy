import { Component, lazy, Suspense } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { CONTACT_EMAIL, mailtoProjectInquiryHref } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"
import { ABOUT_APPROACH, ABOUT_META, ABOUT_TEAM_COPY } from "@/lib/seoMeta"
import { Link } from "react-router-dom"

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
  return (
    <PageFrame className="relative">
      <Seo
        title={ABOUT_META[lang].title}
        bare
        description={ABOUT_META[lang].description}
        path={pathname}
        lang={lang}
      />
      <div className="flex h-full min-h-0 flex-col overflow-y-auto pt-[92px]">

        {/* ── 3D Logo — full width, dominant ── */}
        <div className="w-full flex-shrink-0" style={{ height: "clamp(220px, 45vh, 460px)" }}>
          <Logo3DBoundary>
            <Suspense fallback={null}>
              <Logo3D reduced={prefersReducedMotion} />
            </Suspense>
          </Logo3DBoundary>
        </div>

        {/* ── Text content — centred below ── */}
        <div className="mx-auto w-full max-w-2xl px-4 pb-10 sm:px-5 md:px-6">
          <h1 className="mb-4 text-nav uppercase tracking-nav opacity-80">
            {t(lang, "about.title")}
          </h1>
          <p className="normal-case text-bodymd leading-[1.8] tracking-nav text-ink md:text-body md:leading-[1.6]">
            {t(lang, "about.p1")} {t(lang, "about.p2")}
          </p>
          <p className="mt-4 normal-case text-bodymd leading-[1.8] tracking-nav text-ink/75 md:text-body md:leading-[1.6]">
            {ABOUT_TEAM_COPY[lang]}
          </p>

          <section className="mt-8 grid gap-4 border-t border-frame pt-6 md:grid-cols-[160px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/55">{extra.approach}</h2>
            <div>
              <p className="normal-case text-[14px] leading-[1.75] text-ink/80 md:text-[16px]">{extra.body}</p>
              <ul className="mt-5 space-y-2 text-[12px] uppercase tracking-nav text-ink/65">
                {extra.principles.map((principle) => <li key={principle}>— {principle}</li>)}
              </ul>
            </div>
          </section>

          <section className="mt-8 grid gap-4 border-t border-frame pt-6 md:grid-cols-[160px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/55">{extra.follow}</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-[12px] uppercase tracking-nav">
              <a href="https://www.linkedin.com/company/palsec-agency" rel="me noopener noreferrer" target="_blank" className="underline underline-offset-4 hover:opacity-60">LinkedIn</a>
              <a href="https://www.instagram.com/palsec.agency/" rel="me noopener noreferrer" target="_blank" className="underline underline-offset-4 hover:opacity-60">Instagram</a>
              <Link to={`/${lang}/legal-notice`} className="underline underline-offset-4 hover:opacity-60">{extra.legal}</Link>
              <Link to={`/${lang}/privacy`} className="underline underline-offset-4 hover:opacity-60">{extra.privacy}</Link>
            </div>
          </section>

          <div className="my-5 h-px w-full bg-frame" />

          <p className="normal-case text-bodymd leading-[1.8] tracking-nav text-ink/70 md:text-body md:leading-[1.6]">
            {t(lang, "about.contactPrefix")}{" "}
            <a
              href={mailtoProjectInquiryHref(lang)}
              className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

      </div>
    </PageFrame>
  )
}
