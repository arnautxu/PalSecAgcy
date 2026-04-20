import type { Lang } from "./lang"

export type I18nKey =
  | "nav.services"
  | "nav.projects"
  | "nav.about"
  | "nav.cta"
  | "home.play"
  | "home.pause"
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
    "nav.cta": "LET’S TALK?",
    "home.play": "PLAY",
    "home.pause": "PAUSE",
    "projects.title": "PROJECTS",
    "projects.lead":
      "A SELECTION OF PROJECTS ACROSS BRANDING, DIGITAL PRODUCT, AND VISUAL SYSTEMS. IF YOU WANT TO REVIEW YOUR PROJECT TOGETHER, LET’S TALK.",
    "services.title": "SERVICES",
    "services.p1":
      "BRAND STRATEGY · BRANDING · WEB DESIGN · PRINT GRAPHICS · MOTION GRAPHICS · CREATIVE DIRECTION",
    "services.p2":
      "WE WORK FROM DEFINITION TO EXECUTION: POSITIONING, NAMING, TONE OF VOICE, VISUAL SYSTEM, AND APPLICATIONS.",
    "services.p3":
      "WE DESIGN EDITORIAL WEBSITES AND DIGITAL PRODUCTS WITH UX/UI, COMPONENTS, AND SCALABLE SYSTEMS. WE ALSO DEPLOY IDENTITIES ACROSS PRINT PIECES AND SPATIAL MATERIALS.",
    "services.cta": "IF YOU HAVE AN IDEA OR A BRAND IN EVOLUTION, LET’S TALK ABOUT YOUR PROJECT.",
    "about.title": "ABOUT US",
    "about.p1":
      "PALSEC AGCY IS A DESIGN-LED STUDIO WORKING ACROSS BRAND, DIGITAL, AND VISUAL SYSTEMS.",
    "about.p2": "WE BUILD PRECISE, MINIMAL, HIGH-CONTRAST EXPERIENCES.",
    "about.contactPrefix": "BASED IN COSTA BRAVA · AVAILABLE WORLDWIDE ·",
    "notfound.title": "404",
    "notfound.body": "THIS PAGE DOESN’T EXIST.",
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
    "projects.title": "PROJECTES",
    "projects.lead":
      "SELECCIÓ DE PROJECTES EN BRANDING, PRODUCTE DIGITAL I SISTEMES VISUALS. SI VOLS QUE HO MIREM JUNTS, PARLEM DEL TEU PROJECTE.",
    "services.title": "SERVEIS",
    "services.p1":
      "ESTRATÈGIA DE MARCA · BRANDING · DISSENY WEB · GRÀFICA IMPRESA · MOTION GRAPHICS · DIRECCIÓ CREATIVA",
    "services.p2":
      "TREBALLEM DES DE LA DEFINICIÓ FINS A L’EXECUCIÓ: POSICIONAMENT, NOMENCLATURA, TO DE VEU, SISTEMA VISUAL I APLICACIONS.",
    "services.p3":
      "DISSENYEM WEBS EDITORIALS I PRODUCTES DIGITALS AMB UX/UI, COMPONENTS I SISTEMES ESCALABLES. TAMBÉ DESPLEGUEM IDENTITATS EN PECES IMPRESES I MATERIALS D’ESPAI.",
    "services.cta": "SI TENS UNA IDEA O UNA MARCA EN EVOLUCIÓ, PARLEM DEL TEU PROJECTE.",
    "about.title": "SOBRE NOSALTRES",
    "about.p1":
      "PALSEC AGCY ÉS UN ESTUDI ORIENTAT AL DISSENY QUE TREBALLA EN MARCA, DIGITAL I SISTEMES VISUALS.",
    "about.p2": "CONSTRUÏM EXPERIÈNCIES PRECÍSES, MINIMALS I D’ALT CONTRAST.",
    "about.contactPrefix": "BASATS A LA COSTA BRAVA · DISPONIBLES ARREU ·",
    "notfound.title": "404",
    "notfound.body": "AQUESTA PÀGINA NO EXISTEIX.",
    "notfound.backHome": "TORNAR A L’INICI",
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
    "projects.title": "PROYECTOS",
    "projects.lead":
      "UNA SELECCIÓN DE PROYECTOS EN BRANDING, PRODUCTO DIGITAL Y SISTEMAS VISUALES. SI QUIERES QUE LO VEAMOS JUNTOS, HABLEMOS DE TU PROYECTO.",
    "services.title": "SERVICIOS",
    "services.p1":
      "ESTRATEGIA DE MARCA · BRANDING · DISEÑO WEB · GRÁFICA IMPRESA · MOTION GRAPHICS · DIRECCIÓN CREATIVA",
    "services.p2":
      "TRABAJAMOS DESDE LA DEFINICIÓN HASTA LA EJECUCIÓN: POSICIONAMIENTO, NOMENCLATURA, TONO DE VOZ, SISTEMA VISUAL Y APLICACIONES.",
    "services.p3":
      "DISEÑAMOS WEBS EDITORIALES Y PRODUCTOS DIGITALES CON UX/UI, COMPONENTES Y SISTEMAS ESCALABLES. TAMBIÉN DESPLEGAMOS IDENTIDADES EN PIEZAS IMPRESAS Y MATERIALES ESPACIALES.",
    "services.cta": "SI TIENES UNA IDEA O UNA MARCA EN EVOLUCIÓN, HABLEMOS DE TU PROYECTO.",
    "about.title": "SOBRE NOSOTROS",
    "about.p1":
      "PALSEC AGCY ES UN ESTUDIO ORIENTADO AL DISEÑO QUE TRABAJA EN MARCA, DIGITAL Y SISTEMAS VISUALES.",
    "about.p2": "CREAMOS EXPERIENCIAS PRECISAS, MÍNIMAS Y DE ALTO CONTRASTE.",
    "about.contactPrefix": "CON BASE EN COSTA BRAVA · DISPONIBLES EN TODO EL MUNDO ·",
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

