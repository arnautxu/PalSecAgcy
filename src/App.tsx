import { Route, Routes } from "react-router-dom"
import { RootLayout } from "./components/RootLayout"
import { Films } from "./pages/Films"
import { Home } from "./pages/Home"
import { IndexPage } from "./pages/IndexPage"
import { Info } from "./pages/Info"
import { Photography } from "./pages/Photography"
import { ProjectDetail } from "./pages/ProjectDetail"

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/info" element={<Info />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}
