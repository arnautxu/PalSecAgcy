import { useLocation } from "react-router-dom"
import { PageFrame } from "@/components/PageFrame"
import { mailtoProjectInquiryHref } from "@/constants/contact"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"
import { Seo } from "@/components/Seo"
import { Link } from "react-router-dom"
import { getAllServicePages } from "@/content/servicePages"
import { SERVICES_META } from "@/lib/seoMeta"

export function Services() {
  const lang = useLang()
  const { pathname } = useLocation()
  const servicePages = getAllServicePages(lang)
  return (
    <PageFrame className="relative">
      <Seo
        title={SERVICES_META[lang].title}
        bare
        description={t(lang, "services.seoDesc")}
        path={pathname}
        lang={lang}
        isServicesList
      />
      <div className="h-full w-full overflow-y-auto px-4 pb-8 pt-[92px] sm:px-5 md:px-6">
        <div className="mx-auto max-w-[980px]">
          <h1 className="mb-4 text-nav uppercase tracking-nav opacity-80">
            {t(lang, "services.title")}
          </h1>
          <div className="max-w-[720px] normal-case text-[14px] leading-[1.75] text-ink md:text-[16px]">
            <p className="mb-3 opacity-80">{t(lang, "services.p1")}</p>
            <p className="mb-3">{t(lang, "services.p2")}</p>
            <p className="mb-3">{t(lang, "services.p3")}</p>
            <p className="opacity-70">
              {t(lang, "services.cta").replace(/\.$/, "")},{" "}
              <a
                href={mailtoProjectInquiryHref(lang)}
                className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
              >
                {lang === "en" ? "let's talk" : lang === "es" ? "hablemos" : "parlem"}
              </a>
              .
            </p>
          </div>
          <div className="my-10 h-px bg-frame" />
          <div className="grid gap-4 md:grid-cols-3">
            {servicePages.map((service, index) => (
              <Link
                key={service.slug}
                to={`/${lang}/services/${service.slug}`}
                className="group flex min-h-[220px] flex-col rounded-[2px] border border-frame p-5 transition-colors hover:border-ink"
              >
                <span className="text-nav tracking-nav text-ink/40">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-5 text-[18px] font-normal leading-[1.15] normal-case md:text-[22px]">{service.title}</h2>
                <p className="mt-4 text-[13px] leading-[1.6] text-ink/65 normal-case">{service.intro}</p>
                <span className="mt-auto pt-5 text-[11px] uppercase tracking-nav transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
