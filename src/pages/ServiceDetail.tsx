import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import { SiteFooter } from "@/components/SiteFooter"
import { PageFrame } from "@/components/PageFrame"
import { Seo } from "@/components/Seo"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { getCommercialPages, type CommercialId } from "@/content/commercialPages"
import { Arrow, Disclosure, WorkStrip } from "@/components/Editorial"
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
      <article className="editorial-scroll"><div className="editorial-wrap">
        <header><Link to={`/${lang}/services`} className="editorial-eyebrow">PALSEC / {lang === 'en' ? 'Services' : lang === 'es' ? 'Servicios' : 'Serveis'}</Link><h1 className="editorial-title">{page.title}</h1><p className="editorial-lead">{page.intro}</p><a href={mailtoProjectInquiryHref(lang)} className="editorial-cta mt-8">{labels.contact}<Arrow /></a></header>
        <section className="editorial-section"><span className="editorial-eyebrow">01 / {labels.related}</span><WorkStrip slugs={page.relatedProjects.slice(0,2)} lang={lang} /></section>
        <section className="editorial-section editorial-split"><div><span className="editorial-eyebrow">02 / {labels.forWhom}</span><h2 className="editorial-heading">{page.forWhom}</h2></div><div><h2 className="editorial-eyebrow">{labels.deliverables}</h2><ul className="mb-10 space-y-3 text-[18px]">{page.deliverables.map(item => <li key={item}>{item}</li>)}</ul><Disclosure title={labels.decisions}>{page.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</Disclosure><Disclosure title={labels.budget}><p>{page.budget}</p></Disclosure><Disclosure title={labels.process}><ol className="space-y-3">{page.process.map((item,index) => <li key={item}>{String(index+1).padStart(2,'0')} / {item}</li>)}</ol></Disclosure></div></section>
        <section className="editorial-section editorial-split"><h2 className="editorial-heading">{labels.faq}</h2><div>{page.faqs.map(faq => <Disclosure key={faq.question} title={faq.question}><p>{faq.answer}</p></Disclosure>)}</div></section>
        <section className="editorial-section editorial-split"><h2 className="editorial-heading">{labels.local}</h2><div><p className="editorial-copy text-ink/70">{LOCAL_CONTEXT[lang][serviceSlug]}</p><nav className="mt-6 flex flex-wrap gap-6">{localPages.map(item => <Link key={item.id} to={item.path} className="inline-flex min-h-12 items-center gap-4 text-[14px]">{item.label}<Arrow /></Link>)}</nav></div></section>
        <a href={mailtoProjectInquiryHref(lang)} className="editorial-cta">{labels.contact}<Arrow /></a><SiteFooter />
      </div></article>
    </PageFrame>
  )
}
