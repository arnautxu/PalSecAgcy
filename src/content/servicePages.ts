import type { Lang } from "@/i18n/lang"
import type { ProjectSlug } from "@/data/projects"

export const SERVICE_SLUGS = [
  "brand-strategy",
  "branding-visual-identity",
  "web-design-digital-products",
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServicePage = {
  slug: ServiceSlug
  title: string
  seoTitle: string
  description: string
  intro: string
  forWhom: string
  budget: string
  details: string[]
  process: string[]
  deliverables: string[]
  faqs: { question: string; answer: string }[]
  relatedProjects: ProjectSlug[]
}

const PAGES: Record<ServiceSlug, Record<Lang, Omit<ServicePage, "slug" | "faqs">>> = {
  "brand-strategy": {
    ca: {
      title: "ESTRATÈGIA DE MARCA",
      seoTitle: "Estratègia de marca a Girona i Costa Brava | PALSEC",
      description: "Estratègia de marca, posicionament, nomenclatura i to de veu per convertir una idea o una marca en evolució en un sistema clar i executable.",
      intro: "Definim què ha de representar una marca, per a qui ha de ser rellevant i com ha de prendre decisions abans de dissenyar-ne les expressions.",
      forWhom: "Per a projectes nous, marques que han crescut sense una direcció comuna o equips que necessiten alinear proposta, relat i prioritats.",
      budget: "El pressupost depèn del nombre de públics i mercats, la recerca necessària, les persones que han de participar i els lliurables finals. Una fase enfocada de posicionament no té el mateix abast que una plataforma completa amb naming, arquitectura de marca, missatges i activació. Abans de pressupostar definim quines decisions ha de resoldre el projecte i quines es poden ajornar.",
      details: [
        "Una estratègia de marca útil no és una declaració abstracta. Ha de permetre decidir quines oportunitats encaixen, quins públics són prioritaris, quin valor s'ha d'explicar i quines expressions reforcen o debiliten el posicionament.",
        "Treballem a partir del context disponible: objectius de negoci, oferta, alternatives del mercat, percepcions internes i materials existents. Convertim aquesta informació en criteris compartits perquè direcció, comunicació i disseny treballin amb la mateixa lògica.",
        "El resultat prepara l'execució. Els principis, missatges i prioritats es connecten amb identitat, contingut, web o producte digital, evitant documents estratègics que no arriben a transformar decisions reals.",
        "La recerca s'ajusta a la decisió que cal prendre. Pot combinar entrevistes amb l'equip, revisió de clients i oferta, anàlisi de competidors, auditories de comunicació i tallers de síntesi. No acumulem dades per volum: documentem què sabem, què és una hipòtesi i quina evidència falta perquè el posicionament no depengui només d'opinions internes.",
        "També definim com s'aplicarà l'estratègia després del lliurament. Assignem prioritats, responsables i criteris per revisar decisions noves, des d'un missatge comercial fins a un servei, un naming o una web. Així la plataforma de marca funciona com una eina de govern compartida i no com un document que només consulta l'equip de disseny.",
      ],
      process: ["Context i objectius", "Posicionament i criteris", "Nomenclatura i llenguatge", "Principis per executar la marca"],
      deliverables: ["Plataforma de marca", "Proposta de valor", "Territoris de posicionament", "To de veu", "Full de ruta d'activació"],
      relatedProjects: ["vira", "arkuos", "enteza"],
    },
    en: {
      title: "BRAND STRATEGY",
      seoTitle: "Brand Strategy in Girona & Costa Brava | PALSEC",
      description: "Brand strategy, positioning, naming, and tone of voice to turn a new idea or evolving brand into a clear, executable system.",
      intro: "We define what a brand should stand for, who it needs to matter to, and how it should make decisions before designing its expressions.",
      forWhom: "For new ventures, brands that have grown without a shared direction, or teams that need to align proposition, story, and priorities.",
      budget: "Budget depends on the number of audiences and markets, the research required, the stakeholders involved, and the final deliverables. A focused positioning phase has a different scope from a complete platform including naming, brand architecture, messaging, and activation. Before quoting, we define which decisions the project must resolve now and which can wait.",
      details: [
        "Useful brand strategy is not an abstract statement. It should help decide which opportunities fit, which audiences matter first, what value must be communicated, and which expressions strengthen or weaken the intended position.",
        "We work from the available context: business objectives, offer, market alternatives, internal perspectives, and existing materials. That information becomes shared criteria so leadership, communication, and design can operate with the same logic.",
        "The outcome is built for execution. Principles, messages, and priorities connect to identity, content, websites, or digital products, avoiding strategy documents that never influence real decisions.",
        "Research is scaled to the decision at hand. It may combine stakeholder interviews, a review of customers and the offer, competitor analysis, communication audits, and synthesis workshops. We do not collect evidence for volume: we document what is known, what remains a hypothesis, and what must be validated so positioning does not rely only on internal opinion.",
        "We also define how the strategy will be used after delivery. Priorities, owners, and criteria are established for reviewing new decisions, from a commercial message to a service, name, or website. This turns the brand platform into a shared governance tool rather than a document used only by the design team.",
      ],
      process: ["Context and objectives", "Positioning and criteria", "Naming and language", "Principles for brand execution"],
      deliverables: ["Brand platform", "Value proposition", "Positioning territories", "Tone of voice", "Activation roadmap"],
      relatedProjects: ["vira", "arkuos", "enteza"],
    },
    es: {
      title: "ESTRATEGIA DE MARCA",
      seoTitle: "Estrategia de marca en Girona y Costa Brava | PALSEC",
      description: "Estrategia de marca, posicionamiento, naming y tono de voz para convertir una idea o marca en evolución en un sistema claro y ejecutable.",
      intro: "Definimos qué debe representar una marca, para quién debe ser relevante y cómo debe tomar decisiones antes de diseñar sus expresiones.",
      forWhom: "Para proyectos nuevos, marcas que han crecido sin una dirección compartida o equipos que necesitan alinear propuesta, relato y prioridades.",
      budget: "El presupuesto depende del número de públicos y mercados, la investigación necesaria, las personas que deben participar y los entregables finales. Una fase enfocada de posicionamiento no tiene el mismo alcance que una plataforma completa con naming, arquitectura de marca, mensajes y activación. Antes de presupuestar definimos qué decisiones debe resolver el proyecto y cuáles pueden esperar.",
      details: [
        "Una estrategia de marca útil no es una declaración abstracta. Debe ayudar a decidir qué oportunidades encajan, qué públicos son prioritarios, qué valor se debe explicar y qué expresiones refuerzan o debilitan el posicionamiento.",
        "Trabajamos a partir del contexto disponible: objetivos de negocio, oferta, alternativas del mercado, percepciones internas y materiales existentes. Convertimos esa información en criterios compartidos para que dirección, comunicación y diseño operen con la misma lógica.",
        "El resultado prepara la ejecución. Principios, mensajes y prioridades se conectan con identidad, contenido, web o producto digital, evitando documentos estratégicos que no llegan a transformar decisiones reales.",
        "La investigación se ajusta a la decisión que hay que tomar. Puede combinar entrevistas con el equipo, revisión de clientes y oferta, análisis de competidores, auditorías de comunicación y talleres de síntesis. No acumulamos datos por volumen: documentamos qué sabemos, qué es una hipótesis y qué evidencia falta para que el posicionamiento no dependa solo de opiniones internas.",
        "También definimos cómo se aplicará la estrategia después de la entrega. Asignamos prioridades, responsables y criterios para revisar nuevas decisiones, desde un mensaje comercial hasta un servicio, un naming o una web. Así la plataforma de marca funciona como una herramienta de gobierno compartida y no como un documento que solo consulta el equipo de diseño.",
      ],
      process: ["Contexto y objetivos", "Posicionamiento y criterios", "Naming y lenguaje", "Principios para ejecutar la marca"],
      deliverables: ["Plataforma de marca", "Propuesta de valor", "Territorios de posicionamiento", "Tono de voz", "Hoja de ruta de activación"],
      relatedProjects: ["vira", "arkuos", "enteza"],
    },
  },
  "branding-visual-identity": {
    ca: {
      title: "BRANDING I IDENTITAT VISUAL",
      seoTitle: "Branding a Girona i Costa Brava | PALSEC AGCY",
      description: "Disseny d'identitat visual, sistemes gràfics i aplicacions de marca pensats per mantenir coherència en digital, impressió i espai.",
      intro: "Transformem l'estratègia en un sistema visual recognoscible, flexible i preparat per funcionar en les aplicacions reals de la marca.",
      forWhom: "Per a marques que neixen, es reposicionen o necessiten ordenar expressions visuals que avui no treballen com un sistema.",
      budget: "El cost d'una identitat visual varia segons el punt de partida, el nombre d'aplicacions i la profunditat del sistema. Dissenyar un logotip aïllat no equival a definir una identitat amb direcció visual, tipografia, color, moviment, plantilles i guia d'ús. El pressupost concreta les aplicacions prioritàries i evita produir peces que l'equip no necessitarà.",
      details: [
        "Comencem identificant què ha de reconèixer el públic i quines aplicacions exigeixen més rendiment al sistema. Aquesta priorització evita dissenyar una identitat només per a una presentació i obliga a provar-la en formats, escales i contextos reals.",
        "La direcció visual explora territoris diferents abans de seleccionar-ne un. Després definim relacions entre logotip, tipografia, color, composició, imatge i moviment perquè les peces puguin variar sense perdre coherència.",
        "El lliurament no consisteix només en arxius finals. Documentem criteris d'ús i preparem plantilles o aplicacions prioritàries perquè l'equip pugui mantenir la identitat quan apareixen nous canals i necessitats.",
        "Abans de redissenyar, auditem què funciona i què genera inconsistències en la identitat actual. Revisem arxius, canals, proveïdors, reproducció tècnica i necessitats de l'equip. Això permet conservar actius amb reconeixement, detectar problemes que un logotip nou no resoldria i prioritzar les aplicacions que realment condicionen el sistema.",
        "La proposta també concreta formats d'arxiu, llicències tipogràfiques o d'imatge, adaptacions i responsabilitats de producció. Quan cal una transició, preparem criteris per substituir materials de manera gradual sense obligar a renovar-ho tot el mateix dia. El sistema es dissenya perquè sigui aplicable amb els recursos disponibles, no només perquè es vegi bé en una presentació.",
      ],
      process: ["Direcció visual", "Exploració i selecció", "Sistema d'identitat", "Aplicacions i criteris d'ús"],
      deliverables: ["Logotip i arquitectura de marca", "Tipografia i color", "Sistema gràfic", "Plantilles i aplicacions", "Guia d'ús"],
      relatedProjects: ["el-xiringuito", "gent-gran-de-calonge-i-sant-antoni", "logoteca"],
    },
    en: {
      title: "BRANDING & VISUAL IDENTITY",
      seoTitle: "Branding in Girona & Costa Brava | PALSEC AGCY",
      description: "Visual identity design, graphic systems, and brand applications built to stay coherent across digital, print, and spatial touchpoints.",
      intro: "We turn strategy into a recognizable, flexible visual system designed to work across the brand's real applications.",
      forWhom: "For brands that are launching, repositioning, or need to organize visual expressions that do not yet work as one system.",
      budget: "The cost of a visual identity varies with the starting point, the number of applications, and the depth of the system. Designing an isolated logo is not equivalent to defining visual direction, typography, colour, motion, templates, and usage guidance. The proposal identifies priority applications so the project does not produce assets the team will not use.",
      details: [
        "We begin by identifying what audiences need to recognize and which applications place the greatest demands on the system. This prevents an identity from being designed only for a presentation and tests it across real formats, scales, and contexts.",
        "Visual direction explores distinct territories before one is selected. We then define relationships between logo, typography, colour, composition, imagery, and motion so individual assets can vary without losing coherence.",
        "Delivery is not limited to final files. We document usage criteria and prepare priority templates or applications so the team can maintain the identity as new channels and needs appear.",
        "Before redesigning, we audit what works and what creates inconsistency in the current identity. Existing files, channels, suppliers, technical reproduction, and team needs are reviewed. This helps retain assets with recognition, identify problems a new logo would not solve, and prioritise the applications that place the greatest demands on the system.",
        "The proposal also specifies file formats, typography or image licences, adaptations, and production responsibilities. When a transition is required, we prepare criteria for replacing materials progressively instead of forcing every touchpoint to change on the same day. The system is designed to be usable with the available resources, not only to look convincing in a presentation.",
      ],
      process: ["Visual direction", "Exploration and selection", "Identity system", "Applications and usage criteria"],
      deliverables: ["Logo and brand architecture", "Typography and color", "Graphic system", "Templates and applications", "Usage guide"],
      relatedProjects: ["el-xiringuito", "gent-gran-de-calonge-i-sant-antoni", "logoteca"],
    },
    es: {
      title: "BRANDING E IDENTIDAD VISUAL",
      seoTitle: "Branding en Girona y Costa Brava | PALSEC AGCY",
      description: "Diseño de identidad visual, sistemas gráficos y aplicaciones de marca pensados para mantener coherencia en digital, impresión y espacio.",
      intro: "Transformamos la estrategia en un sistema visual reconocible, flexible y preparado para funcionar en las aplicaciones reales de la marca.",
      forWhom: "Para marcas que nacen, se reposicionan o necesitan ordenar expresiones visuales que todavía no trabajan como un sistema.",
      budget: "El coste de una identidad visual varía según el punto de partida, el número de aplicaciones y la profundidad del sistema. Diseñar un logotipo aislado no equivale a definir una identidad con dirección visual, tipografía, color, movimiento, plantillas y guía de uso. El presupuesto concreta las aplicaciones prioritarias y evita producir piezas que el equipo no necesitará.",
      details: [
        "Empezamos identificando qué debe reconocer el público y qué aplicaciones exigen más al sistema. Esta priorización evita diseñar una identidad solo para una presentación y obliga a probarla en formatos, escalas y contextos reales.",
        "La dirección visual explora territorios distintos antes de seleccionar uno. Después definimos relaciones entre logotipo, tipografía, color, composición, imagen y movimiento para que las piezas puedan variar sin perder coherencia.",
        "La entrega no se limita a archivos finales. Documentamos criterios de uso y preparamos plantillas o aplicaciones prioritarias para que el equipo pueda mantener la identidad cuando aparecen nuevos canales y necesidades.",
        "Antes de rediseñar, auditamos qué funciona y qué genera inconsistencias en la identidad actual. Revisamos archivos, canales, proveedores, reproducción técnica y necesidades del equipo. Esto permite conservar activos con reconocimiento, detectar problemas que un logotipo nuevo no resolvería y priorizar las aplicaciones que realmente condicionan el sistema.",
        "La propuesta también concreta formatos de archivo, licencias tipográficas o de imagen, adaptaciones y responsabilidades de producción. Cuando hace falta una transición, preparamos criterios para sustituir materiales de forma gradual sin obligar a renovarlo todo el mismo día. El sistema se diseña para ser aplicable con los recursos disponibles, no solo para verse bien en una presentación.",
      ],
      process: ["Dirección visual", "Exploración y selección", "Sistema de identidad", "Aplicaciones y criterios de uso"],
      deliverables: ["Logotipo y arquitectura de marca", "Tipografía y color", "Sistema gráfico", "Plantillas y aplicaciones", "Guía de uso"],
      relatedProjects: ["el-xiringuito", "gent-gran-de-calonge-i-sant-antoni", "logoteca"],
    },
  },
  "web-design-digital-products": {
    ca: {
      title: "DISSENY WEB I PRODUCTE DIGITAL",
      seoTitle: "Disseny web a Girona i Costa Brava | PALSEC AGCY",
      description: "Disseny web, producte digital i UX/UI amb arquitectura clara, components escalables i una expressió visual coherent amb la marca.",
      intro: "Dissenyem webs editorials i productes digitals que converteixen contingut i funcionalitat en una experiència clara, usable i coherent.",
      forWhom: "Per a marques i organitzacions que necessiten una web, una aplicació o un sistema digital que connecti objectius, contingut i experiència d'ús.",
      budget: "El pressupost d'una web depèn de l'arquitectura, la quantitat i l'estat del contingut, el nivell de personalització, els idiomes, les integracions i qui assumeix el desenvolupament. Una landing, una web corporativa i un producte digital no són paquets equivalents. Primer acotem objectius, funcionalitats, responsabilitats i criteris de llançament; després proposem fases i entregables comparables.",
      details: [
        "L'arquitectura parteix de les preguntes que ha de resoldre cada usuari i de les accions que el negoci necessita facilitar. Ordenem contingut, navegació i jerarquia abans d'afegir complexitat visual, de manera que cada pantalla tingui una funció clara.",
        "Els fluxos i prototips permeten comprovar recorreguts, estats i decisions abans de produir totes les pantalles. La interfície tradueix després la identitat a un sistema responsive, accessible i preparat per treballar amb contingut real.",
        "Documentem components, variants i comportaments perquè disseny i desenvolupament comparteixin contractes. Durant la implementació podem revisar fidelitat, accessibilitat i rendiment per evitar que l'experiència final perdi les decisions validades.",
        "No pressuposem que una web a mida sigui sempre la millor resposta. Comparem el contingut, les funcionalitats, el ritme d'actualització i la capacitat de l'equip amb les limitacions d'una plantilla o d'un gestor existent. Personalitzem quan aporta una diferència real en arquitectura, marca, accessibilitat o operativa; aprofitem una base contrastada quan resol millor el temps i el pressupost.",
        "En webs multilingües definim des del principi quins continguts existeixen en català, castellà i anglès, com canvia la navegació i quines URLs han d'indexar-se. Canonicals, hreflang, redireccions i jerarquia formen part de la mateixa arquitectura, especialment en redissenys o migracions on cal conservar les adreces i els senyals SEO útils.",
      ],
      process: ["Objectius i arquitectura", "Fluxos i prototip", "Direcció d'interfície", "Sistema de components i lliurament"],
      deliverables: ["Arquitectura d'informació", "UX i prototips", "Disseny UI responsive", "Sistema de components", "Direcció per implementació"],
      relatedProjects: ["vira", "galeon", "arkuos"],
    },
    en: {
      title: "WEB DESIGN & DIGITAL PRODUCTS",
      seoTitle: "Web Design in Girona & Costa Brava | PALSEC AGCY",
      description: "Web design, digital product, and UX/UI with clear architecture, scalable components, and a visual expression aligned with the brand.",
      intro: "We design editorial websites and digital products that turn content and functionality into a clear, usable, and coherent experience.",
      forWhom: "For brands and organizations that need a website, application, or digital system connecting objectives, content, and user experience.",
      budget: "Website budgets depend on architecture, the amount and readiness of content, the level of customization, languages, integrations, and who owns development. A landing page, corporate site, and digital product are not equivalent packages. We first define objectives, functionality, responsibilities, and launch criteria, then propose comparable phases and deliverables.",
      details: [
        "Architecture begins with the questions each audience needs answered and the actions the organization must support. We organise content, navigation, and hierarchy before adding visual complexity, giving every screen a clear purpose.",
        "Flows and prototypes test journeys, states, and decisions before every screen is produced. The interface then translates the identity into a responsive, accessible system designed to work with real content.",
        "Components, variants, and behaviours are documented so design and engineering share the same contracts. During implementation we can review fidelity, accessibility, and performance so the final experience preserves validated decisions.",
        "We do not assume that a fully custom website is always the right answer. We compare content, functionality, publishing frequency, and team capabilities with the constraints of a template or an existing content system. Custom work is used when it creates a meaningful difference in architecture, brand expression, accessibility, or operations; a proven foundation is retained when it serves time and budget better.",
        "For multilingual websites, we define from the outset which content exists in Catalan, Spanish, and English, how navigation changes, and which URLs should be indexed. Canonicals, hreflang, redirects, and hierarchy are treated as one architecture, particularly during redesigns or migrations where valuable URLs and SEO signals need to be preserved.",
      ],
      process: ["Objectives and architecture", "Flows and prototype", "Interface direction", "Component system and handoff"],
      deliverables: ["Information architecture", "UX and prototypes", "Responsive UI design", "Component system", "Implementation direction"],
      relatedProjects: ["vira", "galeon", "arkuos"],
    },
    es: {
      title: "DISEÑO WEB Y PRODUCTO DIGITAL",
      seoTitle: "Diseño web en Girona y Costa Brava | PALSEC AGCY",
      description: "Diseño web, producto digital y UX/UI con arquitectura clara, componentes escalables y una expresión visual coherente con la marca.",
      intro: "Diseñamos webs editoriales y productos digitales que convierten contenido y funcionalidad en una experiencia clara, usable y coherente.",
      forWhom: "Para marcas y organizaciones que necesitan una web, aplicación o sistema digital que conecte objetivos, contenido y experiencia de uso.",
      budget: "El presupuesto de una web depende de la arquitectura, la cantidad y el estado del contenido, el nivel de personalización, los idiomas, las integraciones y quién asume el desarrollo. Una landing, una web corporativa y un producto digital no son paquetes equivalentes. Primero acotamos objetivos, funcionalidades, responsabilidades y criterios de lanzamiento; después proponemos fases y entregables comparables.",
      details: [
        "La arquitectura parte de las preguntas que debe resolver cada público y de las acciones que la organización necesita facilitar. Ordenamos contenido, navegación y jerarquía antes de añadir complejidad visual, dando una función clara a cada pantalla.",
        "Los flujos y prototipos permiten comprobar recorridos, estados y decisiones antes de producir todas las pantallas. La interfaz traduce después la identidad a un sistema responsive, accesible y preparado para trabajar con contenido real.",
        "Documentamos componentes, variantes y comportamientos para que diseño y desarrollo compartan contratos. Durante la implementación podemos revisar fidelidad, accesibilidad y rendimiento para que la experiencia final conserve las decisiones validadas.",
        "No damos por hecho que una web a medida sea siempre la mejor respuesta. Comparamos el contenido, las funcionalidades, el ritmo de actualización y la capacidad del equipo con las limitaciones de una plantilla o un gestor existente. Personalizamos cuando aporta una diferencia real en arquitectura, marca, accesibilidad u operativa; aprovechamos una base contrastada cuando resuelve mejor el tiempo y el presupuesto.",
        "En webs multilingües definimos desde el principio qué contenidos existen en catalán, castellano e inglés, cómo cambia la navegación y qué URLs deben indexarse. Canonicals, hreflang, redirecciones y jerarquía forman parte de una misma arquitectura, especialmente en rediseños o migraciones donde hay que conservar direcciones y señales SEO útiles.",
      ],
      process: ["Objetivos y arquitectura", "Flujos y prototipo", "Dirección de interfaz", "Sistema de componentes y entrega"],
      deliverables: ["Arquitectura de información", "UX y prototipos", "Diseño UI responsive", "Sistema de componentes", "Dirección para implementación"],
      relatedProjects: ["vira", "galeon", "arkuos"],
    },
  },
}

const FAQS: Record<ServiceSlug, Record<Lang, ServicePage["faqs"]>> = {
  "brand-strategy": {
    ca: [
      { question: "QUAN NECESSITEM ESTRATÈGIA DE MARCA?", answer: "Quan costa explicar què fa diferent el projecte, l'equip pren decisions contradictòries o la identitat ja no representa l'oferta. El treball estratègic ordena públics, proposta de valor, posicionament i criteris abans d'invertir en noves peces." },
      { question: "QUÈ REBREM AL FINAL?", answer: "L'abast pot incloure plataforma de marca, proposta de valor, territoris de posicionament, arquitectura de missatges, to de veu i un full de ruta. La proposta inicial concreta quins documents són necessaris i com s'utilitzaran." },
      { question: "ES POT CONNECTAR AMB BRANDING O WEB?", answer: "Sí. L'estratègia pot funcionar com una fase independent o com la base d'una identitat i una web. Connectar les fases evita que el relat, el sistema visual i l'experiència digital resolguin problemes diferents." },
      { question: "QUANT COSTA UNA ESTRATÈGIA DE MARCA?", answer: "El pressupost depèn de les decisions que cal resoldre, els públics i mercats, la recerca, les persones que participen i els lliurables. Una revisió de posicionament no té el mateix abast que un projecte amb naming, arquitectura de marca i missatges. La proposta separa fases perquè es pugui començar pel bloc que desbloqueja més decisions." },
      { question: "QUANT DURA EL PROCÉS?", answer: "La durada s'acorda segons l'abast, la disponibilitat de l'equip i el nombre de validacions. Abans de començar fixem sessions, responsables i dates de retorn perquè el calendari no depengui de reunions indefinides. Si identitat o web venen després, planifiquem el traspàs perquè les decisions estratègiques arribin a temps a la producció." },
      { question: "CAL FER ENTREVISTES O RECERCA?", answer: "Només la necessària per reduir la incertesa de les decisions. Podem entrevistar equip, clients o partners, revisar dades i materials existents i comparar alternatives del mercat. Distingim evidència, percepcions i hipòtesis, i expliquem què es pot concloure amb la informació disponible sense presentar opinions com si fossin resultats demostrats." },
      { question: "PODEU TREBALLAR AMB UNA ESTRATÈGIA EXISTENT?", answer: "Sí. Auditem el material, comprovem si encara representa l'oferta i identifiquem buits o contradiccions. No repetim recerca o tallers que ja han resolt una decisió. Podem concentrar-nos a convertir una estratègia vàlida en missatges, criteris per a la identitat, arquitectura web o un full de ruta que l'equip pugui executar." },
      { question: "LA FASE POT INCLOURE NAMING?", answer: "Sí, si el nom és una decisió pendent i forma part de l'abast. Abans d'explorar opcions definim criteris lingüístics, estratègics i d'ús; després fem comprovacions preliminars de disponibilitat. La validació jurídica o registral definitiva correspon a professionals i organismes competents i no es presenta com a garantida pel procés creatiu." },
      { question: "QUI HA DE PARTICIPAR EN EL PROJECTE?", answer: "Necessitem una persona responsable de decisió i la participació puntual de qui coneix negoci, clients, oferta i implementació. No cal implicar tot l'equip en cada sessió. Definim qui aporta context, qui revisa i qui aprova per evitar consensos ambigus i assegurar que les decisions es puguin aplicar després." },
    ],
    en: [
      { question: "WHEN DO WE NEED BRAND STRATEGY?", answer: "When the offer is hard to explain, teams make inconsistent decisions, or the current identity no longer represents the business. Strategy aligns audiences, value proposition, positioning, and decision criteria before investing in new assets." },
      { question: "WHAT WILL WE RECEIVE?", answer: "The scope may include a brand platform, value proposition, positioning territories, messaging architecture, tone of voice, and an activation roadmap. The initial proposal specifies the documents required and how they will be used." },
      { question: "CAN IT CONNECT TO BRANDING OR WEB DESIGN?", answer: "Yes. Strategy can be a focused phase or the foundation for identity and digital work. Connecting the phases prevents the narrative, visual system, and website experience from solving different problems." },
      { question: "HOW MUCH DOES BRAND STRATEGY COST?", answer: "Budget depends on the decisions to resolve, audiences and markets, research, participants, and deliverables. A positioning review has a different scope from a project covering naming, brand architecture, and messaging. The proposal separates phases so work can begin with the block that unlocks the most important decisions. It also states which meetings, research activities, documents, and implementation support are included, so proposals with different levels of depth are not mistaken for equivalent services." },
      { question: "HOW LONG DOES THE PROCESS TAKE?", answer: "Timing is agreed according to scope, team availability, and the number of validation points. Sessions, owners, and feedback dates are set before work begins so the schedule does not depend on open-ended meetings. If identity or web design follows, the handoff is planned so strategic decisions reach production on time." },
      { question: "DO WE NEED INTERVIEWS OR RESEARCH?", answer: "Only the research required to reduce uncertainty in the decisions. We may interview teams, customers, or partners, review existing data and material, and compare market alternatives. Evidence, perceptions, and hypotheses are kept distinct, and we explain what can be concluded without presenting opinions as demonstrated findings." },
      { question: "CAN YOU WORK WITH AN EXISTING STRATEGY?", answer: "Yes. We audit the material, assess whether it still represents the offer, and identify gaps or contradictions. Research and workshops that already resolved a decision are not repeated. We can focus on translating a valid strategy into messaging, identity criteria, website architecture, or an actionable roadmap." },
      { question: "CAN THE PROJECT INCLUDE NAMING?", answer: "Yes, when the name is an unresolved decision and included in scope. Linguistic, strategic, and practical criteria are defined before options are explored, followed by preliminary availability checks. Final legal or trademark clearance belongs to qualified professionals and authorities and is not presented as guaranteed by the creative process." },
      { question: "WHO SHOULD PARTICIPATE?", answer: "We need one accountable decision-maker and targeted input from people who understand the business, customers, offer, and implementation. The whole team does not need to attend every session. We define who supplies context, who reviews, and who approves to avoid ambiguous consensus and ensure decisions can be applied consistently across teams and channels." },
    ],
    es: [
      { question: "¿CUÁNDO NECESITAMOS ESTRATEGIA DE MARCA?", answer: "Cuando cuesta explicar qué hace diferente al proyecto, el equipo toma decisiones contradictorias o la identidad ya no representa la oferta. La estrategia alinea públicos, propuesta de valor, posicionamiento y criterios antes de invertir en nuevas piezas." },
      { question: "¿QUÉ RECIBIREMOS AL FINAL?", answer: "El alcance puede incluir plataforma de marca, propuesta de valor, territorios de posicionamiento, arquitectura de mensajes, tono de voz y hoja de ruta. La propuesta inicial concreta los documentos necesarios y cómo se utilizarán." },
      { question: "¿SE PUEDE CONECTAR CON BRANDING O WEB?", answer: "Sí. La estrategia puede ser una fase independiente o la base de una identidad y una web. Conectar las fases evita que el relato, el sistema visual y la experiencia digital resuelvan problemas distintos." },
      { question: "¿CUÁNTO CUESTA UNA ESTRATEGIA DE MARCA?", answer: "El presupuesto depende de las decisiones que hay que resolver, los públicos y mercados, la investigación, las personas participantes y los entregables. Una revisión de posicionamiento no tiene el mismo alcance que un proyecto con naming, arquitectura de marca y mensajes. La propuesta separa fases para empezar por el bloque que desbloquea más decisiones." },
      { question: "¿CUÁNTO DURA EL PROCESO?", answer: "La duración se acuerda según el alcance, la disponibilidad del equipo y el número de validaciones. Antes de empezar fijamos sesiones, responsables y fechas de retorno para que el calendario no dependa de reuniones indefinidas. Si después vienen identidad o web, planificamos el traspaso para que las decisiones estratégicas lleguen a tiempo a producción." },
      { question: "¿HAY QUE HACER ENTREVISTAS O INVESTIGACIÓN?", answer: "Solo la necesaria para reducir la incertidumbre de las decisiones. Podemos entrevistar a equipo, clientes o partners, revisar datos y materiales existentes y comparar alternativas del mercado. Distinguimos evidencia, percepciones e hipótesis, y explicamos qué se puede concluir con la información disponible sin presentar opiniones como resultados demostrados." },
      { question: "¿PODÉIS TRABAJAR CON UNA ESTRATEGIA EXISTENTE?", answer: "Sí. Auditamos el material, comprobamos si todavía representa la oferta e identificamos vacíos o contradicciones. No repetimos investigación o talleres que ya han resuelto una decisión. Podemos centrarnos en convertir una estrategia válida en mensajes, criterios para la identidad, arquitectura web o una hoja de ruta ejecutable." },
      { question: "¿LA FASE PUEDE INCLUIR NAMING?", answer: "Sí, cuando el nombre es una decisión pendiente y forma parte del alcance. Antes de explorar opciones definimos criterios lingüísticos, estratégicos y de uso, y después hacemos comprobaciones preliminares de disponibilidad. La validación jurídica o registral definitiva corresponde a profesionales y organismos competentes y no se presenta como garantizada por el proceso creativo." },
      { question: "¿QUIÉN DEBE PARTICIPAR EN EL PROYECTO?", answer: "Necesitamos una persona responsable de decisión y la participación puntual de quienes conocen negocio, clientes, oferta e implementación. No hace falta implicar a todo el equipo en cada sesión. Definimos quién aporta contexto, quién revisa y quién aprueba para evitar consensos ambiguos y asegurar que las decisiones puedan aplicarse después." },
    ],
  },
  "branding-visual-identity": {
    ca: [
      { question: "ÉS NOMÉS UN REDISSENY DE LOGOTIP?", answer: "No necessàriament. Una identitat útil defineix com treballen logotip, tipografia, color, composició, imatge i moviment en situacions reals. El logotip és una peça del sistema, no l'únic resultat." },
      { question: "COM SABEM SI EL SISTEMA ÉS FLEXIBLE?", answer: "El provem en les aplicacions prioritàries abans de tancar-lo: xarxes, documents, web, presentacions, senyalística o packaging segons el projecte. Això permet detectar límits i documentar criteris que l'equip pugui aplicar." },
      { question: "PODEU TREBALLAR AMB UNA ESTRATÈGIA EXISTENT?", answer: "Sí. Revisem els materials disponibles, confirmem quines decisions continuen vigents i definim què falta per traduir-les a un llenguatge visual coherent. No cal repetir una fase estratègica que ja està ben resolta." },
      { question: "QUANT COSTA UNA IDENTITAT VISUAL?", answer: "El cost depèn del punt de partida, la profunditat del sistema i les aplicacions que s'han de preparar. Un logotip aïllat, una identitat amb plantilles i una arquitectura per diverses marques no són projectes equivalents. La proposta identifica prioritats, fases, revisions, producció i llicències perquè es pugui comparar l'abast real. També diferencia el disseny del sistema de la producció posterior de peces, impressió o desenvolupament." },
      { question: "QUANT DURA UN PROJECTE DE BRANDING?", answer: "El calendari varia segons recerca, nombre de rutes visuals, aplicacions i persones que validen. Fixem moments de decisió i terminis de feedback abans de començar. Si hi ha llançament, web, packaging o senyalística, coordinem l'ordre perquè el sistema estigui resolt abans de produir peces que en depenen." },
      { question: "QUANTES PROPOSTES I REVISIONS HI HA?", answer: "No mesurem el procés per un nombre arbitrari de logotips. Presentem rutes visuals diferenciades amb criteris i context, seleccionem una direcció i la desenvolupem sobre aplicacions reals. La proposta concreta les rondes de revisió i què s'ha de validar a cada etapa, evitant barrejar fragments de direccions incompatibles." },
      { question: "QUINS ARXIUS ES LLIUREN?", answer: "Definim els formats segons els usos acordats: versions de marca vectorials i raster, color, tipografia, plantilles, recursos gràfics i guia. També indiquem llicències i fonts que s'han d'adquirir o mantenir. No lliurem una carpeta genèrica; preparem una estructura que l'equip i els seus proveïdors puguin entendre i reutilitzar." },
      { question: "PODEM MANTENIR PART DE LA IDENTITAT ACTUAL?", answer: "Sí. Un redisseny no obliga a substituir tot el que existeix. Auditem reconeixement, coherència i funcionament tècnic per decidir què convé conservar, ajustar o retirar. Mantenir un actiu útil pot donar continuïtat i concentrar el pressupost en els punts on la identitat realment limita la marca." },
      { question: "COM S'IMPLEMENTA LA NOVA IDENTITAT?", answer: "Prioritzem els punts de contacte que tenen més impacte i preparem una seqüència de transició. El lliurament pot incloure plantilles, especificacions i direcció amb equips web, impremta, packaging o espai. Això evita que cada proveïdor interpreti el sistema pel seu compte i permet renovar materials progressivament quan no cal canviar-ho tot alhora." },
    ],
    en: [
      { question: "IS THIS ONLY A LOGO REDESIGN?", answer: "Not necessarily. A useful identity defines how logo, typography, colour, composition, imagery, and motion work in real situations. The logo is one part of the system, not the only outcome." },
      { question: "HOW DO WE KNOW THE SYSTEM IS FLEXIBLE?", answer: "We test it across priority applications before finalising it: social content, documents, websites, presentations, signage, or packaging depending on the project. This exposes limits and creates usable criteria for the team." },
      { question: "CAN YOU WORK WITH AN EXISTING STRATEGY?", answer: "Yes. We review the available material, confirm which decisions remain valid, and identify what is missing to translate them into a coherent visual language. A strategy phase does not need to be repeated when it is already resolved." },
      { question: "HOW MUCH DOES A VISUAL IDENTITY COST?", answer: "Cost depends on the starting point, the depth of the system, and the applications to prepare. An isolated logo, an identity with templates, and an architecture for multiple brands are not equivalent projects. The proposal identifies priorities, phases, revisions, production, and licences so the actual scope can be compared. It also separates system design from the later production of assets, print, or development." },
      { question: "HOW LONG DOES A BRANDING PROJECT TAKE?", answer: "Timing varies with research, the number of visual routes, applications, and decision-makers. Decision points and feedback deadlines are agreed before work begins. When a launch, website, packaging, or signage is involved, the sequence is coordinated so the system is resolved before dependent assets enter production." },
      { question: "HOW MANY CONCEPTS AND REVISIONS ARE INCLUDED?", answer: "We do not measure the process by an arbitrary number of logos. Distinct visual routes are presented with criteria and context, one direction is selected, and it is developed through real applications. The proposal specifies review rounds and what must be validated at each stage, avoiding mixtures of incompatible directions." },
      { question: "WHICH FILES ARE DELIVERED?", answer: "Formats are defined from the agreed uses: vector and raster brand versions, colour, typography, templates, graphic assets, and guidance. Required licences and fonts are also identified. Instead of a generic folder, we prepare a structure that the team and its suppliers can understand and reuse." },
      { question: "CAN WE KEEP PART OF THE CURRENT IDENTITY?", answer: "Yes. A redesign does not require replacing everything that exists. We audit recognition, coherence, and technical performance to decide what should be retained, adjusted, or retired. Keeping a useful asset can preserve continuity and focus the budget on the points where the identity genuinely limits the brand." },
      { question: "HOW IS THE NEW IDENTITY IMPLEMENTED?", answer: "We prioritise the touchpoints with the greatest impact and prepare a transition sequence. Delivery may include templates, specifications, and direction for web, print, packaging, or spatial teams. This prevents each supplier from interpreting the system independently and allows materials to be replaced progressively when everything does not need to change at once." },
    ],
    es: [
      { question: "¿ES SOLO UN REDISEÑO DE LOGOTIPO?", answer: "No necesariamente. Una identidad útil define cómo trabajan logotipo, tipografía, color, composición, imagen y movimiento en situaciones reales. El logotipo es una pieza del sistema, no el único resultado." },
      { question: "¿CÓMO SABEMOS SI EL SISTEMA ES FLEXIBLE?", answer: "Lo probamos en las aplicaciones prioritarias antes de cerrarlo: redes, documentos, web, presentaciones, señalética o packaging según el proyecto. Así detectamos límites y documentamos criterios que el equipo pueda aplicar." },
      { question: "¿PODÉIS TRABAJAR CON UNA ESTRATEGIA EXISTENTE?", answer: "Sí. Revisamos los materiales disponibles, confirmamos qué decisiones siguen vigentes y definimos qué falta para traducirlas a un lenguaje visual coherente. No es necesario repetir una fase estratégica ya resuelta." },
      { question: "¿CUÁNTO CUESTA UNA IDENTIDAD VISUAL?", answer: "El coste depende del punto de partida, la profundidad del sistema y las aplicaciones que haya que preparar. Un logotipo aislado, una identidad con plantillas y una arquitectura para varias marcas no son proyectos equivalentes. La propuesta identifica prioridades, fases, revisiones, producción y licencias para poder comparar el alcance real. También diferencia el diseño del sistema de la producción posterior de piezas, impresión o desarrollo." },
      { question: "¿CUÁNTO DURA UN PROYECTO DE BRANDING?", answer: "El calendario varía según investigación, número de rutas visuales, aplicaciones y personas que validan. Fijamos momentos de decisión y plazos de feedback antes de empezar. Si hay lanzamiento, web, packaging o señalética, coordinamos el orden para que el sistema esté resuelto antes de producir piezas que dependen de él." },
      { question: "¿CUÁNTAS PROPUESTAS Y REVISIONES HAY?", answer: "No medimos el proceso por un número arbitrario de logotipos. Presentamos rutas visuales diferenciadas con criterios y contexto, seleccionamos una dirección y la desarrollamos sobre aplicaciones reales. La propuesta concreta las rondas de revisión y qué se valida en cada etapa, evitando mezclar fragmentos de direcciones incompatibles." },
      { question: "¿QUÉ ARCHIVOS SE ENTREGAN?", answer: "Definimos los formatos según los usos acordados: versiones de marca vectoriales y raster, color, tipografía, plantillas, recursos gráficos y guía. También indicamos licencias y fuentes que haya que adquirir o mantener. No entregamos una carpeta genérica; preparamos una estructura que el equipo y sus proveedores puedan entender y reutilizar." },
      { question: "¿PODEMOS CONSERVAR PARTE DE LA IDENTIDAD ACTUAL?", answer: "Sí. Un rediseño no obliga a sustituir todo lo que existe. Auditamos reconocimiento, coherencia y funcionamiento técnico para decidir qué conviene conservar, ajustar o retirar. Mantener un activo útil puede dar continuidad y concentrar el presupuesto en los puntos donde la identidad realmente limita a la marca." },
      { question: "¿CÓMO SE IMPLEMENTA LA NUEVA IDENTIDAD?", answer: "Priorizamos los puntos de contacto con más impacto y preparamos una secuencia de transición. La entrega puede incluir plantillas, especificaciones y dirección con equipos web, imprenta, packaging o espacio. Así evitamos que cada proveedor interprete el sistema por su cuenta y podemos renovar materiales progresivamente cuando no hace falta cambiarlo todo a la vez, con criterios claros y compartidos." },
    ],
  },
  "web-design-digital-products": {
    ca: [
      { question: "COM COMENÇA UN PROJECTE WEB O DIGITAL?", answer: "Comencem pels objectius, els públics, el contingut i les accions que ha de facilitar el producte. Amb aquesta base definim arquitectura, fluxos i prototips abans de decidir l'expressió visual o el sistema de components." },
      { question: "EL DISSENY INCLOU DESENVOLUPAMENT?", answer: "L'abast es defineix a cada proposta. Podem preparar UX/UI, prototips, especificacions i direcció d'implementació, o coordinar-nos amb l'equip tècnic responsable. Les responsabilitats i lliurables queden fixats abans de començar." },
      { question: "COM ES PREPARA EL DISSENY PER CRÉIXER?", answer: "Treballem amb components, estats, regles responsive i patrons reutilitzables. També prioritzem accessibilitat, jerarquia de contingut i criteris de rendiment perquè noves pantalles no obliguin a reconstruir el sistema." },
      { question: "QUANT COSTA DISSENYAR UNA WEB?", answer: "No hi ha un preu únic perquè una landing, una web corporativa multilingüe i un producte amb integracions tenen abasts diferents. El pressupost es calcula després de concretar arquitectura, continguts, funcionalitats, desenvolupament i responsabilitats. La proposta separa fases i entregables perquè sigui possible comparar què inclou, què queda fora i què es pot ajornar." },
      { question: "WEB A MIDA O PLANTILLA?", answer: "Ho decidim segons el problema, no per preferència tecnològica. Una plantilla pot ser adequada si l'estructura és convencional i encaixa amb el contingut. Una solució a mida té sentit quan la marca, els fluxos, les integracions o el manteniment exigeixen més control. Expliquem les limitacions, costos futurs i dependències abans de seleccionar la base." },
      { question: "QUI PREPARA ELS CONTINGUTS?", answer: "Podem treballar amb textos i imatges aportats pel client, ajudar a ordenar-los o coordinar una fase específica de contingut. Abans de dissenyar acordem qui redacta, tradueix, revisa i carrega cada material. Això evita validar pantalles amb contingut fictici i descobrir tard que la jerarquia, els idiomes o el volum real necessiten una altra estructura." },
      { question: "PODEU FER UNA WEB EN CATALÀ, CASTELLÀ I ANGLÈS?", answer: "Sí. Planifiquem l'arquitectura multilingüe, les equivalències de navegació i les metadades de cada idioma des del principi. També definim canonicals i hreflang perquè els cercadors entenguin les versions correctes. Les traduccions i la seva revisió poden formar part del projecte o quedar en mans de l'equip, però la responsabilitat s'acorda abans de produir." },
      { question: "COM ES REDISSENYA UNA WEB SENSE PERDRE SEO?", answer: "Primer inventariem URLs, continguts, metadades i enllaços que ja tenen valor. Després preparem correspondències i redireccions abans del canvi, mantenim les pàgines útils i validem sitemap, canonicals, hreflang i rastreig en el llançament. No es pot garantir una posició concreta, però sí evitar pèrdues causades per eliminar o moure contingut sense un pla." },
      { question: "DE QUI SÓN EL DOMINI, ELS ARXIUS I EL CODI?", answer: "La proposta identifica què es lliura, quines llicències o serveis de tercers s'utilitzen i qui administra domini, hosting, analítica i repositoris. Recomanem que els actius essencials quedin sota comptes controlats pel client. Si el projecte inclou desenvolupament, també s'especifica l'accés al codi, la documentació i les condicions de manteniment abans de començar." },
    ],
    en: [
      { question: "HOW DOES A WEB OR DIGITAL PROJECT START?", answer: "We begin with objectives, audiences, content, and the actions the product must support. That foundation informs information architecture, user flows, and prototypes before visual direction or the component system is finalised." },
      { question: "DOES THE DESIGN INCLUDE DEVELOPMENT?", answer: "The scope is defined in each proposal. We can deliver UX/UI, prototypes, specifications, and implementation direction, or collaborate with the responsible engineering team. Responsibilities and deliverables are agreed before work begins." },
      { question: "HOW IS THE DESIGN PREPARED TO SCALE?", answer: "We work with components, states, responsive rules, and reusable patterns. Accessibility, content hierarchy, and performance criteria are considered so new screens can extend the system instead of rebuilding it." },
      { question: "HOW MUCH DOES A WEBSITE COST?", answer: "There is no single price because a landing page, a multilingual corporate site, and a product with integrations have different scopes. The budget is calculated after defining architecture, content, functionality, development, and responsibilities. The proposal separates phases and deliverables so it is clear what is included, what is excluded, and what can be postponed. This makes the scope measurable before visual production begins and prevents ambiguous comparisons between proposals." },
      { question: "CUSTOM WEBSITE OR TEMPLATE?", answer: "We decide from the problem rather than a technology preference. A template can be appropriate when the structure is conventional and fits the content. A custom solution makes sense when brand expression, user flows, integrations, or maintenance require greater control. We explain constraints, future costs, and dependencies before selecting the foundation." },
      { question: "WHO PREPARES THE CONTENT?", answer: "We can work with copy and images supplied by the client, help structure them, or coordinate a dedicated content phase. Before design begins, we agree who writes, translates, reviews, and uploads each asset. This avoids approving screens with placeholder content and discovering too late that the real hierarchy, languages, or volume require a different structure." },
      { question: "CAN THE WEBSITE SUPPORT CATALAN, SPANISH, AND ENGLISH?", answer: "Yes. We plan multilingual architecture, navigation equivalents, and metadata for each language from the outset. Canonicals and hreflang are defined so search engines understand the correct versions. Translation and review can be included or handled by the client's team, but ownership is agreed before production begins." },
      { question: "HOW DO YOU REDESIGN A WEBSITE WITHOUT LOSING SEO?", answer: "We first inventory URLs, content, metadata, and links that already carry value. Redirect mappings are prepared before the change, useful pages are retained, and the sitemap, canonicals, hreflang, and crawlability are checked at launch. A specific ranking cannot be guaranteed, but losses caused by moving or deleting content without a plan can be avoided." },
      { question: "WHO OWNS THE DOMAIN, FILES, AND CODE?", answer: "The proposal identifies what is delivered, which third-party licences or services are used, and who administers the domain, hosting, analytics, and repositories. We recommend keeping essential assets in accounts controlled by the client. When development is included, access to source code, documentation, and maintenance terms are specified before work starts." },
    ],
    es: [
      { question: "¿CÓMO EMPIEZA UN PROYECTO WEB O DIGITAL?", answer: "Empezamos por objetivos, públicos, contenido y acciones que debe facilitar el producto. Con esta base definimos arquitectura, flujos y prototipos antes de cerrar la dirección visual o el sistema de componentes." },
      { question: "¿EL DISEÑO INCLUYE DESARROLLO?", answer: "El alcance se define en cada propuesta. Podemos preparar UX/UI, prototipos, especificaciones y dirección de implementación, o coordinarnos con el equipo técnico responsable. Responsabilidades y entregables quedan fijados antes de empezar." },
      { question: "¿CÓMO SE PREPARA EL DISEÑO PARA CRECER?", answer: "Trabajamos con componentes, estados, reglas responsive y patrones reutilizables. También priorizamos accesibilidad, jerarquía de contenido y criterios de rendimiento para que nuevas pantallas amplíen el sistema sin reconstruirlo." },
      { question: "¿CUÁNTO CUESTA DISEÑAR UNA WEB?", answer: "No hay un precio único porque una landing, una web corporativa multilingüe y un producto con integraciones tienen alcances distintos. El presupuesto se calcula después de concretar arquitectura, contenidos, funcionalidades, desarrollo y responsabilidades. La propuesta separa fases y entregables para que sea posible comparar qué incluye, qué queda fuera y qué se puede aplazar." },
      { question: "¿WEB A MEDIDA O PLANTILLA?", answer: "Lo decidimos según el problema, no por preferencia tecnológica. Una plantilla puede ser adecuada cuando la estructura es convencional y encaja con el contenido. Una solución a medida tiene sentido cuando la marca, los flujos, las integraciones o el mantenimiento exigen más control. Explicamos las limitaciones, costes futuros y dependencias antes de elegir la base." },
      { question: "¿QUIÉN PREPARA LOS CONTENIDOS?", answer: "Podemos trabajar con textos e imágenes aportados por el cliente, ayudar a ordenarlos o coordinar una fase específica de contenido. Antes de diseñar acordamos quién redacta, traduce, revisa y carga cada material. Así evitamos validar pantallas con contenido ficticio y descubrir tarde que la jerarquía, los idiomas o el volumen real necesitan otra estructura." },
      { question: "¿PUEDE ESTAR EN CATALÁN, CASTELLANO E INGLÉS?", answer: "Sí. Planificamos desde el principio la arquitectura multilingüe, las equivalencias de navegación y los metadatos de cada idioma. También definimos canonicals y hreflang para que los buscadores entiendan las versiones correctas. La traducción y su revisión pueden incluirse o asumirlas el equipo del cliente, pero la responsabilidad se acuerda antes de producir." },
      { question: "¿CÓMO SE REDISEÑA UNA WEB SIN PERDER SEO?", answer: "Primero inventariamos URLs, contenidos, metadatos y enlaces que ya tienen valor. Después preparamos correspondencias y redirecciones antes del cambio, conservamos las páginas útiles y validamos sitemap, canonicals, hreflang y rastreo en el lanzamiento. No se puede garantizar una posición concreta, pero sí evitar pérdidas causadas por eliminar o mover contenido sin un plan." },
      { question: "¿DE QUIÉN SON EL DOMINIO, LOS ARCHIVOS Y EL CÓDIGO?", answer: "La propuesta identifica qué se entrega, qué licencias o servicios de terceros se utilizan y quién administra dominio, hosting, analítica y repositorios. Recomendamos que los activos esenciales estén en cuentas controladas por el cliente. Si el proyecto incluye desarrollo, también se especifican el acceso al código, la documentación y las condiciones de mantenimiento antes de empezar." },
    ],
  },
}

export function isServiceSlug(value: string | undefined): value is ServiceSlug {
  return SERVICE_SLUGS.includes(value as ServiceSlug)
}

export function getServicePage(slug: ServiceSlug, lang: Lang): ServicePage {
  return { slug, ...PAGES[slug][lang], faqs: FAQS[slug][lang] }
}

export function getAllServicePages(lang: Lang): ServicePage[] {
  return SERVICE_SLUGS.map((slug) => getServicePage(slug, lang))
}
