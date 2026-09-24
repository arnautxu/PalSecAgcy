import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { Picture } from "./Picture"
import { PORTFOLIO_WEBSITES } from "@/data/websites"
import type { Lang } from "@/i18n/lang"
import { publicUrl } from "@/utils/publicUrl"

const COPY = {
  ca: {
    eyebrow: "Work / Portfoli web",
    title: "Weboteca",
    intro: "Cinc webs publicades, cinc maneres de donar forma a una experiència digital. Explora les captures en escriptori i mòbil o visita cada web en directe.",
    open: "Obre les captures de",
    visit: "Visita la web",
    close: "Tanca la galeria",
    previous: "Web anterior",
    next: "Web següent",
    desktop: "Escriptori",
    mobile: "Mòbil",
    back: "Tots els projectes",
  },
  es: {
    eyebrow: "Work / Portafolio web",
    title: "Weboteca",
    intro: "Cinco webs publicadas, cinco maneras de dar forma a una experiencia digital. Explora las capturas en escritorio y móvil o visita cada web en directo.",
    open: "Abre las capturas de",
    visit: "Visita la web",
    close: "Cierra la galería",
    previous: "Web anterior",
    next: "Web siguiente",
    desktop: "Escritorio",
    mobile: "Móvil",
    back: "Todos los proyectos",
  },
  en: {
    eyebrow: "Work / Website portfolio",
    title: "Weboteca",
    intro: "Five live websites, five ways to shape a digital experience. Explore the desktop and mobile views or visit each website directly.",
    open: "Open screenshots of",
    visit: "Visit website",
    close: "Close gallery",
    previous: "Previous website",
    next: "Next website",
    desktop: "Desktop",
    mobile: "Mobile",
    back: "All projects",
  },
} as const

export function WebotecaGallery({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  const [active, setActive] = useState<number | null>(null)
  const [view, setView] = useState<"desktop" | "mobile">("desktop")
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const isOpen = active !== null
  const website = active === null ? null : PORTFOLIO_WEBSITES[active]

  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog?.showModal()
    return () => {
      if (dialog?.open) dialog.close()
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
    }
  }, [isOpen])

  const openGallery = (index: number, opener: HTMLElement) => {
    openerRef.current = opener
    setView("desktop")
    setActive(index)
  }
  const move = (direction: -1 | 1) => {
    setActive(current => current === null ? null : (current + direction + PORTFOLIO_WEBSITES.length) % PORTFOLIO_WEBSITES.length)
  }

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="mb-9 border-b border-frame pb-7 md:mb-12 md:pb-9">
        <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-ink/55">{copy.eyebrow}</p>
        <h1 className="text-[clamp(38px,6vw,82px)] font-normal leading-none tracking-[-0.065em] normal-case">{copy.title}<span className="text-[#d50000]">.</span></h1>
        <p className="mt-5 max-w-[660px] text-[14px] leading-[1.7] normal-case text-ink/70 md:text-[16px]">{copy.intro}</p>
        <Link to={`/${lang}/projects`} className="mt-5 inline-block text-[11px] uppercase tracking-nav underline underline-offset-4 transition-colors hover:text-[#d50000]">← {copy.back}</Link>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 md:gap-y-14">
        {PORTFOLIO_WEBSITES.map((site, index) => (
          <article key={site.slug} className={index === PORTFOLIO_WEBSITES.length - 1 ? "md:col-span-2" : ""}>
            <div className="mb-3 flex items-end justify-between gap-4 border-b border-ink/20 pb-2">
              <h2 className="text-[17px] font-normal leading-[1.25] tracking-[-0.025em] normal-case md:text-[20px]">{site.title}</h2>
              <span className="shrink-0 text-[10px] tabular-nums tracking-nav text-ink/50">{String(index + 1).padStart(2, "0")} / {String(PORTFOLIO_WEBSITES.length).padStart(2, "0")}</span>
            </div>
            <button type="button" onClick={event => openGallery(index, event.currentTarget)}
              aria-label={`${copy.open} ${site.title}`}
              className="group relative block w-full overflow-hidden rounded-[3px] border border-frame bg-[#f2f2f0] text-left shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_36px_rgba(0,0,0,0.1)]">
              <span className="flex h-7 items-center justify-between border-b border-ink/10 bg-[#f7f7f5] px-3 text-[8px] tracking-[0.06em] text-ink/45">
                <span className="flex gap-[3px]" aria-hidden="true"><i className="h-[5px] w-[5px] rounded-full bg-[#d50000]/75" /><i className="h-[5px] w-[5px] rounded-full bg-ink/20" /><i className="h-[5px] w-[5px] rounded-full bg-ink/20" /></span>
                <span>{site.domain}</span>
                <span aria-hidden="true">↗</span>
              </span>
              <Picture src={publicUrl(site.desktop)} alt={`${site.title} — ${copy.desktop.toLowerCase()}`}
                className={`w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] ${index === PORTFOLIO_WEBSITES.length - 1 ? "aspect-[16/8] md:aspect-[21/9]" : "aspect-[16/10]"}`}
                sizes={index === PORTFOLIO_WEBSITES.length - 1 ? "(max-width: 767px) calc(100vw - 40px), 1200px" : "(max-width: 767px) calc(100vw - 40px), 590px"}
                loading="lazy" />
              <span className="absolute bottom-3 right-3 w-[23%] max-w-[135px] overflow-hidden rounded-[7px] border-[3px] border-white bg-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] md:bottom-4 md:right-4" aria-hidden="true">
                <Picture src={publicUrl(site.mobile)} alt="" className="aspect-[390/844] w-full object-cover object-top" sizes="135px" loading="lazy" />
              </span>
            </button>
            <div className="mt-3 flex items-center justify-between gap-4 text-[11px] normal-case text-ink/55">
              <span className="min-w-0 truncate">{site.domain}</span>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="shrink-0 border-b border-ink/40 pb-0.5 text-ink transition-colors hover:border-[#d50000] hover:text-[#d50000]" aria-label={`${copy.visit}: ${site.title}`}>
                {copy.visit} ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      {website && typeof document !== "undefined" ? createPortal(
        <dialog ref={dialogRef} onCancel={() => setActive(null)}
          onClick={event => { if (event.target === event.currentTarget) setActive(null) }}
          onKeyDown={event => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1) }}
          aria-label={`${copy.title}: ${website.title}`}
          className="m-auto max-h-[94dvh] w-[min(96vw,1220px)] max-w-none overflow-hidden rounded-[4px] border border-white/20 bg-white p-0 text-ink shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop:bg-black/80">
          <div className="flex items-center justify-between gap-3 border-b border-frame px-4 py-3 md:px-6">
            <div className="min-w-0"><p className="text-[9px] tracking-nav text-ink/50">{String(active! + 1).padStart(2, "0")} / {String(PORTFOLIO_WEBSITES.length).padStart(2, "0")}</p><h2 className="truncate text-[15px] normal-case md:text-[19px]">{website.title}</h2></div>
            <button type="button" onClick={() => setActive(null)} aria-label={copy.close} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-frame text-[24px] leading-none transition-colors hover:bg-frame/30">×</button>
          </div>
          <div className="flex min-h-[min(50dvh,520px)] max-h-[calc(94dvh-150px)] items-center justify-center overflow-y-auto bg-[#efefed] p-3 md:p-5">
            <Picture key={`${website.slug}-${view}`} src={publicUrl(view === "desktop" ? website.desktop : website.mobile)} alt={`${website.title} — ${view === "desktop" ? copy.desktop : copy.mobile}`}
              className={view === "desktop" ? "max-h-[calc(94dvh-190px)] w-full object-contain shadow-[0_8px_30px_rgba(0,0,0,0.12)]" : "max-h-[calc(94dvh-190px)] w-auto max-w-full object-contain shadow-[0_8px_30px_rgba(0,0,0,0.12)]"}
              sizes={view === "desktop" ? "min(96vw, 1220px)" : "390px"} />
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-frame px-3 py-2 md:px-5">
            <button type="button" onClick={() => move(-1)} aria-label={copy.previous} className="flex h-10 w-10 items-center justify-center rounded-full border border-frame text-[20px] hover:bg-frame/30">‹</button>
            <div className="flex items-center gap-1 rounded-full border border-frame p-1">
              {(["desktop", "mobile"] as const).map(mode => (
                <button key={mode} type="button" onClick={() => setView(mode)} aria-pressed={view === mode}
                  className={`min-h-9 rounded-full px-3 text-[10px] uppercase tracking-nav transition-colors ${view === mode ? "bg-[#d50000] text-white" : "text-ink/60 hover:bg-frame/30"}`}>
                  {copy[mode]}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label={copy.next} className="flex h-10 w-10 items-center justify-center rounded-full border border-frame text-[20px] hover:bg-frame/30">›</button>
          </div>
        </dialog>, document.body) : null}
    </div>
  )
}
