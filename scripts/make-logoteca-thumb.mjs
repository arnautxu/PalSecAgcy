import { promises as fs } from "node:fs"
import path from "node:path"
import sharp from "sharp"
import gifencPkg from "gifenc"

const { GIFEncoder, quantize, applyPalette } = gifencPkg

const ROOT = process.cwd()
const INPUT_DIR = path.join(ROOT, "public", "media", "projects", "logoteca")
const OUTPUT_GIF = path.join(INPUT_DIR, "thumb.gif")

const FPS = 6
const DELAY_MS = Math.round(1000 / FPS)

// Match existing Projects card thumb ratio (920x518).
const WIDTH = 920
const HEIGHT = 518

function extractIndex(filename) {
  const m = filename.match(/algo_2-(\d+)\.jpe?g$/i)
  return m ? Number(m[1]) : null
}

async function main() {
  const entries = await fs.readdir(INPUT_DIR)
  const frames = entries
    .filter((f) => /algo_2-\d+\.jpe?g$/i.test(f))
    .map((f) => ({ f, i: extractIndex(f) }))
    .filter((x) => x.i != null)
    .sort((a, b) => a.i - b.i)

  if (frames.length === 0) {
    throw new Error(`No frames found in ${INPUT_DIR}`)
  }

  const encoder = GIFEncoder()

  for (let idx = 0; idx < frames.length; idx++) {
    const { f } = frames[idx]
    const full = path.join(INPUT_DIR, f)
    const { data } = await sharp(full)
      .resize(WIDTH, HEIGHT, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const palette = quantize(data, 256)
    const index = applyPalette(data, palette)
    encoder.writeFrame(index, WIDTH, HEIGHT, {
      palette,
      delay: DELAY_MS,
      // apply loop setting once on the first frame
      repeat: idx === 0 ? 0 : undefined,
      first: idx === 0,
    })
  }

  encoder.finish()
  const bytes = encoder.bytes()
  await fs.writeFile(OUTPUT_GIF, Buffer.from(bytes))

  // eslint-disable-next-line no-console
  console.log(`Wrote ${OUTPUT_GIF} (${frames.length} frames @ ${FPS}fps)`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})

