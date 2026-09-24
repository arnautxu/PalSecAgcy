import { useEffect, useMemo, useRef, useState } from "react"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { SiteFooter } from "@/components/SiteFooter"
import {
  PROJECTS,
  picsum,
  projectBySlug,
  type Project,
  type ProjectSlug,
} from "@/data/projects"
import { publicUrl } from "@/utils/publicUrl"
import { Picture } from "@/components/Picture"
import { LazyAutoplayVideo } from "@/components/LazyAutoplayVideo"
import { WebotecaGallery } from "@/components/WebotecaGallery"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import type { Lang } from "@/i18n/lang"
import { Seo } from "@/components/Seo"
import { getProjectSeoMeta, isPublishedProjectSlug } from "@/lib/seoMeta"
import { getProjectCase, PROJECT_CASE_LABELS, type ProjectCase } from "@/content/projectCases"
import { getCommercialPage } from "@/content/commercialPages"

function neighbors(current: ProjectSlug): { prev: Project; next: Project } {
  const activeProjects = PROJECTS.filter((project) => !project.comingSoon)
  const idx = activeProjects.findIndex((p) => p.slug === current)
  const prev = activeProjects[(idx - 1 + activeProjects.length) % activeProjects.length]!
  const next = activeProjects[(idx + 1) % activeProjects.length]!
  return { prev, next }
}

function imageSrc(keyOrPath: string, w: number, h: number) {
  if (keyOrPath.startsWith("/")) return publicUrl(keyOrPath)
  return picsum(keyOrPath, w, h)
}

function LogotecaGallery({
  slides,
  initialIndex = 0,
  onIndexChange,
  lang,
}: {
  slides: string[]
  initialIndex?: number
  onIndexChange: (idx: number) => void
  lang: Lang
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(initialIndex)
  const primary = slides.slice(0, 20)
  const extras = slides.slice(20)
  const scrollLockRef = useRef(false)
  const prevOverflowRef = useRef({ html: "", body: "" })
  const intro = getProjectCase("logoteca", lang)!.intro

  useEffect(() => {
    setActive(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const lock = () => {
      if (scrollLockRef.current) return
      scrollLockRef.current = true
      prevOverflowRef.current = { html: html.style.overflow, body: body.style.overflow }
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
    }

    const unlock = () => {
      if (!scrollLockRef.current) return
      scrollLockRef.current = false
      const { html: h, body: b } = prevOverflowRef.current
      html.style.overflow = h
      body.style.overflow = b
    }

    if (open) lock()
    else unlock()

    return () => {
      unlock()
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "Escape") setOpen(false)
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + slides.length) % slides.length)
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % slides.length)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, slides.length])

  useEffect(() => {
    onIndexChange(active)
  }, [active, onIndexChange])

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const distanceThreshold = 90
    const velocityThreshold = 520
    if (info.offset.x <= -distanceThreshold || info.velocity.x <= -velocityThreshold) {
      setActive((i) => (i + 1) % slides.length)
    } else if (info.offset.x >= distanceThreshold || info.velocity.x >= velocityThreshold) {
      setActive((i) => (i - 1 + slides.length) % slides.length)
    }
  }

  return (
    <>
      {/* 4 x 5 grid on desktop */}
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-4 text-nav uppercase tracking-nav opacity-60">{t(lang, "project.label")}</div>
        <h1 className="mb-3 text-[clamp(24px,4vw,48px)] font-normal leading-[1.05] tracking-[-0.03em] normal-case">{t(lang, "logoteca.title")}</h1>
        <p className="mb-8 max-w-[680px] text-[14px] leading-[1.7] text-ink/70 normal-case md:text-[16px]">{intro}</p>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {primary.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setActive(i)
                setOpen(true)
              }}
              className="group overflow-hidden rounded-[2px] border border-frame bg-white"
              aria-label={`${lang === "ca" ? "Obrir logotip" : lang === "es" ? "Abrir logotipo" : "Open logo"} ${i + 1}`}
            >
              <Picture
                src={imageSrc(s, 800, 800)}
                alt=""
                className="aspect-square w-full select-none object-contain bg-white p-4 transition-transform duration-200 group-hover:scale-[1.02]"
                sizes="(max-width: 767px) 50vw, 300px"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>

        {extras.length ? (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4">
            {extras.map((s, j) => {
              const idx = 20 + j
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setActive(idx)
                    setOpen(true)
                  }}
                  className="group overflow-hidden rounded-[2px] border border-frame bg-white"
                  aria-label={`${lang === "ca" ? "Obrir logotip" : lang === "es" ? "Abrir logotipo" : "Open logo"} ${idx + 1}`}
                >
                  <Picture
                    src={imageSrc(s, 1200, 900)}
                    alt=""
                    className="aspect-[16/10] w-full select-none object-contain bg-white p-6 transition-transform duration-200 group-hover:scale-[1.01]"
                    sizes="(max-width: 767px) 100vw, 600px"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ pointerEvents: open ? "auto" : "none" }}
            aria-label={lang === "ca" ? "Tancar" : lang === "es" ? "Cerrar" : "Close"}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative w-[min(92vw,1100px)] overflow-hidden rounded-[2px] border border-white/20 bg-white"
              initial={{ y: 12, scale: 0.99, filter: "blur(8px)" }}
              animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ y: 10, scale: 0.99, filter: "blur(8px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setOpen(false)} aria-label={lang === "ca" ? "Tancar galeria" : lang === "es" ? "Cerrar galería" : "Close gallery"} className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-frame bg-white text-ink">×</button>
              <motion.div
                key={`logoteca-${active}`}
                className="w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
                style={{ touchAction: "pan-y", cursor: "grab" }}
              >
                <Picture
                  src={imageSrc(slides[active]!, 1800, 1800)}
                  alt=""
                  className="h-[min(78vh,820px)] w-full select-none object-contain bg-white p-6"
                  sizes="min(92vw, 1100px)"
                  draggable={false}
                />
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                <button
                  type="button"
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[14px] uppercase tracking-nav text-ink backdrop-blur hover:bg-white"
                  onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
                  aria-label={lang === "ca" ? "Anterior" : lang === "es" ? "Anterior" : "Previous"}
                >
                  ‹
                </button>
                <div className="text-[12px] uppercase tracking-nav text-ink/70">
                  {active + 1} / {slides.length}
                </div>
                <button
                  type="button"
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[14px] uppercase tracking-nav text-ink backdrop-blur hover:bg-white"
                  onClick={() => setActive((i) => (i + 1) % slides.length)}
                  aria-label={lang === "ca" ? "Següent" : lang === "es" ? "Siguiente" : "Next"}
                >
                  ›
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
    </>
  )
}

// Kept as a small compatibility adapter for content consumers.
export function getProjectCopy(slug: ProjectSlug, lang: Lang) {
  const entry = getProjectCase(slug, lang)
  if (!entry) return null
  return {
    title: projectBySlug(slug)?.title ?? slug,
    body: [entry.intro, ...entry.sections.map((section) => section.body)],
    bullets: entry.deliverables,
  }
}

function ProjectStory({ entry, lang, includeIntro = true }: { entry: ProjectCase; lang: Lang; includeIntro?: boolean }) {
  const labels = PROJECT_CASE_LABELS[lang]
  return (
    <article className="normal-case text-[14px] leading-[1.8] tracking-normal text-ink/80 md:text-[15px]">
      <dl className="mb-7 grid gap-3 border-y border-frame py-4 text-[12px] leading-[1.7]">
        <div><dt className="text-ink/50">{labels.sector}</dt><dd>{entry.sector}</dd></div>
        <div><dt className="text-ink/50">{labels.scope}</dt><dd>{entry.discipline}</dd></div>
      </dl>
      {includeIntro ? <p className="mb-8">{entry.intro}</p> : null}
      {entry.sections.map((section) => (
        <section key={section.title} className="mb-7">
          <h2 className="mb-2 text-[16px] font-medium leading-[1.4] text-ink md:text-[18px]">{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}
      <section className="mb-7">
        <h2 className="mb-3 text-[16px] font-medium leading-[1.4] text-ink md:text-[18px]">{labels.deliverables}</h2>
        <ul className="list-disc space-y-1 pl-5">
          {entry.deliverables.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <nav aria-label={labels.services} className="border-t border-frame pt-5">
        <h2 className="mb-3 text-[16px] font-medium text-ink">{labels.services}</h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-3">
          {entry.services.map((id) => {
            const service = getCommercialPage(id, lang)
            return <li key={id}><Link to={service.path} className="underline underline-offset-4 transition-opacity hover:opacity-60">{service.label}</Link></li>
          })}
        </ul>
      </nav>
    </article>
  )
}

export function ProjectDetail() {
  const lang = useLang()
  const { slug } = useParams()
  const { pathname } = useLocation()
  const project = slug ? projectBySlug(slug) : undefined
  const [index, setIndex] = useState(0)

  const { prev, next } = useMemo(
    () => (project ? neighbors(project.slug) : { prev: PROJECTS[0]!, next: PROJECTS[1]! }),
    [project],
  )

  const others = useMemo(
    () => PROJECTS.filter((p) => p.slug !== project?.slug && !p.comingSoon),
    [project],
  )

  useEffect(() => {
    setIndex(0)
  }, [slug])

  if (!slug || !project) {
    return <Navigate to={`/${lang}/projects`} replace />
  }

  // Projects without gallery media return to the projects grid.
  if (!project.localImages?.slides?.length && !project.carouselSeeds.length) {
    return <Navigate to={`/${lang}/projects`} replace />
  }

  const slides = project.localImages?.slides ?? project.carouselSeeds
  const safeIndex = ((index % slides.length) + slides.length) % slides.length
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    // Tune for mouse + touch. Trigger on either distance or quick fling.
    const distanceThreshold = 90
    const velocityThreshold = 520
    if (info.offset.x <= -distanceThreshold || info.velocity.x <= -velocityThreshold) goNext()
    else if (info.offset.x >= distanceThreshold || info.velocity.x >= velocityThreshold) goPrev()
  }
  const copy = getProjectCopy(project.slug, lang)
  const projectCase = getProjectCase(project.slug, lang)
  const twoCol =
    project.slug === "vira" ||
    project.slug === "galeon" ||
    project.slug === "arkuos" ||
    project.slug === "el-xiringuito" ||
    project.slug === "enteza" ||
    project.slug === "gent-gran-de-calonge-i-sant-antoni" ||
    project.slug === "estudi-dental-carrera"

  const seo = isPublishedProjectSlug(project.slug)
    ? getProjectSeoMeta(project.slug, lang)
    : { title: `${project.title} | PALSEC AGCY`, description: copy?.body[0] ?? project.title }
  const firstSlide = project.localImages?.slides?.[0]
  const ogImage = firstSlide
    ? `https://www.palsec.agency${firstSlide}`
    : undefined

  return (
    <PageFrame>
      <Seo
        title={seo.title}
        bare
        description={seo.description}
        path={pathname}
        lang={lang}
        image={ogImage}
        type="article"
        project={project}
      />
      <div className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 pt-[92px]">
          {project.slug === "weboteca" ? (
            <WebotecaGallery lang={lang} />
          ) : project.slug === "logoteca" ? (
            <>
              <LogotecaGallery slides={slides} initialIndex={safeIndex} onIndexChange={setIndex} lang={lang} />
              {projectCase ? <div className="mx-auto mt-12 w-full max-w-[760px]"><ProjectStory entry={projectCase} lang={lang} includeIntro={false} /></div> : null}
            </>
          ) : (
            twoCol ? (
              <div className="mx-auto grid w-full max-w-[1200px] gap-8 md:grid-cols-2">
                {/* LEFT: MEDIA */}
                <div className="min-w-0">
                  <motion.div
                    key={`${project.slug}-${safeIndex}`}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full overflow-hidden rounded-[2px] border border-frame bg-white"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    whileTap={{ cursor: "grabbing" }}
                    style={{ touchAction: "pan-y", cursor: "grab" }}
                  >
                    <Picture
                      src={imageSrc(slides[safeIndex]!, 1600, 900)}
                      alt={`${project.title} — ${copy?.bullets[0] ?? t(lang, "project.label")} (${t(lang, "project.label")} ${safeIndex + 1})`}
                      className="block max-h-[70vh] w-full select-none object-contain bg-white"
                      sizes="(max-width: 767px) calc(100vw - 40px), 600px"
                      fetchPriority={safeIndex === 0 ? "high" : "auto"}
                      decoding="async"
                      draggable={false}
                    />
                  </motion.div>

                  <div className="mt-4 flex items-center justify-center gap-10 text-[18px] font-light leading-none text-ink">
                    <button
                      type="button"
                      className="inline-flex min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center px-2 transition-opacity duration-200 hover:opacity-40"
                      aria-label={lang === "ca" ? "Imatge anterior" : lang === "es" ? "Imagen anterior" : "Previous image"}
                      onClick={goPrev}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="inline-flex min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center px-2 transition-opacity duration-200 hover:opacity-40"
                      aria-label={lang === "ca" ? "Imatge següent" : lang === "es" ? "Imagen siguiente" : "Next image"}
                      onClick={goNext}
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* RIGHT: INFO */}
                <div className="min-w-0">
                  <div className="mb-3 text-nav uppercase tracking-nav opacity-60">{t(lang, "project.label")}</div>
                  <h1 className="mb-6 text-[clamp(24px,3vw,40px)] font-normal leading-[1.1] tracking-[-0.025em]">{project.title}</h1>

                  {projectCase ? <ProjectStory entry={projectCase} lang={lang} /> : null}

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {slides.map((seed, i) => (
                      <button
                        key={seed}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-[92px] min-w-[44px] cursor-pointer overflow-hidden rounded-[2px] border bg-white transition-opacity duration-200 hover:opacity-100 ${
                          i === safeIndex ? "border-ink opacity-100" : "border-frame opacity-60"
                        }`}
                        aria-label={`${lang === "ca" ? "Imatge" : lang === "es" ? "Imagen" : "Image"} ${i + 1}`}
                        aria-current={i === safeIndex ? "true" : undefined}
                      >
                        <Picture
                          src={imageSrc(seed, 320, 180)}
                          alt=""
                          className="h-full w-auto object-contain bg-white"
                          sizes="76px"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center justify-between text-nav uppercase tracking-nav">
                    <Link
                      to={`/${lang}/project/${prev.slug}`}
                      className="transition-opacity duration-200 hover:opacity-40"
                    >
                      {t(lang, "project.back")}
                    </Link>
                    <Link
                      to={`/${lang}/project/${next.slug}`}
                      className="transition-opacity duration-200 hover:opacity-40"
                    >
                      {t(lang, "project.next")}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <motion.div
                  key={`${project.slug}-${safeIndex}`}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-[75vw] max-w-[1200px] overflow-hidden rounded-[2px] border border-frame bg-white"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={handleDragEnd}
                  whileTap={{ cursor: "grabbing" }}
                  style={{ touchAction: "pan-y", cursor: "grab" }}
                >
                  <Picture
                    src={imageSrc(slides[safeIndex]!, 1600, 900)}
                    alt={`${project.title} — ${t(lang, "project.label")} ${safeIndex + 1}`}
                    className="aspect-video w-full select-none object-cover"
                    sizes="75vw"
                    fetchPriority={safeIndex === 0 ? "high" : "auto"}
                    decoding="async"
                    draggable={false}
                  />
                </motion.div>
              </div>
            )
          )}
          <div className="mx-auto w-full max-w-[1200px]"><SiteFooter /></div>
        </div>

        {project.slug !== "weboteca" && <div className="mt-auto shrink-0 border-t border-frame px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-1">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/${lang}/project/${p.slug}`}
                className="w-[76px] shrink-0"
                onClick={() => setIndex(0)}
              >
                <div className="overflow-hidden rounded-[2px] border border-frame bg-white">
                  {p.localImages?.thumbVideo ? (
                    <LazyAutoplayVideo
                      className="aspect-[3/4] w-full object-cover"
                      src={publicUrl(p.localImages.thumbVideo).replace(/\.mp4$/i, ".160.mp4")}
                      poster={p.localImages.thumb
                        ? publicUrl(p.localImages.thumb).replace(/\.(png|jpe?g|webp)$/i, ".160.webp")
                        : undefined}
                      aria-label={`${p.title} — ${lang === "ca" ? "projecte relacionat" : lang === "es" ? "proyecto relacionado" : "related project"}`}
                    />
                  ) : (
                    <Picture
                      src={
                        p.localImages?.thumb
                          ? publicUrl(p.localImages.thumb)
                          : picsum(p.thumbSeed, 460, 259)
                      }
                      alt=""
                      className="aspect-[3/4] w-full object-contain bg-white"
                      sizes="76px"
                      loading="lazy"
                    />
                  )}
                </div>
                <p className="mt-[6px] text-[7px] uppercase leading-[1.4] tracking-nav text-ink">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>}
      </div>
    </PageFrame>
  )
}
