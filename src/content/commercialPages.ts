import type { Lang } from "@/i18n/lang"
import type { ProjectSlug } from "@/data/projects"

export const COMMERCIAL_IDS = ["web-design", "web-development", "branding", "graphic-design"] as const
export type CommercialId = (typeof COMMERCIAL_IDS)[number]

const NAV_LABELS: Record<Lang, Record<CommercialId, string>> = {
  ca: { "web-design": "Disseny web", "web-development": "Desenvolupament web", branding: "Branding", "graphic-design": "Disseny gràfic" },
  es: { "web-design": "Diseño web", "web-development": "Desarrollo web", branding: "Branding", "graphic-design": "Diseño gráfico" },
  en: { "web-design": "Web design", "web-development": "Web development", branding: "Branding", "graphic-design": "Graphic design" },
}

export function commercialNavLabel(lang: Lang, id: CommercialId): string {
  return NAV_LABELS[lang][id]
}

export const COMMERCIAL_PATHS: Record<CommercialId, Record<Lang, string>> = {
  "web-design": { es: "/es/diseno-web-girona", ca: "/ca/disseny-web-girona", en: "/en/web-design-girona" },
  "web-development": { es: "/es/desarrollo-web-girona", ca: "/ca/desenvolupament-web-girona", en: "/en/web-development-girona" },
  branding: { es: "/es/branding-girona", ca: "/ca/branding-girona", en: "/en/branding-girona" },
  "graphic-design": { es: "/es/diseno-grafico-girona", ca: "/ca/disseny-grafic-girona", en: "/en/graphic-design-girona" },
}

export type CommercialPage = {
  id: CommercialId
  lang: Lang
  path: string
  label: string
  title: string
  seoTitle: string
  description: string
  serviceType: string
  intro: string
  sections: { title: string; paragraphs: string[] }[]
  process: { title: string; text: string }[]
  deliverables: string[]
  scope: string
  faqs: { question: string; answer: string }[]
  proofTitle: string
  proofIntro: string
  relatedProjects: { slug: ProjectSlug; note: string }[]
  ctaTitle: string
  ctaText: string
  ctaLabel: string
}

type PageCopy = Omit<CommercialPage, "id" | "lang" | "path">

const ES: Record<CommercialId, PageCopy> = {
  "web-design": {
    label: "Diseño web en Girona",
    title: "Diseño web en Girona para marcas que quieren destacar",
    seoTitle: "Diseño web en Girona | Páginas web a medida — PALSEC",
    description: "Diseñamos páginas web en Girona con estrategia, UX/UI y desarrollo. Webs a medida que explican tu marca y facilitan el contacto con tus próximos clientes.",
    serviceType: "Diseño web",
    intro: "Una web tiene que explicar quién eres, transmitir por qué eres diferente y ayudar a la persona adecuada a dar el siguiente paso. En PALSEC conectamos estrategia, identidad y tecnología para diseñar páginas web a medida. Trabajamos desde Girona y Costa Brava con empresas y equipos que necesitan una presencia digital clara, reconocible y útil para su negocio.",
    sections: [
      { title: "Diseño y desarrollo web de principio a fin", paragraphs: [
        "Cada proyecto empieza entendiendo el negocio antes de dibujar la primera pantalla. Revisamos qué ofreces, a quién te diriges, qué preguntas repite tu cliente y qué debe conseguir la web. Con esa base definimos páginas, recorridos y prioridades. Una web corporativa que recibe consultas no necesita la misma estructura que un catálogo, un portfolio o una página de lanzamiento.",
        "Diseño y desarrollo se plantean juntos para que las decisiones visuales tengan una traducción viable. La arquitectura ordena el contenido; la experiencia de usuario facilita la navegación; la dirección de arte aporta personalidad. Después, la implementación convierte ese trabajo en una web adaptable a distintas pantallas y preparada para publicar contenido real.",
      ] },
      { title: "Una web que pertenece a tu marca", paragraphs: [
        "Tipografía, composición, imágenes y movimiento deben responder a una misma idea. Partimos de tu identidad, o la trabajamos contigo si todavía necesita definición, y la trasladamos a un lenguaje digital. Buscamos que la web se reconozca como tuya y que el diseño ayude a entender la oferta, sin obligar al visitante a descifrar cada interacción.",
        "El nivel de personalización se decide según el proyecto. Una solución a medida tiene sentido cuando mejora la arquitectura, la expresión de marca o la funcionalidad. También valoramos las herramientas existentes, el presupuesto y quién actualizará la web. Antes de elegir tecnología aclaramos qué necesita hacer el equipo después del lanzamiento.",
      ] },
      { title: "Contenido, móvil y SEO desde el principio", paragraphs: [
        "Trabajamos con textos e imágenes representativos para comprobar jerarquías, longitudes y legibilidad. En móvil revisamos navegación, tamaño de letra, botones y recorridos completos. Una persona debe poder conocer tus servicios, consultar un proyecto y contactar sin depender de una pantalla grande ni de efectos difíciles de utilizar.",
        "La base SEO incluye una estructura de páginas comprensible, encabezados ordenados, títulos y descripciones, enlaces internos y criterios de indexación. Si hay varios idiomas, definimos sus contenidos y direcciones. En un rediseño revisamos las páginas existentes para planificar redirecciones cuando cambian las URLs. El posicionamiento también dependerá del contenido, la competencia y el trabajo posterior a la publicación.",
      ] },
      { title: "Diseño web para empresas de Girona y Costa Brava", paragraphs: [
        "Trabajamos con negocios locales y equipos de otros lugares. La cercanía facilita conocer el contexto, pero organizamos el proyecto para que también funcione a distancia: objetivos compartidos, revisiones concretas y decisiones documentadas. El alcance puede empezar por una web corporativa y prever nuevas secciones cuando exista contenido para desarrollarlas.",
        "Para preparar una propuesta necesitamos entender el objetivo, las páginas previstas, los idiomas, las funcionalidades y el estado de los materiales. También acordamos quién redacta, quién valida y quién mantendrá la web. Esta conversación permite construir un presupuesto alrededor de necesidades reales y una secuencia de trabajo que tu equipo pueda asumir.",
      ] },
    ],
    process: [
      { title: "Definir", text: "Revisamos objetivos, públicos y contenido. Dibujamos la arquitectura y acordamos el alcance, las responsabilidades y los criterios para considerar la web preparada para salir." },
      { title: "Diseñar", text: "Ordenamos los recorridos y exploramos la dirección visual. El diseño se prueba con contenido representativo y versiones de móvil y escritorio antes de desarrollar todas las páginas." },
      { title: "Construir", text: "Implementamos las páginas y los componentes acordados. Integramos el gestor de contenido o las conexiones necesarias y revisamos la fidelidad al diseño durante el proceso." },
      { title: "Revisar y publicar", text: "Comprobamos enlaces, formularios, adaptación a pantallas y configuración SEO. Acordamos el lanzamiento, la entrega de accesos y las necesidades de mantenimiento o evolución." },
    ],
    deliverables: ["Arquitectura de información y recorridos", "Diseño de experiencia e interfaz", "Dirección visual y componentes adaptables", "Desarrollo de las páginas acordadas", "Gestor de contenido, si el alcance lo requiere", "Configuración SEO y medición acordada", "Revisión previa a publicación y entrega"],
    scope: "Cada propuesta especifica páginas, idiomas, funcionalidades, rondas de revisión y responsabilidades. Textos, fotografía, traducciones, alojamiento, licencias y mantenimiento se concretan antes de empezar; su inclusión depende del alcance acordado.",
    faqs: [
      { question: "¿Cuánto cuesta diseñar una página web?", answer: "Depende de las páginas, los idiomas, la complejidad visual y las funcionalidades. Después de conocer el proyecto podemos definir un alcance y un presupuesto. Conviene comparar qué incluye cada propuesta: diseño, desarrollo, contenido, lanzamiento y soporte." },
      { question: "¿Podéis encargaros del diseño y del desarrollo?", answer: "Sí. Podemos trabajar el proceso completo o colaborar con un equipo de desarrollo existente. Al inicio aclaramos quién implementa, quién aporta el contenido y cómo se revisa el resultado para que las responsabilidades sean claras." },
      { question: "¿Cuánto tiempo necesita una web?", answer: "El calendario depende del alcance y de la disponibilidad de contenidos y validaciones. Lo planteamos por fases con entregas concretas. Una página de lanzamiento y una web multilingüe con integraciones requieren planificaciones distintas." },
      { question: "¿Podré actualizarla después?", answer: "Si necesitas editar contenido, definimos qué partes debe gestionar tu equipo y elegimos una solución adecuada. La formación, los permisos y el mantenimiento se concretan en la propuesta para que la web siga siendo útil después de publicarla." },
    ],
    proofTitle: "Diseño digital en nuestro portfolio",
    proofIntro: "Estos proyectos muestran nuestro trabajo en experiencia de usuario e interfaces de aplicaciones. Permiten conocer decisiones de diseño digital que también importan en una web: jerarquía, navegación y coherencia visual.",
    relatedProjects: [{ slug: "vira", note: "Diseño de una aplicación para adolescentes con TDAH." }, { slug: "galeon", note: "Aplicación interactiva para explorar las Colecciones Reales." }],
    ctaTitle: "¿Tienes una web en mente?",
    ctaText: "Cuéntanos qué hace tu empresa, qué necesita cambiar y qué te gustaría conseguir con la nueva web.",
    ctaLabel: "Cuéntanos tu proyecto",
  },
  "web-development": {
    label: "Desarrollo web en Girona",
    title: "Desarrollo web en Girona, del diseño a una web real",
    seoTitle: "Desarrollo web en Girona | Webs a medida — PALSEC",
    description: "Desarrollo web a medida en Girona. Implementación fiel al diseño, adaptación móvil, rendimiento, gestión de contenidos y preparación para el lanzamiento.",
    serviceType: "Desarrollo web",
    intro: "Una buena interfaz necesita una implementación a su altura. Desarrollamos webs cuidando lo que ve el usuario y lo que el equipo necesita para mantenerlas: componentes consistentes, contenido editable cuando hace falta y una publicación bien preparada. Desde Girona colaboramos en proyectos completos y en la implementación de diseños que ya tienen una dirección definida.",
    sections: [
      { title: "De las pantallas a un sistema que funciona", paragraphs: [
        "Antes de programar revisamos páginas, estados y comportamientos. Un diseño también debe explicar qué ocurre cuando falta una imagen, el texto crece, el formulario tiene un error o alguien navega con teclado. Resolver estas situaciones evita que las decisiones importantes aparezcan por sorpresa al final del proyecto.",
        "El desarrollo puede abarcar una web corporativa, una página de lanzamiento, un portfolio o una experiencia interactiva. Los gestores de contenido, catálogos e integraciones se evalúan según las necesidades reales. Elegimos la solución teniendo en cuenta la complejidad, las dependencias y quién se responsabilizará de mantenerla.",
      ] },
      { title: "Rendimiento y adaptación a cada pantalla", paragraphs: [
        "Revisamos el peso de las imágenes, la carga de tipografías y el coste de vídeos y animaciones. El objetivo es preservar la dirección visual mientras reducimos esperas y movimientos inesperados. Las mediciones ayudan a detectar qué conviene corregir y qué compromisos implica cada recurso.",
        "La versión móvil se trabaja como una experiencia completa. Ajustamos menús, distribución, lectura e interacciones táctiles, y revisamos pantallas intermedias. También comprobamos foco visible, etiquetas y controles para que las funciones esenciales no dependan únicamente de un ratón o de una animación.",
      ] },
      { title: "SEO desde el código y publicación ordenada", paragraphs: [
        "La estructura técnica debe permitir entender e indexar el contenido. Trabajamos HTML semántico, metadatos, enlaces, canonicals, sitemap y reglas de rastreo según el tipo de web. En proyectos multilingües relacionamos correctamente las versiones de cada página y evitamos que rutas distintas compitan por el mismo contenido.",
        "Antes de publicar revisamos los recorridos principales, los formularios y la configuración del dominio. Si sustituimos una web existente, acordamos redirecciones y el tratamiento de sus URLs. La entrega concreta accesos, dependencias, documentación y responsabilidades: el alojamiento y el mantenimiento se definen como parte del alcance.",
      ] },
    ],
    process: [
      { title: "Revisión técnica", text: "Contrastamos el diseño con funcionalidades, contenidos, integraciones y limitaciones. Acordamos qué se construye y cómo se comprobará." },
      { title: "Implementación", text: "Construimos componentes y páginas, conectamos los servicios previstos y revisamos el resultado con contenido representativo." },
      { title: "Validación", text: "Probamos los recorridos acordados, la adaptación móvil, la navegación por teclado y los aspectos técnicos del SEO." },
      { title: "Lanzamiento", text: "Publicamos la versión aprobada y comprobamos la web en su dominio. Documentamos la entrega y los siguientes pasos de mantenimiento." },
    ],
    deliverables: ["Implementación adaptable a móvil y escritorio", "Componentes y comportamientos acordados", "Gestor de contenido o integraciones definidas", "Configuración técnica de SEO", "Revisión de rendimiento y funciones principales", "Publicación y documentación de entrega"],
    scope: "El presupuesto depende de las plantillas de página, estados, idiomas e integraciones. Concretamos también migración de contenido, servicios externos, alojamiento y soporte. Las funciones de comercio electrónico o áreas privadas requieren una definición específica.",
    faqs: [
      { question: "¿Podéis desarrollar un diseño existente?", answer: "Sí. Primero revisamos el archivo de diseño, sus versiones móviles y los comportamientos previstos. Si faltan estados o decisiones funcionales, los identificamos antes de cerrar el alcance." },
      { question: "¿Qué tecnología utilizáis?", answer: "La elección depende del contenido, las funcionalidades y la capacidad de mantenimiento del equipo. Explicamos las opciones y sus implicaciones antes de decidir; la herramienta debe responder al proyecto." },
      { question: "¿Incluye mantenimiento?", answer: "El lanzamiento y el mantenimiento son fases que se concretan en la propuesta. Acordamos qué actualizaciones, soporte y evoluciones necesitará la web y quién se responsabiliza de cada parte." },
      { question: "¿Garantizáis una puntuación de velocidad?", answer: "Definimos objetivos y medimos para orientar las mejoras. El resultado varía según contenidos, integraciones, dispositivo y conexión. Las pruebas permiten acordar prioridades sin convertir una puntuación aislada en la única medida de calidad." },
    ],
    proofTitle: "Referencias de experiencia digital",
    proofIntro: "Vira y Galeón muestran trabajo de interfaz y producto digital. Sus casos permiten revisar el enfoque de diseño; el alcance de desarrollo para tu web se define de forma específica en la propuesta.",
    relatedProjects: [{ slug: "vira", note: "Experiencia e interfaz de una aplicación." }, { slug: "galeon", note: "Navegación y contenido en una aplicación interactiva." }],
    ctaTitle: "Explícanos qué quieres construir",
    ctaText: "Podemos empezar por tu diseño, la web actual o una lista de necesidades que todavía hay que ordenar.",
    ctaLabel: "Hablemos del desarrollo",
  },
  branding: {
    label: "Branding en Girona",
    title: "Branding en Girona para marcas que quieren significar algo",
    seoTitle: "Branding en Girona | Estrategia e identidad de marca — PALSEC",
    description: "Estrategia, identidad visual y dirección de arte en Girona. Creamos marcas con personalidad y sistemas que funcionan en aplicaciones físicas y digitales.",
    serviceType: "Branding e identidad visual",
    intro: "Una marca necesita una idea clara y una forma propia de expresarla. En PALSEC trabajamos estrategia, identidad visual y aplicaciones como partes del mismo proyecto. Desde Girona y Costa Brava ayudamos a nuevas marcas y a equipos que necesitan ordenar, actualizar o replantear su identidad para que cada contacto con el público tenga sentido.",
    sections: [
      { title: "Una marca no empieza por el logo", paragraphs: [
        "Antes de diseñar, necesitamos entender qué debe representar la marca y para quién. Revisamos la oferta, el contexto, los materiales existentes y las decisiones que el equipo tiene por delante. Esta primera fase permite distinguir un problema de posicionamiento de una identidad que simplemente necesita expresarse mejor.",
        "La estrategia fija criterios para tomar decisiones: qué propuesta priorizar, qué personalidad transmitir y qué mensajes sostienen la marca. La profundidad de la investigación se ajusta al proyecto. Si hace falta trabajar el nombre o la arquitectura de marcas, se define como una parte específica del alcance.",
      ] },
      { title: "Un sistema visual con personalidad", paragraphs: [
        "Exploramos una dirección visual y desarrollamos las relaciones entre logotipo, tipografía, color, composición e imagen. Cada elemento debe funcionar por sí mismo y formar parte de un conjunto reconocible. Probamos la identidad en las aplicaciones que más importan al proyecto para evaluar su legibilidad, flexibilidad y carácter.",
        "El objetivo es que la marca pueda vivir en una web, una presentación, una pieza impresa o una red social sin empezar de nuevo en cada soporte. Las reglas deben aportar coherencia y dejar espacio para comunicar cosas distintas. Una identidad útil también tiene en cuenta los recursos de quienes la van a utilizar.",
      ] },
      { title: "De la identidad a sus aplicaciones reales", paragraphs: [
        "Priorizamos las piezas que necesitas para poner la marca en marcha. Pueden ser materiales corporativos, plantillas de comunicación, aplicaciones digitales o criterios de dirección de arte. La guía documenta cómo utilizar el sistema y la entrega reúne los archivos acordados para que el equipo y sus proveedores trabajen con una referencia común.",
        "En un rediseño revisamos qué conviene conservar y qué puede cambiar. El reconocimiento existente tiene valor, y la transición puede hacerse por fases. Trabajamos con proyectos de Girona y Costa Brava y con equipos de otros lugares mediante un proceso de revisión y validación compartido.",
      ] },
    ],
    process: [
      { title: "Entender", text: "Revisamos contexto, objetivos, públicos y materiales. Identificamos las decisiones que la marca necesita resolver y acordamos prioridades." },
      { title: "Dar dirección", text: "Definimos criterios estratégicos y exploramos una dirección visual que represente la propuesta y la personalidad de la marca." },
      { title: "Construir el sistema", text: "Desarrollamos logotipo, tipografía, color y recursos gráficos. Contrastamos su funcionamiento en aplicaciones representativas." },
      { title: "Preparar el uso", text: "Producimos las piezas acordadas, reunimos los archivos y documentamos criterios para mantener la identidad en nuevos materiales." },
    ],
    deliverables: ["Criterios de posicionamiento y personalidad", "Logotipo y versiones acordadas", "Sistema tipográfico y paleta de color", "Recursos gráficos y dirección de imagen", "Aplicaciones prioritarias de la marca", "Guía de identidad y archivos finales"],
    scope: "La propuesta concreta la investigación, las aplicaciones, las revisiones y los formatos de entrega. Naming, redacción, fotografía, producción física y diseño web se incorporan cuando son necesarios y se presupuestan según el alcance.",
    faqs: [
      { question: "¿Qué diferencia hay entre branding y un logotipo?", answer: "El logotipo es uno de los signos de la marca. Un proyecto de branding también puede definir posicionamiento, personalidad, lenguaje y un sistema visual que permita aplicar la identidad con coherencia." },
      { question: "¿Podéis actualizar una marca existente?", answer: "Sí. Primero revisamos qué funciona, qué genera confusión y qué ha cambiado en el negocio. Con esa información acordamos si conviene ajustar el sistema o desarrollar una nueva dirección." },
      { question: "¿Qué necesito para empezar?", answer: "Una explicación del proyecto, sus públicos, sus objetivos y los materiales disponibles. Si todavía hay decisiones abiertas, la fase inicial ayuda a ordenarlas antes de avanzar con la parte visual." },
      { question: "¿La identidad puede aplicarse después a una web?", answer: "Sí. Diseñamos el sistema teniendo en cuenta sus usos digitales. El diseño y desarrollo de la web pueden formar parte de una fase posterior o de un proyecto conjunto, con alcance y entregables definidos." },
    ],
    proofTitle: "Identidades que puedes explorar",
    proofIntro: "Nuestro portfolio permite ver cómo cambia el lenguaje visual según el contexto: restauración, alquiler para eventos y exploración de signos de marca.",
    relatedProjects: [{ slug: "el-xiringuito", note: "Identidad de un restaurante de costa." }, { slug: "enteza", note: "Marca de alquiler de mobiliario y menaje para eventos." }, { slug: "logoteca", note: "Colección de diseños de logotipos." }],
    ctaTitle: "¿Estás creando o replanteando una marca?",
    ctaText: "Cuéntanos en qué punto estás y qué necesitas que la identidad ayude a resolver.",
    ctaLabel: "Hablemos de tu marca",
  },
  "graphic-design": {
    label: "Diseño gráfico en Girona",
    title: "Diseño gráfico en Girona con una idea detrás",
    seoTitle: "Diseño gráfico en Girona | Identidad y comunicación — PALSEC",
    description: "Diseño gráfico en Girona para comunicar con claridad. Sistemas visuales, piezas editoriales, presentaciones y aplicaciones coherentes con tu marca.",
    serviceType: "Diseño gráfico",
    intro: "Una presentación, un cartel o una publicación digital tienen que resolver una necesidad concreta de comunicación. En PALSEC diseñamos piezas y sistemas gráficos que ordenan la información y expresan la personalidad de la marca. Trabajamos desde Girona con negocios, organizaciones y equipos que necesitan coherencia entre sus materiales físicos y digitales.",
    sections: [
      { title: "Diseño que pertenece a la marca", paragraphs: [
        "Partimos de lo que necesitas contar, del público y del contexto en el que se verá la pieza. La jerarquía del mensaje llega antes que los recursos decorativos. Revisamos la identidad disponible y definimos cómo deben trabajar tipografía, composición, imagen y color para que la información sea clara y la marca reconocible.",
        "Cuando existe una identidad, la aplicamos con criterio a nuevas necesidades. Si faltan reglas o recursos, detectamos qué conviene completar. El diseño gráfico puede resolver una pieza concreta o construir un sistema de formatos; un replanteamiento completo de la marca se aborda como un proyecto de branding.",
      ] },
      { title: "Piezas impresas y comunicación digital", paragraphs: [
        "Podemos trabajar materiales corporativos, publicaciones editoriales, presentaciones, cartelería y piezas digitales. El proyecto define sus formatos, versiones e idiomas antes de producir las adaptaciones. Esta planificación ayuda a que una misma idea mantenga su fuerza en un documento extenso, una pantalla pequeña o una aplicación de gran tamaño.",
        "Los sistemas de plantillas son útiles cuando el equipo publica de forma recurrente. Definimos composiciones, jerarquías y ejemplos para que los contenidos puedan cambiar sin perder coherencia. La herramienta y el nivel de edición se ajustan a quién utilizará los archivos y al tiempo que podrá dedicar a ellos.",
      ] },
      { title: "Del contenido al archivo final", paragraphs: [
        "Trabajamos con materiales reales para ajustar longitudes, ritmos y lectura. El proceso incorpora revisiones de contenido y diseño antes de cerrar los archivos. En piezas impresas concretamos medidas y requisitos técnicos con la información del proveedor; la producción, los acabados y las pruebas se acuerdan según el proyecto.",
        "La entrega diferencia los archivos preparados para publicar o producir y los editables previstos en el alcance. También se concretan licencias de tipografía e imagen cuando corresponda. Trabajamos con proyectos de Girona y Costa Brava, y coordinamos revisiones a distancia con equipos de otros lugares.",
      ] },
    ],
    process: [
      { title: "Definir la comunicación", text: "Concretamos mensaje, público, soporte, formatos y materiales disponibles. Acordamos qué necesita resolver cada pieza y quién valida el contenido." },
      { title: "Diseñar la dirección", text: "Planteamos la composición y el lenguaje gráfico a partir de la identidad. Revisamos una aplicación representativa antes de extenderla." },
      { title: "Desarrollar las piezas", text: "Maquetamos los contenidos, preparamos versiones y comprobamos la coherencia entre formatos, idiomas y soportes." },
      { title: "Preparar la entrega", text: "Revisamos las piezas aprobadas y exportamos los archivos acordados. Documentamos los criterios necesarios para utilizar las plantillas o coordinar la producción." },
    ],
    deliverables: ["Dirección gráfica para la comunicación", "Diseño y maquetación de piezas acordadas", "Adaptaciones a los formatos definidos", "Plantillas editables cuando se necesiten", "Archivos finales para publicación o producción", "Indicaciones de uso y especificaciones acordadas"],
    scope: "El presupuesto se define por número de piezas, páginas, formatos e idiomas. Redacción, traducción, ilustración, fotografía, compra de imágenes e impresión se valoran por separado cuando el proyecto las necesita.",
    faqs: [
      { question: "¿Trabajáis con nuestra identidad actual?", answer: "Sí. Revisamos la guía y los archivos disponibles para aplicar la marca de forma coherente. Si detectamos elementos que faltan, proponemos cómo resolverlos dentro del alcance." },
      { question: "¿Puedo encargar solo una presentación o un cartel?", answer: "Sí, podemos valorar una necesidad concreta. Es importante conocer el contenido, el formato, el uso y la fecha prevista para definir una propuesta ajustada a la pieza." },
      { question: "¿Entregáis archivos editables?", answer: "La entrega se acuerda al inicio. Si tu equipo debe actualizar los materiales, definimos la herramienta, las plantillas y los archivos necesarios, junto con las condiciones de las tipografías e imágenes utilizadas." },
      { question: "¿Os encargáis también de imprimir?", answer: "La preparación de originales y la producción se concretan en la propuesta. Podemos coordinar los requisitos gráficos con el proveedor; cantidades, materiales, acabados y costes de impresión se deben acordar expresamente." },
    ],
    proofTitle: "Sistemas gráficos en distintos contextos",
    proofIntro: "Explora identidades y recursos de comunicación desarrollados para restauración, actividades municipales y signos de marca.",
    relatedProjects: [{ slug: "gent-gran-de-calonge-i-sant-antoni", note: "Comunicación para actividades dirigidas a personas mayores." }, { slug: "el-xiringuito", note: "Lenguaje visual para un restaurante de costa." }, { slug: "logoteca", note: "Tipografía, símbolos y composición en logotipos." }],
    ctaTitle: "¿Qué necesitas comunicar?",
    ctaText: "Envíanos el contexto, los materiales que tienes y los formatos que necesitas preparar.",
    ctaLabel: "Hablemos del proyecto",
  },
}

const CA: Record<CommercialId, PageCopy> = {
  "web-design": {
    label: "Disseny web a Girona",
    title: "Disseny web a Girona per a marques que volen destacar",
    seoTitle: "Disseny web a Girona | Pàgines web a mida — PALSEC",
    description: "Dissenyem pàgines web a Girona amb estratègia, UX/UI i desenvolupament. Webs a mida que expliquen la teva marca i faciliten el contacte amb nous clients.",
    serviceType: "Disseny web",
    intro: "Una web ha d'explicar qui ets, transmetre per què ets diferent i ajudar la persona adequada a fer el pas següent. A PALSEC connectem estratègia, identitat i tecnologia per dissenyar pàgines web a mida. Treballem des de Girona i la Costa Brava amb empreses i equips que necessiten una presència digital clara, recognoscible i útil per al negoci.",
    sections: [
      { title: "Disseny i desenvolupament web de principi a fi", paragraphs: [
        "Cada projecte comença entenent el negoci abans de dibuixar la primera pantalla. Revisem què ofereixes, a qui t'adreces, quines preguntes repeteix el teu client i què ha d'aconseguir la web. Amb aquesta base definim pàgines, recorreguts i prioritats. Una web corporativa que rep consultes no necessita la mateixa estructura que un catàleg, un portafolis o una pàgina de llançament.",
        "Disseny i desenvolupament es plantegen junts perquè les decisions visuals tinguin una traducció viable. L'arquitectura ordena el contingut; l'experiència d'usuari facilita la navegació; la direcció d'art aporta personalitat. Després, la implementació converteix aquesta feina en una web adaptable a diferents pantalles i preparada per publicar contingut real.",
      ] },
      { title: "Una web que pertany a la teva marca", paragraphs: [
        "Tipografia, composició, imatges i moviment han de respondre a una mateixa idea. Partim de la teva identitat, o la treballem amb tu si encara necessita definició, i la traslladem a un llenguatge digital. Busquem que la web es reconegui com a teva i que el disseny ajudi a entendre l'oferta, sense obligar el visitant a desxifrar cada interacció.",
        "El nivell de personalització es decideix segons el projecte. Una solució a mida té sentit quan millora l'arquitectura, l'expressió de marca o la funcionalitat. També valorem les eines existents, el pressupost i qui actualitzarà la web. Abans de triar tecnologia aclarim què necessita fer l'equip després del llançament.",
      ] },
      { title: "Contingut, mòbil i SEO des del principi", paragraphs: [
        "Treballem amb textos i imatges representatius per comprovar jerarquies, llargades i llegibilitat. Al mòbil revisem navegació, mida de lletra, botons i recorreguts complets. Una persona ha de poder conèixer els teus serveis, consultar un projecte i contactar sense dependre d'una pantalla gran ni d'efectes difícils d'utilitzar.",
        "La base SEO inclou una estructura de pàgines comprensible, encapçalaments ordenats, títols i descripcions, enllaços interns i criteris d'indexació. Si hi ha diversos idiomes, en definim els continguts i les adreces. En un redisseny revisem les pàgines existents per planificar redireccions quan canvien les URLs. El posicionament també dependrà del contingut, la competència i la feina posterior a la publicació.",
      ] },
      { title: "Disseny web per a empreses de Girona i la Costa Brava", paragraphs: [
        "Treballem amb negocis locals i equips d'altres llocs. La proximitat facilita conèixer el context, però organitzem el projecte perquè també funcioni a distància: objectius compartits, revisions concretes i decisions documentades. L'abast pot començar per una web corporativa i preveure noves seccions quan hi hagi contingut per desenvolupar-les.",
        "Per preparar una proposta necessitem entendre l'objectiu, les pàgines previstes, els idiomes, les funcionalitats i l'estat dels materials. També acordem qui redacta, qui valida i qui mantindrà la web. Aquesta conversa permet construir un pressupost al voltant de necessitats reals i una seqüència de treball que el teu equip pugui assumir.",
      ] },
    ],
    process: [
      { title: "Definir", text: "Revisem objectius, públics i contingut. Dibuixem l'arquitectura i acordem l'abast, les responsabilitats i els criteris per considerar la web preparada per sortir." },
      { title: "Dissenyar", text: "Ordenem els recorreguts i explorem la direcció visual. El disseny es prova amb contingut representatiu i versions de mòbil i escriptori abans de desenvolupar totes les pàgines." },
      { title: "Construir", text: "Implementem les pàgines i els components acordats. Integrem el gestor de contingut o les connexions necessàries i revisem la fidelitat al disseny durant el procés." },
      { title: "Revisar i publicar", text: "Comprovem enllaços, formularis, adaptació a pantalles i configuració SEO. Acordem el llançament, el lliurament d'accessos i les necessitats de manteniment o evolució." },
    ],
    deliverables: ["Arquitectura d'informació i recorreguts", "Disseny d'experiència i interfície", "Direcció visual i components adaptables", "Desenvolupament de les pàgines acordades", "Gestor de contingut, si l'abast ho requereix", "Configuració SEO i mesurament acordat", "Revisió prèvia a publicació i lliurament"],
    scope: "Cada proposta especifica pàgines, idiomes, funcionalitats, rondes de revisió i responsabilitats. Textos, fotografia, traduccions, allotjament, llicències i manteniment es concreten abans de començar; la seva inclusió depèn de l'abast acordat.",
    faqs: [
      { question: "Quant costa dissenyar una pàgina web?", answer: "Depèn de les pàgines, els idiomes, la complexitat visual i les funcionalitats. Després de conèixer el projecte podem definir un abast i un pressupost. Convé comparar què inclou cada proposta: disseny, desenvolupament, contingut, llançament i suport." },
      { question: "Us podem encarregar el disseny i el desenvolupament?", answer: "Sí. Podem treballar el procés complet o col·laborar amb un equip de desenvolupament existent. A l'inici aclarim qui implementa, qui aporta el contingut i com es revisa el resultat perquè les responsabilitats siguin clares." },
      { question: "Quant de temps necessita una web?", answer: "El calendari depèn de l'abast i de la disponibilitat de continguts i validacions. El plantegem per fases amb lliuraments concrets. Una pàgina de llançament i una web multilingüe amb integracions requereixen planificacions diferents." },
      { question: "La podré actualitzar després?", answer: "Si necessites editar contingut, definim quines parts ha de gestionar el teu equip i triem una solució adequada. La formació, els permisos i el manteniment es concreten a la proposta perquè la web continuï sent útil després de publicar-la." },
    ],
    proofTitle: "Disseny digital al nostre portafolis",
    proofIntro: "Aquests projectes mostren la nostra feina en experiència d'usuari i interfícies d'aplicacions. Permeten conèixer decisions de disseny digital que també importen en una web: jerarquia, navegació i coherència visual.",
    relatedProjects: [{ slug: "vira", note: "Disseny d'una aplicació per a adolescents amb TDAH." }, { slug: "galeon", note: "Aplicació interactiva per explorar les Col·leccions Reials." }],
    ctaTitle: "Tens una web al cap?",
    ctaText: "Explica'ns què fa la teva empresa, què necessita canviar i què t'agradaria aconseguir amb la nova web.",
    ctaLabel: "Explica'ns el teu projecte",
  },
  "web-development": {
    label: "Desenvolupament web a Girona",
    title: "Desenvolupament web a Girona, del disseny a una web real",
    seoTitle: "Desenvolupament web a Girona | Webs a mida — PALSEC",
    description: "Desenvolupament web a mida a Girona. Implementació fidel al disseny, adaptació mòbil, rendiment, gestió de continguts i preparació per al llançament.",
    serviceType: "Desenvolupament web",
    intro: "Una bona interfície necessita una implementació a la seva altura. Desenvolupem webs cuidant allò que veu l'usuari i allò que l'equip necessita per mantenir-les: components consistents, contingut editable quan cal i una publicació ben preparada. Des de Girona col·laborem en projectes complets i en la implementació de dissenys que ja tenen una direcció definida.",
    sections: [
      { title: "De les pantalles a un sistema que funciona", paragraphs: [
        "Abans de programar revisem pàgines, estats i comportaments. Un disseny també ha d'explicar què passa quan falta una imatge, el text creix, el formulari té un error o algú navega amb teclat. Resoldre aquestes situacions evita que les decisions importants apareguin per sorpresa al final del projecte.",
        "El desenvolupament pot abastar una web corporativa, una pàgina de llançament, un portafolis o una experiència interactiva. Els gestors de contingut, catàlegs i integracions s'avaluen segons les necessitats reals. Triem la solució tenint en compte la complexitat, les dependències i qui es responsabilitzarà de mantenir-la.",
      ] },
      { title: "Rendiment i adaptació a cada pantalla", paragraphs: [
        "Revisem el pes de les imatges, la càrrega de tipografies i el cost de vídeos i animacions. L'objectiu és preservar la direcció visual mentre reduïm esperes i moviments inesperats. Els mesuraments ajuden a detectar què convé corregir i quins compromisos implica cada recurs.",
        "La versió mòbil es treballa com una experiència completa. Ajustem menús, distribució, lectura i interaccions tàctils, i revisem pantalles intermèdies. També comprovem el focus visible, les etiquetes i els controls perquè les funcions essencials no depenguin únicament d'un ratolí o d'una animació.",
      ] },
      { title: "SEO des del codi i publicació ordenada", paragraphs: [
        "L'estructura tècnica ha de permetre entendre i indexar el contingut. Treballem HTML semàntic, metadades, enllaços, canonicals, sitemap i regles de rastreig segons el tipus de web. En projectes multilingües relacionem correctament les versions de cada pàgina i evitem que rutes diferents competeixin pel mateix contingut.",
        "Abans de publicar revisem els recorreguts principals, els formularis i la configuració del domini. Si substituïm una web existent, acordem redireccions i el tractament de les seves URLs. El lliurament concreta accessos, dependències, documentació i responsabilitats: l'allotjament i el manteniment es defineixen com a part de l'abast.",
      ] },
    ],
    process: [
      { title: "Revisió tècnica", text: "Contrastem el disseny amb funcionalitats, continguts, integracions i limitacions. Acordem què es construeix i com es comprovarà." },
      { title: "Implementació", text: "Construïm components i pàgines, connectem els serveis previstos i revisem el resultat amb contingut representatiu." },
      { title: "Validació", text: "Provem els recorreguts acordats, l'adaptació mòbil, la navegació amb teclat i els aspectes tècnics del SEO." },
      { title: "Llançament", text: "Publiquem la versió aprovada i comprovem la web al seu domini. Documentem el lliurament i els passos següents de manteniment." },
    ],
    deliverables: ["Implementació adaptable a mòbil i escriptori", "Components i comportaments acordats", "Gestor de contingut o integracions definides", "Configuració tècnica de SEO", "Revisió de rendiment i funcions principals", "Publicació i documentació de lliurament"],
    scope: "El pressupost depèn de les plantilles de pàgina, estats, idiomes i integracions. Concretem també migració de contingut, serveis externs, allotjament i suport. Les funcions de comerç electrònic o àrees privades requereixen una definició específica.",
    faqs: [
      { question: "Podeu desenvolupar un disseny existent?", answer: "Sí. Primer revisem l'arxiu de disseny, les seves versions mòbils i els comportaments previstos. Si falten estats o decisions funcionals, els identifiquem abans de tancar l'abast." },
      { question: "Quina tecnologia utilitzeu?", answer: "La tria depèn del contingut, les funcionalitats i la capacitat de manteniment de l'equip. Expliquem les opcions i les seves implicacions abans de decidir; l'eina ha de respondre al projecte." },
      { question: "Inclou manteniment?", answer: "El llançament i el manteniment són fases que es concreten a la proposta. Acordem quines actualitzacions, suport i evolucions necessitarà la web i qui es responsabilitza de cada part." },
      { question: "Garantiu una puntuació de velocitat?", answer: "Definim objectius i mesurem per orientar les millores. El resultat varia segons continguts, integracions, dispositiu i connexió. Les proves permeten acordar prioritats sense convertir una puntuació aïllada en l'única mesura de qualitat." },
    ],
    proofTitle: "Referències d'experiència digital",
    proofIntro: "Vira i Galeón mostren feina d'interfície i producte digital. Els seus casos permeten revisar l'enfocament de disseny; l'abast de desenvolupament per a la teva web es defineix de manera específica a la proposta.",
    relatedProjects: [{ slug: "vira", note: "Experiència i interfície d'una aplicació." }, { slug: "galeon", note: "Navegació i contingut en una aplicació interactiva." }],
    ctaTitle: "Explica'ns què vols construir",
    ctaText: "Podem començar pel teu disseny, la web actual o una llista de necessitats que encara cal ordenar.",
    ctaLabel: "Parlem del desenvolupament",
  },
  branding: {
    label: "Branding a Girona",
    title: "Branding a Girona per a marques que volen significar alguna cosa",
    seoTitle: "Branding a Girona | Estratègia i identitat de marca — PALSEC",
    description: "Estratègia, identitat visual i direcció d'art a Girona. Creem marques amb personalitat i sistemes que funcionen en aplicacions físiques i digitals.",
    serviceType: "Branding i identitat visual",
    intro: "Una marca necessita una idea clara i una manera pròpia d'expressar-la. A PALSEC treballem estratègia, identitat visual i aplicacions com a parts del mateix projecte. Des de Girona i la Costa Brava ajudem noves marques i equips que necessiten ordenar, actualitzar o replantejar la seva identitat perquè cada contacte amb el públic tingui sentit.",
    sections: [
      { title: "Una marca no comença pel logo", paragraphs: [
        "Abans de dissenyar, necessitem entendre què ha de representar la marca i per a qui. Revisem l'oferta, el context, els materials existents i les decisions que l'equip té al davant. Aquesta primera fase permet distingir un problema de posicionament d'una identitat que simplement necessita expressar-se millor.",
        "L'estratègia fixa criteris per prendre decisions: quina proposta prioritzar, quina personalitat transmetre i quins missatges sostenen la marca. La profunditat de la recerca s'ajusta al projecte. Si cal treballar el nom o l'arquitectura de marques, es defineix com una part específica de l'abast.",
      ] },
      { title: "Un sistema visual amb personalitat", paragraphs: [
        "Explorem una direcció visual i desenvolupem les relacions entre logotip, tipografia, color, composició i imatge. Cada element ha de funcionar per si mateix i formar part d'un conjunt recognoscible. Provem la identitat en les aplicacions que més importen al projecte per avaluar-ne la llegibilitat, la flexibilitat i el caràcter.",
        "L'objectiu és que la marca pugui viure en una web, una presentació, una peça impresa o una xarxa social sense començar de nou en cada suport. Les regles han d'aportar coherència i deixar espai per comunicar coses diferents. Una identitat útil també té en compte els recursos de qui la farà servir.",
      ] },
      { title: "De la identitat a les seves aplicacions reals", paragraphs: [
        "Prioritzem les peces que necessites per posar la marca en marxa. Poden ser materials corporatius, plantilles de comunicació, aplicacions digitals o criteris de direcció d'art. La guia documenta com utilitzar el sistema i el lliurament reuneix els arxius acordats perquè l'equip i els seus proveïdors treballin amb una referència comuna.",
        "En un redisseny revisem què convé conservar i què pot canviar. El reconeixement existent té valor, i la transició es pot fer per fases. Treballem amb projectes de Girona i la Costa Brava i amb equips d'altres llocs mitjançant un procés de revisió i validació compartit.",
      ] },
    ],
    process: [
      { title: "Entendre", text: "Revisem context, objectius, públics i materials. Identifiquem les decisions que la marca necessita resoldre i acordem prioritats." },
      { title: "Donar direcció", text: "Definim criteris estratègics i explorem una direcció visual que representi la proposta i la personalitat de la marca." },
      { title: "Construir el sistema", text: "Desenvolupem logotip, tipografia, color i recursos gràfics. Contrastem el seu funcionament en aplicacions representatives." },
      { title: "Preparar l'ús", text: "Produïm les peces acordades, reunim els arxius i documentem criteris per mantenir la identitat en nous materials." },
    ],
    deliverables: ["Criteris de posicionament i personalitat", "Logotip i versions acordades", "Sistema tipogràfic i paleta de color", "Recursos gràfics i direcció d'imatge", "Aplicacions prioritàries de la marca", "Guia d'identitat i arxius finals"],
    scope: "La proposta concreta la recerca, les aplicacions, les revisions i els formats de lliurament. La creació del nom, la redacció, la fotografia, la producció física i el disseny web s'incorporen quan són necessaris i es pressuposten segons l'abast.",
    faqs: [
      { question: "Quina diferència hi ha entre branding i un logotip?", answer: "El logotip és un dels signes de la marca. Un projecte de branding també pot definir posicionament, personalitat, llenguatge i un sistema visual que permeti aplicar la identitat amb coherència." },
      { question: "Podeu actualitzar una marca existent?", answer: "Sí. Primer revisem què funciona, què genera confusió i què ha canviat al negoci. Amb aquesta informació acordem si convé ajustar el sistema o desenvolupar una nova direcció." },
      { question: "Què necessito per començar?", answer: "Una explicació del projecte, els seus públics, els seus objectius i els materials disponibles. Si encara hi ha decisions obertes, la fase inicial ajuda a ordenar-les abans d'avançar amb la part visual." },
      { question: "La identitat es pot aplicar després a una web?", answer: "Sí. Dissenyem el sistema tenint en compte els usos digitals. El disseny i desenvolupament de la web poden formar part d'una fase posterior o d'un projecte conjunt, amb abast i lliurables definits." },
    ],
    proofTitle: "Identitats que pots explorar",
    proofIntro: "El nostre portafolis permet veure com canvia el llenguatge visual segons el context: restauració, lloguer per a esdeveniments i exploració de signes de marca.",
    relatedProjects: [{ slug: "el-xiringuito", note: "Identitat d'un restaurant de costa." }, { slug: "enteza", note: "Marca de lloguer de mobiliari i parament per a esdeveniments." }, { slug: "logoteca", note: "Col·lecció de dissenys de logotips." }],
    ctaTitle: "Estàs creant o replantejant una marca?",
    ctaText: "Explica'ns en quin punt ets i què necessites que la identitat ajudi a resoldre.",
    ctaLabel: "Parlem de la teva marca",
  },
  "graphic-design": {
    label: "Disseny gràfic a Girona",
    title: "Disseny gràfic a Girona amb una idea al darrere",
    seoTitle: "Disseny gràfic a Girona | Identitat i comunicació — PALSEC",
    description: "Disseny gràfic a Girona per comunicar amb claredat. Sistemes visuals, peces editorials, presentacions i aplicacions coherents amb la teva marca.",
    serviceType: "Disseny gràfic",
    intro: "Una presentació, un cartell o una publicació digital han de resoldre una necessitat concreta de comunicació. A PALSEC dissenyem peces i sistemes gràfics que ordenen la informació i expressen la personalitat de la marca. Treballem des de Girona amb negocis, organitzacions i equips que necessiten coherència entre els materials físics i digitals.",
    sections: [
      { title: "Disseny que pertany a la marca", paragraphs: [
        "Partim del que necessites explicar, del públic i del context en què es veurà la peça. La jerarquia del missatge arriba abans que els recursos decoratius. Revisem la identitat disponible i definim com han de treballar tipografia, composició, imatge i color perquè la informació sigui clara i la marca recognoscible.",
        "Quan hi ha una identitat, l'apliquem amb criteri a noves necessitats. Si falten regles o recursos, detectem què convé completar. El disseny gràfic pot resoldre una peça concreta o construir un sistema de formats; un replantejament complet de la marca s'aborda com un projecte de branding.",
      ] },
      { title: "Peces impreses i comunicació digital", paragraphs: [
        "Podem treballar materials corporatius, publicacions editorials, presentacions, cartelleria i peces digitals. El projecte defineix els formats, les versions i els idiomes abans de produir les adaptacions. Aquesta planificació ajuda que una mateixa idea mantingui la força en un document extens, una pantalla petita o una aplicació de gran mida.",
        "Els sistemes de plantilles són útils quan l'equip publica de manera recurrent. Definim composicions, jerarquies i exemples perquè els continguts puguin canviar sense perdre coherència. L'eina i el nivell d'edició s'ajusten a qui utilitzarà els arxius i al temps que hi podrà dedicar.",
      ] },
      { title: "Del contingut a l'arxiu final", paragraphs: [
        "Treballem amb materials reals per ajustar llargades, ritmes i lectura. El procés incorpora revisions de contingut i disseny abans de tancar els arxius. En peces impreses concretem mides i requisits tècnics amb la informació del proveïdor; la producció, els acabats i les proves s'acorden segons el projecte.",
        "El lliurament diferencia els arxius preparats per publicar o produir i els editables previstos a l'abast. També es concreten llicències de tipografia i imatge quan correspon. Treballem amb projectes de Girona i la Costa Brava, i coordinem revisions a distància amb equips d'altres llocs.",
      ] },
    ],
    process: [
      { title: "Definir la comunicació", text: "Concretem missatge, públic, suport, formats i materials disponibles. Acordem què necessita resoldre cada peça i qui valida el contingut." },
      { title: "Dissenyar la direcció", text: "Plantegem la composició i el llenguatge gràfic a partir de la identitat. Revisem una aplicació representativa abans d'estendre-la." },
      { title: "Desenvolupar les peces", text: "Maquetem els continguts, preparem versions i comprovem la coherència entre formats, idiomes i suports." },
      { title: "Preparar el lliurament", text: "Revisem les peces aprovades i exportem els arxius acordats. Documentem els criteris necessaris per utilitzar les plantilles o coordinar la producció." },
    ],
    deliverables: ["Direcció gràfica per a la comunicació", "Disseny i maquetació de peces acordades", "Adaptacions als formats definits", "Plantilles editables quan es necessitin", "Arxius finals per a publicació o producció", "Indicacions d'ús i especificacions acordades"],
    scope: "El pressupost es defineix pel nombre de peces, pàgines, formats i idiomes. Redacció, traducció, il·lustració, fotografia, compra d'imatges i impressió es valoren per separat quan el projecte les necessita.",
    faqs: [
      { question: "Treballeu amb la nostra identitat actual?", answer: "Sí. Revisem la guia i els arxius disponibles per aplicar la marca de manera coherent. Si detectem elements que falten, proposem com resoldre'ls dins de l'abast." },
      { question: "Puc encarregar només una presentació o un cartell?", answer: "Sí, podem valorar una necessitat concreta. És important conèixer el contingut, el format, l'ús i la data prevista per definir una proposta ajustada a la peça." },
      { question: "Lliureu arxius editables?", answer: "El lliurament s'acorda a l'inici. Si el teu equip ha d'actualitzar els materials, definim l'eina, les plantilles i els arxius necessaris, juntament amb les condicions de les tipografies i les imatges utilitzades." },
      { question: "Us encarregueu també d'imprimir?", answer: "La preparació d'originals i la producció es concreten a la proposta. Podem coordinar els requisits gràfics amb el proveïdor; quantitats, materials, acabats i costos d'impressió s'han d'acordar expressament." },
    ],
    proofTitle: "Sistemes gràfics en diferents contextos",
    proofIntro: "Explora identitats i recursos de comunicació desenvolupats per a restauració, activitats municipals i signes de marca.",
    relatedProjects: [{ slug: "gent-gran-de-calonge-i-sant-antoni", note: "Comunicació per a activitats adreçades a persones grans." }, { slug: "el-xiringuito", note: "Llenguatge visual per a un restaurant de costa." }, { slug: "logoteca", note: "Tipografia, símbols i composició en logotips." }],
    ctaTitle: "Què necessites comunicar?",
    ctaText: "Envia'ns el context, els materials que tens i els formats que necessites preparar.",
    ctaLabel: "Parlem del projecte",
  },
}

const EN: Record<CommercialId, PageCopy> = {
  "web-design": {
    label: "Web design in Girona",
    title: "Web design in Girona for brands that want to stand out",
    seoTitle: "Web Design in Girona | Bespoke Websites — PALSEC",
    description: "Web design in Girona combining strategy, UX/UI and development. Bespoke websites that explain your brand and help future customers get in touch.",
    serviceType: "Web design",
    intro: "A website needs to explain who you are, communicate what makes you different and help the right person take the next step. At PALSEC, we connect strategy, identity and technology to design bespoke websites. From Girona and the Costa Brava, we work with businesses and teams that need a clear, recognisable digital presence that supports their work.",
    sections: [
      { title: "Website design and development from start to finish", paragraphs: [
        "Every project begins with understanding the business before drawing the first screen. We review your offer, your audience, the questions customers keep asking and what the website should achieve. That foundation informs pages, journeys and priorities. A corporate website built around enquiries needs a different structure from a catalogue, portfolio or launch page.",
        "Design and development are considered together so visual decisions can be implemented effectively. Information architecture organises the content; user experience supports navigation; art direction adds personality. Implementation then turns that work into a website that adapts to different screens and is ready for real content.",
      ] },
      { title: "A website that belongs to your brand", paragraphs: [
        "Typography, composition, imagery and motion should express a shared idea. We start with your identity, or help define it if necessary, and translate it into a digital language. The aim is a website people recognise as yours, with design that helps them understand the offer without having to decipher every interaction.",
        "The level of customisation depends on the project. Bespoke work makes sense when it improves architecture, brand expression or functionality. We also consider existing tools, the budget and who will update the website. Before choosing technology, we clarify what your team will need to do after launch.",
      ] },
      { title: "Content, mobile and SEO from the outset", paragraphs: [
        "We use representative text and images to check hierarchy, length and readability. On mobile, we review navigation, text size, buttons and complete journeys. People should be able to understand your services, explore a project and get in touch without relying on a large screen or difficult interactions.",
        "The SEO foundation includes a clear page structure, ordered headings, titles and descriptions, internal links and indexing decisions. For multiple languages, we define the content and URLs of each version. During a redesign, we review existing pages to plan redirects where URLs change. Search visibility also depends on content, competition and the work that follows publication.",
      ] },
      { title: "Web design for businesses in Girona and the Costa Brava", paragraphs: [
        "We work with local businesses and teams elsewhere. Proximity helps us understand the context, while shared objectives, focused reviews and documented decisions make the process work remotely too. The scope can begin with a corporate website and allow for additional sections when there is meaningful content to support them.",
        "To prepare a proposal, we need to understand the objective, planned pages, languages, functionality and available materials. We also agree who writes, who approves and who will maintain the website. This conversation creates a budget around real needs and a sequence of work your team can support.",
      ] },
    ],
    process: [
      { title: "Define", text: "We review objectives, audiences and content. We map the architecture and agree the scope, responsibilities and criteria for considering the website ready to launch." },
      { title: "Design", text: "We organise journeys and explore the visual direction. Designs are tested with representative content and mobile and desktop versions before every page is developed." },
      { title: "Build", text: "We implement the agreed pages and components. We integrate the content management system or connections required and check fidelity to the design throughout." },
      { title: "Review and publish", text: "We check links, forms, screen adaptation and SEO configuration. We agree the launch, access handover and the requirements for maintenance or future development." },
    ],
    deliverables: ["Information architecture and user journeys", "User experience and interface design", "Visual direction and responsive components", "Development of the agreed pages", "Content management where the scope requires it", "Agreed SEO and measurement configuration", "Pre-launch review and handover"],
    scope: "Every proposal specifies pages, languages, functionality, review rounds and responsibilities. Copy, photography, translations, hosting, licences and maintenance are clarified before work begins; their inclusion depends on the agreed scope.",
    faqs: [
      { question: "How much does a website cost?", answer: "Cost depends on the pages, languages, visual complexity and functionality. Once we understand the project, we can define a scope and budget. Compare what each proposal includes: design, development, content, launch and support." },
      { question: "Can you handle design and development?", answer: "Yes. We can work on the complete process or collaborate with an existing development team. At the outset, we clarify who implements, who provides content and how the result will be reviewed, so responsibilities are clear." },
      { question: "How long does a website take?", answer: "The schedule depends on scope and the availability of content and approvals. We plan phases with specific deliverables. A launch page and a multilingual website with integrations need different schedules." },
      { question: "Will I be able to update it?", answer: "If you need to edit content, we define which areas your team should manage and choose a suitable solution. Training, permissions and maintenance are specified in the proposal so the website remains useful after publication." },
    ],
    proofTitle: "Digital design in our portfolio",
    proofIntro: "These projects show our work on application interfaces and user experience. They illustrate digital design decisions that also matter on a website: hierarchy, navigation and visual consistency.",
    relatedProjects: [{ slug: "vira", note: "Application design for teenagers with ADHD." }, { slug: "galeon", note: "An interactive application for exploring the Royal Collections." }],
    ctaTitle: "Have a website in mind?",
    ctaText: "Tell us what your business does, what needs to change and what you would like the new website to achieve.",
    ctaLabel: "Tell us about your project",
  },
  "web-development": {
    label: "Web development in Girona",
    title: "Web development in Girona, from design to a working website",
    seoTitle: "Web Development in Girona | Bespoke Websites — PALSEC",
    description: "Bespoke web development in Girona. Faithful implementation, mobile layouts, performance, content management and preparation for launch.",
    serviceType: "Web development",
    intro: "A good interface needs an implementation that does it justice. We develop websites with attention to what users see and what teams need to maintain them: consistent components, editable content where necessary and a carefully prepared launch. From Girona, we collaborate on complete projects and implement designs that already have a defined direction.",
    sections: [
      { title: "From screens to a working system", paragraphs: [
        "Before development, we review pages, states and behaviours. A design also needs to explain what happens when an image is missing, text grows, a form has an error or someone navigates with a keyboard. Resolving these situations helps avoid important decisions appearing unexpectedly at the end of the project.",
        "Development may cover a corporate website, launch page, portfolio or interactive experience. Content management systems, catalogues and integrations are evaluated against real needs. We choose the solution with its complexity, dependencies and future maintenance responsibilities in mind.",
      ] },
      { title: "Performance and adaptation to every screen", paragraphs: [
        "We review image weight, font loading and the cost of video and animation. The aim is to preserve the visual direction while reducing waiting times and unexpected layout movement. Measurements help identify what should be improved and the trade-offs each resource brings.",
        "The mobile version is treated as a complete experience. We adapt menus, layout, reading and touch interactions, and review intermediate screen sizes. We also check visible focus, labels and controls so essential functions do not depend solely on a mouse or an animation.",
      ] },
      { title: "SEO in the code and an organised launch", paragraphs: [
        "The technical structure should make content understandable and indexable. We work on semantic HTML, metadata, links, canonicals, sitemaps and crawling rules according to the website. In multilingual projects, we connect the versions of each page correctly and avoid different routes competing over the same content.",
        "Before publication, we review the main journeys, forms and domain configuration. When replacing an existing website, we agree redirects and how to handle its URLs. Handover specifies access, dependencies, documentation and responsibilities: hosting and maintenance are defined within the scope.",
      ] },
    ],
    process: [
      { title: "Technical review", text: "We compare the design with functionality, content, integrations and constraints. We agree what will be built and how it will be checked." },
      { title: "Implementation", text: "We build components and pages, connect the planned services and review the result with representative content." },
      { title: "Validation", text: "We test the agreed journeys, mobile layouts, keyboard navigation and technical SEO configuration." },
      { title: "Launch", text: "We publish the approved version and check the website on its domain. We document the handover and next maintenance steps." },
    ],
    deliverables: ["Responsive mobile and desktop implementation", "Agreed components and behaviours", "Defined content management or integrations", "Technical SEO configuration", "Performance and core functionality review", "Publication and handover documentation"],
    scope: "Budget depends on page templates, states, languages and integrations. We also specify content migration, external services, hosting and support. E-commerce features or private areas need their own definition.",
    faqs: [
      { question: "Can you develop an existing design?", answer: "Yes. We first review the design file, mobile versions and intended behaviour. If states or functional decisions are missing, we identify them before confirming the scope." },
      { question: "Which technology do you use?", answer: "The choice depends on content, functionality and the team's ability to maintain the website. We explain the options and their implications before deciding; the tool should serve the project." },
      { question: "Is maintenance included?", answer: "Launch and maintenance are phases specified in the proposal. We agree what updates, support and future changes the website will need and who is responsible for each part." },
      { question: "Do you guarantee a speed score?", answer: "We define objectives and measure performance to guide improvements. Results vary with content, integrations, device and connection. Testing helps agree priorities without treating one score as the only measure of quality." },
    ],
    proofTitle: "Digital experience references",
    proofIntro: "Vira and Galeón show interface and digital product work. Their cases illustrate the design approach; the development scope for your website is defined specifically in the proposal.",
    relatedProjects: [{ slug: "vira", note: "Application experience and interface design." }, { slug: "galeon", note: "Navigation and content in an interactive application." }],
    ctaTitle: "Tell us what you want to build",
    ctaText: "We can start with your design, your current website or a list of needs that still requires a clear structure.",
    ctaLabel: "Discuss web development",
  },
  branding: {
    label: "Branding in Girona",
    title: "Branding in Girona for brands that want to mean something",
    seoTitle: "Branding in Girona | Strategy & Visual Identity — PALSEC",
    description: "Brand strategy, visual identity and art direction in Girona. We create brands with personality and systems for physical and digital applications.",
    serviceType: "Branding and visual identity",
    intro: "A brand needs a clear idea and its own way of expressing it. At PALSEC, we work on strategy, visual identity and applications as parts of the same project. From Girona and the Costa Brava, we help new brands and teams that need to organise, update or rethink their identity so every interaction with their audience makes sense.",
    sections: [
      { title: "A brand does not start with a logo", paragraphs: [
        "Before designing, we need to understand what the brand should represent and who it should matter to. We review the offer, context, existing materials and decisions ahead. This initial phase helps distinguish a positioning problem from an identity that simply needs a clearer expression.",
        "Strategy establishes criteria for decisions: which proposition to prioritise, what personality to communicate and which messages support the brand. The depth of research is scaled to the project. If naming or brand architecture needs attention, it is defined as a specific part of the scope.",
      ] },
      { title: "A visual system with personality", paragraphs: [
        "We explore a visual direction and develop the relationships between logo, typography, colour, composition and imagery. Each element should work independently and belong to a recognisable whole. We test the identity in the applications that matter most to the project to evaluate legibility, flexibility and character.",
        "The aim is for the brand to work on a website, presentation, printed piece or social platform without starting again for every format. Rules should create consistency and leave room to communicate different things. A useful identity also considers the resources available to the people who will use it.",
      ] },
      { title: "From identity to real applications", paragraphs: [
        "We prioritise the assets needed to put the brand into use. These may include corporate materials, communication templates, digital applications or art direction guidance. Guidelines document the system and the handover brings together the agreed files so the team and its suppliers share a common reference.",
        "During a redesign, we review what should be retained and what can change. Existing recognition has value, and the transition can happen in phases. We work with projects in Girona and the Costa Brava, as well as teams elsewhere, through a shared review and approval process.",
      ] },
    ],
    process: [
      { title: "Understand", text: "We review context, objectives, audiences and materials. We identify the decisions the brand needs to resolve and agree priorities." },
      { title: "Set a direction", text: "We define strategic criteria and explore a visual direction that represents the brand's proposition and personality." },
      { title: "Build the system", text: "We develop the logo, typography, colour and graphic assets. We check how they work in representative applications." },
      { title: "Prepare for use", text: "We produce the agreed assets, gather the files and document criteria for maintaining the identity in new materials." },
    ],
    deliverables: ["Positioning and personality criteria", "Logo and agreed versions", "Typography system and colour palette", "Graphic assets and image direction", "Priority brand applications", "Identity guidelines and final files"],
    scope: "The proposal specifies research, applications, reviews and delivery formats. Naming, writing, photography, physical production and web design are included when needed and budgeted according to scope.",
    faqs: [
      { question: "How does branding differ from a logo?", answer: "The logo is one of the brand's identifying signs. A branding project may also define positioning, personality, language and a visual system that supports consistent applications." },
      { question: "Can you update an existing brand?", answer: "Yes. We first review what works, what creates confusion and what has changed in the business. That information helps us agree whether to adjust the system or develop a new direction." },
      { question: "What do I need to get started?", answer: "An explanation of the project, its audiences, objectives and available materials. If decisions are still open, the initial phase helps organise them before progressing to visual work." },
      { question: "Can the identity be applied to a website later?", answer: "Yes. We design the system with digital uses in mind. Website design and development can be a later phase or part of a combined project, with a defined scope and deliverables." },
    ],
    proofTitle: "Identities you can explore",
    proofIntro: "Our portfolio shows how visual language changes with the context: a restaurant, event rentals and explorations of brand symbols.",
    relatedProjects: [{ slug: "el-xiringuito", note: "Identity for a coastal restaurant." }, { slug: "enteza", note: "Brand for event furniture and tableware rentals." }, { slug: "logoteca", note: "A collection of logo designs." }],
    ctaTitle: "Creating or rethinking a brand?",
    ctaText: "Tell us where you are now and what you need the identity to help resolve.",
    ctaLabel: "Discuss your brand",
  },
  "graphic-design": {
    label: "Graphic design in Girona",
    title: "Graphic design in Girona with an idea behind it",
    seoTitle: "Graphic Design in Girona | Identity & Communication — PALSEC",
    description: "Graphic design in Girona for clear communication. Visual systems, editorial pieces, presentations and applications consistent with your brand.",
    serviceType: "Graphic design",
    intro: "A presentation, poster or digital publication needs to solve a specific communication need. At PALSEC, we design assets and graphic systems that organise information and express a brand's personality. From Girona, we work with businesses, organisations and teams that need consistency across their physical and digital materials.",
    sections: [
      { title: "Design that belongs to the brand", paragraphs: [
        "We start with what you need to say, the audience and the context in which the piece will be seen. The hierarchy of the message comes before decorative elements. We review the available identity and define how typography, composition, imagery and colour should work together to make information clear and the brand recognisable.",
        "Where an identity exists, we apply it thoughtfully to new needs. If rules or assets are missing, we identify what should be completed. Graphic design can solve an individual piece or build a system of formats; a complete rethink of the brand is approached as a branding project.",
      ] },
      { title: "Printed materials and digital communication", paragraphs: [
        "We can work on corporate materials, editorial publications, presentations, posters and digital assets. The project defines formats, versions and languages before adaptations are produced. This planning helps the same idea stay effective in a long document, on a small screen or across a large application.",
        "Template systems are useful for teams that publish regularly. We define compositions, hierarchies and examples so content can change without losing consistency. The tool and level of editing are chosen for the people using the files and the time they can devote to them.",
      ] },
      { title: "From content to final files", paragraphs: [
        "We work with real materials to refine length, rhythm and reading. The process includes content and design reviews before files are finalised. For printed pieces, we specify dimensions and technical requirements using supplier information; production, finishes and proofs are agreed for each project.",
        "Handover distinguishes files ready for publication or production from the editable files included in the scope. Font and image licences are clarified where relevant. We work with projects in Girona and the Costa Brava and coordinate remote reviews with teams elsewhere.",
      ] },
    ],
    process: [
      { title: "Define the communication", text: "We clarify the message, audience, medium, formats and available materials. We agree what each piece should achieve and who approves the content." },
      { title: "Design the direction", text: "We establish composition and graphic language based on the identity. We review a representative application before extending it." },
      { title: "Develop the pieces", text: "We lay out the content, prepare versions and check consistency across formats, languages and media." },
      { title: "Prepare the handover", text: "We review the approved pieces and export the agreed files. We document the guidance needed to use templates or coordinate production." },
    ],
    deliverables: ["Graphic direction for communication", "Design and layout of agreed pieces", "Adaptations for the defined formats", "Editable templates where needed", "Final publication or production files", "Agreed usage guidance and specifications"],
    scope: "Budget is based on the number of pieces, pages, formats and languages. Writing, translation, illustration, photography, stock images and printing are considered separately when the project requires them.",
    faqs: [
      { question: "Can you work with our current identity?", answer: "Yes. We review the guidelines and available files to apply the brand consistently. If elements are missing, we propose how to address them within the scope." },
      { question: "Can I commission just a presentation or a poster?", answer: "Yes, we can assess a specific need. Understanding the content, format, use and target date helps us define a proposal suited to the piece." },
      { question: "Do you provide editable files?", answer: "Delivery is agreed at the outset. If your team needs to update materials, we define the tool, templates and files required, along with the terms for any fonts and images used." },
      { question: "Do you also arrange printing?", answer: "Artwork preparation and production are specified in the proposal. We can coordinate graphic requirements with the supplier; quantities, materials, finishes and printing costs must be expressly agreed." },
    ],
    proofTitle: "Graphic systems in different contexts",
    proofIntro: "Explore identities and communication assets developed for a restaurant, municipal activities and brand symbols.",
    relatedProjects: [{ slug: "gent-gran-de-calonge-i-sant-antoni", note: "Communication for activities aimed at older adults." }, { slug: "el-xiringuito", note: "Visual language for a coastal restaurant." }, { slug: "logoteca", note: "Typography, symbols and composition in logo design." }],
    ctaTitle: "What do you need to communicate?",
    ctaText: "Send us the context, the materials you have and the formats you need to prepare.",
    ctaLabel: "Discuss your project",
  },
}

const COPY: Record<Lang, Record<CommercialId, PageCopy>> = { ca: CA, es: ES, en: EN }

export function getCommercialPage(id: CommercialId, lang: Lang): CommercialPage {
  return { id, lang, path: COMMERCIAL_PATHS[id][lang], ...COPY[lang][id] }
}

export function getCommercialPages(lang: Lang): CommercialPage[] {
  return COMMERCIAL_IDS.map((id) => getCommercialPage(id, lang))
}

export function getCommercialPageByPath(path: string): CommercialPage | undefined {
  const normalizedPath = path.split(/[?#]/, 1)[0].replace(/\/+$/, "")
  for (const lang of ["ca", "es", "en"] as const) {
    const id = COMMERCIAL_IDS.find((candidate) => COMMERCIAL_PATHS[candidate][lang] === normalizedPath)
    if (id) return getCommercialPage(id, lang)
  }
  return undefined
}
