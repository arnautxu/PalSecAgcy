import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import type { Lang } from '@/i18n/lang'

type InquiryMode = 'quote' | 'audit'
type Service = 'branding' | 'web' | 'apps' | 'other'
const InquiryContext = createContext<(mode: InquiryMode, service?: Service) => void>(() => {})
export const useInquiry = () => useContext(InquiryContext)

export const INQUIRY_LABELS = {
  ca: { quote: 'Demana pressupost', audit: 'Demana l’auditoria gratuïta', auditService: 'Auditoria de marca gratuïta', nav: 'Pressupost' },
  es: { quote: 'Pide presupuesto', audit: 'Pide la auditoría gratuita', auditService: 'Auditoría de marca gratuita', nav: 'Presupuesto' },
  en: { quote: 'Request a quote', audit: 'Request your free brand audit', auditService: 'Free brand audit', nav: 'Get a quote' },
} as const

const COPY = {
  ca: {
    quoteTitle: 'Explica’ns el teu projecte.', auditTitle: 'Comencem per la teva marca.',
    quoteIntro: 'Explica’ns què necessites i què vols aconseguir. Amb aquest punt de partida podrem concretar una proposta.',
    auditIntro: 'Revisem gratuïtament la claredat, la coherència i la presència digital de la teva marca. T’orientem sobre què convé prioritzar abans de preparar una proposta.',
    name: 'Nom', email: 'Correu electrònic', brand: 'Empresa o marca', web: 'Web o perfil de marca', optional: 'opcional', service: 'Què necessites?', select: 'Tria una opció',
    webService: 'Web a mida', appService: 'Desenvolupament d’apps', other: 'Encara ho estic definint', message: 'Què t’agradaria aconseguir?', auditMessage: 'Què t’agradaria revisar?',
    note: 'Utilitzarem les dades per respondre la teva sol·licitud.', privacy: 'Política de privacitat', submit: 'Envia la sol·licitud', submitting: 'Enviant…', close: 'Tanca',
    success: 'Sol·licitud enviada.', successBody: 'Gràcies per explicar-nos el teu projecte. Et respondrem al correu que ens has indicat.', back: 'Torna a la web',
    error: 'No hem pogut enviar la sol·licitud. Torna-ho a provar o escriu-nos a', rateLimit: 'Has enviat diverses sol·licituds. Espera uns minuts o escriu-nos a',
  },
  es: {
    quoteTitle: 'Cuéntanos tu proyecto.', auditTitle: 'Empecemos por tu marca.',
    quoteIntro: 'Cuéntanos qué necesitas y qué quieres conseguir. Con este punto de partida podremos concretar una propuesta.',
    auditIntro: 'Revisamos gratuitamente la claridad, la coherencia y la presencia digital de tu marca. Te orientamos sobre qué conviene priorizar antes de preparar una propuesta.',
    name: 'Nombre', email: 'Correo electrónico', brand: 'Empresa o marca', web: 'Web o perfil de marca', optional: 'opcional', service: '¿Qué necesitas?', select: 'Elige una opción',
    webService: 'Web a medida', appService: 'Desarrollo de apps', other: 'Todavía lo estoy definiendo', message: '¿Qué te gustaría conseguir?', auditMessage: '¿Qué te gustaría revisar?',
    note: 'Utilizaremos los datos para responder a tu solicitud.', privacy: 'Política de privacidad', submit: 'Envía la solicitud', submitting: 'Enviando…', close: 'Cerrar',
    success: 'Solicitud enviada.', successBody: 'Gracias por contarnos tu proyecto. Te responderemos al correo que nos has indicado.', back: 'Vuelve a la web',
    error: 'No hemos podido enviar la solicitud. Inténtalo de nuevo o escríbenos a', rateLimit: 'Has enviado varias solicitudes. Espera unos minutos o escríbenos a',
  },
  en: {
    quoteTitle: 'Tell us about your project.', auditTitle: 'Let’s start with your brand.',
    quoteIntro: 'Tell us what you need and what you want to achieve. This gives us a starting point for a proposal.',
    auditIntro: 'We review your brand’s clarity, consistency and digital presence for free. We help identify priorities before preparing a proposal.',
    name: 'Name', email: 'Email', brand: 'Company or brand', web: 'Website or brand profile', optional: 'optional', service: 'What do you need?', select: 'Choose an option',
    webService: 'Bespoke website', appService: 'App development', other: 'Still defining it', message: 'What would you like to achieve?', auditMessage: 'What would you like us to review?',
    note: 'We will use your details to respond to your request.', privacy: 'Privacy policy', submit: 'Send request', submitting: 'Sending…', close: 'Close',
    success: 'Request sent.', successBody: 'Thanks for telling us about your project. We will reply to the email address you provided.', back: 'Back to the website',
    error: 'We could not send your request. Please try again or email', rateLimit: 'You have sent several requests. Please wait a few minutes or email',
  },
} as const

export function InquiryProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [mode, setMode] = useState<InquiryMode>('quote')
  const [service, setService] = useState<Service | ''>('')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [limited, setLimited] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const result = useRef<HTMLDivElement>(null)
  const error = useRef<HTMLParagraphElement>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const startedAt = useRef(0)
  const pending = useRef(false)
  const retry = useRef({ signature: '', id: '' })
  const copy = COPY[lang]

  const openInquiry = (next: InquiryMode, nextService?: Service) => {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setMode(next)
    setService(nextService || '')
    setStatus('idle')
    setLimited(false)
    startedAt.current = Date.now()
    retry.current = { signature: '', id: '' }
    setOpen(true)
  }

  useEffect(() => {
    if (!open || !dialog.current) return
    dialog.current.showModal()
    dialog.current.querySelector<HTMLInputElement>('input[name="name"]')?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow }
  }, [open])

  useEffect(() => {
    if (status === 'sent') result.current?.focus()
    if (status === 'error') error.current?.focus()
  }, [status])

  const close = () => {
    if (pending.current) return
    form.current?.reset()
    dialog.current?.close()
    setOpen(false)
    const returnTo = trigger.current?.isConnected ? trigger.current : document.querySelector<HTMLButtonElement>('[data-inquiry-focus-fallback]')
    returnTo?.focus()
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending.current || !event.currentTarget.reportValidity()) return
    const data = new FormData(event.currentTarget)
    const fields = {
      name: String(data.get('name') || ''), email: String(data.get('email') || ''),
      brand: String(data.get('brand') || ''), website: String(data.get('website') || ''),
      message: String(data.get('message') || ''), company_url: String(data.get('company_url') || ''),
      service: mode === 'audit' ? 'audit' : service, intent: mode, lang,
    }
    const signature = JSON.stringify(fields)
    if (retry.current.signature !== signature) retry.current = { signature, id: crypto.randomUUID() }
    pending.current = true
    setStatus('sending')
    setLimited(false)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, startedAt: startedAt.current, requestId: retry.current.id }),
        signal: AbortSignal.timeout(15000),
      })
      if (response.status === 429) setLimited(true)
      const receipt = await response.json()
      if (!response.ok || receipt.ok !== true || typeof receipt.id !== 'string') throw new Error('delivery')
      form.current?.reset()
      setStatus('sent')
      window.dispatchEvent(new CustomEvent('palsec:lead-submitted', { detail: { intent: mode, service: fields.service, lang } }))
    } catch {
      setStatus('error')
    } finally {
      pending.current = false
    }
  }

  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]')].filter(el => el.getClientRects().length > 0 && el.tabIndex >= 0)
    const first = controls[0], last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }

  return <InquiryContext.Provider value={openInquiry}>
    {children}
    <dialog ref={dialog} className="inquiry-dialog" aria-labelledby="inquiry-title" aria-describedby="inquiry-intro" onCancel={event => { event.preventDefault(); close() }} onKeyDown={trapFocus}>
      <div className="inquiry-heading"><span>PALSEC AGCY</span><button type="button" onClick={close} disabled={status === 'sending'} aria-label={copy.close}>×</button></div>
      <h2 id="inquiry-title">{mode === 'audit' ? copy.auditTitle : copy.quoteTitle}</h2>
      <p id="inquiry-intro">{mode === 'audit' ? copy.auditIntro : copy.quoteIntro}</p>
      {status === 'sent' ? <div ref={result} tabIndex={-1} role="status" className="inquiry-result">
        <h3>{copy.success}</h3><p>{copy.successBody}</p><button className="inquiry-submit" type="button" onClick={close}>{copy.back} →</button>
      </div> : <form ref={form} onSubmit={submit} aria-busy={status === 'sending'}>
        <fieldset disabled={status === 'sending'} className="contents">
          <div className="inquiry-row"><label>{copy.name}<input name="name" autoComplete="name" maxLength={120} required /></label><label>{copy.email}<input name="email" type="email" autoComplete="email" maxLength={254} required /></label></div>
          <div className="inquiry-row"><label>{copy.brand} <small>({copy.optional})</small><input name="brand" autoComplete="organization" maxLength={160} /></label><label>{copy.web} <small>({copy.optional})</small><input name="website" type="text" inputMode="url" autoComplete="url" maxLength={500} /></label></div>
          {mode !== 'audit' && <label>{copy.service}<select name="service" value={service} onChange={event => setService(event.target.value as Service | '')} required><option value="">{copy.select}</option><option value="branding">Branding</option><option value="web">{copy.webService}</option><option value="apps">{copy.appService}</option><option value="other">{copy.other}</option></select></label>}
          <label>{mode === 'audit' ? copy.auditMessage : copy.message}{mode === 'audit' && <small> ({copy.optional})</small>}<textarea name="message" rows={3} minLength={mode === 'audit' ? undefined : 10} maxLength={5000} required={mode !== 'audit'} /></label>
          <label className="inquiry-trap" aria-hidden="true">Company URL<input name="company_url" tabIndex={-1} autoComplete="off" /></label>
          <p className="inquiry-note">{copy.note} <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer">{copy.privacy}</a>.</p>
          {status === 'error' && <p ref={error} tabIndex={-1} role="alert" className="inquiry-error">{limited ? copy.rateLimit : copy.error} <a href="mailto:info@palsec.agency" className="underline">info@palsec.agency</a>.</p>}
          <button type="submit" className="inquiry-submit">{status === 'sending' ? copy.submitting : `${copy.submit} →`}</button>
        </fieldset>
      </form>}
    </dialog>
  </InquiryContext.Provider>
}
