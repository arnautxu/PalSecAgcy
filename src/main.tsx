import { StrictMode, useEffect } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import "@fontsource-variable/geist-mono"
import "@fontsource/poppins/latin-400.css"
import "@fontsource/poppins/latin-500.css"
import "@fontsource/poppins/latin-600.css"
import App from "./App"
import "./index.css"
import "./components/inquiry.css"
import "./components/aibrain-demo.css"

function HydrationReady() {
  useEffect(() => { document.documentElement.dataset.hydrated = "true" }, [])
  return null
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <HydrationReady />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
const root = document.getElementById("root")!
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
