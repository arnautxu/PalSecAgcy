import { Link, useParams } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { Seo } from "@/components/Seo"
import { SiteFooter } from "@/components/SiteFooter"
import { BUYING_GUIDES, getBuyingGuide } from "@/content/buyingGuides"
import { getCommercialPage } from "@/content/commercialPages"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { NotFound } from "@/pages/NotFound"

export function BuyingGuide() {
  const { guideSlug, lang } = useParams()
  const guide = guideSlug ? getBuyingGuide(guideSlug) : undefined
  if (!guide || lang !== "es") return <NotFound />

  return (
    <PageFrame>
      <Seo title={guide.seoTitle} bare description={guide.description} path={guide.path} lang="es" type="article" />
      <div className="h-full overflow-y-auto px-5 pb-16 pt-[108px] normal-case md:px-8">
        <div className="mx-auto max-w-[1040px]">
          <nav aria-label="Ruta de navegación" className="mb-8 flex flex-wrap gap-x-3 gap-y-2 text-[12px] text-ink/60">
            <Link to="/es" className="underline underline-offset-4">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link to="/es/services" className="underline underline-offset-4">Servicios</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Guía para contratar</span>
          </nav>
          <article className="max-w-[820px]">
            <header>
              <p className="mb-4 text-[12px] uppercase tracking-nav text-ink/65">Guía para contratar diseño y desarrollo</p>
              <p className="mb-4 text-[12px] text-ink/70">PALSEC AGCY · <time dateTime="2026-09-22">22 de septiembre de 2026</time></p>
              <h1 className="text-[32px] font-normal leading-[1.12] tracking-[-0.025em] md:text-[48px]">{guide.title}</h1>
              <p className="mt-7 text-[17px] leading-[1.85] text-ink/75">{guide.intro}</p>
            </header>
            <div className="mt-10 space-y-9">
              {guide.sections.map((section) => (
                <section key={section.title} className="border-t border-frame pt-7">
                  <h2 className="mb-4 text-[23px] font-normal leading-[1.35]">{section.title}</h2>
                  <div className="space-y-4 text-[15px] leading-[1.9] text-ink/75">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.checklist ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.checklist.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
            <section className="mt-11 border border-frame p-6 md:p-8">
              <h2 className="text-[25px] font-normal leading-[1.3]">{guide.ctaTitle}</h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-ink/75">{guide.ctaText}</p>
              <a href={mailtoProjectInquiryHref("es")} className="mt-5 inline-block text-[15px] underline underline-offset-4">Cuéntanos tu proyecto →</a>
              <nav aria-label="Servicios relacionados" className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-frame pt-5 text-[13px]">
                {guide.relatedService.map((id) => {
                  const service = getCommercialPage(id, "es")
                  return <Link key={id} to={service.path} className="underline underline-offset-4">{service.label}</Link>
                })}
              </nav>
            </section>
          </article>
          <aside className="mt-12 border-t border-frame pt-7" aria-label="Otras guías para preparar tu proyecto">
            <h2 className="text-[21px] font-normal">Sigue preparando tu proyecto</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-4 text-[13px] leading-[1.6] md:grid-cols-2">
              {BUYING_GUIDES.filter((item) => item.slug !== guide.slug).map((item) => <li key={item.slug}><Link to={item.path} className="underline underline-offset-4">{item.title}</Link></li>)}
            </ul>
          </aside>
          <SiteFooter />
        </div>
      </div>
    </PageFrame>
  )
}
