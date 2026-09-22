import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { HelmetProvider, type HelmetServerState } from "react-helmet-async"
import App from "./App"

export function renderPage(path: string) {
  const context = {} as { helmet: HelmetServerState }
  const body = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location={path}><App /></StaticRouter>
    </HelmetProvider>,
  )
  const { helmet } = context
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((element) => element.toString()).join("\n")
  return { body, head }
}
