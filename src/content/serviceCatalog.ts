import catalog from './serviceCatalog.json'
import type { CommercialPage, CommercialId } from './commercialPages'
import type { ServicePage } from './servicePages'
import type { Lang } from '../i18n/lang'

export type CommercialSummary = Pick<CommercialPage, 'id' | 'lang' | 'path' | 'label' | 'title' | 'seoTitle' | 'description' | 'serviceType' | 'faqs'>
const commercial = catalog.commercial as CommercialSummary[]
const services = catalog.services as (Pick<ServicePage, 'slug' | 'title' | 'seoTitle' | 'description'> & { lang: Lang })[]
export const getCommercialSummaries = (lang: Lang) => commercial.filter(page => page.lang === lang)
export const getCommercialSummaryByPath = (path: string) => commercial.find(page => page.path === path)
export const getServiceSummaries = (lang: Lang) => services.filter(page => page.lang === lang)
export const equivalentCommercialPath = (id: CommercialId, lang: Lang) => commercial.find(page => page.id === id && page.lang === lang)!.path
