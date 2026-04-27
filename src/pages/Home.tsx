import { useEffect, useRef, useState } from "react"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

const VIDEO_SRC = publicUrl("/hero-home.mp4")

export function Home() {
  const lang = useLang()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

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
      {/* Static gradient fallback while video loads */}
      <div className="hero-home absolute inset-0 h-full w-full" aria-hidden />

      <video
        ref={videoRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Showreel"
      />

      {/* Gradient overlay — ensures text legibility over video */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-[50%] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* Value proposition */}
      <div className="fixed bottom-[90px] left-6 z-[60] max-w-[min(360px,calc(100vw-80px))]">
        <p className="mb-2 text-nav uppercase tracking-nav text-white/50">
          PALSEC AGCY
        </p>
        <p
          className="normal-case text-white/90 leading-[1.35]"
          style={{ fontSize: "clamp(13px, 2vw, 20px)", letterSpacing: "0.01em" }}
        >
          {t(lang, "home.tagline")}
        </p>
      </div>

      {/* Play/pause — extended touch target via pseudo-element */}
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? t(lang, "home.play") : t(lang, "home.pause")}
        className="relative text-nav fixed bottom-[58px] left-6 z-[60] uppercase tracking-nav text-white/50 transition-opacity duration-200 hover:text-white/90 before:absolute before:content-[''] before:-inset-3"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? t(lang, "home.play") : t(lang, "home.pause")}
      </button>
    </div>
  )
}
