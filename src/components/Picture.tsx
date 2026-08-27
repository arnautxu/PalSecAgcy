import type { ImgHTMLAttributes } from "react"
import imageDimensions from "../data/imageDimensions.json"

/**
 * Drop-in replacement for <img> that serves a WebP sibling when one exists.
 *
 * For src values starting with "/" (local /public files) and ending in
 * .png/.jpg/.jpeg, we emit a <picture> with a <source srcset="…webp"> tag.
 * The <img> still renders the original as fallback for browsers that don't
 * accept image/webp (effectively none in 2025+, but keeps the mental model
 * simple and behaves correctly if the .webp is ever missing).
 *
 * For external URLs (picsum etc.), renders a plain <img>.
 */
function webpSiblingOf(src: string): string | null {
  if (!src.startsWith("/")) return null
  // Strip any query string before the extension test
  const [pathPart, query = ""] = src.split("?")
  if (!/\.(png|jpe?g)$/i.test(pathPart)) return null
  const webp = pathPart.replace(/\.(png|jpe?g)$/i, ".webp")
  return query ? `${webp}?${query}` : webp
}

type PictureProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt?: string
}

type ImageDimension = { width: number; height: number }

function intrinsicDimensions(src: string): ImageDimension | undefined {
  const localPath = src.split("?")[0]
  return (imageDimensions as Record<string, ImageDimension>)[localPath]
}

function responsiveWebpSrcSet(src: string): string | undefined {
  const localPath = src.split("?")[0]
  if (!localPath.startsWith("/media/projects/")) return undefined

  const preferredWebp = webpSiblingOf(localPath) ?? (/\.webp$/i.test(localPath) ? localPath : null)
  const dimensions = intrinsicDimensions(preferredWebp ?? localPath)
  if (!preferredWebp || !dimensions) return undefined

  const candidates = [160, 720, 1280]
    .filter((width) => dimensions.width > width)
    .map((width) => `${preferredWebp.replace(/\.webp$/i, `.${width}.webp`)} ${width}w`)

  candidates.push(`${preferredWebp} ${dimensions.width}w`)
  return candidates.join(", ")
}

export function Picture({ src, alt = "", ...imgProps }: PictureProps) {
  const webp = webpSiblingOf(src)
  const dimensions = intrinsicDimensions(src)
  const responsiveSrcSet = responsiveWebpSrcSet(src)
  const width = imgProps.width ?? dimensions?.width
  const height = imgProps.height ?? dimensions?.height
  const props = { ...imgProps, width, height }
  if (!webp) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} alt={alt} srcSet={responsiveSrcSet} {...props} />
  }
  return (
    <picture>
      <source srcSet={responsiveSrcSet ?? webp} sizes={imgProps.sizes} type="image/webp" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={src} alt={alt} {...props} />
    </picture>
  )
}
