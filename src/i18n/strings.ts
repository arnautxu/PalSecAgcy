import type { Lang } from "./lang"

export type I18nKey =
  | "nav.services"
  | "nav.projects"
  | "nav.about"
  | "nav.cta"
  | "home.play"
  | "home.pause"
  | "home.tagline"
  | "projects.title"
  | "projects.lead"
  | "services.title"
  | "services.p1"
  | "services.p2"
  | "services.p3"
  | "services.cta"
  | "about.title"
  | "about.p1"
  | "about.p2"
  | "about.contactPrefix"
  | "notfound.title"
  | "notfound.body"
  | "notfound.backHome"
  | "project.label"
  | "project.back"
  | "project.next"
  | "logoteca.title"

type Dict = Record<I18nKey, string>

export const STRINGS: Record<Lang, Dict> = {
  en: {
    "nav.services": "SERVICES",
    "nav.projects": "PROJECTS",
    "nav.about": "ABOUT US",
    "nav.cta": "LET'S TALK?",
    "home.play": "PLAY",
    "home.pause": "PAUSE",
    "home.tagline": "Strategic design for brands that need to execute.",
    "projects.title": "PROJECTS",
    "projects.lead":
      "A selection of projects across branding, digital product, and visual systems. If you want to review your project together, let's talk.",
    "services.title": "SERVICES",
    "services.p1":
      "Brand strategy · Branding · Web design · Print graphics · Motion graphics · Creative direction",
    "services.p2":
      "We work from definition to execution: positioning, naming, tone of voice, visual system, and applications.",
    "services.p3":
      "We design editorial websites and digital products with UX/UI, components, and scalable systems. We also deploy identities across print pieces and spatial materials.",
    "services.cta": "If you have an idea or a brand in evolution, let's talk about your project.",
    "about.title": "ABOUT US",
    "about.p1":
      "Palsec Agcy is a design-led studio working across brand, digital, and visual systems.",
    "about.p2": "We build precise, minimal, high-contrast experiences.",
    "about.contactPrefix": "Based in Costa Brava · Available worldwide ·",
    "notfound.title": "404",
    "notfound.body": "THIS PAGE DOESN'T EXIST.",
    "notfound.backHome": "BACK HOME",
    "project.label": "PROJECT",
    "project.back": "BACK",
    "project.next": "NEXT",
    "logoteca.title": "LOGOTECA",
  },
  ca: {
    "nav.services": "SERVEIS",
    "nav.projects": "PROJECTES",
    "nav.about": "SOBRE NOSALTRES",
    "nav.cta": "PARLEM?",
    "home.play": "PLAY",
    "home.pause": "PAUSE",
    "home.tagline": "Disseny estratègic per a marques que necessiten executar.",
    "projects.title": "PROJECTES",
    "projects.lead":
      "Selecció de projectes en branding, producte digital i sistemes visuals. Si vols que ho mirem junts, parlem del teu projecte.",
    "services.title": "SERVEIS",
    "services.p1":
      "Estratègia de marca · Branding · Disseny web · Gràfica impresa · Motion graphics · Direcció creativa",
    "services.p2":
      "Treballem des de la definició fins a l'execució: posicionament, nomenclatura, to de veu, sistema visual i aplicacions.",
    "services.p3":
      "Dissenyem webs editorials i productes digitals amb UX/UI, components i sistemes escalables. També despleguem identitats en peces impreses i materials d'espai.",
    "services.cta": "Si tens una idea o una marca en evolució, parlem del teu projecte.",
    "about.title": "SOBRE NOSALTRES",
    "about.p1":
      "Palsec Agcy és un estudi orientat al disseny que treballa en marca, digital i sistemes visuals.",
    "about.p2": "Construïm experiències precíses, minimals i d'alt contrast.",
    "about.contactPrefix": "Basats a la Costa Brava · Disponibles arreu ·",
    "notfound.title": "404",
    "notfound.body": "AQUESTA PÀGINA NO EXISTEIX.",
    "notfound.backHome": "TORNAR A L'INICI",
    "project.label": "PROJECTE",
    "project.back": "ENRERE",
    "project.next": "SEGÜENT",
    "logoteca.title": "LOGOTECA",
  },
  es: {
    "nav.services": "SERVICIOS",
    "nav.projects": "PROYECTOS",
    "nav.about": "SOBRE NOSOTROS",
    "nav.cta": "¿HABLAMOS?",
    "home.play": "PLAY",
    "home.pause": "PAUSE",
    "home.tagline": "Diseño estratégico para marcas que necesitan ejecutar.",
    "projects.title": "PROYECTOS",
    "projects.lead":
      "Una selección de proyectos en branding, producto digital y sistemas visuales. Si quieres que lo veamos juntos, hablemos de tu proyecto.",
    "services.title": "SERVICIOS",
    "services.p1":
      "Estrategia de marca · Branding · Diseño web · Gráfica impresa · Motion graphics · Dirección creativa",
    "services.p2":
      "Trabajamos desde la definición hasta la ejecución: posicionamiento, nomenclatura, tono de voz, sistema visual y aplicaciones.",
    "services.p3":
      "Diseñamos webs editoriales y productos digitales con UX/UI, componentes y sistemas escalables. También desplegamos identidades en piezas impresas y materiales espaciales.",
    "services.cta": "Si tienes una idea o una marca en evolución, hablemos de tu proyecto.",
    "about.title": "SOBRE NOSOTROS",
    "about.p1":
      "Palsec Agcy es un estudio orientado al diseño que trabaja en marca, digital y sistemas visuales.",
    "about.p2": "Creamos experiencias precisas, mínimas y de alto contraste.",
    "about.contactPrefix": "Con base en Costa Brava · Disponibles en todo el mundo ·",
    "notfound.title": "404",
    "notfound.body": "ESTA PÁGINA NO EXISTE.",
    "notfound.backHome": "VOLVER AL INICIO",
    "project.label": "PROYECTO",
    "project.back": "ATRÁS",
    "project.next": "SIGUIENTE",
    "logoteca.title": "LOGOTECA",
  },
}

export function t(lang: Lang, key: I18nKey): string {
  return STRINGS[lang][key]
}
