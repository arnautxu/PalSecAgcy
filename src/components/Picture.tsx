import type { ImgHTMLAttributes } from "react"

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

export function Picture({ src, alt = "", ...imgProps }: PictureProps) {
  const webp = webpSiblingOf(src)
  if (!webp) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} alt={alt} {...imgProps} />
  }
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={src} alt={alt} {...imgProps} />
    </picture>
  )
}
