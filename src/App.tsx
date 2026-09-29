import { lazy, Suspense } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { RootLayout } from "./components/RootLayout"
import { isLang, langPath } from "@/i18n/lang"

const BuyingGuide = lazy(() => import("./pages/BuyingGuide").then(module => ({ default: module.BuyingGuide })))
const Blog = lazy(() => import("./pages/Blog").then(module => ({ default: module.Blog })))
const CommercialLanding = lazy(() => import("./pages/CommercialLanding").then(module => ({ default: module.CommercialLanding })))
const AboutUs = lazy(() => import("./pages/AboutUs").then(module => ({ default: module.AboutUs })))
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })))
const NotFound = lazy(() => import("./pages/NotFound").then(module => ({ default: module.NotFound })))
const Projects = lazy(() => import("./pages/Projects").then(module => ({ default: module.Projects })))
const Services = lazy(() => import("./pages/Services").then(module => ({ default: module.Services })))
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(module => ({ default: module.ServiceDetail })))
const LegalPage = lazy(() => import("./pages/LegalPage").then(module => ({ default: module.LegalPage })))
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then(module => ({ default: module.ProjectDetail })))
const AiLab = lazy(() => import("./pages/AiLab").then(module => ({ default: module.AiLab })))

function RootRedirect() {
  return <Navigate to="/ca" replace />
}

function LegacyPathRedirect() {
  const { pathname, search, hash } = useLocation()
  const seg = pathname.split("/").filter(Boolean)[0]
  if (isLang(seg)) return <Navigate to={pathname + search + hash} replace />
  return <Navigate to={langPath("ca", pathname) + search + hash} replace />
}

function GuideIndexRedirect() {
  const { pathname } = useLocation()
  if (pathname === '/ca/guies' || pathname === '/es/guias') return <Navigate to={pathname.startsWith('/ca/') ? '/ca/blog' : '/es/blog'} replace />
  return <NotFound />
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route path="/:lang" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="guies" element={<GuideIndexRedirect />} />
          <Route path="guias" element={<GuideIndexRedirect />} />
          <Route path="guies/:guideSlug" element={<BuyingGuide />} />
          <Route path="guias/:guideSlug" element={<BuyingGuide />} />
          <Route path=":commercialSlug" element={<CommercialLanding />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy" element={<LegalPage kind="privacy" />} />
          <Route path="legal-notice" element={<LegalPage kind="legal-notice" />} />
          <Route path="project/ai-lab" element={<AiLab />} />
          <Route path="project/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* If someone hits a legacy non-prefixed path (e.g. /projects), prefix detected language. */}
        <Route path="*" element={<LegacyPathRedirect />} />
      </Routes>
    </Suspense>
  )
}
