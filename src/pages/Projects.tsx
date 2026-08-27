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
import { LazyAutoplayVideo } from "@/components/LazyAutoplayVideo"
import { PROJECTS_META } from "@/lib/seoMeta"

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
    <div
      ref={wrapRef}
      className="group/media relative overflow-hidden rounded-[2px] border border-frame bg-white transition-shadow duration-300 group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
    >
      {videoSrc ? (
        <LazyAutoplayVideo
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          src={videoSrc}
          poster={imageSrc}
          aria-label={`${title} — ${lang === "ca" ? "projecte de PALSEC AGCY" : lang === "es" ? "proyecto de PALSEC AGCY" : "project by PALSEC AGCY"}`}
        />
      ) : (
        <Picture
          src={imageSrc}
          alt={`${title} — ${lang === "ca" ? "projecte de PALSEC AGCY" : lang === "es" ? "proyecto de PALSEC AGCY" : "project by PALSEC AGCY"}`}
          className={`${mediaClass} transition-transform duration-500 ease-out group-hover:scale-[1.015]`}
          sizes="(max-width: 767px) calc(100vw - 40px), 33vw"
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
      className="group block cursor-pointer"
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
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
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
        title={PROJECTS_META[lang].title}
        bare
        description={PROJECTS_META[lang].description}
        path={pathname}
        lang={lang}
        isProjectsList
      />
      <div className="h-full w-full overflow-y-auto px-4 pb-8 pt-[92px] sm:px-5 md:px-6">
        <h1 className="mb-2 text-nav uppercase tracking-nav opacity-80">{t(lang, "projects.title")}</h1>
        <p className="mb-6 max-w-[640px] normal-case text-bodymd leading-[1.8] tracking-nav text-ink/70 md:text-body md:leading-[1.6]">
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
