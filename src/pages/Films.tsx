import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { FILMS_ORDER, picsum, projectBySlug } from "@/data/projects"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
}

const row = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
}

export function Films() {
  return (
    <PageFrame>
      <div className="flex h-full min-h-0 w-full">
        <div className="h-full w-[320px] shrink-0 overflow-y-auto border-r border-frame px-5 py-6">
          <motion.ul
            className="flex flex-col gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {FILMS_ORDER.map((slug) => {
              const p = projectBySlug(slug)
              if (!p) return null
              return (
                <motion.li key={slug} variants={row}>
                  <Link to={`/project/${p.slug}`} className="block">
                    <div className="w-full overflow-hidden rounded-[2px] border border-frame bg-white">
                      <img
                        src={picsum(p.thumbSeed, 640, 360)}
                        alt=""
                        className="aspect-video w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-[6px] text-nav uppercase leading-[1.6] tracking-nav text-ink">
                      {p.title}
                    </p>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
        <div className="hidden flex-1 bg-white lg:block" aria-hidden />
      </div>
    </PageFrame>
  )
}
