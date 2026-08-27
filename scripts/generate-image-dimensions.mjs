/**
 * Generate intrinsic dimensions for local raster images used by <Picture>.
 *
 * Keeping the data generated from the real files prevents layout shifts while
 * letting the existing CSS remain fully responsible for rendered sizing.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PUBLIC_DIR = path.join(ROOT, "public")
const OUTPUT = path.join(ROOT, "src", "data", "imageDimensions.json")
const RASTER_EXT = /\.(png|jpe?g|webp|gif)$/i
const RESPONSIVE_ROOT = path.join(PUBLIC_DIR, "media", "projects")
const RESPONSIVE_WIDTHS = [160, 720, 1280]

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

async function run() {
  const dimensions = {}
  let responsiveGenerated = 0

  for (const file of walk(PUBLIC_DIR)) {
    if (!RASTER_EXT.test(file)) continue
    if (/\.\d+\.webp$/i.test(file)) continue

    const metadata = await sharp(file, { animated: false }).metadata()
    if (!metadata.width || !metadata.height) continue

    const publicPath = `/${path.relative(PUBLIC_DIR, file).split(path.sep).join("/")}`
    dimensions[publicPath] = { width: metadata.width, height: metadata.height }

    const isResponsiveSource = file.startsWith(RESPONSIVE_ROOT)
      && /\.webp$/i.test(file)

    if (isResponsiveSource) {
      const sourceStat = fs.statSync(file)
      for (const width of RESPONSIVE_WIDTHS) {
        if (metadata.width <= width) continue

        const output = file.replace(/\.webp$/i, `.${width}.webp`)
        const outputIsCurrent = fs.existsSync(output) && fs.statSync(output).mtimeMs >= sourceStat.mtimeMs
        if (outputIsCurrent) continue

        await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(output)
        responsiveGenerated++
      }
    }
  }

  const ordered = Object.fromEntries(
    Object.entries(dimensions).sort(([left], [right]) => left.localeCompare(right)),
  )
  fs.writeFileSync(OUTPUT, `${JSON.stringify(ordered, null, 2)}\n`)
  console.log(
    `[image-dimensions] Wrote ${Object.keys(ordered).length} entries to ${path.relative(ROOT, OUTPUT)}; `
      + `generated ${responsiveGenerated} responsive variants`,
  )
}

run().catch((error) => {
  console.error(`[image-dimensions] ${error.message}`)
  process.exit(1)
})
