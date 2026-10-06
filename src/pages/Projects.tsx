import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { SiteFooter } from "@/components/SiteFooter"
import { PROJECTS, type ProjectSlug } from "@/data/projects"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"
import { Picture } from "@/components/Picture"
import { LazyAutoplayVideo } from "@/components/LazyAutoplayVideo"
import { AiLabCardVisual } from "@/components/AiLabVisual"
import { PROJECTS_META } from "@/lib/seoMeta"
import { EDITORIAL } from "@/content/editorialCopy"
import { EDITORIAL_CONTEXT } from "@/content/editorialContext"
import projectSummaries from "@/content/projectCatalog.json"
import { getCommercialSummaries } from "@/content/serviceCatalog"
import type { Lang } from "@/i18n/lang"

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

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
  priority = false,
}: {
  slug: ProjectSlug
  title: string
  imageSrc?: string
  videoSrc?: string
  fit?: "cover" | "contain"
  padded?: boolean
  comingSoon?: boolean
  lang: Lang
  priority?: boolean
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

  useIsomorphicLayoutEffect(() => {
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
      {slug === "ai-lab" ? (
        <AiLabCardVisual />
      ) : videoSrc ? (
        <LazyAutoplayVideo
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          src={videoSrc}
          poster={imageSrc}
          aria-label={`${title} — ${lang === "ca" ? "projecte de PALSEC AGCY" : lang === "es" ? "proyecto de PALSEC AGCY" : "project by PALSEC AGCY"}`}
        />
      ) : imageSrc ? (
        <Picture
          src={imageSrc}
          alt={`${title} — ${lang === "ca" ? "projecte de PALSEC AGCY" : lang === "es" ? "proyecto de PALSEC AGCY" : "project by PALSEC AGCY"}`}
          className={`${mediaClass} transition-transform duration-500 ease-out group-hover:scale-[1.015]`}
          sizes="(max-width: 639px) calc((100vw - 44px) / 2), (max-width: 767px) calc((100vw - 52px) / 2), calc((100vw - 108px) / 6)"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : <div className="aspect-[3/4] w-full bg-page" aria-hidden="true" />}
      {comingSoon && (
        <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
          <span className={[
            "rounded-full border px-3 py-[6px]",
            "text-nav uppercase tracking-nav",
            "border-white/40 bg-black/30 text-white backdrop-blur-[6px]",
          ].join(" ")}>
            {lang === "ca" ? "Properament" : lang === "es" ? "Próximamente" : "Coming soon"}
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
  const context = EDITORIAL_CONTEXT[lang]
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
      <div className="h-full w-full overflow-y-auto px-4 pb-8 pt-[108px] sm:px-5 md:px-6">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 normal-case"><div><span className="editorial-eyebrow">PALSEC / {t(lang, "projects.title")}</span><h1 className="editorial-title">{EDITORIAL[lang].work}</h1></div><span className="text-[11px] text-ink/50">{String(PROJECTS.length).padStart(2, '0')} {t(lang, "projects.title")}</span></header>
        <div className="mb-10 max-w-[760px] normal-case"><p className="editorial-lead !mt-0">{context.projects}</p><p className="editorial-lead !mt-4">{context.collections}</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-6">
          {PROJECTS.map((p, index) => {
            const src = p.localImages?.thumb
              ? publicUrl(p.localImages.thumb)
              : undefined
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
                priority={index === 0}
              />
            )
          })}
        </div>
        <section className="editorial-section normal-case">
          <h2 className="editorial-heading">{lang === 'ca' ? 'Àmbit dels projectes' : lang === 'es' ? 'Alcance de los proyectos' : 'Project scope'}</h2>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">{projectSummaries.filter(project => project.lang === lang).map(project => <article key={project.slug}>
            <h3 className="text-[20px]"><Link to={`/${lang}/project/${project.slug}`} className="inline-flex min-h-12 items-center gap-4">{project.title} ↗</Link></h3>
            <p className="mt-2 text-[15px] leading-[1.8] text-ink/70">{project.intro}</p>
            <nav aria-label={`${project.title} — ${lang === 'ca' ? 'serveis' : lang === 'es' ? 'servicios' : 'services'}`} className="mt-3 flex flex-wrap gap-4 text-[12px]">{getCommercialSummaries(lang).filter(service => project.services.includes(service.id)).map(service => <Link key={service.id} to={service.path} className="inline-flex min-h-12 items-center underline underline-offset-4">{service.label}</Link>)}</nav>
          </article>)}</div>
        </section>
        <SiteFooter />
      </div>
    </PageFrame>
  )
}
