import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import { SiteFooter } from "@/components/SiteFooter"
import { PageFrame } from "@/components/PageFrame"
import { Seo } from "@/components/Seo"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { getCommercialPages, type CommercialId } from "@/content/commercialPages"
import { projectBySlug } from "@/data/projects"
import { getServicePage, isServiceSlug, type ServiceSlug } from "@/content/servicePages"
import type { Lang } from "@/i18n/lang"
import { useLang } from "@/i18n/useLang"

const LABELS = {
  ca: { forWhom: "PER A QUI", decisions: "QUÈ RESOLEM", local: "DEL SERVEI AL PROJECTE", budget: "PRESSUPOST I ABAST", process: "COM TREBALLEM", deliverables: "ENTREGABLES", related: "PROJECTES RELACIONATS", faq: "PREGUNTES FREQÜENTS", contact: "PARLEM DEL PROJECTE" },
  en: { forWhom: "WHO IT IS FOR", decisions: "WHAT WE SOLVE", local: "FROM SERVICE TO PROJECT", budget: "BUDGET AND SCOPE", process: "HOW WE WORK", deliverables: "DELIVERABLES", related: "RELATED PROJECTS", faq: "FREQUENTLY ASKED QUESTIONS", contact: "DISCUSS YOUR PROJECT" },
  es: { forWhom: "PARA QUIÉN", decisions: "QUÉ RESOLVEMOS", local: "DEL SERVICIO AL PROYECTO", budget: "PRESUPUESTO Y ALCANCE", process: "CÓMO TRABAJAMOS", deliverables: "ENTREGABLES", related: "PROYECTOS RELACIONADOS", faq: "PREGUNTAS FRECUENTES", contact: "HABLEMOS DEL PROYECTO" },
} as const

const LOCAL_DESTINATIONS: Record<ServiceSlug, CommercialId[]> = {
  "brand-strategy": ["branding"],
  "branding-visual-identity": ["branding", "graphic-design"],
  "web-design-digital-products": ["web-design", "web-development"],
}

const LOCAL_CONTEXT: Record<Lang, Record<ServiceSlug, string>> = {
  ca: {
    "brand-strategy": "Quan l'estratègia ja té una direcció clara, la traslladem a una identitat i a les aplicacions que el projecte necessita. A les pàgines locals expliquem com concretem aquest pas per a marques de Girona i la Costa Brava.",
    "branding-visual-identity": "Una identitat s'ha de provar en peces reals. Consulta com definim l'abast del branding i del disseny gràfic per a projectes de Girona i la Costa Brava.",
    "web-design-digital-products": "Si necessites una web concreta, detallem per separat el disseny, el desenvolupament i les responsabilitats de publicació per a projectes de Girona i la Costa Brava.",
  },
  es: {
    "brand-strategy": "Cuando la estrategia tiene una dirección clara, la trasladamos a una identidad y a las aplicaciones que necesita el proyecto. En las páginas locales explicamos cómo concretamos ese paso para marcas de Girona y Costa Brava.",
    "branding-visual-identity": "Una identidad debe probarse en piezas reales. Consulta cómo definimos el alcance del branding y del diseño gráfico para proyectos de Girona y Costa Brava.",
    "web-design-digital-products": "Si necesitas una web concreta, detallamos por separado el diseño, el desarrollo y las responsabilidades de publicación para proyectos de Girona y Costa Brava.",
  },
  en: {
    "brand-strategy": "Once the strategy has a clear direction, we bring it into the identity and applications the project needs. The local service page explains how we scope that work for brands in Girona and Costa Brava.",
    "branding-visual-identity": "An identity needs to work in real applications. Explore how we scope branding and graphic design projects in Girona and Costa Brava.",
    "web-design-digital-products": "For a specific website, our local service pages set out the design, development and publishing responsibilities for projects in Girona and Costa Brava.",
  },
}

export function ServiceDetail() {
  const lang = useLang()
  const { serviceSlug } = useParams()
  const { pathname } = useLocation()

  if (!isServiceSlug(serviceSlug)) return <Navigate to={`/${lang}/services`} replace />

  const page = getServicePage(serviceSlug, lang)
  const labels = LABELS[lang]
  const localPages = getCommercialPages(lang).filter((item) => LOCAL_DESTINATIONS[serviceSlug].includes(item.id))

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
          <p className="mb-4 text-nav uppercase tracking-nav text-ink/65">PALSEC AGCY · {lang === "ca" ? "SERVEIS" : lang === "es" ? "SERVICIOS" : "SERVICES"}</p>
          <h1 className="max-w-[780px] text-[clamp(24px,4vw,54px)] font-normal leading-[1.04] tracking-[-0.035em] text-ink normal-case">
            {page.title}
          </h1>
          <p className="mt-6 max-w-[720px] text-[15px] leading-[1.65] text-ink/85 normal-case md:text-[18px]">
            {page.intro}
          </p>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/65">{labels.forWhom}</h2>
            <p className="max-w-[680px] text-[14px] leading-[1.7] text-ink/80 normal-case md:text-[16px]">{page.forWhom}</p>
          </section>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/65">{labels.decisions}</h2>
            <div className="space-y-4">
              {page.details.map((paragraph) => (
                <p key={paragraph} className="max-w-[680px] text-[14px] leading-[1.7] text-ink/80 normal-case md:text-[16px]">{paragraph}</p>
              ))}
            </div>
          </section>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/65">{labels.local}</h2>
            <div className="max-w-[680px] space-y-4 normal-case">
              <p className="text-[14px] leading-[1.7] text-ink/80 md:text-[16px]">{LOCAL_CONTEXT[lang][serviceSlug]}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {localPages.map((item) => (
                  <li key={item.id}>
                    <Link to={item.path} className="text-[14px] underline decoration-frame underline-offset-4 transition-colors hover:decoration-ink md:text-[16px]">
                      {item.label} <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="my-10 h-px bg-frame" />

          <section className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2 className="text-nav uppercase tracking-nav text-ink/65">{labels.budget}</h2>
            <p className="max-w-[680px] text-[14px] leading-[1.7] text-ink/80 normal-case md:text-[16px]">{page.budget}</p>
          </section>

          <div className="my-10 h-px bg-frame" />

          <div className="grid gap-10 md:grid-cols-2">
            <section>
              <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.process}</h2>
              <ol className="space-y-3 normal-case">
                {page.process.map((item, index) => (
                  <li key={item} className="flex gap-4 text-[14px] leading-[1.6] md:text-[15px]">
                    <span className="text-ink/65">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.deliverables}</h2>
              <ul className="space-y-3 normal-case">
                {page.deliverables.map((item) => (
                  <li key={item} className="text-[14px] leading-[1.6] md:text-[15px]">— {item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="my-10 h-px bg-frame" />

          <section>
            <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.faq}</h2>
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
            <h2 className="mb-5 text-nav uppercase tracking-nav text-ink/65">{labels.related}</h2>
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

          <a href={mailtoProjectInquiryHref(lang)} className="mt-12 inline-flex min-h-12 items-center rounded-full bg-[#d50000] px-6 text-[11px] uppercase tracking-nav text-white transition-opacity hover:opacity-75">
            {labels.contact}
          </a>
          <SiteFooter />
        </div>
      </article>
    </PageFrame>
  )
}
