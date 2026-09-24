import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft, ArrowUp, ArrowsOut, At, CalendarBlank, CaretDown, CaretLeft,
  CaretRight, Check, Copy, DotsThree, DownloadSimple, Eye, File, FilePdf,
  FilePpt, Folder, FolderOpen, GearSix, MagnifyingGlass, Microphone, Minus,
  NotePencil, Paperclip, Plus, SidebarSimple, X,
} from "@phosphor-icons/react"
import type { Lang } from "@/i18n/lang"

type DemoProject = { id: string; name: string }
type DemoMessage = { role: "user" | "assistant"; text: string; kind?: "presentation" | "schedule"; demo?: boolean }
type DemoThread = { id: string; title: string; projectId: string; recentOnly?: boolean; messages: DemoMessage[] }
type DemoModal = "search" | "project" | "automations" | "server" | "rename" | null
type DemoMenu = "add" | "experience" | "destination" | "connections" | "account" | "thread" | null
type PreviewFormat = "pptx" | "pdf"

const PRESENTATION_PROMPT = "Crea una presentació executiva de 3 diapositives en català per a una empresa fictícia, en PDF i PowerPoint, amb un disseny editorial cuidat. Fes servir només aquestes dades inventades: facturació 2025 8,42 M€, cost de producte 5,46 M€, personal 1,18 M€, lloguers i subministraments 0,54 M€, altres despeses 0,33 M€. Inclou resum executiu, gràfic de cascada del resultat i una última diapositiva amb les dades que caldria contrastar abans de prendre decisions."
const PRESENTATION_RESULT = "Presentació executiva completada i revisada en els dos formats. Inclou les 3 diapositives sol·licitades, el gràfic de cascada i la identificació clara de les dades com a fictícies. No s’han consultat fonts ni serveis externs."
const SLIDE_NAME = "AiBrain_resum_executiu_2025_dades_ficticies"
const INITIAL_PROJECTS: DemoProject[] = [{ id: "examples", name: "Exemples" }]
const INITIAL_THREADS: DemoThread[] = [
  {
    id: "presentation",
    projectId: "examples",
    title: "Crea una presentació executiva de 3 diapositives …",
    messages: [
      { role: "user", text: PRESENTATION_PROMPT },
      { role: "assistant", text: PRESENTATION_RESULT, kind: "presentation" },
    ],
  },
  {
    id: "schedule",
    projectId: "examples",
    title: "Organitza una setmana de torns de mostra",
    messages: [
      { role: "user", text: "Mostra una previsualització de l'horari de prova per a una botiga fictícia." },
      { role: "assistant", text: "He preparat una previsualització de l’horari de prova. Les persones, els torns i les dades són ficticis. Revisa els dies i les hores abans de fer servir un horari real.", kind: "schedule" },
    ],
  },
  {
    id: "quick-test",
    projectId: "examples",
    title: "Consulta ràpida amb dades de prova",
    messages: [
      { role: "user", text: "Fes una consulta breu amb dades fictícies." },
      { role: "assistant", text: "Aquesta és una resposta de demostració. La interfície manté el context dins del projecte Exemples." },
    ],
  },
  ...[
    "Prepara una presentació amb dades fictícies",
    "Resumeix els arxius de prova de vendes",
    "Prepara una comparació de costos ficticis",
    "Revisa un esborrany de pressupost de prova",
    "Quins arxius de prova hi ha disponibles?",
    "Comprovació de connexions de demostració",
    "Hola, AiBrain",
  ].map((title, index) => ({
    id: `recent-${index}`,
    title,
    projectId: "personal",
    recentOnly: true,
    messages: [
      { role: "user" as const, text: title },
      { role: "assistant" as const, text: "Aquesta és una conversa de mostra d’AiBrain. Pots continuar-la per provar l’experiència de la demo." },
    ],
  })),
]

function demoAnswer(prompt: string, attached: string[]): DemoMessage {
  const query = prompt.toLocaleLowerCase()
  if (/presentaci|presentaci[oó]n|powerpoint|diapositiv|pptx/.test(query)) {
    return { role: "assistant", text: PRESENTATION_RESULT, kind: "presentation", demo: true }
  }
  if (/horari|horario|schedule|torn/.test(query)) {
    return { role: "assistant", text: "He preparat una proposta de torns amb dades de demostració. Pots revisar la distribució per dies, les hores totals i els descansos abans d’aplicar-la a un equip real.", kind: "schedule", demo: true }
  }
  if (/cost|despes|factur|vendes|ventas|excel/.test(query)) {
    return { role: "assistant", demo: true, text: "Resum de prova amb dades fictícies:\n• Facturació: 8,42 M€\n• Cost de producte: 5,46 M€\n• Personal: 1,18 M€\n• Altres despeses: 0,87 M€\n• Resultat calculat: 0,91 M€ (10,8% de marge).\n\nAquesta demo no ha llegit cap fitxer real. Pots obrir el cas de la presentació al projecte Exemples per veure un document generat." }
  }
  if (attached.length) {
    return { role: "assistant", demo: true, text: `He rebut ${attached.length === 1 ? "el fitxer" : "els fitxers"} ${attached.map((file) => "“" + file + "”").join(", ")} en aquesta demo visual. Aquesta versió no en llegeix el contingut ni envia dades a cap servei.` }
  }
  return { role: "assistant", demo: true, text: "Aquesta és una demo interactiva d’AiBrain a PALSEC. La interfície permet explorar projectes, converses, documents i el flux de treball; aquesta resposta és de mostra i no ha consultat dades ni serveis externs." }
}

function IconButton({ label, children, onClick, disabled = false, className = "" }: {
  label: string; children: React.ReactNode; onClick?: () => void; disabled?: boolean; className?: string
}) {
  return <button type="button" aria-label={label} title={label} className={`aibrain-icon-button ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
}

function DocumentCard({ format, onPreview }: { format: PreviewFormat; onPreview: (format: PreviewFormat) => void }) {
  const Icon = format === "pptx" ? FilePpt : FilePdf
  return (
    <div className="aibrain-artifact">
      <div className="aibrain-artifact-top">
        <span className="aibrain-artifact-icon"><Icon size={19} /></span>
        <span className="aibrain-artifact-name"><strong>{SLIDE_NAME}.{format}</strong><small>{format.toUpperCase()} · {format === "pptx" ? "92" : "4"} KB</small></span>
        <IconButton label={`Previsualizar ${SLIDE_NAME}.${format}`} onClick={() => onPreview(format)}><Eye size={17} /></IconButton>
        <a className="aibrain-icon-button" title={`Descargar ejemplo ${format.toUpperCase()}`} aria-label={`Descargar ejemplo ${format.toUpperCase()}`} href={`/media/projects/ai-lab/demo/${SLIDE_NAME}.${format}`} download><DownloadSimple size={17} /></a>
      </div>
      <button className="aibrain-artifact-review" type="button" onClick={() => onPreview(format)}>Revisar antes de descargar <CaretRight size={14} /></button>
    </div>
  )
}

function DemoSlide({ page }: { page: number }) {
  if (page === 2) return (
    <div className="aibrain-slide">
      <span className="aibrain-slide-kicker">RESULTAT 2025 · PROVA FICTÍCIA</span>
      <h3>De la facturació al resultat</h3>
      <p className="aibrain-slide-lead">Reconciliació aritmètica de les xifres facilitades.</p>
      <div className="aibrain-waterfall">
        {[["Facturació", "8,42 M€", "100%"], ["Cost de producte", "−5,46 M€", "65%"], ["Personal", "−1,18 M€", "41%"], ["Altres costos", "−0,87 M€", "27%"], ["Resultat", "0,91 M€", "11%"]].map(([label, value, width], index) => (
          <div className="aibrain-waterfall-row" key={label}><span>{label}</span><div><i style={{ width, background: index === 4 ? "#c96554" : "#25343b" }} /></div><b>{value}</b></div>
        ))}
      </div>
      <footer>AIBRAIN · PROVA AMB DADES FICTÍCIES <span>2</span></footer>
    </div>
  )
  if (page === 3) return (
    <div className="aibrain-slide">
      <span className="aibrain-slide-kicker">ABANS DE PRENDRE DECISIONS</span>
      <h3>Dades pendents de contrastar</h3>
      <div className="aibrain-slide-list">
        <p><b>01</b> Origen i període de les dades de facturació</p>
        <p><b>02</b> Criteri d’imputació dels costos i despeses</p>
        <p><b>03</b> Partides extraordinàries i ajustos</p>
        <p><b>04</b> Comparació amb exercicis anteriors</p>
      </div>
      <p className="aibrain-slide-note">Aquest document és una demostració. Totes les xifres són fictícies.</p>
      <footer>AIBRAIN · PROVA AMB DADES FICTÍCIES <span>3</span></footer>
    </div>
  )
  return (
    <div className="aibrain-slide">
      <span className="aibrain-slide-kicker">RESUM EXECUTIU</span>
      <h3>Resultat 2025: 0,91 M€</h3>
      <div className="aibrain-slide-columns">
        <div>
          <strong className="aibrain-slide-total">0,91 M€</strong>
          <span className="aibrain-slide-caption">RESULTAT CALCULAT</span>
          <div className="aibrain-slide-stats"><p><b>10,8%</b><small>marge sobre facturació</small></p><p><b>7,51 M€</b><small>despeses totals</small></p></div>
        </div>
        <div>
          <h4>Composició de la facturació</h4>
          <div className="aibrain-slide-bar"><i /><i /><i /><i /><i /></div>
          <ul>
            <li>Cost de producte <b>5,46 M€</b></li>
            <li>Personal <b>1,18 M€</b></li>
            <li>Lloguers i subministraments <b>0,54 M€</b></li>
            <li>Altres despeses <b>0,33 M€</b></li>
            <li>Resultat <b>0,91 M€</b></li>
          </ul>
        </div>
      </div>
      <p className="aibrain-slide-note">La presentació mostra només la reconciliació aritmètica de les xifres facilitades. No atribueix causes al resultat.</p>
      <footer>AIBRAIN · PROVA AMB DADES FICTÍCIES <span>1</span></footer>
    </div>
  )
}

export function AiBrainDemo({ lang }: { lang: Lang }) {
  const [projects, setProjects] = useState<DemoProject[]>(INITIAL_PROJECTS)
  const [threads, setThreads] = useState<DemoThread[]>(INITIAL_THREADS)
const [activeProjectId, setActiveProjectId] = useState("examples")
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [draft, setDraft] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [experience, setExperience] = useState("Inteligente")
  const [menu, setMenu] = useState<DemoMenu>(null)
  const [modal, setModal] = useState<DemoModal>(null)
  const [newProjectName, setNewProjectName] = useState("")
  const [renameValue, setRenameValue] = useState("")
  const [search, setSearch] = useState("")
  const [projectOpen, setProjectOpen] = useState(true)
  const [recentOpen, setRecentOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [preview, setPreview] = useState<PreviewFormat | null>(null)
  const [previewPage, setPreviewPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState("")
  const [threadMenuId, setThreadMenuId] = useState<string | null>(null)
  const [connectedTools, setConnectedTools] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messageScrollRef = useRef<HTMLDivElement>(null)
  const currentProject = projects.find((project) => project.id === activeProjectId) ?? { id: "personal", name: "AiBrain" }
  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? null
  const filteredThreads = threads.filter((thread) => thread.projectId === activeProjectId && !thread.recentOnly)

  useEffect(() => {
    if (activeThreadId && messageScrollRef.current) messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight
  }, [activeThreadId, threads, preview])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(""), 3500)
    return () => window.clearTimeout(timeout)
  }, [notice])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setModal("search")
      }
      if (event.key === "Escape") {
        setModal(null); setMenu(null); setPreview(null); setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const selectProject = (id: string) => {
    setActiveProjectId(id); setActiveThreadId(null); setPreview(null); setMobileOpen(false); setMenu(null)
  }

  const selectThread = (id: string) => {
    const thread = threads.find((item) => item.id === id)
    if (!thread) return
    setActiveProjectId(thread.projectId); setActiveThreadId(id); setPreview(null); setMobileOpen(false); setMenu(null)
  }

  const startThread = () => {
    setActiveProjectId("personal"); setActiveThreadId(null); setDraft(""); setAttachments([]); setPreview(null); setMobileOpen(false); setMenu(null)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  const send = (messageOverride?: string) => {
    const message = (messageOverride ?? draft).trim()
    if (!message) return
    const response = demoAnswer(message, attachments)
    if (activeThreadId) {
      setThreads((current) => current.map((thread) => thread.id === activeThreadId ? { ...thread, messages: [...thread.messages, { role: "user", text: message }, response] } : thread))
    } else {
      const id = `demo-${Date.now()}`
      setThreads((current) => [{ id, projectId: activeProjectId, recentOnly: activeProjectId === "personal", title: message.length > 45 ? `${message.slice(0, 43)}…` : message, messages: [{ role: "user", text: message }, response] }, ...current])
      setActiveThreadId(id)
    }
    setDraft(""); setAttachments([]); setMenu(null)
  }

  const handleComposerKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send() }
  }

  const createProject = (event: FormEvent) => {
    event.preventDefault()
    const name = newProjectName.trim()
    if (!name) return
    const id = `project-${Date.now()}`
    setProjects((current) => [...current, { id, name }])
    setActiveProjectId(id); setActiveThreadId(null); setNewProjectName(""); setModal(null); setMobileOpen(false)
  }

  const renameThread = (event: FormEvent) => {
    event.preventDefault()
    const name = renameValue.trim()
    if (name && threadMenuId) setThreads((current) => current.map((thread) => thread.id === threadMenuId ? { ...thread, title: name } : thread))
    setModal(null); setThreadMenuId(null); setMenu(null)
  }

  const showPreview = (format: PreviewFormat) => {
    setPreview(format); setPreviewPage(1); setZoom(100)
  }

  const closeMenus = () => setMenu(null)

  return (
    <div className={`aibrain-demo ${preview ? "aibrain-demo-previewing" : ""}`} onClick={() => { if (menu) closeMenus() }}>
      {mobileOpen && <button type="button" className="aibrain-mobile-scrim" aria-label="Cerrar menú" onClick={() => setMobileOpen(false)} />}
      <aside className={`aibrain-sidebar ${sidebarOpen ? "" : "aibrain-sidebar-collapsed"} ${mobileOpen ? "aibrain-sidebar-mobile-open" : ""}`} aria-label="Navegación">
        {sidebarOpen || mobileOpen ? <>
          <div className="aibrain-sidebar-head">
            <img src="/media/projects/ai-lab/aibrain-mark.svg" alt="" className="aibrain-brand-logo" />
            <span className="aibrain-brand-name">AiBrain</span>
            <IconButton label="Buscar" onClick={() => setModal("search")}><MagnifyingGlass size={16} /></IconButton>
            <IconButton label="Ocultar barra lateral" onClick={() => { setSidebarOpen(false); setMobileOpen(false) }}><SidebarSimple size={17} /></IconButton>
          </div>
          <nav className="aibrain-primary-nav" aria-label="Navegación principal">
            <button type="button" className="aibrain-new-chat" onClick={startThread}><NotePencil size={16} />Nueva conversación</button>
            <button type="button" className="aibrain-nav-row" onClick={() => setModal("automations")}><CalendarBlank size={16} />Automatizaciones</button>
          </nav>
          <div className="aibrain-sidebar-scroll">
            <section className="aibrain-sidebar-section">
              <div className="aibrain-section-heading">
                <button type="button" onClick={() => setProjectOpen((value) => !value)}>Proyectos {projectOpen ? <CaretDown size={11} /> : <CaretRight size={11} />}</button>
                <IconButton label="Crear proyecto" onClick={() => setModal("project")}><Plus size={14} /></IconButton>
              </div>
              {projectOpen && <div className="aibrain-project-list">
                {projects.map((project) => <div key={project.id}>
                  <button type="button" className={`aibrain-project-row ${activeProjectId === project.id ? "active" : ""}`} onClick={() => selectProject(project.id)}>
                    <CaretDown size={12} /><Folder size={14} /><span>{project.name}</span>
                  </button>
                  {activeProjectId === project.id && <div className="aibrain-project-threads">
                    {filteredThreads.map((thread) => <div className="aibrain-thread-wrap" key={thread.id}>
                      <button type="button" className={`aibrain-thread-row ${activeThreadId === thread.id ? "active" : ""}`} onClick={() => selectThread(thread.id)} title={thread.title}>{thread.title}</button>
                      <IconButton label={`Acciones de ${thread.title}`} onClick={() => { setThreadMenuId(thread.id); setMenu("thread") }}><DotsThree size={15} /></IconButton>
                    </div>)}
                  </div>}
                </div>)}
              </div>}
            </section>
            <section className="aibrain-sidebar-section aibrain-recent-section">
              <div className="aibrain-section-heading">
                <button type="button" onClick={() => setRecentOpen((value) => !value)}>Conversaciones recientes {recentOpen ? <CaretDown size={11} /> : <CaretRight size={11} />}</button>
                <IconButton label="Nueva conversación independiente" onClick={startThread}><Plus size={14} /></IconButton>
              </div>
              {recentOpen && <div className="aibrain-recent-list">
                {threads.filter((thread) => thread.recentOnly).map((thread) => <button type="button" key={thread.id} className={`aibrain-recent-row ${activeThreadId === thread.id ? "active" : ""}`} onClick={() => selectThread(thread.id)} title={thread.title}>{thread.title}</button>)}
              </div>}
            </section>
          </div>
          <div className="aibrain-account-wrap">
            <button type="button" className="aibrain-account" aria-label="Abrir menú de cuenta" onClick={(event) => { event.stopPropagation(); setMenu(menu === "account" ? null : "account") }}>
              <span className="aibrain-avatar">D</span><span><strong>Usuari demo</strong><small>AiBrain</small></span>
            </button>
          </div>
        </> : <div className="aibrain-rail">
          <IconButton label="Mostrar barra lateral" onClick={() => setSidebarOpen(true)}><SidebarSimple size={19} /></IconButton>
          <IconButton label="Buscar" onClick={() => setModal("search")}><MagnifyingGlass size={19} /></IconButton>
          <IconButton label="Nueva conversación" onClick={startThread}><NotePencil size={19} /></IconButton>
          <IconButton label="Automatizaciones" onClick={() => setModal("automations")}><CalendarBlank size={19} /></IconButton>
          <span className="aibrain-avatar">D</span>
        </div>}
      </aside>

      <div className="aibrain-workspace">
        <header className="aibrain-workspace-head">
          <IconButton label="Abrir menú" className="aibrain-mobile-menu" onClick={() => setMobileOpen(true)}><SidebarSimple size={20} /></IconButton>
          <div className="aibrain-breadcrumb"><Folder size={12} /><span>{currentProject.name}</span>{activeThread && <><br /><strong>{activeThread.title}</strong></>}</div>
          <span className="aibrain-demo-label">DEMO</span>
        </header>

        {activeThread ? <div className="aibrain-conversation">
          <div className="aibrain-messages" ref={messageScrollRef}>
            <div className="aibrain-messages-inner">
              {activeThread.messages.map((message, index) => message.role === "user" ? (
                <div className="aibrain-user-message" key={index}>{message.text}</div>
              ) : (
                <div className="aibrain-assistant-message" key={index}>
                  <button type="button" className="aibrain-process" onClick={() => setNotice("Esta conversación muestra una respuesta de demostración.")}><CaretDown size={13} />Respuesta de demostración</button>
                  {message.kind === "presentation" && <button type="button" className="aibrain-changes" onClick={() => showPreview("pptx")}>Abrir cambios y resultados <small>Incluidos en este turno</small></button>}
                  {message.kind === "presentation" ? <p>Presentació executiva completada i revisada en els dos formats:</p> : <p>{message.text}</p>}
                  {message.kind === "presentation" && <>
                    <ul><li>{SLIDE_NAME}.pptx</li><li>{SLIDE_NAME}.pdf</li></ul>
                    <p>Inclou les 3 diapositives sol·licitades, el gràfic de cascada editable i la identificació clara de les dades com a fictícies. No s’han consultat fonts ni serveis externs.</p>
                    <DocumentCard format="pptx" onPreview={showPreview} /><DocumentCard format="pdf" onPreview={showPreview} />
                  </>}
                  <button className="aibrain-copy" type="button" onClick={() => { void navigator.clipboard?.writeText(message.text); setCopied(true); window.setTimeout(() => setCopied(false), 2000) }} title="Copiar respuesta">{copied ? <Check size={15} /> : <Copy size={15} />}<span>{copied ? "Copiado" : "Copiar"}</span></button>
                </div>
              ))}
            </div>
          </div>
        </div> : <div className="aibrain-empty">
          <h3>{activeProjectId === "personal" ? "¿Cómo puedo ayudarte?" : `¿Cómo puedo ayudarte en ${currentProject.name}?`}</h3>
        </div>}

        <div className={`aibrain-composer-area ${activeThread ? "with-thread" : ""}`}>
          <div className="aibrain-composer">
            {!!attachments.length && <div className="aibrain-attachments">{attachments.map((file, index) => <span key={index}><Paperclip size={13} />{file}<button type="button" aria-label={`Quitar ${file}`} onClick={() => setAttachments((current) => current.filter((_, i) => i !== index))}><X size={12} /></button></span>)}</div>}
            <textarea ref={textareaRef} aria-label="Mensaje" placeholder={activeThread ? "Escribe a AiBrain…" : ""} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleComposerKey} rows={activeThread ? 1 : 2} />
            <div className="aibrain-composer-controls">
              <IconButton label="Añadir al mensaje" onClick={() => setMenu(menu === "add" ? null : "add")}><Plus size={19} /></IconButton>
              <div className="aibrain-composer-right">
                <button type="button" className="aibrain-experience" onClick={(event) => { event.stopPropagation(); setMenu(menu === "experience" ? null : "experience") }}>{experience}<CaretDown size={13} /></button>
                <IconButton label="Dictar mensaje" onClick={() => setNotice("La entrada por voz no está disponible en esta demo.")}><Microphone size={19} /></IconButton>
                <button type="button" className="aibrain-send" aria-label="Enviar mensaje" disabled={!draft.trim()} onClick={() => send()}><ArrowUp size={18} weight="bold" /></button>
              </div>
            </div>
          </div>
          {!activeThread && <div className="aibrain-landing-band">
            <button type="button" onClick={(event) => { event.stopPropagation(); setMenu(menu === "destination" ? null : "destination") }}><FolderOpen size={16} />{currentProject.name}<CaretDown size={12} /></button>
            <button type="button" onClick={() => setModal("server")}><File size={16} />Archivos del servidor</button>
            <button type="button" onClick={(event) => { event.stopPropagation(); setMenu(menu === "connections" ? null : "connections") }}><At size={16} />Conexiones</button>
          </div>}
          {!activeThread && <div className="aibrain-suggestions" aria-label="Sugerencias para empezar">
            <button type="button" onClick={() => send("Prepara una presentación ejecutiva con datos ficticios para una empresa de muestra")}><FilePpt size={19} weight="fill" color="#c96953" />Prepárame una presentación</button>
            <button type="button" onClick={() => send("Trabajemos con estos Excels de demostración")}><File size={19} weight="fill" color="#3d986d" />Trabajemos con estos Excels</button>
            <button type="button" onClick={() => send("Prepara un horario semanal para un equipo ficticio")}><img src="/media/projects/ai-lab/aibrain-mark.svg" alt="" />Planifiquemos los horarios del equipo <CaretRight size={14} /></button>
          </div>}
        </div>
      </div>

      {preview && <section className="aibrain-preview" aria-label={`Vista previa de ${SLIDE_NAME}.${preview}`}>
        <header className="aibrain-preview-head">
          <span className="aibrain-preview-file"><span><FilePpt size={20} /></span><span><strong>{SLIDE_NAME}.{preview}</strong><small>{preview.toUpperCase()} · 3 páginas</small></span></span>
          <div className="aibrain-preview-controls">
            <IconButton label="Página anterior" disabled={previewPage === 1} onClick={() => setPreviewPage((page) => page - 1)}><CaretLeft size={19} /></IconButton>
            <span>{previewPage} / 3</span>
            <IconButton label="Página siguiente" disabled={previewPage === 3} onClick={() => setPreviewPage((page) => page + 1)}><CaretRight size={19} /></IconButton>
            <IconButton label="Alejar" onClick={() => setZoom((value) => Math.max(70, value - 10))}><Minus size={18} /></IconButton><span>{zoom}%</span>
            <IconButton label="Acercar" onClick={() => setZoom((value) => Math.min(150, value + 10))}><Plus size={18} /></IconButton>
            <IconButton label="Pantalla completa" onClick={() => setNotice("El visor de la demo ya ocupa el espacio disponible.")}><ArrowsOut size={18} /></IconButton>
            <a className="aibrain-icon-button" href={`/media/projects/ai-lab/demo/${SLIDE_NAME}.${preview}`} download aria-label="Descargar ejemplo" title="Descargar ejemplo"><DownloadSimple size={18} /></a>
            <IconButton label="Cerrar vista previa" onClick={() => setPreview(null)}><X size={18} /></IconButton>
          </div>
        </header>
        <div className="aibrain-preview-canvas"><div className="aibrain-preview-zoom" style={{ transform: `scale(${zoom / 100})` }}><DemoSlide page={previewPage} /></div></div>
      </section>}

      {menu && <div className={`aibrain-menu aibrain-menu-${menu}`} onClick={(event) => event.stopPropagation()}>
        {menu === "experience" && ["Rápido", "Inteligente", "Experto"].map((option) => <button type="button" key={option} onClick={() => { setExperience(option); setMenu(null) }}>{option === experience && <Check size={14} />}{option}</button>)}
        {menu === "destination" && projects.map((project) => <button type="button" key={project.id} onClick={() => selectProject(project.id)}><Folder size={15} />{project.name}</button>)}
        {menu === "add" && <>
          <button type="button" onClick={() => { fileInputRef.current?.click(); setMenu(null) }}><Paperclip size={16} />Adjuntar archivo</button>
          <button type="button" onClick={() => { setModal("server"); setMenu(null) }}><File size={16} />Archivos del servidor</button>
          <button type="button" onClick={() => { setNotice("La generación de imágenes no está disponible en esta demo."); setMenu(null) }}>Crear imagen</button>
        </>}
        {menu === "connections" && ["Google Drive", "Gmail", "Outlook"].map((tool) => <button type="button" key={tool} onClick={() => { setConnectedTools((current) => current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool]); setMenu(null); setNotice(`${tool}: selección visual de la demo.`) }}>{connectedTools.includes(tool) && <Check size={14} />}{tool}</button>)}
        {menu === "account" && <><div className="aibrain-menu-title">Usuari demo · AiBrain</div><Link to={`/${lang}/projects`}><ArrowLeft size={16} />Volver a PALSEC</Link><button type="button" onClick={() => { setMenu(null); setNotice("Configuración no disponible en esta demo.") }}><GearSix size={16} />Configuración</button></>}
        {menu === "thread" && <button type="button" onClick={() => { setRenameValue(threads.find((thread) => thread.id === threadMenuId)?.title ?? ""); setModal("rename"); setMenu(null) }}><NotePencil size={16} />Renombrar conversación</button>}
      </div>}
      <input ref={fileInputRef} type="file" className="aibrain-file-input" multiple aria-label="Seleccionar archivos para adjuntar" onChange={(event) => { setAttachments((current) => [...current, ...Array.from(event.target.files ?? []).map((file) => file.name)]); event.target.value = "" }} />

      {modal && <div className="aibrain-modal-backdrop" role="presentation" onClick={() => setModal(null)}>
        <div role="dialog" aria-modal="true" aria-label={modal === "search" ? "Buscar" : modal === "project" ? "Crear proyecto" : modal === "rename" ? "Renombrar conversación" : modal === "server" ? "Archivos del servidor" : "Automatizaciones"} className="aibrain-modal" onClick={(event) => event.stopPropagation()}>
          <header><h2>{modal === "search" ? "Buscar" : modal === "project" ? "Crear proyecto" : modal === "rename" ? "Renombrar conversación" : modal === "server" ? "Archivos del servidor" : "Automatizaciones"}</h2><IconButton label="Cerrar" onClick={() => setModal(null)}><X size={18} /></IconButton></header>
          {modal === "search" && <><div className="aibrain-search-field"><MagnifyingGlass size={18} /><input autoFocus placeholder="Buscar conversaciones" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="aibrain-search-results">{threads.filter((thread) => thread.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((thread) => <button type="button" key={thread.id} onClick={() => { selectThread(thread.id); setModal(null) }}><NotePencil size={16} />{thread.title}</button>)}</div></>}
          {modal === "project" && <form onSubmit={createProject}><label>Nombre del proyecto<input autoFocus value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="Nuevo proyecto" /></label><div className="aibrain-modal-actions"><button type="button" onClick={() => setModal(null)}>Cancelar</button><button type="submit" disabled={!newProjectName.trim()}>Crear proyecto</button></div></form>}
          {modal === "rename" && <form onSubmit={renameThread}><label>Nombre de la conversación<input autoFocus value={renameValue} onChange={(event) => setRenameValue(event.target.value)} /></label><div className="aibrain-modal-actions"><button type="button" onClick={() => setModal(null)}>Cancelar</button><button type="submit" disabled={!renameValue.trim()}>Guardar</button></div></form>}
          {modal === "server" && <div className="aibrain-demo-files"><p>Archivos de demostración con datos ficticios.</p>{["01_Vendes_demo_curta.xlsx", "02_Costos_demo_curta.xlsx"].map((file) => <button type="button" key={file} onClick={() => { setAttachments((current) => [...current, file]); setModal(null) }}><File size={18} />{file}<Plus size={15} /></button>)}</div>}
          {modal === "automations" && <div className="aibrain-automations"><CalendarBlank size={26} /><h3>Automatizaciones</h3><p>Explora cómo se programan tareas recurrentes en AiBrain. Esta demo no ejecuta automatizaciones.</p><button type="button" onClick={() => { setModal(null); setNotice("La creación de automatizaciones está desactivada en esta demo.") }}>Crear automatización</button></div>}
        </div>
      </div>}
      {notice && <div className="aibrain-toast" role="status">{notice}</div>}
    </div>
  )
}
