import { renderToPipeableStream } from "react-dom/server"
import { PassThrough } from "node:stream"
import { StaticRouter } from "react-router-dom"
import { HelmetProvider, type HelmetServerState } from "react-helmet-async"
import App from "./App"

export async function renderPage(path: string) {
  const context = {} as { helmet: HelmetServerState }
  const app = (
    <HelmetProvider context={context}>
      <StaticRouter location={path}><App /></StaticRouter>
    </HelmetProvider>
  )
  // Wait for lazy routes before writing static HTML: crawlers receive the full page.
  const body = await new Promise<string>((resolve, reject) => {
    const output = new PassThrough()
    let html = ""
    output.setEncoding("utf8")
    output.on("data", chunk => { html += chunk })
    output.on("end", () => resolve(html))
    output.on("error", reject)
    const stream = renderToPipeableStream(app, {
      onAllReady() { stream.pipe(output) },
      onShellError: reject,
      onError: reject,
    })
  })
  const { helmet } = context
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((element) => element.toString()).join("\n")
  return { body, head }
}
