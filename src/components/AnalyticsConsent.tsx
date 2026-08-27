import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import type { Lang } from "@/i18n/lang"

const MEASUREMENT_ID = "G-1KHW7BDQV0"
const STORAGE_KEY = "palsec-analytics-consent"

type Consent = "granted" | "denied" | null

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

const COPY: Record<Lang, { text: string; accept: string; reject: string; privacy: string }> = {
  ca: {
    text: "Utilitzem Google Analytics només si ho acceptes per entendre l'ús del web i millorar-lo. No activem publicitat personalitzada.",
    accept: "Acceptar analítica",
    reject: "Rebutjar",
    privacy: "Privacitat",
  },
  en: {
    text: "We use Google Analytics only if you accept, to understand website usage and improve it. We do not enable personalised advertising.",
    accept: "Accept analytics",
    reject: "Reject",
    privacy: "Privacy",
  },
  es: {
    text: "Usamos Google Analytics solo si lo aceptas para entender el uso de la web y mejorarla. No activamos publicidad personalizada.",
    accept: "Aceptar analítica",
    reject: "Rechazar",
    privacy: "Privacidad",
  },
}

function currentConsent(): Consent {
  if (typeof window === "undefined") return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === "granted" || value === "denied" ? value : null
}

function loadAnalytics() {
  const analyticsWindow = window as AnalyticsWindow
  if (analyticsWindow.gtag) return

  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
  analyticsWindow.gtag = function gtag() {
    analyticsWindow.dataLayer?.push(arguments)
  }
  analyticsWindow.gtag("js", new Date())
  analyticsWindow.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  script.dataset.palsecAnalytics = "true"
  document.head.appendChild(script)
}

export function AnalyticsConsent({ lang }: { lang: Lang }) {
  const location = useLocation()
  const [consent, setConsent] = useState<Consent>(currentConsent)
  const copy = COPY[lang]

  useEffect(() => {
    const openPreferences = () => setConsent(null)
    window.addEventListener("palsec:analytics-preferences", openPreferences)
    return () => window.removeEventListener("palsec:analytics-preferences", openPreferences)
  }, [])

  useEffect(() => {
    if (consent !== "granted") return
    loadAnalytics()
    const analyticsWindow = window as AnalyticsWindow
    analyticsWindow.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    })
  }, [consent, location.pathname, location.search])

  useEffect(() => {
    if (consent !== "granted") return

    const trackLink = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest<HTMLAnchorElement>("a[href]")
      if (!link) return

      const href = link.href
      const analyticsWindow = window as AnalyticsWindow
      if (href.startsWith("mailto:")) {
        analyticsWindow.gtag?.("event", "contact_email_click", {
          page_path: `${location.pathname}${location.search}`,
          link_url: href,
          transport_type: "beacon",
        })
        return
      }

      try {
        const destination = new URL(href)
        if (destination.origin === window.location.origin) return
        analyticsWindow.gtag?.("event", "outbound_click", {
          page_path: `${location.pathname}${location.search}`,
          link_domain: destination.hostname,
          link_url: href,
          transport_type: "beacon",
        })
      } catch {
        // Ignore non-HTTP link schemes that are not contact actions.
      }
    }

    document.addEventListener("click", trackLink)
    return () => document.removeEventListener("click", trackLink)
  }, [consent, location.pathname, location.search])

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
    if (value === "denied") {
      ;(window as AnalyticsWindow).gtag?.("consent", "update", { analytics_storage: "denied" })
    }
  }

  if (consent !== null) return null

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed bottom-[92px] left-1/2 z-[80] w-[calc(100%-32px)] max-w-[680px] -translate-x-1/2 rounded-[22px] border border-frame bg-white/95 p-4 text-ink shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-5"
    >
      <p className="text-[13px] leading-[1.55] normal-case sm:text-[14px]">
        {copy.text}{" "}
        <Link className="underline underline-offset-4" to={`/${lang}/privacy`}>
          {copy.privacy}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-12 rounded-full bg-accent px-5 text-nav uppercase tracking-nav text-white"
        >
          {copy.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-12 rounded-full border border-frame px-5 text-nav uppercase tracking-nav"
        >
          {copy.reject}
        </button>
      </div>
    </aside>
  )
}
