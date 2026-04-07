import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import {
  PROJECTS,
  picsum,
  projectBySlug,
  type Project,
  type ProjectSlug,
} from "@/data/projects"

function neighbors(current: ProjectSlug): { prev: Project; next: Project } {
  const idx = PROJECTS.findIndex((p) => p.slug === current)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]!
  const next = PROJECTS[(idx + 1) % PROJECTS.length]!
  return { prev, next }
}

const miniLink =
  "text-nav uppercase tracking-nav text-ink transition-opacity duration-200 hover:opacity-40"

export function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = slug ? projectBySlug(slug) : undefined
  const [index, setIndex] = useState(0)

  const { prev, next } = useMemo(
    () => (project ? neighbors(project.slug) : { prev: PROJECTS[0]!, next: PROJECTS[1]! }),
    [project],
  )

  const others = useMemo(
    () => PROJECTS.filter((p) => p.slug !== project?.slug),
    [project],
  )

  useEffect(() => {
    setIndex(0)
  }, [slug])

  if (!slug || !project) {
    return <Navigate to="/films" replace />
  }

  const slides = project.carouselSeeds
  const safeIndex = ((index % slides.length) + slides.length) % slides.length

  return (
    <PageFrame>
      <div className="flex h-full min-h-0 flex-col pb-14">
        <header className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 px-5 pt-6 text-nav uppercase tracking-nav">
          <Link to="/" className={miniLink}>
            THEON KALLISTRATOS
          </Link>
          <span className="opacity-40">·</span>
          <Link to="/index" className={miniLink}>
            INDEX
          </Link>
          <span className="opacity-40">·</span>
          <Link to="/photography" className={miniLink}>
            PHOTO
          </Link>
          <span className="opacity-40">·</span>
          <Link to="/films" className={miniLink}>
            FILMS
          </Link>
          <span className="opacity-40">·</span>
          <Link to="/info" className={miniLink}>
            INFO
          </Link>
          <span className="opacity-40">·</span>
          <button type="button" className={miniLink} onClick={() => navigate(-1)}>
            EXIT
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-5 pb-4 pt-8">
          <motion.div
            key={`${project.slug}-${safeIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-[75vw] max-w-[1200px] overflow-hidden rounded-[2px] border border-frame bg-white"
          >
            <img
              src={picsum(slides[safeIndex]!, 1600, 900)}
              alt=""
              className="aspect-video w-full object-cover"
            />
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-10 text-[18px] font-light leading-none text-ink">
            <button
              type="button"
              className="px-2 transition-opacity duration-200 hover:opacity-40"
              aria-label="Previous image"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            >
              ‹
            </button>
            <button
              type="button"
              className="px-2 transition-opacity duration-200 hover:opacity-40"
              aria-label="Next image"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
            >
              ›
            </button>
          </div>

          <div className="mt-5 flex max-w-[75vw] flex-wrap items-center justify-center gap-2">
            {slides.map((seed, i) => (
              <button
                key={seed}
                type="button"
                onClick={() => setIndex(i)}
                className={`overflow-hidden rounded-[2px] border bg-white ${
                  i === safeIndex ? "border-ink opacity-100" : "border-frame opacity-60"
                }`}
                aria-label={`Image ${i + 1}`}
              >
                <img
                  src={picsum(seed, 160, 90)}
                  alt=""
                  className="aspect-video h-[44px] w-auto object-cover"
                />
              </button>
            ))}
          </div>

          <div className="mt-10 flex w-full max-w-[920px] items-center justify-between px-2 text-nav uppercase tracking-nav">
            <Link
              to={`/project/${prev.slug}`}
              className="transition-opacity duration-200 hover:opacity-40"
            >
              BACK
            </Link>
            <Link
              to={`/project/${next.slug}`}
              className="transition-opacity duration-200 hover:opacity-40"
            >
              NEXT
            </Link>
          </div>
        </div>

        <div className="border-t border-frame px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-1">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/project/${p.slug}`}
                className="w-[230px] shrink-0"
                onClick={() => setIndex(0)}
              >
                <div className="overflow-hidden rounded-[2px] border border-frame bg-white">
                  <img
                    src={picsum(p.thumbSeed, 460, 259)}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-[6px] text-nav uppercase leading-[1.6] tracking-nav text-ink">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
