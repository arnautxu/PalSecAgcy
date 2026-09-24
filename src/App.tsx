import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { BuyingGuide } from "./pages/BuyingGuide"
import { Blog } from "./pages/Blog"
import { CommercialLanding } from "./pages/CommercialLanding"
import { RootLayout } from "./components/RootLayout"
import { AboutUs } from "./pages/AboutUs"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Projects } from "./pages/Projects"
import { Services } from "./pages/Services"
import { ServiceDetail } from "./pages/ServiceDetail"
import { LegalPage } from "./pages/LegalPage"
import { ProjectDetail } from "./pages/ProjectDetail"
import { AiLab } from "./pages/AiLab"
import { isLang, langPath } from "@/i18n/lang"

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
  )
}
