import { useLayoutEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { PROJECTS, picsum } from "@/data/projects"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"
import { Picture } from "@/components/Picture"

const COLOR_ACTIVE = "#ff1a1a"
const COLOR_REST = "#282828"

function ProjectCard({
  slug,
  title,
  imageSrc,
  videoSrc,
  fit = "cover",
  padded = false,
  comingSoon = false,
  lang,
}: {
  slug: string
  title: string
  imageSrc: string
  videoSrc?: string
  fit?: "cover" | "contain"
  padded?: boolean
  comingSoon?: boolean
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
    if (comingSoon) return
    const wrap = wrapRef.current
    const titleViewport = titleViewportRef.current
    const titleText = titleTextRef.current
    if (!wrap || !titleViewport || !titleText) return

    const compute = () => {
      const cardW = wrap.getBoundingClientRect().width
      const textW = titleText.getBoundingClientRect().width
      setCardW(cardW)
      setShiftPx(Math.max(0, Math.floor(cardW - textW - 2)))
    }

    compute()

    const ro = new ResizeObserver(() => compute())
    ro.observe(wrap)
    ro.observe(titleViewport)
    ro.observe(titleText)
    return () => ro.disconnect()
  }, [comingSoon])

  const media = (
    <div ref={wrapRef} className="relative overflow-hidden rounded-[2px] border border-frame bg-white">
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
        <Picture
          src={imageSrc}
          alt=""
          className={mediaClass}
          loading="lazy"
        />
      )}
      {comingSoon && (
        <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
          <span className={[
            "rounded-full border px-3 py-[6px]",
            "text-nav uppercase tracking-nav",
            "border-white/40 bg-black/30 text-white backdrop-blur-[6px]",
          ].join(" ")}>
            COMING SOON
          </span>
        </div>
      )}
    </div>
  )

  if (comingSoon) {
    return (
      <div className="cursor-default select-none">
        {media}
        <div className="mt-[6px]">
          <span className="text-nav uppercase leading-[1.6] tracking-nav text-ink/40">
            {title}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/${lang}/project/${slug}`}
      className="block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {media}
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
            color: hovered ? COLOR_ACTIVE : COLOR_REST,
          }}
          transition={{
            duration: 0.7,
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
  const { pathname } = useLocation()
  return (
    <PageFrame className="relative">
      <Seo
        title={t(lang, "projects.title")}
        description={t(lang, "projects.seoDesc")}
        path={pathname}
        lang={lang}
        isProjectsList
      />
      <div className="h-full w-full overflow-y-auto px-6 pb-8 pt-[92px]">
        <h1 className="mb-2 text-nav uppercase tracking-nav opacity-80">{t(lang, "projects.title")}</h1>
        <p className="mb-6 max-w-[640px] normal-case text-bodymd leading-[1.6] tracking-nav text-ink/70 md:text-body">
          {t(lang, "projects.lead")}
        </p>
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
                comingSoon={p.comingSoon}
                lang={lang}
              />
            )
          })}
        </div>
      </div>
    </PageFrame>
  )
}

