import { useLocation } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { Seo } from "@/components/Seo"
import { CONTACT_EMAIL } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { LEGAL_META } from "@/lib/seoMeta"

type LegalKind = "privacy" | "legal-notice"

export const LEGAL_COPY = {
  ca: {
    privacy: {
      title: "POLÍTICA DE PRIVACITAT",
      description: "Informació sobre el tractament de dades personals al web de PALSEC AGCY.",
      sections: [
        ["RESPONSABLE", `PALSEC AGCY gestiona aquest web. Per a qualsevol qüestió de privacitat pots escriure a ${CONTACT_EMAIL}.`],
        ["DADES QUE TRACTEM", "Quan ens escrius per correu, tractem les dades i el contingut que ens facilites únicament per respondre la consulta, preparar una proposta o gestionar una relació professional sol·licitada."],
        ["BASE I CONSERVACIÓ", "El tractament es basa en la teva petició o consentiment i, quan correspon, en l'execució de mesures precontractuals o contractuals. Conservem la informació durant el temps necessari per gestionar la relació i complir obligacions aplicables."],
        ["PROVEÏDORS I TRANSFERÈNCIES", "Podem utilitzar proveïdors tècnics necessaris per allotjar el web i gestionar el correu. No venem dades personals ni les utilitzem per a publicitat comportamental."],
        ["DRETS", `Pots sol·licitar accés, rectificació, supressió, oposició, limitació o portabilitat escrivint a ${CONTACT_EMAIL}. També pots presentar una reclamació davant l'autoritat de protecció de dades competent.`],
        ["COOKIES I ANALÍTICA", "Google Analytics només es carrega si acceptes l'analítica al gestor de preferències. En aquest cas, Google tracta dades d'ús i identificadors tècnics per generar estadístiques agregades. No activem senyals publicitaris ni personalització d'anuncis. Pots retirar el consentiment en qualsevol moment des d'aquesta pàgina."],
      ],
    },
    "legal-notice": {
      title: "AVÍS LEGAL",
      description: "Informació legal i condicions d'ús del web de PALSEC AGCY.",
      sections: [
        ["TITULAR DEL WEB", `Aquest web presenta el treball i els serveis de PALSEC AGCY. Contacte: ${CONTACT_EMAIL}. La informació identificativa o contractual addicional es facilita abans de formalitzar qualsevol encàrrec.`],
        ["ÚS DEL WEB", "L'accés és lliure i implica un ús lícit, diligent i respectuós amb els drets de tercers. No es permet interferir en el funcionament del web ni intentar accedir a sistemes o informació sense autorització."],
        ["PROPIETAT INTEL·LECTUAL", "Els textos, identitat, dissenys, imatges i peces mostrades pertanyen als seus titulars respectius. La publicació al portafolis no autoritza la reproducció, transformació o explotació sense permís."],
        ["ENLLAÇOS I RESPONSABILITAT", "Els enllaços externs s'ofereixen com a referència. PALSEC AGCY no controla el contingut de tercers. Treballem per mantenir la informació disponible i actualitzada, però no garantim l'absència absoluta d'errors o interrupcions."],
        ["CONTACTE", `Per informar d'un error, plantejar una qüestió de drets o demanar informació formal, escriu a ${CONTACT_EMAIL}.`],
      ],
    },
  },
  en: {
    privacy: {
      title: "PRIVACY POLICY",
      description: "Information about personal data processing on the PALSEC AGCY website.",
      sections: [
        ["CONTROLLER", `PALSEC AGCY manages this website. For any privacy question, contact ${CONTACT_EMAIL}.`],
        ["DATA WE PROCESS", "When you email us, we process the details and content you provide only to answer your enquiry, prepare a proposal, or manage the professional relationship you requested."],
        ["BASIS AND RETENTION", "Processing is based on your request or consent and, where applicable, on pre-contractual or contractual steps. We retain information for as long as needed to manage the relationship and meet applicable obligations."],
        ["PROVIDERS AND TRANSFERS", "We may use technical providers required to host the website and manage email. We do not sell personal data or use it for behavioural advertising."],
        ["YOUR RIGHTS", `You may request access, correction, deletion, objection, restriction, or portability by emailing ${CONTACT_EMAIL}. You may also complain to the competent data protection authority.`],
        ["COOKIES AND ANALYTICS", "Google Analytics loads only if you accept analytics in the preference manager. If accepted, Google processes usage data and technical identifiers to produce aggregated statistics. We do not enable advertising signals or ad personalisation. You can withdraw consent at any time from this page."],
      ],
    },
    "legal-notice": {
      title: "LEGAL NOTICE",
      description: "Legal information and terms of use for the PALSEC AGCY website.",
      sections: [
        ["WEBSITE OWNER", `This website presents the work and services of PALSEC AGCY. Contact: ${CONTACT_EMAIL}. Additional formal or contractual identification is provided before any engagement is entered into.`],
        ["USE OF THE WEBSITE", "Access is open and requires lawful, diligent use that respects third-party rights. You may not interfere with the website or attempt to access systems or information without authorization."],
        ["INTELLECTUAL PROPERTY", "Texts, identity, designs, images, and work shown belong to their respective owners. Publication in this portfolio does not authorize reproduction, modification, or commercial use without permission."],
        ["LINKS AND LIABILITY", "External links are provided for reference. PALSEC AGCY does not control third-party content. We work to keep information available and current but cannot guarantee the absolute absence of errors or interruptions."],
        ["CONTACT", `To report an error, raise a rights question, or request formal information, email ${CONTACT_EMAIL}.`],
      ],
    },
  },
  es: {
    privacy: {
      title: "POLÍTICA DE PRIVACIDAD",
      description: "Información sobre el tratamiento de datos personales en la web de PALSEC AGCY.",
      sections: [
        ["RESPONSABLE", `PALSEC AGCY gestiona esta web. Para cualquier cuestión de privacidad puedes escribir a ${CONTACT_EMAIL}.`],
        ["DATOS QUE TRATAMOS", "Cuando nos escribes por correo, tratamos los datos y el contenido que facilitas únicamente para responder la consulta, preparar una propuesta o gestionar la relación profesional solicitada."],
        ["BASE Y CONSERVACIÓN", "El tratamiento se basa en tu petición o consentimiento y, cuando corresponde, en medidas precontractuales o contractuales. Conservamos la información durante el tiempo necesario para gestionar la relación y cumplir obligaciones aplicables."],
        ["PROVEEDORES Y TRANSFERENCIAS", "Podemos utilizar proveedores técnicos necesarios para alojar la web y gestionar el correo. No vendemos datos personales ni los utilizamos para publicidad comportamental."],
        ["DERECHOS", `Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a ${CONTACT_EMAIL}. También puedes reclamar ante la autoridad de protección de datos competente.`],
        ["COOKIES Y ANALÍTICA", "Google Analytics solo se carga si aceptas la analítica en el gestor de preferencias. En ese caso, Google trata datos de uso e identificadores técnicos para generar estadísticas agregadas. No activamos señales publicitarias ni personalización de anuncios. Puedes retirar el consentimiento en cualquier momento desde esta página."],
      ],
    },
    "legal-notice": {
      title: "AVISO LEGAL",
      description: "Información legal y condiciones de uso de la web de PALSEC AGCY.",
      sections: [
        ["TITULAR DE LA WEB", `Esta web presenta el trabajo y los servicios de PALSEC AGCY. Contacto: ${CONTACT_EMAIL}. La información identificativa o contractual adicional se facilita antes de formalizar cualquier encargo.`],
        ["USO DE LA WEB", "El acceso es libre e implica un uso lícito, diligente y respetuoso con los derechos de terceros. No se permite interferir en el funcionamiento de la web ni intentar acceder a sistemas o información sin autorización."],
        ["PROPIEDAD INTELECTUAL", "Los textos, identidad, diseños, imágenes y piezas mostradas pertenecen a sus respectivos titulares. La publicación en el porfolio no autoriza su reproducción, transformación o explotación sin permiso."],
        ["ENLACES Y RESPONSABILIDAD", "Los enlaces externos se ofrecen como referencia. PALSEC AGCY no controla el contenido de terceros. Trabajamos para mantener la información disponible y actualizada, pero no garantizamos la ausencia absoluta de errores o interrupciones."],
        ["CONTACTO", `Para informar de un error, plantear una cuestión de derechos o solicitar información formal, escribe a ${CONTACT_EMAIL}.`],
      ],
    },
  },
} as const

export function LegalPage({ kind }: { kind: LegalKind }) {
  const lang = useLang()
  const { pathname } = useLocation()
  const copy = LEGAL_COPY[lang][kind]
  const seo = LEGAL_META[kind][lang]
  const preferencesLabel = lang === "ca" ? "Gestionar preferències d'analítica" : lang === "es" ? "Gestionar preferencias de analítica" : "Manage analytics preferences"

  return (
    <PageFrame className="relative">
      <Seo title={seo.title} bare description={seo.description} path={pathname} lang={lang} />
      <article className="h-full w-full overflow-y-auto px-4 pb-28 pt-[92px] sm:px-5 md:px-6">
        <div className="mx-auto max-w-[820px]">
          <p className="mb-4 text-nav uppercase tracking-nav text-ink/55">PALSEC AGCY</p>
          <h1 className="text-[clamp(24px,4vw,48px)] font-normal leading-[1.05] tracking-[-0.03em] normal-case">{copy.title}</h1>
          <p className="mt-3 text-[12px] text-ink/50 normal-case">25 · 08 · 2026</p>
          <div className="mt-10 space-y-9">
            {copy.sections.map(([title, body]) => (
              <section key={title} className="grid gap-3 border-t border-frame pt-5 md:grid-cols-[180px_1fr]">
                <h2 className="text-nav uppercase tracking-nav text-ink/55">{title}</h2>
                <p className="text-[14px] leading-[1.75] text-ink/80 normal-case md:text-[15px]">{body}</p>
              </section>
            ))}
          </div>
          {kind === "privacy" && (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("palsec:analytics-preferences"))}
              className="mb-6 mt-10 min-h-12 rounded-full border border-frame px-5 text-nav uppercase tracking-nav"
            >
              {preferencesLabel}
            </button>
          )}
        </div>
      </article>
    </PageFrame>
  )
}
