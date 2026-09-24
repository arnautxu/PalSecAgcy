import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { INQUIRY_LABELS, useInquiry } from "./Inquiry"
import { type Lang } from "@/i18n/lang"
import { swapLang } from "@/lib/seoMeta"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

const labels = {
  ca: { home: "Inici", menu: "Menú", close: "Tanca el menú", navigation: "Navegació principal", language: "Idioma" },
  es: { home: "Inicio", menu: "Menú", close: "Cerrar el menú", navigation: "Navegación principal", language: "Idioma" },
  en: { home: "Home", menu: "Menu", close: "Close menu", navigation: "Main navigation", language: "Language" },
} as const

export function BottomNav({ onTop }: { onTop: boolean }) {
  const lang = useLang()
  const copy = labels[lang]
  const inquiry = INQUIRY_LABELS[lang]
  const openInquiry = useInquiry()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [location.pathname])
  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  const links = [
    { to: `/${lang}/services`, label: t(lang, "nav.services") },
    { to: `/${lang}/projects`, label: t(lang, "nav.projects") },
    { to: `/${lang === "en" ? "es" : lang}/blog`, label: lang === "en" ? "BLOG (ES)" : "BLOG" },
    { to: `/${lang}/about-us`, label: t(lang, "nav.about") },
  ]
  const isCurrent = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`) ||
    (to === `/${lang}/projects` && location.pathname.startsWith(`/${lang}/project/`))
  const langLink = (target: Lang) => swapLang(location.pathname, target) + location.search + location.hash

  return (
    <div className="relative">
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={copy.close}
              tabIndex={-1}
              className="fixed inset-0 z-0 cursor-default bg-black/20 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="primary-menu"
              className={`absolute left-0 z-10 w-full overflow-hidden rounded-[22px] border border-white/25 bg-[#c90000] p-3 text-white shadow-[0_18px_50px_rgba(75,0,0,0.25)] lg:hidden ${onTop ? "top-[calc(100%+10px)]" : "bottom-[calc(100%+10px)]"}`}
              initial={{ opacity: 0, y: onTop ? -8 : 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: onTop ? -8 : 8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-3 pb-2 pt-1 text-[10px] tracking-[0.14em] text-white/60">{copy.navigation}</div>
              {links.map(({ to, label }, index) => (
                <Link
                  key={to}
                  to={to}
                  aria-current={isCurrent(to) ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between border-t border-white/20 px-3 py-2 text-[14px] tracking-[0.035em] transition-colors hover:bg-white/10 ${isCurrent(to) ? "text-white" : "text-white/85"}`}
                >
                  <span>{label}</span><span className="text-[11px] text-white/60">{isCurrent(to) ? "●" : `0${index + 1}`}</span>
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-white/20 px-3 pt-3">
                <span className="text-[10px] tracking-[0.14em] text-white/60">{copy.language}</span>
                <div className="flex items-center gap-1" aria-label={copy.language}>
                  {(["ca", "es", "en"] as const).map((target) => (
                    <Link key={target} to={langLink(target)} aria-current={lang === target ? "page" : undefined}
                      className={`flex min-h-10 min-w-10 items-center justify-center rounded-full text-[11px] transition-colors ${lang === target ? "bg-white text-[#b40000]" : "text-white/80 hover:bg-white/15"}`}>
                      {target.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.nav
        layoutId="nav-pill"
        aria-label={copy.navigation}
        className="relative z-20 flex w-[calc(100vw-32px)] max-w-[380px] items-center rounded-full border border-white/25 bg-[#d50000]/95 p-1 text-white shadow-[0_12px_36px_rgba(89,0,0,0.18)] backdrop-blur-[12px] lg:w-auto lg:max-w-none"
      >
        <Link to={`/${lang}`} aria-label={`PALSEC AGCY · ${copy.home}`}
          className="ml-3 mr-auto flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap text-[11px] font-medium tracking-[0.07em] transition-opacity hover:opacity-75 lg:ml-4 lg:mr-5">
          <span className="h-[7px] w-[7px] rounded-full bg-white" aria-hidden="true" />PALSEC AGCY
        </Link>

        <div className="hidden items-center gap-0.5 border-l border-white/25 pl-2 lg:flex">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} aria-current={isCurrent(to) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 text-[10px] tracking-[0.055em] transition-[background-color,color] duration-200 ${isCurrent(to) ? "bg-white text-[#b40000]" : "text-white/85 hover:bg-white/15 hover:text-white"}`}>
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-0.5 border-l border-white/25 pl-2 lg:flex" aria-label={copy.language}>
          {(["ca", "es", "en"] as const).map((target) => (
            <Link key={target} to={langLink(target)} aria-current={lang === target ? "page" : undefined}
              className={`inline-flex min-h-10 min-w-8 items-center justify-center rounded-full text-[10px] transition-colors ${lang === target ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/15 hover:text-white"}`}>
              {target.toUpperCase()}
            </Link>
          ))}
        </div>

        <button type="button" onClick={() => { setMenuOpen(false); openInquiry("quote") }} aria-label={inquiry.quote}
          className="ml-1 inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full bg-white px-3 text-[10px] tracking-[0.05em] text-[#b40000] transition-colors hover:bg-white/90 lg:ml-2 lg:px-4">
          <span>{inquiry.nav}</span><span aria-hidden="true">↗</span>
        </button>
        <button type="button" onClick={() => setMenuOpen(value => !value)} data-inquiry-focus-fallback
          aria-label={menuOpen ? copy.close : copy.menu} aria-expanded={menuOpen} aria-controls="primary-menu"
          className="ml-1 flex min-h-11 min-w-11 items-center justify-center rounded-full text-[18px] leading-none transition-colors hover:bg-white/15 lg:hidden">
          <span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
        </button>
      </motion.nav>
    </div>
  )
}
