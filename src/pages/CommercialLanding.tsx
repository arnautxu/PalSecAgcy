import { Link, Navigate, useLocation } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { Arrow, Disclosure, Reveal, WorkStrip } from "@/components/Editorial"
import { Seo } from "@/components/Seo"
import { SiteFooter } from "@/components/SiteFooter"
import { useInquiry } from "@/components/Inquiry"
import { getCommercialPageByPath, getCommercialPages } from "@/content/commercialPages"
import { getGuideSummaries } from "@/content/guideCatalog"
import { getServiceSummaries } from "@/content/serviceCatalog"
import { SERVICE_DISCIPLINES, SERVICE_ORIENTATION } from "@/content/serviceOrientation"
import { useLang } from "@/i18n/useLang"

const LABELS = {
  ca: { services: "Serveis", projects: "Veure projectes", process: "Com treballem", deliverables: "Què pot incloure el projecte", scope: "Pressupost i abast", faq: "Preguntes freqüents", related: "Serveis que es complementen", view: "Explorar el projecte" },
  es: { services: "Servicios", projects: "Ver proyectos", process: "Cómo trabajamos", deliverables: "Qué puede incluir el proyecto", scope: "Presupuesto y alcance", faq: "Preguntas frecuentes", related: "Servicios que se complementan", view: "Explorar el proyecto" },
  en: { services: "Services", projects: "View projects", process: "How we work", deliverables: "What the project can include", scope: "Budget and scope", faq: "Frequently asked questions", related: "Complementary services", view: "Explore the project" },
} as const


export function CommercialLanding() {
  const lang = useLang()
  const openInquiry = useInquiry()
  const { pathname } = useLocation()
  const page = getCommercialPageByPath(pathname)
  if (!page) return <Navigate to={`/${lang}/services`} replace />

  const labels = LABELS[lang]
  const guides = lang === "en" ? [] : getGuideSummaries(lang).filter(guide => guide.relatedService.includes(page.id)).slice(0, 3)
  const relatedServices = getCommercialPages(lang).filter((service) => service.id !== page.id)
  const orientation = SERVICE_ORIENTATION[lang][page.id]
  const counterpart = relatedServices.find(service => service.id === (page.id === "web-design" ? "web-development" : page.id === "web-development" ? "web-design" : ""))
  const disciplines = getServiceSummaries(lang).filter(service => SERVICE_DISCIPLINES[page.id].includes(service.slug))

  return (
    <PageFrame className="relative">
      <Seo title={page.seoTitle} bare description={page.description} path={page.path} lang={lang} />
      <article key={page.path} className="editorial-scroll"><div className="editorial-wrap">
        <header><Link to={`/${lang}/services`} className="editorial-eyebrow">PALSEC / {labels.services}</Link><h1 className="editorial-title">{page.title}</h1><p className="editorial-lead">{page.intro}</p><div className="mt-8 flex flex-wrap items-center gap-6"><button type="button" onClick={() => openInquiry("quote", page.id === "branding" ? "branding" : page.id === "graphic-design" ? "other" : "web")} className="editorial-cta">{page.ctaLabel}<Arrow /></button><a href="#commercial-projects" className="inline-flex min-h-12 items-center gap-3 text-[12px]">{labels.projects}<Arrow down /></a></div></header>
        <section className="editorial-section editorial-split"><h2 className="editorial-heading">{orientation.title}</h2><div><p className="editorial-copy text-ink/70">{orientation.text}</p><nav aria-label={lang === 'ca' ? 'Disciplines del servei' : lang === 'es' ? 'Disciplinas del servicio' : 'Service disciplines'} className="mt-6 flex flex-wrap gap-6 text-[14px]">{disciplines.map(service => <Link key={service.slug} to={`/${lang}/services/${service.slug}`} className="inline-flex min-h-12 items-center gap-4 underline underline-offset-4">{service.title}<Arrow /></Link>)}</nav>{counterpart && <Link to={counterpart.path} className="mt-4 inline-flex min-h-12 items-center gap-4 text-[14px] underline underline-offset-4">{counterpart.label}<Arrow /></Link>}</div></section>
        <Reveal className="editorial-section"><section id="commercial-projects" className="scroll-mt-24"><span className="editorial-eyebrow">01 / {labels.projects}</span><h2 className="editorial-heading">{page.proofTitle}</h2><p className="editorial-lead mb-8">{page.proofIntro}</p><WorkStrip slugs={page.relatedProjects.map(item => item.slug)} lang={lang} notes={Object.fromEntries(page.relatedProjects.map(item => [item.slug, item.note]))} /></section></Reveal>
        <section className="editorial-section editorial-split"><div><span className="editorial-eyebrow">02 / {labels.services}</span><h2 className="editorial-heading">{labels.deliverables}</h2></div><div><ul className="mb-10 space-y-3 text-[18px] tracking-[-.02em]">{page.deliverables.map(item => <li key={item}>{item}</li>)}</ul>{page.sections.map(section => <Disclosure key={section.title} title={section.title}>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</Disclosure>)}</div></section>
        <section className="editorial-section editorial-split"><div><span className="editorial-eyebrow">03 / PALSEC</span><h2 className="editorial-heading">{labels.process}</h2></div><div><ol>{page.process.map((step,index) => <li className="editorial-step" key={step.title}><span className="text-[11px] opacity-50">0{index+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol><Disclosure title={labels.scope}><p>{page.scope}</p></Disclosure></div></section>
        <section className="editorial-section editorial-split"><h2 className="editorial-heading">{labels.faq}</h2><div>{page.faqs.map(faq => <Disclosure key={faq.question} title={faq.question}><p>{faq.answer}</p></Disclosure>)}</div></section>
        <section className="editorial-section"><h2 className="editorial-heading max-w-[700px]">{page.ctaTitle}</h2><p className="editorial-lead">{page.ctaText}</p><button type="button" onClick={() => openInquiry("quote", page.id === "branding" ? "branding" : page.id === "graphic-design" ? "other" : "web")} className="editorial-cta mt-8">{page.ctaLabel}<Arrow /></button></section>
        {!!guides.length && <aside className="editorial-section"><h2 className="editorial-heading">{lang === "ca" ? "Guies per preparar el projecte" : "Guías para preparar el proyecto"}</h2><ul className="space-y-4 text-[16px]">{guides.map(guide => <li key={guide.id}><Link to={guide.path} className="inline-flex min-h-12 items-center gap-4 underline underline-offset-4">{guide.title}<Arrow /></Link></li>)}</ul></aside>}
        <nav aria-label={labels.related}><h2 className="editorial-eyebrow">{labels.related}</h2><ul className="flex flex-wrap gap-8 text-[14px]">{relatedServices.map(service => <li key={service.id}><Link to={service.path} className="inline-flex min-h-12 items-center gap-4">{service.label}<Arrow /></Link></li>)}</ul></nav>
        <SiteFooter />
      </div></article>
    </PageFrame>
  )
}
