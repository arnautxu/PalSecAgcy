import { Component, lazy, Suspense } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { CONTACT_EMAIL, mailtoProjectInquiryHref } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"

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
  return (
    <PageFrame className="relative">
      <Seo
        title={t(lang, "about.title")}
        description={t(lang, "about.seoDesc")}
        path={pathname}
        lang={lang}
      />
      <div className="flex h-full min-h-0 flex-col pt-[92px]">

        {/* ── 3D Logo — full width, dominant ── */}
        <div className="w-full flex-shrink-0" style={{ height: "clamp(220px, 45vh, 460px)" }}>
          <Logo3DBoundary>
            <Suspense fallback={null}>
              <Logo3D reduced={prefersReducedMotion} />
            </Suspense>
          </Logo3DBoundary>
        </div>

        {/* ── Text content — centred below ── */}
        <div className="mx-auto w-full max-w-2xl px-6 pb-10">
          <h1 className="mb-4 text-nav uppercase tracking-nav opacity-80">
            {t(lang, "about.title")}
          </h1>
          <p className="normal-case text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            {t(lang, "about.p1")} {t(lang, "about.p2")}
          </p>

          <div className="my-5 h-px w-full bg-frame" />

          <p className="normal-case text-bodymd leading-[1.6] tracking-nav text-ink/70 md:text-body">
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
