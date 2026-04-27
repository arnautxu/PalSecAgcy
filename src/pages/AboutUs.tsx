import { PageFrame } from "@/components/PageFrame"
import { CONTACT_EMAIL, mailtoProjectInquiryHref } from "@/constants/contact"
import { publicUrl } from "@/utils/publicUrl"
import { useLang } from "@/i18n/useLang"
import { t } from "@/i18n/strings"

export function AboutUs() {
  const lang = useLang()
  return (
    <PageFrame className="relative">
      <div className="flex h-full min-h-0 flex-col px-6 pb-8 pt-[92px] md:flex-row md:gap-10">
        <div className="w-full md:w-[40%]">
          <h1 className="mb-4 text-nav uppercase tracking-nav opacity-60">
            {t(lang, "about.title")}
          </h1>
          <p className="normal-case text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            {t(lang, "about.p1")} {t(lang, "about.p2")}
          </p>

          <div className="mt-6">
            <div className="w-[min(60vw,260px)] overflow-hidden rounded-[2px] border border-frame bg-white">
              <img
                src={publicUrl("/brand/palsec-positive.jpg")}
                alt="Palsec Agcy logo"
                className="w-full object-contain p-6 opacity-90"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          <div className="my-5 h-px w-full bg-frame" />
          <p className="normal-case text-bodymd leading-[1.6] tracking-nav text-ink/70 md:text-body">
            {t(lang, "about.contactPrefix")}{" "}
            <a
              href={mailtoProjectInquiryHref(lang)}
              className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </PageFrame>
  )
}
