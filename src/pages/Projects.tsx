import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { BrandWatermark } from "@/components/BrandWatermark"
import { PROJECTS, picsum } from "@/data/projects"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

function ProjectCard({
  slug,
  title,
  imageSrc,
  videoSrc,
  fit = "cover",
  padded = false,
  lang,
}: {
  slug: string
  title: string
  imageSrc: string
  videoSrc?: string
  fit?: "cover" | "contain"
  padded?: boolean
  lang: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const titleViewportRef = useRef<HTMLDivElement>(null)
  const titleTextRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState(false)
  const [shiftPx, setShiftPx] = useState(0)
  const [cardW, setCardW] = useState<number | null>(null)
  const mediaClass = [
    "aspect-[3/4] w-full bg-white",
    fit === "contain" ? "object-contain" : "object-cover",
    padded ? "p-10" : "",
  ].join(" ")

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const titleViewport = titleViewportRef.current
    const titleText = titleTextRef.current
    if (!wrap || !titleViewport || !titleText) return

    const compute = () => {
      const cardW = wrap.getBoundingClientRect().width
      const textW = titleText.getBoundingClientRect().width
      setCardW(cardW)
      // -2px guard to avoid sub-pixel overshoot on some cards/fonts
      setShiftPx(Math.max(0, Math.floor(cardW - textW - 2)))
    }

    compute()

    const ro = new ResizeObserver(() => compute())
    ro.observe(wrap)
    ro.observe(titleViewport)
    ro.observe(titleText)
    return () => ro.disconnect()
  }, [])

  return (
    <Link
      to={`/${lang}/project/${slug}`}
      className="block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div ref={wrapRef} className="overflow-hidden rounded-[2px] border border-frame bg-white">
        {videoSrc ? (
          <video
            className="aspect-[3/4] w-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={imageSrc}
            alt=""
            className={mediaClass}
            loading="lazy"
          />
        )}
      </div>

      <div
        ref={titleViewportRef}
        className="mt-[6px] overflow-hidden"
        style={cardW ? { width: `${cardW}px` } : undefined}
      >
        <motion.span
          ref={titleTextRef}
          className="inline-block text-nav uppercase leading-[1.6] tracking-nav will-change-transform"
          animate={{
            x: hovered ? shiftPx : 0,
            color: hovered ? "#ff1a1a" : "#282828",
          }}
          transition={{
            duration: 0.42,
            ease: [0.4, 0.24, 0.4, 1],
          }}
        >
          {title}
        </motion.span>
      </div>
    </Link>
  )
}

export function Projects() {
  const lang = useLang()
  return (
    <PageFrame className="relative">
      <BrandWatermark variant="light" />
      <div className="h-full w-full overflow-y-auto px-6 pb-8 pt-[92px]">
        <div className="mb-2 text-nav opacity-60">{t(lang, "projects.title")}</div>
        <div className="mb-6 max-w-[640px] text-bodymd leading-[1.6] tracking-nav text-ink/70 md:text-body">
          {t(lang, "projects.lead")}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((p) => {
            const src = p.localImages?.thumb
              ? publicUrl(p.localImages.thumb)
              : picsum(p.thumbSeed, 920, 518)
            const video = p.localImages?.thumbVideo ? publicUrl(p.localImages.thumbVideo) : undefined
            const fit = p.localImages?.thumbFit ?? "cover"
            const padded = p.localImages?.thumbPadded ?? false

            return (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                imageSrc={src}
                videoSrc={video}
                fit={fit}
                padded={padded}
                lang={lang}
              />
            )
          })}
        </div>
      </div>
    </PageFrame>
  )
}

