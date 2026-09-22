import { Link } from 'react-router-dom'
import { getCommercialPages } from '@/content/commercialPages'
import { SITE_COPY } from '@/content/siteCopy'
import { useLang } from '@/i18n/useLang'
import { mailtoProjectInquiryHref } from '@/constants/contact'

export function SiteFooter() {
  const lang = useLang()
  const copy = SITE_COPY[lang]
  return <footer className="mt-14 border-t border-current/15 pt-6 pb-6 text-[12px] normal-case">
    <nav aria-label={copy.services} className="flex flex-wrap gap-x-5 gap-y-3">
      {getCommercialPages(lang).map(page => <Link key={page.id} to={page.path} className="underline underline-offset-4">{page.label}</Link>)}
    </nav>
    {(lang === 'ca' || lang === 'es') && <nav aria-label="Blog" className="mt-6 border-t border-current/15 pt-5">
      <Link to={`/${lang}/blog`} className="underline underline-offset-4">{lang === 'ca' ? 'Blog · Guies per preparar el teu projecte' : 'Blog · Guías para preparar tu proyecto'} →</Link>
    </nav>}
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 opacity-70">
      <Link to={`/${lang}/projects`}>{copy.allProjects}</Link>
      <Link to={`/${lang}/about-us`}>{copy.studio}</Link>
      <a href={mailtoProjectInquiryHref(lang)}>info@palsec.agency</a>
      <Link to={`/${lang}/privacy`}>{copy.privacy}</Link>
      <Link to={`/${lang}/legal-notice`}>{copy.legal}</Link>
    </div>
  </footer>
}
