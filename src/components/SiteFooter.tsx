import { BUYING_GUIDES } from '@/content/buyingGuides'
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
    {lang === 'es' && <nav aria-label="Guías para preparar tu proyecto" className="mt-6 border-t border-current/15 pt-5">
      <p className="mb-3">Guías para preparar tu proyecto</p>
      <div className="flex flex-wrap gap-x-5 gap-y-3">{BUYING_GUIDES.map(guide => <Link key={guide.slug} to={guide.path} className="underline underline-offset-4">{guide.title}</Link>)}</div>
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
