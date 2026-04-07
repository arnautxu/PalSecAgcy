import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { PHOTO_GRID, picsum } from "@/data/projects"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

const cell = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
}

export function Photography() {
  return (
    <PageFrame>
      <div className="box-border h-full w-full overflow-y-auto px-6 py-8">
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
          style={{ gap: "24px" }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {PHOTO_GRID.map((item) => (
            <motion.div key={`${item.label}-${item.seed}`} variants={cell}>
              <Link to={`/project/${item.slug}`} className="block">
                <div className="overflow-hidden rounded-[2px] border border-frame bg-white">
                  <img
                    src={picsum(item.seed, 640, 427)}
                    alt=""
                    className="aspect-[3/2] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-[6px] text-nav uppercase leading-[1.6] tracking-nav text-ink">
                  {item.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageFrame>
  )
}
