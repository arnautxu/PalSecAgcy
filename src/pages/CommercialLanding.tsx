import { Link, Navigate, useLocation } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { Picture } from "@/components/Picture"
import { Seo } from "@/components/Seo"
import { SiteFooter } from "@/components/SiteFooter"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { getCommercialPageByPath, getCommercialPages } from "@/content/commercialPages"
import { projectBySlug } from "@/data/projects"
import { useLang } from "@/i18n/useLang"
import { publicUrl } from "@/utils/publicUrl"

const LABELS = {
  ca: { services: "Serveis", projects: "Veure projectes", process: "Com treballem", deliverables: "Què pot incloure el projecte", scope: "Pressupost i abast", faq: "Preguntes freqüents", related: "Serveis que es complementen", view: "Explorar el projecte" },
  es: { services: "Servicios", projects: "Ver proyectos", process: "Cómo trabajamos", deliverables: "Qué puede incluir el proyecto", scope: "Presupuesto y alcance", faq: "Preguntas frecuentes", related: "Servicios que se complementan", view: "Explorar el proyecto" },
  en: { services: "Services", projects: "View projects", process: "How we work", deliverables: "What the project can include", scope: "Budget and scope", faq: "Frequently asked questions", related: "Complementary services", view: "Explore the project" },
} as const

const paragraphClass = "max-w-[720px] text-[14px] leading-[1.8] text-ink/80 normal-case md:text-[16px]"

export function CommercialLanding() {
  const lang = useLang()
  const { pathname } = useLocation()
  const page = getCommercialPageByPath(pathname)
  if (!page) return <Navigate to={`/${lang}/services`} replace />

  const labels = LABELS[lang]
  const relatedServices = getCommercialPages(lang).filter((service) => service.id !== page.id)

  return (
    <PageFrame className="relative">
      <Seo title={page.seoTitle} bare description={page.description} path={page.path} lang={lang} />
      <article key={page.path} className="h-full w-full overflow-y-auto px-4 pb-28 pt-[92px] sm:px-5 md:px-6">
        <div className="mx-auto max-w-[980px]">
          <nav aria-label={labels.services} className="mb-6 text-nav uppercase tracking-nav text-ink/65">
            <Link to={`/${lang}/services`} className="transition-colors hover:text-ink">PALSEC AGCY · {labels.services}</Link>
          </nav>
          <header>
            <h1 className="max-w-[850px] text-[clamp(28px,4.6vw,58px)] font-normal leading-[1.05] tracking-[-0.035em] text-ink normal-case">{page.title}</h1>
            <p className="mt-6 max-w-[760px] text-[15px] leading-[1.7] text-ink/80 normal-case md:text-[18px]">{page.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href={mailtoProjectInquiryHref(lang)} className="inline-flex min-h-12 items-center rounded-full bg-[#d50000] px-6 text-[11px] uppercase tracking-nav text-white transition-opacity hover:opacity-75">{page.ctaLabel}</a>
              <a href="#commercial-projects" className="inline-flex min-h-12 items-center px-2 text-[11px] uppercase tracking-nav underline decoration-frame underline-offset-4 hover:decoration-ink">{labels.projects} <span className="ml-2" aria-hidden="true">↓</span></a>
            </div>
          </header>

          <div className="mt-14 space-y-12">
            {page.sections.map((section, index) => (
              <section key={section.title} className="grid gap-5 border-t border-frame pt-7 md:grid-cols-[220px_1fr] md:gap-10">
                <div>
                  <p aria-hidden="true" className="mb-3 text-[11px] tracking-nav text-ink/65">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="text-[18px] font-normal leading-[1.35] tracking-[-0.02em] normal-case md:text-[20px]">{section.title}</h2>
                </div>
                <div className="space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className={paragraphClass}>{paragraph}</p>)}</div>
              </section>
            ))}
          </div>

          <section className="mt-14 border-t border-frame pt-7">
            <h2 className="mb-7 text-nav uppercase tracking-nav text-ink/65">{labels.process}</h2>
            <ol className="grid gap-7 sm:grid-cols-2">
              {page.process.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span aria-hidden="true" className="pt-1 text-[12px] text-ink/65">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="mb-2 text-[16px] font-normal normal-case">{step.title}</h3><p className="text-[14px] leading-[1.7] text-ink/75 normal-case">{step.text}</p></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 grid gap-8 border-t border-frame pt-7 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.deliverables}</h2>
              <ul className="space-y-3">
                {page.deliverables.map((deliverable) => <li key={deliverable} className="flex gap-3 text-[14px] leading-[1.6] normal-case"><span className="text-accent" aria-hidden="true">—</span>{deliverable}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.scope}</h2>
              <p className={paragraphClass}>{page.scope}</p>
            </div>
          </section>

          <section id="commercial-projects" className="mt-14 scroll-mt-24 border-t border-frame pt-7">
            <h2 className="text-[22px] font-normal tracking-[-0.025em] normal-case md:text-[28px]">{page.proofTitle}</h2>
            <p className={`mt-4 ${paragraphClass}`}>{page.proofIntro}</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.relatedProjects.map(({ slug, note }) => {
                const project = projectBySlug(slug)
                if (!project || project.comingSoon) return null
                const thumbnail = project.localImages?.thumb ?? project.localImages?.slides?.[0]
                return (
                  <Link key={slug} to={`/${lang}/project/${slug}`} className="group block border border-frame transition-colors hover:border-ink">
                    {thumbnail && <Picture src={publicUrl(thumbnail)} alt={project.title} loading="lazy" sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 310px" className="aspect-[4/3] w-full object-cover" />}
                    <div className="p-4">
                      <h3 className="text-[12px] font-normal uppercase tracking-nav">{project.title}</h3>
                      <p className="mt-3 text-[13px] leading-[1.7] text-ink/75 normal-case">{note}</p>
                      <p className="mt-4 text-[10px] uppercase tracking-nav">{labels.view} <span aria-hidden="true">↗</span></p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          <a href={mailtoProjectInquiryHref(lang)} className="mt-6 inline-flex min-h-12 items-center text-[13px] underline underline-offset-4">{page.ctaLabel} →</a>

          <section className="mt-14 border-t border-frame pt-7">
            <h2 className="mb-6 text-nav uppercase tracking-nav text-ink/65">{labels.faq}</h2>
            <div className="grid gap-7 md:grid-cols-2">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-[15px] font-normal leading-[1.5] normal-case">{faq.question}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-ink/75 normal-case">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-frame py-9">
            <h2 className="max-w-[720px] text-[clamp(24px,3vw,38px)] font-normal leading-[1.2] tracking-[-0.03em] normal-case">{page.ctaTitle}</h2>
            <p className={`mt-4 ${paragraphClass}`}>{page.ctaText}</p>
            <a href={mailtoProjectInquiryHref(lang)} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#d50000] px-6 text-[11px] uppercase tracking-nav text-white transition-opacity hover:opacity-75">{page.ctaLabel}</a>
          </section>

          <nav aria-label={labels.related} className="mt-3 border-t border-frame pt-7">
            <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.related}</h2>
            <ul className="flex flex-wrap gap-3">
              {relatedServices.map((service) => <li key={service.id}><Link to={service.path} className="inline-flex min-h-12 items-center rounded-full border border-frame px-4 text-[11px] uppercase tracking-nav transition-colors hover:border-ink">{service.label}</Link></li>)}
            </ul>
          </nav>
          <SiteFooter />
        </div>
      </article>
    </PageFrame>
  )
}
