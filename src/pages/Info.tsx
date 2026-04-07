import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import { picsum } from "@/data/projects"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
}

export function Info() {
  return (
    <PageFrame>
      <div className="flex h-full min-h-0 flex-col md:flex-row">
        <motion.div
          className="box-border flex w-full flex-col gap-4 px-6 py-8 md:w-[40%] md:py-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="font-script text-[28px] leading-none text-ink md:text-[32px]">
            BIO
          </motion.p>
          <motion.p
            variants={item}
            className="text-bodymd uppercase leading-[1.6] tracking-nav text-ink md:text-body"
          >
            ION ANDRONIKOS (ATHENS, 1991) IS A GREEK ART-HOUSE DIRECTOR WORKING ACROSS SHORT FILMS,
            DOCUMENTARIES, EXPERIMENTAL PIECES, INSTALLATIONS, FASHION FILMS, MUSIC VIDEOS, TRAILERS,
            AND BRAND COMMISSIONS. HIS PRACTICE FUSES RITUAL, ARCHITECTURE, AND INTIMATE PERFORMANCE,
            CRAFTING POETIC IMAGES ROOTED IN MEDITERRANEAN LIGHT AND URBAN MEMORY.
          </motion.p>
          <motion.hr variants={item} className="border-0 border-t border-frame" />
          <motion.p variants={item} className="text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            GREEK FILM DIRECTOR · ART-HOUSE & CROSS-FORMAT VIDEO
          </motion.p>
          <motion.p variants={item} className="text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            REPRESENTATION: STUDIO
          </motion.p>
          <motion.p variants={item} className="text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            BASED IN ATHENS · AVAILABLE FOR INTERNATIONAL COLLABORATIONS
          </motion.p>
          <motion.a
            variants={item}
            href="mailto:THEON@INFO.COM"
            className="text-bodymd uppercase leading-[1.6] tracking-nav text-ink underline-offset-4 hover:underline md:text-body"
          >
            THEON@INFO.COM
          </motion.a>
        </motion.div>

        <div className="flex flex-1 items-center justify-center px-6 py-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut", delay: 0.08 }}
            className="w-[min(40vw,420px)] shrink-0 overflow-hidden rounded-[2px] border border-frame bg-white"
          >
            <img
              src={picsum("portrait-theon-field", 800, 1200)}
              alt=""
              className="aspect-[2/3] h-auto w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </PageFrame>
  )
}
