import { lazy, Suspense } from "react"
import { PageFrame } from "@/components/PageFrame"
import { CONTACT_EMAIL, mailtoProjectInquiryHref } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

// Lazy-load Three.js — only pulled in when About Us is visited
const Logo3D = lazy(() =>
  import("@/components/Logo3D").then((m) => ({ default: m.Logo3D }))
)

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function AboutUs() {
  const lang = useLang()
  return (
    <PageFrame className="relative">
      <div className="flex h-full min-h-0 flex-col px-6 pb-8 pt-[92px] md:flex-row md:gap-10">

        {/* ── Left: text content ── */}
        <div className="w-full md:w-[40%]">
          <h1 className="mb-4 text-nav uppercase tracking-nav opacity-80">
            {t(lang, "about.title")}
          </h1>
          <p className="normal-case text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            {t(lang, "about.p1")} {t(lang, "about.p2")}
          </p>

          {/* Mobile-only 3D logo — sits between body text and contact */}
          <div className="mt-6 md:hidden rounded-[2px] border border-frame" style={{ height: "200px" }}>
            <Suspense fallback={null}>
              <Logo3D reduced={prefersReducedMotion} />
            </Suspense>
          </div>

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

        {/* ── Right: 3D logo (desktop only) ── */}
        {/* Fixed height keeps the canvas landscape so the wide logo never clips */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <div style={{ width: "100%", height: "260px" }}>
            <Suspense fallback={null}>
              <Logo3D reduced={prefersReducedMotion} />
            </Suspense>
          </div>
        </div>

      </div>
    </PageFrame>
  )
}
