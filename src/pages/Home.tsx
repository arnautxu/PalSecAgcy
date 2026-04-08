import { useEffect, useRef, useState } from "react"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

/** Served from `public/hero-home.mp4` (copied from Desktop `Comp 1.mp4`) */
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
      {/* Fallback while the asset loads */}
      <div className="hero-home absolute inset-0 h-full w-full" aria-hidden />

      <video
        ref={videoRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Showreel"
      />

      <button
        type="button"
        className="text-nav fixed bottom-[52px] left-6 z-[60] uppercase tracking-nav text-white/90 transition-opacity duration-200 hover:opacity-40"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? t(lang, "home.play") : t(lang, "home.pause")}
      </button>
    </div>
  )
}
