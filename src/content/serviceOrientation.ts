import type { Lang } from '@/i18n/lang'
import type { CommercialId } from './commercialPages'
import type { ServiceSlug } from './servicePages'

export const SERVICE_DISCIPLINES: Record<CommercialId, ServiceSlug[]> = {
  branding: ['brand-strategy', 'branding-visual-identity'],
  'graphic-design': ['branding-visual-identity'],
  'web-design': ['web-design-digital-products'],
  'web-development': ['web-design-digital-products'],
}

// Clarify the existing offer rather than promising additional services.
export const SERVICE_ORIENTATION: Record<Lang, Record<CommercialId, { title: string; text: string }>> = {
  ca: {
    branding: { title: 'Un estudi de branding per definir i aplicar la marca', text: 'El branding connecta el posicionament amb la identitat visual. Si encara cal decidir què explica la marca, comencem per l’estratègia; si la direcció ja està definida, podem concentrar el treball en el sistema visual i les aplicacions. Logotip, tipografia, color i criteris d’ús formen part d’un abast que concretem amb exemples del teu negoci.' },
    'graphic-design': { title: 'Disseny gràfic per a peces amb una funció concreta', text: 'Aquest servei s’adreça a qui necessita cartells, menús, presentacions, publicacions o comunicació digital. Partim de la identitat disponible i acordem formats, contingut i condicions de producció. Si cal crear o replantejar la marca, ho abordem com un projecte de branding abans d’aplicar-la. Gent Gran de Calonge i Sant Antoni i El Xiringuito mostren dos contextos d’aplicació.' },
    'web-design': { title: 'Pàgines web a mida, amb contingut i recorreguts definits', text: 'El disseny web resol l’estructura de pàgines, la navegació, la jerarquia, la interfície i l’adaptació al mòbil. Pots començar amb una web nova o preparar un redisseny. Revisem qui la consultarà, què ha de poder fer i quins textos i imatges tens. Si també necessites construir-la, concretem el desenvolupament dins de la proposta.' },
    'web-development': { title: 'Programació web a mida amb un abast concret', text: 'El desenvolupament converteix un disseny i uns requisits en una web que es pot utilitzar. Pots arribar amb les pantalles definides o contractar disseny i implementació conjuntament. Acordem pàgines, components, formularis, idiomes i connexions, i revisem els recorreguts abans de publicar. El gestor de contingut, l’allotjament i el manteniment es concreten segons el projecte.' },
  },
  es: {
    branding: { title: 'Un estudio de branding para definir y aplicar la marca', text: 'El branding conecta el posicionamiento con la identidad visual. Si todavía hay que decidir qué explica la marca, empezamos por la estrategia; si la dirección está definida, podemos concentrar el trabajo en el sistema visual y las aplicaciones. Logotipo, tipografía, color y criterios de uso forman parte de un alcance que concretamos con ejemplos de tu negocio.' },
    'graphic-design': { title: 'Diseño gráfico para piezas con una función concreta', text: 'Este servicio se dirige a quien necesita carteles, menús, presentaciones, publicaciones o comunicación digital. Partimos de la identidad disponible y acordamos formatos, contenido y condiciones de producción. Si hay que crear o replantear la marca, lo abordamos como un proyecto de branding antes de aplicarla. Gent Gran de Calonge i Sant Antoni y El Xiringuito muestran dos contextos de aplicación.' },
    'web-design': { title: 'Páginas web a medida, con contenido y recorridos definidos', text: 'El diseño web resuelve la estructura de páginas, la navegación, la jerarquía, la interfaz y la adaptación al móvil. Puedes empezar con una web nueva o preparar un rediseño. Revisamos quién la consultará, qué debe poder hacer y qué textos e imágenes tienes. Si también necesitas construirla, concretamos el desarrollo en la propuesta.' },
    'web-development': { title: 'Programación y desarrollo web con un alcance concreto', text: 'El desarrollo convierte un diseño y unos requisitos en una web que se puede utilizar. Puedes llegar con las pantallas definidas o contratar diseño e implementación conjuntamente. Acordamos páginas, componentes, formularios, idiomas y conexiones, y revisamos los recorridos antes de publicar. El gestor de contenido, el alojamiento y el mantenimiento se concretan según el proyecto.' },
  },
  en: {
    branding: { title: 'A branding studio for defining and applying your identity', text: 'Branding connects positioning with visual identity. If the brand’s message still needs definition, we start with strategy; if the direction is established, we can focus on the visual system and its applications. Logo, typography, colour and usage guidelines belong to a scope agreed through examples from your business.' },
    'graphic-design': { title: 'Graphic design for materials with a specific purpose', text: 'This service covers posters, menus, presentations, publications and digital communication. We work from the available identity and agree on formats, content and production requirements. If the brand needs to be created or rethought, we address that through branding before applying it. Gent Gran de Calonge i Sant Antoni and El Xiringuito show two application contexts.' },
    'web-design': { title: 'Bespoke websites with clear content and navigation', text: 'Web design establishes page structure, navigation, hierarchy, interface and mobile layouts. You can start with a new website or prepare a redesign. We review who will use it, what they need to do and which texts and images are available. If you also need implementation, we agree on development within the proposal.' },
    'web-development': { title: 'Web development from an agreed design and scope', text: 'Development turns a design and requirements into a working website. You can bring defined screens or commission design and implementation together. We agree on pages, components, forms, languages and connections, then review visitor journeys before publication. Content management, hosting and maintenance are specified for each project.' },
  },
}
