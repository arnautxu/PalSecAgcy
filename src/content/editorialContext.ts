import type { Lang } from '@/i18n/lang'
import type { CommercialId } from './commercialPages'

type EditorialContext = {
  home: string
  selected: string
  projects: string
  collections: string
  steps: readonly [string, string, string]
  proof: string
  services: Record<CommercialId, string>
}

// Scope and examples come from the existing portfolio and service copy.
export const EDITORIAL_CONTEXT: Record<Lang, EditorialContext> = {
  ca: {
    home: 'Una marca necessita un llenguatge propi; una web, continguts i recorreguts que es puguin entendre i utilitzar. Treballem aquestes decisions conjuntament, amb un abast acordat des del principi.',
    selected: 'PocketVoice connecta marca i presentació digital d’un teclat de veu. El Xiringuito porta una identitat visual a les peces d’un projecte de restauració. Dos contextos per veure com una idea es concreta en aplicacions.',
    projects: 'Una selecció d’identitats, sistemes gràfics, webs i interfícies. Entra als casos per veure les peces i consultar l’àmbit de cada treball.',
    collections: 'La Weboteca reuneix webs amb vistes d’escriptori i mòbil i enllaços per explorar-les. La Logoteca presenta treballs de logotip. PALSEC AI LAB mostra un prototip interactiu d’AiBrain amb dades fictícies de demostració.',
    steps: [
      'Escoltem, definim el repte i acordem prioritats. Revisem els materials existents i concretem què dissenyem, què desenvolupem i què ha d’aportar cada part.',
      'Explorem una direcció i la contrastem amb aplicacions reals. Les revisions se centren en peces concretes i en les decisions d’identitat, contingut i interfície que les sostenen.',
      'Dissenyem, construïm i preparem el lliurament. Revisem els suports inclosos en l’abast perquè la identitat, la web o el producte puguin continuar amb coherència, segons el treball acordat.',
    ],
    proof: 'PocketVoice mostra la relació entre marca, missatge de producte i presentació digital. La Weboteca permet explorar webs amb captures d’escriptori i mòbil i accés als projectes publicats.',
    services: {
      branding: 'Definim la direcció de marca i un sistema visual que es pugui aplicar.',
      'web-design': 'Ordenem continguts, navegació i disseny perquè la web expressi la marca i orienti qui la visita.',
      'web-development': 'Convertim el disseny en pàgines i components que funcionin en escriptori i mòbil.',
      'graphic-design': 'Apliquem la identitat a les peces de comunicació acordades.',
    },
  },
  es: {
    home: 'Una marca necesita un lenguaje propio; una web, contenidos y recorridos que se puedan entender y utilizar. Trabajamos estas decisiones conjuntamente, con un alcance acordado desde el principio.',
    selected: 'PocketVoice conecta marca y presentación digital de un teclado de voz. El Xiringuito lleva una identidad visual a las piezas de un proyecto de restauración. Dos contextos para ver cómo una idea se concreta en aplicaciones.',
    projects: 'Una selección de identidades, sistemas gráficos, webs e interfaces. Entra en los casos para ver las piezas y consultar el alcance de cada trabajo.',
    collections: 'La Weboteca reúne webs con vistas de escritorio y móvil y enlaces para explorarlas. La Logoteca presenta trabajos de logotipo. PALSEC AI LAB muestra un prototipo interactivo de AiBrain con datos ficticios de demostración.',
    steps: [
      'Escuchamos, definimos el reto y acordamos prioridades. Revisamos los materiales existentes y concretamos qué diseñamos, qué desarrollamos y qué debe aportar cada parte.',
      'Exploramos una dirección y la contrastamos con aplicaciones reales. Las revisiones se centran en piezas concretas y en las decisiones de identidad, contenido e interfaz que las sostienen.',
      'Diseñamos, construimos y preparamos la entrega. Revisamos los soportes incluidos en el alcance para que la identidad, la web o el producto puedan continuar con coherencia, según el trabajo acordado.',
    ],
    proof: 'PocketVoice muestra la relación entre marca, mensaje de producto y presentación digital. La Weboteca permite explorar webs con capturas de escritorio y móvil y acceso a los proyectos publicados.',
    services: {
      branding: 'Definimos la dirección de marca y un sistema visual que se pueda aplicar.',
      'web-design': 'Ordenamos contenidos, navegación y diseño para que la web exprese la marca y oriente a quien la visita.',
      'web-development': 'Convertimos el diseño en páginas y componentes que funcionen en escritorio y móvil.',
      'graphic-design': 'Aplicamos la identidad a las piezas de comunicación acordadas.',
    },
  },
  en: {
    home: 'A brand needs a language of its own; a website needs content and navigation that people can understand and use. We work on those decisions together, with the scope agreed from the start.',
    selected: 'PocketVoice connects branding and the digital presentation of a voice keyboard. El Xiringuito applies a visual identity to materials for a hospitality project. Two contexts that show how an idea takes shape through its applications.',
    projects: 'A selection of identities, graphic systems, websites and interfaces. Open the cases to see the work and read about the scope of each project.',
    collections: 'Weboteca brings together websites with desktop and mobile views and links to explore them. Logoteca presents logo work. PALSEC AI LAB shows an interactive AiBrain prototype with fictional demonstration data.',
    steps: [
      'Listen, define the challenge and agree on priorities. We review the existing materials and establish what we design, what we develop and what each party provides.',
      'Explore a direction and test it through real applications. Reviews focus on specific pieces and the identity, content and interface decisions behind them.',
      'Design, build and prepare the handover. We review the materials included in the scope so the identity, website or product can continue coherently, according to the agreed work.',
    ],
    proof: 'PocketVoice shows the relationship between branding, product messaging and digital presentation. Weboteca lets you explore websites through desktop and mobile views, with links to the published projects.',
    services: {
      branding: 'We establish a brand direction and a visual system for its applications.',
      'web-design': 'We organise content, navigation and design so the website expresses the brand and guides its visitors.',
      'web-development': 'We turn the design into pages and components that work on desktop and mobile.',
      'graphic-design': 'We apply the identity to the agreed communication materials.',
    },
  },
}
