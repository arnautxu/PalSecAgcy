export type Lang = "en" | "ca" | "es"

export const SUPPORTED_LANGS: readonly Lang[] = ["en", "ca", "es"] as const

export function isLang(v: string | undefined | null): v is Lang {
  return v === "en" || v === "ca" || v === "es"
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en"
  const raw = (navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase()
  if (raw.startsWith("ca")) return "ca"
  if (raw.startsWith("es")) return "es"
  return "en"
}

/** Prefix an app path with the current language. */
export function langPath(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  if (p === "/") return `/${lang}`
  return `/${lang}${p}`
}

/** Replace the first URL segment with a language code. */
export function replaceLangInPathname(pathname: string, newLang: Lang): string {
  const parts = pathname.split("?")[0] // pathname should not contain query, but keep safe
  const segs = parts.split("/").filter(Boolean)
  if (segs.length === 0) return `/${newLang}`
  if (isLang(segs[0])) segs[0] = newLang
  else segs.unshift(newLang)
  return `/${segs.join("/")}`
}

