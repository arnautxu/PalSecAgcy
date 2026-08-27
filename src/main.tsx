import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import "@fontsource-variable/geist-mono"
import App from "./App"
import "./index.css"

// The prerendered head makes every route crawlable without JavaScript. Once the
// app starts, Helmet owns these route-specific tags so client-side navigation
// cannot leave stale or duplicate metadata behind.
document.head
  .querySelectorAll(
    [
      'meta[name="description"]',
      'meta[property^="og:"]',
      'meta[name^="twitter:"]',
      'link[rel="canonical"]',
      'link[rel="alternate"][hreflang]',
      'script[type="application/ld+json"]',
      '#seo-static-style',
    ].join(","),
  )
  .forEach((element) => element.remove())

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
