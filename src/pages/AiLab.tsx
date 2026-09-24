import { useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { AiBrainDemo } from "@/components/AiBrainDemo"
import { PageFrame } from "@/components/PageFrame"
import { Seo } from "@/components/Seo"
import { SiteFooter } from "@/components/SiteFooter"
import { projectBySlug } from "@/data/projects"
import { useLang } from "@/i18n/useLang"
import { getProjectSeoMeta } from "@/lib/seoMeta"

const content = {
  ca: {
    back: "← Tots els projectes",
    eyebrow: "PALSEC AI LAB / PROJECTE 001",
    kind: "PRODUCTE DIGITAL · PROTOTIP INTERACTIU",
    title: "AiBrain",
    lead: "Un espai de treball amb IA per passar de la conversa al resultat.",
    intro: "AiBrain reuneix projectes, converses, fitxers i resultats en una mateixa interfície. Aquest prototip permet veure com seria treballar amb tot el context a mà: plantejar una tasca, aportar documents i revisar el que s'ha preparat.",
    cta: "Prova el prototip ↓",
    demoEyebrow: "01 / EXPERIÈNCIA INTERACTIVA",
    demoTitle: "Entra-hi i fes clic.",
    demoIntro: "Explora l'espai de treball sense sortir de Palsec. Obre una conversa de mostra, crea'n una de nova, adjunta un fitxer o revisa la presentació d'exemple.",
    demoLabel: "PROTOTIP CLICABLE / AIBRAIN",
    demoNote: "És una simulació: les respostes són de mostra, les dades són fictícies i no es connecta a serveis externs.",
    detailsEyebrow: "QUÈ MOSTRA EL PROTOTIP",
    details: [
      { number: "01", title: "Projectes i converses", body: "Organitza el treball per projectes, reprèn converses i prova una nova petició dins del mateix espai." },
      { number: "02", title: "Fitxers i context", body: "Adjunta un document o tria exemples per veure com s'incorporarien al flux de treball." },
      { number: "03", title: "Resultats revisables", body: "Obre el visor, passa les diapositives i descarrega els exemples en PDF o PowerPoint." },
    ],
  },
  es: {
    back: "← Todos los proyectos",
    eyebrow: "PALSEC AI LAB / PROYECTO 001",
    kind: "PRODUCTO DIGITAL · PROTOTIPO INTERACTIVO",
    title: "AiBrain",
    lead: "Un espacio de trabajo con IA para pasar de la conversación al resultado.",
    intro: "AiBrain reúne proyectos, conversaciones, archivos y resultados en una misma interfaz. Este prototipo permite ver cómo sería trabajar con todo el contexto a mano: plantear una tarea, aportar documentos y revisar lo que se ha preparado.",
    cta: "Prueba el prototipo ↓",
    demoEyebrow: "01 / EXPERIENCIA INTERACTIVA",
    demoTitle: "Entra y haz clic.",
    demoIntro: "Explora el espacio de trabajo sin salir de Palsec. Abre una conversación de muestra, crea otra, adjunta un archivo o revisa la presentación de ejemplo.",
    demoLabel: "PROTOTIPO CLICABLE / AIBRAIN",
    demoNote: "Es una simulación: las respuestas son de muestra, los datos son ficticios y no se conecta a servicios externos.",
    detailsEyebrow: "QUÉ MUESTRA EL PROTOTIPO",
    details: [
      { number: "01", title: "Proyectos y conversaciones", body: "Organiza el trabajo por proyectos, retoma conversaciones y prueba una nueva petición en el mismo espacio." },
      { number: "02", title: "Archivos y contexto", body: "Adjunta un documento o elige ejemplos para ver cómo se incorporarían al flujo de trabajo." },
      { number: "03", title: "Resultados revisables", body: "Abre el visor, pasa las diapositivas y descarga los ejemplos en PDF o PowerPoint." },
    ],
  },
  en: {
    back: "← All projects",
    eyebrow: "PALSEC AI LAB / PROJECT 001",
    kind: "DIGITAL PRODUCT · INTERACTIVE PROTOTYPE",
    title: "AiBrain",
    lead: "An AI workspace that takes an idea from conversation to result.",
    intro: "AiBrain brings projects, conversations, files, and results into one interface. This prototype shows what it could feel like to work with the full context at hand: describe a task, add documents, and review the output.",
    cta: "Try the prototype ↓",
    demoEyebrow: "01 / INTERACTIVE EXPERIENCE",
    demoTitle: "Step in and explore.",
    demoIntro: "Explore the workspace without leaving Palsec. Open a sample conversation, create a new one, attach a file, or review the sample presentation.",
    demoLabel: "CLICKABLE PROTOTYPE / AIBRAIN",
    demoNote: "This is a simulation: replies are examples, the data is fictional, and no external services are connected.",
    detailsEyebrow: "WHAT THE PROTOTYPE SHOWS",
    details: [
      { number: "01", title: "Projects and conversations", body: "Organize work by project, resume a conversation, and try a new request in the same workspace." },
      { number: "02", title: "Files and context", body: "Attach a document or choose a sample to see how it fits into the workflow." },
      { number: "03", title: "Reviewable results", body: "Open the viewer, move through the slides, and download the PDF or PowerPoint examples." },
    ],
  },
} as const

export function AiLab() {
  const lang = useLang()
  const { pathname } = useLocation()
  const seo = getProjectSeoMeta("ai-lab", lang)
  const copy = content[lang]
  const scrollRef = useRef<HTMLDivElement>(null)
  const prototypeRef = useRef<HTMLElement>(null)

  const focusPrototype = () => {
    if (!scrollRef.current || !prototypeRef.current) return
    scrollRef.current.scrollTo({ top: prototypeRef.current.offsetTop - 100, behavior: "smooth" })
  }

  return (
    <PageFrame>
      <Seo
        title={seo.title}
        bare
        description={seo.description}
        path={pathname}
        lang={lang}
        image="https://www.palsec.agency/media/projects/ai-lab/cover.png"
        type="article"
        project={projectBySlug("ai-lab")}
      />
      <div ref={scrollRef} className="h-full w-full overflow-y-auto px-4 pb-8 pt-[104px] sm:px-5 md:px-6">
        <article className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-ink/15 pb-4 text-[11px] tracking-[0.08em]">
            <Link to={`/${lang}/projects`} className="transition-colors hover:text-accent">{copy.back}</Link>
            <span className="text-ink/50">{copy.eyebrow}</span>
          </div>

          <header className="grid gap-7 pb-12 pt-8 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-12 md:pb-16 md:pt-12">
            <div>
              <p className="mb-5 text-[11px] tracking-[0.12em] text-accent">{copy.kind}</p>
              <h1 className="font-sans text-[clamp(74px,12vw,180px)] font-semibold leading-[0.83] tracking-[-0.085em] normal-case">{copy.title}<span className="text-accent">.</span></h1>
            </div>
            <div className="max-w-[470px] md:pb-2">
              <p className="font-sans text-[clamp(23px,2.7vw,36px)] font-medium leading-[1.16] tracking-[-0.04em] normal-case">{copy.lead}</p>
              <p className="mt-6 font-sans text-[15px] leading-[1.7] text-ink/65 normal-case">{copy.intro}</p>
              <button type="button" onClick={focusPrototype} className="mt-8 inline-flex min-h-11 items-center border-b border-accent pb-1 text-[12px] tracking-[0.08em] text-accent transition-opacity hover:opacity-60">{copy.cta}</button>
            </div>
          </header>

          <section ref={prototypeRef} id="prototip" aria-labelledby="prototip-title" className="scroll-mt-[100px] border-t border-ink/15 pt-8 md:pt-10">
            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_1.2fr] md:gap-12">
              <div>
                <p className="text-[11px] tracking-[0.12em] text-accent">{copy.demoEyebrow}</p>
                <h2 id="prototip-title" className="mt-3 font-sans text-[clamp(32px,4vw,56px)] font-semibold leading-[1.02] tracking-[-0.055em] normal-case">{copy.demoTitle}</h2>
              </div>
              <p className="max-w-[570px] self-end font-sans text-[16px] leading-[1.6] text-ink/70 normal-case">{copy.demoIntro}</p>
            </div>
            <div className="overflow-hidden border border-ink/20 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.09)]">
              <div className="flex min-h-10 items-center justify-between gap-4 border-b border-ink/15 bg-[#f7f7f6] px-4 text-[10px] tracking-[0.1em] text-ink/60">
                <span>{copy.demoLabel}</span><span className="flex items-center gap-1"><i className="h-[6px] w-[6px] rounded-full bg-accent" /> DEMO</span>
              </div>
              <div className="h-[680px] md:h-[760px]"><AiBrainDemo lang={lang} /></div>
            </div>
            <p className="mt-3 font-sans text-[12px] leading-[1.6] text-ink/50 normal-case">{copy.demoNote}</p>
          </section>

          <section aria-labelledby="details-title" className="mt-16 border-t border-ink/15 pt-7 md:mt-24">
            <h2 id="details-title" className="text-[11px] tracking-[0.12em] text-accent">{copy.detailsEyebrow}</h2>
            <div className="mt-8 grid gap-0 md:grid-cols-3 md:gap-8">
              {copy.details.map((item) => (
                <div key={item.number} className="border-t border-ink/15 py-5 md:py-0 md:border-t-0">
                  <span className="text-[11px] text-ink/40">{item.number} / 03</span>
                  <h3 className="mt-6 font-sans text-[25px] font-medium leading-[1.1] tracking-[-0.04em] normal-case">{item.title}</h3>
                  <p className="mt-4 max-w-[320px] font-sans text-[14px] leading-[1.65] text-ink/60 normal-case">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
          <SiteFooter />
        </article>
      </div>
    </PageFrame>
  )
}
