import type { CommercialId } from './commercialPages'

export type GuideLang = 'ca' | 'es'
export type GuideCategory = 'branding' | 'web' | 'apps'

export type BuyingGuideContent = {
  id: string
  lang: GuideLang
  category: GuideCategory
  publishedAt: string
  slug: string
  path: string
  title: string
  seoTitle: string
  description: string
  intro: string
  sections: { title: string; paragraphs: string[]; checklist?: string[] }[]
  relatedService: CommercialId[]
  ctaTitle: string
  ctaText: string
}
