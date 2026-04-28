import { useEffect, useMemo, useRef, useState } from "react"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import {
  PROJECTS,
  picsum,
  projectBySlug,
  type Project,
  type ProjectSlug,
} from "@/data/projects"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import type { Lang } from "@/i18n/lang"
import { Seo } from "@/components/Seo"

function neighbors(current: ProjectSlug): { prev: Project; next: Project } {
  const idx = PROJECTS.findIndex((p) => p.slug === current)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]!
  const next = PROJECTS[(idx + 1) % PROJECTS.length]!
  return { prev, next }
}

function imageSrc(keyOrPath: string, w: number, h: number) {
  if (keyOrPath.startsWith("/")) return publicUrl(keyOrPath)
  return picsum(keyOrPath, w, h)
}

function LogotecaGallery({
  slides,
  initialIndex = 0,
  onIndexChange,
  lang,
}: {
  slides: string[]
  initialIndex?: number
  onIndexChange: (idx: number) => void
  lang: Lang
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(initialIndex)
  const primary = slides.slice(0, 20)
  const extras = slides.slice(20)
  const scrollLockRef = useRef(false)
  const prevOverflowRef = useRef({ html: "", body: "" })

  useEffect(() => {
    setActive(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const lock = () => {
      if (scrollLockRef.current) return
      scrollLockRef.current = true
      prevOverflowRef.current = { html: html.style.overflow, body: body.style.overflow }
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
    }

    const unlock = () => {
      if (!scrollLockRef.current) return
      scrollLockRef.current = false
      const { html: h, body: b } = prevOverflowRef.current
      html.style.overflow = h
      body.style.overflow = b
    }

    if (open) lock()
    else unlock()

    return () => {
      unlock()
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "Escape") setOpen(false)
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + slides.length) % slides.length)
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % slides.length)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, slides.length])

  useEffect(() => {
    onIndexChange(active)
  }, [active, onIndexChange])

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const distanceThreshold = 90
    const velocityThreshold = 520
    if (info.offset.x <= -distanceThreshold || info.velocity.x <= -velocityThreshold) {
      setActive((i) => (i + 1) % slides.length)
    } else if (info.offset.x >= distanceThreshold || info.velocity.x >= velocityThreshold) {
      setActive((i) => (i - 1 + slides.length) % slides.length)
    }
  }

  return (
    <>
      {/* 4 x 5 grid on desktop */}
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-4 text-nav uppercase tracking-nav opacity-60">{t(lang, "project.label")}</div>
        <div className="mb-6 text-nav uppercase tracking-nav opacity-70">{t(lang, "logoteca.title")}</div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {primary.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setActive(i)
                setOpen(true)
              }}
              className="group overflow-hidden rounded-[2px] border border-frame bg-white"
              aria-label={`Open logo ${i + 1}`}
            >
              <img
                src={imageSrc(s, 800, 800)}
                alt=""
                className="aspect-square w-full select-none object-contain bg-white p-4 transition-transform duration-200 group-hover:scale-[1.02]"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>

        {extras.length ? (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4">
            {extras.map((s, j) => {
              const idx = 20 + j
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setActive(idx)
                    setOpen(true)
                  }}
                  className="group overflow-hidden rounded-[2px] border border-frame bg-white"
                  aria-label={`Open logo ${idx + 1}`}
                >
                  <img
                    src={imageSrc(s, 1200, 900)}
                    alt=""
                    className="aspect-[16/10] w-full select-none object-contain bg-white p-6 transition-transform duration-200 group-hover:scale-[1.01]"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ pointerEvents: open ? "auto" : "none" }}
            aria-label="Close"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative w-[min(92vw,1100px)] overflow-hidden rounded-[2px] border border-white/20 bg-white"
              initial={{ y: 12, scale: 0.99, filter: "blur(8px)" }}
              animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ y: 10, scale: 0.99, filter: "blur(8px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={`logoteca-${active}`}
                className="w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
                style={{ touchAction: "pan-y", cursor: "grab" }}
              >
                <img
                  src={imageSrc(slides[active]!, 1800, 1800)}
                  alt=""
                  className="h-[min(78vh,820px)] w-full select-none object-contain bg-white p-6"
                  draggable={false}
                />
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                <button
                  type="button"
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[14px] uppercase tracking-nav text-ink backdrop-blur hover:bg-white"
                  onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <div className="text-[12px] uppercase tracking-nav text-ink/70">
                  {active + 1} / {slides.length}
                </div>
                <button
                  type="button"
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[14px] uppercase tracking-nav text-ink backdrop-blur hover:bg-white"
                  onClick={() => setActive((i) => (i + 1) % slides.length)}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

type ProjectCopy = {
  title: string
  body: string[]
  bullets: string[]
}

function viraCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "VIRA IS AN APP DESIGNED TO HELP ADDRESS THE MAIN CHALLENGES FACED BY TEENAGERS WITH ADHD.",
          "THE SYSTEM TURNS HABITS, TASKS, AND EMOTIONAL REGULATION INTO CLEAR MICRO-ACTIONS, WITH IMMEDIATE FEEDBACK AND A FRIENDLY TONE.",
          "BEYOND THE DIGITAL PRODUCT, THE BRAND WAS ALSO DESIGNED: IDENTITY, PALETTE, ILLUSTRATION, AND A CONSISTENT VISUAL LANGUAGE TO MAKE IT APPROACHABLE AND MEMORABLE.",
        ]
      : lang === "es"
        ? [
            "VIRA ES UNA APP DISEÑADA PARA AYUDAR A RESOLVER LOS PRINCIPALES RETOS DE LOS ADOLESCENTES CON TDAH.",
            "EL SISTEMA CONVIERTE HÁBITOS, TAREAS Y REGULACIÓN EMOCIONAL EN MICRO-ACCIONES CLARAS, CON FEEDBACK INMEDIATO Y UN TONO AMABLE.",
            "ADEMÁS DEL PRODUCTO DIGITAL, SE DISEÑÓ LA MARCA: IDENTIDAD, PALETA, ILUSTRACIÓN Y UN LENGUAJE VISUAL CONSISTENTE PARA HACERLA CERCANA Y MEMORABLE.",
          ]
        : [
            "VIRA ÉS UNA APP DISSENYADA PER AJUDAR A SOLVENTAR ELS PRINCIPALS PROBLEMES DELS ADOLESCENTS AMB TDAH.",
            "EL SISTEMA CONVERTEIX HÀBITS, TASQUES I REGULACIÓ EMOCIONAL EN MICRO-ACCIONS CLARES, AMB FEEDBACK IMMEDIAT I UN TO AMABLE.",
            "A MÉS DEL PRODUCTE DIGITAL, S’HA DISSENYAT LA MARCA: IDENTITAT, PALETA, IL·LUSTRACIÓ I UN LLENGUATGE VISUAL CONSISTENT PER FER-LA PROPERA I MEMORABLE.",
          ]
  return {
    title: "VIRA",
    body,
    bullets: ["UX/UI MOBILE", "BRAND IDENTITY", "VISUAL SYSTEM", "DESIGN LANGUAGE"],
  }
}

function galeonCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "GALEÓN IS AN INTERACTIVE APPLICATION THAT ALLOWS YOU TO TRAVEL THROUGH THE HISTORY OF THE SPANISH MONARCHY VIA THE ROYAL COLLECTIONS.",
          "THE PRODUCT CONNECTS CONTENT, CHARACTERS, AND CONTEXTS TO TURN HISTORY INTO NAVIGATION AND HERITAGE INTO EXPERIENCE.",
          "BUILT TO EXPLORE A WIDE SELECTION OF HISTORIC BUILDINGS AND NATURAL SPACES MANAGED BY PATRIMONIO NACIONAL, WITH PRECISE VISUAL STORYTELLING AND A CLEAR INTERACTION SYSTEM.",
        ]
      : lang === "es"
        ? [
            "GALEÓN ES UNA APLICACIÓN INTERACTIVA QUE PERMITE RECORRER LA HISTORIA DE LA MONARQUÍA ESPAÑOLA A TRAVÉS DE LAS COLECCIONES REALES.",
            "EL PRODUCTO CONECTA CONTENIDOS, PERSONAJES Y CONTEXTOS PARA TRANSFORMAR LA HISTORIA EN NAVEGACIÓN Y EL PATRIMONIO EN EXPERIENCIA.",
            "CONCEBIDA PARA EXPLORAR UNA AMPLIA SELECCIÓN DE EDIFICIOS HISTÓRICOS Y ESPACIOS NATURALES GESTIONADOS POR PATRIMONIO NACIONAL, CON UNA NARRATIVA VISUAL PRECISA Y UN SISTEMA DE INTERACCIÓN CLARO.",
          ]
        : [
            "GALEÓN ÉS UNA APLICACIÓ INTERACTIVA QUE PERMET RECÓRRER LA HISTÒRIA DE LA MONARQUIA ESPANYOLA A TRAVÉS DE LES COL·LECCIONS REIALS.",
            "EL PRODUCTE CONNECTA CONTINGUTS, PERSONATGES I CONTEXTOS PER TRANSFORMAR LA HISTÒRIA EN NAVEGACIÓ I EL PATRIMONI EN EXPERIÈNCIA.",
            "CONCEBUT PER EXPLORAR UNA ÀMPLIA SELECCIÓ D’EDIFICIS HISTÒRICS I ESPAIS NATURALS GESTIONATS PER PATRIMONIO NACIONAL, AMB UNA NARRATIVA VISUAL PRECISA I UN SISTEMA D’INTERACCIÓ CLAR.",
          ]
  return {
    title: "GALEÓN",
    body,
    bullets: ["PRODUCT DESIGN", "UX/UI", "VISUAL SYSTEM", "INTERACTIVE CONTENT"],
  }
}

function arkuosCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "ARKUOS IS A SOCIO-EDUCATIONAL ACTION SPACE AND A CREATIVE ENVIRONMENT FOR CHILDREN, TEENAGERS, AND YOUNG PEOPLE TO CREATE, EXPERIMENT, AND LEARN.",
          "A LIVING, ADAPTIVE CENTER FOCUSED ON DEVELOPING CREATIVITY AND TALENT THROUGH ACTIVE PROJECTS, WITH GUIDANCE AND MENTORSHIP.",
          "THE SPACE SYSTEM IS ORGANIZED INTO DIFFERENT EQUIPPED “DISTRICTS”, DESIGNED TO CONNECT THE TANGIBLE, INTANGIBLE, AND SOCIAL WORLDS, ENCOURAGING COLLABORATION AND NETWORKED WORK.",
        ]
      : lang === "es"
        ? [
            "ARKUOS ES UN ESPACIO DE ACCIÓN SOCIOEDUCATIVA Y UN ENTORNO DE CREACIÓN, EXPERIMENTACIÓN Y APRENDIZAJE PARA NIÑOS, ADOLESCENTES Y JÓVENES.",
            "UN CENTRO VIVO Y ADAPTATIVO ORIENTADO A DESARROLLAR CREATIVIDAD Y TALENTO A TRAVÉS DE PROYECTOS ACTIVOS, CON ACOMPAÑAMIENTO Y MENTORÍA.",
            "EL SISTEMA DE ESPACIOS SE ORGANIZA EN DISTINTOS “DISTRITOS” DE TRABAJO EQUIPADOS, PENSADOS PARA CONECTAR EL MUNDO TANGIBLE, INTANGIBLE Y SOCIAL, Y PARA FAVORECER LA COLABORACIÓN Y EL TRABAJO EN RED.",
          ]
        : [
            "ARKUOS ÉS UN ESPAI D’ACCIÓ SOCIO-EDUCATIVA I UN ENTORN DE CREACIÓ, EXPERIMENTACIÓ I APRENENTATGE PER A INFANTS, ADOLESCENTS I JOVES.",
            "UN CENTRE VIU I ADAPTATIU ORIENTAT A DESENVOLUPAR CREATIVITAT I TALENT A TRAVÉS DE PROJECTES ACTIUS, AMB ACOMPANYAMENT I MENTORIA.",
            "EL SISTEMA D’ESPAIS S’ORGANITZA EN DIFERENTS “DISTRICTES” DE TREBALL EQUIPATS, PENSATS PER CONNECTAR EL MÓN TANGIBLE, INTANGIBLE I SOCIAL, I PER AFAVORIR LA COL·LABORACIÓ I EL TREBALL EN XARXA.",
          ]
  return {
    title: "ARKUOS",
    body,
    bullets: ["BRAND APPLICATION", "DESIGN SYSTEM", "COMMUNICATION PIECES", "VISUAL LANGUAGE"],
  }
}

function xiringuitoCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "EL XIRINGUITO IS A COMPLETE IDENTITY FOR A COASTAL RESTAURANT, DESIGNED TO CONVEY A LIGHT, BRIGHT MEDITERRANEAN AESTHETIC.",
          "THE GRAPHIC SYSTEM PLAYS WITH COLOR, TYPOGRAPHY, AND LAYERED COMPOSITION TO CAPTURE THE FEELING OF SUMMER: SALT, SAND, SHADE, AND RHYTHM.",
          "THE IDENTITY WAS DEPLOYED ACROSS REAL-WORLD APPLICATIONS: MENUS, CARDS, COASTERS, SIGNAGE, AND DIGITAL COMMUNICATION PIECES—MAINTAINING COHERENCE AND PERSONALITY.",
        ]
      : lang === "es"
        ? [
            "EL XIRINGUITO ES UNA IDENTIDAD COMPLETA PARA UN RESTAURANTE DE COSTA, PENSADA PARA TRANSMITIR UNA ESTÉTICA MEDITERRÁNEA, LIGERA Y LUMINOSA.",
            "EL SISTEMA GRÁFICO JUEGA CON COLOR, TIPOGRAFÍA Y COMPOSICIÓN EN CAPAS PARA CAPTURAR LA SENSACIÓN DE VERANO: SAL, ARENA, SOMBRA Y RITMO.",
            "SE DESPLEGÓ LA IDENTIDAD EN APLICACIONES REALES: MENÚS, CARTAS, POSAVASOS, ROTULACIÓN Y PIEZAS PARA COMUNICACIÓN DIGITAL, MANTENIENDO COHERENCIA Y PERSONALIDAD.",
          ]
        : [
            "EL XIRINGUITO ÉS UNA IDENTITAT COMPLETA PER A UN RESTAURANT DE COSTA, PENSADA PER TRANSMETRE UNA ESTÈTICA MEDITERRÀNIA, LLEUGERA I LLUMINOSA.",
            "EL SISTEMA GRÀFIC JUGA AMB COLOR, TIPOGRAFIA I COMPOSICIÓ EN CAPES PER CAPTURAR LA SENSACIÓ D’ESTIU: SAL, SORRA, OMBRA I RITME.",
            "S’HA DESPLEGAT L’IDENTITAT EN APLICACIONS REIALS: MENÚS, CARTES, POSAVASOS, RETOLACIÓ I PECES PER A COMUNICACIÓ DIGITAL, MANTENINT COHERÈNCIA I PERSONALITAT.",
          ]
  return {
    title: "EL XIRINGUITO",
    body,
    bullets: ["BRAND IDENTITY", "MENU SYSTEM", "PRINT & SIGNAGE", "DIGITAL ASSETS"],
  }
}

function entezaCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "ENTEZA IS A BRAND FOCUSED ON FURNITURE AND TABLEWARE RENTALS FOR EVENTS, WITH AN EMPHASIS ON DESIGN, ELEGANCE, AND QUALITY.",
          "THE IDENTITY AND VISUAL SYSTEM APPLY ACROSS THE CATALOG, DIGITAL COMMUNICATION, AND PRODUCT PRESENTATION—MAKING THE OFFER CLEAR AND DESIRABLE.",
          "WITH A BROAD, SCALABLE COLLECTION, THE PROJECT ORGANIZES CATEGORIES AND SERIES TO MAKE SELECTION AND SETUP EASY FOR ANY TYPE OF EVENT.",
        ]
      : lang === "es"
        ? [
            "ENTEZA ES UNA MARCA ORIENTADA AL ALQUILER DE MOBILIARIO Y MENAJE PARA EVENTOS, CON UN ENFOQUE EN DISEÑO, ELEGANCIA Y CALIDAD.",
            "LA IDENTIDAD Y EL SISTEMA VISUAL SE APLICAN EN CATÁLOGO, COMUNICACIÓN DIGITAL Y PRESENTACIÓN DE PRODUCTO, PARA HACER LA OFERTA CLARA Y DESEABLE.",
            "CON UNA COLECCIÓN AMPLIA Y ESCALABLE, EL PROYECTO ORGANIZA CATEGORÍAS Y SERIES PARA FACILITAR LA SELECCIÓN Y EL MONTAJE DE CUALQUIER TIPO DE EVENTO.",
          ]
        : [
            "ENTEZA ÉS UNA MARCA ORIENTADA A LLOGUER DE MOBILIARI I PARAMENT PER A ESDEVENIMENTS, AMB UN ENFOC EN DISSENY, ELEGÀNCIA I QUALITAT.",
            "LA IDENTITAT I EL SISTEMA VISUAL S’APLIQUEN A CATÀLEG, COMUNICACIÓ DIGITAL I PRESENTACIÓ DE PRODUCTE, PER FER L’OFERTA CLARA I DESITJABLE.",
            "AMB UNA COL·LECCIÓ AMPLIA I ESCALABLE, EL PROJECTE ORGANITZA CATEGORIES I SÈRIES PER FACILITAR LA SELECCIÓ I MUNTATGE DE QUALSEVOL TIPUS D’ESDEVENIMENT.",
          ]
  return {
    title: "ENTEZA",
    body,
    bullets: ["BRAND SYSTEM", "CATALOG STRUCTURE", "DIGITAL DESIGN", "PRODUCT PRESENTATION"],
  }
}

function gentGranCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "A PROJECT DEVELOPED FOR THE MUNICIPAL SOCIAL SERVICES DEPARTMENT, AIMED AT GIVING VISIBILITY AND COHESION TO ACTIVITIES FOR OLDER ADULTS.",
          "THE IDENTITY DEFINES A FRIENDLY, POSITIVE TONE, WITH A SIMPLE AND MEMORABLE GRAPHIC SYSTEM THAT WORKS ACROSS POSTERS, SOCIAL MEDIA, AND INFORMATION MATERIALS.",
          "A VISUAL LANGUAGE DESIGNED TO BE ACCESSIBLE, CLEAR, AND EASY TO REPRODUCE IN INSTITUTIONAL CONTEXTS.",
        ]
      : lang === "es"
        ? [
            "PROYECTO DESARROLLADO PARA LA CONCEJALÍA DE SERVICIOS SOCIALES DEL MUNICIPIO, CON EL OBJETIVO DE DAR VISIBILIDAD Y COHESIÓN A LAS ACTIVIDADES DIRIGIDAS A LAS PERSONAS MAYORES.",
            "LA IDENTIDAD DEFINE UN TONO CERCANO Y POSITIVO, CON UN SISTEMA GRÁFICO SIMPLE Y MEMORABLE QUE FUNCIONA EN CARTELERÍA, REDES Y MATERIALES INFORMATIVOS.",
            "UN LENGUAJE VISUAL PENSADO PARA SER ACCESIBLE, CLARO Y FÁCILMENTE REPRODUCIBLE EN CONTEXTOS INSTITUCIONALES.",
          ]
        : [
            "PROJECTE DESENVOLUPAT PER A LA REGIDORIA DE SERVEIS SOCIALS DEL MUNICIPI, AMB L’OBJECTIU DE DONAR VISIBILITAT I COHESIÓ A LES ACTIVITATS ADREÇADES A LES PERSONES GRANS.",
            "LA IDENTITAT DEFINEIX UN TO PROPER I POSITIU, AMB UN SISTEMA GRÀFIC SIMPLE I MEMORABLE QUE FUNCIONA EN CARTELLERIA, XARXES I MATERIALS INFORMATIUS.",
            "UN LLENGUATGE VISUAL PENSAT PER SER ACCESSIBLE, CLAR I FÀCILMENT REPRODUÏBLE EN CONTEXTOS INSTITUCIONALS.",
          ]
  return {
    title: "GENT GRAN",
    body,
    bullets: ["PUBLIC SECTOR", "BRAND IDENTITY", "COMMUNICATION SYSTEM", "PRINT & DIGITAL"],
  }
}

function bonDiaVeinatCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "BON DIA VEÏNAT IS A CIVIC PROJECT FOR THE AJUNTAMENT DE BARCELONA DESIGNED TO IMPROVE COOPERATION BETWEEN NEIGHBORS.",
          "IT CONNECTS PEOPLE, NEEDS, AND LOCAL RESOURCES TO MAKE HELP REQUESTS, COMMUNITY ANNOUNCEMENTS, AND SHARED INITIATIVES EASY TO ORGANIZE.",
          "THE SYSTEM PRIORITIZES CLARITY, TRUST, AND ACCESSIBILITY, WITH A SIMPLE FLOW FOR POSTING, DISCOVERING, AND COORDINATING NEIGHBORHOOD ACTIONS.",
        ]
      : lang === "es"
        ? [
            "BON DIA VEÏNAT ES UN PROYECTO CÍVICO PARA EL AJUNTAMENT DE BARCELONA PENSADO PARA MEJORAR LA COOPERACIÓN ENTRE VECINOS.",
            "CONECTA PERSONAS, NECESIDADES Y RECURSOS LOCALES PARA FACILITAR PETICIONES DE AYUDA, AVISOS COMUNITARIOS E INICIATIVAS COMPARTIDAS.",
            "EL SISTEMA PRIORIZA CLARIDAD, CONFIANZA Y ACCESIBILIDAD, CON UN FLUJO SIMPLE PARA PUBLICAR, DESCUBRIR Y COORDINAR ACCIONES EN EL BARRIO.",
          ]
        : [
            "BON DIA VEÏNAT ÉS UN PROJECTE CÍVIC PER A L’AJUNTAMENT DE BARCELONA PENSAT PER MILLORAR LA COOPERACIÓ ENTRE VEÏNS.",
            "CONNECTA PERSONES, NECESSITATS I RECURSOS LOCALS PER FACILITAR PETICIONS D’AJUDA, AVISOS COMUNITARIS I INICIATIVES COMPARTIDES.",
            "EL SISTEMA PRIORITZA CLAREDAT, CONFIANÇA I ACCESSIBILITAT, AMB UN FLUX SIMPLE PER PUBLICAR, DESCOBRIR I COORDINAR ACCIONS AL BARRI.",
          ]
  return {
    title: "BON DIA VEÏNAT",
    body,
    bullets: ["PUBLIC SECTOR", "SERVICE DESIGN", "UX/UI", "ACCESSIBILITY"],
  }
}

export function ProjectDetail() {
  const lang = useLang()
  const { slug } = useParams()
  const { pathname } = useLocation()
  const project = slug ? projectBySlug(slug) : undefined
  const [index, setIndex] = useState(0)

  const { prev, next } = useMemo(
    () => (project ? neighbors(project.slug) : { prev: PROJECTS[0]!, next: PROJECTS[1]! }),
    [project],
  )

  const others = useMemo(
    () => PROJECTS.filter((p) => p.slug !== project?.slug),
    [project],
  )

  useEffect(() => {
    setIndex(0)
  }, [slug])

  if (!slug || !project) {
    return <Navigate to={`/${lang}/projects`} replace />
  }

  // cms (PALSEC AI LAB) is comingSoon with no slides — send to projects grid
  if (!project.localImages?.slides?.length && !project.carouselSeeds.length) {
    return <Navigate to={`/${lang}/projects`} replace />
  }

  const slides = project.localImages?.slides ?? project.carouselSeeds
  const safeIndex = ((index % slides.length) + slides.length) % slides.length
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    // Tune for mouse + touch. Trigger on either distance or quick fling.
    const distanceThreshold = 90
    const velocityThreshold = 520
    if (info.offset.x <= -distanceThreshold || info.velocity.x <= -velocityThreshold) goNext()
    else if (info.offset.x >= distanceThreshold || info.velocity.x >= velocityThreshold) goPrev()
  }
  const copy =
    project.slug === "vira"
      ? viraCopy(lang)
      : project.slug === "galeon"
        ? galeonCopy(lang)
        : project.slug === "arkuos"
          ? arkuosCopy(lang)
          : project.slug === "el-xiringuito"
            ? xiringuitoCopy(lang)
            : project.slug === "enteza"
              ? entezaCopy(lang)
              : project.slug === "gent-gran-de-calonge-i-sant-antoni"
                ? gentGranCopy(lang)
                : project.slug === "cms"
                  ? bonDiaVeinatCopy(lang)
                  : null
  const twoCol =
    project.slug === "vira" ||
    project.slug === "galeon" ||
    project.slug === "arkuos" ||
    project.slug === "el-xiringuito" ||
    project.slug === "enteza" ||
    project.slug === "gent-gran-de-calonge-i-sant-antoni" ||
    project.slug === "cms" ||
    project.slug === "estudi-dental-carrera"

  // SEO: first body paragraph as description, first local image as OG image
  const seoDescription = copy?.body[0] ?? project.title
  const firstSlide = project.localImages?.slides?.[0]
  const ogImage = firstSlide
    ? `https://www.palsec.agency${firstSlide}`
    : undefined

  return (
    <PageFrame>
      <Seo
        title={project.title}
        description={seoDescription}
        path={pathname}
        lang={lang}
        image={ogImage}
        type="article"
      />
      {/* sr-only h1: project name for crawlers; visual title is the div.text-nav below */}
      <h1 className="sr-only">{project.title}</h1>
      <div className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 pt-[92px]">
          {project.slug === "logoteca" ? (
            <LogotecaGallery slides={slides} initialIndex={safeIndex} onIndexChange={setIndex} lang={lang} />
          ) : (
            twoCol ? (
              <div className="mx-auto grid w-full max-w-[1200px] gap-8 md:grid-cols-2">
                {/* LEFT: MEDIA */}
                <div className="min-w-0">
                  <motion.div
                    key={`${project.slug}-${safeIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full overflow-hidden rounded-[2px] border border-frame bg-white"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    whileTap={{ cursor: "grabbing" }}
                    style={{ touchAction: "pan-y", cursor: "grab" }}
                  >
                    <img
                      src={imageSrc(slides[safeIndex]!, 1600, 900)}
                      alt={`${project.title} — ${copy?.bullets[0] ?? t(lang, "project.label")} (${t(lang, "project.label")} ${safeIndex + 1})`}
                      className="block max-h-[70vh] w-full select-none object-contain bg-white"
                      draggable={false}
                    />
                  </motion.div>

                  <div className="mt-4 flex items-center justify-center gap-10 text-[18px] font-light leading-none text-ink">
                    <button
                      type="button"
                      className="px-2 transition-opacity duration-200 hover:opacity-40"
                      aria-label="Previous image"
                      onClick={goPrev}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="px-2 transition-opacity duration-200 hover:opacity-40"
                      aria-label="Next image"
                      onClick={goNext}
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* RIGHT: INFO */}
                <div className="min-w-0">
                  <div className="mb-3 text-nav uppercase tracking-nav opacity-60">{t(lang, "project.label")}</div>
                  <div className="mb-4 text-nav uppercase tracking-nav opacity-70">{project.title}</div>

                  {copy ? (
                    <div className="text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
                      {copy.body.map((p) => (
                        <p key={p} className="mb-3">
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {copy ? (
                    <ul className="mt-6 text-nav uppercase leading-[1.9] tracking-nav text-ink/70">
                      {copy.bullets.map((b) => (
                        <li key={b}>— {b}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {slides.map((seed, i) => (
                      <button
                        key={seed}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-[92px] overflow-hidden rounded-[2px] border bg-white ${
                          i === safeIndex ? "border-ink opacity-100" : "border-frame opacity-60"
                        }`}
                        aria-label={`Image ${i + 1}`}
                      >
                        <img
                          src={imageSrc(seed, 320, 180)}
                          alt=""
                          className="h-full w-auto object-contain bg-white"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center justify-between text-nav uppercase tracking-nav">
                    <Link
                      to={`/${lang}/project/${prev.slug}`}
                      className="transition-opacity duration-200 hover:opacity-40"
                    >
                      {t(lang, "project.back")}
                    </Link>
                    <Link
                      to={`/${lang}/project/${next.slug}`}
                      className="transition-opacity duration-200 hover:opacity-40"
                    >
                      {t(lang, "project.next")}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <motion.div
                  key={`${project.slug}-${safeIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-[75vw] max-w-[1200px] overflow-hidden rounded-[2px] border border-frame bg-white"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={handleDragEnd}
                  whileTap={{ cursor: "grabbing" }}
                  style={{ touchAction: "pan-y", cursor: "grab" }}
                >
                  <img
                    src={imageSrc(slides[safeIndex]!, 1600, 900)}
                    alt={`${project.title} — ${t(lang, "project.label")} ${safeIndex + 1}`}
                    className="aspect-video w-full select-none object-cover"
                    draggable={false}
                  />
                </motion.div>
              </div>
            )
          )}
        </div>

        <div className="mt-auto shrink-0 border-t border-frame px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-1">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/${lang}/project/${p.slug}`}
                className="w-[76px] shrink-0"
                onClick={() => setIndex(0)}
              >
                <div className="overflow-hidden rounded-[2px] border border-frame bg-white">
                  {p.localImages?.thumbVideo ? (
                    <video
                      className="aspect-[3/4] w-full object-cover"
                      src={publicUrl(p.localImages.thumbVideo)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={
                        p.localImages?.thumb
                          ? publicUrl(p.localImages.thumb)
                          : picsum(p.thumbSeed, 460, 259)
                      }
                      alt=""
                      className="aspect-[3/4] w-full object-contain bg-white"
                      loading="lazy"
                    />
                  )}
                </div>
                <p className="mt-[6px] text-[7px] uppercase leading-[1.4] tracking-nav text-ink">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
