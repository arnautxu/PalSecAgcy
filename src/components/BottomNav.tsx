import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { CONTACT_EMAIL, mailtoProjectInquiryHref } from "@/constants/contact"
import { replaceLangInPathname, type Lang } from "@/i18n/lang"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

function Sep() {
  return (
    <span className="mx-[6px] text-white/60">·</span>
  )
}

export function BottomNav() {
  const lang = useLang()
  const location = useLocation()
  const [isScrolling, setIsScrolling] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollIdleTimer = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true)
      if (scrollIdleTimer.current != null) {
        window.clearTimeout(scrollIdleTimer.current)
      }
      scrollIdleTimer.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, 170)
    }

    document.addEventListener("scroll", onScroll, { passive: true, capture: true })
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true })
      if (scrollIdleTimer.current != null) {
        window.clearTimeout(scrollIdleTimer.current)
      }
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const linkClass = (active: boolean) =>
    [
      "text-nav uppercase tracking-nav transition-[opacity,color] duration-200",
      "text-white hover:text-ink hover:opacity-100",
      active ? "opacity-70" : "opacity-100",
    ].join(" ")

  const langLink = (l: Lang) => replaceLangInPathname(location.pathname, l) + location.search + location.hash

  const pillBase = [
    "pointer-events-auto",
    "text-nav uppercase tracking-nav",
    "flex items-center",
    "border backdrop-blur-[10px] rounded-full",
    "bg-[#ff0000]/90 border-white/20",
  ].join(" ")

  return (
    <>
      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-[72px] z-50 flex justify-center px-6 pointer-events-auto md:hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={[
              "flex flex-col items-center gap-[14px]",
              "px-8 py-6 rounded-2xl",
              "bg-[#ff0000]/90 border border-white/20 backdrop-blur-[10px]",
              "text-nav uppercase tracking-nav",
            ].join(" ")}>
              <NavLink to={`/${lang}/services`} className={({ isActive }) => linkClass(isActive)}>
                {t(lang, "nav.services")}
              </NavLink>
              <NavLink to={`/${lang}/projects`} className={({ isActive }) => linkClass(isActive)}>
                {t(lang, "nav.projects")}
              </NavLink>
              <NavLink to={`/${lang}/about-us`} className={({ isActive }) => linkClass(isActive)}>
                {t(lang, "nav.about")}
              </NavLink>

              <div className="h-px w-full bg-white/20" />

              {/* Language selector */}
              <div className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-2 py-[6px] text-white/90">
                <Link
                  to={langLink("en")}
                  className={["px-1 transition-opacity duration-200 hover:opacity-60", lang === "en" ? "opacity-100" : "opacity-60"].join(" ")}
                  aria-label="Switch language to English"
                >
                  EN
                </Link>
                <span className="mx-[6px] text-white/40">·</span>
                <Link
                  to={langLink("ca")}
                  className={["px-1 transition-opacity duration-200 hover:opacity-60", lang === "ca" ? "opacity-100" : "opacity-60"].join(" ")}
                  aria-label="Canvia l'idioma a català"
                >
                  CA
                </Link>
                <span className="mx-[6px] text-white/40">·</span>
                <Link
                  to={langLink("es")}
                  className={["px-1 transition-opacity duration-200 hover:opacity-60", lang === "es" ? "opacity-100" : "opacity-60"].join(" ")}
                  aria-label="Cambiar idioma a español"
                >
                  ES
                </Link>
              </div>

              <motion.a
                href={mailtoProjectInquiryHref(lang)}
                className={[
                  "inline-flex items-center",
                  "rounded-full border px-3 py-[6px]",
                  "text-nav uppercase tracking-nav",
                  "transition-[opacity,color,background-color,border-color] duration-200",
                  "border-white/35 bg-white/10 text-white hover:text-ink",
                ].join(" ")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                aria-label={`${t(lang, "nav.cta")} ${CONTACT_EMAIL}`}
              >
                {t(lang, "nav.cta")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav pill */}
      <motion.nav
        layoutId="nav-pill"
        data-cursor="white"
        className={pillBase}
        aria-label="Primary"
        animate={{
          opacity: isScrolling ? 0 : 1,
          y: isScrolling ? 14 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isScrolling ? "none" : "auto" }}
      >
        {/* ── Mobile pill: logo + hamburger ── */}
        <div className="flex items-center px-4 py-[10px] md:hidden">
          <NavLink
            to={`/${lang}`}
            className={["mr-3 inline-flex items-center hover:opacity-100", linkClass(false)].join(" ")}
            aria-label="PALSEC AGCY HOME"
          >
            PALSEC AGCY
          </NavLink>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center justify-center w-6 h-6 text-white/80 hover:text-white transition-colors duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="text-[16px] leading-none">{menuOpen ? "×" : "≡"}</span>
          </button>
        </div>

        {/* ── Desktop pill: full nav ── */}
        <div className="hidden md:flex items-center px-4 py-[10px]">
          <NavLink
            to={`/${lang}`}
            className={[
              "mr-[10px] inline-flex items-center hover:opacity-100",
              linkClass(false),
            ].join(" ")}
            aria-label="PALSEC AGCY HOME"
          >
            PALSEC AGCY
          </NavLink>
          <Sep />
          <NavLink to={`/${lang}/services`} className={({ isActive }) => linkClass(isActive)}>
            {t(lang, "nav.services")}
          </NavLink>
          <Sep />
          <NavLink to={`/${lang}/projects`} className={({ isActive }) => linkClass(isActive)}>
            {t(lang, "nav.projects")}
          </NavLink>
          <Sep />
          <NavLink to={`/${lang}/about-us`} className={({ isActive }) => linkClass(isActive)}>
            {t(lang, "nav.about")}
          </NavLink>
          <Sep />

          <div className="ml-[2px] inline-flex items-center rounded-full border border-white/25 bg-white/5 px-2 py-[6px] text-white/90">
            <Link
              to={langLink("en")}
              className={["px-1 transition-opacity duration-200 hover:opacity-60", lang === "en" ? "opacity-100" : "opacity-60"].join(" ")}
              aria-label="Switch language to English"
            >
              EN
            </Link>
            <span className="mx-[6px] text-white/40">·</span>
            <Link
              to={langLink("ca")}
              className={["px-1 transition-opacity duration-200 hover:opacity-60", lang === "ca" ? "opacity-100" : "opacity-60"].join(" ")}
              aria-label="Canvia l'idioma a català"
            >
              CA
            </Link>
            <span className="mx-[6px] text-white/40">·</span>
            <Link
              to={langLink("es")}
              className={["px-1 transition-opacity duration-200 hover:opacity-60", lang === "es" ? "opacity-100" : "opacity-60"].join(" ")}
              aria-label="Cambiar idioma a español"
            >
              ES
            </Link>
          </div>

          <Sep />

          <motion.a
            href={mailtoProjectInquiryHref(lang)}
            className={[
              "ml-[2px] inline-flex items-center",
              "rounded-full border px-3 py-[6px]",
              "text-nav uppercase tracking-nav",
              "transition-[opacity,color,background-color,border-color] duration-200",
              "border-white/35 bg-white/10 text-white hover:text-ink",
            ].join(" ")}
            initial={false}
            animate={{
              boxShadow: "0 0 0 0 rgba(0,0,0,0)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            aria-label={`${t(lang, "nav.cta")} ${CONTACT_EMAIL}`}
          >
            {t(lang, "nav.cta")}
          </motion.a>
        </div>
      </motion.nav>
    </>
  )
}
