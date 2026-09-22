import type { CommercialId } from "./commercialPages"

export type BuyingGuideContent = {
  slug: string
  path: string
  title: string
  seoTitle: string
  description: string
  intro: string
  sections: { title: string; paragraphs: string[]; checklist?: string[] }[]
  relatedService: CommercialId[]
  ctaTitle: string
  ctaText: string
}

export const BUYING_GUIDES: BuyingGuideContent[] = [
  {
    slug: "presupuesto-web",
    path: "/es/guias/presupuesto-web",
    title: "Cuánto cuesta una web profesional y cómo comparar presupuestos",
    seoTitle: "Cuánto cuesta una web profesional en Girona | PALSEC",
    description: "Qué determina el presupuesto de una web profesional en Girona: alcance, diseño, contenido, desarrollo y mantenimiento. Preguntas para comparar propuestas.",
    intro: "El precio de una web profesional depende de lo que necesita resolver y de lo que incluye la entrega. Para comparar presupuestos en Girona o en cualquier otro lugar, primero hay que poner el alcance sobre la mesa. Dos propuestas para una «web corporativa» pueden cubrir trabajos muy diferentes. Esta guía te ayuda a identificar esas diferencias antes de contratar.",
    sections: [
      {
        title: "Empieza por el objetivo y los recorridos",
        paragraphs: [
          "Define qué ofreces, a quién te diriges y qué acción esperas de la visita. Recibir consultas, mostrar un catálogo o vender productos requieren estructuras diferentes. Después enumera las páginas necesarias y las tareas que debe poder completar una persona. Esa descripción ayuda más a presupuestar que una cifra de pantallas sin contexto.",
          "Separa lo imprescindible para publicar de lo que puede llegar después. Un área privada, un segundo idioma o una integración pueden cambiar el esfuerzo de diseño y desarrollo. Es mejor hacer explícitas esas decisiones que descubrirlas cuando la propuesta ya está aceptada.",
        ],
      },
      {
        title: "Qué partidas conviene distinguir",
        paragraphs: [
          "Un presupuesto puede incluir estrategia, arquitectura de información, redacción, UX/UI, dirección visual, desarrollo, carga de contenido y preparación del lanzamiento. Pide que se indique quién aporta textos, imágenes y traducciones. Si esos materiales no están listos, producirlos o adaptarlos forma parte del trabajo, aunque no aparezca como una funcionalidad visible.",
          "El desarrollo también tiene niveles de alcance: formularios, gestor de contenidos, búsqueda, catálogo e integraciones requieren decisiones y comprobaciones propias. La adaptación a móvil, la navegación por teclado y la configuración SEO deben describirse con suficiente precisión para poder revisar su entrega.",
        ],
      },
      {
        title: "Diseño a medida, base existente y complejidad",
        paragraphs: [
          "Una base prediseñada puede ser adecuada si encaja con el contenido y los recorridos. Si obliga a adaptar cada sección o limita funciones importantes, parte del ahorro inicial puede desaparecer. Un diseño a medida permite definir la experiencia alrededor del proyecto, pero también necesita alcance, prioridades y criterios de validación claros.",
          "La complejidad no se mide solo por el número de páginas. Varias páginas construidas con una estructura común pueden requerir menos trabajo que una única experiencia con lógica, movimiento o integraciones específicas. Pide ejemplos de qué será reutilizable y qué exige una solución propia.",
        ],
      },
      {
        title: "El coste después de publicar",
        paragraphs: [
          "Distingue la inversión inicial de dominio, alojamiento, licencias, servicios externos y mantenimiento. Pregunta qué gastos pagarás directamente y cuáles gestiona el proveedor. También conviene acordar quién conserva accesos, código, contenidos y archivos de diseño, y cómo se entregarán.",
          "La publicación no resuelve por sí sola las futuras necesidades de contenido o soporte. Define qué cubre la corrección de incidencias, cómo se presupuestan cambios y qué formación necesitas para editar. Estos acuerdos permiten comparar el coste de mantener la web, además del de construirla.",
        ],
      },
      {
        title: "Preguntas para comparar propuestas con el mismo criterio",
        paragraphs: ["Solicita respuestas por escrito y compáralas junto al importe. La propuesta más útil permite entender qué recibirás, qué debes aportar y cómo se aprobará el resultado."],
        checklist: ["¿Qué páginas, idiomas y funcionalidades están incluidos?", "¿Quién prepara y carga los contenidos?", "¿Cuántas revisiones se contemplan y cómo se tratan los cambios?", "¿Qué se comprobará antes del lanzamiento?", "¿Qué costes recurrentes, accesos y soporte quedan acordados?"],
      },
    ],
    relatedService: ["web-design", "web-development"],
    ctaTitle: "Definamos el alcance de tu web",
    ctaText: "Cuéntanos qué hace tu empresa, qué debe conseguir la web y qué materiales tienes. Con esa base podemos plantear un alcance y un presupuesto concretos.",
  },
  {
    slug: "presupuesto-branding",
    path: "/es/guias/presupuesto-branding",
    title: "Cuánto cuesta un proyecto de branding y qué debería incluir",
    seoTitle: "Presupuesto de branding: precio, alcance y entregables | PALSEC",
    description: "Cómo valorar un presupuesto de branding: estrategia, identidad visual, aplicaciones, archivos y criterios de uso. Qué preguntar antes de contratar.",
    intro: "Un proyecto de branding puede resolver desde una identidad visual inicial hasta el replanteamiento de una marca con varias líneas de negocio. Por eso no hay un presupuesto comparable sin conocer las decisiones pendientes y las aplicaciones necesarias. Antes de pedir un precio, conviene definir qué debe cambiar y dónde tendrá que funcionar la nueva identidad.",
    sections: [
      {
        title: "Aclarar la necesidad antes de encargar un logotipo",
        paragraphs: [
          "Una marca nueva necesita explicar qué ofrece y a quién se dirige. Una empresa que ya existe puede tener una propuesta clara y necesitar coherencia visual, o requerir una revisión más profunda de su posicionamiento. Son puntos de partida diferentes y no deberían presupuestarse como si fueran el mismo encargo.",
          "Reúne los materiales actuales y describe qué dificultades encuentras al utilizarlos. Quizá las presentaciones parecen de empresas distintas, la identidad no representa la oferta o cada aplicación exige inventar una solución. Estos ejemplos ayudan a delimitar el problema y a decidir si hace falta estrategia, diseño o ambas cosas.",
        ],
      },
      {
        title: "Qué puede incluir el trabajo de marca",
        paragraphs: [
          "La fase estratégica puede abordar públicos, contexto, posicionamiento, propuesta de valor y tono de voz. Si necesitas un nombre, explicítalo: el naming implica un trabajo y unas comprobaciones que conviene acordar por separado. No todos los proyectos necesitan la misma profundidad ni todos los presupuestos incluyen estas tareas.",
          "La identidad visual puede reunir logotipo, variantes, tipografía, color, recursos gráficos y dirección de imagen. El valor del conjunto está en las relaciones entre elementos y en cómo permiten producir piezas coherentes. Pide que se describa el sistema y las aplicaciones con las que se revisará su funcionamiento.",
        ],
      },
      {
        title: "Las aplicaciones determinan parte del alcance",
        paragraphs: [
          "Una identidad destinada a una web y una presentación tiene necesidades distintas de otra que debe llegar a envases, señalética y una familia de productos. Haz una lista de usos prioritarios y formatos. Diferencia las muestras que sirven para visualizar la dirección de las piezas finales que necesitas recibir listas para utilizar.",
          "También importa cuántas personas editarán los materiales. Un equipo que prepara presentaciones cada semana puede necesitar plantillas y criterios sencillos de uso. Una producción especializada puede requerir archivos y especificaciones para proveedores. Esos entregables deben constar en la propuesta para evitar expectativas distintas.",
        ],
      },
      {
        title: "Cómo influyen las revisiones y la entrega",
        paragraphs: [
          "Acordar quién decide y cómo se recoge la opinión del equipo facilita el proceso. Define las fases de revisión, los criterios de aprobación y el tratamiento de cambios después de validar una dirección. Cambiar el nombre o ampliar la arquitectura de marca a mitad del trabajo puede alterar el alcance completo.",
          "La entrega debería aclarar formatos de archivo, variantes y documentación de uso. Pregunta por las licencias de tipografías o imágenes y por las condiciones de utilización acordadas. La producción física, la adaptación a nuevos formatos y la web pueden ser encargos adicionales; conviene identificarlos desde el principio.",
        ],
      },
      {
        title: "Qué preguntar al comparar presupuestos",
        paragraphs: ["Compara propuestas que resuelvan la misma necesidad. Un número mayor de piezas no sustituye una dirección clara, y un manual extenso no garantiza que el equipo pueda aplicarlo."],
        checklist: ["¿Qué decisiones estratégicas incluye el proyecto?", "¿Qué aplicaciones se diseñan y cuáles se entregan terminadas?", "¿Cómo se revisan y aprueban las propuestas?", "¿Qué archivos, plantillas y pautas recibiremos?", "¿Qué licencias, adaptaciones o producciones se presupuestan aparte?"],
      },
    ],
    relatedService: ["branding", "graphic-design"],
    ctaTitle: "Aclaremos qué necesita tu marca",
    ctaText: "Explícanos el momento del proyecto, los materiales que utilizas y las aplicaciones prioritarias. Te ayudaremos a concretar qué debería incluir el trabajo.",
  },
  {
    slug: "agencia-o-freelance",
    path: "/es/guias/agencia-o-freelance",
    title: "Agencia de diseño o profesional freelance: cómo elegir",
    seoTitle: "Agencia de diseño o freelance: qué comparar | PALSEC",
    description: "Cómo elegir entre agencia y freelance según alcance, coordinación y continuidad. Qué cubre un presupuesto de diseño y qué responsabilidades acordar.",
    intro: "Elegir entre una agencia y un profesional freelance depende del encargo, las capacidades necesarias y la forma de trabajar que necesita tu equipo. Ambos modelos pueden encajar. Para decidir, conviene comparar quién hará el trabajo, cómo se coordinarán las disciplinas y qué responsabilidades asumirá cada parte, además de mirar el presupuesto final.",
    sections: [
      {
        title: "Define el encargo y la capacidad interna",
        paragraphs: [
          "Un proyecto acotado de diseño puede necesitar una especialidad muy concreta. Una identidad acompañada de contenidos, web y desarrollo exige coordinar varias. Antes de buscar proveedor, identifica qué puedes resolver dentro de tu empresa y qué necesitas delegar: redacción, decisiones de marca, gestión del proyecto, producción o validación técnica.",
          "Si tienes una persona capaz de coordinar especialistas, puedes organizar el trabajo de una forma distinta que si necesitas un único interlocutor para todo el proceso. Esa capacidad interna tiene un coste de tiempo que también cuenta al comparar propuestas y calendarios.",
        ],
      },
      {
        title: "Qué puede aportar cada forma de trabajar",
        paragraphs: [
          "Un profesional independiente puede ofrecer contacto directo, especialización y una estructura ajustada al encargo. Conviene entender su disponibilidad, las tareas que asume personalmente y cómo resolverá lo que queda fuera de su especialidad. Algunos trabajan con colaboradores; pregunta cómo se integra esa colaboración y quién responde por el conjunto.",
          "Una agencia o estudio puede reunir disciplinas y asumir más coordinación, pero el nombre del modelo no garantiza una organización concreta. Pide saber quién participará, quién tomará decisiones y quién será tu contacto durante la ejecución. Lo relevante es que las capacidades y la forma de trabajar encajen con lo que necesitas.",
        ],
      },
      {
        title: "Qué cubre el presupuesto de una agencia",
        paragraphs: [
          "Además de diseñar piezas o desarrollar pantallas, una propuesta puede cubrir definición del alcance, planificación, coordinación entre especialidades, reuniones, revisión y preparación de entregas. Estas tareas ayudan a mantener conectado el trabajo, pero deben explicarse. Un importe global sin detalle dificulta saber qué estás contratando y qué seguirá recayendo en tu equipo.",
          "Compara los mismos entregables, revisiones y responsabilidades. Si una propuesta incluye contenido y otra espera recibirlo terminado, la diferencia de precio no describe únicamente el coste de diseño. Identifica también licencias, servicios externos, producción y mantenimiento, si son necesarios para el resultado que esperas.",
        ],
      },
      {
        title: "Valora ejemplos y continuidad",
        paragraphs: [
          "Revisa proyectos relacionados con la dificultad que quieres resolver. Un portafolio puede mostrar criterio visual, pero una conversación sobre decisiones, alcance y colaboración aporta información distinta. Pregunta qué parte realizó el proveedor y qué dependía del cliente o de otros equipos. Eso permite interpretar los ejemplos sin atribuir a una sola persona todo el resultado.",
          "Acuerda también cómo seguirá el proyecto después de la entrega. Necesitas conocer dónde estarán los archivos, quién tendrá los accesos y cómo se presupuestan futuras adaptaciones. La continuidad se construye con documentación y responsabilidades claras, tanto con un estudio como con un profesional independiente.",
        ],
      },
      {
        title: "Preguntas antes de elegir proveedor",
        paragraphs: ["La propuesta adecuada debería permitirte visualizar cómo trabajaréis juntos y qué tendréis al terminar. Estas preguntas sirven para ambos modelos."],
        checklist: ["¿Quién realizará cada parte y quién coordinará el conjunto?", "¿Qué tendrá que aportar o aprobar nuestro equipo?", "¿Cómo se gestionan disponibilidad, revisiones y cambios?", "¿Qué experiencia relevante podemos revisar y cuál fue vuestro papel?", "¿Cómo se entregan archivos, accesos y documentación?"],
      },
    ],
    relatedService: ["branding", "web-design"],
    ctaTitle: "Busquemos una forma de trabajar que encaje",
    ctaText: "Cuéntanos el alcance, los recursos de tu equipo y las disciplinas que necesitas. Podemos explicarte cómo organizaríamos el proyecto y qué asumiría cada parte.",
  },
  {
    slug: "plazos-proyecto-web",
    path: "/es/guias/plazos-proyecto-web",
    title: "Cuánto tarda una web y de qué depende el calendario",
    seoTitle: "Cuánto tarda un proyecto web: fases y dependencias | PALSEC",
    description: "Cómo planificar los plazos de una web: contenidos, diseño, desarrollo, revisiones e integraciones. Dependencias que conviene resolver antes de empezar.",
    intro: "El calendario de una web depende del alcance y de cuándo están disponibles las decisiones, los contenidos y los accesos necesarios. El número de páginas, por sí solo, no permite estimarlo. Para hablar de fechas con criterio, hay que ordenar las fases, identificar sus dependencias y acordar cómo se revisará el trabajo.",
    sections: [
      {
        title: "Qué conviene tener claro al empezar",
        paragraphs: [
          "El punto de partida es un alcance compartido: objetivo, páginas, idiomas, funcionalidades y responsables. También hace falta conocer si existe una identidad utilizable y en qué estado están los textos e imágenes. Un proyecto que empieza con estos materiales preparados tiene una situación distinta de otro que debe definirlos durante el proceso.",
          "Si hay una fecha comercial importante, comunícala desde la primera conversación y explica qué debe estar disponible ese día. Esto permite revisar prioridades y proponer una primera versión coherente. Una fecha deseada necesita contrastarse con las tareas y dependencias antes de convertirse en un compromiso.",
        ],
      },
      {
        title: "Cómo se relacionan las fases",
        paragraphs: [
          "La arquitectura ordena las páginas y los recorridos. El diseño define cómo se presenta el contenido y cómo se interactúa. El desarrollo convierte esas decisiones en una web funcional. Después hay que integrar materiales, revisar recorridos y preparar la publicación. Algunas tareas pueden avanzar en paralelo cuando sus requisitos están claros.",
          "Otras dependen de una aprobación anterior. Si cambia la estructura de servicios después de diseñar las páginas, puede ser necesario revisar contenido, navegación e implementación. El calendario debe mostrar estos puntos de decisión y reservar tiempo para comprobar el trabajo antes de seguir.",
        ],
      },
      {
        title: "Contenidos, revisiones y accesos",
        paragraphs: [
          "Los contenidos suelen condicionar más partes del diseño de las que parece. La longitud de un titular, el número de productos o la disponibilidad de imágenes influyen en la composición y en los componentes. Trabajar con contenido representativo ayuda a detectar problemas antes de que la web esté montada.",
          "También conviene designar una persona que reúna las opiniones del equipo y devuelva comentarios acordados. Aprobaciones dispersas o contradictorias pueden reabrir decisiones. Prepara además los accesos que se necesitarán para dominio, alojamiento, analítica o sistemas externos, y comprueba quién está autorizado para facilitarlos.",
        ],
      },
      {
        title: "Integraciones y publicación necesitan su propio espacio",
        paragraphs: [
          "Conectar una web con un sistema de reservas, un catálogo o una herramienta comercial puede depender de documentación, permisos y terceros. Es importante revisar esas condiciones al estimar, y distinguir lo que controla el equipo de desarrollo de lo que necesita respuesta externa.",
          "Antes de publicar, acuerda una revisión con contenido real: enlaces, formularios, móvil, navegación por teclado, metadatos y redirecciones cuando exista una web anterior. Define quién aprueba el lanzamiento y quién comprueba el dominio una vez publicado. Esa fase forma parte del proyecto y debe aparecer en la planificación.",
        ],
      },
      {
        title: "Preguntas para acordar un calendario realista",
        paragraphs: ["Pide un calendario vinculado a entregas y aprobaciones. Si aparece un cambio, revisad su efecto sobre las tareas restantes y documentad la nueva prioridad."],
        checklist: ["¿Qué necesitamos entregar antes de empezar cada fase?", "¿Quién aprueba y cómo se reúne el feedback?", "¿Qué tareas dependen de terceros o accesos?", "¿Qué puede quedar para una segunda versión?", "¿Qué validaciones deben completarse antes de publicar?"],
      },
    ],
    relatedService: ["web-design", "web-development"],
    ctaTitle: "Planifiquemos el lanzamiento de tu web",
    ctaText: "Envíanos las necesidades, el estado de los contenidos y cualquier fecha relevante. Revisaremos las dependencias para proponer una secuencia de trabajo viable.",
  },
  {
    slug: "rediseno-web",
    path: "/es/guias/rediseno-web",
    title: "Cuándo merece la pena rediseñar una web y cómo preparar el cambio",
    seoTitle: "Cuándo rediseñar una web y cómo preparar la migración | PALSEC",
    description: "Señales para valorar un rediseño web, qué conservar y cómo preparar contenidos, URLs y redirecciones. Una guía para decidir el alcance del cambio.",
    intro: "Una web puede necesitar mejoras sin que sea necesario rehacerla entera. Antes de decidir un rediseño, identifica qué impide que cumpla su función: contenido desactualizado, navegación confusa, dificultades para editar o una experiencia que ya no representa la marca. Un diagnóstico concreto permite elegir entre ajustes, una revisión parcial o una nueva estructura.",
    sections: [
      {
        title: "Busca problemas que puedas describir",
        paragraphs: [
          "Observa si una persona puede entender la oferta, encontrar la información relevante y contactar desde el móvil. Revisa también el trabajo interno: actualizar un servicio o publicar contenido no debería depender de soluciones improvisadas. Recoge ejemplos de dificultades, consultas repetidas y tareas que resultan innecesariamente complejas.",
          "Una apariencia antigua puede ser un motivo para renovar la dirección visual, pero conviene distinguirla de problemas de contenido o funcionamiento. Si el negocio ha cambiado, quizá la prioridad sea explicar mejor la oferta y reorganizar páginas. El alcance debe responder a esa necesidad concreta.",
        ],
      },
      {
        title: "Decide qué conservar y qué cambiar",
        paragraphs: [
          "Haz un inventario de páginas, contenidos, funciones y recursos antes de dibujar la nueva web. Identifica qué sigue siendo útil, qué debe actualizarse y qué ya no tiene sentido. Si dispones de analítica y Search Console, utiliza sus datos junto con el conocimiento del negocio para entender qué páginas tienen un papel relevante.",
          "Una página poco visitada puede contener información necesaria para un cliente. Una muy visitada puede estar respondiendo a una consulta distinta del servicio que quieres vender. Revisa el contenido y la intención de cada página para decidir su destino, sin basar todo el cambio en una única cifra.",
        ],
      },
      {
        title: "Prepara el cambio de URLs y contenido",
        paragraphs: [
          "Conserva una relación de las URLs existentes y de su destino previsto. Si una dirección cambia, prepara una redirección hacia una página que responda al mismo propósito. Evita enviar indiscriminadamente todo a la portada: el visitante necesita una continuación relevante de lo que estaba buscando.",
          "Revisa los enlaces internos, metadatos, canonicals y sitemap de la nueva estructura. En una web multilingüe, comprueba las equivalencias entre idiomas y las referencias hreflang. Estas tareas deben acompañar al diseño y al desarrollo, porque una navegación nueva también cambia cómo se relacionan las páginas.",
        ],
      },
      {
        title: "Valida antes y después del lanzamiento",
        paragraphs: [
          "Prueba los recorridos principales con contenido real y en diferentes tamaños de pantalla. Comprueba formularios, enlaces, archivos y las redirecciones previstas. Asegúrate de que la versión publicada puede rastrearse y de que las restricciones utilizadas durante el desarrollo no se han trasladado por error al dominio público.",
          "Después de publicar, revisa respuestas de las páginas, datos de analítica y avisos de Search Console. Los cambios de búsqueda requieren seguimiento; una lista de comprobaciones no garantiza conservar todas las posiciones. Guarda una referencia del estado anterior para interpretar incidencias y corregir problemas concretos con más contexto.",
        ],
      },
      {
        title: "Preguntas para definir el rediseño",
        paragraphs: ["El presupuesto debería explicar tanto la nueva experiencia como la transición desde la web actual. Estas preguntas ayudan a que la migración tenga un responsable y un alcance visibles."],
        checklist: ["¿Qué problemas concretos resolverá el cambio?", "¿Qué contenidos y URLs vamos a conservar?", "¿Quién prepara y verifica las redirecciones?", "¿Cómo se revisarán idiomas, formularios y analítica?", "¿Qué seguimiento se realizará tras publicar?"],
      },
    ],
    relatedService: ["web-design", "web-development"],
    ctaTitle: "Revisemos qué necesita cambiar en tu web",
    ctaText: "Comparte tu web actual y las dificultades que quieres resolver. Podemos ayudarte a concretar el rediseño y a preparar la transición de contenido y estructura.",
  },
  {
    slug: "web-a-medida-o-plantilla",
    path: "/es/guias/web-a-medida-o-plantilla",
    title: "Web a medida o plantilla: qué encaja con tu proyecto",
    seoTitle: "Web a medida o plantilla: ventajas y decisiones | PALSEC",
    description: "Cómo elegir entre una web a medida y una plantilla según contenido, marca, funciones y mantenimiento. Decisiones para facilitar consultas y contactos.",
    intro: "Una plantilla y un diseño a medida son formas distintas de resolver una web. La elección depende de cuánto se adapta la base disponible a tu contenido, tus recorridos y tu marca. Antes de decidir por precio o apariencia, conviene revisar qué necesitas ahora, qué tendrás que editar y qué cambios es razonable prever.",
    sections: [
      {
        title: "Cuándo puede encajar una plantilla",
        paragraphs: [
          "Una base existente puede ser útil cuando la estructura necesaria se parece a la que ofrece, las funciones están cubiertas y el equipo puede gestionarla. Permite partir de decisiones ya tomadas, pero hay que probarla con contenido representativo. Una demostración con fotografías seleccionadas y textos breves puede funcionar de manera distinta con tus materiales reales.",
          "Revisa qué puedes modificar sin reconstruir componentes y qué dependencias incorpora. El coste de licencias, extensiones y futuras actualizaciones forma parte de la elección. También importa saber quién resolverá una incompatibilidad y cómo se mantendrá la web cuando cambien sus necesidades.",
        ],
      },
      {
        title: "Cuándo aporta valor un diseño a medida",
        paragraphs: [
          "El diseño a medida permite definir estructura e interfaz alrededor del proyecto. Puede encajar cuando la marca necesita una expresión propia, el contenido tiene relaciones específicas o los recorridos no se resuelven bien con una base disponible. Su alcance debe centrarse en esas necesidades, con decisiones que se puedan explicar y revisar.",
          "Diseñar a medida no obliga a construir toda la tecnología desde cero. Es posible combinar una experiencia propia con un gestor de contenidos y servicios establecidos. Lo importante es distinguir qué se personaliza, qué se reutiliza y cómo esas elecciones afectan a edición, rendimiento y mantenimiento.",
        ],
      },
      {
        title: "La capacidad de generar consultas también depende del contenido",
        paragraphs: [
          "La visita necesita entender qué ofreces, para quién es y cómo dar el siguiente paso. Una jerarquía clara, ejemplos relevantes y respuestas a dudas habituales pueden ayudar a tomar una decisión. Conviene colocar el contacto en los momentos adecuados y explicar qué información necesitas para responder a una consulta.",
          "Revisa el formulario con el mismo cuidado que la portada. Pide los datos necesarios, utiliza etiquetas comprensibles y confirma el envío. En móvil, comprueba que los enlaces y campos sean utilizables. Ni una plantilla ni un diseño propio sustituyen estas decisiones de contenido y experiencia.",
        ],
      },
      {
        title: "Compara el uso y el mantenimiento, además de la entrega",
        paragraphs: [
          "Enumera tareas habituales: cambiar un servicio, añadir un caso, actualizar imágenes o incorporar otro idioma. Pide que te expliquen cómo se realizarían en cada opción y qué requeriría asistencia. Una solución debe valorarse también por el trabajo que permitirá hacer a tu equipo después del lanzamiento.",
          "Compara las propuestas con las mismas páginas, funciones y criterios de revisión. Una personalización extensa de una plantilla puede acercarse al esfuerzo de una solución propia; una web a medida también puede crecer innecesariamente si no hay prioridades. Define el alcance inicial y acuerda cómo se evaluarán ampliaciones.",
        ],
      },
      {
        title: "Preguntas que ayudan a elegir",
        paragraphs: ["Pide al proveedor que argumente su recomendación usando tus contenidos y recorridos. Una demostración concreta permite valorar las limitaciones y ventajas de cada camino."],
        checklist: ["¿Qué necesidades cubre la base y cuáles exigen cambios?", "¿Cómo se adaptará a nuestra marca y contenido real?", "¿Qué podremos editar sin ayuda técnica?", "¿Qué licencias, dependencias y mantenimiento requiere?", "¿Cómo comprobaremos el contacto y los recorridos en móvil?"],
      },
    ],
    relatedService: ["web-design", "web-development"],
    ctaTitle: "Elijamos la base adecuada para tu web",
    ctaText: "Cuéntanos qué necesitas publicar, cómo quieres gestionar el contenido y qué funcionalidades son importantes. Revisaremos qué enfoque tiene sentido para ese alcance.",
  },
]

export function getBuyingGuide(slug: string): BuyingGuideContent | undefined {
  return BUYING_GUIDES.find((guide) => guide.slug === slug)
}
