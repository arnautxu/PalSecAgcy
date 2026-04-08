import { PageFrame } from "@/components/PageFrame"
import { BrandWatermark } from "@/components/BrandWatermark"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

export function Services() {
  const lang = useLang()
  return (
    <PageFrame className="relative">
      <BrandWatermark variant="light" />
      <div className="h-full w-full overflow-y-auto px-6 pb-8 pt-[92px]">
        <div className="max-w-[520px] text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
          <p className="mb-4 text-nav opacity-60">{t(lang, "services.title")}</p>
          <p className="mb-3 opacity-80">{t(lang, "services.p1")}</p>
          <p className="mb-3">{t(lang, "services.p2")}</p>
          <p className="mb-3">{t(lang, "services.p3")}</p>
          <p className="opacity-70">
            {t(lang, "services.cta").replace(/\.$/, "")},{" "}
            <a
              href={mailtoProjectInquiryHref(lang)}
              className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            >
              {lang === "en" ? "LET’S TALK" : lang === "es" ? "HABLEMOS" : "PARLEM"}
            </a>
            .
          </p>
        </div>
      </div>
    </PageFrame>
  )
}

