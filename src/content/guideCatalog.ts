import catalog from './guideCatalog.json'
import type { BuyingGuideContent, GuideLang } from './guideTypes'

export type GuideSummary = Pick<BuyingGuideContent, 'id' | 'lang' | 'category' | 'publishedAt' | 'slug' | 'path' | 'title' | 'seoTitle' | 'description' | 'relatedService'>
export const GUIDE_CATALOG = catalog as GuideSummary[]
export function getGuideSummaries(lang: GuideLang) {
  return GUIDE_CATALOG.filter(guide => guide.lang === lang)
}
