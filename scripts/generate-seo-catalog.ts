import fs from 'node:fs'
import { BUYING_GUIDES } from '../src/content/buyingGuides'
import { getCommercialPages } from '../src/content/commercialPages'
import { getAllServicePages } from '../src/content/servicePages'
import { PROJECTS } from '../src/data/projects'
import { getProjectCase } from '../src/content/projectCases'

// Keep navigation and schema metadata available without shipping article bodies
// on every route. Generated from the same source before each production build.
const catalog = BUYING_GUIDES.map(({ id, lang, category, publishedAt, slug, path, title, seoTitle, description, relatedService }) =>
  ({ id, lang, category, publishedAt, slug, path, title, seoTitle, description, relatedService }))
fs.writeFileSync(new URL('../src/content/guideCatalog.json', import.meta.url), JSON.stringify(catalog, null, 2) + '\n')
const commercial = ['ca', 'es', 'en'].flatMap(lang => getCommercialPages(lang as 'ca' | 'es' | 'en').map(({ id, lang, path, label, title, seoTitle, description, serviceType, faqs }) => ({ id, lang, path, label, title, seoTitle, description, serviceType, faqs })))
const services = ['ca', 'es', 'en'].flatMap(lang => getAllServicePages(lang as 'ca' | 'es' | 'en').map(({ slug, title, seoTitle, description }) => ({ lang, slug, title, seoTitle, description })))
fs.writeFileSync(new URL('../src/content/serviceCatalog.json', import.meta.url), JSON.stringify({ commercial, services }, null, 2) + '\n')
const projects = ['ca', 'es', 'en'].flatMap(lang => PROJECTS.filter(project => !project.comingSoon).flatMap(project => {
  const summary = getProjectCase(project.slug, lang as 'ca' | 'es' | 'en')
  return summary ? [{ lang, slug: project.slug, title: project.title, intro: summary.intro, services: summary.services }] : []
}))
fs.writeFileSync(new URL('../src/content/projectCatalog.json', import.meta.url), JSON.stringify(projects, null, 2) + '\n')
