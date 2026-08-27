import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"
import { Link } from "react-router-dom"
import { getAllServicePages } from "@/content/servicePages"

const VIDEO_SRC = publicUrl("/hero-home.mp4")
const VIDEO_SRC_MOBILE = publicUrl("/hero-home-720.mp4")
const VIDEO_POSTER = publicUrl("/hero-home-poster.webp")

export function Home() {
  const lang = useLang()
  const { pathname } = useLocation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const services = getAllServicePages(lang)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (paused) el.pause()
    else void el.play().catch(() => {})
  }, [paused])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const sync = () => setPaused(el.paused)
    el.addEventListener("play", sync)
    el.addEventListener("pause", sync)
    return () => {
      el.removeEventListener("play", sync)
      el.removeEventListener("pause", sync)
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <Seo
        title={t(lang, "home.seoTitle")}
        bare
        description={t(lang, "home.seoDesc")}
        path={pathname}
        lang={lang}
        isHome
      />
      {/* sr-only h1 for crawlers — visual design is the video + tagline below */}
      <h1 className="sr-only">PALSEC AGCY — {t(lang, "home.tagline")}</h1>
      {/* Static gradient fallback while video loads */}
      <div className="hero-home absolute inset-0 h-full w-full" aria-hidden />

      <video
        ref={videoRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        poster={VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Showreel"
      >
        <source src={VIDEO_SRC_MOBILE} media="(max-width: 768px)" type="video/mp4" />
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Gradient overlay — ensures text legibility over video */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-[50%] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* Value proposition */}
      <div className="fixed bottom-[104px] left-6 z-[40] max-w-[min(760px,calc(100vw-48px))]">
        <p className="mb-2 text-nav uppercase tracking-nav text-white/50">
          PALSEC AGCY
        </p>
        <p
          className="normal-case text-white/90 leading-[1.35]"
          style={{ fontSize: "clamp(13px, 2vw, 20px)", letterSpacing: "0.01em" }}
        >
          {t(lang, "home.tagline")}
        </p>
        <nav aria-label={lang === "ca" ? "Serveis destacats" : lang === "es" ? "Servicios destacados" : "Featured services"} className="mt-4 flex max-w-[680px] flex-wrap gap-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/${lang}/services/${service.slug}`}
              className="rounded-full border border-white/30 bg-black/15 px-3 py-2 text-[10px] uppercase tracking-nav text-white/85 backdrop-blur-[4px] transition-colors hover:border-white/70 hover:text-white"
            >
              {service.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Play/pause — extended touch target via pseudo-element */}
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? t(lang, "home.play") : t(lang, "home.pause")}
        className="fixed bottom-[112px] right-6 z-[40] min-h-[48px] min-w-[48px] text-[11px] uppercase tracking-nav text-white/60 transition-opacity duration-200 hover:text-white/90 before:absolute before:content-[''] before:-inset-3 md:bottom-[62px] md:left-6 md:right-auto"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? t(lang, "home.play") : t(lang, "home.pause")}
      </button>
    </div>
  )
}
