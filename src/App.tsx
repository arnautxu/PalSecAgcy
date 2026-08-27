import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { RootLayout } from "./components/RootLayout"
import { AboutUs } from "./pages/AboutUs"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Projects } from "./pages/Projects"
import { Services } from "./pages/Services"
import { ServiceDetail } from "./pages/ServiceDetail"
import { LegalPage } from "./pages/LegalPage"
import { ProjectDetail } from "./pages/ProjectDetail"
import { detectLang, isLang, langPath } from "@/i18n/lang"

function RootRedirect() {
  return <Navigate to={`/${detectLang()}`} replace />
}

function LegacyPathRedirect() {
  const { pathname, search, hash } = useLocation()
  const seg = pathname.split("/").filter(Boolean)[0]
  if (isLang(seg)) return <Navigate to={pathname + search + hash} replace />
  const lang = detectLang()
  return <Navigate to={langPath(lang, pathname) + search + hash} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/:lang" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="privacy" element={<LegalPage kind="privacy" />} />
        <Route path="legal-notice" element={<LegalPage kind="legal-notice" />} />
        <Route path="project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* If someone hits a legacy non-prefixed path (e.g. /projects), prefix detected language. */}
      <Route path="*" element={<LegacyPathRedirect />} />
    </Routes>
  )
}
