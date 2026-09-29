import { Link } from 'react-router-dom'
import { SITE_COPY } from '@/content/siteCopy'
import { useLang } from '@/i18n/useLang'
import { mailtoProjectInquiryHref } from '@/constants/contact'

export function SiteFooter() {
  const lang = useLang()
  const copy = SITE_COPY[lang]
  return <footer className="editorial-footer">
    <nav aria-label="PALSEC"><Link to={`/${lang}/services`}>{lang === 'ca' ? 'Serveis' : lang === 'es' ? 'Servicios' : 'Services'}</Link><Link to={`/${lang}/projects`}>{lang === 'ca' ? 'Projectes' : lang === 'es' ? 'Proyectos' : 'Projects'}</Link><Link to={`/${lang}/about-us`}>{copy.studio}</Link>{lang !== 'en' && <Link to={`/${lang}/blog`}>Journal</Link>}<a href={mailtoProjectInquiryHref(lang)}>info@palsec.agency</a></nav>
    <div className="editorial-footer-bottom"><span>PALSEC AGCY · GIRONA / COSTA BRAVA</span><nav aria-label={copy.legal}><Link to={`/${lang}/privacy`}>{copy.privacy}</Link><Link to={`/${lang}/legal-notice`}>{copy.legal}</Link></nav></div>
  </footer>
}
