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
      active
        ? "opacity-100 underline underline-offset-4 decoration-white/70"
        : "opacity-70",
    ].join(" ")

  const langItemClass = (active: boolean, size: "sm" | "md" = "sm") =>
    [
      size === "md" ? "px-2 text-[14px]" : "px-1 text-[11px]",
      "inline-flex min-h-[48px] items-center uppercase tracking-[0.08em] transition-opacity duration-200",
      active
        ? "opacity-100 underline underline-offset-4 decoration-white/70"
        : "opacity-60 hover:opacity-100",
    ].join(" ")

  const langLink = (l: Lang) => replaceLangInPathname(location.pathname, l) + location.search + location.hash

  const pillBase = [
    "pointer-events-auto",
    "text-nav uppercase tracking-nav",
    "flex items-center",
    "border backdrop-blur-[10px] rounded-full",
    "bg-accent/90 border-white/20",
  ].join(" ")

  return (
    <>
      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-[72px] z-50 flex justify-center px-6 pointer-events-auto md:hidden"
            style={{ transformOrigin: "bottom center" }}
            initial={{ opacity: 0, scaleY: 0.25, scaleX: 0.85, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scaleY: 0.25, scaleX: 0.85, y: 28, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.9 }}
          >
            <motion.div
              className={[
                "flex flex-col items-center gap-6",
                "px-12 py-10 rounded-2xl w-full max-w-xs",
                "bg-accent/90 border border-white/20 backdrop-blur-[10px]",
              ].join(" ")}
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                hide: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              initial="hide"
              animate="show"
              exit="hide"
            >
              {[
                { to: `/${lang}/services`, label: t(lang, "nav.services") },
                { to: `/${lang}/projects`, label: t(lang, "nav.projects") },
                { to: `/${lang}/about-us`, label: t(lang, "nav.about") },
              ].map(({ to, label }) => (
                <motion.div
                  key={to}
                  variants={{
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                    hide: { opacity: 0, y: 14, filter: "blur(4px)" },
                  }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) => [
                      "flex min-h-[48px] items-center py-3 text-[16px] uppercase tracking-[0.1em] font-normal",
                      "transition-[opacity,color] duration-200 text-white hover:text-ink hover:opacity-100",
                      isActive ? "opacity-70" : "opacity-100",
                    ].join(" ")}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                className="h-px w-full bg-white/20"
                variants={{ show: { opacity: 1, scaleX: 1 }, hide: { opacity: 0, scaleX: 0.4 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Language selector */}
              <motion.div
                variants={{ show: { opacity: 1, y: 0, filter: "blur(0px)" }, hide: { opacity: 0, y: 14, filter: "blur(4px)" } }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-4 py-2.5 text-white/90"
              >
                <Link
                  to={langLink("en")}
                  className={langItemClass(lang === "en", "md")}
                  aria-label="Switch language to English"
                  aria-current={lang === "en" ? "true" : undefined}
                >
                  EN
                </Link>
                <span className="mx-2 text-white/40">·</span>
                <Link
                  to={langLink("ca")}
                  className={langItemClass(lang === "ca", "md")}
                  aria-label="Canvia l'idioma a català"
                  aria-current={lang === "ca" ? "true" : undefined}
                >
                  CA
                </Link>
                <span className="mx-2 text-white/40">·</span>
                <Link
                  to={langLink("es")}
                  className={langItemClass(lang === "es", "md")}
                  aria-label="Cambiar idioma a español"
                  aria-current={lang === "es" ? "true" : undefined}
                >
                  ES
                </Link>
              </motion.div>

              <motion.a
                href={mailtoProjectInquiryHref(lang)}
                className={[
                "inline-flex items-center min-h-[48px]",
                  "rounded-full border px-6 py-2.5",
                  "text-[14px] uppercase tracking-[0.1em]",
                  "transition-[opacity,color,background-color,border-color] duration-200",
                  "border-white/35 bg-white/10 text-white hover:text-ink",
                ].join(" ")}
                variants={{ show: { opacity: 1, y: 0, filter: "blur(0px)" }, hide: { opacity: 0, y: 14, filter: "blur(4px)" } }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                aria-label={`${t(lang, "nav.cta")} ${CONTACT_EMAIL}`}
              >
                {t(lang, "nav.cta")}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav pill */}
      <motion.nav
        layoutId="nav-pill"
        className={pillBase}
        aria-label="Primary"
        animate={{
          opacity: isScrolling ? 0 : 1,
          y: isScrolling ? 14 : 0,
        }}
        transition={{
          opacity: { duration: 0.12, ease: "easeOut" },
          y: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        }}
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
            className="ml-auto inline-flex min-h-[48px] min-w-[48px] items-center justify-center text-white/80 transition-colors duration-200 hover:text-white"
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
              className={langItemClass(lang === "en")}
              aria-label="Switch language to English"
              aria-current={lang === "en" ? "true" : undefined}
            >
              EN
            </Link>
            <span className="mx-[6px] text-white/40">·</span>
            <Link
              to={langLink("ca")}
              className={langItemClass(lang === "ca")}
              aria-label="Canvia l'idioma a català"
              aria-current={lang === "ca" ? "true" : undefined}
            >
              CA
            </Link>
            <span className="mx-[6px] text-white/40">·</span>
            <Link
              to={langLink("es")}
              className={langItemClass(lang === "es")}
              aria-label="Cambiar idioma a español"
              aria-current={lang === "es" ? "true" : undefined}
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
            animate={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
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
