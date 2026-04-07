import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { PageFrame } from "@/components/PageFrame"
import {
  PROJECTS,
  picsum,
  projectBySlug,
  type Project,
  type ProjectSlug,
} from "@/data/projects"
import { publicUrl } from "@/utils/publicUrl"

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

function viraCopy() {
  return {
    label: "PROJECT",
    title: "VIRA",
    body: [
      "VIRA ÉS UNA APP DISSENYADA PER AJUDAR A SOLVENTAR ELS PRINCIPALS PROBLEMES DELS ADOLESCENTS AMB TDAH.",
      "EL SISTEMA CONVERTEIX HÀBITS, TASQUES I REGULACIÓ EMOCIONAL EN MICRO-ACCIONS CLARES, AMB FEEDBACK IMMEDIAT I UN TO AMABLE.",
      "A MÉS DEL PRODUCTE DIGITAL, S’HA DISSENYAT LA MARCA: IDENTITAT, PALETA, IL·LUSTRACIÓ I UN LLENGUATGE VISUAL CONSISTENT PER FER-LA PROPERA I MEMORABLE.",
    ],
    bullets: [
      "UX/UI MOBILE",
      "BRAND IDENTITY",
      "VISUAL SYSTEM",
      "DESIGN LANGUAGE",
    ],
  }
}

function galeonCopy() {
  return {
    label: "PROJECT",
    title: "GALEÓN",
    body: [
      "GALEÓN ÉS UNA APLICACIÓ INTERACTIVA QUE PERMET RECÓRRER LA HISTÒRIA DE LA MONARQUIA ESPANYOLA A TRAVÉS DE LES COL·LECCIONS REIALS.",
      "EL PRODUCTE CONNECTA CONTINGUTS, PERSONATGES I CONTEXTOS PER TRANSFORMAR LA HISTÒRIA EN NAVEGACIÓ I EL PATRIMONI EN EXPERIÈNCIA.",
      "CONCEBUT PER EXPLORAR UNA ÀMPLIA SELECCIÓ D’EDIFICIS HISTÒRICS I ESPAIS NATURALS GESTIONATS PER PATRIMONIO NACIONAL, AMB UNA NARRATIVA VISUAL PRECISA I UN SISTEMA D’INTERACCIÓ CLAR.",
    ],
    bullets: [
      "PRODUCT DESIGN",
      "UX/UI",
      "VISUAL SYSTEM",
      "INTERACTIVE CONTENT",
    ],
  }
}

function arkuosCopy() {
  return {
    label: "PROJECT",
    title: "ARKUOS",
    body: [
      "ARKUOS ÉS UN ESPAI D’ACCIÓ SOCIO-EDUCATIVA I UN ENTORN DE CREACIÓ, EXPERIMENTACIÓ I APRENENTATGE PER A INFANTS, ADOLESCENTS I JOVES.",
      "UN CENTRE VIU I ADAPTATIU ORIENTAT A DESENVOLUPAR CREATIVITAT I TALENT A TRAVÉS DE PROJECTES ACTIUS, AMB ACOMPANYAMENT I MENTORIA.",
      "EL SISTEMA D’ESPAIS S’ORGANITZA EN DIFERENTS “DISTRICTES” DE TREBALL EQUIPATS, PENSATS PER CONNECTAR EL MÓN TANGIBLE, INTANGIBLE I SOCIAL, I PER AFAVORIR LA COL·LABORACIÓ I EL TREBALL EN XARXA.",
    ],
    bullets: [
      "BRAND APPLICATION",
      "DESIGN SYSTEM",
      "COMMUNICATION PIECES",
      "VISUAL LANGUAGE",
    ],
    source: "ARKUOS.ORG",
  }
}

function xiringuitoCopy() {
  return {
    label: "PROJECT",
    title: "EL XIRINGUITO",
    body: [
      "EL XIRINGUITO ÉS UNA IDENTITAT COMPLETA PER A UN RESTAURANT DE COSTA, PENSADA PER TRANSMETRE UNA ESTÈTICA MEDITERRÀNIA, LLEUGERA I LLUMINOSA.",
      "EL SISTEMA GRÀFIC JUGA AMB COLOR, TIPOGRAFIA I COMPOSICIÓ EN CAPES PER CAPTURAR LA SENSACIÓ D’ESTIU: SAL, SORRA, OMBRA I RITME.",
      "S’HA DESPLEGAT L’IDENTITAT EN APLICACIONS REIALS: MENÚS, CARTES, POSAVASOS, RETOLACIÓ I PECES PER A COMUNICACIÓ DIGITAL, MANTENINT COHERÈNCIA I PERSONALITAT.",
    ],
    bullets: [
      "BRAND IDENTITY",
      "MENU SYSTEM",
      "PRINT & SIGNAGE",
      "DIGITAL ASSETS",
    ],
  }
}

function entezaCopy() {
  return {
    label: "PROJECT",
    title: "ENTEZA",
    body: [
      "ENTEZA ÉS UNA MARCA ORIENTADA A LLOGUER DE MOBILIARI I PARAMENT PER A ESDEVENIMENTS, AMB UN ENFOC EN DISSENY, ELEGÀNCIA I QUALITAT.",
      "LA IDENTITAT I EL SISTEMA VISUAL S’APLIQUEN A CATÀLEG, COMUNICACIÓ DIGITAL I PRESENTACIÓ DE PRODUCTE, PER FER L’OFERTA CLARA I DESITJABLE.",
      "AMB UNA COL·LECCIÓ AMPLIA I ESCALABLE, EL PROJECTE ORGANITZA CATEGORIES I SÈRIES PER FACILITAR LA SELECCIÓ I MUNTATGE DE QUALSEVOL TIPUS D’ESDEVENIMENT.",
    ],
    bullets: [
      "BRAND SYSTEM",
      "CATALOG STRUCTURE",
      "DIGITAL DESIGN",
      "PRODUCT PRESENTATION",
    ],
    source: "ENTEZA.COM",
  }
}

function gentGranCopy() {
  return {
    label: "PROJECT",
    title: "GENT GRAN",
    body: [
      "PROJECTE DESENVOLUPAT PER A LA REGIDORIA DE SERVEIS SOCIALS DEL MUNICIPI, AMB L’OBJECTIU DE DONAR VISIBILITAT I COHESIÓ A LES ACTIVITATS ADREÇADES A LES PERSONES GRANS.",
      "LA IDENTITAT DEFINEIX UN TO PROPER I POSITIU, AMB UN SISTEMA GRÀFIC SIMPLE I MEMORABLE QUE FUNCIONA EN CARTELLERIA, XARXES I MATERIALS INFORMATIUS.",
      "UN LLENGUATGE VISUAL PENSAT PER SER ACCESSIBLE, CLAR I FÀCILMENT REPRODUÏBLE EN CONTEXTOS INSTITUCIONALS.",
    ],
    bullets: [
      "PUBLIC SECTOR",
      "BRAND IDENTITY",
      "COMMUNICATION SYSTEM",
      "PRINT & DIGITAL",
    ],
  }
}

export function ProjectDetail() {
  const { slug } = useParams()
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
    return <Navigate to="/films" replace />
  }

  const slides = project.localImages?.slides ?? project.carouselSeeds
  const safeIndex = ((index % slides.length) + slides.length) % slides.length
  const copy =
    project.slug === "vira"
      ? viraCopy()
      : project.slug === "galeon"
        ? galeonCopy()
        : project.slug === "arkuos"
          ? arkuosCopy()
          : project.slug === "el-xiringuito"
            ? xiringuitoCopy()
            : project.slug === "enteza"
              ? entezaCopy()
              : project.slug === "gent-gran-de-calonge-i-sant-antoni"
                ? gentGranCopy()
          : null
  const twoCol =
    project.slug === "vira" ||
    project.slug === "galeon" ||
    project.slug === "arkuos" ||
    project.slug === "el-xiringuito" ||
    project.slug === "enteza" ||
    project.slug === "gent-gran-de-calonge-i-sant-antoni"

  return (
    <PageFrame>
      <div className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 pt-[92px]">
          {twoCol ? (
            <div className="mx-auto grid w-full max-w-[1200px] gap-8 md:grid-cols-2">
              {/* LEFT: MEDIA */}
              <div className="min-w-0">
                <motion.div
                  key={`${project.slug}-${safeIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full overflow-hidden rounded-[2px] border border-frame bg-white"
                >
                  <img
                    src={imageSrc(slides[safeIndex]!, 1600, 900)}
                    alt=""
                    className="block max-h-[70vh] w-full object-contain bg-white"
                  />
                </motion.div>

                <div className="mt-4 flex items-center justify-center gap-10 text-[18px] font-light leading-none text-ink">
                  <button
                    type="button"
                    className="px-2 transition-opacity duration-200 hover:opacity-40"
                    aria-label="Previous image"
                    onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="px-2 transition-opacity duration-200 hover:opacity-40"
                    aria-label="Next image"
                    onClick={() => setIndex((i) => (i + 1) % slides.length)}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* RIGHT: INFO */}
              <div className="min-w-0">
                <div className="mb-3 text-nav uppercase tracking-nav opacity-60">
                  PROJECT
                </div>
                <div className="mb-4 text-nav uppercase tracking-nav opacity-70">
                  {project.title}
                </div>

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
                    to={`/project/${prev.slug}`}
                    className="transition-opacity duration-200 hover:opacity-40"
                  >
                    BACK
                  </Link>
                  <Link
                    to={`/project/${next.slug}`}
                    className="transition-opacity duration-200 hover:opacity-40"
                  >
                    NEXT
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
              >
                <img
                  src={imageSrc(slides[safeIndex]!, 1600, 900)}
                  alt=""
                  className="aspect-video w-full object-cover"
                />
              </motion.div>
            </div>
          )}
        </div>

        <div className="mt-auto shrink-0 border-t border-frame px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-1">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/project/${p.slug}`}
                className="w-[76px] shrink-0"
                onClick={() => setIndex(0)}
              >
                <div className="overflow-hidden rounded-[2px] border border-frame bg-white">
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
