import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { BrandWatermark } from "@/components/BrandWatermark"
import { PROJECTS, picsum } from "@/data/projects"

function ProjectCard({
  slug,
  title,
  imageSrc,
  videoSrc,
}: {
  slug: string
  title: string
  imageSrc: string
  videoSrc?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const titleTextRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState(false)
  const [shiftPx, setShiftPx] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const titleWrap = titleWrapRef.current
    const titleText = titleTextRef.current
    if (!wrap || !titleWrap || !titleText) return

    const compute = () => {
      const w = wrap.getBoundingClientRect().width
      const tw = titleText.getBoundingClientRect().width
      setShiftPx(Math.max(0, Math.round(w - tw)))
    }

    compute()

    const ro = new ResizeObserver(() => compute())
    ro.observe(wrap)
    ro.observe(titleWrap)
    ro.observe(titleText)
    return () => ro.disconnect()
  }, [])

  return (
    <Link
      to={`/project/${slug}`}
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
            className="aspect-[3/4] w-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div ref={titleWrapRef} className="mt-[6px] overflow-hidden">
        <span
          ref={titleTextRef}
          className="inline-block text-nav uppercase leading-[1.6] tracking-nav text-ink will-change-transform"
          style={{
            transform: hovered ? `translateX(${shiftPx}px)` : "translateX(0px)",
            transition: "transform 420ms cubic-bezier(0.40, 0.24, 0.40, 1)",
          }}
        >
          {title}
        </span>
      </div>
    </Link>
  )
}

export function Projects() {
  return (
    <PageFrame className="relative">
      <BrandWatermark variant="light" />
      <div className="h-full w-full overflow-y-auto px-6 py-8">
        <div className="mb-6 text-nav opacity-60">PROJECTS</div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((p) => {
            const src = p.localImages?.thumb ? p.localImages.thumb : picsum(p.thumbSeed, 920, 518)
            const video = p.localImages?.thumbVideo

            return (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                imageSrc={src}
                videoSrc={video}
              />
            )
          })}
        </div>
      </div>
    </PageFrame>
  )
}

