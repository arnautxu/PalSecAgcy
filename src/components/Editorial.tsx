import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Picture } from './Picture'
import { projectBySlug, type ProjectSlug } from '@/data/projects'
import type { Lang } from '@/i18n/lang'

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [12, 0], opacity: [.85, 1] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, ease: [.32, .72, 0, 1] }}>{children}</motion.div>
}
export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  return <details className="editorial-disclosure"><summary><span>{title}</span><span className="disclosure-mark" aria-hidden="true">+</span></summary><div className="disclosure-body">{children}</div></details>
}
export function Arrow({ down = false }: { down?: boolean }) {
  return <span className="editorial-arrow" aria-hidden="true">{down ? '↓' : '↗'}</span>
}
export function WorkStrip({ slugs, lang }: { slugs: readonly string[]; lang: Lang }) {
  return <div className="editorial-work-grid">{slugs.map(slug => {
    const project = projectBySlug(slug as ProjectSlug)
    const image = project?.localImages?.thumb ?? project?.localImages?.slides?.[0]
    if (!project || project.comingSoon || !image) return null
    return <Link className="editorial-work" key={slug} to={`/${lang}/project/${slug}`}><div className="editorial-image-shell"><Picture src={image} alt={project.title} loading="lazy" sizes="(max-width: 767px) 90vw, 430px" className="aspect-[4/3] w-full object-cover" /></div><span>{project.title}<span aria-hidden="true">↗</span></span></Link>
  })}</div>
}
