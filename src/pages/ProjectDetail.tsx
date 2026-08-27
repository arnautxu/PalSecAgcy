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
import { Picture } from "@/components/Picture"
import { LazyAutoplayVideo } from "@/components/LazyAutoplayVideo"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import type { Lang } from "@/i18n/lang"
import { Seo } from "@/components/Seo"
import { getProjectPrimaryServiceSlug, getProjectSeoMeta, isPublishedProjectSlug } from "@/lib/seoMeta"
import { getServicePage } from "@/content/servicePages"

function neighbors(current: ProjectSlug): { prev: Project; next: Project } {
  const activeProjects = PROJECTS.filter((project) => !project.comingSoon)
  const idx = activeProjects.findIndex((p) => p.slug === current)
  const prev = activeProjects[(idx - 1 + activeProjects.length) % activeProjects.length]!
  const next = activeProjects[(idx + 1) % activeProjects.length]!
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
  const intro =
    lang === "en"
      ? "A curated collection exploring typography, symbol, proportion, and contrast as tools for recognizable brand identities."
      : lang === "es"
        ? "Una colección curada que explora tipografía, símbolo, proporción y contraste como herramientas para crear identidades de marca reconocibles."
        : "Una col·lecció curada que explora tipografia, símbol, proporció i contrast com a eines per crear identitats de marca reconeixibles."

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
        <h1 className="mb-3 text-[clamp(24px,4vw,48px)] font-normal leading-[1.05] tracking-[-0.03em] normal-case">{t(lang, "logoteca.title")}</h1>
        <p className="mb-8 max-w-[680px] text-[14px] leading-[1.7] text-ink/70 normal-case md:text-[16px]">{intro}</p>

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
              <Picture
                src={imageSrc(s, 800, 800)}
                alt=""
                className="aspect-square w-full select-none object-contain bg-white p-4 transition-transform duration-200 group-hover:scale-[1.02]"
                sizes="(max-width: 767px) 50vw, 300px"
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
                  <Picture
                    src={imageSrc(s, 1200, 900)}
                    alt=""
                    className="aspect-[16/10] w-full select-none object-contain bg-white p-6 transition-transform duration-200 group-hover:scale-[1.01]"
                    sizes="(max-width: 767px) 100vw, 600px"
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
                <Picture
                  src={imageSrc(slides[active]!, 1800, 1800)}
                  alt=""
                  className="h-[min(78vh,820px)] w-full select-none object-contain bg-white p-6"
                  sizes="min(92vw, 1100px)"
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

export type ProjectCopy = {
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
          "THE INTERFACE ORGANIZES ROUTINES, TASKS, AND EMOTIONAL CHECK-INS INTO SHORT SEQUENCES, REDUCING THE AMOUNT OF INFORMATION PRESENTED AT EACH STEP AND KEEPING THE NEXT ACTION VISIBLE.",
          "THE RESULT IS A CONNECTED PRODUCT AND BRAND SYSTEM: MOBILE UX/UI, IDENTITY, ILLUSTRATION, COLOR, AND COMPONENT RULES DESIGNED TO SUPPORT A CONSISTENT EXPERIENCE.",
        ]
      : lang === "es"
        ? [
            "VIRA ES UNA APP DISEÑADA PARA AYUDAR A RESOLVER LOS PRINCIPALES RETOS DE LOS ADOLESCENTES CON TDAH.",
            "EL SISTEMA CONVIERTE HÁBITOS, TAREAS Y REGULACIÓN EMOCIONAL EN MICRO-ACCIONES CLARAS, CON FEEDBACK INMEDIATO Y UN TONO AMABLE.",
            "ADEMÁS DEL PRODUCTO DIGITAL, SE DISEÑÓ LA MARCA: IDENTIDAD, PALETA, ILUSTRACIÓN Y UN LENGUAJE VISUAL CONSISTENTE PARA HACERLA CERCANA Y MEMORABLE.",
            "LA INTERFAZ ORGANIZA RUTINAS, TAREAS Y REGISTROS EMOCIONALES EN SECUENCIAS CORTAS, REDUCIENDO LA INFORMACIÓN PRESENTADA EN CADA PASO Y MANTENIENDO VISIBLE LA SIGUIENTE ACCIÓN.",
            "EL RESULTADO ES UN SISTEMA CONECTADO DE PRODUCTO Y MARCA: UX/UI MÓVIL, IDENTIDAD, ILUSTRACIÓN, COLOR Y REGLAS DE COMPONENTES PARA SOSTENER UNA EXPERIENCIA COHERENTE.",
          ]
        : [
            "VIRA ÉS UNA APP DISSENYADA PER AJUDAR A SOLVENTAR ELS PRINCIPALS PROBLEMES DELS ADOLESCENTS AMB TDAH.",
            "EL SISTEMA CONVERTEIX HÀBITS, TASQUES I REGULACIÓ EMOCIONAL EN MICRO-ACCIONS CLARES, AMB FEEDBACK IMMEDIAT I UN TO AMABLE.",
            "A MÉS DEL PRODUCTE DIGITAL, S’HA DISSENYAT LA MARCA: IDENTITAT, PALETA, IL·LUSTRACIÓ I UN LLENGUATGE VISUAL CONSISTENT PER FER-LA PROPERA I MEMORABLE.",
            "LA INTERFÍCIE ORGANITZA RUTINES, TASQUES I REGISTRES EMOCIONALS EN SEQÜÈNCIES CURTES, REDUINT LA INFORMACIÓ PRESENTADA A CADA PAS I MANTENINT VISIBLE L'ACCIÓ SEGÜENT.",
            "EL RESULTAT ÉS UN SISTEMA CONNECTAT DE PRODUCTE I MARCA: UX/UI MÒBIL, IDENTITAT, IL·LUSTRACIÓ, COLOR I REGLES DE COMPONENTS PER SOSTENIR UNA EXPERIÈNCIA COHERENT.",
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
          "THE INFORMATION ARCHITECTURE RELATES PLACES, PEOPLE, OBJECTS, AND PERIODS SO USERS CAN MOVE BETWEEN A BROAD OVERVIEW AND THE DETAIL OF EACH STORY WITHOUT LOSING CONTEXT.",
          "THE RESULT COMBINES PRODUCT DESIGN, INTERACTION PATTERNS, CONTENT HIERARCHY, AND A REUSABLE VISUAL SYSTEM FOR PRESENTING DIFFERENT TYPES OF HERITAGE MATERIAL CONSISTENTLY.",
        ]
      : lang === "es"
        ? [
            "GALEÓN ES UNA APLICACIÓN INTERACTIVA QUE PERMITE RECORRER LA HISTORIA DE LA MONARQUÍA ESPAÑOLA A TRAVÉS DE LAS COLECCIONES REALES.",
            "EL PRODUCTO CONECTA CONTENIDOS, PERSONAJES Y CONTEXTOS PARA TRANSFORMAR LA HISTORIA EN NAVEGACIÓN Y EL PATRIMONIO EN EXPERIENCIA.",
            "CONCEBIDA PARA EXPLORAR UNA AMPLIA SELECCIÓN DE EDIFICIOS HISTÓRICOS Y ESPACIOS NATURALES GESTIONADOS POR PATRIMONIO NACIONAL, CON UNA NARRATIVA VISUAL PRECISA Y UN SISTEMA DE INTERACCIÓN CLARO.",
            "LA ARQUITECTURA DE INFORMACIÓN RELACIONA LUGARES, PERSONAS, OBJETOS Y PERIODOS PARA PASAR DE UNA VISIÓN GENERAL AL DETALLE DE CADA HISTORIA SIN PERDER EL CONTEXTO.",
            "EL RESULTADO COMBINA DISEÑO DE PRODUCTO, PATRONES DE INTERACCIÓN, JERARQUÍA DE CONTENIDO Y UN SISTEMA VISUAL REUTILIZABLE PARA PRESENTAR MATERIALES PATRIMONIALES DIVERSOS CON COHERENCIA.",
          ]
        : [
            "GALEÓN ÉS UNA APLICACIÓ INTERACTIVA QUE PERMET RECÓRRER LA HISTÒRIA DE LA MONARQUIA ESPANYOLA A TRAVÉS DE LES COL·LECCIONS REIALS.",
            "EL PRODUCTE CONNECTA CONTINGUTS, PERSONATGES I CONTEXTOS PER TRANSFORMAR LA HISTÒRIA EN NAVEGACIÓ I EL PATRIMONI EN EXPERIÈNCIA.",
            "CONCEBUT PER EXPLORAR UNA ÀMPLIA SELECCIÓ D’EDIFICIS HISTÒRICS I ESPAIS NATURALS GESTIONATS PER PATRIMONIO NACIONAL, AMB UNA NARRATIVA VISUAL PRECISA I UN SISTEMA D’INTERACCIÓ CLAR.",
            "L'ARQUITECTURA D'INFORMACIÓ RELACIONA LLOCS, PERSONES, OBJECTES I PERÍODES PER PASSAR D'UNA VISIÓ GENERAL AL DETALL DE CADA HISTÒRIA SENSE PERDRE EL CONTEXT.",
            "EL RESULTAT COMBINA DISSENY DE PRODUCTE, PATRONS D'INTERACCIÓ, JERARQUIA DE CONTINGUT I UN SISTEMA VISUAL REUTILITZABLE PER PRESENTAR MATERIALS PATRIMONIALS DIVERSOS AMB COHERÈNCIA.",
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
          "THE IDENTITY HAD TO WORK ACROSS THE PHYSICAL SPACE, PROGRAM COMMUNICATION, LEARNING MATERIALS, AND DIGITAL TOUCHPOINTS WHILE REMAINING CLEAR FOR DIFFERENT AGES AND ACTIVITIES.",
          "THE RESULT IS A MODULAR BRAND APPLICATION SYSTEM THAT CAN IDENTIFY DISTRICTS, ORGANIZE INFORMATION, AND GIVE NEW INITIATIVES A RECOGNIZABLE SHARED LANGUAGE.",
        ]
      : lang === "es"
        ? [
            "ARKUOS ES UN ESPACIO DE ACCIÓN SOCIOEDUCATIVA Y UN ENTORNO DE CREACIÓN, EXPERIMENTACIÓN Y APRENDIZAJE PARA NIÑOS, ADOLESCENTES Y JÓVENES.",
            "UN CENTRO VIVO Y ADAPTATIVO ORIENTADO A DESARROLLAR CREATIVIDAD Y TALENTO A TRAVÉS DE PROYECTOS ACTIVOS, CON ACOMPAÑAMIENTO Y MENTORÍA.",
            "EL SISTEMA DE ESPACIOS SE ORGANIZA EN DISTINTOS “DISTRITOS” DE TRABAJO EQUIPADOS, PENSADOS PARA CONECTAR EL MUNDO TANGIBLE, INTANGIBLE Y SOCIAL, Y PARA FAVORECER LA COLABORACIÓN Y EL TRABAJO EN RED.",
            "LA IDENTIDAD DEBÍA FUNCIONAR EN EL ESPACIO FÍSICO, LA COMUNICACIÓN DEL PROGRAMA, LOS MATERIALES DE APRENDIZAJE Y LOS PUNTOS DE CONTACTO DIGITALES PARA EDADES Y ACTIVIDADES DIFERENTES.",
            "EL RESULTADO ES UN SISTEMA MODULAR DE APLICACIÓN DE MARCA QUE IDENTIFICA DISTRITOS, ORDENA INFORMACIÓN Y DA A NUEVAS INICIATIVAS UN LENGUAJE COMPARTIDO Y RECONOCIBLE.",
          ]
        : [
            "ARKUOS ÉS UN ESPAI D’ACCIÓ SOCIO-EDUCATIVA I UN ENTORN DE CREACIÓ, EXPERIMENTACIÓ I APRENENTATGE PER A INFANTS, ADOLESCENTS I JOVES.",
            "UN CENTRE VIU I ADAPTATIU ORIENTAT A DESENVOLUPAR CREATIVITAT I TALENT A TRAVÉS DE PROJECTES ACTIUS, AMB ACOMPANYAMENT I MENTORIA.",
            "EL SISTEMA D’ESPAIS S’ORGANITZA EN DIFERENTS “DISTRICTES” DE TREBALL EQUIPATS, PENSATS PER CONNECTAR EL MÓN TANGIBLE, INTANGIBLE I SOCIAL, I PER AFAVORIR LA COL·LABORACIÓ I EL TREBALL EN XARXA.",
            "LA IDENTITAT HAVIA DE FUNCIONAR A L'ESPAI FÍSIC, LA COMUNICACIÓ DEL PROGRAMA, ELS MATERIALS D'APRENENTATGE I ELS PUNTS DE CONTACTE DIGITALS PER A EDATS I ACTIVITATS DIFERENTS.",
            "EL RESULTAT ÉS UN SISTEMA MODULAR D'APLICACIÓ DE MARCA QUE IDENTIFICA DISTRICTES, ORDENA INFORMACIÓ I DONA A NOVES INICIATIVES UN LLENGUATGE COMPARTIT I RECONEIXIBLE.",
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
          "THE SYSTEM BALANCES EXPRESSIVE COMPOSITIONS WITH PRACTICAL INFORMATION, SO PRICES, DISHES, DIRECTIONS, AND SEASONAL MESSAGES REMAIN LEGIBLE ACROSS PRINTED AND DIGITAL FORMATS.",
          "THE RESULT IS A REPEATABLE MEDITERRANEAN LANGUAGE THAT CONNECTS THE RESTAURANT'S PHYSICAL EXPERIENCE WITH ITS MENU, SIGNAGE, AND ONGOING COMMUNICATION.",
        ]
      : lang === "es"
        ? [
            "EL XIRINGUITO ES UNA IDENTIDAD COMPLETA PARA UN RESTAURANTE DE COSTA, PENSADA PARA TRANSMITIR UNA ESTÉTICA MEDITERRÁNEA, LIGERA Y LUMINOSA.",
            "EL SISTEMA GRÁFICO JUEGA CON COLOR, TIPOGRAFÍA Y COMPOSICIÓN EN CAPAS PARA CAPTURAR LA SENSACIÓN DE VERANO: SAL, ARENA, SOMBRA Y RITMO.",
            "SE DESPLEGÓ LA IDENTIDAD EN APLICACIONES REALES: MENÚS, CARTAS, POSAVASOS, ROTULACIÓN Y PIEZAS PARA COMUNICACIÓN DIGITAL, MANTENIENDO COHERENCIA Y PERSONALIDAD.",
            "EL SISTEMA EQUILIBRA COMPOSICIONES EXPRESIVAS E INFORMACIÓN PRÁCTICA PARA QUE PRECIOS, PLATOS, INDICACIONES Y MENSAJES DE TEMPORADA SIGAN SIENDO LEGIBLES EN FORMATOS IMPRESOS Y DIGITALES.",
            "EL RESULTADO ES UN LENGUAJE MEDITERRÁNEO REPRODUCIBLE QUE CONECTA LA EXPERIENCIA FÍSICA DEL RESTAURANTE CON SU MENÚ, SEÑALÉTICA Y COMUNICACIÓN CONTINUA.",
          ]
        : [
            "EL XIRINGUITO ÉS UNA IDENTITAT COMPLETA PER A UN RESTAURANT DE COSTA, PENSADA PER TRANSMETRE UNA ESTÈTICA MEDITERRÀNIA, LLEUGERA I LLUMINOSA.",
            "EL SISTEMA GRÀFIC JUGA AMB COLOR, TIPOGRAFIA I COMPOSICIÓ EN CAPES PER CAPTURAR LA SENSACIÓ D’ESTIU: SAL, SORRA, OMBRA I RITME.",
            "S’HA DESPLEGAT L’IDENTITAT EN APLICACIONS REIALS: MENÚS, CARTES, POSAVASOS, RETOLACIÓ I PECES PER A COMUNICACIÓ DIGITAL, MANTENINT COHERÈNCIA I PERSONALITAT.",
            "EL SISTEMA EQUILIBRA COMPOSICIONS EXPRESSIVES I INFORMACIÓ PRÀCTICA PERQUÈ PREUS, PLATS, INDICACIONS I MISSATGES DE TEMPORADA CONTINUÏN SENT LLEGIBLES EN FORMATS IMPRESOS I DIGITALS.",
            "EL RESULTAT ÉS UN LLENGUATGE MEDITERRANI REPRODUÏBLE QUE CONNECTA L'EXPERIÈNCIA FÍSICA DEL RESTAURANT AMB EL MENÚ, LA SENYALÍSTICA I LA COMUNICACIÓ CONTÍNUA.",
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
          "THE CATALOGUE STRUCTURE GIVES EACH PRODUCT A CONSISTENT PLACE, IMAGE TREATMENT, AND INFORMATION HIERARCHY, HELPING USERS COMPARE OPTIONS WITHOUT LOSING THE CHARACTER OF THE BRAND.",
          "THE RESULT IS A BRAND AND PRESENTATION SYSTEM THAT CAN GROW WITH NEW COLLECTIONS WHILE KEEPING DIGITAL COMMUNICATION, CATALOGUE PAGES, AND PRODUCT MATERIALS CONNECTED.",
        ]
      : lang === "es"
        ? [
            "ENTEZA ES UNA MARCA ORIENTADA AL ALQUILER DE MOBILIARIO Y MENAJE PARA EVENTOS, CON UN ENFOQUE EN DISEÑO, ELEGANCIA Y CALIDAD.",
            "LA IDENTIDAD Y EL SISTEMA VISUAL SE APLICAN EN CATÁLOGO, COMUNICACIÓN DIGITAL Y PRESENTACIÓN DE PRODUCTO, PARA HACER LA OFERTA CLARA Y DESEABLE.",
            "CON UNA COLECCIÓN AMPLIA Y ESCALABLE, EL PROYECTO ORGANIZA CATEGORÍAS Y SERIES PARA FACILITAR LA SELECCIÓN Y EL MONTAJE DE CUALQUIER TIPO DE EVENTO.",
            "LA ESTRUCTURA DE CATÁLOGO DA A CADA PRODUCTO UN LUGAR, UN TRATAMIENTO DE IMAGEN Y UNA JERARQUÍA DE INFORMACIÓN COHERENTES, FACILITANDO COMPARAR OPCIONES SIN PERDER EL CARÁCTER DE LA MARCA.",
            "EL RESULTADO ES UN SISTEMA DE MARCA Y PRESENTACIÓN QUE PUEDE CRECER CON NUEVAS COLECCIONES MANTENIENDO CONECTADOS COMUNICACIÓN DIGITAL, CATÁLOGO Y MATERIALES DE PRODUCTO.",
          ]
        : [
            "ENTEZA ÉS UNA MARCA ORIENTADA A LLOGUER DE MOBILIARI I PARAMENT PER A ESDEVENIMENTS, AMB UN ENFOC EN DISSENY, ELEGÀNCIA I QUALITAT.",
            "LA IDENTITAT I EL SISTEMA VISUAL S’APLIQUEN A CATÀLEG, COMUNICACIÓ DIGITAL I PRESENTACIÓ DE PRODUCTE, PER FER L’OFERTA CLARA I DESITJABLE.",
            "AMB UNA COL·LECCIÓ AMPLIA I ESCALABLE, EL PROJECTE ORGANITZA CATEGORIES I SÈRIES PER FACILITAR LA SELECCIÓ I MUNTATGE DE QUALSEVOL TIPUS D’ESDEVENIMENT.",
            "L'ESTRUCTURA DE CATÀLEG DONA A CADA PRODUCTE UN LLOC, UN TRACTAMENT D'IMATGE I UNA JERARQUIA D'INFORMACIÓ COHERENTS, FACILITANT COMPARAR OPCIONS SENSE PERDRE EL CARÀCTER DE LA MARCA.",
            "EL RESULTAT ÉS UN SISTEMA DE MARCA I PRESENTACIÓ QUE POT CRÉIXER AMB NOVES COL·LECCIONS MANTENINT CONNECTATS COMUNICACIÓ DIGITAL, CATÀLEG I MATERIALS DE PRODUCTE.",
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
          "LEGIBILITY, CONTRAST, REPETITION, AND A DIRECT TONE GUIDE THE APPLICATIONS SO INFORMATION CAN WORK FOR DIFFERENT AGES, READING CONDITIONS, AND MUNICIPAL COMMUNICATION CHANNELS.",
          "THE RESULT IS A PRACTICAL TOOLKIT FOR POSTERS, SOCIAL CONTENT, AND INFORMATION MATERIALS THAT GIVES THE PROGRAM A CONSISTENT AND RECOGNIZABLE PUBLIC PRESENCE.",
        ]
      : lang === "es"
        ? [
            "PROYECTO DESARROLLADO PARA LA CONCEJALÍA DE SERVICIOS SOCIALES DEL MUNICIPIO, CON EL OBJETIVO DE DAR VISIBILIDAD Y COHESIÓN A LAS ACTIVIDADES DIRIGIDAS A LAS PERSONAS MAYORES.",
            "LA IDENTIDAD DEFINE UN TONO CERCANO Y POSITIVO, CON UN SISTEMA GRÁFICO SIMPLE Y MEMORABLE QUE FUNCIONA EN CARTELERÍA, REDES Y MATERIALES INFORMATIVOS.",
            "UN LENGUAJE VISUAL PENSADO PARA SER ACCESIBLE, CLARO Y FÁCILMENTE REPRODUCIBLE EN CONTEXTOS INSTITUCIONALES.",
            "LEGIBILIDAD, CONTRASTE, REPETICIÓN Y UN TONO DIRECTO GUÍAN LAS APLICACIONES PARA QUE LA INFORMACIÓN FUNCIONE CON DISTINTAS EDADES, CONDICIONES DE LECTURA Y CANALES MUNICIPALES.",
            "EL RESULTADO ES UN KIT PRÁCTICO PARA CARTELERÍA, REDES Y MATERIALES INFORMATIVOS QUE DA AL PROGRAMA UNA PRESENCIA PÚBLICA COHERENTE Y RECONOCIBLE.",
          ]
        : [
            "PROJECTE DESENVOLUPAT PER A LA REGIDORIA DE SERVEIS SOCIALS DEL MUNICIPI, AMB L’OBJECTIU DE DONAR VISIBILITAT I COHESIÓ A LES ACTIVITATS ADREÇADES A LES PERSONES GRANS.",
            "LA IDENTITAT DEFINEIX UN TO PROPER I POSITIU, AMB UN SISTEMA GRÀFIC SIMPLE I MEMORABLE QUE FUNCIONA EN CARTELLERIA, XARXES I MATERIALS INFORMATIUS.",
            "UN LLENGUATGE VISUAL PENSAT PER SER ACCESSIBLE, CLAR I FÀCILMENT REPRODUÏBLE EN CONTEXTOS INSTITUCIONALS.",
            "LLEGIBILITAT, CONTRAST, REPETICIÓ I UN TO DIRECTE GUIEN LES APLICACIONS PERQUÈ LA INFORMACIÓ FUNCIONI AMB EDATS, CONDICIONS DE LECTURA I CANALS MUNICIPALS DIFERENTS.",
            "EL RESULTAT ÉS UN KIT PRÀCTIC PER A CARTELLERIA, XARXES I MATERIALS INFORMATIUS QUE DONA AL PROGRAMA UNA PRESÈNCIA PÚBLICA COHERENT I RECONEIXIBLE.",
          ]
  return {
    title: "GENT GRAN",
    body,
    bullets: ["PUBLIC SECTOR", "BRAND IDENTITY", "COMMUNICATION SYSTEM", "PRINT & DIGITAL"],
  }
}

function logotecaCopy(lang: Lang): ProjectCopy {
  const body =
    lang === "en"
      ? [
          "LOGOTECA IS A CURATED COLLECTION OF LOGO DESIGN WORK BY PALSEC AGCY.",
          "THE ARCHIVE EXPLORES HOW TYPOGRAPHY, SYMBOL, PROPORTION, AND CONTRAST CAN TURN DIFFERENT IDEAS INTO RECOGNIZABLE IDENTITIES.",
          "EACH PIECE IS PRESENTED AS PART OF AN ONGOING PRACTICE IN VISUAL SYNTHESIS AND BRAND SYSTEM DESIGN.",
          "THE SELECTION SHOWS DIFFERENT APPROACHES TO LETTERFORMS, GEOMETRY, RHYTHM, AND SYMBOL CONSTRUCTION RATHER THAN APPLYING ONE REPEATED STYLE TO EVERY BRIEF.",
          "AS AN OPEN ARCHIVE, LOGOTECA DOCUMENTS HOW DISTINCT MARKS CAN REMAIN SIMPLE, ADAPTABLE, AND READY TO BECOME PART OF A LARGER IDENTITY SYSTEM.",
        ]
      : lang === "es"
        ? [
            "LOGOTECA ES UNA COLECCIÓN CURADA DE DISEÑOS DE LOGOTIPO DE PALSEC AGCY.",
            "EL ARCHIVO EXPLORA CÓMO TIPOGRAFÍA, SÍMBOLO, PROPORCIÓN Y CONTRASTE PUEDEN CONVERTIR IDEAS DIFERENTES EN IDENTIDADES RECONOCIBLES.",
            "CADA PIEZA SE PRESENTA COMO PARTE DE UNA PRÁCTICA CONTINUA DE SÍNTESIS VISUAL Y DISEÑO DE SISTEMAS DE MARCA.",
            "LA SELECCIÓN MUESTRA ENFOQUES DISTINTOS SOBRE FORMAS TIPOGRÁFICAS, GEOMETRÍA, RITMO Y CONSTRUCCIÓN DE SÍMBOLOS, SIN APLICAR UN ÚNICO ESTILO REPETIDO A TODOS LOS ENCARGOS.",
            "COMO ARCHIVO ABIERTO, LOGOTECA DOCUMENTA CÓMO MARCAS DIFERENTES PUEDEN SER SIMPLES, ADAPTABLES Y ESTAR PREPARADAS PARA FORMAR PARTE DE UN SISTEMA DE IDENTIDAD MAYOR.",
          ]
        : [
            "LOGOTECA ÉS UNA COL·LECCIÓ CURADA DE DISSENYS DE LOGOTIP DE PALSEC AGCY.",
            "L'ARXIU EXPLORA COM TIPOGRAFIA, SÍMBOL, PROPORCIÓ I CONTRAST PODEN CONVERTIR IDEES DIFERENTS EN IDENTITATS RECONEIXIBLES.",
            "CADA PEÇA ES PRESENTA COM A PART D'UNA PRÀCTICA CONTÍNUA DE SÍNTESI VISUAL I DISSENY DE SISTEMES DE MARCA.",
            "LA SELECCIÓ MOSTRA ENFOCAMENTS DIFERENTS SOBRE FORMES TIPOGRÀFIQUES, GEOMETRIA, RITME I CONSTRUCCIÓ DE SÍMBOLS, SENSE APLICAR UN ÚNIC ESTIL REPETIT A TOTS ELS ENCÀRRECS.",
            "COM A ARXIU OBERT, LOGOTECA DOCUMENTA COM MARQUES DIFERENTS PODEN SER SIMPLES, ADAPTABLES I ESTAR PREPARADES PER FORMAR PART D'UN SISTEMA D'IDENTITAT MÉS AMPLI.",
          ]
  return {
    title: "LOGOTECA",
    body,
    bullets: ["LOGO DESIGN", "TYPOGRAPHY", "VISUAL SYNTHESIS", "BRAND SYSTEMS"],
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

export function getProjectCopy(slug: ProjectSlug, lang: Lang): ProjectCopy | null {
  if (slug === "vira") return viraCopy(lang)
  if (slug === "galeon") return galeonCopy(lang)
  if (slug === "arkuos") return arkuosCopy(lang)
  if (slug === "el-xiringuito") return xiringuitoCopy(lang)
  if (slug === "enteza") return entezaCopy(lang)
  if (slug === "gent-gran-de-calonge-i-sant-antoni") return gentGranCopy(lang)
  if (slug === "logoteca") return logotecaCopy(lang)
  if (slug === "cms") return bonDiaVeinatCopy(lang)
  return null
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
    () => PROJECTS.filter((p) => p.slug !== project?.slug && !p.comingSoon),
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
  const copy = getProjectCopy(project.slug, lang)
  const twoCol =
    project.slug === "vira" ||
    project.slug === "galeon" ||
    project.slug === "arkuos" ||
    project.slug === "el-xiringuito" ||
    project.slug === "enteza" ||
    project.slug === "gent-gran-de-calonge-i-sant-antoni" ||
    project.slug === "cms" ||
    project.slug === "estudi-dental-carrera"

  const seo = isPublishedProjectSlug(project.slug)
    ? getProjectSeoMeta(project.slug, lang)
    : { title: `${project.title} | PALSEC AGCY`, description: copy?.body[0] ?? project.title }
  const primaryService = isPublishedProjectSlug(project.slug)
    ? getServicePage(getProjectPrimaryServiceSlug(project.slug), lang)
    : null
  const sectionLabels = lang === "ca"
    ? ["CONTEXT", "RESPOSTA DE DISSENY", "SISTEMA", "APLICACIÓ", "RESULTAT"]
    : lang === "es"
      ? ["CONTEXTO", "RESPUESTA DE DISEÑO", "SISTEMA", "APLICACIÓN", "RESULTADO"]
      : ["CONTEXT", "DESIGN RESPONSE", "SYSTEM", "APPLICATION", "OUTCOME"]
  const firstSlide = project.localImages?.slides?.[0]
  const ogImage = firstSlide
    ? `https://www.palsec.agency${firstSlide}`
    : undefined

  return (
    <PageFrame>
      <Seo
        title={seo.title}
        bare
        description={seo.description}
        path={pathname}
        lang={lang}
        image={ogImage}
        type="article"
        project={project}
      />
      {/* sr-only h1: project name for crawlers; visual title is the div.text-nav below */}
      {project.slug !== "logoteca" && <h1 className="sr-only">{project.title}</h1>}
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
                    <Picture
                      src={imageSrc(slides[safeIndex]!, 1600, 900)}
                      alt={`${project.title} — ${copy?.bullets[0] ?? t(lang, "project.label")} (${t(lang, "project.label")} ${safeIndex + 1})`}
                      className="block max-h-[70vh] w-full select-none object-contain bg-white"
                      sizes="(max-width: 767px) calc(100vw - 40px), 600px"
                      fetchPriority={safeIndex === 0 ? "high" : "auto"}
                      decoding="async"
                      draggable={false}
                    />
                  </motion.div>

                  <div className="mt-4 flex items-center justify-center gap-10 text-[18px] font-light leading-none text-ink">
                    <button
                      type="button"
                      className="inline-flex min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center px-2 transition-opacity duration-200 hover:opacity-40"
                      aria-label="Previous image"
                      onClick={goPrev}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="inline-flex min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center px-2 transition-opacity duration-200 hover:opacity-40"
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
                      {copy.body.map((p, copyIndex) => (
                        <section key={p} className="mb-5">
                          <h2 className="mb-2 text-nav uppercase tracking-nav text-ink/45">
                            {sectionLabels[copyIndex] ?? sectionLabels[sectionLabels.length - 1]}
                          </h2>
                          <p>{p}</p>
                        </section>
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

                  {primaryService ? (
                    <Link
                      to={`/${lang}/services/${primaryService.slug}`}
                      className="mt-6 inline-block text-nav uppercase tracking-nav underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      {primaryService.title}
                    </Link>
                  ) : null}

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {slides.map((seed, i) => (
                      <button
                        key={seed}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-[92px] min-w-[44px] cursor-pointer overflow-hidden rounded-[2px] border bg-white transition-opacity duration-200 hover:opacity-100 ${
                          i === safeIndex ? "border-ink opacity-100" : "border-frame opacity-60"
                        }`}
                        aria-label={`Image ${i + 1}`}
                        aria-current={i === safeIndex ? "true" : undefined}
                      >
                        <Picture
                          src={imageSrc(seed, 320, 180)}
                          alt=""
                          className="h-full w-auto object-contain bg-white"
                          sizes="76px"
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
                  <Picture
                    src={imageSrc(slides[safeIndex]!, 1600, 900)}
                    alt={`${project.title} — ${t(lang, "project.label")} ${safeIndex + 1}`}
                    className="aspect-video w-full select-none object-cover"
                    sizes="75vw"
                    fetchPriority={safeIndex === 0 ? "high" : "auto"}
                    decoding="async"
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
                    <LazyAutoplayVideo
                      className="aspect-[3/4] w-full object-cover"
                      src={publicUrl(p.localImages.thumbVideo).replace(/\.mp4$/i, ".160.mp4")}
                      poster={p.localImages.thumb
                        ? publicUrl(p.localImages.thumb).replace(/\.(png|jpe?g|webp)$/i, ".160.webp")
                        : undefined}
                      aria-label={`${p.title} — ${lang === "ca" ? "projecte relacionat" : lang === "es" ? "proyecto relacionado" : "related project"}`}
                    />
                  ) : (
                    <Picture
                      src={
                        p.localImages?.thumb
                          ? publicUrl(p.localImages.thumb)
                          : picsum(p.thumbSeed, 460, 259)
                      }
                      alt=""
                      className="aspect-[3/4] w-full object-contain bg-white"
                      sizes="76px"
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
