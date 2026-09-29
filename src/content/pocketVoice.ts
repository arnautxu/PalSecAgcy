import type { Lang } from "@/i18n/lang"

// Based on the delivered May 2026 brand manual, final artwork and website handoff.
// The owner confirmed PALSEC attribution; no app engineering or growth claims.
export const POCKET_VOICE_COPY = {
  ca: {
    sector: "Producte digital · Escriptura per veu",
    discipline: "Identitat visual, direcció d’art i web · PALSEC · 2026",
    intro: "PocketVoice transforma la veu en text dins d’una experiència de teclat. PALSEC ha desenvolupat la identitat visual i la seva expressió digital: un sistema que connecta el símbol, la tipografia, el color i les peces de comunicació amb la presentació web del producte.",
    challenge: "Explicar una utilitat immediata —parlar en lloc d’escriure— sense convertir la marca en una demostració de tecnologia. La identitat havia de funcionar tant en la mida reduïda d’una icona com en una capçalera de web o una peça de comunicació. Calia conservar la mateixa personalitat en suports amb jerarquies i distàncies de lectura diferents.",
    idea: "El símbol connecta una lletra amb l’expressió de la veu. La versió plana concentra la identificació en espais petits; la interpretació en forma de núvol dona una expressió més evocadora a les peces de comunicació. El manual diferencia aquests dos usos perquè l’expressivitat de la campanya no comprometi la llegibilitat de la icona.",
    application: "El sistema combina Pocket Blue (#0E8ECE), tons foscos i neutres amb dues famílies tipogràfiques: Erode per als titulars i Satoshi per al text. El manual fixa versions del logotip, marges de seguretat, jerarquies i criteris de veu. Les peces de llançament presenten el teclat en context, mentre que la web organitza el missatge i les demostracions visuals en una experiència adaptable a escriptori i mòbil.",
    result: "El lliurament inclou un sistema de marca documentat, arxius de logotip, recursos gràfics, peces de comunicació i una web de presentació. Les imatges mostren els materials finals de 2026. El treball de PALSEC connecta la identitat amb la web i les aplicacions de comunicació del producte.",
    deliverables: ["Símbol i logotip amb variants", "Manual de marca i regles d’aplicació", "Color, tipografia i direcció d’art", "Recursos de llançament i captures promocionals", "Disseny i implementació de la web de presentació"],
  },
  es: {
    sector: "Producto digital · Escritura por voz",
    discipline: "Identidad visual, dirección de arte y web · PALSEC · 2026",
    intro: "PocketVoice transforma la voz en texto dentro de una experiencia de teclado. PALSEC ha desarrollado la identidad visual y su expresión digital: un sistema que conecta símbolo, tipografía, color y piezas de comunicación con la presentación web del producto.",
    challenge: "Explicar una utilidad inmediata —hablar en lugar de escribir— sin convertir la marca en una demostración de tecnología. La identidad debía funcionar tanto en el tamaño reducido de un icono como en una cabecera web o una pieza de comunicación. Había que conservar la personalidad en soportes con jerarquías y distancias de lectura diferentes.",
    idea: "El símbolo conecta una letra con la expresión de la voz. La versión plana concentra la identificación en espacios pequeños; la interpretación en forma de nube aporta una expresión más evocadora a la comunicación. El manual diferencia ambos usos para que la expresividad de la campaña mantenga la legibilidad del icono.",
    application: "El sistema combina Pocket Blue (#0E8ECE), tonos oscuros y neutros con dos familias tipográficas: Erode para titulares y Satoshi para texto. El manual fija versiones del logotipo, márgenes de seguridad, jerarquías y criterios de voz. Las piezas de lanzamiento presentan el teclado en contexto, mientras que la web organiza el mensaje y las demostraciones visuales en una experiencia adaptable a escritorio y móvil.",
    result: "La entrega incluye un sistema de marca documentado, archivos de logotipo, recursos gráficos, piezas de comunicación y una web de presentación. Las imágenes muestran los materiales finales de 2026. El trabajo de PALSEC conecta la identidad con la web y las aplicaciones de comunicación del producto.",
    deliverables: ["Símbolo y logotipo con variantes", "Manual de marca y reglas de aplicación", "Color, tipografía y dirección de arte", "Recursos de lanzamiento y capturas promocionales", "Diseño e implementación de la web de presentación"],
  },
  en: {
    sector: "Digital product · Voice typing",
    discipline: "Visual identity, art direction and website · PALSEC · 2026",
    intro: "PocketVoice turns speech into text through a keyboard experience. PALSEC developed its visual identity and digital expression: a system connecting the symbol, typography, colour and communication materials with the product website.",
    challenge: "Explain an immediate benefit —speaking instead of typing— through a distinctive brand. The identity needed to work at the small size of an icon as well as in a website header or campaign material. The challenge was to retain its character across formats with different hierarchies and reading distances.",
    idea: "The symbol connects a letter with the expression of voice. Its flat version provides recognition in small spaces; the cloud interpretation gives communication materials a more evocative expression. The manual separates these uses so expressive campaign artwork can coexist with a legible application icon.",
    application: "The system combines Pocket Blue (#0E8ECE), dark tones and neutrals with two type families: Erode for headings and Satoshi for text. The manual defines logo variants, clear space, hierarchy and voice principles. Launch materials present the keyboard in context, while the website organises the message and visual demonstrations into an experience that adapts to desktop and mobile.",
    result: "The delivery includes a documented brand system, logo files, graphic assets, communication materials and a product website. The images show final materials from 2026. PALSEC’s work connects the identity with the website and the product’s communication materials.",
    deliverables: ["Symbol, wordmark and variants", "Brand manual and application rules", "Colour, typography and art direction", "Launch assets and promotional screenshots", "Product website design and implementation"],
  },
} satisfies Record<Lang, { sector: string; discipline: string; intro: string; challenge: string; idea: string; application: string; result: string; deliverables: string[] }>
