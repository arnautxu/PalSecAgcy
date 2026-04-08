import { Link } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

export function NotFound() {
  const lang = useLang()
  return (
    <PageFrame className="relative">
      <div className="flex h-full min-h-0 flex-col px-6 pb-8 pt-[92px]">
        <p className="mb-4 text-nav opacity-60">{t(lang, "notfound.title")}</p>
        <p className="mb-6 max-w-[520px] text-bodymd leading-[1.6] tracking-nav text-ink/80 md:text-body">
          {t(lang, "notfound.body")}
        </p>
        <Link
          to={`/${lang}`}
          className="text-nav uppercase tracking-nav text-ink underline underline-offset-4 transition-opacity duration-200 hover:opacity-40"
        >
          {t(lang, "notfound.backHome")}
        </Link>
      </div>
    </PageFrame>
  )
}
