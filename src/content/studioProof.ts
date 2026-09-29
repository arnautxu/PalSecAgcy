import type { Lang } from "@/i18n/lang"

export const STUDIO_PROOF: Record<Lang, { title: string; body: string; projects: { slug: string; title: string; note: string }[] }> = {
  ca: {
    title: "Del criteri a les peces",
    body: "El portafolis permet veure com es tradueix cada disciplina en un lliurament concret. Una identitat necessita regles per aplicar-se; una web, una estructura que funcioni en escriptori i mòbil. Abans de començar, concretem què dissenyem, què desenvolupem i quins materials ha d’aportar cada part. Les revisions es fan sobre peces i decisions, amb un abast compartit. Pots explorar els casos per valorar el llenguatge visual i visitar les webs per comprovar-ne l’experiència.",
    projects: [
      { slug: "gent-gran-de-calonge-i-sant-antoni", title: "Comunicació pública", note: "Gent Gran de Calonge i Sant Antoni: identitat i peces per a les activitats municipals, amb atenció a la llegibilitat i la jerarquia." },
      { slug: "vira", title: "Marca i interfície", note: "VIRA: un sistema visual que connecta il·lustració, identitat i pantalles d’una aplicació. El cas se centra en les decisions de disseny." },
      { slug: "weboteca", title: "Webs per explorar", note: "Weboteca: cinc webs amb captures d’escriptori i mòbil i accés directe a cada projecte publicat." },
    ],
  },
  es: {
    title: "Del criterio a las piezas",
    body: "El portafolio permite ver cómo se traduce cada disciplina en una entrega concreta. Una identidad necesita reglas para aplicarse; una web, una estructura que funcione en escritorio y móvil. Antes de empezar, concretamos qué diseñamos, qué desarrollamos y qué materiales debe aportar cada parte. Las revisiones se hacen sobre piezas y decisiones, con un alcance compartido. Puedes explorar los casos para valorar el lenguaje visual y visitar las webs para comprobar la experiencia.",
    projects: [
      { slug: "gent-gran-de-calonge-i-sant-antoni", title: "Comunicación pública", note: "Gent Gran de Calonge i Sant Antoni: identidad y piezas para las actividades municipales, con atención a la legibilidad y la jerarquía." },
      { slug: "vira", title: "Marca e interfaz", note: "VIRA: un sistema visual que conecta ilustración, identidad y pantallas de una aplicación. El caso se centra en las decisiones de diseño." },
      { slug: "weboteca", title: "Webs para explorar", note: "Weboteca: cinco webs con capturas de escritorio y móvil y acceso directo a cada proyecto publicado." },
    ],
  },
  en: {
    title: "From decisions to deliverables",
    body: "The portfolio shows how each discipline becomes a concrete deliverable. An identity needs rules for its application; a website needs a structure that works on desktop and mobile. Before starting, we agree what we design, what we develop and which materials each party provides. Reviews focus on specific work and decisions within a shared scope. Explore the cases to assess the visual language and visit the websites to experience the work directly.",
    projects: [
      { slug: "gent-gran-de-calonge-i-sant-antoni", title: "Public communication", note: "Gent Gran de Calonge i Sant Antoni: identity and materials for municipal activities, with a focus on legibility and hierarchy." },
      { slug: "vira", title: "Brand and interface", note: "VIRA: a visual system connecting illustration, identity and application screens. The case focuses on design decisions." },
      { slug: "weboteca", title: "Websites to explore", note: "Weboteca: five websites with desktop and mobile views and direct links to each published project." },
    ],
  },
}

export const WEBSITE_NOTES: Record<string, Record<Lang, string>> = {
  "neutral-studio": { ca: "Portafolis d’un estudi creatiu: una navegació centrada en els projectes i el seu llenguatge visual.", es: "Portafolio de un estudio creativo: navegación centrada en los proyectos y su lenguaje visual.", en: "A creative studio portfolio, with navigation centred on projects and their visual language." },
  "estudi-dental-carrera": { ca: "Web d’una clínica dental de Lleida: informació de tractaments i recorreguts per contactar amb el centre.", es: "Web de una clínica dental de Lleida: información sobre tratamientos y recorridos para contactar con el centro.", en: "A dental clinic website in Lleida: treatment information and paths to contact the practice." },
  "casino-castellarenc": { ca: "Web d’una entitat cultural: activitats i informació de l’entitat en una estructura consultable des del mòbil.", es: "Web de una entidad cultural: actividades e información de la entidad en una estructura accesible desde el móvil.", en: "A cultural association website: activities and organisation information in a structure accessible on mobile." },
  "pocket-voice": { ca: "Presentació digital de PocketVoice: marca, missatge de producte i demostracions visuals d’un teclat de veu.", es: "Presentación digital de PocketVoice: marca, mensaje de producto y demostraciones visuales de un teclado de voz.", en: "PocketVoice’s digital presentation: brand, product messaging and visual demonstrations of a voice keyboard." },
  vueik: { ca: "Presentació de serveis i treballs d’un estudi: una composició visual que es reorganitza entre escriptori i mòbil.", es: "Presentación de servicios y trabajos de un estudio: una composición visual que se reorganiza entre escritorio y móvil.", en: "A studio’s services and work: a visual composition that adapts between desktop and mobile." },
}
