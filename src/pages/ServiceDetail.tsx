import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { Seo } from "@/components/Seo"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { projectBySlug } from "@/data/projects"
import { getServicePage, isServiceSlug } from "@/content/servicePages"
import { useLang } from "@/i18n/useLang"

const LABELS = {
  ca: { forWhom: "PER A QUI", decisions: "QUÈ RESOLEM", budget: "PRESSUPOST I ABAST", process: "COM TREBALLEM", deliverables: "ENTREGABLES", related: "PROJECTES RELACIONATS", faq: "PREGUNTES FREQÜENTS", contact: "PARLEM DEL PROJECTE" },
  en: { forWhom: "WHO IT IS FOR", decisions: "WHAT WE SOLVE", budget: "BUDGET AND SCOPE", process: "HOW WE WORK", deliverables: "DELIVERABLES", related: "RELATED PROJECTS", faq: "FREQUENTLY ASKED QUESTIONS", contact: "DISCUSS YOUR PROJECT" },
  es: { forWhom: "PARA QUIÉN", decisions: "QUÉ RESOLVEMOS", budget: "PRESUPUESTO Y ALCANCE", process: "CÓMO TRABAJAMOS", deliverables: "ENTREGABLES", related: "PROYECTOS RELACIONADOS", faq: "PREGUNTAS FRECUENTES", contact: "HABLEMOS DEL PROYECTO" },
} as const

export function ServiceDetail() {
  const lang = useLang()
  const { serviceSlug } = useParams()
  const { pathname } = useLocation()

  if (!isServiceSlug(serviceSlug)) return <Navigate to={`/${lang}/services`} replace />

  const page = getServicePage(serviceSlug, lang)
  const labels = LABELS[lang]

  return (
    <PageFrame className="relative">
      <Seo
        title={page.seoTitle}
        bare
        description={page.description}
        path={pathname}
        lang={lang}
        service={page}
      />
      <article className="h-full w-full overflow-y-auto px-4 pb-28 pt-[92px] sm:px-5 md:px-6">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-nav uppercase tracking-nav text-ink/55">PALSEC AGCY · SERVICES</p>
          <h1 className="max-w-[780px] text-[clamp(24px,4vw,54px)] font-normal leading-[1.04] tracking-[-0.035em] text-ink normal-case">
            {page.title}
          </h1>
          <p className="mt-6 max-w-[720px] text-[15px] leading-[1.65] text-ink/85 normal-case md:text-[18px]">
            {page.intro}
          </p>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/55">{labels.forWhom}</h2>
            <p className="max-w-[680px] text-[14px] leading-[1.7] text-ink/80 normal-case md:text-[16px]">{page.forWhom}</p>
          </section>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/55">{labels.decisions}</h2>
            <div className="space-y-4">
              {page.details.map((paragraph) => (
                <p key={paragraph} className="max-w-[680px] text-[14px] leading-[1.7] text-ink/80 normal-case md:text-[16px]">{paragraph}</p>
              ))}
            </div>
          </section>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/55">{labels.budget}</h2>
            <p className="max-w-[680px] text-[14px] leading-[1.7] text-ink/80 normal-case md:text-[16px]">{page.budget}</p>
          </section>

          <div className="my-10 h-px bg-frame" />

          <div className="grid gap-10 md:grid-cols-2">
            <section>
              <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/55">{labels.process}</h2>
              <ol className="space-y-3 normal-case">
                {page.process.map((item, index) => (
                  <li key={item} className="flex gap-4 text-[14px] leading-[1.6] md:text-[15px]">
                    <span className="text-ink/40">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/55">{labels.deliverables}</h2>
              <ul className="space-y-3 normal-case">
                {page.deliverables.map((item) => (
                  <li key={item} className="text-[14px] leading-[1.6] md:text-[15px]">— {item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="my-10 h-px bg-frame" />

          <section>
            <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/55">{labels.faq}</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="border-t border-frame pt-4">
                  <h3 className="text-[12px] font-normal leading-[1.5] tracking-nav">{faq.question}</h3>
                  <p className="mt-3 text-[13px] leading-[1.7] text-ink/70 normal-case md:text-[14px]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="my-10 h-px bg-frame" />

          <section>
            <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/55">{labels.related}</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedProjects.map((slug) => {
                const project = projectBySlug(slug)
                if (!project) return null
                return (
                  <Link key={slug} to={`/${lang}/project/${slug}`} className="rounded-full border border-frame px-4 py-3 text-[11px] uppercase tracking-nav transition-colors hover:border-ink">
                    {project.title}
                  </Link>
                )
              })}
            </div>
          </section>

          <a href={mailtoProjectInquiryHref(lang)} className="mt-12 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-[11px] uppercase tracking-nav text-white transition-opacity hover:opacity-75">
            {labels.contact}
          </a>
        </div>
      </article>
    </PageFrame>
  )
}
