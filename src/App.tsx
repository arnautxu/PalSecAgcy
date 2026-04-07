import { Route, Routes } from "react-router-dom"
import { RootLayout } from "./components/RootLayout"
import { AboutUs } from "./pages/AboutUs"
import { Home } from "./pages/Home"
import { Projects } from "./pages/Projects"
import { Services } from "./pages/Services"
import { ProjectDetail } from "./pages/ProjectDetail"

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}
