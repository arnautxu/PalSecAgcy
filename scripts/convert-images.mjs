/**
 * Batch-convert PNG/JPG/JPEG project images to WebP alongside originals.
 *
 * Walks public/media/projects/ recursively. For every PNG/JPG/JPEG, emits a
 * .webp sibling next to it (q=80). Skips when the .webp is newer than the
 * source — so re-running is cheap.
 *
 * The originals are preserved so the existing <img src> paths still resolve
 * (and so old crawler caches / inbound links don't 404).
 *
 * Run via: node scripts/convert-images.mjs
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const TARGET = path.join(ROOT, "public", "media", "projects")

const RASTER_EXT = /\.(png|jpe?g)$/i

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

async function run() {
  if (!fs.existsSync(TARGET)) {
    console.log(`[convert-images] ${TARGET} not found — nothing to do.`)
    return
  }

  let converted = 0
  let skipped = 0
  let bytesSaved = 0
  let errors = 0

  for (const file of walk(TARGET)) {
    if (!RASTER_EXT.test(file)) continue
    const out = file.replace(RASTER_EXT, ".webp")

    try {
      const srcStat = fs.statSync(file)
      if (fs.existsSync(out)) {
        const outStat = fs.statSync(out)
        if (outStat.mtimeMs >= srcStat.mtimeMs) {
          skipped++
          continue
        }
      }

      await sharp(file).webp({ quality: 80 }).toFile(out)
      const newStat = fs.statSync(out)
      const saved = srcStat.size - newStat.size
      bytesSaved += saved
      converted++
      const rel = path.relative(ROOT, out)
      const pct = Math.round((saved / srcStat.size) * 100)
      console.log(
        `[convert-images] ✓ ${rel}  ${(srcStat.size / 1024).toFixed(0)}KB → ${(newStat.size / 1024).toFixed(0)}KB (-${pct}%)`,
      )
    } catch (err) {
      errors++
      console.error(`[convert-images] ✗ ${file}: ${err.message}`)
    }
  }

  console.log(
    `\n[convert-images] Done — converted ${converted}, skipped ${skipped}, errors ${errors}. ` +
      `Total saved: ${(bytesSaved / 1024 / 1024).toFixed(2)} MB`,
  )
  if (errors > 0) process.exit(1)
}

run()
