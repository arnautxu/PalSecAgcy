import { useParams } from "react-router-dom"
import { detectLang, isLang, type Lang } from "./lang"

export function useLang(): Lang {
  const params = useParams()
  const raw = (params as Record<string, string | undefined>).lang
  if (isLang(raw)) return raw
  return detectLang()
}

